class GameEngine {
    constructor(gameData, uiManager) {
        this.data = gameData;
        this.ui = uiManager; // injected via step 4 binding
        
        this.lastFrameTime = performance.now();
        this.isRunning = false;
        this.offlineEarningsMessage = null;

        // Process offline progress before starting loop
        this.processOfflineProgress();
    }

    // Calculates passive income while the game was closed based on timestamps
    processOfflineProgress() {
        const now = Date.now();
        const timeDiffSeconds = (now - this.data.lastSaveTime) / 1000;
        
        // If away for more than a minute
        if (timeDiffSeconds > 60) {
            const passiveIncomePerSecond = (this.data.dau * this.data.arpdau);
            const offlineEarnings = timeDiffSeconds * passiveIncomePerSecond;
            
            if (offlineEarnings > 0) {
                this.data.revenue += offlineEarnings;
                this.offlineEarningsMessage = `While you were away, you earned $${GameData.formatNumber(offlineEarnings)}!`;
            }
        }
        
        // Update save time to act as the new baseline
        this.data.lastSaveTime = now;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastFrameTime = performance.now();
            this.gameLoop(this.lastFrameTime);
        }
    }

    stop() {
        this.isRunning = false;
    }

    // The core real-time loop using requestAnimationFrame
    gameLoop(currentTime) {
        if (!this.isRunning) return;

        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    // Physics/Math processing tick
    update(deltaTime) {
        // Passive Revenue relies on DAU * ARPDAU per second
        const passiveIncomePerSecond = this.data.dau * this.data.arpdau;
        this.data.revenue += passiveIncomePerSecond * deltaTime;
    }

    // Push data to UI layer
    render() {
        if (this.ui) {
            this.ui.updateDashboard(this.data);
        }
    }

    // Controllers for generic triggers
    
    // Core manual click action
    runLiveOpsEvent() {
        // Manual Action Button "generates immediate Revenue". 
        // We ensure it scales nicely. Base 1 + 50% of the per-second earnings.
        const passiveIncomePerSecond = this.data.dau * this.data.arpdau;
        const immediateGain = 1 + (passiveIncomePerSecond * 0.5);
        this.data.revenue += immediateGain;
        this.render(); // Synchronous render
    }
}

// Module export
window.GameEngine = GameEngine;
