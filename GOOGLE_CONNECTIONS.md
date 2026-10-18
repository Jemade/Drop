# Activate Google Drive and YouTube for Drop

## Current implementation

- Google Drive: account authorisation, account verification, a bounded list of media files, streaming import into the browser media library, token refresh and disconnect. Read-only access; no Drive writes or cloud backups.
- YouTube: account authorisation, account/channel checks, a bounded list from the authorised channel's uploads playlist, token refresh and disconnect. Read-only access; no video downloads, uploads or automatic publishing.
- Google identity permissions link an external account. Drop sign-in remains managed by Sites; this is not direct Google login.

No Google developer application is registered yet. These connections stay unavailable until credentials are configured, APIs enabled and the account grants consent. Automated tests use provider fixtures; live authorisation and device-level import/export testing remain outstanding.

## Setup, in order

1. Open https://console.cloud.google.com/projectcreate and create a Google Cloud project named `Drop`. Keep it owned by Corebridge's chosen Google account or organisation.
2. In API Library, enable Google Drive API and YouTube Data API v3 for that project.
3. Open Google Auth Platform. Configure branding and the appropriate audience for the intended users. For initial external testing, add the Google account(s) that will test Drop as test users.
4. In Clients, create a Web application OAuth client named `Drop web`. Register both exact redirect URIs:

   `https://drop-corebridge.yummy-jay-4160.chatgpt.site/api/connections/google-drive/callback`

   `https://drop-corebridge.yummy-jay-4160.chatgpt.site/api/connections/youtube/callback`

5. Configure `GOOGLE_CLIENT_ID` and secret `GOOGLE_CLIENT_SECRET` in Drop's production runtime settings. The existing `CONNECTION_ENCRYPTION_KEY` is already configured; do not rotate it casually. Never commit a client secret or put it in a public issue.
6. Redeploy the saved source with the new environment revision. Open Drop → Connections and authorise Drive and YouTube independently.
7. Test the real account names, denied permissions, cancelled consent, expired authorisation, disconnect and revoked grants. Import a small image and short MP4 from Drive, prepare them and inspect exports. Compare the YouTube list with the authorised channel's own uploads.

Registering the OAuth client alone does not make the product commercially approved. Google may require app/domain and scope verification before wider distribution. Complete Google's prompts and review requirements; do not treat test access as production approval. A custom domain owned by Corebridge is recommended for the commercial launch and associated verification.

## Permissions requested

Both connections request `openid`, `email`, and `profile` to identify the external Google account. Drive additionally requests `https://www.googleapis.com/auth/drive.readonly`; YouTube requests `https://www.googleapis.com/auth/youtube.readonly`.

Permissions are requested only when the visitor clicks the corresponding Connect action. Google code exchange, access/refresh tokens and identity checks stay on the server. Refresh tokens are kept encrypted in account-, provider- and origin-bound HttpOnly cookies. Do not merge Drop accounts by the Google email address.

Declining the feature permission cannot produce a Connected state. The server confirms the external subject before reads. Drive downloads enforce media type, permission and size checks, and stream bytes with an enforced limit rather than buffering a large file in the Worker. The client then uses the existing media inspection and upload path.

Google revocation can affect other permissions granted to the same app. The disconnect confirmation explains this. Connections are browser-scoped; no cross-device persistent connection store or background processing is claimed.

## References inspected 18 October 2026

- https://developers.google.com/identity/protocols/oauth2/web-server
- https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list
- https://developers.google.com/workspace/drive/api/guides/manage-downloads
- https://developers.google.com/youtube/v3/docs/channels/list
- https://developers.google.com/youtube/v3/docs/playlistItems/list
