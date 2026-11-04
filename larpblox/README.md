# LarpBlox

An independent, open-source, mobile-first Roblox-style account simulator for roleplay, demos and screen recordings.

## The reference we studied

The public [zlarp Game Account Simulator](https://zlarp.com/apps/game-account-simulator) describes an editable player profile, followers, badges, avatar editor, inventory, outfits, currency balance, community-made catalog items and displayed games. Its own [How zlarp works guide](https://zlarp.com/blog/how-it-works) documents its distinctive Backstage interaction: press and hold the very top edge for about one second, watch the charge strip, then release when the settings sheet appears; changes save as you type.

This project implements an original clean-room simulator using those documented interaction patterns and feature categories. It does not copy proprietary source, private assets, or server code.

## Features

- Full-screen mobile-first app shell with desktop navigation.
- Profile, about, stats, friends, badges and experience showcase.
- Avatar editor with equipped-item toggles and outfit presets.
- Inventory with filters and custom/community catalog item entries.
- Public Roblox username lookup for public display name, avatar thumbnail, follower count, friends count and description, where endpoints are accessible.
- Optional public friends and public experiences import, subject to Roblox visibility and API availability.
- Public catalog asset thumbnail lookup by numeric asset ID.
- Hidden Backstage sheet opened by holding the top edge for about one second, with a charging strip and auto-save.
- Local browser persistence, JSON import/export, image uploads and reset.
- Persistent SIMULATOR labeling.

## iPhone

Open the deployed URL in Safari. Use Share → Add to Home Screen for the full-screen app experience. To open Backstage, press and hold the very top edge of the screen for about one second.

## Data and safety

No Roblox password, cookie, session token or login is requested. Public Roblox endpoints are optional and may be unavailable due to privacy settings, CORS, rate limits or API changes. Private inventory is not accessed. Local inventory, outfit toggles, demo coins, badges and displayed statistics are fictional and do not grant items, Robux or account changes. No editable fake receipts or transaction history are included.

Roblox is a trademark of Roblox Corporation. LarpBlox is unofficial, independent and not endorsed by Roblox.
