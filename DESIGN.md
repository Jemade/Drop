# Drop: second visual edition

An original implementation informed by these references. Reference artwork and theme source were not copied into the product.

- Julian Herbst, Social Media Management Tool Dashboard (Dribbble): https://dribbble.com/shots/12998208-Social-Media-Management-Tool-Dashboard — clear navigation, white surfaces and blue action hierarchy.
- Geometric Logo & Brand Identity (Dribbble): https://dribbble.com/shots/27772974-Geometric-Logo-Brand-Identity — a useful example of typography and a cobalt/coral palette working as one identity.
- BLND brand identity reference (Pinterest): https://uk.pinterest.com/pin/blnd-brand-identity-pack-in-blue-and-orange--624663410802859140/ — surfaced in search; the full pin was blocked, so detailed artwork was not inspected.
- Rara Themes Perfect Portfolio: https://rarathemes.com/wordpress-themes/perfect-portfolio/ — portfolio-led content structure and photographic emphasis. No theme code used.

## Identity

Original vector wordmark, drawn as geometric lowercase letters. The counter in the o forms a play shape; the coral full stop completes the name. Favicon uses the same p/play geometry. SVG files are editable source assets.

- Cobalt: #2348e8
- Coral: #ff765d
- Ink: #18191d
- Homepage paper: #f7f5ef
- Workspace canvas: #f7f8fc
- Interface rules: #e4e6ed

Space Grotesk headings and DM Sans interface text are self-hosted. Georgia italic is used selectively in editorial headings. Font licenses are in dist/assets.

## Photography

Real photographs served from Unsplash, downloaded for reliable local delivery. They are editorial brand imagery, not customer content, testimonials or invented user activity.

- Recording studio: https://images.unsplash.com/photo-1478737270239-2f02b77fc618
- Camera: https://images.unsplash.com/photo-1516035069371-29a1b244cc32
- Live audience: https://images.unsplash.com/photo-1492684223066-81342ee5ff30

No image-generation assets were used in this redesign.

## Implementation

The homepage now has its own public header and footer, a typographic hero with photographic composition, a process list, a format feature and a factual availability note. A clean start opens this page; workspace routes remain directly accessible.

The workspace has a white sidebar, cobalt selected navigation, compact tabs, a photographic media intro, unboxed counts, restrained status colours and revised form styling. IndexedDB keys and storage version are unchanged, preserving existing user data.

Syntax and domain checks pass. Full browser layout and export QA were unavailable in the managed authoring environment.

## Third edition: demonstration and account access

Client source moved from dist/ to public/; dist/ is now generated Worker output. All previous brand assets remain under public/. Platform marks use sourced SVG paths and official-domain favicons, with provenance in public/assets/platforms/SOURCES.txt. The 30-second MP4 is a deliberately labelled illustrated product walkthrough, not a customer screen recording. Homepage, sidebar and workspace footer link Powered by Corebridge to https://corebridge.co.zw.

## Fourth edition: reference-inspired product explanations

The eight user-provided Repurpose screenshots informed the source/destination selection pattern, format comparison, capability explanations and FAQ interaction. Drop uses its own layout, typography, brand, photography and wording. No screenshot graphics, testimonials, popularity counts, partner claims or platform UI artwork were copied.

The workflow builder supports the available local preparation path. Its social-source choice explains the pending integration rather than implying an active import. The homepage's format previews are labelled examples and do not show invented engagement counts.


## Typography refinement

Reference: https://repurpose.io/ (source inspected 18 October 2026). Uses Poppins for headings and IBM Plex Sans for body text. Drop now self-hosts these open-license fonts, including their licenses. The homepage follows the reference hero scale of 56px desktop, 48px tablet and 40px mobile, with 18px body copy (16px mobile). Workspace navigation uses 14px, controls 15–16px, secondary copy 13px and page titles 28–34px. Original Drop identity and layouts are retained. The dedicated typography stylesheet loads last to override earlier compact type rules.


## Public website rebuild, 18 October 2026

The homepage now states Drop's purpose directly: adapt videos and photos for social channels, export the files and plan publication. Original imagery, restrained blue, navy text, generous white space and a visual source-to-format example replace the previous abstract editorial collage. Poppins and IBM Plex Sans remain self-hosted. Workspace functionality is retained.

Reference review:

