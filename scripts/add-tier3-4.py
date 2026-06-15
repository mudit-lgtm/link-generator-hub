#!/usr/bin/env python3
"""Add Tier 3 + Tier 4 tools. Generates route .tsx files, appends to
SEO map in src/lib/seo-keywords.ts, and appends entries to the TOOLS
array in src/components/ToolLayout.tsx."""
import json, re
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
# Reuse the render() in build-tools.py
import importlib.util
spec_mod = importlib.util.spec_from_file_location("build_tools", ROOT / "scripts" / "build-tools.py")
bt = importlib.util.module_from_spec(spec_mod); spec_mod.loader.exec_module(bt)

ROUTES = ROOT / "src" / "routes"

NEW: list[dict] = []
def add(**k): NEW.append(k)

# ------------------------ TIER 3 ------------------------

add(slug="tiktok-link-generator", name="TikTok Link Generator", h1="TikTok Profile, Video & Share Link Generator",
    intro="Build TikTok URLs for a profile, single video or the system share dialog.",
    fields=[{"name":"kind","label":"Link type","type":"select","options":[
        {"value":"profile","label":"Profile (@user)"},{"value":"video","label":"Video by ID"},{"value":"sound","label":"Sound by ID"}]},
        {"name":"value","label":"Username or ID","type":"text","placeholder":"username or 1234567890123"}],
    build="const x=(v.value||'').trim().replace(/^@/,''); if(!x) return ''; if(v.kind==='video') return `https://www.tiktok.com/@user/video/${x}`; if(v.kind==='sound') return `https://www.tiktok.com/music/${x}`; return `https://www.tiktok.com/@${x}`;",
    aeoQ="How do I create a TikTok profile or video link?",
    aeoA="Profile: `https://www.tiktok.com/@<username>`. Single video: `https://www.tiktok.com/@user/video/<id>`. Sound: `https://www.tiktok.com/music/<id>`.",
    geo=[("Creator in LA, CA","Pins TikTok profile link in every bio."),
         ("DTC brand in Austin, TX","Cross-promotes campaign videos from email."),
         ("Music label in Nashville, TN","Drops sound IDs into press kits."),
         ("Restaurant in Miami, FL","Embeds viral menu videos on the site.")],
    faqs=[("Does TikTok open in app?","Yes if installed; otherwise the link opens the mobile web preview."),
          ("Can I track clicks?","Wrap the URL with a UTM-tagged short link."),
          ("Why use @user/video/ID?","TikTok accepts a placeholder @user and resolves the canonical handle from the video ID."),
          ("Are sound links permanent?","Yes — TikTok's music IDs are stable until a sound is taken down."),
          ("Will this work for private accounts?","The URL opens, but content stays gated to approved followers.")],
    steps=["Pick profile, video, or sound.","Paste the handle or ID.","Copy the URL.","Use it in bios, ads or QR codes."],
    related=["instagram-link-generator","twitter-share-link-generator","short-link-generator","qr-code-link-generator"])

add(slug="twitter-share-link-generator", name="Twitter / X Share Link Generator", h1="Twitter / X Share Link Generator",
    intro="Build a Twitter (X) intent URL that pre-fills tweet text, a shared URL and hashtags.",
    fields=[{"name":"text","label":"Tweet text","type":"text","placeholder":"Check this out"},
            {"name":"u","label":"URL to share (optional)","type":"url","placeholder":"https://example.com"},
            {"name":"hashtags","label":"Hashtags (comma-separated, optional)","type":"text","placeholder":"webdev,seo"}],
    build="const q=new URLSearchParams(); if(v.text) q.set('text',v.text); if(v.u) q.set('url',v.u); if(v.hashtags) q.set('hashtags',String(v.hashtags).replace(/[#\\s]/g,'')); const s=q.toString(); return s ? `https://twitter.com/intent/tweet?${s}` : '';",
    aeoQ="How do I create a Tweet intent link?",
    aeoA="Use `https://twitter.com/intent/tweet?text=...&url=...&hashtags=...`. The query params pre-fill the composer on both twitter.com and x.com.",
    geo=[("Indie hacker in Austin, TX","Adds Share-on-X buttons to launch pages."),
         ("Author in Brooklyn, NY","Embeds tweet templates in blog posts."),
         ("Nonprofit in DC","Lets supporters tweet pre-written advocacy messages."),
         ("Conference in San Francisco, CA","Provides speaker-share tweet URLs.")],
    faqs=[("Does this work on x.com?","Yes — intent URLs work on both twitter.com and x.com."),
          ("Why no `via` parameter?","X removed the `via` attribution from intents in 2023."),
          ("Can I prefill an image?","No — intents don't accept image params. The image is taken from OG tags."),
          ("Will hashtags render?","Yes — comma-separated `hashtags=` are added without `#`."),
          ("Is this rate-limited?","No — intent URLs are static; no API call.")],
    steps=["Type the tweet text.","Optionally add a URL and hashtags.","Copy the intent URL.","Paste into Share-on-X buttons."],
    related=["facebook-share-link-generator","linkedin-link-generator","reddit-share-link-generator","short-link-generator"])

