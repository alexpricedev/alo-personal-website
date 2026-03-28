# Design system — ALO personal site

Source-of-truth for visual language. Colors and wordmark are extracted from the reference images in `public/brand/`; typography matches the workbook (Special Gothic Expanded One + Rock Salt accents).

## Reference assets

| Asset | Path | Contents |
|--------|------|----------|
| Night-city palette | [`/brand/palette-reference.png`](public/brand/palette-reference.png) | Photo + five sampled swatches with hex codes |
| Wordmark / type | [`/brand/typography-wordmark-reference.png`](public/brand/typography-wordmark-reference.png) | “ANNETTE \| LYN O’NEIL” hybrid treatment |
| Favicon / monogram | [`/favicon.png`](public/favicon.png) | ALO shield monogram (gold **#C9A73D** on white) |
| Open Graph / social preview | [`/og-image.png`](public/og-image.png) | Split navy/yellow graphic — name, role stack, curved photo panel |
| Hero photography | [`/hero.png`](public/hero.png) | **Waist-up** NYC night (better for wide `object-fit: cover` heroes) |
| Hero (alternate) | [`/hero-portrait.png`](public/hero-portrait.png) | **Full vertical** Times Square — used at **≤640px** where a taller crop reads better |

## Launch & content (v1)

| Decision | Choice |
|----------|--------|
| Site shape | Single long homepage only |
| Canonical URL | `https://www.annettelynoneil.com` |
| Testimonials | Placeholder copy for now |
| Proof / body copy | From the personal workbook |
| Role stack (hero) | Product Leader × Early-Stage Operational Design × Force Multiplier |
| Primary contact | `mailto:hello@annettelynoneil.com` |
| Social | [LinkedIn](https://www.linkedin.com/in/annettelynoneil), [Instagram](https://www.instagram.com/nettenette) |
| Nav labels & anchors | Reference / workbook: **About me** → `#about`, **Track record** → `#track-record`, **Expertises** → `#expertise`, **Testimonials** → `#testimonials`, **Contact** → `mailto:` + footer `#contact` |
| Analytics | **Google Analytics 4** — set `GA_MEASUREMENT_ID` (e.g. `G-XXXXXXXXXX`) in `.env`; gtag loads from `layouts.tsx` when set |
| Legal | **Skipped** for v1 launch |
| Hero exit motion | Split horizontal (name parts exit left / right) |
| Reference motion | Stacking full-bleed sections (see [nickvelten.nl](https://www.nickvelten.nl/)) — Lenis + GSAP-style scroll |
| Footer | © `{year}` — SYTECH \| Sheffield — Site by [ထCHPTRS](https://chptrs.tech) |

`og:image` and `twitter:image` use **`/og-image.png`**. Set **`GA_MEASUREMENT_ID`** in `.env` for production analytics.

**Implemented:** Homepage uses workbook copy, **`--brand-*`** palette and display/accent fonts ([Special Gothic Expanded One](https://fonts.google.com/specimen/Special+Gothic+Expanded+One) + Rock Salt via Google Fonts), **sticky stacked sections** (`position: sticky` + rising `z-index`), **Lenis** smooth scroll + **GSAP ScrollTrigger** hero name drift, hero photo (`/hero.png` / `/hero-portrait.png`). Site footer id: **`site-footer`**; contact block is **`#contact`** on the homepage.

## Color

Sampled from neon city lights against deep night; high contrast, cool base, warm/cool accents.

| Token | Hex | Role |
|--------|-----|------|
| `brand-pink` | `#F2055C` | Accent — energy, emphasis, CTAs |
| `brand-blue` | `#056CF2` | Primary blue — links, key UI |
| `brand-blue-sky` | `#0583F2` | Secondary blue — gradients, hover, depth |
| `brand-navy` | `#022340` | Deepest cool neutral — backgrounds, text on light, “black” |
| `brand-yellow` | `#F2CB07` | Warm accent — highlights, sparing contrast |
| `brand-monogram-gold` | `#C9A73D` | ALO shield monogram / favicon gold (optional UI accent) |

**Usage notes**

- Prefer **navy** and **blues** for structure; use **pink** and **yellow** as deliberate highlights (not large flat fields).
- Pair with true **white** `#FFFFFF` and **black** `#000000` for wordmark-style lockups.

CSS mirrors these as `--brand-*` in `src/client/style.css`.

## Typography

| Role | Face | Notes |
|------|------|--------|
| Display / UI | **Special Gothic Expanded One** | Condensed geometric sans; headings, nav, name treatments |
| Accent | **Rock Salt** | Hand-drawn; short highlights, pull quotes, “human” moments only |
| Fallbacks | system UI stack | Until webfonts are loaded, use `var(--font-main)` |

**Wordmark logic (from reference)**

- Core line is **uppercase geometric sans** with **hand-drawn** first letters: **A** (Annette), **L** (Lyn), **O** (O’Neil).
- Thin vertical **pipe** between `ANNETTE` and `LYN` only.
- On the web, approximate with display font + accent font on selected glyphs, or use a raster/SVG export of the final wordmark for the header.

**Loading fonts**

- [Special Gothic Expanded One](https://fonts.google.com/specimen/Special+Gothic+Expanded+One?preview.script=Latn) and [Rock Salt](https://fonts.google.com/specimen/Rock+Salt) are loaded from Google Fonts via `layouts.tsx` (`<link>` to `fonts.googleapis.com`).

## Aesthetic direction (aligned with workbook)

Editorial, minimal, sleek, premium, sharp, typographic, cool-toned, high-contrast, composed, cinematic, modernist, polished — comparable restraint to strong typographic portfolio sites.

## Implementation

- Brand tokens: `--brand-pink`, `--brand-blue`, `--brand-blue-sky`, `--brand-navy`, `--brand-yellow`, `--brand-monogram-gold`
- Display / accent stacks: `--font-brand-display`, `--font-brand-accent` (see `style.css`)

Existing semantic tokens (`--color-bg`, `--color-primary`, etc.) remain until pages are migrated to this palette.
