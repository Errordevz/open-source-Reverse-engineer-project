# Open Source Reverse Engineer Project

An independent learning and implementation project for studying how public software behaves, then building original open alternatives with documented interfaces. The first feature branch is **Open Mail**, a unified inbox UI exploring Gmail and Outlook interoperability.

## Open Mail

- [Open Mail UI](index.html)
- [Styles](styles.css)
- [Client interactions and OAuth PKCE starter](app.js)
- [Gmail / Outlook setup, security notes, and roadmap](MAIL-SETUP.md)

Run locally with `python -m http.server 8000` and open `http://localhost:8000`. The inbox uses fictional sample messages until provider integration is completed.

**Important:** This is not a complete Gmail or Outlook replacement yet. The current branch includes the responsive interface and OAuth authorization scaffolding, but does not yet exchange tokens, sync real mail, or send messages. Follow [MAIL-SETUP.md](MAIL-SETUP.md) before connecting real accounts. Never place client secrets or long-lived tokens in frontend code.

## Principles

- Study public behavior and documented APIs; do not copy proprietary source code or bypass authentication.
- Be honest about implemented vs planned features.
- Use least-privilege OAuth permissions and keep tokens server-side.
- Keep user data private; never log access tokens or message contents.

## Research references

- [REA — Reverse Engineer Anything](https://github.com/morluto/rea)
- [Build Your Own X — English catalog](https://github.com/Hordekiller/build-your-own-x-en)
- [Gmail API documentation](https://developers.google.com/workspace/gmail/api/guides)
- [Microsoft Graph mail API](https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview)

Open Mail is independent and is not affiliated with Google or Microsoft.