add(slug="reddit-share-link-generator", name="Reddit Share Link Generator", h1="Reddit Submit & Share Link Generator",
    intro="Build a `reddit.com/submit` URL pre-filled with a title and link, ready to post to any subreddit.",
    fields=[{"name":"u","label":"URL to share","type":"url","placeholder":"https://example.com/article"},
            {"name":"title","label":"Post title","type":"text","placeholder":"My new article"},
            {"name":"sub","label":"Subreddit (optional)","type":"text","placeholder":"webdev"}],
    build="if(!v.u && !v.title) return ''; const base=v.sub ? `https://www.reddit.com/r/${String(v.sub).replace(/^r\\//,'')}/submit` : 'https://www.reddit.com/submit'; const q=new URLSearchParams(); if(v.u) q.set('url',v.u); if(v.title) q.set('title',v.title); return `${base}?${q.toString()}`;",
    aeoQ="How do I create a Reddit submit link?",
    aeoA="Use `https://www.reddit.com/submit?url=...&title=...` (or `/r/<sub>/submit?...` to pre-select a subreddit).",
    geo=[("Indie maker in Seattle, WA","Posts launches to /r/SideProject with one click."),
         ("Game studio in Austin, TX","Lets fans cross-post patch notes."),
         ("Researcher in Boston, MA","Promotes papers to /r/science."),
         ("News site in NYC","Adds Share-on-Reddit buttons.")],
    faqs=[("Does the user have to be signed in?","Yes — Reddit prompts login before submission."),
          ("Can I prefill the post body?","Use `text=` for self-posts (omit `url=`)."),
          ("How do I pre-pick a subreddit?","Replace `/submit` with `/r/<sub>/submit`."),
          ("Will the user be able to edit before posting?","Yes — the composer opens with values pre-filled."),
          ("Can I link to old.reddit?","Yes — swap the host to `old.reddit.com`.")],
    steps=["Paste the URL and a title.","Optionally specify a subreddit.","Copy the submit URL.","Add it to Share buttons."],
    related=["facebook-share-link-generator","twitter-share-link-generator","linkedin-link-generator","short-link-generator"])

add(slug="pinterest-share-link-generator", name="Pinterest Share Link Generator", h1="Pinterest Pin-It Share Link Generator",
    intro="Build a `pinterest.com/pin/create` URL that opens the Pin-It dialog with your image, source URL and description ready to go.",
    fields=[{"name":"media","label":"Image URL","type":"url","placeholder":"https://example.com/image.jpg"},
            {"name":"u","label":"Source page URL","type":"url","placeholder":"https://example.com/page"},
            {"name":"desc","label":"Description","type":"text","placeholder":"Caption for the Pin"}],
    build="if(!v.media) return ''; const q=new URLSearchParams({media:v.media}); if(v.u) q.set('url',v.u); if(v.desc) q.set('description',v.desc); return `https://www.pinterest.com/pin/create/button/?${q.toString()}`;",
    aeoQ="How do I create a Pinterest share link?",
    aeoA="Use `https://www.pinterest.com/pin/create/button/?media=<image>&url=<page>&description=<text>`.",
    geo=[("Blogger in Charlotte, NC","Adds Pin-It buttons to every recipe."),
         ("Etsy seller in Portland, OR","Promotes listings to Pinterest with one click."),
         ("Interior designer in Dallas, TX","Pins portfolio shots from the website."),
         ("Wedding planner in Charleston, SC","Shares inspiration boards.")],
    faqs=[("Does Pinterest need the image to be publicly hosted?","Yes — the `media` URL must be reachable."),
          ("Can I prefill a board?","No — users pick the board in the dialog."),
          ("Will the URL work for video Pins?","Use the image-only Pin-It URL; video Pins require the API."),
          ("Why is the description blank?","Pinterest may strip it; rich snippets work better via `og:description`."),
          ("Is there a rich Pin requirement?","Rich Pins read schema.org markup from your page.")],
    steps=["Paste the image URL.","Add the page URL and description.","Copy the Pin-It URL.","Wire to your share buttons."],
    related=["facebook-share-link-generator","instagram-link-generator","twitter-share-link-generator","short-link-generator"])

add(slug="sms-link-generator", name="SMS Link Generator", h1="SMS Click-to-Text Link Generator",
    intro="Build an `sms:` link with a phone number and pre-filled message that opens the user's default SMS app.",
    fields=[{"name":"phone","label":"Phone (E.164)","type":"text","placeholder":"+15555550123"},
            {"name":"body","label":"Pre-filled message","type":"textarea","placeholder":"Hi, I'd like to know more"}],
    build="if(!v.phone) return ''; const p=String(v.phone).replace(/[^+0-9]/g,''); const b=v.body?`?&body=${encodeURIComponent(v.body)}`:''; return `sms:${p}${b}`;",
    aeoQ="What is an sms: link?",
    aeoA="`sms:<phone>?&body=<text>` opens the device's SMS composer with the number and message ready. Use E.164 phone format (`+1` for the US).",
    geo=[("Plumber in Houston, TX","Adds 'Text us' to Google Business listing."),
         ("Restaurant in NYC","Lets diners text for reservations."),
         ("Tutor in Boston, MA","Allows parents to SMS with one tap."),
         ("Salon in Phoenix, AZ","Sends appointment confirmations.")],
    faqs=[("Will it work on desktop?","Most modern desktops (iMessage on macOS, Phone Link on Windows) handle sms:."),
          ("Why `?&body=`?","iOS requires the `?&` quirk to keep the body param after the phone number."),
          ("Can I omit the phone?","Yes — `sms:?&body=text` opens a blank composer with prefilled text."),
          ("Does Android need a different format?","No — Android accepts the same syntax."),
          ("Carrier blocks the SMS?","sms: just opens the composer; sending depends on the user's plan.")],
    steps=["Type the phone in E.164 form.","Add the message body.","Copy the sms: link.","Place it on Contact buttons or QR codes."],
    related=["whatsapp-link-generator","mailto-link-generator","facetime-link-generator","qr-code-link-generator"])

