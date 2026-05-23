# ⚡ LiveOps Tycoon

<p align="center">
  <img src="https://img.shields.io/badge/Architecture-MVC-ff69b4.svg?style=for-the-badge" alt="Architecture MVC">
  <img src="https://img.shields.io/badge/Vanilla-ES6%20JavaScript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS">
  <img src="https://img.shields.io/badge/Styling-Vanilla%20CSS-1572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="Vanilla CSS">
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="MIT License">
</p>

---

## 🎮 Play the Game Now
👉 **[Click here to play LiveOps Tycoon on GitHub Pages!](https://stonedhawk.github.io/liveops-tycoon)**

---

## 📝 Overview
**LiveOps Tycoon** is a modern, responsive, and high-performance resources management idle game built for the browser. Players act as Product Managers/LiveOps Owners of a growing mobile game studio. Your goals are to:
1. **Grow Daily Active Users (DAU)** via user acquisition campaigns.
2. **Optimize Average Revenue Per DAU (ARPDAU)** through monetization features.
3. **Execute Live Events** ("Run LiveOps Event") to generate massive immediate revenues.
4. **Automate Passive Revenue Production** scaling up based on complex idle simulation algorithms.

---

## 🚀 Key Features

* **⚡ Interactive Control Center:** A premium dark-theme SaaS dashboard featuring live interactive widgets, micro-animations, and glow transitions.
* **📈 Rich Scaling Formula:** High-fidelity exponential math costing model that perfectly simulates classic game economies.
* **💾 Zero-Loss Local Persistence:** Automated saving to `localStorage` every 10 seconds.
* **💤 Intelligent Offline Calculations:** Returns and calculates elapsed timestamps dynamically to award correct background revenue upon tab/session restoration.
* **📱 Desktop & Mobile Grid Responsive:** Stacks elegantly using pure modern CSS Grid layout guidelines.
* **⚡ High-Performance DOM Caching:** Handlers optimized to run at a buttery-smooth 60 FPS by rendering updates only when variables shift.

---

## 🏗️ Technical Architecture (MVC Pattern)

This project strictly adheres to a modular, decoupled **Model-View-Controller (MVC)** framework with absolutely zero external dependencies.

```
       ┌────────────────────────────────────────────────────────┐
       │                                                        │
       ▼                                                        │
┌──────────────┐          State Sync          ┌──────────────┐  │
│  GameData    │─────────────────────────────▶│  UIManager   │  │
│  (Model)     │                              │  (View)      │  │
└──────────────┘                              └──────────────┘  │
       ▲                                                        │
       │                                                        │
       │ Triggers / Recalculates                                │ Direct Render
       │                                                        │ Updates
┌──────────────┐                                                │
│  GameEngine  │◀───────────────────────────────────────────────┘
│ (Controller) │             Click Events / Purchases
└──────────────┘
```

### 🗂️ Component Directory
* **Model (`js/GameData.js`):** Owns the single-source-of-truth state parameters (`revenue`, `dau`, `arpdau`), defines the upgrades marketplace array, recalculates core statistics, and implements localStorage data encoding/decoding.
* **View (`js/UIManager.js`):** Manages DOM elements mapping and interactive rendering. Includes a high-performance element caching layer preventing redundant browser painting.
* **Controller (`js/GameEngine.js` & `js/main.js`):** Wires model and view hooks, configures the `requestAnimationFrame` loop, and determines physics tick dynamics, manual click rewards, and offline progressions.

---

## 📊 Core Idle Math & Balancing

### Exponential Upgrade Scaling
Upgrades in the marketplace scale dynamically to ensure continuous balancing:
$$\text{Cost} = \text{Base Cost} \times 1.15^{\text{Owned}}$$

### Passive Income Production
Passive cash generation ticks smoothly on every single frame:
$$\text{Revenue} = \text{DAU} \times \text{ARPDAU per second}$$

### Compact Formatting
Large numbers are elegantly shortened using standard international idle notation:
* `1,500` ➡️ `1.5K`
* `1,000,000` ➡️ `1M`
* `2,500,000,000` ➡️ `2.5B`

---

## 💻 Developer Setup

Since this game is built using zero external build tools, packers, or third-party framework setups, running it is exceptionally simple.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/stonedhawk/liveops-tycoon.git
   cd liveops-tycoon
   ```

2. **Run it locally:**
   * **Option A:** Open `index.html` directly in your browser.
   * **Option B (Recommended):** Run a lightweight local HTTP server for clean storage tracking:
     ```bash
     # Python 3
     python3 -m http.server 8000
     
     # Node.js (if installed)
     npx serve .
     ```
   * Open your browser and navigate to `http://localhost:8000`.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="right">Created with ♥ by <a href="https://github.com/stonedhawk">Rahul Shah (Stonedhawk)</a></p>
