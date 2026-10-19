# Security

## Report a vulnerability

Email `info@corebridge.co.zw` with the affected component, reproduction steps and impact. Do not include live access tokens, client secrets, browser backups or private customer media. Do not publish exploit details in a public issue before the report has been assessed. This repository does not promise a response-time service level or a bounty.

## Authentication boundary

Production must run behind the trusted hosting authentication gateway. `worker/index.js` consumes the gateway's verified account headers; those headers are not authentication on an arbitrary public server. Do not expose a direct bypass origin without implementing a real session verifier.

Workspace requests require identity. Session responses are no-store. The browser rechecks the session for actions and on returning focus; expired or changed identities lock local access and clear in-memory state. Sign-in is an access control, not local disk encryption or a team membership policy.

## Provider credentials

Google and Twitch credentials remain server-side. Connection cookies use authenticated AES-GCM encryption with account, purpose/provider and origin binding. Cookies are Secure and HttpOnly. Start/disconnect operations require identity and same-origin POST requests. Callbacks validate transaction state; Google also uses PKCE and checks granted scopes. Reads verify the connected external identity and refresh expired credentials when possible.

Tokens must never be returned to browser JavaScript, logged, committed or placed in browser-readable storage. Configure secrets through deployment settings. Rotating the connection encryption key requires users to reconnect.

## Browser storage and files

IndexedDB is partitioned by verified account ID but is not encrypted at rest. Anyone controlling the operating-system/browser profile may inspect local data. Use separate browser profiles for confidential work and protect exported backups.

Imports enforce a 250 MB per-file limit and rely on browser decoding. Rendered text is escaped and source URLs are restricted to HTTP(S). Drive downloads require authorised file metadata and enforced streaming limits. Arbitrary remote URLs are not accepted for that operation.

Backup restore rejects traversal paths, duplicate names, unsupported compression, damaged checksums and invalid records. Validated records merge transactionally without overwriting existing IDs. ZIP backups are plaintext and limited to 500 MB.

## Development and release limits

The development server supplies a fixed identity on loopback only. Never expose it publicly. Tests cover selected handler, storage and provider invariants; they are not a security certification or proof of live provider approval.

Before shared commercial onboarding, review tenant authorisation, central storage, abuse limits, auditability, durable processing and browser end-to-end coverage. Current personal workflow states do not provide team access controls. Keep runtime secrets and platform approval status separate from source documentation.
