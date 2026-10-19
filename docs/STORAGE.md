# Storage and recovery

## Ownership

`public/db.js` stores six object stores in IndexedDB: `media`, `drafts`, `references`, `plans`, `settings` and `workflows`. Database names use `drop-workspace:{verified-account-id}`. Database initialisation requires an account ID.

| Store | Contents |
| --- | --- |
| `media` | Original browser media blobs, inspected metadata and thumbnails |
| `drafts` | Preparation settings, saved versions and local review state |
| `references` | Source links, observations and optional public metrics |
| `plans` | Publication reminders and associated content details |
| `settings` | Workspace and branding preferences |
| `workflows` | Reusable preparation destinations and output formats |

This is personal browser storage, not a shared server database. Same account plus a different browser, device or origin produces a different local workspace. Local data is not encrypted at rest by Drop. Browser quota and eviction policies remain applicable even when persistent storage is requested.

## Backups

The full workspace backup is a ZIP containing `workspace.json` and original media entries. The implementation uses uncompressed ZIP STORE entries with CRC32 checksums. Backups are plaintext and must be kept privately.

Restore validates archive structure, paths, entry uniqueness, checksums, record identifiers, size limits and media decodability. It merges validated records into the current account in one IndexedDB transaction. Existing record IDs are skipped, not overwritten. Archives are limited to 500 MB; individual media retains the 250 MB limit.

The notes-only JSON export excludes original media. It is not a substitute for a full backup. Content kits contain prepared outputs and a manifest; they are publication handoff packages, not workspace recovery archives.

## Recovery procedure

1. Check that you are using the expected account, browser profile and deployment origin.
2. Preserve any currently accessible files by exporting a backup.
3. Open Backups and restore the desired full workspace ZIP.
4. Review imported media, drafts and reminders. Existing records may have been skipped by ID.
5. Keep the original archive until the recovered work has been checked.

Clearing site data removes local records. The server cannot recover them without an exported backup. Provider disconnect clears external connection state; it is distinct from deleting local imported files.

## Format changes

Keep backup versions explicit. Validate old records before use and test recovery with archives produced before the change. Never silently switch account IDs, origins or database names to migrate data. The legacy unscoped workspace importer is an explicit action and should not be used on a shared browser profile.
