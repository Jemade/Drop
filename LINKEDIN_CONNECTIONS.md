# LinkedIn account connections

Runtime secrets: LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET and the existing CONNECTION_ENCRYPTION_KEY. Store these through Sites runtime environment settings, never client code or Git.

The developer app needs Sign In with LinkedIn using OpenID Connect and Share on LinkedIn provisioned. Register the exact site origin plus /api/connections/linkedin/callback. Requested scopes: openid profile email w_member_social.

Implemented: personal account authorization, account status checked against LinkedIn userinfo, expiry detection, and local disconnect with instructions for revoking access in LinkedIn. This does not change Drop sign-in. Token and state cookies are encrypted, HttpOnly, Secure and bound to the Drop owner, provider purpose and origin. Mutations require same-origin POST. Tokens are never returned in API JSON. Expired connections require reconnecting; no refresh capability is assumed.

Not implemented: posting, media upload, member post history, analytics, company Page access or scheduled publishing. The connected card does not offer those actions. Company Page permissions require separate LinkedIn product access.

Acceptance: connect from Connections, approve LinkedIn consent, return to Drop, confirm actual account name, check status, disconnect, reconnect. Automated fixtures cover authorization, state validation, owner isolation, expiry, provider errors and token secrecy; they do not substitute for a live account test.
