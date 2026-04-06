# LiveOps Tycoon

![LiveOps Tycoon Screenshot](placeholder.png)

## Play the Game
[Play LiveOps Tycoon online here!](https://stonedhawk.github.io/liveops-tycoon)

## Overview
**LiveOps Tycoon** is an idle resource management game simulating the economy of a mobile live operations environment. Act as the product owner: acquire daily active users (DAU), optimize average revenue per DAU (ARPDAU), and execute manual live ops events to drive your revenue up.

## Architecture
This project is built using a strict, zero-dependency **Model-View-Controller (MVC)** pattern with pure HTML, CSS, and Vanilla ES6 JavaScript.

- **Model (GameData.js)**: Responsible for maintaining state, core exponential scaling math, parsing numbers, and saving/loading from `localStorage`.
- **View (UIManager.js)**: Responsible purely for DOM manipulation, button states, and updating text nodes when the engine triggers a dashboard sync.
- **Controller (GameEngine.js + main.js)**: Manages the `requestAnimationFrame` ticking physics loop, calculates passive resource generation over time/offline, and wires up events scaling into the Model and View.

## Features
- **Idle Simulation**: Earn revenue passively relative to your DAU multiplied by ARPDAU. 
- **Offline Earnings**: Generates background progress scaling up linearly depending on the timestamp diff since the player's last session.
- **Marketplace**: Acquire permanent upgrades utilizing an exponential costing algorithm ensuring scaling difficulty.
- **Dark UI**: Clean, non-intrusive SaaS-like UI.

## Build Setup
This project runs entirely in the browser and requires no active development dependencies or build steps. Just open `index.html` in an HTTP server.
