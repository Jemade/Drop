# Backend isolation and rebuild boundary

This branch isolates the existing Drop backend without deleting it. The production `main` branch remains unchanged.

## Current implementation (preserved for reference)

- `worker/index.js`: authentication gateway integration, HTTP routing and static assets.
- `worker/google.js` and `worker/twitch.js`: OAuth and provider calls.
- `scripts/build-worker.mjs`: embeds frontend assets and bundles the Worker.
- `public/account.js`: frontend session verification.
- `public/app.js`: frontend workspace and provider requests.
- `public/db.js`: browser-side account-scoped IndexedDB.

The frontend is **not** a standalone authenticated application today. Removing the Worker immediately would break `/api/session`, workspace access and connected-provider features.

## Isolation strategy

1. Preserve the legacy Worker in Git history and on this branch as a reference implementation.
2. Introduce an explicit frontend session transport seam (`public/session-api.js`), so authentication transport can be replaced without rewriting account identity checks.
3. Keep existing behavior as the default until the replacement backend is implemented and tested. This branch is not intended for production deployment.
4. Design the replacement API contracts, storage model and security controls before changing endpoint behavior.
5. Migrate one bounded integration at a time, then remove legacy Worker modules and build tooling after acceptance tests pass.

## Proposed backend ownership boundaries (design only)

- **Identity and sessions**: authenticated session endpoint, logout, CSRF and origin protection, account isolation.
- **Connections**: OAuth state, PKCE, token encryption, refresh, disconnect and provider scopes.
- **Workspace API**: drafts, media metadata, publication plans and user settings; persistence and authorization.
- **Media jobs**: upload validation, object storage, background processing, job status and quotas.
- **Observability**: request IDs, structured logs, metrics, error taxonomy and audit records.

No framework, database, cloud provider or authentication vendor has been selected here. Those are architecture decisions for the owner.

## Non-negotiable safety requirements

Never trust identity headers directly from public clients. Do not expose provider tokens to JavaScript or persist them in IndexedDB. Enforce authorization per object, input and upload limits, idempotency for mutation requests, and safe error responses. Preserve existing browser data during any storage migration.

## Acceptance criteria for eventual backend cutover

- Public marketing routes and frontend assets render without the legacy Worker.
- Session expiry and account switching lock access to account-scoped local records.
- All provider connections have real OAuth tests and explicit disconnected/error states.
- API contracts, automated tests, migrations, deployment and rollback are documented.
- Legacy backend is removed only after the replacement passes end-to-end tests.
