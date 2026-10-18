# Dropbox connection

Developer registration: Corebridge Content Workspace, scoped access, Full Dropbox.
Callback: https://drop-corebridge.yummy-jay-4160.chatgpt.site/api/connections/dropbox/callback
Runtime secrets: DROPBOX_APP_KEY and DROPBOX_APP_SECRET. CONNECTION_ENCRYPTION_KEY is shared with the existing encrypted connection storage. Values never enter source or browser code.

Permissions: account_info.read, files.metadata.read, files.content.read. No write, deletion, sharing or team scopes.

Implemented: owner/origin-bound encrypted HttpOnly state and token cookies, state expiry, PKCE, offline refresh, verified Dropbox account identity, folder browsing in pages of 100 entries, encrypted account-bound pagination cursor, supported media import up to 250 MB, metadata/version validation before streamed download, bounded byte counts, disconnect and provider revocation. Downloads never follow redirects or accept arbitrary URLs. Original Dropbox files are unchanged.

The connection is personal to the current Drop account and browser. Native Drop authentication remains managed by Sites. No cloud backup, upload, scheduled sync or social publishing is included.

Live acceptance checks: Connect Dropbox, approve consent, verify the account, browse root and a child folder, import a small image and a video, check Media library, refresh the page, disconnect and verify the card resets. Development registration currently allows the owner only. Public availability requires Dropbox's production process.

Automated tests use provider fixtures and do not prove live consent or actual file import. Browser QA was unavailable in this environment.

References: https://docs.dropboxapi.com/dropbox-api/docs/oauth and https://www.dropbox.com/developers/documentation/http/documentation
