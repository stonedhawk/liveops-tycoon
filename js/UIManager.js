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

        // Initialize DOM update cache to optimize rendering performance
        this.cache = {
            revenue: '',
            dau: '',
            arpdau: '',
            rps: '',
            upgrades: {}
        };

        // Initialize UI fragments
        this.initUpgradesUI(gameData);
    }

    // Called once to render the list of upgrades and establish a static DOM element cache
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
                    <span class="upgrade-owned">Owned: ${upg.owned}</span>
                </div>
                <div class="upgrade-desc">${upg.description}</div>
                <button class="btn-buy" data-id="${upg.id}">
                    Buy - $<span class="upg-cost">${GameData.formatNumber(gameData.getUpgradeCost(upg.id))}</span>
                </button>
            `;
            
            this.upgradesContainer.appendChild(div);

            // Establish strong DOM cache for $O(1)$ fast rendering loops
            this.cache.upgrades[upg.id] = {
                cost: '',
                owned: '',
                disabled: null,
                elItem: div,
                elOwned: div.querySelector('.upgrade-owned'),
                elCost: div.querySelector('.upg-cost'),
                elBtn: div.querySelector('.btn-buy')
            };
        }
    }

    // Called every frame by the GameEngine - running at highly optimized 60 FPS
    updateDashboard(gameData) {
        // 1. Update Stats Left Panel with cache checks
        const currentRevenue = `$${GameData.formatNumber(gameData.revenue)}`;
        if (this.cache.revenue !== currentRevenue) {
            this.elRevenue.textContent = currentRevenue;
            this.cache.revenue = currentRevenue;
        }

        const currentDau = GameData.formatNumber(gameData.dau);
        if (this.cache.dau !== currentDau) {
            this.elDau.textContent = currentDau;
            this.cache.dau = currentDau;
        }

        const currentArpdau = `$${gameData.arpdau.toFixed(2)}`;
        if (this.cache.arpdau !== currentArpdau) {
            this.elArpdau.textContent = currentArpdau;
            this.cache.arpdau = currentArpdau;
        }
        
        // Rev/Sec = DAU * ARPDAU
        const rpsVal = gameData.dau * gameData.arpdau;
        const currentRps = `$${GameData.formatNumber(rpsVal)}/s`;
        if (this.cache.rps !== currentRps) {
            this.elRps.textContent = currentRps;
            this.cache.rps = currentRps;
        }

        // 2. Update Upgrades Right Panel dynamically with absolute cache hits
        for (const key in gameData.upgrades) {
            const upg = gameData.upgrades[key];
            const cost = gameData.getUpgradeCost(upg.id);
            const upgradeCache = this.cache.upgrades[upg.id];
            
            if (upgradeCache) {
                // Update cost text dynamically in case costs scale
                const currentCost = GameData.formatNumber(cost);
                if (upgradeCache.cost !== currentCost) {
                    upgradeCache.elCost.textContent = currentCost;
                    upgradeCache.cost = currentCost;
                }
                
                // Update owned count dynamically
                const currentOwned = `Owned: ${upg.owned}`;
                if (upgradeCache.owned !== currentOwned) {
                    upgradeCache.elOwned.textContent = currentOwned;
                    upgradeCache.owned = currentOwned;
                }
                
                // Toggle accessibility state based on available funds
                const isDisabled = gameData.revenue < cost;
                if (upgradeCache.disabled !== isDisabled) {
                    if (isDisabled) {
                        upgradeCache.elBtn.setAttribute('disabled', 'true');
                    } else {
                        upgradeCache.elBtn.removeAttribute('disabled');
                    }
                    upgradeCache.disabled = isDisabled;
                }
            }
        }
    }

    // Triggered to visualize offline earnings string
    showOfflineEarnings(message) {
        this.offlineMessage.textContent = message;
        this.toaster.classList.remove('hidden');
    }
}

window.UIManager = UIManager;
