# Drop security model

## Production

Deploy behind Sites dispatch only. It validates the managed session and supplies the authenticated user headers. Do not publish this Worker on a bypass origin or trust those headers on a generic public HTTP server.

The Worker checks identity for `/workspace` and `/api/session`. Session responses and pages are no-store. Auth routes are owned by the hosting platform. There are no passwords, custom session secrets, auth tokens in browser storage, payment handlers or social access tokens in this repository.

No server mutation API exists in this release. Methods other than GET/HEAD receive 405. Every future data endpoint must verify identity, authorize the requested resource and validate input server-side. Sign-in alone is not a team or tenant membership policy.

## Browser data

IndexedDB is partitioned using the verified Site-specific user ID. Anonymous initialization fails. Native sign-out navigates the whole page, discarding in-memory state. The earlier unscoped workspace can only be copied through an explicit user action. Do not use that import feature on a shared device.

Local data is not encrypted at rest by Drop. An operating-system user who can inspect the browser profile can inspect its IndexedDB. Server sign-in does not substitute for operating-system account isolation.

## Client inputs

User-facing text is HTML escaped, source links are restricted to http/https and media is decoded through browser codecs. Exports use canvas and MediaRecorder. Crop, trim and caption settings are validated. Upload size is limited to 250 MB per file. Browser storage quotas still apply.

CSP limits scripts, network connections, fonts and media to the current origin or required blob/data URLs. No third-party analytics or runtime CDN scripts are included. Brand logos are local assets and do not authorize platform API access.

## Development

`npm start` binds to 127.0.0.1 and provides a fixed local-development identity solely for personal testing. It must never be exposed to the internet or used as production authentication. Production build excludes the development server.

## Remaining release gates

Before commercial onboarding: shared authenticated data storage, tenant authorization, encrypted provider tokens, abuse limits, audit logs, durable processing jobs, verified OAuth integrations and complete browser E2E testing. Current tests verify handler behavior and domain invariants; they do not certify the whole platform as secure.

## Workspace archives

Drop uses uncompressed ZIP STORE entries with CRC32 checksums. Restore rejects path traversal, duplicate entry names, unsupported compression, bad checksums, oversized files and invalid record IDs. Media is decoded through the browser before writing. Validated records merge into the current account in a single IndexedDB transaction. Existing keys are skipped. The ZIP is a portable plaintext copy and should be stored privately.

Direct Google login has not been enabled without a configured provider. See GOOGLE_SIGN_IN.md for the required identity/session work.


## Session revalidation

Account settings can verify the current server session explicitly. Workspace actions recheck it after a maximum 60-second client cache interval, and returning focus forces a fresh check. Expired, malformed or changed account identities lock the database, clear in-memory workspace state and show sign-in. Network failures block the requested action without claiming the session is valid or deleting local records. Hosted provider login/logout still belongs to Sites. Browser interaction coverage remains required.
