# 10 Utility Tool Pages — SEO-Optimized with Keyword Targeting

Build 10 dedicated tool pages, each as its own TanStack Start route with unique SEO metadata, H1, on-page copy, FAQ, and JSON-LD. Server-rendered so Google indexes the HTML. Keyword targets below come from your attached spreadsheet.

## Routes & keyword targets per page

### 1. `/premium-link-generator`
- **Primary:** premium link generator (720)
- **Secondary:** turbobit (590), rapidgator (590), filejoker (480), hitfile (320), fastfile.cc (260), keep2share (260), ddownload (210), k2s (210), uploadhaven (210), nitroflare (170), katfile (170), filesfly (170) premium link generator
- **Tool:** input link → generate formatted premium link; tabbed UI per host

### 2. `/add-to-calendar-link-generator`
- **Primary:** add to calendar link generator
- **Secondary:** google calendar link generator, outlook calendar link generator, event link generator, meeting link generator, ics link generator, add event to calendar link
- **Tool:** event form (title/date/time/location/description) → Google, Outlook, Yahoo, .ics links

### 3. `/rickroll-link-generator`
- **Primary:** rick roll link generator (1,300)
- **Secondary:** rickroll (720), rickrolled (480), rickrolling (480), fake link (390), prank link (90), troll link (50), custom rick roll, discord fake link, roblox fake link
- **Tool:** custom label/preview → shareable disguised link

### 4. `/mailto-link-generator`
- **Primary:** mailto link generator (1,000)
- **Secondary:** generate mailto link (390), email link generator (90), free mailto, html email link generator, gmail link generator, email link with subject and body
- **Tool:** to/cc/bcc/subject/body → mailto: string + `<a>` HTML snippet

### 5. `/google-maps-link-generator`
- **Primary:** google maps link generator
- **Secondary:** google maps direction link generator, directions link generator, map link generator, google business map link generator, google place id generator
- **Tool:** address or lat/lng or place ID → Maps + Directions URLs

### 6. `/whatsapp-link-generator`
- **Primary:** whatsapp link generate (720), whatsapp link generator (590)
- **Secondary:** generate whatsapp link (170), free whatsapp link generator, generate whatsapp link with number, generate whatsapp link qr code
- **Tool:** phone + prefilled message → wa.me link + QR code

### 7. `/slug-generator`
- **Primary:** seo url generator, url slug generator
- **Secondary:** seo friendly url generator, permalink generator, clean url generator, wordpress slug generator, slugify url generator
- **Tool:** title → lowercase dashed slug (stopword strip toggle, max length)

### 8. `/affiliate-link-generator`
- **Primary:** affiliate link generator (210), amazon affiliate link generator (210)
- **Secondary:** how to generate amazon affiliate link (480), how to generate affiliate links (170), aliexpress affiliate link generator, amazon affiliate program link generator, free affiliate link generator
- **Tool:** product URL + affiliate tag → final link; Amazon tag preset section

### 9. `/referral-link-generator`
- **Primary:** referral link generator (140)
- **Secondary:** referral code generator, create referral link, custom referral link generator, referral tracking link generator, invite link generator, free referral link generator (50)
- **Tool:** base URL + code/param + optional UTM → final referral link

### 10. `/google-review-link-generator`
- **Primary:** google review link generator (720)
- **Secondary:** how to generate google review link (140), generate google review link (90), google my business review link generator (70), google business review link generator, free google review link generator, google review link generator 5 stars
- **Tool:** Place ID input → review URL + 5-star prefilled variant; helper text for finding Place ID

## Plus

- **`/` (hub)** — H1 + 10 tool cards with the primary keyword in each card title, descriptive copy, internal links
- **`public/robots.txt`** — `User-agent: *` / `Allow: /`
- **`src/routes/sitemap[.]xml.ts`** — server route listing all 11 URLs (BASE_URL placeholder until domain is set, per Lovable SEO rule)

## SEO implementation (Lovable rules)

Per leaf route, in `head()`:
- `title` (<60 chars, primary keyword first)
- `description` (<160 chars, primary + 1 secondary)
- `og:title`, `og:description`, `og:url` (relative), `og:type: website`
- `<link rel="canonical">` (leaf only, relative href)
- JSON-LD scripts: `SoftwareApplication` (name, applicationCategory: "UtilitiesApplication") + `FAQPage`

Root (`__root.tsx`): sitewide defaults only (viewport, charSet, og:site_name, Organization JSON-LD). No canonical, no og:image, no page-specific copy.

## Page structure (each tool, server-rendered)

1. `<h1>` containing primary keyword
2. 1–2 paragraph intro
3. Interactive tool UI (hydrates client-side)
4. "How to use" `<ol>`
5. "Supported [hosts/calendars/platforms]" list — naturally seeds secondary keywords
6. FAQ section (4–6 Q&A) mirrored in FAQPage JSON-LD
7. "Related tools" internal links to 3 other tools

## Technical

- Pure client-side computation — no backend, no Cloud
- Shared `ToolLayout` (nav listing all 10 tools → strong internal linking)
- Shared `CopyButton`, `CodeBlock`, `FaqAccordion`
- `qrcode` npm package for WhatsApp QR (Worker-safe)
- Tailwind + tokens in `src/styles.css`; clean utility-tool aesthetic

## Open question

Want me to propose 2–3 visual design directions first (e.g. minimal Swiss, dark dev-tool, playful pastel), or pick a clean default and ship all 10 immediately?
