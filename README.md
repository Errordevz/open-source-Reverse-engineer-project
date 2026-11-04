# Openfy

**Openfy is a free, open-source, local-first music collection notebook.** Save links to tracks you care about, add your own notes and tags, and keep a personal record of why a piece of music matters to you.

It is an independent companion utility. It is **not** a streaming service, a Spotify client replacement, or an official Spotify product.

> [!WARNING]
> **Spotify inference / integration notice:** Openfy optionally uses Spotify's official Web API to look up metadata for tracks you choose and to show links to your own Spotify playlists. Spotify controls that service, its data, access rules, account eligibility, quotas, and availability. Spotify Premium may be required for API access or playback-related features. Openfy does not host, download, extract, proxy, or stream Spotify audio. All Spotify content remains linked to its Spotify source.
>
> **ZERO MONETIZATION:** Openfy has no ads, subscriptions, paid tiers, donations, sponsorships, affiliate links, in-app purchases, or other monetization. It is free to use and open source.
>
> Openfy is not affiliated with, endorsed by, sponsored by, or approved by Spotify. Spotify is a trademark of its respective owner.

## What it does

- A private, local-first notebook for music links you choose to save.
- Optional Spotify OAuth using Authorization Code with PKCE (no client secret).
- Search Spotify's catalog and save a track with your own note and tag.
- Paste a Spotify track URL to add it to your notebook.
- Browse links to your own Spotify playlists (read-only).
- Filter your saved entries by your personal tags.
- Disconnect Spotify and clear local data from Settings.
- Responsive desktop and mobile layout.

## What it deliberately does not do

- No audio streaming, downloading, ripping, caching, or DRM circumvention.
- No Spotify UI or core experience recreation.
- No recommendation engine or analysis of Spotify listening behaviour.
- No uploading of your personal notes or collection to an Openfy server.
- No advertising, payments, subscriptions, or monetization.

Openfy is designed to add independent value as a personal music-memory notebook, not to mimic or replace Spotify. See [Spotify's Developer Policy](https://developer.spotify.com/policy).

## Run locally

Requirements: Node.js 20+ and npm.

- Run **npm install**
- Run **npm run dev**
- Open the local URL printed by Vite.

## Connect Spotify (optional)

1. Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Copy its Client ID.
3. In Openfy, choose **Connect Spotify** and paste the Client ID.
4. Add the exact Openfy page URL shown in your browser as a Redirect URI in the Spotify app settings.
5. Sign in through Spotify and approve the requested permissions.

Openfy uses PKCE in the browser. It does not ask for or store a Spotify client secret. The access token is kept in sessionStorage for the current browser session and removed when you disconnect or when it expires.

Spotify controls developer access, account eligibility, scopes, API quotas, regional availability, and any Premium requirements. The current Spotify Web API documentation notes account requirements; the Web Playback SDK requires an eligible Premium subscription. Openfy does not bypass any of those restrictions.

## Privacy

- Saved notes, tags, and selected track metadata are stored in your browser's localStorage.
- The optional access token and OAuth state are stored in sessionStorage.
- No Openfy backend, analytics, telemetry, or tracking is included.
- Disconnecting removes the Spotify session token and deletes Spotify-linked metadata and associated notes from this browser.
- Clearing the local collection permanently deletes the saved notes and entries from this browser.

## License

MIT. See [LICENSE](LICENSE).

## Attribution

Spotify-sourced metadata and playlist references are attributed to Spotify and link back to the relevant Spotify content. Spotify marks and content remain the property of their respective owners.
