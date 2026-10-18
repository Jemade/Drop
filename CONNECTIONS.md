# Drop connection status

Google Drive and YouTube credentials are configured and both accounts have connected in live testing. Remaining providers require the setup described below.

| Provider | Implemented in Drop | Live status |
| --- | --- | --- |
| Google Drive | OAuth, account check, media list, streaming import, refresh, disconnect | Connected in live testing; Drive listing and YouTube browsing verified. Drive import fix deployed. |
| YouTube | OAuth, account/channel check, own uploads list, refresh, disconnect | Connected in live testing; Drive listing and YouTube browsing verified. Drive import fix deployed. |
| Twitch | Paused and removed from the visible product | Developer registration blocked by account 2FA setup |
| Instagram, Facebook, Threads | Not implemented | Needs Meta application setup and provider-specific implementation |
| TikTok, Snapchat, LinkedIn, Pinterest, X | Not implemented | Needs each provider's app setup and provider-specific implementation |
| Dropbox | OAuth with PKCE, refresh, account check, folder browsing, pagination, streaming media import and disconnect | Developer app and runtime credentials configured; live test pending |

None of these connections currently publishes automatically. Account authorisation, reading, importing, publishing and analytics are separate capabilities. A Connected account is not evidence that publishing is implemented.

First activation batch: follow GOOGLE_CONNECTIONS.md for Google Drive and YouTube. Then activate Twitch using the steps below. Do not register every connection as a shared generic OAuth flow: provider requirements and capabilities differ.

## Twitch connection activation

Implemented: server-side OAuth authorisation-code flow, identity-bound encrypted HttpOnly cookies, state validation, token validation and refresh, own-channel video listing, and disconnect/revocation. This links a Twitch account; it does not replace Drop sign-in.

The production encryption secret is configured. Twitch app credentials are not configured. The UI remains Unavailable until registration is completed.

## Register the provider app

1. Open https://dev.twitch.tv/console/apps and register an application owned by Corebridge. Twitch requires a verified account and 2FA. Choose an appropriate application category and confidential client type where offered.
2. Register this exact OAuth callback:
   `https://drop-corebridge.yummy-jay-4160.chatgpt.site/api/connections/twitch/callback`
3. Configure `TWITCH_CLIENT_ID` and secret `TWITCH_CLIENT_SECRET` in the Site runtime settings. Keep client secrets out of source, issues and chat. Redeploy to apply the environment revision.
4. In Drop, open Connections, choose Connect Twitch, authorise your account and return. A Connected status requires a successful provider validation and matching user profile.
5. Use Browse videos and Check connection. Confirm the videos belong to the authorised channel. Disconnect, then confirm provider access is revoked or follow the provider connection-settings instruction if revocation fails.

Capabilities: own account profile and up to 20 channel videos with safe Twitch links. No video downloads, uploads, cross-posting, background monitoring, chat access or broadcasting are claimed. Original recordings can still be uploaded from your device to Drop Studio.

Connections are scoped to the signed-in Drop account and this browser. Tokens never appear in API JSON or JavaScript-readable storage. Sign-out leaves an encrypted owner-bound provider cookie that cannot be used under another Drop identity. Disconnect clears it. Cross-device connection persistence and server-managed revocation records are future architecture work.

References inspected 18 October 2026:
- https://dev.twitch.tv/docs/authentication/register-app/
- https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/
- https://dev.twitch.tv/docs/authentication/validate-tokens/
- https://dev.twitch.tv/docs/authentication/refresh-tokens/
- https://dev.twitch.tv/docs/api/reference/#get-videos

Automated tests cover encryption binding and tampering, missing setup, cross-origin start rejection, invalid/expired state, successful mocked token exchange, provider validation, bounded video listing, refresh, revoked credentials and disconnect. Mock tests are not proof of live provider authorisation. Hosted authorisation and real account testing await app registration.

Other social providers remain unavailable. Each needs its own authorised implementation; adding a brand icon is not an integration.

Removed from the product at the owner’s request: Bluesky, SoundCloud, Amazon, Libsyn and Captivate.fm.
