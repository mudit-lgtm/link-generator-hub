I will rebuild the site around your exact SEO structure instead of the thin random pages.

## What I will change

1. **Homepage becomes the Premium Link Generator page**
   - Move the Premium Link Generator tool and content to `/`.
   - Target the homepage to: `premium link generator`, `turbobit premium link generator`, `rapidgator premium link generator`, `filejoker premium link generator`, `hitfile premium link generator`, `fastfile.cc premium link generator`, `keep2share premium link generator`, `ddownload premium link generator`, `k2s premium link generator`, `uploadhaven premium link generator`, `filesfly premium link generator`, `katfile premium link generator`, `nitroflare premium link generator`.
   - Keep `/premium-link-generator` as a redirect-style/secondary route only if needed for existing links, but the primary SEO page will be `/`.

2. **Design the homepage properly**
   - Create a stronger utility-tool design, not plain cards.
   - Add a first-screen hero with the Premium Link Generator form visible immediately.
   - Add icon boxes linking to every inner link generator page.
   - Each icon box will use keyword-rich anchors, for example:
     - `WhatsApp Link Generator`
     - `Mailto Link Generator`
     - `Google Review Link Generator`
     - `Google Maps Link Generator`
     - `Add to Calendar Link Generator`
     - `Affiliate Link Generator`
     - `Referral Link Generator`
     - `Rick Roll Link Generator`
     - `SEO URL Generator`

3. **Inner pages for all other generators**
   - Keep the other tools as dedicated inner pages:
     - `/add-to-calendar-link-generator`
     - `/rickroll-link-generator`
     - `/mailto-link-generator`
     - `/google-maps-link-generator`
     - `/whatsapp-link-generator`
     - `/slug-generator`
     - `/affiliate-link-generator`
     - `/referral-link-generator`
     - `/google-review-link-generator`
   - Each page will link back to the homepage using `Premium Link Generator` as the anchor text.
   - Each page will include contextual internal links to related tools using matching keyword anchors.

4. **Add page-wise keyword targeting from the spreadsheet**
   - I will add the target keywords into each page’s:
     - H1/H2/H3 headings
     - intro paragraph
     - tool labels/supporting text
     - “how to use” section
     - AEO question headings
     - FAQ questions and answers
     - contextual internal link anchors
   - I will avoid keyword stuffing, but each page will clearly map to its attached keyword set.

5. **Add 1000-word SEO/AEO/GEO optimized content per page**
   - Each tool page will get a long-form content section around 1000 words, including:
     - what the tool does
     - who it is for
     - step-by-step use cases
     - platform-specific keyword sections
     - USA/local/business-oriented examples where relevant
     - AEO-style direct answers for AI search engines
     - GEO-style local/business context for Google review/maps/WhatsApp pages
   - The content will remain server-rendered HTML so Google can crawl it.

6. **Add SEO FAQ section on every page**
   - Each page will include keyword-led FAQs based on the spreadsheet plus common user questions.
   - FAQ copy will be visible on the page and mirrored in JSON-LD FAQ schema.

7. **Add full schema coverage**
   - Homepage and tool pages will include:
     - `SoftwareApplication`
     - `FAQPage`
     - `BreadcrumbList`
     - `WebPage`
   - Homepage will also include site-level `WebSite`/`Organization` where appropriate.
   - Metadata will stay per-route using TanStack Start `head()` so pages render SEO HTML correctly.

8. **Update navigation, sitemap, and internal linking**
   - Update the sitemap so `/` is the Premium Link Generator page and all inner generator pages are listed.
   - Update headers/footer and icon boxes so the crawl path is clear from homepage to every inner page.
   - Add contextual related links inside body content, not only footer links.

## Technical implementation

- Refactor shared components to support:
  - SEO content blocks
  - icon tool cards
  - breadcrumb schema
  - richer schema generation
  - contextual internal link sections
- Update each route file with its own keyword-specific content, meta title, meta description, headings, FAQs, and schemas.
- Keep everything static/client-side for the generators; no backend needed.
- Verify rendered HTML contains the H1, keyword content, JSON-LD, and internal links.