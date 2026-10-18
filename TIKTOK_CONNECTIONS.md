# TikTok connection and video sharing

Runtime secrets: TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, and the existing 32-byte CONNECTION_ENCRYPTION_KEY. Exact Login Kit Web callback: Site origin + /api/connections/tiktok/callback. Apply developer Sandbox changes and add the intended target user.

Default OAuth requests user.info.basic,video.list,video.upload. A separate user action requests video.publish for Direct Post. Existing read-only connections must reconnect for upload permission. The app may connect with partial publishing permission, but availability is based on the actual granted scopes. Enable Direct Post in TikTok's developer portal before authorizing video.publish. Production publishing and public visibility remain subject to TikTok approval/audit and account restrictions.

Implemented: account linking, verified profile, refresh rotation, paginated public-video browsing, disconnect/revoke, device/library video preview, inbox upload, Direct Post controls, bounded sequential chunk transfer, and TikTok receipt/status checks. No video is sent until the user explicitly confirms. Direct Post queries current creator limits and validates audience, duration, interactions, music consent and commercial disclosures. All interaction checkboxes start off and respect account restrictions. No promotional watermark is added by the sharing flow.

Transfer limits: 250 MB, MP4/MOV/WebM, up to ten minutes for inbox uploads, 360–4096 pixels per side. Direct posting uses the creator's current duration limit. TikTok additionally checks codecs, frame rate and media validity. Device video is sent in 5 MiB chunks, with trailing bytes merged into the last chunk. Server reads are bounded to the expected chunk size. Upload URLs come only from TikTok initialization and are encrypted, owner/account/origin-bound, short-lived receipts. The server accepts only documented HTTPS TikTok upload hosts and never follows redirects or forwards OAuth tokens to upload hosts. A resumed session checks provider progress. No automatic retry initializes a second post.

Credentials remain encrypted in HttpOnly cookies. JavaScript receives neither OAuth tokens nor plaintext upload URLs. Receipts in account-namespaced browser storage expire after 55 minutes; provider completion remains authoritative. This version has no background publishing queue, durable cloud media storage, analytics, TikTok video downloading or scheduled posts. Inbox delivery explicitly requires the user to open TikTok's notification and finish posting. An upload's transfer success is not labeled published until TikTok reports PUBLISH_COMPLETE.

Validation: automated fixture tests cover permissions, CSRF, state/account binding, refresh, bounded metadata, chunk ranges/final response, destination validation, creator controls and receipts. Live acceptance still requires a registered target account: reconnect, select a short owned video, review and send to inbox, observe SEND_TO_USER_INBOX, finish inside TikTok. For Direct Post, enable the product, authorize video.publish, select an available audience and explicitly confirm. Unaudited clients have private-account and Only me restrictions. Browser QA is unavailable in this managed session; automated tests do not prove a real account upload.

Official API references:
- https://developers.tiktok.com/doc/content-posting-api-reference-upload-video
- https://developers.tiktok.com/doc/content-posting-api-reference-direct-post
- https://developers.tiktok.com/doc/content-posting-api-reference-query-creator-info
- https://developers.tiktok.com/doc/content-posting-api-reference-get-video-status
- https://developers.tiktok.com/doc/content-posting-api-media-transfer-guide
- https://developers.tiktok.com/doc/content-sharing-guidelines
