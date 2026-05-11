# Beaumont Library District — Brand Style Guide

The printable brand standards manual for the Beaumont Library District, hosted at **[bld.stevenbrown.design](https://bld.stevenbrown.design)**.

It collects the District's logo system, color palette, typography, voice, imagery guidance, application examples, a do/don't card for novice designers, and a QC checklist for the brand manager — all in a single static HTML page that prints cleanly to US Letter.

## Stack

- Plain HTML, CSS, and a single small JS file. No build step, no dependencies, no framework.
- Type loaded from Google Fonts (DM Serif Display, DM Serif Text, Libre Franklin, News Cycle).
- Logo suite copied directly into `assets/logos/` as SVG and transparent PNG.

```
.
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/script.js
│   └── logos/
│       ├── horizontal/      9 SVG color variants
│       ├── horizontal-png/  9 transparent PNG variants
│       ├── vertical/        9 SVG color variants
│       └── vertical-png/    9 transparent PNG variants
├── CNAME                    bld.stevenbrown.design
└── README.md
```

## Local preview

Any static-file server works:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080/`.

## Deployment

The `CNAME` file points the repo at `bld.stevenbrown.design`. Either:

- **GitHub Pages:** push to GitHub, enable Pages on `main` branch root, and add the CNAME DNS record in Cloudflare/Namecheap/wherever.
- **Cloudflare Pages / Netlify:** point at the repo. No build command, no build directory (`/` is the publish dir).

## Updating the guide

- **Logo files:** drop new SVGs into `assets/logos/horizontal/` or `vertical/` using the same kebab-case filenames. The HTML references them directly.
- **Colors:** edit the CSS custom properties at the top of `assets/css/styles.css` AND the corresponding `<article class="swatch">` blocks in `index.html`. Hex/RGB/CMYK/Pantone values live in the markup.
- **Typography hierarchy:** the recommended-scale table is in the Typography section of `index.html`. The actual font CSS lives in `styles.css`.
- **Content edits (voice, do/don'ts, QC):** straightforward HTML in `index.html`.

## Printing

The page is print-styled for US Letter portrait with 0.65 in margins. Each chapter starts on a new page; the masthead nav, copy buttons, and toast are hidden in print. Hit the **Print** button in the masthead (or `Ctrl/Cmd + P`).

## Credits

- **Brand & manual design:** Steven Brown — steven@stevenbrown.design
- **Brand manager & logo SVG production:** Julia Schumacher, Public Services Manager, Beaumont Library District — julia.schumacher@mybld.org
- **Director · final approvals:** Kelly Van Valkenburg, Beaumont Library District
