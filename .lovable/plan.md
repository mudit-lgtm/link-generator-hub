## Goals

Fix the four real problems: wrong homepage strategy, bland black-and-white design, content reads like an essay instead of keyword-targeted SEO, and missing AEO/GEO blocks + QA verification.

## 1. Restructure the homepage (correct SEO)

- **`/`** becomes the **General Link Generator hub / pillar page** targeting `link generator` (1,600), `generator link` (480), `google drive direct download link generator` (390), `url generator`, `free link generator`. This is the broad-intent pillar that links to every sub-tool.
- **`/premium-link-generator`** becomes its own dedicated page again (the current `/` content moves back here), keeping all 13 host keywords (turbobit, rapidgator, nitroflare, filejoker, k2s, ddownload, hitfile, fastfile.cc, uploadhaven, filesfly, katfile, keep2share).
- Add a 301 from any legacy URL collisions; update sitemap priorities (`/` = 1.0, `/premium-link-generator` = 0.9, others = 0.8).
- Hub page layout: hero with broad-keyword H1 + a built-in mini "URL → short link / direct link" tool (so `/` is itself a working utility, not just a directory), then the icon grid of all 10 sub-tools, then ~1000 words of keyword-targeted hub content + FAQs.

## 2. Rebrand — Sunset Utility design system

Apply the chosen palette across `src/styles.css` using OKLCH tokens:

- Background: cream `#fff7ed`, surface white
- Primary: coral-orange `#ff6b35` (CTAs, links, accents)
- Secondary: magenta-pink `#e84393` (gradient partner, hover states)
- Foreground: deep navy `#1a1a2e`
- Gradient token `--gradient-sunset: linear-gradient(135deg, #ff6b35, #e84393)` for hero, buttons, tool-card hovers
- Shadow token `--shadow-warm: 0 10px 30px -10px rgba(232, 67, 147, 0.25)`

Typography: pair **Space Grotesk** (display, bold tracking-tight headings) + **Inter** (body), loaded via `<link>` in `__root.tsx`. Update `@theme` font tokens.

Component refresh:
- Branded header with gradient wordmark "LinkKit"
- Hero with gradient background + decorative blob
- Tool icon cards: white surface, colored icon chip (rotating accent per tool), gradient border on hover, warm shadow
- Buttons: gradient primary, soft coral secondary
- Section dividers, badge pills ("Free", "No signup"), rating stars
- Subtle motion: framer-motion fade-up on hero + stagger on icon grid

## 3. Rewrite content for SEO (not essay-style)

For every page (hub + 10 tools), replace prose-y blocks with **scannable, keyword-led structure**:

- **H1**: exact head keyword, e.g. "WhatsApp Link Generator — Free wa.me Click-to-Chat Link"
- **Intro (50–80 words)**: head keyword in first sentence, **bolded** target keywords, USA reference
- **Tool block** at top (above the fold), not buried
- **H2 sections** each titled with a long-tail keyword from the spreadsheet (e.g. "How to create a WhatsApp link with prefilled message", "WhatsApp link generator with QR code", "Free WhatsApp business link for USA businesses")
- **Use-case bullet list** (5–7 items) with bolded keywords
- **AEO direct-answer block**: "What is a [tool]?" — single ≤55-word paragraph optimized for AI Overviews & featured snippets
- **GEO block**: USA-specific examples (Shopify store in Austin, dentist in Miami, realtor in Phoenix, etc.) — relevant on Google Review, Maps, WhatsApp, Mailto, Affiliate pages especially
- **Comparison / platform mini-sections**: e.g. premium page gets one micro-section per host (Rapidgator, Turbobit…) with that host's exact keyword as H3
- **FAQ section** (8–10 Q&As) using exact "People Also Ask" keywords from the spreadsheet — mirrored in `FAQPage` JSON-LD
- Total ~1000 words per page, **keyword density 1–2%**, no stuffing
- Keywords **visually highlighted** via `<strong>` and bolded anchor text in internal links

## 4. Internal linking pass

- Every tool page gets a "Related link generators" block with 3–4 contextual links using **exact-match keyword anchors** (e.g. "Mailto Link Generator", "Google Review Link Generator")
- Body prose contains 2–3 contextual in-line links to related tools + the `/link-generator` hub using keyword anchors
- Hub page icon grid uses keyword-rich anchor text + descriptions
- Footer keeps full directory; header gets a "Tools" dropdown with all 10

## 5. Schema coverage (full)

Per page, emit:
- `WebPage`
- `SoftwareApplication` (offers $0, aggregateRating)
- `FAQPage` (mirrors visible FAQ exactly)
- `BreadcrumbList`
- Hub page additionally emits `WebSite` + `ItemList` (listing all 10 tools)
- Root `__root.tsx` keeps `Organization` only

## 6. SEO QA — checklist + automated tests (both)

**Standalone script** `scripts/seo-qa.ts` (run with `bun scripts/seo-qa.ts`):
- Build the site, walk every route from `routeTree.gen.ts`
- For each URL fetch the rendered HTML and check:
  - exactly one `<h1>`, contains target head keyword
  - `<title>` 30–60 chars, unique across pages
  - meta description 120–160 chars, unique
  - canonical present and self-referential
  - JSON-LD blocks parse and include required `@type`s
  - body word count ≥ 900
  - target keywords from the page's keyword list appear in H1/H2/intro
  - URL listed in `/sitemap.xml`
  - no `noindex`
- Pretty pass/fail report per URL + exit code

**Vitest suite** `tests/seo.test.ts` covers the same assertions per route so CI fails on regressions. A shared `src/lib/seo-keywords.ts` source-of-truth file (page → keyword list) feeds both the components (for content/FAQ generation) and the QA scripts.

## 7. New tools (deferred)

You didn't paste the full new-tools list — only the General Link Generator hub. I'll build that hub now. Reply with the additional tools (with target keywords + KD/volume) when ready and I'll add them in a follow-up.

## Technical implementation

- `src/styles.css` — replace OKLCH tokens, add gradient + shadow tokens, register `--font-display`, `--font-body` under `@theme`; add Space Grotesk + Inter `<link>` in `__root.tsx`.
- `src/lib/seo-keywords.ts` — new: per-page keyword lists imported by routes and QA scripts.
- `src/components/tool-ui.tsx` — add `KeywordIntro`, `AeoBlock`, `GeoBlock`, `KeywordSection` components that bold keywords automatically.
- `src/components/ToolLayout.tsx` — rebrand header (gradient wordmark, tools dropdown), refresh `IconToolGrid` with colored icon chips + warm shadows, framer-motion stagger.
- `src/components/Hero.tsx` — new gradient hero with built-in mini tool for `/`.
- `src/routes/index.tsx` — rewrite as General Link Generator hub.
- `src/routes/premium-link-generator.tsx` — restore full Premium Link Generator page (remove the 301).
- All 10 existing tool routes — rewrite copy to keyword-led structure + AEO + GEO + 8–10 FAQs from spreadsheet.
- `src/routes/sitemap[.]xml.ts` — update priorities; ensure all routes listed.
- `scripts/seo-qa.ts` + `tests/seo.test.ts` + `package.json` script `"seo:qa": "bun scripts/seo-qa.ts"`.
- `bun add framer-motion` (if not already), no other deps.