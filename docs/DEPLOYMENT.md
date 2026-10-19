# Deployment

## Runtime contract

The production artifact is a Cloudflare Worker deployed behind the hosting platform's trusted authentication gateway. The gateway must supply verified `oai-authenticated-user-id` and `oai-authenticated-user-email` headers and own the `/signin-with-chatgpt` and `/signout-with-chatgpt` routes. These names are hosting protocol identifiers, not content-generation dependencies.

Do not expose the Worker through a public bypass origin. A standalone deployment requires a separately implemented session verifier and corresponding routing changes before it can serve private workspace data safely.

The existing `.openai/hosting.json` binds this source to its hosted project. Preserve that identity when updating the existing deployment. Do not copy it into a new deployment as though it were a reusable project ID.

## Configuration

| Variable | Secret | Used for |
| --- | --- | --- |
| `CONNECTION_ENCRYPTION_KEY` | Yes | Base64/base64url-encoded 32-byte key for connection cookies |
| `GOOGLE_CLIENT_ID` | No | Google OAuth web client identifier |
| `GOOGLE_CLIENT_SECRET` | Yes | Google server-side code exchange |
| `TWITCH_CLIENT_ID` | No | Twitch application identifier |
| `TWITCH_CLIENT_SECRET` | Yes | Twitch server-side code exchange |

Set these through the production runtime's configuration interface. The local development script does not load `.env` files or forward these values to its handler. Never commit real values. Configure only providers that are being enabled.

Rotating the encryption key invalidates existing connection cookies. Coordinate reconnection and retain no plaintext credential backups. Register callback URLs for the exact deployed HTTPS origin; see the provider guides.

## Release procedure

1. Review the diff, including changes to public claims and provider permissions.
2. Run `npm run check`, `npm test`, `npm run build` and `npm run validate`.
3. Commit and push the reviewed source. Package the exact resulting build through the hosting workflow.
4. Save and deploy that source version using the existing project identity and audience.
5. Verify public pages, anonymous workspace redirects, signed-in session checks and the affected browser flows.
6. For provider changes, test consent, denial, expiry, account mismatch and disconnect against a real test account.

A GitHub commit does not itself deploy this application. The repository workflow performs checks only. Deployment configuration and live account readiness must be verified independently of source code.

## Operations and rollback

Record the source commit and deployed version for each release. If a release fails, redeploy a previously verified artifact through the hosting platform. Runtime configuration revisions may also need to be restored; reverting source alone does not restore secrets or cookies.

Browser-local records are not server backups. Before changes to origins, identity scopes or storage formats, provide an export/recovery path. Current connection cookies and local account records do not provide shared tenant administration or cross-device synchronisation.
