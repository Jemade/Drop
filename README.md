# Drop

A browser-based workspace for preparing images and videos, organising drafts, researching content and planning publication. Built by [Corebridge](https://corebridge.co.zw).

## Features

- Import images, video and audio from your device, with a 250 MB per-file limit.
- Crop images and video to portrait, square or landscape formats; trim video; add branding and manually timed captions.
- Export PNG images and browser-recorded video; save preparation versions and reusable presets.
- Organise drafts, personal review states, research references and publication reminders.
- Export content kits and full workspace backups; restore backups without overwriting existing records.
- Connect Google Drive, YouTube and Twitch through server-side account authorisation when deployment credentials are configured.

The browser performs media preparation; captions and research observations are entered manually.

## Quick start

Requires Node.js 20 or later and a modern browser with IndexedDB, Canvas and MediaRecorder support. The application has no npm runtime dependencies.

```sh
git clone https://github.com/Jemade/Drop.git
cd Drop
npm start
```

Open <http://127.0.0.1:8000>. The development server uses a fixed local identity and binds to loopback only. It is not a production server. Source changes require restarting it.

## Verify a change

```sh
npm run check
npm test
npm run build
npm run validate
```

Tests use isolated fixtures and mocked provider responses. Passing them does not verify live OAuth, browser codec support or delivery to an external service. Complete the [manual acceptance walkthrough](tests/acceptance.md) for affected user flows.

## Storage and deployment

Media and workspace records remain in account-scoped IndexedDB on the current browser and origin. Sign-in does not synchronise files across devices. Download backups and keep originals before clearing browser data or changing origins.

Production uses a Cloudflare Worker behind a trusted hosting authentication gateway. The Worker cannot safely be exposed directly while trusting identity headers. Provider secrets remain on the server. See [Security](SECURITY.md) and [Deployment](docs/DEPLOYMENT.md).

## Supported connections

| Provider | Implemented capability |
| --- | --- |
| Google Drive | Read media metadata and import authorised files |
| YouTube | Read the authorised channel and its uploads |
| Twitch | Read the authorised account and its channel videos |
| Other displayed platforms | Preparation destinations only; no connected API implementation |

These connections require deployment configuration and account consent. This repository does not implement direct publication, unattended scheduling, provider analytics, shared team workspaces or billing. Calendar exports are reminders. Check [Connections](CONNECTIONS.md) before enabling a provider.

## Documentation

| Guide | Contents |
| --- | --- |
| [Architecture](docs/ARCHITECTURE.md) | Components, request flows and trust boundaries |
| [Development](docs/DEVELOPMENT.md) | Local setup, scripts and testing |
| [Deployment](docs/DEPLOYMENT.md) | Runtime requirements, configuration and release procedure |
| [HTTP API](docs/API.md) | Session, connection routes and error handling |
| [Storage](docs/STORAGE.md) | Record ownership, backups and recovery |
| [User guide](docs/USER_GUIDE.md) | Media preparation, research and planning |
| [Connections](CONNECTIONS.md) | Provider capabilities and activation checklist |
| [Google connections](GOOGLE_CONNECTIONS.md) | Drive and YouTube setup |
| [Authentication](GOOGLE_SIGN_IN.md) | Workspace sign-in versus external account connections |
| [Design](DESIGN.md) | Interface and accessibility conventions |
| [Contributing](CONTRIBUTING.md) | Change workflow and review expectations |
| [Security](SECURITY.md) | Security model and vulnerability reporting |

## Licensing

No project-wide licence has been selected in this repository. Contact Corebridge before redistributing the application. Bundled fonts and platform assets retain their own notices under `public/assets/`.
