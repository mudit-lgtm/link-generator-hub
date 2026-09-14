#!/usr/bin/env python3
"""Unique worked examples + pitfalls for the remaining tool pages."""
import json, pathlib, re, sys

R = pathlib.Path("src/routes")

C = {
"affiliate-link-generator": {
  "ex_intro": "One product page, tagged for three different affiliate placements so payouts can be told apart.",
  "rows": [
    {"input": "Amazon product URL + tag acme-20", "output": "https://www.amazon.com/dp/B0XXXX?tag=acme-20"},
    {"input": "Generic program, sub-id \"newsletter\"", "output": "?ref=acme&subid=newsletter"},
    {"input": "Link already carrying ?ref=", "output": "The existing ref is replaced, not appended twice"},
  ],
  "note": "Sub-IDs are the only reliable way to see which placement earned a commission; most networks report them for 60-90 days.",
  "pitfalls": [
    {"problem": "Cloaking links behind a redirect without disclosure", "fix": "Most programs require a visible affiliate disclosure; hiding the destination can end the partnership."},
    {"problem": "Losing the tag through a shortener", "fix": "Some shorteners strip query strings. Always open the short link and confirm the tag survives to the landing page."},
    {"problem": "Putting the tag on a deep category page", "fix": "Amazon in particular pays on the session, but a broken or expired product URL earns nothing. Check the product is still live."},
    {"problem": "Emailing Amazon affiliate links", "fix": "Their operating agreement forbids it. Link to a page on your own site instead and put the affiliate link there."},
  ],
},
"anchor-link-generator": {
  "ex_intro": "A long pricing guide that needs shareable links straight to each section.",
  "rows": [
    {"input": "Heading \"Annual plans\"", "output": "id=\"annual-plans\" and href=\"#annual-plans\""},
    {"input": "Same page, absolute form", "output": "https://example.com/pricing#annual-plans"},
    {"input": "Heading with an ampersand: \"Fees & refunds\"", "output": "fees-refunds — symbols are dropped, not encoded"},
  ],
  "note": "Chrome also supports text fragments (#:~:text=annual%20plans) when you cannot edit the page to add an id.",
  "pitfalls": [
    {"problem": "Duplicate ids on one page", "fix": "Only the first match wins. Suffix repeats (-2) or the jump silently lands in the wrong place."},
    {"problem": "A sticky header covering the target", "fix": "Add scroll-margin-top to the heading equal to the header height, otherwise the title hides behind the bar."},
    {"problem": "Renaming a heading later", "fix": "The id changes and every shared link breaks. Keep the original id even if the wording changes."},
    {"problem": "Using spaces or capitals in an id", "fix": "Stick to lowercase and hyphens; mixed case behaves inconsistently across browsers and analytics tools."},
  ],
},
"app-store-link-generator": {
  "ex_intro": "One campaign, two stores, so installs can be attributed per platform.",
  "rows": [
    {"input": "App ID 310633997, US store", "output": "https://apps.apple.com/us/app/id310633997"},
    {"input": "Android package com.example.app", "output": "https://play.google.com/store/apps/details?id=com.example.app"},
    {"input": "Play link + campaign tag", "output": "&referrer=utm_source%3Dnewsletter%26utm_campaign%3Dspring"},
  ],
  "note": "Leaving the country code out of an App Store link sends everyone to the US store, which can show \"not available in your region\".",
  "pitfalls": [
    {"problem": "Using a country-locked link in global ads", "fix": "Use /app/idXXXX without a locale, or detect the region and pick the matching store."},
    {"problem": "Expecting UTMs to work on iOS", "fix": "Apple ignores query strings; use Apple's campaign token (ct=) in App Analytics links instead."},
    {"problem": "Linking the developer page, not the app", "fix": "Visitors have to search again, and a large share drop off at that step."},
    {"problem": "One button for both platforms", "fix": "Show both, or route by user agent. A Play link on an iPhone is a dead end."},
  ],
},
"audio-link-generator": {
  "ex_intro": "A podcast episode prepared for a website player and a plain shareable download.",
  "rows": [
    {"input": "episode-12.mp3 uploaded", "output": "<audio controls src=\"…/episode-12.mp3\"></audio>"},
    {"input": "Same file, share link", "output": "A direct .mp3 URL that plays in the browser tab"},
    {"input": "A .wav master", "output": "Works, but roughly 10x the file size — convert to MP3 or AAC for the web"},
  ],
  "note": "MP3 and AAC play everywhere. OGG and FLAC fail on Safari, which is still most iPhone traffic.",
  "pitfalls": [
    {"problem": "Linking a file behind a login", "fix": "The player shows a broken control with no error. Host audio on a public URL."},
    {"problem": "Missing preload settings", "fix": "preload=\"none\" keeps a long episode from eating mobile data before anyone presses play."},
    {"problem": "No transcript on the page", "fix": "Search engines cannot hear audio. A transcript is what actually gets the episode found."},
    {"problem": "Hotlinking someone else's file", "fix": "It can break without warning and it uses their bandwidth. Host your own copy."},
  ],
},
"calendly-link-generator": {
  "ex_intro": "A sales booking link that arrives with the prospect's details already filled in.",
  "rows": [
    {"input": "calendly.com/acme/30min", "output": "The plain booking page"},
    {"input": "…plus name and email prefill", "output": "?name=Dana%20Lee&email=dana%40example.com"},
    {"input": "Hide the cookie banner and details", "output": "&hide_gdpr_banner=1&hide_event_type_details=1"},
  ],
  "note": "Prefilling name and email typically removes two form fields, which is where most booking drop-off happens.",
  "pitfalls": [
    {"problem": "Prefilling from an unverified source", "fix": "Anyone can edit a query string. Never trust prefilled values as confirmed identity."},
    {"problem": "Embedding without a height", "fix": "The iframe collapses on mobile. Give it a fixed height of at least 700px or use their responsive embed."},
    {"problem": "Sending a link to a full calendar", "fix": "Check availability before a campaign; an empty week reads as an abandoned business."},
    {"problem": "One link for every campaign", "fix": "Add a utm_source so you know which email or ad produced the meeting."},
  ],
},
"discord-invite-link-generator": {
  "ex_intro": "A public community invite that will not expire halfway through a launch week.",
  "rows": [
    {"input": "Invite code aB3dEf", "output": "https://discord.gg/aB3dEf"},
    {"input": "Vanity URL (level 3 servers)", "output": "https://discord.gg/yourbrand"},
    {"input": "Default settings", "output": "Expires in 7 days, 0 max uses — set both to never for a website link"},
  ],
  "note": "Discord defaults every new invite to 7 days. A link printed on a site or video needs expiry explicitly set to never.",
  "pitfalls": [
    {"problem": "Posting a temporary invite publicly", "fix": "It dies in a week and the traffic hits a \"invite invalid\" screen with no recovery path."},
    {"problem": "Inviting straight into a busy channel", "fix": "Point the invite at a rules or welcome channel so new arrivals know what to do first."},
    {"problem": "Temporary membership left on", "fix": "That setting kicks people when they disconnect; most server owners enable it by accident."},
    {"problem": "No verification level", "fix": "A public invite with no verification attracts spam bots within hours. Require a verified email at minimum."},
  ],
},
"email-signature-link-generator": {
  "ex_intro": "A signature block that works in Gmail, Outlook and Apple Mail without breaking.",
  "rows": [
    {"input": "Name, role, phone, site", "output": "A table-based HTML block with a tel: and https: link"},
    {"input": "Booking link added", "output": "An inline text link, not a button image"},
    {"input": "Logo image", "output": "Must be an absolute https URL — attachments show as a red X for many recipients"},
  ],
  "note": "Outlook's renderer ignores flexbox and most modern CSS; signatures survive only as simple tables with inline styles.",
  "pitfalls": [
    {"problem": "Using a hosted image for the whole signature", "fix": "Images are blocked by default in many clients, leaving a blank signature with no contact details."},
    {"problem": "Social icons with no alt text", "fix": "Blocked-image mode shows nothing at all. Alt text keeps the links usable."},
    {"problem": "Bare tracking links", "fix": "Spam filters score redirect chains in signatures harshly. Link to your own domain."},
    {"problem": "A five-line disclaimer", "fix": "It inflates every reply in a thread. Keep it short or link to the policy page."},
  ],
},
"facebook-share-link-generator": {
  "ex_intro": "A share button for a blog post, plus the tags that decide what the post looks like once shared.",
  "rows": [
    {"input": "https://example.com/blog/post", "output": "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com%2Fblog%2Fpost"},
    {"input": "Page with og:image 1200x630", "output": "A large image card"},
    {"input": "Page with no og tags", "output": "A bare link with the domain name and no picture"},
  ],
  "note": "Facebook no longer accepts a prefilled quote or message; everything shown comes from the destination page's Open Graph tags.",
  "pitfalls": [
    {"problem": "Expecting to prefill the caption", "fix": "The quote parameter was removed years ago. Control the preview through og:title and og:description instead."},
    {"problem": "A stale preview after editing the page", "fix": "Facebook caches aggressively. Re-scrape the URL in their Sharing Debugger to refresh it."},
    {"problem": "og:image under 600px wide", "fix": "It renders as a tiny thumbnail. Use 1200x630 for the full-width card."},
    {"problem": "Sharing a URL with UTMs", "fix": "Each variant caches separately and can fragment your share counts."},
  ],
},
"google-meet-link-generator": {
  "ex_intro": "A recurring standup link that does not need a new invite every morning.",
  "rows": [
    {"input": "Existing meeting code abc-defg-hij", "output": "https://meet.google.com/abc-defg-hij"},
    {"input": "Instant meeting", "output": "https://meet.google.com/new — creates a fresh code on open"},
    {"input": "Dial-in needed", "output": "Add the PIN line from the calendar event; codes alone do not carry phone access"},
  ],
  "note": "Meeting codes tied to a calendar event stay valid for the whole series, which is why standups should link the event, not a one-off room.",
  "pitfalls": [
    {"problem": "Sharing a /new link", "fix": "It creates a different room for each person who clicks. Share the generated code instead."},
    {"problem": "External guests hitting \"ask to join\"", "fix": "Add them to the calendar event so they are admitted automatically."},
    {"problem": "No personal Google account", "fix": "Guests without an account can join only if the host is present. Say so in the invite."},
    {"problem": "Assuming recording is on", "fix": "Recording needs a paid Workspace tier and must be started manually each time."},
  ],
},
"html-link-generator": {
  "ex_intro": "The same link written for a web page, a README and a forum post.",
  "rows": [
    {"input": "HTML, opens in a new tab", "output": "<a href=\"https://example.com\" target=\"_blank\" rel=\"noopener\">Example</a>"},
    {"input": "Markdown", "output": "[Example](https://example.com)"},
    {"input": "BBCode", "output": "[url=https://example.com]Example[/url]"},
  ],
  "note": "rel=\"noopener\" is not optional on target=\"_blank\": without it the opened page can manipulate the tab it came from.",
  "pitfalls": [
    {"problem": "\"Click here\" as the anchor text", "fix": "Screen readers list links out of context, and search engines learn nothing. Describe the destination."},
    {"problem": "Adding nofollow to internal links", "fix": "It wastes crawl signals inside your own site. Reserve nofollow for untrusted or paid outbound links."},
    {"problem": "Opening every link in a new tab", "fix": "It breaks the back button and confuses mobile users. Reserve it for PDFs and third-party tools."},
    {"problem": "Unescaped ampersands in href", "fix": "Write &amp; in HTML; a bare & can break validation and some parsers."},
  ],
},
"iframe-embed-link-generator": {
  "ex_intro": "A YouTube walkthrough embedded on a docs page without wrecking mobile layout.",
  "rows": [
    {"input": "Video ID dQw4w9WgXcQ", "output": "<iframe src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" …>"},
    {"input": "Start at 1:30", "output": "…/embed/ID?start=90"},
    {"input": "Responsive wrapper", "output": "A 16:9 aspect-ratio box so the video scales instead of overflowing"},
  ],
  "note": "youtube-nocookie.com behaves identically but defers tracking cookies until playback, which simplifies consent banners.",
  "pitfalls": [
    {"problem": "Embedding the watch URL", "fix": "/watch?v= refuses to frame. Only the /embed/ path works inside an iframe."},
    {"problem": "Fixed pixel width", "fix": "A 640px iframe overflows a 390px phone screen. Use a percentage width with an aspect-ratio wrapper."},
    {"problem": "No loading=\"lazy\"", "fix": "Each embed pulls hundreds of kilobytes on page load and visibly hurts your Core Web Vitals."},
    {"problem": "Missing title attribute", "fix": "Screen readers announce \"iframe\" with no context, and it is an accessibility failure."},
  ],
},
"image-link-generator": {
  "ex_intro": "One product photo prepared as a hosted link, an HTML tag and a clickable banner.",
  "rows": [
    {"input": "photo.jpg uploaded", "output": "A direct https URL ending in .jpg"},
    {"input": "HTML output", "output": "<img src=\"…/photo.jpg\" alt=\"Linen shirt in oat\" width=\"800\">"},
    {"input": "Clickable version", "output": "<a href=\"/products/linen-shirt\"><img …></a>"},
  ],
  "note": "Setting width and height on the tag reserves the space before the image loads, which stops the page jumping and improves layout scores.",
  "pitfalls": [
    {"problem": "Empty alt text on meaningful images", "fix": "Describe what the image shows. Leave alt empty only for purely decorative graphics."},
    {"problem": "Uploading a 4000px camera file", "fix": "Resize to roughly twice the displayed width. A 6 MB hero image is the most common mobile slowdown."},
    {"problem": "Hotlinking from someone else's site", "fix": "It can be blocked or swapped for another picture at any moment, and it is using their bandwidth."},
    {"problem": "PNG for photographs", "fix": "Use JPEG or WebP; PNG is for flat graphics and transparency, and triples the file size on photos."},
  ],
},
"instagram-link-generator": {
  "ex_intro": "A bio link that opens the app rather than a logged-out web page.",
  "rows": [
    {"input": "Username acmestudio", "output": "https://instagram.com/acmestudio"},
    {"input": "App deep link", "output": "instagram://user?username=acmestudio"},
    {"input": "Direct message", "output": "https://ig.me/m/acmestudio — opens a DM thread"},
  ],
  "note": "ig.me/m/ is the DM equivalent of wa.me and is the quickest route from an ad to a conversation.",
  "pitfalls": [
    {"problem": "Using the app scheme on desktop", "fix": "instagram:// does nothing in a desktop browser. Use the https link unless you detect mobile."},
    {"problem": "Expecting clickable links in captions", "fix": "Only the bio and story links are tappable. Captions show the URL as plain text."},
    {"problem": "Changing your handle", "fix": "Every printed link breaks instantly and the old handle can be claimed by someone else."},
    {"problem": "Sending cold traffic to a profile", "fix": "Point campaigns at a specific post or DM link; a profile grid gives no next step."},
  ],
},
"linkedin-link-generator": {
  "ex_intro": "A share button for a company blog post, and a prefilled connection message for outreach.",
  "rows": [
    {"input": "Article URL", "output": "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fexample.com%2Fpost"},
    {"input": "Company page", "output": "https://www.linkedin.com/company/acme"},
    {"input": "Profile, clean form", "output": "linkedin.com/in/danalee — drop everything after the slug"},
  ],
  "note": "LinkedIn reads the destination's Open Graph tags for the preview; there is no supported way to prefill the post text.",
  "pitfalls": [
    {"problem": "Sharing a link with no og:image", "fix": "The post appears as a grey box and gets noticeably less engagement."},
    {"problem": "Copying a profile URL with tracking junk", "fix": "Trim ?originalSubdomain= and similar; the clean /in/ slug is stable and shorter."},
    {"problem": "Stale preview after an edit", "fix": "Use LinkedIn's Post Inspector to refresh the cached preview before sharing again."},
    {"problem": "Outbound links in the post body", "fix": "Reach is lower for posts with external links. Many teams put the link in the first comment."},
  ],
},
"magnet-link-generator": {
  "ex_intro": "A magnet URI assembled from an info hash for a file you are distributing yourself.",
  "rows": [
    {"input": "Info hash 40 hex characters", "output": "magnet:?xt=urn:btih:<hash>"},
    {"input": "Plus display name", "output": "&dn=ubuntu-24.04-desktop-amd64.iso"},
    {"input": "Plus tracker", "output": "&tr=udp%3A%2F%2Ftracker.example.org%3A6969"},
  ],
  "note": "Without at least one tracker or DHT enabled in the client, a magnet link finds no peers and appears to hang.",
  "pitfalls": [
    {"problem": "Sharing copyrighted material", "fix": "Only distribute files you own or that carry a licence permitting it. This tool is for your own releases and open-source images."},
    {"problem": "Hash in the wrong format", "fix": "btih accepts 40-character hex or 32-character base32. Mixed or truncated hashes fail silently."},
    {"problem": "No display name", "fix": "The download shows as the raw hash in the client, which looks like malware to most people."},
    {"problem": "Dead trackers", "fix": "Include two or three current public trackers; a single stale one leaves the torrent stuck at 0%."},
  ],
},
"payment-link-generator": {
  "ex_intro": "An invoice request sent by email and the same amount collected in person by QR.",
  "rows": [
    {"input": "$120.00, memo \"Invoice 1042\"", "output": "A hosted checkout URL with the amount locked"},
    {"input": "Amount left open", "output": "A tip or donation page where the payer chooses"},
    {"input": "Same link as QR", "output": "Printed on the invoice for tap-to-pay at the counter"},
  ],
  "note": "Locking the amount removes underpayment disputes; leaving it open is better for tips and donations, where averages rise when people choose.",
  "pitfalls": [
    {"problem": "Reusing one link for many invoices", "fix": "Payments arrive with no reference. Generate one per invoice and put the number in the memo."},
    {"problem": "No expiry on a quoted price", "fix": "A link from six months ago still charges the old price. Set an expiry when the quote has one."},
    {"problem": "Collecting card details yourself", "fix": "Always send people to the provider's hosted page; handling card numbers directly pulls you into PCI scope."},
    {"problem": "Ignoring the fee on small amounts", "fix": "Fixed per-transaction fees can take a tenth of a $5 payment. Set a sensible minimum."},
  ],
},
"pdf-link-generator": {
  "ex_intro": "A 40-page manual linked so support can send customers straight to the right page.",
  "rows": [
    {"input": "manual.pdf, page 12", "output": "https://example.com/manual.pdf#page=12"},
    {"input": "Open zoomed to fit width", "output": "#page=12&zoom=page-width"},
    {"input": "Force a download", "output": "Serve with Content-Disposition: attachment"},
  ],
  "note": "The #page= fragment is honoured by Chrome, Edge, Firefox and Acrobat, but ignored by some mobile in-app viewers.",
  "pitfalls": [
    {"problem": "Scanned PDFs with no text layer", "fix": "They are invisible to search and to screen readers. Run OCR before publishing."},
    {"problem": "Publishing a PDF instead of a page", "fix": "PDFs rank worse and read badly on phones. Use one for print-ready documents only."},
    {"problem": "Huge uncompressed files", "fix": "A 30 MB brochure will not open on a weak connection. Downsample images to 150 dpi for screen use."},
    {"problem": "Metadata left in the file", "fix": "Author names, file paths and revision history travel inside the PDF. Strip them before publishing."},
  ],
},
"reddit-share-link-generator": {
  "ex_intro": "A submit link that opens Reddit with the title and URL already filled in.",
  "rows": [
    {"input": "URL + title", "output": "https://www.reddit.com/submit?url=…&title=How%20we%20cut%20load%20time"},
    {"input": "Targeting a subreddit", "output": "https://www.reddit.com/r/webdev/submit?url=…"},
    {"input": "Text post", "output": "…/submit?selftext=true&title=…&text=…"},
  ],
  "note": "Pointing at /r/<sub>/submit skips the community picker, which is the step most people abandon.",
  "pitfalls": [
    {"problem": "Encouraging link drops in strict subs", "fix": "Many communities auto-remove self-promotion. Read the sidebar rules before pushing a share button at them."},
    {"problem": "Title over 300 characters", "fix": "Reddit rejects the submission outright rather than truncating."},
    {"problem": "Unencoded titles", "fix": "An & or # in the title truncates the prefill at that character."},
    {"problem": "Expecting the post to submit itself", "fix": "Reddit only prefills the form; the user still chooses the community and presses post."},
  ],
},
"referral-link-generator": {
  "ex_intro": "A member-get-member link that credits the right person and survives signup.",
  "rows": [
    {"input": "Code DANA20", "output": "https://example.com/signup?ref=DANA20"},
    {"input": "Landing on a content page", "output": "https://example.com/blog/post?ref=DANA20 — the code follows through to signup"},
    {"input": "Code with spaces", "output": "dana20 — normalised to lowercase, no spaces"},
  ],
  "note": "Store the referral code in a first-party cookie on arrival; most signups happen on a later visit, not the first click.",
  "pitfalls": [
    {"problem": "Relying on the query string at signup", "fix": "People browse first, then register. Without a stored cookie the credit is lost."},
    {"problem": "No self-referral check", "fix": "The first thing a determined user tries is referring themselves from a second email."},
    {"problem": "Unreadable codes", "fix": "Names and short words get shared verbally. Random strings do not."},
    {"problem": "No expiry or cap", "fix": "Set a window and a per-user limit before launch; changing the terms afterwards annoys your best advocates."},
  ],
},
"rickroll-link-generator": {
  "ex_intro": "A harmless office prank link, disguised as a document share.",
  "rows": [
    {"input": "No options", "output": "A short link that lands on the famous 1987 video"},
    {"input": "Custom alias \"q3-budget\"", "output": "A link that reads like a spreadsheet share"},
    {"input": "Autoplay start", "output": "…?autoplay=1&t=43 — opens straight at the chorus"},
  ],
  "note": "Keep it to friends and group chats. The same trick in a work email or a customer message stops being funny fast.",
  "pitfalls": [
    {"problem": "Using it in marketing", "fix": "Bait-and-switch links raise complaint rates and can get a sending domain blocked."},
    {"problem": "Sending it to a client", "fix": "Never disguise a prank as a business document. It reads as a phishing test gone wrong."},
    {"problem": "Autoplay in a quiet office", "fix": "Funny once, then it is your colleague's speakers at full volume in a meeting."},
    {"problem": "Posting it in a support channel", "fix": "Many platforms treat deceptive links as spam and will remove the account, not just the post."},
  ],
},
"slug-generator": {
  "ex_intro": "Three article titles turned into URLs that read well and stay stable.",
  "rows": [
    {"input": "\"How We Cut Load Time by 60%\"", "output": "how-we-cut-load-time-by-60"},
    {"input": "\"Café & Bar: 2026 Guide\"", "output": "cafe-bar-2026-guide — accents folded, symbols dropped"},
    {"input": "\"  Multiple   spaces  \"", "output": "multiple-spaces — trimmed and collapsed"},
  ],
  "note": "Short slugs of three to five meaningful words are easier to share and hold up better when a headline is later rewritten.",
  "pitfalls": [
    {"problem": "Putting the date in the slug", "fix": "Evergreen articles look stale by next year. Keep dates out unless the content really is time-bound."},
    {"problem": "Changing a published slug", "fix": "Every existing link and ranking breaks. If you must, add a 301 redirect from the old path."},
    {"problem": "Stop words padding the URL", "fix": "Drop the, a and of. They add length without adding meaning."},
    {"problem": "Non-Latin characters left raw", "fix": "They become percent-encoded gibberish when copied. Transliterate instead."},
  ],
},
"sms-link-generator": {
  "ex_intro": "A poster CTA that opens the messages app with the keyword already typed.",
  "rows": [
    {"input": "Number +15551234567, body \"JOIN\"", "output": "sms:+15551234567?&body=JOIN"},
    {"input": "iOS-safe form", "output": "The &amp; after ? is what makes older iOS keep the body"},
    {"input": "Body with a line break", "output": "Encoded as %0A; some Android clients strip it"},
  ],
  "note": "The ?& quirk is real: iOS historically dropped the body without the extra ampersand, and it does no harm on Android.",
  "pitfalls": [
    {"problem": "Desktop visitors", "fix": "Nothing happens without a paired messages app. Show the number as text alongside the button."},
    {"problem": "Long prefilled messages", "fix": "Anything over 160 characters becomes a multipart message and may be charged as several."},
    {"problem": "Assuming delivery is free", "fix": "The sender pays their normal rate. Say so next to any shortcode-style CTA."},
    {"problem": "Skipping the country code", "fix": "A local-format number fails for anyone roaming or abroad."},
  ],
},
"spotify-link-generator": {
  "ex_intro": "A track link for a bio, and the app deep link for a mobile campaign.",
  "rows": [
    {"input": "Track ID 4cOdK2wGLETKBW3PvgPWqT", "output": "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT"},
    {"input": "App deep link", "output": "spotify:track:4cOdK2wGLETKBW3PvgPWqT"},
    {"input": "Copied share link", "output": "Strip ?si=… — that suffix is a share-tracking token, not part of the link"},
  ],
  "note": "open.spotify.com links open the app automatically when it is installed, so there is rarely a reason to use the spotify: scheme on the web.",
  "pitfalls": [
    {"problem": "Leaving the ?si= token in a public link", "fix": "It ties every play back to your own share session and clutters printed URLs."},
    {"problem": "Linking a track that is region-locked", "fix": "Licensing varies by country; check the release is live in your main markets."},
    {"problem": "Using the spotify: scheme in an email", "fix": "Many clients refuse non-http schemes and show it as plain text."},
    {"problem": "Pointing new listeners at a single track", "fix": "An artist or playlist link keeps them listening longer and counts more monthly listeners."},
  ],
},
"teams-meeting-link-generator": {
  "ex_intro": "A Teams join link shared with people outside the organisation.",
  "rows": [
    {"input": "Meeting URL from the calendar", "output": "https://teams.microsoft.com/l/meetup-join/…"},
    {"input": "Chat with one person", "output": "https://teams.microsoft.com/l/chat/0/0?users=dana@example.com"},
    {"input": "External guest", "output": "Same link — they join through the browser without a Teams account"},
  ],
  "note": "Teams join links are long and contain a context token; shortening them for print is fine, but never edit the query string by hand.",
  "pitfalls": [
    {"problem": "Trimming the join URL", "fix": "Removing the context parameter makes the link unusable. Copy it whole."},
    {"problem": "Lobby settings left strict", "fix": "External guests wait indefinitely if no one admits them. Set who can bypass the lobby before the call."},
    {"problem": "Assuming guests can share screen", "fix": "Browser guests have limited controls; ask them to install the app if they are presenting."},
    {"problem": "Reusing a link from a deleted event", "fix": "Deleting the calendar item invalidates the meeting; the link then errors for everyone."},
  ],
},
"telegram-link-generator": {
  "ex_intro": "A support handle link, a channel invite and a bot start command with a payload.",
  "rows": [
    {"input": "Username acmesupport", "output": "https://t.me/acmesupport"},
    {"input": "Private channel", "output": "https://t.me/+AbCdEf… — the invite hash form"},
    {"input": "Bot with payload", "output": "https://t.me/acmebot?start=ref_dana"},
  ],
  "note": "The ?start= payload arrives with the first bot message, which is how referral tracking works inside Telegram.",
  "pitfalls": [
    {"problem": "Sharing a private invite publicly", "fix": "Anyone who sees it joins. Revoke and regenerate the invite if it leaks."},
    {"problem": "Assuming a username is permanent", "fix": "Released usernames can be taken by someone else, including impersonators."},
    {"problem": "Payload longer than 64 characters", "fix": "Telegram silently drops it. Use a short code and look up the detail server-side."},
    {"problem": "Using tg:// in emails", "fix": "Custom schemes are stripped by most mail clients. Always use the https t.me form."},
  ],
},
"tel-link-generator": {
  "ex_intro": "A contact page button that dials reception and jumps straight to an extension.",
  "rows": [
    {"input": "+1 (555) 123-4567", "output": "tel:+15551234567"},
    {"input": "Extension 204", "output": "tel:+15551234567,204 — the comma is a two-second pause"},
    {"input": "Longer IVR path", "output": "tel:+15551234567,,204 — two commas for slower menus"},
  ],
  "note": "A comma is a pause; a p also works on many handsets. Extensions dialled with no pause almost always miss the menu.",
  "pitfalls": [
    {"problem": "Formatting the href like the display text", "fix": "Spaces, brackets and dashes belong in the visible label, never inside tel:."},
    {"problem": "No country code", "fix": "The number fails for anyone calling from abroad or on a foreign SIM."},
    {"problem": "A call button on desktop with no fallback", "fix": "Show the number as selectable text so it can be copied."},
    {"problem": "Tracking numbers swapped by script", "fix": "If a script rewrites numbers, make sure it rewrites the href too, not just the label."},
  ],
},
"tiktok-link-generator": {
  "ex_intro": "A profile link for a bio, plus the in-app version for paid traffic.",
  "rows": [
    {"input": "Username acmestudio", "output": "https://www.tiktok.com/@acmestudio"},
    {"input": "Single video", "output": "https://www.tiktok.com/@acmestudio/video/7123456789012345678"},
    {"input": "Copied share link", "output": "vm.tiktok.com/… — fine to share, but it expires and cannot be printed safely"},
  ],
  "note": "The @ is required in profile URLs; without it the link 404s rather than redirecting.",
  "pitfalls": [
    {"problem": "Printing a vm.tiktok.com short link", "fix": "Those are session share links and can stop resolving. Use the full canonical URL."},
    {"problem": "Forgetting the @", "fix": "tiktok.com/acmestudio is a dead page. The handle always carries the @."},
    {"problem": "Linking a video that gets deleted", "fix": "Profile links are safer for anything printed or embedded long-term."},
    {"problem": "Expecting desktop parity", "fix": "Many features open only in the app; on desktop the link lands on the web player."},
  ],
},
"twitter-share-link-generator": {
  "ex_intro": "A share button that opens the composer with the post title, link and one hashtag.",
  "rows": [
    {"input": "Text + URL", "output": "https://twitter.com/intent/tweet?text=How%20we%20cut%20load%20time&url=https%3A%2F%2Fexample.com%2Fpost"},
    {"input": "Plus a mention and hashtag", "output": "&via=acmestudio&hashtags=webperf"},
    {"input": "x.com domain", "output": "Both twitter.com and x.com intent URLs still work"},
  ],
  "note": "The URL counts as a fixed 23 characters regardless of its real length, so budget the text around that, not around the raw link.",
  "pitfalls": [
    {"problem": "Putting the URL inside the text parameter", "fix": "It gets double-counted and encoded oddly. Use the separate url parameter."},
    {"problem": "Three or more hashtags", "fix": "Engagement drops. One or two relevant tags outperform a list."},
    {"problem": "hashtags with a # prefix", "fix": "The parameter takes bare words, comma separated. A # becomes %23 and breaks the tag."},
    {"problem": "Relying on the preview card", "fix": "Cards only render if the destination has twitter:card tags and has been crawled."},
  ],
},
"upi-link-generator": {
  "ex_intro": "A fixed invoice amount and an open tip jar, both as UPI deep links.",
  "rows": [
    {"input": "VPA acme@okhdfcbank, ₹499", "output": "upi://pay?pa=acme@okhdfcbank&pn=Acme&am=499&cu=INR"},
    {"input": "Amount left blank", "output": "The payer types any amount — right for tips"},
    {"input": "With a note", "output": "&tn=Invoice%201042 — shows in the payer's history and yours"},
  ],
  "note": "cu=INR is mandatory; UPI rejects the request without a currency even though rupees are the only option.",
  "pitfalls": [
    {"problem": "Sharing the link to desktop users", "fix": "Nothing opens without a UPI app. Pair every UPI link with a QR code."},
    {"problem": "Typos in the VPA", "fix": "The money can reach a real stranger's handle. Send yourself ₹1 before publishing."},
    {"problem": "No transaction note", "fix": "Reconciling a day of identical ₹499 payments becomes guesswork."},
    {"problem": "Trusting the app's success screen alone", "fix": "Confirm against your bank statement; app status can lag or show pending as done."},
  ],
},
"video-link-generator": {
  "ex_intro": "A product demo clip prepared for a page embed and a plain shareable link.",
  "rows": [
    {"input": "demo.mp4 uploaded", "output": "<video controls playsinline src=\"…/demo.mp4\"></video>"},
    {"input": "With a poster frame", "output": "poster=\"…/demo-thumb.jpg\" — shown before playback"},
    {"input": "A .mov from an iPhone", "output": "Convert to MP4/H.264; .mov fails in several browsers"},
  ],
  "note": "playsinline stops iOS from hijacking the video into fullscreen, which matters for short autoplaying product clips.",
  "pitfalls": [
    {"problem": "Autoplay with sound", "fix": "Browsers block it outright. Autoplay only works when the video is also muted."},
    {"problem": "Serving a 200 MB file", "fix": "Self-hosting big video burns bandwidth and stalls on mobile. Use a video host above ~20 MB."},
    {"problem": "No poster image", "fix": "The player shows a black rectangle until the first frame loads."},
    {"problem": "No captions", "fix": "Most social and in-page video is watched muted. A caption track is not optional."},
  ],
},
"youtube-link-generator": {
  "ex_intro": "One video, linked three ways: at a timestamp, as an embed, and with a subscribe prompt.",
  "rows": [
    {"input": "Video ID + start 1:30", "output": "https://youtu.be/VIDEOID?t=90"},
    {"input": "Embed form", "output": "https://www.youtube.com/embed/VIDEOID?start=90"},
    {"input": "Subscribe prompt", "output": "https://www.youtube.com/@channel?sub_confirmation=1"},
  ],
  "note": "The t= parameter takes seconds in a youtu.be link but the embed path wants start=; mixing them is why timestamps often fail.",
  "pitfalls": [
    {"problem": "Using watch?v= in an iframe", "fix": "It refuses to frame. Only /embed/ works as an embed source."},
    {"problem": "Timestamps written as 1:30", "fix": "The parameter takes seconds (90), or the 1m30s form. A colon is ignored."},
    {"problem": "Copying a link with a playlist id", "fix": "Viewers get pulled into a whole playlist instead of the one video you meant."},
    {"problem": "Autoplay embeds", "fix": "Blocked unless muted, and it hurts page performance scores either way."},
  ],
},
"zoom-meeting-link-generator": {
  "ex_intro": "A webinar join link that does not force every attendee to type a passcode.",
  "rows": [
    {"input": "Meeting ID 123 4567 8901", "output": "https://zoom.us/j/12345678901"},
    {"input": "With embedded passcode", "output": "…/j/12345678901?pwd=<encrypted> — joins in one click"},
    {"input": "Vanity domain", "output": "https://acme.zoom.us/j/… for paid accounts"},
  ],
  "note": "The pwd parameter is the hashed passcode Zoom generates, not the numeric code you see in the invite; copy the whole link rather than building it.",
  "pitfalls": [
    {"problem": "Retyping the pwd value", "fix": "It is not the passcode digits. Hand-built pwd values always fail."},
    {"problem": "Posting a join link publicly", "fix": "Zoombombing is still common. Use registration or a waiting room for anything public."},
    {"problem": "Personal Meeting ID for external calls", "fix": "Your PMI never changes, so anyone who ever had it can drop into a later meeting."},
    {"problem": "No dial-in for phone attendees", "fix": "Include one number and the ID for people joining from a car or a weak connection."},
  ],
},
}


def patch(slug, data):
    p = R / f"{slug}.tsx"
    if not p.exists():
        print("MISSING", slug); return
    src = p.read_text()
    if "WorkedExample" in src:
        print("skip", slug); return
    if "ContextualLinks, BackToHomeLink" not in src:
        print("NO import anchor", slug); sys.exit(1)
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