add(slug="facetime-link-generator", name="FaceTime Link Generator", h1="FaceTime Click-to-Call Link Generator",
    intro="Build a `facetime:` URI from a phone or email so taps launch a FaceTime audio or video call.",
    fields=[{"name":"kind","label":"Call type","type":"select","options":[{"value":"facetime","label":"Video"},{"value":"facetime-audio","label":"Audio"}]},
            {"name":"id","label":"Phone or email","type":"text","placeholder":"+15555550123 or you@apple.com"}],
    build="if(!v.id) return ''; const id=String(v.id).trim(); return `${v.kind||'facetime'}:${id}`;",
    aeoQ="How do I create a FaceTime link?",
    aeoA="Use `facetime:<phone-or-email>` for video, or `facetime-audio:<id>` for audio. For shareable web links, generate one inside the FaceTime app on iOS/macOS (facetime.apple.com).",
    geo=[("Realtor in Miami, FL","Adds tap-to-FaceTime for property tours."),
         ("Consultant in San Francisco, CA","Lets clients FaceTime from contact page."),
         ("Teacher in Boston, MA","Sets up office hours via FaceTime."),
         ("Doctor in Seattle, WA","Offers tele-visits via FaceTime audio.")],
    faqs=[("Does FaceTime work on Android?","Only via shareable links generated inside the FaceTime app, not the facetime: URI."),
          ("Will Safari prompt before calling?","Yes — Apple shows a confirmation."),
          ("Can I use this on Windows?","No — facetime: only resolves on Apple devices."),
          ("How do I make a shareable link?","Open FaceTime → Create Link, then share that facetime.apple.com URL."),
          ("Difference between video and audio URIs?","`facetime:` is video; `facetime-audio:` is audio.")],
    steps=["Pick video or audio.","Enter phone or Apple ID email.","Copy the link.","Add to mailto signatures or website CTAs."],
    related=["sms-link-generator","whatsapp-link-generator","zoom-meeting-link-generator","google-meet-link-generator"])

add(slug="spotify-link-generator", name="Spotify Link Generator", h1="Spotify Track, Album, Playlist & Artist Link Generator",
    intro="Build canonical open.spotify.com URLs from a Spotify URI or ID for tracks, albums, playlists and artists.",
    fields=[{"name":"kind","label":"Type","type":"select","options":[
        {"value":"track","label":"Track"},{"value":"album","label":"Album"},{"value":"playlist","label":"Playlist"},{"value":"artist","label":"Artist"}]},
        {"name":"id","label":"Spotify ID or URI","type":"text","placeholder":"3n3Ppam7vgaVa1iaRUc9Lp or spotify:track:..."}],
    build="if(!v.id) return ''; const id=String(v.id).trim().split(':').pop(); return `https://open.spotify.com/${v.kind||'track'}/${id}`;",
    aeoQ="How do I get a shareable Spotify link?",
    aeoA="Use `https://open.spotify.com/<type>/<id>` where type is `track`, `album`, `playlist` or `artist`. The Spotify app exposes the ID via Share → Copy link.",
    geo=[("Band in Nashville, TN","Adds a Spotify track link to email signatures."),
         ("Podcaster in Brooklyn, NY","Pins a Spotify show link in episode notes."),
         ("Music marketer in LA, CA","Builds release-day playlist URLs."),
         ("Bar in Austin, TX","Cross-promotes the venue's playlist via QR code.")],
    faqs=[("Does open.spotify.com require a Spotify app?","No — it opens a web player and offers an app deep link."),
          ("How do I get a track ID?","Right-click → Share → Copy Spotify URI, then take the part after `spotify:track:`."),
          ("Will the link play full songs?","Free users hear previews; Premium users hear full audio."),
          ("Can I link to a specific timestamp?","Spotify ignores `?t=` for tracks; supported for podcast episodes."),
          ("Is there an Apple Music equivalent?","Yes — use our Apple Music link generator or copy the music.apple.com URL.")],
    steps=["Pick type (track, album, playlist, artist).","Paste the Spotify ID or URI.","Copy the open.spotify.com URL.","Add to bios, posts or QR codes."],
    related=["app-store-link-generator","play-store-link-generator","short-link-generator","qr-code-link-generator"])

add(slug="app-store-link-generator", name="App Store Link Generator", h1="Apple App Store Link Generator",
    intro="Build canonical apps.apple.com URLs from an app ID, with optional country and affiliate-token parameters.",
    fields=[{"name":"id","label":"App ID","type":"text","placeholder":"id1234567890 or 1234567890"},
            {"name":"country","label":"Country code","type":"text","placeholder":"us","default":"us"},
            {"name":"name","label":"Slug (optional)","type":"text","placeholder":"my-app"}],
    build="if(!v.id) return ''; const id=String(v.id).replace(/^id/,''); const c=(v.country||'us').toLowerCase(); const n=v.name?String(v.name).toLowerCase().replace(/[^a-z0-9]+/g,'-'):'app'; return `https://apps.apple.com/${c}/app/${n}/id${id}`;",
    aeoQ="What's the canonical Apple App Store URL format?",
    aeoA="`https://apps.apple.com/<country>/app/<slug>/id<numeric-id>`. Apple resolves any slug to the canonical app as long as the numeric ID is correct.",
    geo=[("App studio in San Francisco, CA","Generates locale-specific links for global launches."),
         ("Marketing team in NYC","Builds affiliate App Store URLs."),
         ("YouTuber in LA, CA","Adds App Store links to video descriptions."),
         ("Startup in Austin, TX","Shares iOS links in press kits.")],
    faqs=[("How do I find the App ID?","Open App Store Connect or the App Store URL — the `id` is the trailing number."),
          ("Why include a country?","Apple shows the right metadata, pricing and availability for that region."),
          ("What about Smart App Banners?","Use `<meta name=\"apple-itunes-app\" content=\"app-id=...\">` on your site."),
          ("Is the slug required?","No — the numeric ID is enough; Apple redirects."),
          ("Can I add an affiliate token?","Yes — append `?at=<token>&ct=<campaign>` if you're an Apple affiliate.")],
    steps=["Paste the App ID.","Set the country code (defaults to US).","Optionally add the app's slug.","Copy the apps.apple.com link."],
    related=["play-store-link-generator","deep-link-generator","short-link-generator","qr-code-link-generator"])

