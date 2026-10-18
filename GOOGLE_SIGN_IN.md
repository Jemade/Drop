# Direct Google sign-in: configuration dependency

Drop currently uses Sites-managed Sign in with ChatGPT. That provider owns the hosted session, sign-in and sign-out routes. There is no direct Google OAuth client configured in the Site's runtime, and no supported external-provider switch is exposed by the current hosting tools.

Direct Google sign-in is therefore not enabled, and Drop does not display a button that pretends it is connected. Signing in to a ChatGPT account through Google is distinct from signing directly in to Drop through Google.

## Required implementation work

1. Select an authentication backend that supports Google sessions on Drop's production hosting. Preserve the current managed sign-in until the replacement can be tested.
2. In the project's Google Cloud / Google Auth Platform configuration, create a web OAuth client, configure app branding and audience, and register the exact production origin and callback URI used by that backend.
3. Configure the public client ID and private client secret through the selected backend's secret storage. Secrets must never be committed, sent to the browser or pasted into a public issue.
4. Implement the provider through a maintained authentication library: state/nonce verification, code exchange, issuer/audience/signature/expiry verification and server-owned secure sessions.
5. Use the verified Google subject as the identity, with explicit account linking rather than email-only merges. Existing ChatGPT-scoped browser records must be imported intentionally.
6. Test sign-in, cancellation, denied consent, invalid/replayed callbacks, logout and account isolation before enabling the production button.

## References

- Google Identity OpenID Connect: https://developers.google.com/identity/openid-connect/openid-connect
- Google web server OAuth flow: https://developers.google.com/identity/protocols/oauth2/web-server

The current release makes no claim that direct Google sign-in is complete. No fake client IDs, auth endpoints or success responses were added.
