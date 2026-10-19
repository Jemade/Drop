# Contributing

## Before changing code

Read the README, architecture and security model. Confirm the behaviour against this repository rather than assuming another deployment contains the same features. Keep changes focused and describe the user-visible problem they solve.

Create a working branch from current `main`. Do not include generated `dist/` output, real credentials, browser backups or unrelated formatting changes. Retain licence notices for third-party assets. No project-wide licence has been selected; coordinate distribution or substantial reuse with Corebridge.

## Implementation

- Keep browser processing in `public/` and provider credentials in `worker/`.
- Use native modules and existing conventions unless a dependency solves a demonstrated need.
- Escape rendered text, validate URLs and enforce resource ownership on the server.
- Preserve account isolation and backward compatibility for saved data.
- Distinguish implemented capability, runtime configuration and live verification in UI and documentation.
- Document public routes, record format changes, environment variables and operational limits alongside the change.

Use comments to explain non-obvious constraints or security boundaries. Avoid comments that merely repeat the next statement. Keep examples reproducible and never embed real account tokens in fixtures.

## Required validation

```sh
npm run check
npm test
npm run build
npm run validate
```

Add meaningful regression coverage for changed behaviour. Complete relevant steps in `tests/acceptance.md` for browser-dependent changes. Provider fixtures are not a substitute for authorised live testing. State any unverified step in the pull request.

## Pull requests

Explain the problem, resulting behaviour, validation and any migration or deployment requirements. Include screenshots for interface changes when available. Keep titles and commit messages specific. A reviewer should be able to assess the change without reading a chat transcript.

Never post security-sensitive details in a public issue. Follow SECURITY.md for private reporting.
