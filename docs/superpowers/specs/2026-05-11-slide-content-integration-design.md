# BLD Style Guide — Slide Content Integration

**Date:** 2026-05-11
**Author:** Steven Brown (with Claude)
**Status:** Approved design, pre-implementation

## Summary

Integrate net-new content from a Google Slides export (`Copy of BEAUMONT LIBRARY DISTRICT`) into the existing single-page brand style guide at `index.html`. The slides include a mix of overlap, conflict, and net-new content. After triage against the live production site (`mybld.org`) — which we treat as ground truth for factual content and brand application — only a narrow slice of slide content survives:

1. The **font-lineage narrative** (Libre Franklin ← Franklin Gothic 1902; News Cycle ← News Gothic 1908) becomes the basis of a new "Lineage" subsection in the Typography chapter.
2. **News Cycle is restored** to the brand's type system (it never left production on mybld.org) but **scoped strictly to compact contexts** — legal, disclaimers, dense tables, footer fine print, tight captions. Not body copy.
3. **Julia Schumacher** is added as the brand-manager contact (Public Services Manager, the operational steward), with Kelly Van Valkenburg's card relabeled from "Brand manager · final approvals" to "Director · final approvals" to reflect the actual split.

All slide visual elements (gradient bar, mountain illustration, AI-generated mockups) are explicitly out of scope: the redirect to mybld.org's actual aesthetic means we are not aspiring to slide visuals.

## Context

### Existing site
Single-page printable manual at `bld.stevenbrown.design`, sourced from `index.html` + `assets/css/styles.css` + `assets/js/script.js`. Ten chapters: Cover, Contents, Essence, Logo, Color, Type, Voice, Imagery, Apps, Do/Don't, QC, Resources. Polished editorial aesthetic on Desert Sand cream.