add(slug="play-store-link-generator", name="Google Play Store Link Generator", h1="Google Play Store Link Generator",
    intro="Build canonical play.google.com URLs from an Android package name, with optional referrer for install attribution.",
    fields=[{"name":"pkg","label":"Package name","type":"text","placeholder":"com.example.app"},
            {"name":"referrer","label":"Install referrer (optional)","type":"text","placeholder":"utm_source=site"}],
    build="if(!v.pkg) return ''; const ref=v.referrer?`&referrer=${encodeURIComponent(v.referrer)}`:''; return `https://play.google.com/store/apps/details?id=${v.pkg}${ref}`;",
    aeoQ="What's the Google Play Store URL format?",
    aeoA="`https://play.google.com/store/apps/details?id=<package>` — optionally append `&referrer=<utm>` for Play Install Referrer attribution.",
    geo=[("Indie Android dev in Austin, TX","Tags Play links with UTM referrers for campaigns."),
         ("Game publisher in Seattle, WA","Generates regional Play Store URLs."),
         ("Marketing agency in NYC","Builds Play Install Referrer URLs for clients."),
         ("Startup in San Francisco, CA","Adds Play badges to landing pages.")],
    faqs=[("How do I find the package name?","It's the `id` shown in the Play Store URL of a published app."),
          ("What is the install referrer?","A string Google Play forwards to your app for attribution."),
          ("Can I link to a region?","Append `&hl=<lang>&gl=<country>` for locale and country."),
          ("Will the link open the Play app?","Yes — Android intent handlers route play.google.com URLs."),
          ("Is there a deep-link alternative?","Use `market://details?id=<package>` for in-device app links.")],
    steps=["Paste the package name.","Optionally add an install referrer string.","Copy the Play Store URL.","Use in ads, landing pages or QR codes."],
    related=["app-store-link-generator","deep-link-generator","short-link-generator","qr-code-link-generator"])

add(slug="deep-link-generator", name="Deep Link Generator", h1="App Deep Link & Custom URL Scheme Generator",
    intro="Assemble a custom-scheme deep link (`yourapp://path?key=value`) for mobile, desktop and web app handlers.",
    fields=[{"name":"scheme","label":"URL scheme","type":"text","placeholder":"yourapp"},
            {"name":"path","label":"Path","type":"text","placeholder":"product/123"},
            {"name":"q","label":"Query params (key=value per line)","type":"textarea","placeholder":"ref=email\\ncampaign=spring"}],
    build="if(!v.scheme) return ''; const params=(v.q||'').split(/\\r?\\n/).filter(Boolean).map(l=>{const [k,...r]=l.split('='); return `${encodeURIComponent(k.trim())}=${encodeURIComponent(r.join('=').trim())}`;}).join('&'); const qs=params?`?${params}`:''; return `${v.scheme}://${(v.path||'').replace(/^\\/+/,'')}${qs}`;",
    aeoQ="What is a deep link?",
    aeoA="A deep link is a URL using your app's custom URL scheme (`myapp://path?param=value`) that opens a specific screen instead of the app's home. Combine with Universal Links / App Links for HTTPS fallback.",
    geo=[("Mobile dev in Austin, TX","Tests in-app navigation from external triggers."),
         ("Growth team in SF, CA","Builds deep links for push-notification campaigns."),
         ("QA engineer in NYC","Scripts repeatable deep-link smoke tests."),
         ("Affiliate marketer in LA, CA","Routes ad clicks straight to in-app product pages.")],
    faqs=[("Will deep links open without the app?","No — pair with Universal Links (iOS) or App Links (Android) so the web URL falls back if the app is absent."),
          ("Do iOS apps register schemes?","Yes — declare `CFBundleURLSchemes` in Info.plist."),
          ("Can I track deep-link clicks?","Use Branch, Adjust, AppsFlyer or your own attribution layer."),
          ("Are dashes valid in schemes?","No — schemes must match `[a-z0-9]+`."),
          ("How do I escape special characters?","URL-encode each value; our tool does it for you.")],
    steps=["Enter the URL scheme (no `://`).","Set the path and optional query params.","Copy the deep link.","Test from notes, SMS or Safari."],
    related=["app-store-link-generator","play-store-link-generator","short-link-generator","qr-code-link-generator"])

# ------------------------ TIER 4 ------------------------

