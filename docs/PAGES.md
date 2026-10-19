# Product pages and Settings

## Public pages

Each audience route presents a task-specific display rather than repeating the homepage connection graph:

| Route | Display and purpose |
| --- | --- |
| `/content-creators` | Clip timeline and output formats for a recording |
| `/for-businesses` | A sample content week organised around business updates |
| `/for-ecommerce` | Product framing in portrait, square and landscape formats |
| `/agencies` | Campaign deliverables and preparation handover |
| `/pricing` | Current free personal workspace and a requirements enquiry |
| `/signup` | New-user entry and registration guidance |
| `/signin` | Returning-user entry |

Audience displays are labelled illustrative examples, not customer records. Entry pages continue to the existing managed authentication route; they do not collect passwords, create a separate Drop account backend or guarantee a distinct provider registration endpoint. Both anonymous and signed-in headers expose Sign up, Sign in and Open Drop.

## Settings

`/workspace#settings` is limited to brand defaults, account/session controls and supported app/storage preferences. It does not repeat the generic content-preparation walkthrough. Connection operations remain under Connections. Brand saves use the existing form handler and do not rewrite saved draft settings.

The hosted release has library, draft and storage preferences in addition to brand/account controls. The older GitHub baseline may not expose all of those preference controls; do not add inert controls to imitate a newer deployment.

## Interaction and checks

Account and primary action links have hover and visible keyboard-focus states. Reduced-motion preferences disable the decorative transition. Narrow layouts stack the page columns and keep all account actions available.

`tests/public-pages.test.js` checks distinct audience displays, separate account entry pages and public routes while preserving the workspace authentication redirect. Template tests do not verify full browser layout or the external authentication provider.
