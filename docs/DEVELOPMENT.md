# Development

## Prerequisites

- Node.js 20 or later.
- A browser with IndexedDB, Canvas, object URLs and MediaRecorder.
- Git for the normal contribution workflow.

No dependency installation or provider credentials are required for local media preparation and unit tests. Provider account connections need a configured HTTPS deployment and are not simulated by the local development server.

## Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Serve the captured public assets on `127.0.0.1:8000` with a development identity |
| `npm run check` | Parse every JavaScript module under `public/`, `worker/`, `scripts/` and `tests/` |
| `npm test` | Run the Node test suite |
| `npm run build` | Produce the deployable Worker and manifest under `dist/` |
| `npm run validate` | Import the built Worker and check its exported handler |

Restart the development server after edits: it loads public assets at startup. A port-in-use error means another process is already listening on port 8000; stop that process before restarting.

## Working conventions

Keep pure validation and calculation logic in small exported functions. Keep provider requests and credentials in server modules. Escape user-visible strings and validate remote URLs. Do not add a platform button that reports success before the provider confirms the operation.

Changes to record formats must preserve existing browser data or include an explicit migration. Keep exported backup formats versioned. Avoid reformatting unrelated large files in a functional change.

## Testing

Handler tests exercise `Request`/`Response` behaviour. Provider tests inject network fixtures and do not contact real accounts. Rendering tests inspect templates; they do not run a complete browser. Domain and archive tests cover calculations, validation and corrupt input.

Add regression tests for changed behaviour, especially identity isolation, OAuth errors, backup handling and export cancellation. Use the manual walkthrough for codec, audio, download and responsive-layout changes. Report checks actually run rather than copying a historic test count into the README.

## Optional demonstration assets

`tools/generate_demo.py` creates the illustrated homepage demonstration. It requires Python, Pillow and FFmpeg, separately from the application runtime. Review generated images, video and caption timing before replacing tracked assets. The illustration is not a recording of customer activity.

## Troubleshooting

- **Media does not decode:** try a supported browser and a small known-good file. MIME recognition does not guarantee codec support.
- **Video export is slow:** recording runs in real time; keep the tab visible and allow it to finish.
- **Data disappeared:** verify the same browser profile, account and origin. Restore a saved backup if available.
- **Connection unavailable:** check runtime configuration and provider consent; local development does not establish a production OAuth connection.
- **Validation fails:** build first, then run `npm run validate` from the repository root.
