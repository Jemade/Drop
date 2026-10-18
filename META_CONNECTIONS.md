# Instagram, Facebook and Threads connections

These are external account connections, separate from Drop's Sites-managed sign-in.
The initial capability is read-only: Instagram posts, managed Facebook Pages, and
Threads posts. This version does not publish to these three services.

## Production setup

Use the Meta developer dashboard to configure the appropriate products and credentials.
Store each ID/secret pair as Sites runtime secrets, never in GitHub or browser code:

| Connection | Runtime secrets | Requested permissions |
| --- | --- | --- |
| Instagram Login | `INSTAGRAM_CLIENT_ID`, `INSTAGRAM_CLIENT_SECRET` | `instagram_business_basic` |
| Facebook Login | `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET` | `pages_show_list`, `pages_read_engagement` |
| Threads | `THREADS_CLIENT_ID`, `THREADS_CLIENT_SECRET` | `threads_basic` |

Keep the existing `CONNECTION_ENCRYPTION_KEY`; rotating it invalidates all stored connections.
Use the product-specific Instagram and Threads credentials shown in the dashboard;
do not assume that the Facebook parent app credentials are interchangeable.

Register these exact redirect URIs under their corresponding products:

- Instagram: `https://drop-corebridge.yummy-jay-4160.chatgpt.site/api/connections/instagram/callback`
- Facebook: `https://drop-corebridge.yummy-jay-4160.chatgpt.site/api/connections/facebook/callback`
- Threads: `https://drop-corebridge.yummy-jay-4160.chatgpt.site/api/connections/threads/callback`

Use an Instagram professional account. For Facebook, authorise a user who manages
at least one Page. Configure eligible app roles/test accounts while in development;
complete Meta's applicable permission/access review before offering access beyond
the accounts allowed by the app's development configuration. Follow the dashboard's
current requirements for privacy policy, data deletion and live access.

## Live acceptance (requires account owner)

1. Sign into Drop and open Connections.
2. Connect one provider. Confirm the provider consent screen shows the expected app,
   account and permissions. Consent is completed by the account owner.
3. Return to Drop; Check connection must show the correct account.
4. Browse posts or Pages and open one result. Facebook returns up to 50 Pages;
   Instagram and Threads return up to 20 recent posts. Pagination is not implemented.
5. Reload Drop and check again. Repeat under another Drop account: credentials from
   the first account must not be accepted.
6. Disconnect; check that Drop returns to Not connected. Disconnect removes Drop's
   encrypted cookie. Provider revocation is separate and must be done in that
   provider's app permissions screen; Drop does not claim to have revoked it.
7. Reconnect, then revoke in the provider settings. Check connection should fail
   instead of reporting Connected.

Tokens live in encrypted Secure/HttpOnly cookies bound to the Drop account, provider
and Site origin. Google/other existing connections are preserved. Expired Facebook
access requires reconnecting. Eligible Instagram and Threads long-lived tokens are
refreshed when within seven days of expiry and at least one day old.

## Verification and limits

18 targeted mocked-provider tests cover route guards, OAuth state/account binding,
server-only token exchange, expired/revoked/swapped accounts, list ownership, safe
links, disconnect semantics, token renewal and missing Facebook Pages. These tests
do not prove real credentials, Meta approval, consent or live provider access.
Browser QA and owner-authorised live account tests remain required.

Meta reference sources:
- https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login/
- https://developers.facebook.com/documentation/pages-api
- https://www.postman.com/meta/threads/documentation/dht3nzz/threads-api
