# Drop

Content, carried further. An independent product by Corebridge.

## Run

Requires Python 3 for serving static files. No package installation or API key is needed.

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Use a recent desktop Chrome or Firefox for video exports. Node 20+ runs the checks:

```sh
npm run check
npm test
```

## What works in v0.1

- Upload real video, image and audio files (250 MB each), with metadata and thumbnails.
- Keep media and records in IndexedDB across page reloads on the same origin/browser.
- Search and filter media, rename files, download originals and delete files with confirmation.
- Prepare portrait, square and landscape crops, position a subject, trim a video, add brand text and timed manual captions.
- Download prepared PNG images or browser-recorded video, usually WebM. Video recording uses canvas.captureStream and MediaRecorder, including a Web Audio stream. Exports run in real time and require keeping the tab visible. Output codec varies by browser; it is not guaranteed MP4 or accepted by every destination.
- Save preparation drafts, submit to a personal review checklist and mark approved.
- Store source references, observations and manually entered public metrics. Complete metric records produce reaction/comment engagement rates and a median; missing fields are not assumed to be zero.
- Turn a reference into an editable brief and a publication plan.
- Export UTC calendar reminders (.ics), mark posts published manually and export workspace notes as JSON.
- Create reusable preparation presets and save default brand settings.
- Responsive landing page, workspace navigation and honest empty states.

## Deliberate limitations

This release is a personal browser workspace, not a commercial multi-tenant service. It does not connect social accounts, publish posts, perform automatic competitor monitoring, transcribe speech, take payments or invite team members. Calendar entries are reminders, not server jobs. All screenshot destinations are present as an integration roadmap with explicit availability labels. No passwords or access tokens are collected.

Files are not sent to a server. Clearing browser site data removes them. Storage persistence is requested but is not guaranteed. Keep original files backed up. JSON notes export excludes media and does not yet have an import feature. Data does not sync between localhost, the hosted preview or other devices.

Research uses user-provided information, not scraped or invented analytics. Engagement here means (reactions + comments) / followers * 100. It cannot reveal a competitor's private reach, retention, conversions or paid distribution. Compare similar platforms, observation periods and audiences. A content hypothesis is not a causal claim or promise of virality.

## Architecture

- `dist/app.js`: route rendering, forms and workspace interactions.
- `dist/db.js`: IndexedDB repository layer; commits awaited before reporting saves.
- `dist/media.js`: decode, thumbnail, crop, caption composition and browser export.
- `dist/domain.js`: pure validation, benchmark calculations and calendar serialization.
- `dist/styles.css`: original responsive design system. No CDN assets or runtime dependencies.
- `tests/domain.test.js`: useful invariants for crop geometry, invalid clips, missing research metrics, unsafe links, event timezone conversion and channel coverage.

The hosted preview is private. Its hosting manifest is tracked in `.openai/hosting.json`; it is not needed to serve the app locally.

## Next implementation milestones

1. Add authenticated workspaces, PostgreSQL records and S3-compatible media with tenant-scoped access controls, signed uploads and quotas.
2. Move video exports into Python/FFmpeg background jobs with durable queue state, progress events and reliable MP4 outputs. Add transcription with editable timestamps.
3. Verify platform publishing, source imports and analytics separately; implement OAuth, encrypted tokens, revocation, retries, webhook verification and idempotent publish jobs.
4. Add data-provider-backed competitor watchlists with provenance, data freshness and platform-specific comparisons. Preserve manual evidence as a fallback.
5. Add team review permissions, subscriptions and metered processing/storage before commercial onboarding.

## Verification

Syntax checks and six Node tests pass. Automated browser QA was unavailable in the authoring environment. Validate an image export and a short video with audio in the target browser before relying on a publishing workflow. Browser codecs and platform acceptance require separate testing.

## Ownership

Copyright 2026 Corebridge. All rights reserved. No open-source license is granted by this repository.
