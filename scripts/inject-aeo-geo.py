#!/usr/bin/env python3
"""Inject AeoBlock + GeoBlock JSX into each of 9 tool routes right before <FaqSection."""
import re, pathlib

INJECTS = {
  "whatsapp-link-generator": {
    "aeo_q": "What is a WhatsApp link generator?",
    "aeo_a": "A WhatsApp link generator is a free online tool that turns a phone number with country code into a wa.me click-to-chat URL with optional prefilled message and downloadable QR code. The link opens WhatsApp directly to a chat with you on Android, iPhone and WhatsApp Web — no contact-save required.",
    "geo_heading": "WhatsApp link generator — USA business use cases",
    "geo_items": [
      ("Real-estate agent in Austin, TX", "Embeds a wa.me click-to-chat link in MLS listings so buyers can text questions in one tap from Zillow or the agent's site."),
      ("Boutique in Brooklyn, NY", "Prints a WhatsApp link QR code on receipts and packaging so US customers can ask sizing questions without saving the store's number."),
      ("Med-spa in Miami, FL", "Replaces the contact form with a WhatsApp Business link generator URL — appointment requests jumped after the switch."),
      ("Realtor team in Phoenix, AZ", "Adds the WhatsApp link with prefilled message ('Hi, I'm interested in 1234 Elm St') to every Facebook Marketplace listing."),
    ],
  },
  "google-review-link-generator": {
    "aeo_q": "What is a Google review link generator?",
    "aeo_a": "A Google review link generator is a free tool that builds a direct 5-star Google review link from your Google Business Profile Place ID. Customers tap the link and the Google review form opens pre-loaded for your business — boosting local SEO and review velocity.",
    "geo_heading": "Google review link generator — USA local business use cases",
    "geo_items": [
      ("Dentist in Tampa, FL", "Texts the Google review link to patients after appointments — review count tripled in 60 days."),
      ("HVAC contractor in Dallas, TX", "Prints the Google review QR code on invoices so homeowners scan-and-review on the spot."),
      ("Restaurant in Chicago, IL", "Adds the 5 star Google review link to the receipt footer; weekly reviews +400% YoY."),
      ("Law firm in Denver, CO", "Puts the Google My Business review link in the email-signature CTA to convert satisfied clients into reviewers."),
    ],
  },
  "mailto-link-generator": {
    "aeo_q": "What is a mailto link generator?",
    "aeo_a": "A mailto link generator builds an HTML mailto: URL with subject, body, CC and BCC pre-filled. When clicked, it opens the visitor's default email client (Gmail, Outlook, Apple Mail) with a draft ready to send — perfect for support pages, footers and email signature buttons.",
    "geo_heading": "Mailto link generator — USA use cases",
    "geo_items": [
      ("E-commerce store in Los Angeles, CA", "Uses a mailto link with subject 'Order #' so customers' first reply already contains their order number."),
      ("SaaS founder in Seattle, WA", "Drops a 'Talk to founder' mailto link with prefilled body in onboarding emails — 22% reply rate."),
      ("Non-profit in Washington, DC", "Adds a mailto link with CC to grants@ and BCC to board@ for one-click introductions."),
      ("Solo consultant in Boston, MA", "Replaces a Typeform with a mailto link generator URL on her contact page to skip form fatigue."),
    ],
  },
  "google-maps-link-generator": {
    "aeo_q": "What is a Google Maps link generator?",
    "aeo_a": "A Google Maps link generator creates a shareable URL from an address, latitude/longitude pair or Google Place ID. The link opens Google Maps directly to your location with directions, share-location and embed options — ideal for invitations, event pages and Google Business listings.",
    "geo_heading": "Google Maps link generator — USA use cases",
    "geo_items": [
      ("Wedding venue in Nashville, TN", "Adds a Google Maps directions link to every invitation PDF and email."),
      ("Pop-up market in Portland, OR", "Shares a lat-long Google Maps link on Instagram Stories so customers tap-to-navigate."),
      ("Co-working space in NYC", "Embeds a Place ID Google Maps link in the welcome email to first-time guests."),
      ("Wedding photographer in Charleston, SC", "Sends a Google Maps share-location link with the timeline email so the team finds the first-look spot fast."),
    ],
  },
  "add-to-calendar-link-generator": {
    "aeo_q": "What is an add to calendar link generator?",
    "aeo_a": "An add to calendar link generator builds one-click 'Add to Google Calendar / Outlook / Yahoo / Apple .ics' URLs from an event title, time and location. Recipients save the event with a single tap — perfect for webinars, sales calls, launches and RSVP emails.",
    "geo_heading": "Add to calendar link generator — USA use cases",
    "geo_items": [
      ("SaaS marketer in San Francisco, CA", "Pastes Google Calendar + Outlook calendar add-to-calendar links in webinar reminder emails — show-up rate +18%."),
      ("Course creator in Austin, TX", "Generates a .ics file link for cohort kickoffs that lands in any calendar app."),
      ("Event organizer in Las Vegas, NV", "Shares a Yahoo + Google calendar link on the event landing page to handle every audience."),
      ("HR team in Atlanta, GA", "Drops an add to calendar link generator URL in interview confirmation emails to reduce no-shows."),
    ],
  },
  "affiliate-link-generator": {
    "aeo_q": "What is an affiliate link generator?",
    "aeo_a": "An affiliate link generator appends your partner tag (Amazon Associates, AliExpress, Impact, ShareASale) to any product URL so commissions track correctly. The free affiliate link generator above also URL-encodes parameters and supports custom shortening for cleaner social shares.",
    "geo_heading": "Affiliate link generator — USA creator use cases",
    "geo_items": [
      ("Lifestyle creator in Miami, FL", "Generates Amazon affiliate links for every product in YouTube descriptions — Associates earnings +35%."),
      ("Tech reviewer in Brooklyn, NY", "Uses the custom affiliate link generator to add UTM tags so Google Analytics attributes commissions correctly."),
      ("Mom-blogger in Phoenix, AZ", "Builds AliExpress affiliate links for Pinterest pins with the affiliate tag generator."),
      ("Newsletter operator in Austin, TX", "Pairs the affiliate link generator with the URL slug generator for short branded redirects."),
    ],
  },
  "referral-link-generator": {
    "aeo_q": "What is a referral link generator?",
    "aeo_a": "A referral link generator creates a unique invite URL that includes a tracking code so credit lands with the right referrer. SaaS, fintech and e-commerce brands use the custom referral link generator to power give-$10-get-$10 programs and influencer campaigns.",
    "geo_heading": "Referral link generator — USA SaaS & DTC use cases",
    "geo_items": [
      ("Fintech startup in NYC", "Issues a custom referral link per user — referred signups account for 28% of MRR."),
      ("DTC brand in Los Angeles, CA", "Combines the referral link generator with the SEO URL slug generator for branded share URLs."),
      ("Crypto exchange in Miami, FL", "Tracks campaign sources with the referral URL generator's tracking code parameter."),
      ("Course community in Denver, CO", "Drops a SaaS referral link in onboarding so members invite peers in one tap."),
    ],
  },
  "slug-generator": {
    "aeo_q": "What is an SEO URL slug generator?",
    "aeo_a": "An SEO URL slug generator turns any blog title into a clean, lowercase, hyphen-separated URL slug optimized for WordPress permalinks, Webflow CMS items and Next.js routes. It strips diacritics, removes stop-words optionally and keeps the slug under search-engine-friendly length limits.",
    "geo_heading": "SEO URL slug generator — USA publisher use cases",
    "geo_items": [
      ("News site in Washington, DC", "Generates SEO friendly URLs for every breaking story without touching the CMS."),
      ("Wellness blogger in Austin, TX", "Uses the clean URL generator before publishing to Webflow to keep slugs crawlable."),
      ("Shopify store in Brooklyn, NY", "Pairs the slug generator with the affiliate link generator for shareable product redirects."),
      ("Agency in San Francisco, CA", "Standardises WordPress permalinks across 40 client sites with the slug generator."),
    ],
  },
  "rickroll-link-generator": {
    "aeo_q": "What is a rick roll link generator?",
    "aeo_a": "A rick roll link generator builds a disguised URL with a custom title that redirects to Rick Astley's 'Never Gonna Give You Up' video on YouTube. It's a free, harmless prank link generator used on Discord, Roblox, WhatsApp, SMS and Twitter — undefeated since 2007.",
    "geo_heading": "Rick roll link generator — USA prank use cases",
    "geo_items": [
      ("Discord mods anywhere in the US", "Drop a Discord fake link with a fake news title in #general for April Fools'."),
      ("Roblox content creator in Florida", "Uses the Roblox fake link generator in chat lobbies for harmless trolling."),
      ("College group chat in California", "Sends the custom rickroll link disguised as 'finals leak' before exams."),
      ("Marketing intern in Chicago, IL", "Plants a rickroll link in the team Slack #random at 4:55pm Friday."),
    ],
  },
}

ROUTES_DIR = pathlib.Path("src/routes")

for slug, data in INJECTS.items():
    path = ROUTES_DIR / f"{slug}.tsx"
    src = path.read_text()
    if "<AeoBlock" in src:
        print(f"skip {slug} (already has AeoBlock used)")
        continue
    items_jsx = ",\n          ".join(
        f'{{ who: "{w}", how: "{h}" }}' for w, h in data["geo_items"]
    )
    inject = f"""      <AeoBlock
        question="{data['aeo_q']}"
        answer="{data['aeo_a']}"
        keywords={{KW}}
      />

      <GeoBlock
        heading="{data['geo_heading']}"
        keywords={{KW}}
        items={{[
          {items_jsx},
        ]}}
      />

"""
    # Insert before the <FaqSection items={FAQS} ... /> line
    pattern = re.compile(r"^(\s*)<FaqSection items=\{FAQS\}", re.MULTILINE)
    m = pattern.search(src)
    if not m:
        print(f"!! could not find FaqSection in {slug}")
        continue
    new_src = src[:m.start()] + inject + src[m.start():]
    path.write_text(new_src)
    print(f"patched {slug}")