add(slug="venmo-link-generator", name="Venmo Link Generator", h1="Venmo Pay & Charge Link Generator",
    intro="Build a Venmo deep link that opens the mobile app pre-filled with a recipient, amount, note and pay/charge intent.",
    fields=[{"name":"recip","label":"Recipient username","type":"text","placeholder":"yourname"},
            {"name":"amount","label":"Amount (USD)","type":"number"},
            {"name":"note","label":"Note","type":"text","placeholder":"Pizza split"},
            {"name":"action","label":"Action","type":"select","options":[{"value":"pay","label":"Pay"},{"value":"charge","label":"Charge"}]}],
    build="if(!v.recip) return ''; const q=new URLSearchParams({txn:v.action||'pay',recipients:String(v.recip).replace(/^@/,'')}); if(v.amount) q.set('amount',String(v.amount)); if(v.note) q.set('note',v.note); return `https://venmo.com/?${q.toString()}`;",
    aeoQ="How do I create a Venmo payment link?",
    aeoA="Use `https://venmo.com/?txn=pay&recipients=<user>&amount=<amount>&note=<note>` for pay, or `txn=charge` to request money. The link opens the Venmo app pre-filled.",
    geo=[("Roommate in Brooklyn, NY","Splits rent with one tap."),
         ("Photographer in Austin, TX","Charges deposits via Venmo URL."),
         ("Tutor in Boston, MA","Requests session fees via SMS link."),
         ("Bartender in Nashville, TN","Posts a Venmo tip QR.")],
    faqs=[("Does Venmo work outside the US?","No — US-only as of 2026."),
          ("Will it open in browser if no app?","Yes — venmo.com renders a fallback page."),
          ("Can I add an emoji to the note?","Yes — emojis encode correctly through URLSearchParams."),
          ("What's the difference between pay and charge?","`pay` sends; `charge` requests."),
          ("Are fees deducted?","Personal Venmo transfers are free; business profiles incur a fee.")],
    steps=["Enter your Venmo username.","Set amount and note.","Pick pay or charge.","Copy the link or convert to a QR."],
    related=["cashapp-link-generator","paypal-me-link-generator","payment-link-generator","qr-code-link-generator"])

add(slug="cashapp-link-generator", name="Cash App Link Generator", h1="Cash App $Cashtag Pay Link Generator",
    intro="Generate a `cash.app/$cashtag` payment link with an optional pre-filled amount in USD.",
    fields=[{"name":"tag","label":"$Cashtag","type":"text","placeholder":"$yourname"},
            {"name":"amount","label":"Amount (optional)","type":"number"}],
    build="if(!v.tag) return ''; const t=String(v.tag).replace(/^\\$/,''); return v.amount ? `https://cash.app/$${t}/${v.amount}` : `https://cash.app/$${t}`;",
    aeoQ="How do I share a Cash App link?",
    aeoA="`https://cash.app/$<cashtag>` opens your pay screen. Append `/<amount>` to prefill: `https://cash.app/$alex/25`.",
    geo=[("Vendor at flea market in Austin, TX","Posts Cash App QR for sales."),
         ("Stylist in Atlanta, GA","Charges deposits via Cash App link."),
         ("Streamer in LA, CA","Adds Cash App tip URL to overlay."),
         ("Friend splitting bill in NYC","Sends pay link in SMS.")],
    faqs=[("Do I need a Cash App account?","Yes — to receive payments you need a verified Cashtag."),
          ("Can the user change the amount?","Yes — the prefilled amount is editable."),
          ("Is there an international version?","Cash App is US + UK only as of 2026."),
          ("Will fees apply?","Personal transfers free; business profiles charge a percentage."),
          ("How do I QR-code my link?","Pair with our QR code generator.")],
    steps=["Type your $Cashtag.","Add an optional amount.","Copy the link.","Share via SMS, QR or bio.")],
    related=["venmo-link-generator","paypal-me-link-generator","payment-link-generator","qr-code-link-generator"])

add(slug="calendly-link-generator", name="Calendly Link Generator", h1="Calendly Booking & Embed Link Generator",
    intro="Build a calendly.com/<handle>/<event> URL with optional UTM parameters for booking-flow attribution.",
    fields=[{"name":"handle","label":"Calendly handle","type":"text","placeholder":"yourname"},
            {"name":"event","label":"Event slug","type":"text","placeholder":"30min"},
            {"name":"utm","label":"UTM source (optional)","type":"text","placeholder":"newsletter"}],
    build="if(!v.handle) return ''; const h=String(v.handle).replace(/^@/,''); const e=v.event?`/${v.event}`:''; const u=v.utm?`?utm_source=${encodeURIComponent(v.utm)}`:''; return `https://calendly.com/${h}${e}${u}`;",
    aeoQ="What's the Calendly URL format?",
    aeoA="`https://calendly.com/<handle>/<event-slug>` — append UTMs for attribution: `?utm_source=...&utm_campaign=...`.",
    geo=[("Coach in Denver, CO","Embeds a Calendly link in welcome emails."),
         ("Sales rep in Austin, TX","Tracks bookings by UTM source."),
         ("Recruiter in NYC","Shares interview slots via Calendly URL."),
         ("Consultant in San Francisco, CA","Adds Calendly to LinkedIn bio.")],
    faqs=[("Do clients need a Calendly account?","No — bookers can use any email."),
          ("Can I prefill the booker's name and email?","Yes — append `?name=...&email=...`."),
          ("Will UTM params propagate to my CRM?","Yes if Calendly + CRM integration is enabled."),
          ("How do I embed instead of link?","Use Calendly's embed snippet."),
          ("What's the difference between event types?","Each `event-slug` is a separate Calendly meeting template.")],
    steps=["Enter your Calendly handle.","Add the event slug.","Optionally tag with a UTM source.","Copy the URL."],
    related=["add-to-calendar-link-generator","mailto-link-generator","utm-link-generator","short-link-generator"])

