# Claude Code instructions for LarpBlox

## Mission

Continue the clean-room rebuild of the publicly documented zlarp **Game Account Simulator** as an original, mobile-first web app. Do not turn this into a generic admin dashboard. Preserve the app-like player profile, avatar/inventory views, and especially the hidden Backstage gesture.

## Read first

- `README.md`
- `REVERSE-ENGINEERING-NOTES.md`
- [zlarp product page](https://zlarp.com/apps/game-account-simulator)
- [zlarp's How it works guide](https://zlarp.com/blog/how-it-works)

## Core UX requirements

1. Full-screen app-like layout, designed mobile-first and usable on desktop.
2. A visible `SIMULATOR` label must remain on every screen.
3. Backstage is not a permanent navigation tab or visible edit button. The user presses and holds the very top edge for about one second; a charging strip fills, then the Backstage sheet slides up.
4. Changes in Backstage save as the user types.
5. The simulator includes profile, follower/friend stats, badges, avatar editor, outfits, inventory, catalog/community items, currency balance and displayed experiences.
6. iPhone install is through Safari → Share → Add to Home Screen. Test the standalone layout and safe-area insets.
7. Keep a desktop navigation layout as well as a phone bottom navigation layout.

## Data and safety constraints

- Never add a Roblox password, cookie, session token, login form or credential import.
- Public Roblox API reads only, with no attempt to bypass privacy controls, CORS, rate limits or authorization.
- Clearly distinguish public Roblox data from locally edited simulator data.
- Public inventory/collectibles may be private or unavailable. Explain failures honestly; never imply that an empty or blocked response means the account owns nothing.
- Never write to Roblox accounts, buy or grant catalog assets, alter Robux, or send friend requests.
- Do not add editable fake transactions, receipts or statements. Demo currency is only a local display value.
- Do not claim local demo inventory, badges, stats or outfit toggles are genuine Roblox ownership.
- Do not copy proprietary zlarp source code, screenshots, icons, or assets. Recreate the observable interaction and general information architecture with original implementation and original visual assets.

## Build and check loop

Follow Craft Anything's documented Study → Build → Check → Refine workflow.

- Study the public product page and guide before changing the UI.
- Check at phone widths (390px and 430px), tablet and desktop widths.
- Verify the one-second pointer/touch hold, cancellation when released early, Backstage open/close, auto-save, and local persistence after reload.
- Test public API failures as well as success paths.
- Check keyboard access, focus, contrast, scroll locking, safe-area padding and mobile navigation.
- Check the console and network failures before calling a deployment ready.
- Update `REVERSE-ENGINEERING-NOTES.md` when new public evidence changes the implementation plan.

## Local run

This is currently a static HTML app. From this directory:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Claude Code + Craft Anything

Craft Anything's public README describes the clean-room workflow and its Claude Code integration. It runs the user's own unmodified local `claude` CLI; the user signs in through Claude Code itself. The project must never collect or handle Claude credentials.

On a Linux computer with Rust 1.97+:

```sh
git clone https://github.com/storytold/craft-anything
cd craft-anything
cargo run --release -p craft-anything
cargo install --path apps/craft-anything-cli
craft-anything-cli doctor
```

Install Claude Code separately and sign in locally:

```sh
claude auth login
```

Then use Craft Anything's project workflow to study the public zlarp page and compare this implementation at mobile and desktop widths. The Craft Anything README documents the CLI/MCP workflow and the command form `craft-anything-cli rebuild <target> "<request>"`.

**Important environment note:** the connected Ubuntu cloud desktop was offline during the current build session, so Craft Anything and Claude Code have not been installed or launched on that machine. Do not claim that this setup step has been completed. Once the device is online, run the installation and `doctor` checks there.

## Deployment

Current public preview: https://larpblox-o5bdgx.v2.appdeploy.ai/

GitHub branch: `larpblox`
