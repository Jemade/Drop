# HTTP API

All routes are same-origin. Connection endpoints require the verified workspace identity supplied by the hosting gateway. Session and connection responses must not be cached. Tokens are never returned as API JSON.

## Session

`GET /api/session` returns a `user` object with `id`, `email` and `name`, plus provider/storage metadata, when signed in. It returns HTTP 401 with `user: null` when identity is missing. The client must validate the returned user and reject an account that differs from its configured database identity.

Anonymous `GET /workspace` requests redirect to managed sign-in. Public product routes and existing static assets are available without a workspace session. Unknown API routes return 404; unsupported non-provider mutation methods return 405.

## Connections

Replace `{provider}` with `google-drive`, `youtube` or `twitch`.

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/connections/{provider}` | Configuration/connection status |
| POST | `/api/connections/{provider}/start` | Begin provider authorisation |
| GET | `/api/connections/{provider}/callback` | Provider redirect; validates transaction state |
| GET | `/api/connections/google-drive/items` | Read a bounded list of authorised media files |
| GET | `/api/connections/youtube/items` | Read the authorised channel’s uploads |
| GET | `/api/connections/twitch/videos` | Read the authorised channel’s videos |
| POST | `/api/connections/{provider}/disconnect` | Revoke or clear the connection |
| GET | `/api/connections/google-drive/download?id={fileId}` | Stream an authorised supported media file |

Start and disconnect require a matching Origin header. The browser includes same-origin credentials. Do not call the callback directly or attempt to manufacture an authorisation code. Item-list response shapes are provider-specific; see `worker/google.js`, `worker/twitch.js` and their tests for exact fields.

## Failure handling

Treat non-success responses as failures and display the returned safe error where provided. A configured application is not the same as a connected user. A cancelled consent screen must not become a Connected badge. Expired or revoked grants require refresh or reconnection.

Drive import checks the requested identifier, provider permissions, supported media type and size. The server streams with an enforced byte limit; the browser still decodes and inspects the imported media. Never replace a file identifier with an arbitrary download URL.

## Static media

The Worker handles GET and HEAD asset requests, including single byte ranges. Invalid or unsatisfiable ranges return 416. This supports the bundled demonstration video; it is not a general-purpose upload endpoint.
