# LarpBlox

An independent, open-source, mobile-first Roblox account simulator for roleplay, demos and screen recordings.

## Live app

**https://larpblox-o5bdgx.v2.appdeploy.ai/**

Source branch: [larpblox](https://github.com/Errordevz/open-source-Reverse-engineer-project/tree/larpblox/larpblox)

## V4 features

- **Discover home:** featured Roblox experiences with real public Roblox game thumbnails and links to their original game pages.
- **Public profile copy:** enter a Roblox username to import public profile name, avatar thumbnail, follower/friend counts and description where the public endpoints allow it.
- **Custom identity:** edit display name, username, demo Robux balance and visual Verified/Premium badges in Backstage.
- **Avatar editor:** preview the displayed avatar, manage outfit pieces, and equip/take off items locally.
- **Catalog shelf:** search a curated snapshot of 55 real public Roblox catalog items with public listing names, creators, prices and Roblox CDN thumbnails.
- **TikTok-linked UGC picks:** four creator posts link to their matching Roblox catalog listings (jumping spider, celestial halo, ice-crystal wings and Y2K denim cap).
- **Live asset lookup:** enter a numeric Roblox asset ID to fetch current public item details and its thumbnail through the read-only backend.
- **Inventory, friends, creations and badges:** add, remove, filter, import public data when available, and customize displayed profile content.
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
- The catalog search is a curated local snapshot of public items; asset-ID lookup fetches current public item details. Roblox may change or rate-limit public APIs.

## iPhone installation

1. Open the live app in Safari.
2. Tap **Share**.
3. Choose **Add to Home Screen**.
4. Launch LarpBlox from the new Home Screen icon.

## Project files

- [Source](index.html)
- [Research notes](REVERSE-ENGINEERING-NOTES.md)
- [Test suite](tests/tests.json)
- [PWA manifest](public/manifest.json)
- [iOS bookmark instructions](ios-bookmarklet.txt)
