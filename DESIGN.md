# Interface design

Drop separates public product pages from the signed-in personal workspace. Navigation should make the current task and a path back home clear. Keep tool labels short and describe the actual operation, such as Prepare, Export, Save draft or Download backup.

## Product language

Describe manual preparation, source observations and publication reminders accurately. A saved draft is not a published post; a local approval state is not external review. Do not present placeholder analytics, invented customer evidence or unavailable platform capabilities as working features.

## Accessibility

Use labelled native controls and semantic headings. Preserve keyboard focus, visible focus indicators, dialog dismissal and status/error announcements. Pair status colour with text. Keep navigation and action targets usable at narrow viewport widths. Check long titles and empty/error states as well as populated examples.

## Media and assets

Use the local wordmark and platform marks from `public/assets/` and retain attribution/licence notices. A platform mark denotes a destination, not a partnership. The bundled demonstration is an illustrated walkthrough and must not be described as a recording of customer activity.

## Style maintenance

Shared styles are under `public/styles.css`, `public/typography.css`, `public/marketing.css` and `public/experience.css`. Update shared tokens before introducing component-specific colour overrides. The hosted site and this repository may have different release states; do not assume a hosted design change has already reached GitHub.
