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

Searches for public YouTube/video walkthroughs specifically identifying the zlarp Game Account Simulator surfaced several generic Roblox "larp tool" results, but none could be verified as the zlarp product. The YouTube search results included: [BEST ROBLOX LARP TOOL..](https://www.youtube.com/watch?v=ewpxAxb68Yg) (Garry, 0:51), [Best Larp Tool for mobile and pc, larp in a game](https://www.youtube.com/watch?v=dWwPh3CmLPA) (prestige, 0:25), [roblox larp tool (free)](https://www.youtube.com/watch?v=bymBmGfK9X4) (rin, 1:18), and [testing showcasing new roblox larp tool](https://www.youtube.com/watch?v=Rdu7cI-8EVI) (draft247, 0:50). These titles and search-result metadata do not establish that the videos show zlarp's Game Account Simulator. Attempts to resolve and decode the public YouTube videos were blocked by YouTube's login/bot challenge (HTTP 200 interstitial / 429 rate limit); no frames or transcript were delivered. The project therefore does **not** claim to have watched or visually inspected those videos. The zlarp product page itself exposes eight portrait screenshot assets, and its public How it works article is a written walkthrough. It mentions a short phone walkthrough shown after purchase, which is not publicly available from the product page.

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


## 2026-11-05 — V4 product and asset research

### Zlarp feature baseline

The reference product is [zlarp Game Account Simulator](https://zlarp.com/apps/game-account-simulator). Its public product copy describes a profile simulator with avatar, inventory and followers, and editable username, in-game coins, friends, followers, inventory items, avatar outfit, displayed games and badges. The [How zlarp works guide](https://zlarp.com/blog/how-it-works) confirms the phone-first web-app pattern and the top-edge hold gesture for its Backstage editor.

The public [RoLarp Chrome Web Store listing](https://chromewebstore.google.com/detail/rolarp/imccmgejafnlcncnolkfdglhpbkehagb) describes adjacent Roblox LARP features: copy public user information, custom profile mode, visual Verified/Premium indicators and a local Robux display. LarpBlox implements comparable local-only visual controls without copying its code.

### TikTok creator posts found

These public TikTok posts were linked to the matching Roblox catalog items in the LarpBlox catalog. Their public captions and page metadata were available, but TikTok presented a login/signup wall during frame extraction. **The actual video footage was not successfully inspected in this session.** Do not describe the clips as watched or use metadata as a transcript.

| Creator post | Public caption metadata | Matching Roblox item |
|---|---|---|
| [Jumping spider UGC](https://www.tiktok.com/@miranza_offi/video/7669489179167821078) | “CUTE JUMPING SPIDER UGC”; 31 seconds | [Cute black jumping spider](https://www.roblox.com/catalog/93876979367445/Cute-black-jumping-spider) |
| [Celestial halo UGC](https://www.tiktok.com/@miranza_offi/video/7668732272891137302) | “Golden celestial halo UGC”; 33 seconds | [Golden divine celestial halo](https://www.roblox.com/catalog/77745503037034/Golden-divine-celestial-halo) |
| [Ice crystal wings UGC](https://www.tiktok.com/@miranza_offi/video/7667665334807186710) | “ICE CRYSTAL WINGS UGC”; 25 seconds | [Golden ice crystal wings](https://www.roblox.com/catalog/123578458711518/Golden-ice-crystal-wings) |
| [Y2K denim cap](https://www.tiktok.com/@miranza_offi/video/7606486011270401302) | “Y2K denim cap with PBR”; 24 seconds | [Y2K blue jean cap](https://www.roblox.com/catalog/114241510292784/Y2K-blue-jean-cap) |

TikTok's public oEmbed endpoint returned official embed metadata, but the video inspection pipeline did not deliver decoded frames or audio. The browser showed a signup/birthday prompt and cookie consent. A human can complete any login/CAPTCHA gate in the live browser session; credentials should never be shared in chat.

### Public Roblox catalog verification

A public Roblox catalog search was run for Y2K, halo, spider, wings, streetwear hats and face accessories. Fifty-five public catalog results were added to the curated local catalog shelf, including each item's name, creator, listed price and public Roblox CDN thumbnail. The four TikTok-linked items were separately checked through the public economy asset-details endpoint:

- Asset 93876979367445 — Cute black jumping spider — 95 Robux — Powerful artists.
- Asset 77745503037034 — Golden divine celestial halo — 95 Robux — Powerful artists.
- Asset 123578458711518 — Golden ice crystal wings — 140 Robux — Powerful artists.
- Asset 114241510292784 — Y2K blue jean cap — 105 Robux — Powerful artists.

The app uses the public thumbnail URLs and links each card to its original Roblox catalog page. The catalog search is a curated snapshot; numeric asset-ID lookup uses the read-only backend to fetch current public details.

### V4 implementation

- Dark, mobile-first Discover screen with real featured Roblox game thumbnails.
- Username-only public profile import; custom display name, demo balance and visual Verified/Premium toggles.
- Backstage identity, avatar, inventory, friends, creations, badges and settings.
- 55-item curated catalog shelf plus four TikTok-linked UGC cards.
- Local try-on and demo-only buy flow; no Roblox purchase, grant or account modification.
- Read-only backend routes for public profile, friends, games, worn avatar assets, collectibles, catalog search and item details.
- PWA manifest and mobile navigation.

### Known limitations

- TikTok videos were not watched frame-by-frame because the platform required sign-in. The four posts are linked in-app for direct viewing.
- Roblox's catalog search endpoint returned a server-side 502 during the app test, so the UI uses the curated 55-item snapshot rather than claiming live keyword search. Numeric asset-ID details work through the backend.
- Roblox public endpoints may rate-limit or hide friends, inventory or avatar data. A private/unavailable endpoint is reported instead of bypassed.
- AppDeploy's latest deployment status reported ready with no frontend, network or backend QA errors. Live browser reinspection was rate-limited after the final catalog update; physical iPhone Safari testing remains outstanding.


## 2026-11-05 — V5 parity implementation

### Added from the reference feature map

- **Avatar editor:** local skin tone, shirt color, pants color, face and body-scale controls. The preview changes immediately and does not publish to Roblox.
- **Outfit presets:** save, load and delete named local presets that include appearance settings and the currently equipped catalog items.
- **Live catalog search:** the frontend now queries a read-only backend route that calls Roblox's public accessory catalog and public thumbnail API. If Roblox's catalog endpoint is unavailable, the UI falls back to the cached curated shelf and labels it as a fallback.
- **Profile imports:** public follower/following/friend counts, public friend headshots, public creations, worn avatar items, collectibles, badges and favorites are available as optional imports where Roblox exposes them.
- **Creator UGC shelf:** the four MiranzaUGC_offi TikTok post cards now display the post caption, date and duration metadata alongside the matching public Roblox listing and direct source links.

### TikTok inspection result

The public post pages exposed metadata for the four UGC clips, including the creator handle, captions, dates and durations. The video retrieval tool reported `login_required`; its stream probes returned HTML/login responses rather than MP4 bytes. No decoded frames or transcript were delivered. An alternate public-viewer attempt returned a Cloudflare challenge. Therefore the app only shows creator-written caption metadata and links to the original TikTok posts; it does not embed or claim to have watched the videos. Human handoff was not available because the browser service was returning HTTP 429 while creating sessions.

### Boundaries retained

- No Roblox passwords, cookies, access tokens or recovery codes.
- No writes to Roblox accounts, inventory, outfits, friends, currency or transactions.
- Demo purchases only change the browser-local simulator state.
- No editable transaction history, receipts, statements or payment confirmations.
- Public API failures and privacy restrictions are surfaced instead of bypassed.
- All creator thumbnails are public Roblox catalog thumbnails linked to their original listing; TikTok clips remain source links rather than rehosted videos.
