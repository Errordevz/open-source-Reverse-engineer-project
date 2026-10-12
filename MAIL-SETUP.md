# Open Mail

An independent, open-source mail workspace exploring a unified inbox for Gmail and Outlook. This project is **not affiliated with Google or Microsoft**.

## Current branch: Open-mail

This branch adds a responsive inbox UI, fictional sample mail, folder navigation, search, star/unstar, selection, archive/trash, message details, and a compose form. It includes the beginnings of OAuth 2.0 Authorization Code + PKCE authorization for Google and Microsoft.

> **Honesty note:** This is a starter, not a complete reverse-engineered copy of Gmail or Outlook. Real inbox syncing, reading full MIME bodies and attachments, sending, labels/folders, pagination, token refresh, and provider-specific actions require a trusted backend and OAuth app registrations. The compose form deliberately does not pretend to send mail. Demo messages are fictional.

## Run locally

No build step is required for the static UI:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`. Or use any static host that serves `index.html`, `styles.css`, and `app.js` together. Demo mode works without credentials.

## Design / reverse-engineering approach

Rather than copying private source code or attempting to bypass sign-in protections, this project studies publicly visible product behavior and implements an original mail client using documented APIs. The reference project [REA: Reverse Engineer Anything](https://github.com/morluto/rea) describes an evidence-led workflow for inspecting websites and tracing behavior; use it only on targets and assets you are authorized to analyze. The [Build Your Own X catalog](https://github.com/Hordekiller/build-your-own-x-en) is a learning index for implementing systems from first principles. DEMO's browser service reported rate limiting during this pass, so this branch does not claim a complete automated browser inspection of Gmail or Outlook.

### Product areas to investigate next

- Inbox list: unread state, sender/subject/snippet hierarchy, date grouping, keyboard focus, pagination and virtual scrolling.
- Message view: MIME parsing, safe HTML rendering, inline images, attachments, reply/reply-all/forward.
- Gmail: labels rather than traditional folders, threads, history sync, search operators, stars/importance and batch modify.
- Outlook / Microsoft Graph: folders, conversation IDs, delta queries, categories, flags, attachments and pagination.
- Shared: account switcher, drafts, signatures, accessibility, responsive layouts, error recovery, offline cache and undo.
- Security: minimal scopes, PKCE, server-side token exchange, encrypted token storage, CSRF/state checks, XSS-safe message rendering and attachment scanning.

## Connect Gmail

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Gmail API** and configure the OAuth consent screen. Add test users while the app is in testing.
3. Create an OAuth client appropriate for your app. Add the exact redirect URI used by the app (for local development, `http://localhost:8000/`; for production, your HTTPS origin/path).
4. Copy the public client ID into `CONFIG.googleClientId` in `app.js`. A client ID is not a secret; **never put a client secret in browser JavaScript**.
5. Use the OAuth button to test the authorization redirect. The static starter intentionally stops after receiving the authorization code.

Official docs:
- [Gmail API overview](https://developers.google.com/workspace/gmail/api/guides)
- [OAuth 2.0 for web/server apps](https://developers.google.com/identity/protocols/oauth2)
- [Gmail scopes](https://developers.google.com/workspace/gmail/api/auth/scopes)

## Connect Outlook / Microsoft 365

1. Register an app in the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Add a supported public-client/web redirect configuration that matches the OAuth flow you implement, and configure supported account types.
3. Add delegated Microsoft Graph permissions appropriate for your use case (for example, `User.Read`, `Mail.ReadWrite`, `Mail.Send`). Consent requirements vary by tenant.
4. Copy the application (client) ID into `CONFIG.microsoftClientId` in `app.js`. Do not add a client secret to static code.
5. The static starter currently stops after the authorization code callback. Complete code exchange and API calls on a trusted backend.

Official docs:
- [Microsoft identity platform authorization code flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow)
- [Microsoft Graph mail API](https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview)
- [Microsoft Graph permissions reference](https://learn.microsoft.com/en-us/graph/permissions-reference)

## Recommended production architecture

- Frontend: this UI (or a TypeScript component architecture once the feature set grows).
- Backend: small Node.js service with OAuth callback and token exchange; no client secrets in static assets.
- Tokens: encrypted server-side storage, strict session cookies, rotation and revocation; never log tokens or email bodies.
- Gmail adapter: `users.messages.list/get/send/modify`, labels, `users.history.list` for sync, pagination and `q` search.
- Graph adapter: `/me/messages`, `/me/mailFolders`, `/me/sendMail`, delta queries and `@odata.nextLink` pagination.
- Shared domain model: normalized message, thread/conversation, account, folder/label, attachment and sync cursor.
- Safety: render message HTML in a sandboxed context, sanitize all untrusted HTML, proxy attachments safely, protect against phishing, and ask for only scopes the user enables.
- Tests: provider adapter contract tests, fixture-based MIME parsing, OAuth state/PKCE validation, XSS fixtures, pagination and retry tests.

## Known limitations

- The demo is local UI state only; changes are not persisted.
- OAuth client IDs are blank by default. OAuth callback code is not exchanged and does not create a connected session.
- No actual messages are fetched, sent, deleted or changed in provider accounts.
- Message body/attachment parsing, real account identity, drafts, threading, labels/folders, live sync, and token refresh are not implemented.
- OAuth scopes are examples and should be minimized/reviewed before release.
- Do not deploy this as a production mail client until a secure backend, provider verification/consent requirements, privacy policy, threat model and tests are in place.

## License

Choose and add a license before redistributing. Do not copy Gmail or Outlook logos, private assets, source code, or proprietary implementation details.