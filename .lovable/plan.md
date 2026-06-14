
## Goal

Before adding Tier 3 / Tier 4, make the 35 existing tools genuinely useful, ship cleaner AEO/GEO/schema-optimized copy, and fix the mega menu so it stays open and spans full width.

---

## 1. Fix the mega menu (header navigation)

Problems in `src/components/ToolLayout.tsx` `ToolsDropdown`:
- Menu disappears because of a gap between the trigger button and the floating panel — `mt-2` creates a 8px dead zone where `onMouseLeave` fires before the cursor enters the panel.
- Panel is `w-[28rem]` and right-aligned — not full width, columns feel cramped, no category grouping.

Fixes:
- Convert to a proper full-width mega menu: position the panel using a wrapper that includes both the trigger and the panel under a single `onMouseLeave`, with no visual gap (use `pt-2` padding inside the panel container rather than `mt-2`, plus a small hover-bridge).
- Add a 150ms close delay (`setTimeout` cleared on re-enter) so flicking across the panel doesn't dismiss it.
- Stretch panel to `left-0 right-0 w-screen max-w-none` anchored under the sticky header, with an inner `max-w-6xl mx-auto` grid of 4 columns grouped by category: **Marketing**, **Social & Meeting**, **File & Media**, **Utility & Fun**.
- Each column: category label + tool links with icon, name, one-line blurb.
- Keyboard accessible (focus open/close, ESC to close, focus trap optional).
- Mobile: collapse to an accordion drawer triggered by a hamburger.

## 2. Make every tool actually do its job (UX audit + per-tool fix)

All ~35 tools currently share the same "paste a URL → echo URL" template. Group them by the real input each tool needs, then replace `<Field><input/></Field>` with the right controls and add real client-side logic. Nothing server-side; everything stays in-browser.

### Tools that need a file upload + Blob URL (not a URL input)
Use `<input type="file" accept="...">`, create a `URL.createObjectURL(file)` (or read as base64 data URL when persistence across tabs matters), display preview, copy button, plus a notice that blob URLs live only in the current browser session and recommend pairing with a real host.

- `audio-link-generator` — accept `audio/*`, preview `<audio controls>`, output blob/data URL
- `video-link-generator` — accept `video/*`, preview `<video controls>`
- `image-link-generator` — accept `image/*`, preview `<img>`, optional base64 data URL toggle
- `pdf-link-generator` — accept `application/pdf`, embed in `<iframe>`, output `…#view=FitH`
- `direct-download-link-generator` — accept any file, output blob URL + `download` attribute snippet

### Tools that need a URL transform (input URL → rewritten URL)
Keep URL input but actually transform it.

- `google-drive-direct-link-generator` — regex `/d/<id>` or `id=<id>` → `https://drive.google.com/uc?export=download&id=<id>`
- `dropbox-direct-link-generator` — swap `www.dropbox.com` → `dl.dropboxusercontent.com`, force `?dl=1`
- `onedrive-direct-link-generator` — base64-url-encode share URL → `https://api.onedrive.com/v1.0/shares/u!<b64>/root/content`
- `mega-link-generator` — validate `mega.nz/file/<id>#<key>` / folder format, warn on missing key
- `short-link-generator` — call public is.gd or TinyURL via `fetch` (no key required) with graceful fallback
- `qr-code-link-generator` — render QR client-side with `qrcode` npm package (already-friendly), PNG download
- `utm-link-generator` — already needs source/medium/campaign fields, ensure they're present
- `slug-generator` — slugify input string (already correct type; verify)

### Tools that compose a URL from structured inputs
Replace the single URL field with multiple fields and assemble the deep link.

- `whatsapp-link-generator` — phone + message → `https://wa.me/<phone>?text=<urlencoded>`
- `mailto-link-generator` — to / cc / bcc / subject / body → `mailto:` URI
- `google-maps-link-generator` — address OR lat,lng OR Place ID + travel mode → maps URL
- `google-review-link-generator` — Place ID → `https://search.google.com/local/writereview?placeid=<id>`
- `add-to-calendar-link-generator` — title / start / end / location / details → Google + Outlook + Yahoo + .ics download
- `affiliate-link-generator` — product URL + tag → Amazon/AliExpress affiliate URL with subID
- `referral-link-generator` — base URL + ref code → `?ref=<code>`
- `rickroll-link-generator` — display label + destination toggle → shareable rickroll
- `youtube-link-generator` — video URL or ID + timestamp + sub/autoplay flags
- `discord-invite-link-generator` — invite code or vanity → `discord.gg/<code>`
- `zoom-meeting-link-generator` — meeting ID + passcode → `https://zoom.us/j/<id>?pwd=<pwd>`
- `google-meet-link-generator` — meeting code or "new" link
- `teams-meeting-link-generator` — Teams meeting URL builder
- `payment-link-generator` — amount + currency + description → encoded payment request URL
- `paypal-me-link-generator` — handle + amount + currency → `https://paypal.me/<handle>/<amount><currency>`
- `instagram-link-generator` — type toggle (profile / DM / story share) + handle
- `facebook-share-link-generator` — URL → `https://www.facebook.com/sharer/sharer.php?u=<url>`
- `telegram-link-generator` — type toggle (channel / group / bot / share) + handle/text
- `linkedin-link-generator` — type toggle (profile / company / share) + value
- `premium-link-generator` — host dropdown + file URL → host-specific deep link (validation only; no scraping)
- `magnet-link-generator` — info hash + display name + tracker list → `magnet:?xt=urn:btih:…`

