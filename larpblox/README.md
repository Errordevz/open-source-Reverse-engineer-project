# LarpBlox — open-source account simulator

A mobile-first, browser-based **fictional Roblox-style profile simulator** for skits, UI demos and roleplay. It is an independent clean-room implementation, not an official Roblox product and not affiliated with Roblox Corporation.

## Features
- Editable display name, username label, bio, demo stats and fictional token balance.
- Avatar editor and optional public Roblox username lookup for display name + public avatar thumbnail.
- Editable local demo inventory, friends list and displayed experiences.
- Local persistence via browser storage and JSON export.
- Responsive desktop/mobile UI designed for Safari and Add to Home Screen.
- Persistent, unmistakable SIMULATION label and safety copy.

## Public profile lookup
The optional import asks only for a Roblox username and uses Roblox's public username lookup and avatar-thumbnail endpoints. It never asks for a password, cookies, session token or other credentials. Inventory is not scraped or represented as verified ownership: Roblox inventory visibility and endpoint access vary, and private inventory is not available. All inventory items and all displayed metrics in this simulator are fictional/local.

## Run locally
Open `index.html` in a modern browser. No build step or backend is required.

## iPhone
Open the deployed site in **Safari** → Share → **Add to Home Screen**. The app uses a mobile layout and local browser storage. Safari bookmarklets are optional; this standalone app works as a normal website and Home Screen web app.

## Research and method
The target reference was the visitor-facing [zlarp Game Account Simulator listing](https://zlarp.com/apps/game-account-simulator), which publicly describes a customizable profile, avatar, friends/followers, inventory/outfits, currency display and displayed games. This project implements those general product ideas with original code, layout, copy and styling. The project structure and rebuild workflow are informed by [Craft Anything](https://github.com/storytold/craft-anything), an open-source clean-room inspection/rebuild tool. No proprietary zlarp source, assets or private material are included.

## Disclaimer
LarpBlox is a fan-made simulator for entertainment. It does not create or modify Roblox accounts, transfer Robux, grant catalog items, access private inventory, or impersonate Roblox login. Do not enter passwords or payment information.
