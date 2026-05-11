# Slide Content Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reverse the May 2025 two-font consolidation in the BLD style guide, restoring News Cycle as a compactness-only third family, and bring Julia Schumacher in as the brand-manager contact — while rejecting all slide visual elements and the De Vinne Roman lineage attribution.

**Architecture:** Pure static HTML/CSS edit. Single-page brand manual at `bld.stevenbrown.design`. No tests; "verification" means opening the local server in Chrome and visually confirming the rendered output, plus print preview to check page pagination. Each task is a focused, self-contained edit followed by a commit.

**Tech Stack:** Plain HTML5, CSS custom properties, Google Fonts (DM Serif Display/Text, Libre Franklin, News Cycle). Local preview via `python -m http.server 8080`. Browser verification via Chrome MCP tool or manual Chrome session.

**Spec:** `docs/superpowers/specs/2026-05-11-slide-content-integration-design.md`

---

## File Structure

| File | Change | Responsibility |
|---|---|---|
| `index.html` | Modify | Typography chapter §04, Resources chapter §10, footer colophon, Do/Don't list items, QC checklist labels, TOC subtitle, Google Fonts `<link>` |
| `assets/css/styles.css` | Modify | Add `--sans-compact` custom property, `.font-spec-compact-spec` font-family rule, optional `.lineage` table styling |
| `README.md` | Modify | Add Julia Schumacher as brand manager, add News Cycle to the stack list |

Files NOT touched:
- `assets/js/script.js` — no behavior change
- Any logo asset, CNAME, .gitignore — no change
- Memory files — already updated during brainstorming

---

## Preparation (do once before Task 1)

- [ ] **Step 0a: Start the local server**

```bash
cd /c/GitHub/beaumont-library-district
python -m http.server 8080
```

Leave running in a background terminal. Verify: `curl -sI http://localhost:8080/ | head -1` returns `HTTP/1.0 200 OK`.

- [ ] **Step 0b: Open Chrome to the local site**

Navigate Chrome to `http://localhost:8080/#type` (Chapter Four — Typography). Confirm the page renders with current two-font system intact. This is the baseline.

- [ ] **Step 0c: Confirm we're on a working branch**

```bash
git status
git log --oneline -5
```

If working tree is dirty, ask the user before continuing. If clean, proceed.

---

## Task 1: Load News Cycle from Google Fonts + add CSS variable

**Files:**
- Modify: `index.html:13`
- Modify: `assets/css/styles.css:33` (add new line below `--sans`)

- [ ] **Step 1: Read the current font import**

`index.html` line 13 currently reads:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Serif+Text:ital@0;1&family=Libre+Franklin:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Add News Cycle to the Google Fonts URL**

Edit `index.html` line 13 — append `&family=News+Cycle:wght@400;700` immediately before `&display=swap`:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Serif+Text:ital@0;1&family=Libre+Franklin:ital,wght@0,300..900;1,300..900&family=News+Cycle:wght@400;700&display=swap" rel="stylesheet">
```

- [ ] **Step 3: Add the `--sans-compact` custom property**

In `assets/css/styles.css`, find line 33:

```css
  --sans:                "Libre Franklin", "Helvetica Neue", system-ui, sans-serif;
```

Insert a new line immediately below it:

```css
  --sans-compact:        "News Cycle", "Libre Franklin", "Helvetica Neue", system-ui, sans-serif;
```

- [ ] **Step 4: Verify News Cycle loads in the browser**

In Chrome DevTools (F12) → Network tab → reload the page → filter on "News+Cycle". Confirm a 200 response from `fonts.gstatic.com` for News Cycle font files. If you have Chrome MCP, use `read_network_requests` with a filter for `News+Cycle`.

Expected: at least one woff2 request for News Cycle (400 weight). The font is loaded but not yet used anywhere on the page — that's correct for this task.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Load News Cycle from Google Fonts; add --sans-compact custom property"
```

---

## Task 2: Update TOC subtitle and Typography chapter lede for three-family system

**Files:**
- Modify: `index.html:64`
- Modify: `index.html:384-386`

- [ ] **Step 1: Update the TOC subtitle**

`index.html` line 64 currently reads:

```html
    <li><a href="#type"><span class="toc-num">04</span><span class="toc-title">Typography</span><span class="toc-page">two-typeface system, hierarchy</span></a></li>
```

Change `two-typeface system, hierarchy` to `the three-family system, hierarchy, lineage`:

```html
    <li><a href="#type"><span class="toc-num">04</span><span class="toc-title">Typography</span><span class="toc-page">the three-family system, hierarchy, lineage</span></a></li>
```

- [ ] **Step 2: Rewrite the chapter lede**

`index.html` lines 384-386 currently read:

```html
  <div class="lede">
    <p>Two type families carry the entire brand: a high-contrast display serif drawn in the spirit of late-Victorian engravings, and a workhorse American grotesque rooted in 1902 newspaper headlines. Together they say <em>scholarly</em> without saying <em>stuffy</em>.</p>
  </div>
```

Replace with:

```html
  <div class="lede">
    <p>Three type families carry the brand. A high-contrast display serif handles ceremonial moments. A workhorse American grotesque rooted in 1902 newspaper headlines does the everyday heavy lifting. A narrower newsroom companion from 1908 covers the compact corners — disclaimers, fine print, dense tables. Together they say <em>scholarly</em> without saying <em>stuffy</em>.</p>
  </div>
```

- [ ] **Step 3: Verify in Chrome**

Reload `http://localhost:8080/#type`. Confirm the lede now reads "Three type families carry the brand…" and the TOC entry at `#contents` shows the new subtitle.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Update Typography chapter intro and TOC subtitle for three-family system"
```

---

## Task 3: Remove De Vinne Roman lineage from DM Serif Display

**Files:**
- Modify: `index.html:392`

- [ ] **Step 1: Read the current lineage line**

`index.html` line 392 currently reads:

```html
      <p class="font-spec-lineage">A modern revival in the tradition of De Vinne Roman (1892), the type designed by Gustav F. Schroeder and named for celebrated American printer Theodore Low De Vinne. Released under the SIL Open Font License.</p>
```

- [ ] **Step 2: Replace with a non-historical description**

Per spec §1b, DM Serif gets **no** historical attribution (De Vinne Roman is explicitly not BLD brand lineage). Replace with a description that stands on the font's own merits:

```html
      <p class="font-spec-lineage">A free, open-licensed display serif with high-contrast strokes and flared, engraved-feeling terminals. Released under the SIL Open Font License. Chosen for its weight, character, and quiet civic gravity at ceremonial sizes.</p>
```

- [ ] **Step 3: Verify in Chrome**

Reload `#type`. The DM Serif Display block should no longer mention De Vinne Roman, Gustav F. Schroeder, or Theodore Low De Vinne. Spot-check the rest of the page for any other stray references with:

```bash
grep -n "De Vinne\|Schroeder\|Theodore Low" index.html
```

Expected: zero matches.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Remove De Vinne Roman lineage from DM Serif Display (not BLD brand heritage)"
```

---

## Task 4: Add News Cycle font-spec article

**Files:**
- Modify: `index.html` (insert new `<article>` after line 432)
- Modify: `assets/css/styles.css` (add new `.font-spec-compact-spec` rule near existing font-spec rules around line 689)

- [ ] **Step 1: Read the existing pattern**

The Libre Franklin font-spec article (`index.html` lines 415-432) is the structural template. After its closing `</article>` (line 432), insert a new article block for News Cycle.

- [ ] **Step 2: Insert the News Cycle article**

After line 432 (`</article>`) and before line 434 (`<h3>Recommended hierarchy</h3>`), insert:

```html

  <article class="font-spec font-spec--compact">
    <header>
      <p class="font-spec-role">Compact · for tight space only</p>
      <h3>News Cycle</h3>
      <p class="font-spec-lineage">A free revival of News Gothic (Morris Fuller Benton, 1908) — Franklin Gothic's narrower newsroom sibling, designed to set classified columns and small-cap legal copy without losing legibility. Released under the SIL Open Font License.</p>
    </header>
    <div class="font-spec-spec font-spec-compact-spec">
      <p style="font-weight:700;">The quick brown fox jumped over the lazy dog.</p>
      <p style="font-weight:400;">The quick brown fox jumped over the lazy dog.</p>
      <p style="font-weight:400; font-size:0.78em;">By signing below, the patron acknowledges receipt of the District's privacy policy and consents to the terms of borrowing under the rules adopted by the Board on March 14, 2026. This notice constitutes the entirety of the agreement and supersedes prior representations.</p>
    </div>
    <p class="font-spec-use"><strong>Use for:</strong> legal disclaimers, fine print, dense data tables, footer compliance lines, and tight captions where Libre Franklin would either feel too wide or push to the next column. <strong>Do not use for body copy</strong> — that's Libre Franklin 400's job.</p>
    <p class="font-spec-code">
      <button class="copy copy-block" data-copy='@import url("https://fonts.googleapis.com/css2?family=News+Cycle:wght@400;700&display=swap");'>@import url("https://fonts.googleapis.com/css2?family=News+Cycle:wght@400;700&display=swap");</button>
    </p>
  </article>