Each tool keeps its identity, but the form, output, and any preview reflect what the tool actually does.

### Implementation pattern (shared)
Add a new lightweight `tool-ui.tsx` primitive `FileField` (and optionally `MultiField`) so each tool stays small. Each tool's `Page()` function gets a tailored form; everything else (`ToolHero`, `HowToUse`, `AeoBlock`, `GeoBlock`, `FaqSection`, `Breadcrumbs`, JSON-LD via `buildHead`) stays untouched.

## 3. De-fluff content (AEO / GEO / schema cleanup)

Current copy stuffs the exact keyword into nearly every sentence (e.g., "image link generator" appears 20+ times on one page). Refactor template helpers in `src/components/tool-ui.tsx` so:

- `ToolHero.intro` — one focused 1–2-sentence value prop, keyword used **once** naturally.
- `HowToUse` — concise imperative steps describing the actual UI (now that inputs differ per tool).
- `AeoBlock` — single direct Q&A optimized for "People Also Ask" / Perplexity, no keyword repetition.
- `GeoBlock` — 4 USA persona use-cases written like real scenarios, not keyword chants.
- `SeoLongform` — trim to 2 sections × 1 short paragraph each; remove keyword stuffing.
- `FaqSection` — 5 questions max, each answer 1–2 sentences, varied phrasing.

Per-page word count target: ~450–650 words (down from ~900+), keyword density ≤ 1.5%. Update `scripts/seo-qa.ts` thresholds to reflect this.

JSON-LD already shipped per page (FAQPage, BreadcrumbList, SoftwareApplication). Keep these; just verify each page's schema reflects the **new** trimmed FAQ list. Add `HowTo` JSON-LD generated from the new `HowToUse` steps for any tool with ≥ 3 user-facing steps.

## 4. Verification

- `bunx vitest run tests/seo.test.ts` — extend it to assert each route has the correct input element types (e.g., `audio-link-generator` page contains `input[type="file"][accept^="audio"]`).
- Add a new `tests/ux.test.ts` that mounts each route via `@testing-library/react`, checks the form renders, and submits a sample input to confirm the output area updates.
- Manual spot-check on preview after build.

## Out of scope (deferred)

- Tier 3 / Tier 4 new tools — start only after this audit passes.
- Server-side file hosting (blob URLs only; we'll add a real upload backend later if you want one).

---

### Technical details

- New `FileField` primitive in `src/components/tool-ui.tsx`:
  ```tsx
  export function FileField({ label, accept, onFile }: { label: string; accept: string; onFile: (f: File) => void }) { ... }
  ```
- Mega menu wrapper:
  ```tsx
  <div className="relative" onMouseEnter={open} onMouseLeave={scheduleClose}>
    <button>Tools ▾</button>
    {isOpen && (
      <div className="absolute left-0 right-0 top-full pt-2 w-screen">
        <div className="bg-card border-y border-border shadow-warm">
          <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-4 gap-6">…</div>
        </div>
      </div>
    )}
  </div>
  ```
- Drive direct: `const id = url.match(/\/d\/([^/]+)/)?.[1] ?? new URL(url).searchParams.get("id");`
- Magnet: `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(name)}${trackers.map(t=>'&tr='+encodeURIComponent(t)).join('')}`

### Files that will change

- `src/components/ToolLayout.tsx` — new mega menu + mobile drawer
- `src/components/tool-ui.tsx` — `FileField`, trimmed templates, optional `HowTo` schema
- All 35 files in `src/routes/*-link-generator.tsx` plus `slug-generator.tsx` — per-tool form + logic + trimmed copy
- `scripts/seo-qa.ts` — updated word-count / density thresholds
- `tests/seo.test.ts` + new `tests/ux.test.ts`

Confirm and I'll execute. If you want, I can also split this into two PR-style batches: **(A) mega menu + content de-fluff** first, then **(B) per-tool UX rewrites** — say the word.