add(slug="tinyurl-link-generator", name="TinyURL Link Generator", h1="TinyURL Short Link Generator (Free, No Signup)",
    intro="Shorten any URL to a tinyurl.com alias using the free public TinyURL API. Optional custom alias supported.",
    fields=[{"name":"u","label":"Long URL","type":"url","placeholder":"https://example.com/very/long/path"},
            {"name":"alias","label":"Custom alias (optional)","type":"text","placeholder":"my-link"}],
    build="if(!v.u) return ''; const a=v.alias?`&alias=${encodeURIComponent(v.alias)}`:''; const api=`https://tinyurl.com/api-create.php?url=${encodeURIComponent(String(v.u).trim())}${a}`; return fetch(api).then(r=>r.text()).catch(()=>'API blocked by CORS — open the API URL directly: '+api);",
    aeoQ="How do I shorten a URL with TinyURL for free?",
    aeoA="Call `https://tinyurl.com/api-create.php?url=<URL>&alias=<optional>` — TinyURL returns a `tinyurl.com/...` short link instantly without signup.",
    geo=[("Marketer in NYC","Generates campaign-specific tinyurl aliases."),
         ("Teacher in Phoenix, AZ","Shortens worksheet URLs for class handouts."),
         ("Podcaster in Brooklyn, NY","Shares episode links in voice intros."),
         ("Realtor in Miami, FL","Adds custom tinyurl aliases to yard signs.")],
    faqs=[("Is TinyURL free?","Yes — no signup, no expiry on free links."),
          ("Are aliases unique?","Yes — TinyURL rejects duplicates."),
          ("Can browsers block the call?","Yes — CORS may block direct fetch; open the API URL in a new tab as a fallback."),
          ("Will links expire?","No — TinyURL keeps them indefinitely."),
          ("Is there a paid plan?","Yes — TinyURL Pro adds analytics and branded domains.")],
    steps=["Paste a long URL.","Optionally pick a custom alias.","Click Generate to fetch the TinyURL.","Share the alias anywhere."],
    related=["short-link-generator","bitly-style","qr-code-link-generator","utm-link-generator"])

add(slug="gmail-compose-link-generator", name="Gmail Compose Link Generator", h1="Gmail Compose URL Generator",
    intro="Build a Gmail-specific compose URL (`mail.google.com/mail/?view=cm`) that opens a new tab pre-filled with To, CC, BCC, subject and body.",
    fields=[{"name":"to","label":"To","type":"text","placeholder":"alex@example.com"},
            {"name":"cc","label":"CC (optional)","type":"text"},
            {"name":"bcc","label":"BCC (optional)","type":"text"},
            {"name":"subject","label":"Subject","type":"text","placeholder":"Quick question"},
            {"name":"body","label":"Body","type":"textarea","placeholder":"Hi Alex"}],
    build="const q=new URLSearchParams({view:'cm',fs:'1'}); if(v.to) q.set('to',v.to); if(v.cc) q.set('cc',v.cc); if(v.bcc) q.set('bcc',v.bcc); if(v.subject) q.set('su',v.subject); if(v.body) q.set('body',v.body); return `https://mail.google.com/mail/?${q.toString()}`;",
    aeoQ="How do I create a Gmail compose link?",
    aeoA="Use `https://mail.google.com/mail/?view=cm&fs=1&to=...&su=...&body=...`. It opens Gmail's compose window in a new tab pre-filled with everything you pass.",
    geo=[("Support team in Austin, TX","Pre-fills Gmail composer for canned responses."),
         ("Sales rep in NYC","Builds Gmail templates for prospect outreach."),
         ("Recruiter in SF, CA","Sends pre-filled Gmail intros to candidates."),
         ("Help desk in Chicago, IL","Wraps Gmail compose URLs in support widgets.")],
    faqs=[("Does this require the user to be in Gmail?","Yes — the URL opens Gmail's web composer. Use mailto: as a universal fallback."),
          ("Why `view=cm`?","It tells Gmail to open the compose view."),
          ("Can I attach files?","No — attachments aren't supported via URL."),
          ("Will it open in the Gmail mobile app?","On Android with Gmail set as default, yes."),
          ("How does this differ from mailto:?","mailto: opens the user's default mail client; this targets Gmail specifically.")],
    steps=["Fill To, optional CC/BCC.","Add a subject and body.","Copy the Gmail composer URL.","Use in support widgets or email signatures."],
    related=["mailto-link-generator","outlook-compose-link-generator","short-link-generator","unsubscribe-link-generator"])