### Google Slides export
20 slides + 27 media files in PPTX format. Most content overlaps or conflicts with the more developed site. Substantive net-new content is limited to:
- Font history paragraphs for De Vinne Roman, Franklin Gothic, News Gothic
- A revival-font lineage table (slide 14)
- Conflicting type-scale specifications (rejected — site's scale is more refined)
- Speculative AI-generated brand mockups (rejected — hallucinated text/logos)

### mybld.org production state
Streamline-hosted CMS. Custom CSS loads **DM Serif Text + Libre Franklin + News Cycle**. Brand palette hex values match the guide closely; one drift: Canyon Earth Brown is `#4C3D30` in production CSS vs `#4C3C30` in the guide and slides (production CSS appears to have a one-digit typo).

### Decisions reached during brainstorming
- mybld.org is ground truth for factual content AND visual treatment.
- The "background" the user liked on slides was visual, not historical — but per the ground-truth redirect, slide visuals do NOT come into the site.
- The May 2025 two-font consolidation memory was stale; reverted to three-font system.
- De Vinne Roman is **not** in BLD brand lineage. DM Serif gets no historical attribution.
- Julia's attached rebranding timeline is out of scope for this work.

## Changes

### 1. Typography chapter (`index.html` §04)

**1a. Restore News Cycle as the compact face.**
Update the chapter intro and the type system descriptions to name three families:
- DM Serif Display / DM Serif Text — display, ceremonial, ≥24pt
- Libre Franklin (300–900) — everyday workhorse: H1–H6, body, UI, captions, signage
- News Cycle — compactness only: legal/disclaimer, dense tables, footer fine print, tight captions

The "compactness only" scope must be explicit and unambiguous so future designers don't drift News Cycle back into body copy.

**1b. Add a "Lineage" subsection.**
Two short heritage paragraphs (≤80 words each):
- *Libre Franklin → Franklin Gothic (1902, Morris Fuller Benton).* American Type Founders; newspaper-era clarity; symbolic of early-20th-century American modernism.
- *News Cycle → News Gothic (1908, Morris Fuller Benton).* Refined sibling of Franklin Gothic; narrow proportions for column economy; the newsroom standard for body and classifieds.

DM Serif gets **no** lineage paragraph. (Explicit non-decision: De Vinne Roman is not brand lineage.)

**1c. Lineage table** (small, two rows):

| Active font | Early-1900s source | Where to use | Rationale |
|---|---|---|---|
| Libre Franklin | Franklin Gothic (1902) | H1–H6, body, UI, signage | Newspaper-era clarity at every weight |
| News Cycle | News Gothic (1908) | Legal, captions, dense tables | Narrow proportions for tight space |

**1d. Type-scale hierarchy gains a Legal/Disclaimer row.**
Add a row to the existing recommended-scale table showing News Cycle at ~11–12px regular, with a realistic compliance-line example so the compactness-only intent is visible at a glance.

### 2. Color chapter (`index.html` §03)

**2a. Reconcile Canyon Earth Brown.**
Keep the guide's `#4C3C30` (matches slides; round number; canonical). Flag in implementation notes that mybld.org's production CSS uses `#4C3D30` — a one-digit drift that needs a fix on the Streamline side. No change to the swatch markup in `index.html`.

### 3. Resources chapter (`index.html` §10)

**3a. Add News Cycle to the "Install the fonts" list:**
```
News Cycle → (for compact / legal use only)
```
Link to `https://fonts.google.com/specimen/News+Cycle`.

**3b. Add Julia Schumacher contact card.** Reorder the contact grid to:
1. **Julia Schumacher** — Brand manager (day-to-day program steward) · Public Services Manager · julia.schumacher@mybld.org · Library (951) 845-1357 · Office (951) 846-3222
2. **Kelly Van Valkenburg** — Director · final approvals · kelly.vanvalkenburg@mybld.org · (951) 845-3222
3. **Steven Brown** — Designer · this manual · steven@stevenbrown.design · (310) 994-3048

Relabel Kelly's card from "Brand manager · final approvals" → "Director · final approvals."

**3c. Add the library street address** under Resources (currently absent):
Beaumont Library District · 125 E. Eighth St., Beaumont, CA 92223 · mybld.org

### 4. Site-wide reference fixes

**4a. Footer colophon.** Current: "Set in DM Serif Display and Libre Franklin." Update to "Set in DM Serif Display, Libre Franklin, and News Cycle" — §1d guarantees News Cycle renders in the type-specimen row, so the colophon should name it.

**4b. README.md.**
- Add a "Brand manager" credit line: `Brand manager: Julia Schumacher, Public Services Manager, Beaumont Library District`
- Keep "Logo SVG production: Julia Schumacher" if accurate.
- Update the stack section: "Type loaded from Google Fonts (DM Serif Display, DM Serif Text, Libre Franklin)" → add News Cycle.

**4c. Generic "brand manager" references** in Chapter Nine (QC) and Chapter Seven (callouts) stay generic — they describe a role, not a person. No change.

### 5. Memory

Already applied during brainstorming:
- `feedback_font_system.md` rewritten from two-family consolidation → three-family with News Cycle scoped to compactness; De Vinne Roman explicitly excluded as DM Serif lineage.
- `MEMORY.md` index entry updated.

## Out of scope (explicitly rejected)

- **Slide visual backgrounds** — gradient bar, mountain illustration, cream paper texture. Production aesthetic doesn't include them and we're not aspiring slide-ward.
- **De Vinne Roman lineage** for DM Serif. Slide 16's display-font specimen page is rejected wholesale.
- **AI-generated speculative mockups** from `ppt/media/` (the Book Club poster, Educational Workshop poster, bookmark mockup, etc.) — all contain hallucinated text/logos.
- **Slide 10's Service Agreement lorem mockup** — not BLD-specific.
- **Conflicting slide type scales** (72/36/30/24/14/11 from slide 6, 72/56/40/28/18 from slides 7–9). Site's existing scale is more refined; not changing it.
- **Lorem ipsum content** from slide 20.
- **Julia's rebranding timeline** (mentioned in her email of 2026-05-08; not attached/inspected). Treated as a separate piece of work; not folded into this manual.

## Acceptance criteria

- [ ] News Cycle is named in `index.html` Typography chapter with a "compactness only" scope statement.
- [ ] A new "Lineage" subsection exists in the Typography chapter with two heritage paragraphs (Libre Franklin and News Cycle only) — no DM Serif lineage paragraph.
- [ ] A small two-row lineage table is rendered.
- [ ] The type-scale hierarchy table shows a Legal/Disclaimer row in News Cycle.
- [ ] Resources fonts list includes News Cycle with compact-use note + Google Fonts link.
- [ ] Resources contact grid contains three cards in the order Julia / Kelly / Steven, with Kelly's role relabeled to "Director · final approvals."
- [ ] Library street address appears in Resources.
- [ ] README.md mentions Julia as brand manager and includes News Cycle in the font stack list.
- [ ] No slide imagery, gradient bar, or AI mockups appear in the site.
- [ ] No De Vinne Roman attribution appears anywhere.
- [ ] Existing chapters (Essence, Logo, Color, Voice, Imagery, Apps, Do/Don't, QC) are unchanged except for §2a annotation (no markup change).
- [ ] Print layout still flows cleanly to US Letter; new content does not break chapter-per-page pagination.

## Open questions

None at design approval. Open implementation questions belong in the writing-plans phase.
