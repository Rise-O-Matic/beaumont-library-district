# Changelog

Notable changes to the BLD business card builder. Newest first.

## 2026-06-22 — Contact placement & layout cleanup
- Removed the experimental letterhead back layout and its toggle, leaving one supported back-face layout.
- Moved the website and social addresses from the back to the front face, removed the former front divider rule, and positioned the new channel row 20px upward beneath the logo. Front Accent 2 now colors the row under the existing WCAG contrast enforcement.
- Grouped the main and direct/extension phone rows on the normal back, restored the mobile-phone icon, and matched the direct/extension typography to the main number.
- Bottom-aligned the normal back's identity and information columns on a shared anchor, then shifted both columns 4px lower while preserving alignment when the optional direct line is enabled.
- Updated responsive styles, saved-card rendering, color application, and PDF cleanup so the new layouts and optional contact content remain consistent across previews and exports.

## 2026-06-18 — Follow row & print cleanup
- Website URL renders as plain text instead of an underlined hyperlink (it's a print artifact, not a clickable link).
- Removed the network/share glyph from the Follow row; promoted the Facebook and Instagram icons to the contact-icon size (20px) and aligned them in the icon column.

## 2026-06-16 — Back-face contact column refresh
- Vertically centered the contact column on the full card height.
- Removed the ADDRESS/PHONE/EMAIL/WEB/FOLLOW labels — the row icons now carry the meaning.
- Enlarged contact text from ~6pt to ~8.2pt at print size for legibility, and widened row spacing. Verified it clears the footer wave in both the default and Direct-Line-on layouts.

## 2026-06-03 — Contact layout
- Moved the social links into the contact column as a "Follow" row.
- Removed the front tagline and the back-face hours row.

## 2026-04-17 — Builder UX
- Added the page header, usage instructions, and an editable email field.
- Click-to-load gallery cards with an unsaved-changes prompt.

## 2026-04-14 — Split front/back pickers
- Rebuilt the builder around independent front/back color pickers with WCAG contrast enforcement (hard/warn modes) and contrast warnings.
- Added randomize, reset, URL-hash sharing, localStorage persistence, collection import/export, and generated scheme names.
- Added print PDF export with bleed and crop marks; extended card elements into the bleed area.
- Initial business card color builder.
