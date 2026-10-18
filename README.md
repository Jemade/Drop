# Drop

Content preparation, research and publication planning. Powered by [Corebridge](https://corebridge.co.zw).

## Version 0.2

- Original vector identity, self-hosted fonts, real photography and responsive workspace.
- Captioned 30-second illustrated product demonstration on the homepage, with an example-photo flow you can try.
- Managed Sign in with ChatGPT, server-protected workspace route, verified session endpoint and sign-out.
- Browser media and records separated by verified account. An explicit settings action imports the earlier local preview's data on your own device without overwriting current records.
- Proper platform marks for all 16 integration destinations.
- Media library, crop/trim/manual captions/branding, PNG and browser-video export, drafts, personal approvals, manually sourced research, reusable presets and calendar reminders.

## Run locally

Node 20+ is required. No npm dependencies or API keys are needed.

```sh
npm start
```

Open http://127.0.0.1:8000. The development server binds only to loopback and provides an explicitly labelled development identity. Never expose that server publicly. Production authentication is provided by Sites dispatch, not this local server.

```sh
npm run check
npm test
npm run build
node scripts/validate-artifact.mjs
```

## Hosted identity and security boundary

Production runs as a Cloudflare Worker behind Sites dispatch. The hosting platform owns sign-in, sign-out, session cookies and verification. Drop consumes the verified `oai-authenticated-user-id` and email headers server-side. These headers are not a standalone authentication mechanism; deploying this Worker publicly outside that trusted dispatch boundary requires a real identity verifier.

- `/workspace` redirects anonymous requests to managed sign-in.
- `/api/session` returns 401 without a complete verified identity and is never cached.
- Sign-in uses top-level navigation; there are no custom password fields, client bearer tokens or tokens in localStorage.
- Workspace rendering and IndexedDB initialization require a verified session. Each account uses a separate database name.
- CSP, nosniff, referrer and permissions policies are applied. The Worker exposes no state-changing API routes; other methods receive 405.
- Site audience remains owner-private. This update does not open the site to the public or invite customers.

Authentication protects access to the hosted workspace. Media remains local browser data, not encrypted cloud storage. Anyone with control of the same operating-system/browser profile may inspect local files. Do not use shared browser profiles for confidential client media.

## Working personal flows

1. Upload a real image, video or audio file, up to 250 MB each. Metadata and thumbnails are stored in IndexedDB.
2. Prepare portrait, square or landscape versions. Reposition a crop, trim video, add brand text and manually timed captions.
3. Export PNG images or browser-recorded video (usually WebM; codec depends on browser). Video exports run in real time and require keeping the tab visible.
4. Save drafts, send to your own review checklist and mark approved.
5. Save source references and observations; optionally enter public metrics. Complete entries produce reaction/comment engagement comparisons. Missing metrics are not treated as zero.
6. Turn references into original briefs, save publication plans and export .ics reminders.
7. Reuse preparation presets, change brand defaults, download originals and export workspace notes.

The homepage demonstration is a labelled illustrated walkthrough made from product layouts and example photography, not a recording of customer activity. It shows manual publication planning. Regenerate it with `python3 tools/generate_demo.py` (Pillow and FFmpeg required).

## Limitations

Direct social publishing, automatic competitor monitoring, speech transcription, cloud media synchronization, team invitations and billing are not connected. Integrations clearly state availability. Calendar entries are reminders rather than server publishing jobs. A platform logo does not imply a working connection or partnership.

Files remain on the current browser and origin. Clearing site data removes them. Browser storage persistence is requested but not guaranteed. Keep originals backed up. Account sign-in does not synchronize files between devices. Workspace JSON export excludes media and does not yet support restoring arbitrary exports.

Competitor metrics are manually entered public observations; they do not reveal private reach, retention, conversions or paid distribution. Compare similar platforms and periods. Recommendations are experiments, not promises of virality.

## Structure

- `public/`: client application, original SVGs, fonts, photography, platform icons and demonstration video.
- `worker/index.js`: verified request identity, route protection, response policies and ranged asset delivery.
- `scripts/build-worker.mjs`: embeds client assets into one deployable Worker under `dist/server/index.js`; no runtime CDN dependencies.
- `scripts/dev.mjs`: loopback-only development server and development identity.
- `public/db.js`: account-scoped IndexedDB and explicit earlier-workspace import.
- `public/media.js`: decode, thumbnails, canvas composition and browser exports.
- `public/domain.js`: validation, research calculations and calendar serialization.
- `tests/`: 19 checks for route protection, session separation, safe redirects, security headers, byte ranges, page templates, storage scoping, crop geometry, clip validation and research calculations.

## Verification

Syntax checks, all 19 tests, Worker build and artifact validation pass. The generated MP4 is 1280×720, H.264, 30 seconds, with fast-start metadata and a separate WebVTT caption track. Full desktop/mobile browser sign-in and file-export QA remains outstanding because the authoring environment lacks the supported browser QA integration.

See [DESIGN.md](DESIGN.md), [SECURITY.md](SECURITY.md) and `public/assets/platforms/SOURCES.txt` for visual sources and security assumptions.

## Ownership

Copyright 2026 Corebridge. All rights reserved. Third-party fonts and marks retain their respective licenses. No open-source license is granted for Drop.

## Version 0.3

- Screenshot-inspired original channel-format previews, integration availability strip and expandable FAQ on the homepage.
- A three-step workflow builder: library source, preparation destinations, output formats. Saved workflows export a real ZIP content kit with prepared files and a manual publication manifest.
- Full browser workspace backup ZIP, including original media. Restore validates paths, checksums, record identifiers and media decodability before an atomic IndexedDB merge. Existing records are not overwritten. Archives are not encrypted and are limited to 500 MB.
- Multiple saved preparation versions, exact draft links and navigation autosave for edited drafts.
- Video export checks cancellation before setup and during frame composition.
- Direct Google sign-in is still a configuration/hosting dependency; see GOOGLE_SIGN_IN.md. Current managed sign-in remains active.

The checks now include ZIP binary round-trips, damaged archive rejection, backup metadata validation, workflow validation, all page templates, original reference-inspired homepage sections, and the earlier auth/domain checks. ZIP output was also checked with Python's independent zipfile reader.
