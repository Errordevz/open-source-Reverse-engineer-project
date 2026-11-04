# LarpBlox

An independent, open-source, mobile-first Roblox-style account simulator for roleplay, demos and screen recordings.

## Live version

- **LarpBlox v3:** https://larpblox-o5bdgx.v2.appdeploy.ai/
- **Source branch:** [larpblox](https://github.com/Errordevz/open-source-Reverse-engineer-project/tree/larpblox/larpblox)

## Reference research

The target is zlarp's [Game Account Simulator](https://zlarp.com/apps/game-account-simulator), not a Roblox game or a real Roblox client. Its public page describes editable profile details, followers, badges, avatar editor, inventory, outfits, currency, catalog/community items and displayed games.

The public [How zlarp works guide](https://zlarp.com/blog/how-it-works) documents the hidden Backstage gesture: hold the very top edge for about one second, watch the charge strip, then the settings sheet slides up; edits save as you type.

The product page exposes portrait screenshot assets and captions for the account screen, editable profile, avatar editor, inventory/outfits and other features. Searches for a verifiable public walkthrough video of this exact product did not find one, so the implementation is based on public screenshots, product copy and the written interaction guide—not a claimed video teardown.

## Version 3

- Mobile-first profile screen with profile stats, tabs, friends, currently wearing, creations and badges.
- Fixed mobile navigation for Profile, Avatar, Catalog, Inventory and Friends.
- Avatar preview and local equip/take-off controls.
- Inventory filters, search, custom items and public catalog thumbnail lookup by numeric asset ID.
- Username-only public Roblox profile import, plus optional public avatar, worn-item, collectibles, friends and creations imports where Roblox exposes them.
- Hidden one-second top-edge Backstage gesture with charging strip, slide-up editor and local auto-save.
- Local JSON import/export, image uploads, and reset confirmation.
- Persistent SIMULATOR labeling.

## Clean-room and safety boundaries

This is an original clean-room implementation of the publicly documented feature set and interaction pattern. It does not copy zlarp's source code, private assets, backend, or access controls.

No Roblox password, cookie, session token or login is requested. Public endpoints may be rate-limited, restricted by privacy settings, CORS-blocked or changed by Roblox. The app never bypasses those restrictions. Local inventory, outfit toggles, demo Robux, badges and displayed statistics are fictional; they do not grant items, Robux, trades or account changes. There are no editable fake receipts or transaction statements.

Roblox is a trademark of Roblox Corporation. LarpBlox is unofficial, independent and not endorsed by Roblox.

## Project notes

- [Reverse-engineering notes](REVERSE-ENGINEERING-NOTES.md) — public reference findings, video-search result, feature map and API limitations.
- [Claude Code instructions](CLAUDE.md) — project guardrails, local workflow and Craft Anything setup notes.
- [iOS bookmark instructions](ios-bookmarklet.txt).

## iPhone install

Open the live URL in Safari and use Share → Add to Home Screen. Hold the very top edge of the screen for about one second to open Backstage.