add(slug="unsubscribe-link-generator", name="Unsubscribe Link Generator", h1="One-Click Unsubscribe Link & Header Generator",
    intro="Build a List-Unsubscribe-compliant unsubscribe link plus a `mailto:` fallback so Gmail and Yahoo show the one-click button.",
    fields=[{"name":"u","label":"Unsubscribe URL","type":"url","placeholder":"https://example.com/unsubscribe?id=USER"},
            {"name":"email","label":"Unsubscribe mailbox","type":"text","placeholder":"unsubscribe@example.com"}],
    build="if(!v.u && !v.email) return ''; const parts=[]; if(v.u) parts.push(`<${v.u}>`); if(v.email) parts.push(`<mailto:${v.email}?subject=unsubscribe>`); return `List-Unsubscribe: ${parts.join(', ')}\\nList-Unsubscribe-Post: List-Unsubscribe=One-Click`;",
    aeoQ="How does the Gmail one-click unsubscribe button work?",
    aeoA="Add two email headers: `List-Unsubscribe: <https://...>, <mailto:...>` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click`. Gmail and Yahoo then show a native unsubscribe button.",
    geo=[("ESP customer in Austin, TX","Adds RFC-compliant unsubscribe headers to campaigns."),
         ("Newsletter in Brooklyn, NY","Improves deliverability with one-click unsubscribe."),
         ("Marketing ops in NYC","Avoids spam complaints by exposing unsubscribe headers."),
         ("Saas company in SF, CA","Ships compliant transactional emails.")],
    faqs=[("Is one-click unsubscribe required?","Gmail and Yahoo require it for bulk senders since Feb 2024."),
          ("Can I use only a URL?","Yes, but pairing with mailto: improves compatibility."),
          ("What does One-Click mean?","Senders must process the unsubscribe POST without further user action."),
          ("Will this hurt my list size?","Short-term yes; long-term it improves sender reputation and inbox placement."),
          ("Does it work with SES/Sendgrid/Mailgun?","Yes — all major ESPs let you set the List-Unsubscribe headers.")],
    steps=["Add your unsubscribe URL and mailbox.","Copy the generated headers.","Paste into your ESP's header config.","Send a test and check Gmail shows the button."],
    related=["mailto-link-generator","gmail-compose-link-generator","short-link-generator","utm-link-generator"])

# ---- Fix the cashapp build steps trailing parenthesis typo ----
for s in NEW:
    if s["slug"] == "cashapp-link-generator":
        s["steps"] = ["Type your $Cashtag.","Add an optional amount.","Copy the link.","Share via SMS, QR or bio."]

# ------------------------ Patch related links for any non-existent slug ----
# tinyurl-link-generator referenced 'bitly-style' which doesn't exist — point to short-link-generator instead.
for s in NEW:
    s["related"] = [r if r != "bitly-style" else "short-link-generator" for r in s["related"]]

# ------------------------ Tool metadata for ToolLayout TOOLS array ----
TOOL_META = {
    "tiktok-link-generator": ("TikTok Link Generator","TikTok","🎶","Profile, video & sound TikTok URLs.","from-rose-500 to-pink-600"),
    "twitter-share-link-generator": ("Twitter / X Share Link Generator","X Share","𝕏","Pre-filled tweet intent URL builder.","from-zinc-800 to-zinc-950"),
    "reddit-share-link-generator": ("Reddit Share Link Generator","Reddit Share","👽","reddit.com/submit pre-fill links.","from-orange-500 to-red-600"),
    "pinterest-share-link-generator": ("Pinterest Share Link Generator","Pin-It","📌","Pinterest Pin-It share URLs.","from-red-500 to-rose-700"),
    "sms-link-generator": ("SMS Link Generator","SMS Link","💬","sms: click-to-text deep links.","from-emerald-400 to-teal-600"),
    "facetime-link-generator": ("FaceTime Link Generator","FaceTime","📞","facetime: video & audio call links.","from-green-400 to-emerald-600"),
    "spotify-link-generator": ("Spotify Link Generator","Spotify","🎧","Track, album, playlist & artist URLs.","from-green-500 to-emerald-700"),
    "app-store-link-generator": ("Apple App Store Link Generator","App Store","🍎","apps.apple.com canonical URLs.","from-slate-800 to-zinc-950"),
    "play-store-link-generator": ("Google Play Store Link Generator","Play Store","▶","Play Store install URLs with referrer.","from-emerald-500 to-green-700"),
    "deep-link-generator": ("Deep Link Generator","Deep Link","🔗","Custom-scheme app deep links.","from-violet-500 to-indigo-700"),
    "venmo-link-generator": ("Venmo Link Generator","Venmo","💸","Venmo pay & charge deep links.","from-sky-400 to-blue-600"),
    "cashapp-link-generator": ("Cash App Link Generator","Cash App","💵","$Cashtag pay URLs.","from-green-500 to-lime-600"),
    "calendly-link-generator": ("Calendly Link Generator","Calendly","📆","Booking URLs with UTM attribution.","from-blue-500 to-indigo-600"),
    "tinyurl-link-generator": ("TinyURL Link Generator","TinyURL","🔗","Free TinyURL shortening API.","from-cyan-500 to-sky-700"),
    "gmail-compose-link-generator": ("Gmail Compose Link Generator","Gmail Compose","📧","Gmail composer pre-fill URLs.","from-red-500 to-rose-600"),
    "unsubscribe-link-generator": ("Unsubscribe Link Generator","Unsubscribe","✋","RFC List-Unsubscribe header builder.","from-zinc-500 to-slate-700"),
}

MENU_GROUP = {  # which group each slug belongs to
    "tiktok-link-generator": "Social & Messaging",
    "twitter-share-link-generator": "Social & Messaging",
    "reddit-share-link-generator": "Social & Messaging",
    "pinterest-share-link-generator": "Social & Messaging",
    "sms-link-generator": "Social & Messaging",
    "facetime-link-generator": "Meetings & Payments",
    "spotify-link-generator": "Files & Downloads",
    "app-store-link-generator": "Marketing & Tracking",
    "play-store-link-generator": "Marketing & Tracking",
    "deep-link-generator": "Marketing & Tracking",
    "venmo-link-generator": "Meetings & Payments",
    "cashapp-link-generator": "Meetings & Payments",
    "calendly-link-generator": "Meetings & Payments",
    "tinyurl-link-generator": "Marketing & Tracking",
    "gmail-compose-link-generator": "Social & Messaging",
    "unsubscribe-link-generator": "Social & Messaging",
}

