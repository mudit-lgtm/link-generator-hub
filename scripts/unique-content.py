#!/usr/bin/env python3
"""Insert unique, tool-specific worked examples + pitfalls into the top tool pages."""
import json, pathlib, re, sys

R = pathlib.Path("src/routes")

C = {
"whatsapp-link-generator": {
  "ex_intro": "A Chicago bakery wants order enquiries to land in WhatsApp with the order form already typed out.",
  "rows": [
    {"input": "Phone +1 (555) 123-4567, no message", "output": "https://wa.me/15551234567"},
    {"input": "Phone +44 7700 900123, message \"Hi, is the sourdough available today?\"", "output": "https://wa.me/447700900123?text=Hi%2C%20is%20the%20sourdough%20available%20today%3F"},
    {"input": "Message with two lines (order + pickup time)", "output": "…?text=Order%3A%202%20loaves%0APickup%3A%204pm"},
  ],
  "note": "Line breaks become %0A, so a multi-line order template arrives formatted in the chat.",
  "pitfalls": [
    {"problem": "Leaving the + or leading zeros in the number", "fix": "wa.me accepts digits only. +44 (0)7700 900123 must be sent as 447700900123 — the national trunk zero is dropped."},
    {"problem": "Using api.whatsapp.com links in Instagram bios", "fix": "Some in-app browsers block the api subdomain. wa.me redirects cleanly on both iOS and Android."},
    {"problem": "Very long prefilled messages", "fix": "Above roughly 1,000 characters older Android builds truncate the text silently. Keep the template short and let the customer add detail."},
    {"problem": "Expecting the message to send itself", "fix": "WhatsApp only pre-types the text. The customer still taps send, which is why a question works better than a statement."},
  ],
},
"qr-code-link-generator": {
  "ex_intro": "A food truck prints one QR on the window and needs it readable from two metres away.",
  "rows": [
    {"input": "https://example.com/menu", "output": "PNG, 21x21 modules (version 1), error correction M"},
    {"input": "A wa.me chat link (~40 characters)", "output": "PNG, 25x25 modules — still scans at 3 cm printed size"},
    {"input": "A 180-character UTM-tagged URL", "output": "PNG, 45x45 modules — needs ~5 cm printed to scan reliably"},
  ],
  "note": "Rule of thumb for print: the QR should be at least one tenth of the scanning distance. Two metres away means a 20 cm code.",
  "pitfalls": [
    {"problem": "Shrinking the code to fit a design", "fix": "Longer URLs pack in more modules. Shorten the destination first, then the same physical square holds far fewer modules and scans faster."},
    {"problem": "Removing the white border", "fix": "Scanners need a quiet zone of four empty modules on every side. A QR flush against artwork often fails."},
    {"problem": "Low contrast or inverted colours", "fix": "Dark code on a light background only. Light-on-dark fails on many Android camera apps."},
    {"problem": "Printing a link you can never change", "fix": "Point the QR at a short link you control, so the destination can be updated after the flyers are printed."},
  ],
},
"short-link-generator": {
  "ex_intro": "The same product URL, prepared for a printed postcard and for a paid social ad.",
  "rows": [
    {"input": "https://shop.example.com/collections/spring/products/linen-shirt?variant=42", "output": "https://exmpl.co/linen (custom alias)"},
    {"input": "No alias supplied", "output": "https://exmpl.co/a7Kd2Q (6-character hash)"},
    {"input": "Alias \"Spring Sale\"", "output": "spring-sale — spaces and capitals are normalised"},
  ],
  "note": "A six-character alphanumeric hash gives roughly 56 billion combinations, so collisions are not a practical concern.",
  "pitfalls": [
    {"problem": "Using look-alike characters in a printed alias", "fix": "Avoid 0/O and 1/l/I. People retype printed links by hand and mistype those pairs constantly."},
    {"problem": "Reusing one short link for every channel", "fix": "One link per channel is the only way to know whether the postcard or the ad drove the visit."},
    {"problem": "Shortening an already shortened link", "fix": "Double redirects add latency and some email filters treat chained redirects as suspicious."},
    {"problem": "Free branded domains that expire", "fix": "If the domain lapses, every printed link dies. Use a domain you renew yourself for anything offline."},
  ],
},
"utm-link-generator": {
  "ex_intro": "One newsletter, two placements, so GA4 can tell the header banner from the footer text link.",
  "rows": [
    {"input": "source newsletter, medium email, campaign spring_sale", "output": "?utm_source=newsletter&utm_medium=email&utm_campaign=spring_sale"},
    {"input": "…plus content header_banner", "output": "&utm_content=header_banner"},
    {"input": "Campaign typed as \"Spring Sale\"", "output": "spring_sale — GA4 treats Spring Sale and spring_sale as two campaigns"},
  ],
  "note": "Keep every value lowercase with underscores. Case differences are the single most common cause of split campaign rows in GA4.",
  "pitfalls": [
    {"problem": "Tagging internal links", "fix": "A UTM on a link between your own pages starts a new session and destroys attribution for the original source."},
    {"problem": "Putting UTMs on a link that redirects", "fix": "Some redirect services strip query strings. Test the final landing URL, not the short link."},
    {"problem": "Using medium for the platform name", "fix": "Medium describes the channel type (email, cpc, social). The platform belongs in source."},
    {"problem": "Tagging paid search links twice", "fix": "Google Ads auto-tagging already adds gclid. Manual UTMs on top can override it and hide conversion data."},
  ],
},
"google-review-link-generator": {
  "ex_intro": "A dentist in Denver wants patients to land straight on the five-star box, not the business profile.",
  "rows": [
    {"input": "Place ID ChIJN1t_tDeuEmsRUsoyG83frY4", "output": "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4"},
    {"input": "Same Place ID, share format", "output": "A short g.page/r link you can print on a receipt"},
    {"input": "Business name only", "output": "Not enough — Google needs the Place ID, which you can copy from the Place ID finder"},
  ],
  "note": "The write-review URL opens the star selector directly, which typically converts better than sending people to the profile page.",
  "pitfalls": [
    {"problem": "Sending the maps listing URL instead", "fix": "That lands on the profile, where the review button is below the fold on mobile."},
    {"problem": "Asking for reviews by bulk SMS blast", "fix": "Google's policy prohibits review gating and incentives; a plain ask after service is both compliant and more effective."},
    {"problem": "Using a Place ID from the wrong location", "fix": "Multi-branch businesses have one ID per branch. Reviews land on whichever branch the ID belongs to."},
    {"problem": "Only sharing the link by email", "fix": "Printed QR codes at the counter reliably outperform email for walk-in businesses."},
  ],
},
"mailto-link-generator": {
  "ex_intro": "A support page that opens a pre-addressed email with the ticket template already filled in.",
  "rows": [
    {"input": "To support@example.com, subject \"Refund request\"", "output": "mailto:support@example.com?subject=Refund%20request"},
    {"input": "…plus CC billing@example.com and a two-line body", "output": "&cc=billing%40example.com&body=Order%20number%3A%0AReason%3A"},
    {"input": "Two recipients", "output": "mailto:a@example.com,b@example.com — comma separated, no spaces"},
  ],
  "note": "The @ in a CC or BCC address must be encoded as %40; the first address after mailto: does not need encoding.",
  "pitfalls": [
    {"problem": "Publishing a plain address in the page text", "fix": "Scrapers harvest it within days. The mailto link itself is enough; the address does not need to appear as visible text."},
    {"problem": "Long bodies", "fix": "Older Outlook builds cut mailto URLs near 2,000 characters. Keep templates to a few prompting lines."},
    {"problem": "Assuming a desktop mail client exists", "fix": "On machines with no configured client nothing happens. Show the address as a copyable fallback next to the button."},
    {"problem": "Using real line breaks in the body", "fix": "They must be encoded as %0A, otherwise the link breaks at the first newline."},
  ],
},
"google-maps-link-generator": {
  "ex_intro": "A venue page that opens turn-by-turn directions rather than a search results list.",
  "rows": [
    {"input": "Address 1600 Amphitheatre Pkwy, Mountain View CA", "output": "https://www.google.com/maps/search/?api=1&query=1600+Amphitheatre+Pkwy%2C+Mountain+View+CA"},
    {"input": "Same address, directions mode", "output": "…/maps/dir/?api=1&destination=1600+Amphitheatre+Pkwy&travelmode=driving"},
    {"input": "Coordinates 37.4220,-122.0841", "output": "query=37.4220%2C-122.0841 — exact pin, no geocoding guesswork"},
  ],
  "note": "Coordinates beat addresses for venues in retail parks or new developments, where geocoding often drops the pin at the wrong entrance.",
  "pitfalls": [
    {"problem": "Copying the long URL from the browser bar", "fix": "Those contain session data and can stop resolving. The api=1 format is the documented, stable one."},
    {"problem": "Not setting travelmode", "fix": "Maps defaults to the user's last mode, which may be transit when your visitors drive."},
    {"problem": "Embedding an address with a suite number", "fix": "Suite numbers confuse geocoding. Put the street address in the link and the suite in the page text."},
    {"problem": "Assuming the app opens on iPhone", "fix": "Without Google Maps installed the link falls back to the browser, which is fine — but do not label the button \"open in app\"."},
  ],
},
"add-to-calendar-link-generator": {
  "ex_intro": "A webinar invite that adds the correct hour for attendees in every US time zone.",
  "rows": [
    {"input": "Event 10:00-11:00 on 12 Mar 2026, America/New_York", "output": "dates=20260312T140000Z%2F20260312T150000Z"},
    {"input": "Title \"Q1 Product Webinar\" plus a details line", "output": "&text=Q1+Product+Webinar&details=Join+link+inside"},
    {"input": "All-day event", "output": "dates=20260312%2F20260313 — end date is exclusive"},
  ],
  "note": "Times are written in UTC with a Z suffix, so Google renders them in each attendee's own zone automatically.",
  "pitfalls": [
    {"problem": "Using local times without conversion", "fix": "An unconverted 10:00 shows as 10:00 in Los Angeles too, putting a third of your audience in the wrong hour."},
    {"problem": "Setting an all-day end date to the same day", "fix": "The end date is exclusive; same-day means a zero-length event that many calendars hide."},
    {"problem": "Only offering the Google link", "fix": "Roughly half of US business attendees use Outlook. Offer an .ics download alongside."},
    {"problem": "Putting the join URL only in the title", "fix": "Titles get truncated in notifications. Keep the meeting link in the details field."},
  ],
},
"google-drive-direct-link-generator": {
  "ex_intro": "Turning a Drive share link into one that starts the download instead of opening a preview.",
  "rows": [
    {"input": "https://drive.google.com/file/d/1AbC.../view?usp=sharing", "output": "https://drive.google.com/uc?export=download&id=1AbC..."},
    {"input": "An open?id= style link", "output": "Same result — the file ID is what matters, not the link format"},
    {"input": "A folder link", "output": "Not supported: direct download works on single files only"},
  ],
  "note": "Files above roughly 100 MB show a virus-scan interstitial before downloading; that is Google's behaviour and cannot be bypassed by the link format.",
  "pitfalls": [
    {"problem": "Sharing set to \"restricted\"", "fix": "The direct link will hit a sign-in wall. Set access to anyone with the link before sharing."},
    {"problem": "Using Drive as a CDN for a website", "fix": "Drive applies per-file quotas and will start returning errors on a popular download. Use real hosting for assets."},
    {"problem": "Linking Docs, Sheets or Slides", "fix": "Native Google files need an /export?format=pdf style URL instead; uc?export=download is for uploaded files."},
    {"problem": "Moving the file afterwards", "fix": "Moving is fine — the ID is stable — but re-uploading creates a new ID and breaks every published link."},
  ],
},
"direct-download-link-generator": {
  "ex_intro": "The same file, hosted three ways, converted to a link that downloads on click.",
  "rows": [
    {"input": "Dropbox …?dl=0 share link", "output": "Same URL with dl=1 — downloads instead of opening the preview page"},
    {"input": "OneDrive share link", "output": "…?download=1 appended to the share URL"},
    {"input": "Your own server", "output": "No URL change needed — send Content-Disposition: attachment instead"},
  ],
  "note": "On a host you control, the header is the correct fix; query-string tricks only exist because consumer cloud drives insist on a preview page.",
  "pitfalls": [
    {"problem": "Expiring share links", "fix": "Consumer drives rotate links when sharing settings change. Re-check any link you printed or emailed in bulk."},
    {"problem": "Bandwidth caps", "fix": "Dropbox and OneDrive suspend links that get heavy traffic. Anything above light sharing belongs on real hosting."},
    {"problem": "Downloading executables from a share link", "fix": "Browsers and mail filters flag them. Zip the file or publish a checksum alongside."},
    {"problem": "Assuming mobile behaves the same", "fix": "iOS Safari opens many file types in a viewer regardless of the link; note that for mobile users."},
  ],
},
}


def patch(slug, data):
    p = R / f"{slug}.tsx"
    src = p.read_text()
    if "WorkedExample" in src:
        print("skip (already patched)", slug); return
    src = src.replace(
        "ContextualLinks, BackToHomeLink",
        "ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink", 1)
    block = (
        '      <WorkedExample intro={%s} rows={%s} note={%s} />\n\n'
        '      <Pitfalls items={%s} />\n\n'
    ) % (json.dumps(data["ex_intro"]), json.dumps(data["rows"]),
         json.dumps(data["note"]), json.dumps(data["pitfalls"]))
    m = re.search(r"^      <FaqSection", src, re.M)
    if not m:
        print("NO FaqSection in", slug); sys.exit(1)
    src = src[:m.start()] + block + src[m.start():]
    p.write_text(src)
    print("patched", slug)


for slug, data in C.items():
    patch(slug, data)