- https://repurpose.io/: direct product promise, visible product demonstration, destination marks, features, pricing and FAQ progression. Drop uses an original source-file and output-format composition, with real photography and no borrowed graphics or social proof.
- https://repurpose.io/content-creators/: audience-specific benefit and visual examples. Drop focuses on recorded footage, crop variants, manual captions and a content plan.
- https://repurpose.io/for-businesses/: connects content work to business visibility. Drop explains practical product, service and behind-the-scenes posts.
- https://repurpose.io/for-ecommerce/: applies the product story to product content. Drop shows one product photo adapted for multiple formats, without claiming store integrations.
- https://repurpose.io/agencies/: explains agency use cases and workflow value. Drop describes personal preparation and ZIP handover; shared team features are explicitly unavailable.
- https://repurpose.io/pricing/: clear choices, feature inclusions and common purchase questions. Drop presents its actual current free preview and clearly labels future connected capabilities. No invented prices, trial duration, customer metrics or billing UI.

All six reference pages were read, including source HTML and image references. The two supplied navigation and creator screenshots informed spacing and hierarchy. The reference business/ecommerce phone illustration and agency composition were inspected for their communication pattern, not reused.

Public routes: /, /content-creators, /for-businesses, /for-ecommerce, /agencies, /pricing. All load without entering the workspace sign-in flow. CTAs enter the existing protected /workspace route. A working mobile menu, native FAQ disclosure controls and interactive format previews support exploration. The existing captioned, illustrated video demonstration remains available.

Additional licensed Unsplash photography, downloaded and self-hosted:
- Creator studio: image CDN ID photo-1664277497087-51787d2b9d15, found via https://unsplash.com/s/photos/youtube-creator.
- Shop owner: image CDN ID photo-1658314756218-72907d818aa7, found via https://unsplash.com/s/photos/shop-owner.
- Product example: image CDN ID photo-1542291026-7eec264c27ff.
- Team example: image CDN ID photo-1519389950473-47ba0277781c.
- Download source for each: https://images.unsplash.com/<image-ID>?auto=format&fit=crop&w=1200&q=82&fm=jpg (shop and product use w=1000).

Photos are illustrative; no depicted person or business is claimed as a customer or endorser. Social platform marks identify intended formats, not connected integrations or partners.

QA: syntax checks, route rendering, public route HTTP behavior and output asset checks. Full browser visual verification is unavailable in this environment.


## Drop navigation, device previews and workspace guidance

The third revision responds to the supplied three screenshots:

1. The public header now uses an original Drop brand lockup, explicit home icon, grouped “Made for” navigation and product/demo links. It removes the announcement strip and the audience-link row that resembled the reference too closely. The workspace sidebar and topbar also have explicit Home links.
2. Flat format cards are replaced with an original source-to-device composition. Visitors select Instagram, LinkedIn or YouTube to see distinct illustrative iPhone layouts. The device shell uses a modern portrait screen ratio, Dynamic Island, status icons and home indicator. Authentic existing platform marks identify the channels. These are hand-built illustrative layouts, not captured apps or live posts. No exact rendering claim, invented engagement figures or publishing claim is made.
3. The media library now has a practical diagram instead of the decorative camera banner. Every workspace tool has a contextual guide explaining its input, action, result and material limitations. A tool directory links to all workspace features. Icons are consistent inline SVGs owned by Drop; channel logos remain the existing platform assets.

Phone examples use the same source image across channel layouts. The source is kept intact, captions are escaped, and assets/platform choices are restricted. Guide disclosure controls and audience navigation use native details/summary elements. Mobile navigation and phone-channel selection keep aria-expanded/aria-pressed state.

Verification: syntax, rendering, phone-layout variants and source safety, public routes, asset presence, build and artifact checks. Browser and physical iPhone testing remain outstanding; therefore the previews are labelled illustrative.


## Product copy and account verification

Removed decorative directional arrows, external-link arrow marks, the topbar device status, version labels and build commentary from the visible interface. Storage behaviour remains explained in account settings because it affects whether users can recover their files. Future provider availability remains explicit; a visual edit cannot create provider authorization.

Account settings now offers Check sign-in using a fresh server session response. Workspace mutations revalidate the current identity, and focus checks detect expired or changed sessions. A changed identity locks access and clears in-memory records rather than continuing in the previous account.

Production environment inspection found no social OAuth client credentials. Sites plugin eligibility discovery is unavailable in the current tool surface, so hosted connected-app access cannot be declared or verified. Direct Google identity remains unsupported by the current managed Site auth configuration. No provider was marked connected, and no externally published action was performed.

Exact iPhone app interfaces have not been supplied as captures or tested on a physical device. The existing phone examples remain illustrative rather than being relabelled as exact live app displays. This and real social OAuth/provider integration are outstanding release work.