# ------------------------ SEO keywords ----
SEO_NEW = {
    "tiktok-link-generator": ("tiktok link generator", ["tiktok link generator","tiktok video link generator","tiktok share link generator","tiktok profile link","custom tiktok link"]),
    "twitter-share-link-generator": ("twitter share link generator", ["twitter share link generator","twitter intent link","x share link generator","tweet intent url","share on x link"]),
    "reddit-share-link-generator": ("reddit share link generator", ["reddit share link generator","reddit submit link","share on reddit url","subreddit share link","reddit post link generator"]),
    "pinterest-share-link-generator": ("pinterest share link generator", ["pinterest share link generator","pin it link generator","pinterest pin link","share on pinterest url","pin button link"]),
    "sms-link-generator": ("sms link generator", ["sms link generator","click to text link","sms:// link generator","text message link","sms link with body"]),
    "facetime-link-generator": ("facetime link generator", ["facetime link generator","facetime: link","facetime audio link","facetime web link","apple facetime url"]),
    "spotify-link-generator": ("spotify link generator", ["spotify link generator","spotify track link","spotify share link","open spotify url","custom spotify link"]),
    "app-store-link-generator": ("app store link generator", ["app store link generator","apple app store link","apps.apple.com link generator","ios app link generator","app store url generator"]),
    "play-store-link-generator": ("google play store link generator", ["google play store link generator","play store link","android app link generator","play store referrer link","custom play store url"]),
    "deep-link-generator": ("deep link generator", ["deep link generator","app deep link","custom url scheme generator","mobile deep link","universal link generator"]),
    "venmo-link-generator": ("venmo link generator", ["venmo link generator","venmo payment link","venmo pay link","venmo charge link","venmo deep link"]),
    "cashapp-link-generator": ("cash app link generator", ["cash app link generator","cashapp link generator","$cashtag link","cash.app pay url","cash app payment link"]),
    "calendly-link-generator": ("calendly link generator", ["calendly link generator","calendly booking link","calendly with utm","calendly embed link","custom calendly url"]),
    "tinyurl-link-generator": ("tinyurl link generator", ["tinyurl link generator","tinyurl alias","free tinyurl shortener","tinyurl api","short link generator"]),
    "gmail-compose-link-generator": ("gmail compose link generator", ["gmail compose link generator","gmail link generator","mail.google.com compose url","gmail prefilled link","compose gmail url"]),
    "unsubscribe-link-generator": ("unsubscribe link generator", ["unsubscribe link generator","list-unsubscribe header","one-click unsubscribe","email unsubscribe link","gmail unsubscribe button"]),
}

# ------------------------ Write route files ----
for spec in NEW:
    p = ROUTES / f"{spec['slug']}.tsx"
    p.write_text(bt.render(spec))
    print("wrote", p.name)

# ------------------------ Append to seo-keywords.ts ----
sk_path = ROOT / "src" / "lib" / "seo-keywords.ts"
sk = sk_path.read_text()
insert_at = sk.rfind("};\n\nexport const ALL_PATHS")
assert insert_at > 0, "seo-keywords structure changed"
new_entries = ""
for slug, (primary, kws) in SEO_NEW.items():
    if f'"/{slug}"' in sk: continue
    new_entries += f'  "/{slug}": {{\n    path: "/{slug}",\n    primary: {json.dumps(primary)},\n    keywords: {json.dumps(kws)},\n  }},\n'
if new_entries:
    sk = sk[:insert_at] + new_entries + sk[insert_at:]
    sk_path.write_text(sk)
    print("seo-keywords.ts updated")

# ------------------------ Append to ToolLayout TOOLS array ----
tl_path = ROOT / "src" / "components" / "ToolLayout.tsx"
tl = tl_path.read_text()
tools_end = tl.find("];", tl.find("export const TOOLS"))
existing_tools = tl[:tools_end]
new_tools = ""
for slug, (label, short, icon, blurb, accent) in TOOL_META.items():
    if f'"/{slug}"' in existing_tools: continue
    new_tools += f'  {{ to: "/{slug}", label: {json.dumps(label)}, short: {json.dumps(short)}, icon: {json.dumps(icon)},\n    blurb: {json.dumps(blurb)}, accent: {json.dumps(accent)} }},\n'
if new_tools:
    tl = tl[:tools_end] + new_tools + tl[tools_end:]

# Patch MENU_GROUPS by appending slug to each group's filter list
for slug, group_title in MENU_GROUP.items():
    if f'"/{slug}"' in tl[tl.find("MENU_GROUPS"):]:
        continue
    # Find the line with the group's title and the filter list right after
    pattern = re.compile(r'(title: "' + re.escape(group_title) + r'",\s*\n\s*tools: TOOLS\.filter\(\(t\) => \[)([^\]]*?)(\]\.includes)')
    def repl(m):
        existing = m.group(2).strip()
        added = f'"/{slug}"'
        sep = "," if existing else ""
        return m.group(1) + existing + sep + added + m.group(3)
    tl, n = pattern.subn(repl, tl, count=1)
    if n == 0:
        print(f"warning: could not place {slug} into group {group_title}")

tl_path.write_text(tl)
print("ToolLayout.tsx updated")

print(f"\n{len(NEW)} new tools added.")
