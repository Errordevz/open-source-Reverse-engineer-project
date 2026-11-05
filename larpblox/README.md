# LarpBlox

An independent, open-source, mobile-first Roblox account simulator for roleplay, demos and screen recordings.

## Live app

**https://larpblox-o5bdgx.v2.appdeploy.ai/**

Source branch: [larpblox](https://github.com/Errordevz/open-source-Reverse-engineer-project/tree/larpblox/larpblox)

## V5 features

- **Discover home:** featured Roblox experiences with real public Roblox game thumbnails and links to their original game pages.
- **Public profile copy:** enter a Roblox username to import public profile name, avatar thumbnail, follower/friend counts and description where the public endpoints allow it.
- **Custom identity:** edit display name, username, demo Robux balance and visual Verified/Premium badges in Backstage.
- **Avatar editor and outfit studio:** edit local skin, shirt and pants colors, face, body scale and equipped catalog items; save, load and delete named outfit presets.
- **Live public catalog:** search Roblox's public accessory catalog through a read-only backend route for current listing names, creator names, prices and Roblox CDN thumbnails; fall back to the curated 55-item shelf when the API is unavailable.
- **TikTok-linked UGC picks:** four creator posts link to matching Roblox catalog listings (jumping spider, celestial halo, ice-crystal wings and Y2K denim cap), with public caption/date/duration metadata. TikTok required sign-in for video retrieval, so the footage was not visually inspected.
- **Live asset lookup:** enter a numeric Roblox asset ID to fetch current public item details and its thumbnail through the read-only backend.
- **Inventory, friends, creations, favorites and badges:** add, remove, filter, import public profile data when available, and customize displayed profile content. Public friends include avatar thumbnails where available.
- **Hidden Backstage editor:** hold the very top edge for about one second; a charging strip appears and the editor slides up. Changes save locally.
- **Local JSON backup:** export/import simulator state and reset with confirmation.
- **PWA metadata:** add to the iPhone Home Screen from Safari.

## Reference research

The target is zlarp's [Game Account Simulator](https://zlarp.com/apps/game-account-simulator), not a Roblox game or a real Roblox client. Its public product page describes editable username, coins, friends, followers, inventory/outfits, avatar and displayed games. The [How zlarp works guide](https://zlarp.com/blog/how-it-works) documents the hidden Backstage gesture.

We also reviewed public Roblox larp-tool feature descriptions such as [RoLarp](https://chromewebstore.google.com/detail/rolarp/imccmgejafnlcncnolkfdglhpbkehagb): copy public user data, custom profile mode, visual badges and a local display Robux amount.

TikTok creator-post metadata and direct links are recorded in [REVERSE-ENGINEERING-NOTES.md](REVERSE-ENGINEERING-NOTES.md). TikTok's login/signup wall prevented reliable frame extraction in this session, so no claim is made that the clips were fully watched.

## Data and safety boundaries

- This is an independent simulator and is **not affiliated with or endorsed by Roblox or zlarp**.
- Public Roblox CDN thumbnails and public catalog metadata are used with links back to the corresponding Roblox listing.
- No Roblox password, cookie, session token or account permission is requested.
- Public profile imports are read-only. Privacy settings and Roblox rate limits are respected.
- Demo Robux, visual badges, local purchases and inventory changes never affect a real Roblox account or grant real items.
- No transaction receipts, payment confirmations or fake transfer history are generated.
- Catalog search uses the public Roblox catalog API with a curated local fallback; asset-ID lookup, badges, favorites, friends and profile data use read-only public Roblox endpoints. Roblox may change, restrict or rate-limit these APIs.

## iPhone installation

1. Open the live app in Safari.
2. Tap **Share**.
3. Choose **Add to Home Screen**.
4. Launch LarpBlox from the new Home Screen icon.

## Project files

- [Source](index.html)
- [Read-only Roblox API backend](backend/index.ts)
- [Research notes](REVERSE-ENGINEERING-NOTES.md)
- [Test suite](tests/tests.json)
- [PWA manifest](public/manifest.json)
- [iOS bookmark instructions](ios-bookmarklet.txt)


## V5 parity additions

- Local avatar appearance controls and named outfit presets.
- Live public accessory search, with a clearly labelled cached fallback.
- Optional public favorites and badges imports, plus friend avatar thumbnails.
- TikTok creator post captions are labelled as post metadata, not transcripts; source links open the original posts. No video is claimed to have been watched where TikTok blocks playback.
- No editable transaction ledger, receipts or payment confirmations are provided; demo Robux and demo purchases remain local props only.
