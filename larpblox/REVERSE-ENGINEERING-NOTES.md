# Reverse-engineering notes: zlarp Game Account Simulator

Research date: 4 November 2026.

## Reference pages

- Product: https://zlarp.com/apps/game-account-simulator
- How it works: https://zlarp.com/blog/how-it-works
- General simulator policy: https://zlarp.com/blog/how-we-keep-zlarp-fun

## What the product actually is

The target is zlarp's **Game Account Simulator** — a web-based, iPhone/Android and desktop simulator for staged game-account screens. It is not a Roblox game, a Roblox client, or a live account modification tool.

The product page describes these customizable elements:
- Username and profile
- In-game coins/currency display
- Friends and followers
- Inventory items and avatar outfits
- Displayed games
- Profile/avatar editing
- Badges and additional profile details

The public listing contains eight screenshot assets with captions/alt descriptions covering:
1. A pixel-perfect game-account screen
2. Editable profile, followers and badges
3. Avatar editor
4. Inventory, outfits and currency balance
5. Desktop support
6. Adding community-made catalog items to inventory
7. Currency balance and transactions display
8. Avatar and profile editing

## Most important interaction: Backstage

The How it works guide documents the exact interaction:
1. Press and hold the very top of the screen for about one second.
2. A narrow strip at the top brightens/fills while the hold is active.
3. Release after the charge completes; a settings sheet slides up.
4. Edit names, balances and pictures in Backstage.
5. Changes save as you type.

On desktop, the same gesture is performed by holding the mouse button at the top edge of the browser window.

The public guide also says mobile apps are websites added to the iPhone Home Screen using Safari → Share → Add to Home Screen. The installed website opens full-screen without the address bar. It needs internet access for the zlarp account's access check; LarpBlox is independent and does not implement zlarp's paywall or subscription check.

## Data rules from the reference

The public How it works article explicitly says the simulators are props, not the real service. It says the products do not connect to real accounts and do not let users write their own transactions, statements or receipts. LarpBlox therefore keeps demo currency as a local display value and does not provide editable transaction receipts or statements.

## Video research

Searches for public YouTube/video walkthroughs specifically identifying the zlarp Game Account Simulator did not surface a verifiable public tutorial. The public product page exposes screenshot assets, not a playable video element. The public How it works article is a written walkthrough. It mentions a short phone walkthrough shown after purchase, which is not publicly available from the product page. Therefore this project does **not** claim to have watched a public zlarp product video.

## Clean-room implementation map

| Reference behaviour | LarpBlox implementation |
|---|---|
| Full-screen mobile app | Responsive app shell and iPhone web-app metadata |
| Simulator marker on every screen | Persistent SIMULATOR tag and watermark |
| Hidden Backstage long press | Top-edge pointer/touch hold with charge strip and slide-up sheet |
| Save edits as typed | Local storage auto-save |
| Profile, followers, friends, badges | Profile overview and dedicated sections |
| Avatar editor and outfits | Avatar preview, outfit label and equipped-item toggles |
| Inventory and community items | Local inventory plus public catalog thumbnail lookup by asset ID |
| Public account context | Username-only public Roblox profile lookup |
| Public avatar context | Public avatar thumbnail, currently worn public avatar assets, and public collectibles when available |
| Displayed games | Manual creations plus optional public creations import |
| iPhone install | Home Screen metadata, manifest and service-worker shell |

## Public Roblox API limitations

LarpBlox only uses public, unauthenticated endpoints:
- Username lookup: `users.roblox.com/v1/usernames/users`
- Public user details: `users.roblox.com/v1/users/{id}`
- Avatar thumbnail: `thumbnails.roblox.com/v1/users/avatar`
- Current avatar assets: `avatar.roblox.com/v1/users/{id}/avatar`
- Public follower/friend counts: `friends.roblox.com/v1/users/{id}/followers/count` and `.../friends/count`
- Public friends: `friends.roblox.com/v1/users/{id}/friends`
- Public creations: `games.roblox.com/v2/users/{id}/games`
- Public collectibles: `inventory.roblox.com/v1/users/{id}/assets/collectibles`
- Public asset thumbnails: `thumbnails.roblox.com/v1/assets`

Roblox may change, rate-limit, restrict or CORS-block these endpoints. Inventory visibility varies. The app reports errors and keeps manual/local editing available. It does not bypass privacy or authentication.

## Craft Anything methodology and environment

The public [Craft Anything repository](https://github.com/storytold/craft-anything) describes a clean-room **Study → Build → Check → Refine** workflow and a Claude Code integration that runs the user's own unmodified local Claude CLI. Its documentation says the user signs in with `claude auth login`; Craft Anything does not handle Claude credentials.

This build used Craft Anything's published workflow as the methodology reference. It was not run on the Ubuntu cloud desktop during this session because the Remote Desktop Commander device was offline. Claude Code was not installed or signed in on that machine.


## Endpoint probes performed

On 4 November 2026, bounded GET probes against a known public Roblox account (user ID 1) returned HTTP 200 for public user details, current avatar data, avatar thumbnails, follower count, public experiences (limit=50), public collectibles (limit=100), and asset thumbnails. The public friends-count endpoint returned HTTP 429 and the friends-list endpoint returned HTTP 403 for that probe. This is why friends import is optional and errors are surfaced instead of assuming a private/blocked list is empty. These probes do not guarantee the endpoints will always respond or that every user's inventory is public.


## Version 3 implementation notes

The version 3 UI was rebuilt around the target's portrait/mobile-first product framing rather than the earlier desktop-style admin dashboard. The live app now uses a profile header and banner, compact account statistics, horizontally scrolling profile tabs, friend and badge strips, a currently-wearing section, experience cards, a dedicated avatar preview, and a bottom navigation bar on narrow screens. The Backstage editor remains hidden behind the one-second top-edge hold.

The product-page HTML exposes an eight-image portrait screenshot carousel (236 × 420 CSS pixels) with captions including "Pixel-perfect game account, built for larping", "Editable profile, followers, badges and more", and "Avatar editor". This confirms the target is designed around phone-sized profile and editor screens. The app uses original CSS and UI markup rather than reusing those product screenshots or private visual assets.

The catalog screen in LarpBlox v3 looks up public Roblox asset thumbnails by numeric asset ID and adds the result to local demo inventory. The inventory view has category filters, a search field and wear/take-off controls. A mobile bottom bar exposes Profile, Avatar, Catalog, Inventory and Friends.

The old local profile shape used a `name` field. Version 3 migrates that value to `displayName` so existing local profile customizations are retained. A web app manifest is included at `public/manifest.json`.

Automated AppDeploy validation for the latest deployment reported no frontend errors, no network errors and no backend errors. The hosted browser inspection service was rate-limited during this session, so an independent interactive visual walkthrough on the live URL could not be completed. Physical iPhone Safari installation and touch testing remain to be done.
