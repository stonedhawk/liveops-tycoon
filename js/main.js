document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Model
    const data = new GameData();
    data.load(); // Load persistence before engine boot

    // Periodically save state
    setInterval(() => {
        data.save();
    }, 10000);

    // 2. Initialize View
    const ui = new UIManager(data);

    // 3. Initialize Controller
    const engine = new GameEngine(data, ui);

    // Render offline message if applicable
    if (engine.offlineEarningsMessage) {
        ui.showOfflineEarnings(engine.offlineEarningsMessage);
    }

    // 4. Bind Interactions
    
    // Core manual click action
    if (ui.btnLiveOps) {
        ui.btnLiveOps.addEventListener('click', () => {
            engine.runLiveOpsEvent();
            
            // Minor visual feedback
            ui.btnLiveOps.style.transform = 'scale(0.95)';
            setTimeout(() => {
                ui.btnLiveOps.style.transform = '';
            }, 100);
        });
    }

    // Event Delegation for dynamic upgrade buttons
    if (ui.upgradesContainer) {
        ui.upgradesContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-buy');
            
            if (!btn) return;
            if (btn.hasAttribute('disabled')) return; 

            const upgradeId = btn.getAttribute('data-id');
            if (upgradeId) {
                const bought = data.buyUpgrade(upgradeId);
                if (bought) {
                    ui.updateDashboard(data); // Immediate re-render
                }
            }
        });
    }

    // 5. Start the Loop
    engine.start();
    
    // Expose for debugging if absolutely needed
    window._gameEngine = engine;
});
