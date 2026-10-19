# Workspace authentication and Google connections

Workspace authentication is owned by the trusted hosting gateway. It protects `/workspace`, supplies verified identity headers and handles sign-in/sign-out. See the deployment guide for the exact runtime contract.

Connecting Google Drive or YouTube links an external account for read operations. It does not create a Drop login, replace the workspace session or merge accounts by email. This repository does not implement standalone Google sign-in.

## Replacing managed authentication

A replacement needs a maintained authentication backend, OAuth state/nonce checks, verified issuer/audience/signature/expiry, secure server-owned sessions and explicit account linking. Preserve the existing access boundary until the replacement is tested.

Changing workspace account IDs affects IndexedDB ownership. Provide an intentional export/import or migration path rather than silently merging records. Test consent cancellation, callback replay, logout, expired sessions and account isolation before enabling a new login button.

See [Google connections](GOOGLE_CONNECTIONS.md) for Drive and YouTube configuration and [Deployment](docs/DEPLOYMENT.md) for the hosting boundary.