```

- [ ] **Step 3: Add the CSS rule for `.font-spec-compact-spec`**

In `assets/css/styles.css`, find the `.font-spec-sans-spec p` rule (line 689). After its closing brace, insert:

```css
.font-spec-compact-spec p {
  font-family: var(--sans-compact);
  margin: 0.4rem 0;
  line-height: 1.35;
}
```

- [ ] **Step 4: Verify in Chrome**

Reload `#type`. Confirm a fourth font specimen now appears between Libre Franklin and the "Recommended hierarchy" header. The disclaimer-style paragraph at the bottom of the specimen should render in a visibly narrower, slightly thinner face than Libre Franklin. Use Chrome DevTools to inspect one of the News Cycle paragraphs and confirm `font-family` resolves to "News Cycle" (not falling back to Libre Franklin or sans-serif).

- [ ] **Step 5: Verify print preview**

Press Ctrl+P. Confirm Chapter Four still flows cleanly — the new article shouldn't orphan a heading at the bottom of a page. If pagination breaks, note it but don't fix in this task; carry as an issue to Task 10.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Add News Cycle font-spec article (compactness-only third family)"
```

---

## Task 5: Add Legal/Disclaimer row to the type-scale table and add the lineage summary table

**Files:**
- Modify: `index.html:436-449` (hierarchy table)
- Modify: `index.html` (insert new lineage table after the hierarchy table closes)
- Modify: `assets/css/styles.css` (optional `.lineage` table rule mirroring `.hierarchy` styling)

- [ ] **Step 1: Read the current hierarchy table**

`index.html` lines 437-449 contain the `.hierarchy` table with 9 rows (Hero, Chapter title, H1, H2, H3, Lead, Body, Caption, Eyebrow).

- [ ] **Step 2: Add a Legal/Disclaimer row to the hierarchy table**

After the existing `Eyebrow · all-caps` row at line 447 and before `</tbody>` at line 448, insert:

```html
      <tr><th scope="row">Legal · disclaimer</th><td>News Cycle</td><td>400</td><td>11–13 px</td><td>7–9 pt</td></tr>
```

The full `<tbody>` for the table will now have 10 rows.

- [ ] **Step 3: Add the lineage summary table**

After the closing `</table>` of the hierarchy table (which is at the line currently numbered 449 — note that previous tasks may have shifted line numbers; search for `</table>` immediately preceding the May 2025 callout), insert:

```html

  <h3>Lineage</h3>
  <p>Two of the three workhorse faces revive American grotesques drawn at the turn of the last century, by the same designer. The lineage is intentional — the brand speaks in the voice of 1900-era civic print.</p>
  <table class="lineage">
    <thead><tr><th scope="col">Active font</th><th scope="col">Early-1900s source</th><th scope="col">Where to use</th><th scope="col">Rationale</th></tr></thead>
    <tbody>
      <tr><th scope="row">Libre Franklin</th><td>Franklin Gothic (1902, Morris Fuller Benton)</td><td>H1–H6, body, UI, signage</td><td>Newspaper-era clarity across every weight</td></tr>
      <tr><th scope="row">News Cycle</th><td>News Gothic (1908, Morris Fuller Benton)</td><td>Legal, fine print, dense tables, tight captions</td><td>Narrower proportions for column economy at small sizes</td></tr>
    </tbody>
  </table>
