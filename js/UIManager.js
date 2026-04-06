class UIManager {
    constructor(gameData) {
        // DOM Elements mapping
        this.elRevenue = document.getElementById('stat-revenue');
        this.elDau = document.getElementById('stat-dau');
        this.elArpdau = document.getElementById('stat-arpdau');
        this.elRps = document.getElementById('stat-rps');
        
        this.upgradesContainer = document.getElementById('upgrades-container');
        this.btnLiveOps = document.getElementById('btn-liveops-event');
        
        this.toaster = document.getElementById('offline-toaster');
        this.offlineMessage = document.getElementById('offline-message');
        this.btnCloseToaster = document.getElementById('btn-close-toaster');

        // Close toaster listener
        this.btnCloseToaster.addEventListener('click', () => {
            this.toaster.classList.add('hidden');
        });

        // Initialize UI fragments
        this.initUpgradesUI(gameData);
    }

    // Called once to render the list of upgrades
    initUpgradesUI(gameData) {
        this.upgradesContainer.innerHTML = '';
        
        for (const key in gameData.upgrades) {
            const upg = gameData.upgrades[key];
            
            const div = document.createElement('div');
            div.className = 'upgrade-item';
            div.id = `upg-item-${upg.id}`;
            
            div.innerHTML = `
                <div class="upgrade-header">
                    <span class="upgrade-name">${upg.name}</span>
                    <span class="upgrade-owned" id="upg-owned-${upg.id}">Owned: ${upg.owned}</span>
                </div>
                <div class="upgrade-desc">${upg.description}</div>
                <button class="btn-buy" id="upg-btn-${upg.id}" data-id="${upg.id}">
                    Buy - $<span id="upg-cost-${upg.id}">${GameData.formatNumber(gameData.getUpgradeCost(upg.id))}</span>
                </button>
            `;
            this.upgradesContainer.appendChild(div);
        }
    }

    // Called every frame by the GameEngine
    updateDashboard(gameData) {
        // 1. Update Stats Left Panel
        this.elRevenue.innerText = `$${GameData.formatNumber(gameData.revenue)}`;
        this.elDau.innerText = GameData.formatNumber(gameData.dau);
        this.elArpdau.innerText = `$${gameData.arpdau.toFixed(2)}`;
        
        // Rev/Sec = DAU * ARPDAU
        const rps = gameData.dau * gameData.arpdau;
        this.elRps.innerText = `$${GameData.formatNumber(rps)}/s`;

        // 2. Update Upgrades Right Panel dynamically
        for (const key in gameData.upgrades) {
            const upg = gameData.upgrades[key];
            const cost = gameData.getUpgradeCost(upg.id);
            const btn = document.getElementById(`upg-btn-${upg.id}`);
            
            if (btn) {
                // Update cost text dynamically in case costs scale
                const costSpan = document.getElementById(`upg-cost-${upg.id}`);
                if (costSpan) costSpan.innerText = GameData.formatNumber(cost);
                
                // Update owned count dynamically
                const ownedSpan = document.getElementById(`upg-owned-${upg.id}`);
                if (ownedSpan) ownedSpan.innerText = `Owned: ${upg.owned}`;
                
                // Toggle accessibility state based on available funds
                if (gameData.revenue < cost) {
                    btn.setAttribute('disabled', 'true');
                } else {
                    btn.removeAttribute('disabled');
                }
            }
        }
    }

    // Triggered to visualize offline earnings string
    showOfflineEarnings(message) {
        this.offlineMessage.innerText = message;
        this.toaster.classList.remove('hidden');
    }
}

window.UIManager = UIManager;