```

- [ ] **Step 4: Style the lineage table to match `.hierarchy`**

In `assets/css/styles.css`, find the `.hierarchy` rules (around line 712-741). At the end of `.hierarchy tbody td { font-family: var(--sans); }` (line 741), append a single grouped rule so `.lineage` gets identical styling:

Find the block of `.hierarchy ...` rules and rename them to apply to both tables. The simplest approach: add an additional selector to each existing rule. Concretely, edit these existing lines (line numbers approximate — find by selector):

| Existing selector | Change to |
|---|---|
| `.hierarchy {` | `.hierarchy, .lineage {` |
| `.hierarchy thead th {` | `.hierarchy thead th, .lineage thead th {` |
| `.hierarchy tbody th, .hierarchy tbody td {` | `.hierarchy tbody th, .hierarchy tbody td, .lineage tbody th, .lineage tbody td {` |
| `.hierarchy tbody th {` | `.hierarchy tbody th, .lineage tbody th {` |
| `.hierarchy tbody td { font-family: var(--sans); }` | `.hierarchy tbody td, .lineage tbody td { font-family: var(--sans); }` |

- [ ] **Step 5: Verify in Chrome**

Reload `#type`. Confirm:
- The hierarchy table has 10 rows ending with `Legal · disclaimer | News Cycle | 400 | 11–13 px | 7–9 pt`.
- A new "Lineage" subsection header appears below the hierarchy table.
- The lineage table renders with the same visual styling (typography, borders, row treatment) as the hierarchy table.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Add Legal row to type-scale table and lineage summary table"
```

---

## Task 6: Replace the May 2025 consolidation callout

**Files:**
- Modify: `index.html` (around line 451 — find by content `Departure from the May 2025 brief`)

- [ ] **Step 1: Find the existing callout**

```bash
grep -n "Departure from the May 2025" index.html
```

The callout at that line currently reads:

```html
  <p class="callout"><strong>Departure from the May 2025 brief:</strong> The original brief named News Cycle as the body font. This edition consolidates to two families — DM Serif and Libre Franklin — because (a) Libre Franklin's nine weights provide all the hierarchy long-form text needs, and (b) two families are easier for non-designers to use correctly than three. News Cycle is no longer part of the system.</p>
```

- [ ] **Step 2: Replace it**

Replace the entire `<p class="callout">…</p>` with:

```html
  <p class="callout"><strong>A note on News Cycle:</strong> The May 2025 brief named News Cycle as the body font; a 2026 revision briefly removed it. This edition restores News Cycle as a third family, but on a tight leash — it is used <strong>only</strong> for compactness-driven moments: legal disclaimers, fine print, dense tables, footer compliance lines, and tight captions. For everything else, Libre Franklin remains the workhorse.</p>
```

- [ ] **Step 3: Verify in Chrome**

Reload `#type`. The callout below the hierarchy/lineage tables should now read "A note on News Cycle…" and emphasize the compactness-only scope.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Rewrite Typography callout for News Cycle compactness-only scope"
```

---

## Task 7: Update Do/Don't and QC checklist references to fonts

**Files:**
- Modify: `index.html:615-616, 627` (Do/Don't list items)
- Modify: `index.html:674-676` (QC checklist Typography fieldset)

- [ ] **Step 1: Update the "Do" item about body copy**

Line 615 currently reads:

```html
        <li><strong>Set body copy in Libre Franklin 400 at 16 px or larger.</strong> Smaller text is harder to read and not on-brand.</li>
```

No change needed — this is still correct. Body copy is Libre Franklin 400.

- [ ] **Step 2: Update the "Don't substitute fonts" item**

Line 627 currently reads:

```html
        <li><strong>Don't substitute fonts.</strong> If DM Serif or Libre Franklin aren't available, install them — both are free.</li>
```

Replace with:

```html
        <li><strong>Don't substitute fonts.</strong> If DM Serif, Libre Franklin, or News Cycle aren't available, install them — all three are free.</li>
```

- [ ] **Step 3: Update the QC checklist Typography fieldset**

Lines 674-676 currently read:

```html
    <label><input type="checkbox"> Only DM Serif (Display or Text) and Libre Franklin used</label>
    <label><input type="checkbox"> DM Serif Display only at 24 pt / 32 px or larger</label>
    <label><input type="checkbox"> Body copy in Libre Franklin 400, 16 px / 10 pt or larger</label>
```

Replace with:

```html
    <label><input type="checkbox"> Only DM Serif (Display or Text), Libre Franklin, or News Cycle used</label>
    <label><input type="checkbox"> DM Serif Display only at 24 pt / 32 px or larger</label>
    <label><input type="checkbox"> Body copy in Libre Franklin 400, 16 px / 10 pt or larger</label>
    <label><input type="checkbox"> News Cycle used only for legal, fine print, dense tables, or tight captions — never body</label>
```

- [ ] **Step 4: Verify in Chrome**

Reload `#rules` and confirm the Don't list item mentions all three families. Reload `#qc` and confirm the Typography fieldset now has 4 checkboxes (was 3 in this block, now 4 with the News Cycle scope rule).

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Update Do/Don't and QC checklist to reflect three-family type system"
```

---

## Task 8: Update Resources — add News Cycle to fonts list, add library address

**Files:**
- Modify: `index.html:728-735` (Install the fonts block)
- Modify: `index.html` (insert library address block within Resources section)

- [ ] **Step 1: Update the fonts install list**

Lines 728-735 currently read:

```html
    <div>
      <h3>Install the fonts</h3>
      <p>Both type families are free, open-licensed (SIL OFL), and hosted by Google Fonts.</p>
      <ul class="resource-list">
        <li><a href="https://fonts.google.com/specimen/DM+Serif+Display">DM Serif Display →</a></li>
        <li><a href="https://fonts.google.com/specimen/DM+Serif+Text">DM Serif Text →</a></li>
        <li><a href="https://fonts.google.com/specimen/Libre+Franklin">Libre Franklin →</a></li>
      </ul>
    </div>
```

Replace with:

```html
    <div>
      <h3>Install the fonts</h3>
      <p>All three families are free, open-licensed (SIL OFL), and hosted by Google Fonts.</p>
      <ul class="resource-list">
        <li><a href="https://fonts.google.com/specimen/DM+Serif+Display">DM Serif Display →</a></li>
        <li><a href="https://fonts.google.com/specimen/DM+Serif+Text">DM Serif Text →</a></li>
        <li><a href="https://fonts.google.com/specimen/Libre+Franklin">Libre Franklin →</a></li>
        <li><a href="https://fonts.google.com/specimen/News+Cycle">News Cycle →</a> <span class="note">(compact / legal use only)</span></li>
      </ul>
    </div>
```

- [ ] **Step 2: Add a CSS rule for the `.note` inline annotation**

In `assets/css/styles.css`, find the `.resource-list` styling (search by selector). Append after it:

```css
.resource-list .note {
  font-family: var(--sans);
  font-size: 0.78rem;
  color: var(--ink-soft);
  font-style: italic;
}
```

(If `.resource-list` styles don't exist as a discrete block, place `.resource-list .note` near other Resources-related rules around the existing `.contact-grid` block.)

- [ ] **Step 3: Add the library address block**

After the closing `</div>` of the `cols-2` block in Resources (find it — it closes the two-column Download/Install layout) and before the `<h3>Contact</h3>` heading, insert:

```html

  <h3>Library</h3>
  <address class="library-address">
    Beaumont Library District<br>
    125 E. Eighth St.<br>
    Beaumont, CA 92223<br>
    <a href="https://mybld.org">mybld.org</a>
  </address>
```

- [ ] **Step 4: Style the `.library-address`**

In `assets/css/styles.css`, near the `.contact-grid` rules, add:

```css
.library-address {
  font-family: var(--serif-text);
  font-style: normal;
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 1rem 0 2rem;
  color: var(--ink);
}
.library-address a {
  font-family: var(--sans);
  font-size: 0.95rem;
}
```

- [ ] **Step 5: Verify in Chrome**

Reload `#resources`. Confirm:
- The fonts list has 4 items, with News Cycle showing an italic gray "(compact / legal use only)" annotation.
- A new "Library" subsection appears between the cols-2 block and the Contact subsection, showing the full mailing address.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Add News Cycle to Resources fonts list and surface library mailing address"
```

---

## Task 9: Replace Resources contact grid with three cards (Julia/Kelly/Steven)

**Files:**
- Modify: `index.html:738-754` (the existing `.contact-grid` block)

- [ ] **Step 1: Read the current contact grid**

Lines 738-754 currently contain a 2-card `.contact-grid`: Kelly Van Valkenburg (labeled "Brand manager · final approvals") and Steven Brown.

- [ ] **Step 2: Replace with three cards in order Julia / Kelly / Steven**

Replace the entire block (the `<h3>Contact</h3>` and `<div class="contact-grid">…</div>`) with:

```html
  <h3>Contact</h3>
  <div class="contact-grid">
    <div class="contact-card">
      <p class="contact-role">Brand manager · day-to-day program steward</p>
      <p class="contact-name">Julia Schumacher</p>
      <p class="contact-title">Public Services Manager, Beaumont Library District</p>
      <p class="contact-line">julia.schumacher@mybld.org</p>
      <p class="contact-line">Library (951) 845-1357</p>
      <p class="contact-line">Office (951) 846-3222</p>
    </div>
    <div class="contact-card">
      <p class="contact-role">Director · final approvals</p>
      <p class="contact-name">Kelly Van Valkenburg</p>
      <p class="contact-title">Director, Beaumont Library District</p>
      <p class="contact-line">kelly.vanvalkenburg@mybld.org</p>
      <p class="contact-line">(951) 845-3222</p>
    </div>
    <div class="contact-card">
      <p class="contact-role">Designer · system &amp; this manual</p>
      <p class="contact-name">Steven Brown</p>
      <p class="contact-title">Steven Brown Video &amp; Design</p>
      <p class="contact-line">steven@stevenbrown.design</p>
      <p class="contact-line">(310) 994-3048</p>
    </div>
  </div>
```

- [ ] **Step 3: Confirm the existing `.contact-grid` handles three cards gracefully**

The CSS at `assets/css/styles.css:927` defines `.contact-grid`. Open the file and verify it uses `auto-fit` or similar (which would handle three cards). If it's hard-coded to two columns:

```css
.contact-grid {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
```

Adjust as needed. (If `auto-fit` is already there, no change.) Check the existing rule and decide.

- [ ] **Step 4: Verify in Chrome at desktop and narrow widths**

Reload `#resources`. At desktop width (>900 px) confirm three cards display in one row. Resize the window narrower and confirm cards reflow cleanly (no overflow, no awkward gaps). Chrome DevTools device emulation works fine; set width to 600 px and confirm cards stack to single column per the existing `@media (max-width: 600px)` rule at line 934.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/styles.css
git commit -m "Add Julia Schumacher as brand manager; relabel Kelly as Director"
```

---

## Task 10: Update footer colophon, README, and final verification

**Files:**
- Modify: `index.html:763` (colophon-fine)
- Modify: `README.md` (Stack section, Credits section)

- [ ] **Step 1: Update the footer colophon**

Line 763 currently reads:

```html
    <p class="colophon-fine">Set in DM Serif Display and Libre Franklin. Printed on Desert Sand. Designed by Steven Brown for the Beaumont Library District. Hosted at <a href="https://bld.stevenbrown.design">bld.stevenbrown.design</a>.</p>
```

Replace with:

```html
    <p class="colophon-fine">Set in DM Serif Display, Libre Franklin, and News Cycle. Printed on Desert Sand. Designed by Steven Brown for the Beaumont Library District. Hosted at <a href="https://bld.stevenbrown.design">bld.stevenbrown.design</a>.</p>
```

- [ ] **Step 2: Update the README Stack section**

`README.md` line 10 currently reads:

```markdown
- Type loaded from Google Fonts (DM Serif Display, DM Serif Text, Libre Franklin).
```

Replace with:

```markdown
- Type loaded from Google Fonts (DM Serif Display, DM Serif Text, Libre Franklin, News Cycle).
```

- [ ] **Step 3: Update the README Credits section**

`README.md` lines 62-64 currently read:

```markdown
- **Brand & manual design:** Steven Brown — steven@stevenbrown.design
- **Logo SVG production:** Julia Schumacher, Beaumont Library District
- **Brand steward:** Kelly Van Valkenburg, Director
```

Replace with:

```markdown
- **Brand & manual design:** Steven Brown — steven@stevenbrown.design
- **Brand manager:** Julia Schumacher, Public Services Manager, Beaumont Library District — julia.schumacher@mybld.org
- **Director · final approvals:** Kelly Van Valkenburg, Beaumont Library District
- **Logo SVG production:** Julia Schumacher
```

- [ ] **Step 4: Final grep — no De Vinne or two-family references remain**

```bash
grep -n "De Vinne\|Schroeder\|Theodore Low\|two type families\|two families\|consolidates to two\|two-typeface" index.html README.md
```

Expected: zero matches. If anything turns up, fix it (it's an oversight from an earlier task).

- [ ] **Step 5: Full chapter walkthrough in Chrome**

Reload `http://localhost:8080/`. Click through each chapter via the masthead nav. Confirm:
- **Cover** — unchanged
- **Contents** — Chapter Four subtitle now reads "the three-family system, hierarchy, lineage"
- **Essence** — unchanged
- **Logo** — unchanged
- **Color** — unchanged
- **Type** — three font specimens + News Cycle specimen + 10-row hierarchy table + 2-row lineage table + "A note on News Cycle" callout
- **Voice** — unchanged
- **Imagery** — unchanged
- **Applications** — unchanged
- **Do & Don't** — Don't item mentions all three families
- **QC** — Typography fieldset has 4 checkboxes including the News-Cycle-scope rule
- **Resources** — 4 fonts listed, library address present, three contact cards in Julia/Kelly/Steven order
- **Footer** — colophon mentions News Cycle

- [ ] **Step 6: Print preview**

Press Ctrl+P in Chrome. Cycle through all pages of the print preview. Confirm:
- Each chapter still starts on a new page
- Chapter Four (Typography) has not orphaned the new News Cycle article, hierarchy table, lineage table, or callout across awkward page breaks
- No content is clipped at page margins

If pagination is broken, address it with targeted `page-break-inside: avoid` rules on `.font-spec`, `.hierarchy`, or `.lineage` as needed. Commit any print-fix as a separate small commit.

- [ ] **Step 7: Commit**

```bash
git add index.html README.md
git commit -m "Update footer colophon and README for three-family type system and brand-manager credit"
```

---

## Self-Review

**Spec coverage check:**

| Spec section | Task |
|---|---|
| §1a Restore News Cycle as compact face | Tasks 1, 4 |
| §1b Lineage subsection (paragraphs) | Task 4 (Libre Franklin lineage already present at line 419, News Cycle lineage added in Task 4) |
| §1c Lineage table | Task 5 |
| §1d Legal/Disclaimer row in type-scale | Task 5 |
| §2a Canyon Earth reconcile (note, no markup change) | Documented in spec; no task — confirmed correct |
| §3a News Cycle in fonts list | Task 8 |
| §3b Three-card contact grid (Julia/Kelly/Steven) | Task 9 |
| §3c Library street address | Task 8 |
| §4a Footer colophon update | Task 10 |
| §4b README brand manager + News Cycle | Task 10 |
| §4c Generic "brand manager" stays generic | No task — no change needed |
| §5 Memory updates | Already done during brainstorming |
| Plus: De Vinne Roman removal | Task 3 |
| Plus: Replace May 2025 callout | Task 6 |
| Plus: Do/Don't + QC font references | Task 7 |

All spec sections accounted for.

**Placeholder scan:** No "TBD", "TODO", "fill in later", or "similar to Task N" present. Every code change is shown in full.

**Type/identifier consistency:**
- CSS variable: `--sans-compact` used consistently in Tasks 1, 4
- CSS class: `.font-spec--compact` and `.font-spec-compact-spec` used consistently in Task 4
- Font name: "News Cycle" (with space) used consistently across all tasks
- Contact role labels: "Brand manager · day-to-day program steward" / "Director · final approvals" / "Designer · system & this manual" used consistently in Tasks 9, 10

No drift.

**Order dependencies:** Task 5 references line numbers that may shift after Task 4 inserts content. The plan uses content searches (`grep -n`) where line numbers are fragile, and the engineer is told to "search for `</table>` immediately preceding the May 2025 callout" rather than trusting absolute line numbers post-edit.
