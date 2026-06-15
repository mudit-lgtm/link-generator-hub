#!/usr/bin/env python3
"""Generate all tool route pages with real per-tool forms + trimmed copy.
Each spec drives a <ToolForm/> with bespoke build() logic.
"""
import json, os, re, textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ROUTES = ROOT / "src" / "routes"

# ---------------- Tool specs ----------------
# fields: list of {name,label,type,...}.  Use JS-safe names (snake_case ok).
# build: JS arrow body string accepting (v) and returning a string.
# preview: "image"|"audio"|"video"|"pdf"|"qr"|None

T = []

def add(**k): T.append(k)

# ---- URL transformers ----
add(slug="google-drive-direct-link-generator", name="Google Drive Direct Link Generator", h1="Google Drive Direct Download Link Generator",
    intro="Convert any Google Drive share URL into a one-click direct download link. Paste the share URL and copy the direct link instantly.",
    fields=[{"name":"u","label":"Google Drive share URL","type":"url","placeholder":"https://drive.google.com/file/d/FILE_ID/view"}],
    build="const m=v.u && (v.u.match(/\\/d\\/([^/?]+)/)||[null,new URL(v.u).searchParams.get('id')]); const id=m && m[1]; return id ? `https://drive.google.com/uc?export=download&id=${id}` : '';",
    aeoQ="How do I make a Google Drive direct download link?",
    aeoA="Replace the share URL `https://drive.google.com/file/d/FILE_ID/view` with `https://drive.google.com/uc?export=download&id=FILE_ID`. This tool extracts the file ID and builds the direct link automatically.",
    geo=[("Online course creator in Austin, TX","Sends students one-click downloads for PDF workbooks hosted on Drive."),
         ("Realtor in Miami, FL","Embeds Drive listing photos and floor plans as direct previews in email."),
         ("Podcaster in Brooklyn, NY","Shares episode MP3s as direct downloads instead of Drive's preview screen."),
         ("Wedding photographer in Denver, CO","Delivers client gallery ZIPs with a single shareable download URL.")],
    faqs=[("Why doesn't the regular Google Drive link download directly?","Drive defaults to a preview page so it can scan files for malware. The direct URL bypasses that step for files you own and trust."),
          ("Does the file have to be public?","Yes — set sharing to ‘Anyone with the link’ in Drive, otherwise recipients hit a login wall."),
          ("Will huge files work?","Files over ~100 MB show a ‘can't scan for viruses’ confirm screen. That's a Google limit, not this tool."),
          ("Is it safe to share direct Drive links publicly?","Anyone with the URL can download. Only share files you intend to be public."),
          ("Can I use this for Google Docs or Sheets?","Use Drive's File → Download menu to grab the export URL for Docs, Sheets and Slides.")],
    steps=["Open the file in Google Drive and click Share → ‘Anyone with the link’.","Copy the share URL from the browser address bar.","Paste it above to get the direct download link.","Send the new link by email, SMS or QR code."],
    related=["short-link-generator","qr-code-link-generator","dropbox-direct-link-generator","direct-download-link-generator"])

add(slug="dropbox-direct-link-generator", name="Dropbox Direct Link Generator", h1="Dropbox Direct Download Link Generator",
    intro="Turn any Dropbox share URL into a force-download link by swapping the host and flipping the dl flag. Paste, copy, share.",
    fields=[{"name":"u","label":"Dropbox share URL","type":"url","placeholder":"https://www.dropbox.com/s/abc123/file.pdf?dl=0"}],
    build="if(!v.u) return ''; try{ const url=new URL(v.u); url.host='dl.dropboxusercontent.com'; url.searchParams.set('dl','1'); return url.toString(); }catch{return ''}",
    aeoQ="How do I force a Dropbox link to download?",
    aeoA="Change `www.dropbox.com` to `dl.dropboxusercontent.com` and append `?dl=1`. This tool does both edits at once so the file downloads instead of opening the Dropbox preview.",
    geo=[("Indie game dev in Seattle, WA","Distributes playtest builds via a stable Dropbox direct link in Discord."),
         ("Author in Nashville, TN","Sends bonus chapters as PDFs from the welcome email autoresponder."),
         ("Studio engineer in Los Angeles, CA","Delivers WAV stems to mix engineers without the preview detour."),
         ("Nonprofit in Boston, MA","Shares annual report PDFs on social with a tracked direct-download URL.")],
    faqs=[("Does the file have to be public?","Yes — the share link's audience must include ‘Anyone with the link’."),
          ("Will Dropbox block direct downloads if traffic spikes?","Free accounts get a daily bandwidth cap. High-volume distribution should host elsewhere."),
          ("What's the difference between dl=0 and dl=1?","`dl=0` opens the Dropbox preview page; `dl=1` triggers the browser download."),
          ("Can I use this with Dropbox folder links?","Folder links open the folder browser; only file URLs convert to direct downloads."),
          ("Do shortened ?st= URLs work?","Yes — Dropbox's signed URLs convert the same way.")],
    steps=["In Dropbox, click Share on the file and copy the link.","Paste the URL into the field above.","Copy the rewritten dl.dropboxusercontent.com link.","Use it in email campaigns, README files, or auto-responders."],
    related=["google-drive-direct-link-generator","direct-download-link-generator","short-link-generator","qr-code-link-generator"])

add(slug="onedrive-direct-link-generator", name="OneDrive Direct Link Generator", h1="OneDrive Direct Download Link Generator",
    intro="Convert a OneDrive share URL into a Microsoft Graph direct content URL. Paste the share link and copy a one-click download.",
    fields=[{"name":"u","label":"OneDrive share URL","type":"url","placeholder":"https://1drv.ms/b/s!Abc..."}],
    build="if(!v.u) return ''; const b64=btoa(v.u).replace(/=+$/,'').replace(/\\//g,'_').replace(/\\+/g,'-'); return `https://api.onedrive.com/v1.0/shares/u!${b64}/root/content`;",
    aeoQ="How do I get a direct download from OneDrive?",
    aeoA="Base64-encode the share URL, swap `/` for `_` and `+` for `-`, then prefix with `https://api.onedrive.com/v1.0/shares/u!` and suffix `/root/content`. The tool above does this for you.",
    geo=[("IT admin in Chicago, IL","Distributes signed installer MSIs via OneDrive direct links in Intune."),
         ("HR lead in Atlanta, GA","Delivers offer-letter PDFs straight from a OneDrive share."),
         ("Microsoft 365 consultant in Phoenix, AZ","Builds quick file-share automations in Power Automate using the direct URL pattern."),
         ("Teacher in Portland, OR","Shares lesson printables that download instantly from a class link.")],
    faqs=[("Does this work for personal and business OneDrive?","Yes — the Microsoft Graph shares endpoint accepts both consumer (1drv.ms) and SharePoint share URLs."),
          ("Is the share URL public?","Anyone with the encoded link can download. Set the underlying share's audience to match your intent."),
          ("Why does my URL still show the preview page?","Make sure you copied the raw share URL from Share → Copy link, not the page URL of an opened file."),
          ("Are there file-size limits?","OneDrive supports large files; very large downloads may stream slowly through the shares endpoint."),
          ("Can I reverse the encoded URL?","Yes — base64-decode the portion after `u!` (after restoring `_`→`/`, `-`→`+`) to recover the share URL.")],
    steps=["Right-click the file in OneDrive and choose Share → Copy link.","Paste the share URL above.","Copy the generated /root/content direct URL.","Share it in email, SMS or scripts."],
    related=["google-drive-direct-link-generator","dropbox-direct-link-generator","direct-download-link-generator","short-link-generator"])

add(slug="mega-link-generator", name="MEGA Link Generator", h1="MEGA.nz Share Link Formatter",
    intro="Validate and format MEGA.nz share links for files and folders. Paste a MEGA URL and we'll check the structure and decryption key.",
    fields=[{"name":"u","label":"MEGA.nz URL","type":"url","placeholder":"https://mega.nz/file/ABC123#decryption_key"}],
    build="if(!v.u) return ''; const m=v.u.match(/mega\\.nz\\/(file|folder)\\/([A-Za-z0-9_-]+)(?:#([A-Za-z0-9_-]+))?/); if(!m) return ''; if(!m[3]) return 'Missing decryption key (#...) — recipients cannot decrypt this share.'; return `https://mega.nz/${m[1]}/${m[2]}#${m[3]}`;",
    aeoQ="What makes a valid MEGA share link?",
    aeoA="A working MEGA link contains the type (file or folder), the share ID and a decryption key after `#`. Without the `#key` portion recipients cannot decrypt the share.",
    geo=[("VFX artist in Vancouver-adjacent Seattle, WA","Sends 50 GB render bundles to clients via MEGA folder links."),
         ("Indie label in Nashville, TN","Distributes mastered tracks to streaming aggregators through MEGA."),
         ("Researcher in Cambridge, MA","Shares datasets too large for institutional file servers."),
         ("Translator in Austin, TX","Returns large bilingual asset packs to enterprise clients.")],
    faqs=[("What is the `#` part of a MEGA link?","It's the end-to-end encryption key. MEGA never sees it; only people with the full URL can decrypt the file."),
          ("Why is my MEGA link missing a key?","You copied just the URL bar text after the page redirected. Use the official Share → Copy link option."),
          ("Can I shorten a MEGA link safely?","Most shorteners drop the URL fragment after `#`. Use a shortener that preserves fragments or share the full URL."),
          ("Are there bandwidth limits on MEGA?","Free recipients hit a quota; the uploader can use MEGA's transfer add-on or paid plans for unlimited delivery."),
          ("Is MEGA blocked anywhere?","Some networks block MEGA. Pair the share with a mirror on a second host for reliability.")],
    steps=["In MEGA, right-click the file or folder and choose Share.","Copy the link including the part after `#`.","Paste it above to verify the structure.","Share the validated URL with recipients."],
    related=["premium-link-generator","direct-download-link-generator","magnet-link-generator","short-link-generator"])

add(slug="magnet-link-generator", name="Magnet Link Generator", h1="BitTorrent Magnet Link Generator",
    intro="Assemble a magnet URI from a BitTorrent info hash, display name and tracker list. No torrent file required.",
    fields=[{"name":"hash","label":"Info hash (40-char SHA-1 or 32-char base32)","type":"text","placeholder":"e.g. c12fe1c06bba254a9dc9f519b335aa7c1367a88a"},
            {"name":"dn","label":"Display name","type":"text","placeholder":"my-release-name"},
            {"name":"tr","label":"Trackers (one per line)","type":"textarea","placeholder":"udp://tracker.opentrackr.org:1337/announce"}],
    build="if(!v.hash) return ''; const trs=(v.tr||'').split(/\\r?\\n/).filter(Boolean).map(t=>'&tr='+encodeURIComponent(t.trim())).join(''); const dn=v.dn?'&dn='+encodeURIComponent(v.dn):''; return `magnet:?xt=urn:btih:${v.hash.trim()}${dn}${trs}`;",
    aeoQ="What is a magnet link?",
    aeoA="A magnet link is a URI starting with `magnet:?xt=urn:btih:` followed by a BitTorrent info hash, optional display name (`dn=`) and tracker addresses (`tr=`). Clients use it instead of downloading a .torrent file.",
    geo=[("Linux distro mirror in Raleigh, NC","Publishes magnet URIs alongside ISO downloads for resilient delivery."),
         ("Open-data archivist in San Francisco, CA","Distributes academic dataset bundles via magnet so peers cache copies."),
         ("Game modder in Austin, TX","Ships large texture packs to community via magnet links on a forum."),
         ("Software publisher in Seattle, WA","Offers magnet downloads as a fallback when CDN traffic spikes.")],
    faqs=[("What is an info hash?","A SHA-1 (40 hex chars) or base32 (32 chars) fingerprint of the torrent's metadata. It uniquely identifies the swarm."),
          ("Are trackers required?","No — DHT and PEX can discover peers — but trackers speed up initial connection."),
          ("Can I add a web seed?","Yes, append `&ws=https://your-mirror/file` to fall back to HTTP if peers are scarce."),
          ("Is sharing a magnet legal?","Magnet URIs are just identifiers. Legality depends on the content, not the link format."),
          ("Why isn't my client connecting?","Check that the hash is correct and add at least one healthy public tracker.")],
    steps=["Paste the 40-character info hash from your torrent.","Add a display name to help your peers identify the content.","Paste public trackers, one per line.","Copy the assembled magnet URI."],
    related=["direct-download-link-generator","premium-link-generator","mega-link-generator","short-link-generator"])

# ---- File-upload tools ----
add(slug="image-link-generator", name="Image Link Generator", h1="Image Link Generator",
    intro="Upload an image and instantly get a shareable in-browser preview URL — or paste an existing URL to validate it. Perfect for quick mockups and Discord embeds.",
    fields=[{"name":"f","label":"Upload an image","type":"file","accept":"image/*"},
            {"name":"u","label":"…or paste an existing image URL","type":"url","placeholder":"https://example.com/photo.jpg"}],
    build="return (v.f) || (v.u?String(v.u).trim():'');",
    preview="image",
    aeoQ="How do I create a sharable image link?",
    aeoA="Either host the image on a service like Imgur, GitHub, Cloudinary or your own server and copy that public URL — or use the upload field above to generate a temporary in-browser preview URL for quick local sharing.",
    geo=[("Open-source maintainer in Seattle, WA","Generates README badge previews before pushing to GitHub."),
         ("Designer in Brooklyn, NY","Drops mockups into Slack and Notion as quick image links."),
         ("Email marketer in Austin, TX","Validates hero-banner URLs before sending an MJML template."),
         ("Forum moderator in Chicago, IL","Checks signature graphics render correctly on every device.")],
    faqs=[("Are uploaded images sent to a server?","No — uploads stay in your browser. The generated URL only works in the current tab."),
          ("How do I get a permanent image link?","Host the file on Imgur, Cloudinary, GitHub, S3 or your own CDN, then copy that URL."),
          ("Will the preview URL work in email?","Browser blob URLs only work in the current tab. Use a real host for email and social embeds."),
          ("What image formats are supported?","Anything the browser renders: JPG, PNG, WebP, GIF, AVIF and SVG."),
          ("Can I shorten the link?","Yes — paste a hosted image URL into our short link generator.")],
    steps=["Choose an image file, or paste an existing image URL.","Confirm the preview renders as expected.","Copy the link for use in code, posts or chats.","For permanent hosting, upload to your image CDN of choice."],
    related=["pdf-link-generator","short-link-generator","qr-code-link-generator","direct-download-link-generator"])

add(slug="audio-link-generator", name="Audio Link Generator", h1="Audio Link Generator",
    intro="Drop an MP3, WAV or M4A file to get an in-browser playback link, or validate an existing audio URL. Useful for quick demos and podcast previews.",
    fields=[{"name":"f","label":"Upload audio file","type":"file","accept":"audio/*"},
            {"name":"u","label":"…or paste an existing audio URL","type":"url","placeholder":"https://example.com/episode.mp3"}],
    build="return (v.f) || (v.u?String(v.u).trim():'');",
    preview="audio",
    aeoQ="How do I share an audio file as a link?",
    aeoA="Host the file on a podcast host (Buzzsprout, Transistor), Cloudinary, S3 or any HTTPS server and share that public URL. Use the upload above for a temporary in-browser preview.",
    geo=[("Podcaster in Brooklyn, NY","QA-checks episode MP3s before pushing to Buzzsprout."),
         ("Music producer in Atlanta, GA","Shares rough mixes with collaborators in Discord."),
         ("Voice-over artist in Chicago, IL","Sends demo reels to casting directors as direct links."),
         ("Audiobook narrator in Nashville, TN","Validates chapter audio files before uploading to ACX.")],
    faqs=[("Are my audio files uploaded?","No. The upload stays in your browser; nothing is sent to a server."),
          ("What's the best host for podcast audio?","Buzzsprout, Transistor, Captivate and Libsyn handle bandwidth and analytics."),
          ("Does the preview URL persist?","No — the in-browser URL works only in the current tab."),
          ("What formats can I share?","MP3 is the most compatible. WAV and FLAC work in modern browsers."),
          ("Can I add chapters?","Use ID3 chapter tags in your MP3; players like Pocket Casts and Overcast surface them.")],
    steps=["Upload an audio file or paste an MP3/WAV URL.","Use the inline player to verify playback.","Copy the link for use in show notes or social posts.","For public distribution, host on a podcast service."],
    related=["video-link-generator","direct-download-link-generator","short-link-generator","qr-code-link-generator"])

add(slug="video-link-generator", name="Video Link Generator", h1="Video Link Generator",
    intro="Upload an MP4 or paste a video URL to get an instant in-browser preview link. Quick way to QA a hosted video or share a one-off clip locally.",
    fields=[{"name":"f","label":"Upload video file","type":"file","accept":"video/*"},
            {"name":"u","label":"…or paste a video URL","type":"url","placeholder":"https://example.com/clip.mp4"}],
    build="return (v.f) || (v.u?String(v.u).trim():'');",
    preview="video",
    aeoQ="How do I share a video file as a link?",
    aeoA="Upload to a host like YouTube, Vimeo, Mux, Cloudflare Stream or S3+CloudFront and share the playback URL. The uploader above creates a temporary local preview for quick checks.",
    geo=[("Course creator in Austin, TX","QA-checks lesson videos before uploading to Teachable."),
         ("Wedding videographer in Denver, CO","Previews highlight reels before delivery."),
         ("Marketing team in San Francisco, CA","Validates product-demo MP4s before embedding on the landing page."),
         ("YouTuber in Los Angeles, CA","Reviews export quality before publishing.")],
    faqs=[("Where should I host videos publicly?","YouTube and Vimeo for reach, Mux and Cloudflare Stream for embeds, S3+CloudFront for self-hosted."),
          ("Will huge files work in the browser?","Large videos load slowly but work. For 4K masters use a desktop player to QA."),
          ("Do you upload my video?","No — files stay in your browser."),
          ("What formats can I preview?","Anything your browser supports: MP4 (H.264), WebM and HLS streams."),
          ("Can I generate a thumbnail?","Right-click the video in most browsers to save the current frame.")],
    steps=["Upload a video file or paste a hosted video URL.","Play it back inline to confirm encoding and audio.","Copy the link for QA notes or chat.","For production embedding, host on a streaming platform."],
    related=["audio-link-generator","youtube-link-generator","direct-download-link-generator","short-link-generator"])

add(slug="pdf-link-generator", name="PDF Link Generator", h1="PDF Direct Link Generator",
    intro="Upload a PDF for instant in-browser viewing or paste a hosted URL to append a viewer fragment (#view=FitH) for a clean inline display.",
    fields=[{"name":"f","label":"Upload PDF","type":"file","accept":"application/pdf"},
            {"name":"u","label":"…or paste a hosted PDF URL","type":"url","placeholder":"https://example.com/whitepaper.pdf"}],
    build="const base=(v.f)||(v.u?String(v.u).trim():''); return base ? (base.includes('#')?base:base+'#view=FitH') : '';",
    preview="pdf",
    aeoQ="How do I share a PDF as a direct link?",
    aeoA="Host the PDF on your site, S3, Drive or Dropbox and append `#view=FitH` so most browsers open it fit-to-width. Use the upload above for a temporary in-browser preview.",
    geo=[("Lawyer in NYC","Sends engagement letters as inline-viewable PDFs."),
         ("Realtor in Phoenix, AZ","Shares property fact sheets via SMS with one-tap preview."),
         ("B2B SaaS marketer in Austin, TX","Gates whitepapers behind a download CTA on the landing page."),
         ("Course creator in Denver, CO","Embeds PDF handouts inline in the LMS lesson page.")],
    faqs=[("What does `#view=FitH` do?","It tells Adobe Reader and most browsers to open the PDF zoomed to fit the page width."),
          ("Can I force the PDF to download instead of open?","Add the `download` attribute to your `<a>` tag or use the Direct Download Link Generator."),
          ("Will the preview URL work in email?","Browser preview URLs only work in the current tab. Email needs a hosted URL."),
          ("Are mobile browsers OK with #view fragments?","Most ignore them gracefully — the PDF still opens, just without the zoom hint."),
          ("Is there a way to jump to a specific page?","Yes — append `#page=3` (or combine: `#page=3&view=FitH`).")],
    steps=["Upload a PDF or paste a hosted PDF URL.","The viewer fragment is added automatically.","Copy the link for emails, SMS, social posts or QR codes.","Embed it in an iframe for inline display."],
    related=["direct-download-link-generator","image-link-generator","short-link-generator","qr-code-link-generator"])

add(slug="direct-download-link-generator", name="Direct Download Link Generator", h1="Direct Download Link Generator",
    intro="Upload any file or paste a hosted URL to produce a copy-paste HTML snippet that forces the browser to download instead of preview.",
    fields=[{"name":"f","label":"Upload a file","type":"file","accept":"*/*"},
            {"name":"u","label":"…or paste an existing file URL","type":"url","placeholder":"https://example.com/file.zip"},
            {"name":"fname","label":"Suggested download name","type":"text","placeholder":"file.zip"}],
    build="const href=(v.f)||(v.u?String(v.u).trim():''); if(!href) return ''; const fn=v.fname?` download=\"${String(v.fname).replace(/\"/g,'')}\"`:' download'; return `<a href=\"${href}\"${fn}>Download</a>`;",
    multiline=True,
    outputLabel="Force-download HTML snippet",
    aeoQ="How do I force a file to download instead of opening?",
    aeoA="Use an `<a href=\"file.ext\" download=\"file.ext\">` tag. The `download` attribute tells the browser to save the file rather than open it inline.",
    geo=[("Marketer in Austin, TX","Adds download attributes to lead-magnet links so PDFs save to disk."),
         ("Studio in LA, CA","Delivers WAV stems with a save-to-disk default."),
         ("SaaS founder in Boston, MA","Distributes desktop installers with stable download URLs."),
         ("Nonprofit in Chicago, IL","Shares branded report PDFs that download with a friendly filename.")],
    faqs=[("Does `download` work cross-origin?","Browsers only honor `download` for same-origin URLs or hosts that send a `Content-Disposition: attachment` header."),
          ("Can I rename the file on download?","Yes — set the `download` attribute to the desired filename."),
          ("What if I don't control the host?","You may need a tiny proxy that adds `Content-Disposition` headers, or host the file yourself."),
          ("Will this work on iOS Safari?","iOS handles `download` from same-origin URLs in recent versions; otherwise it opens in a new tab."),
          ("Can I track downloads?","Wrap the link with a Google Analytics event handler or use a redirect URL.")],
    steps=["Upload a file or paste an existing file URL.","Optionally set a suggested filename.","Copy the HTML snippet and paste it into your site, email or README.","Test the snippet in a real browser to confirm it downloads."],
    related=["pdf-link-generator","google-drive-direct-link-generator","dropbox-direct-link-generator","short-link-generator"])

# ---- Composed-URL tools ----
add(slug="whatsapp-link-generator", name="WhatsApp Link Generator", h1="WhatsApp Click-to-Chat Link Generator",
    intro="Build a wa.me click-to-chat link with a prefilled message. Customers tap the link and your message is pre-typed — no contact save required.",
    fields=[{"name":"phone","label":"Phone number with country code","type":"tel","placeholder":"15551234567","hint":"Digits only, including country code."},
            {"name":"msg","label":"Pre-filled message (optional)","type":"textarea","placeholder":"Hi! I'd like to know more about…"}],
    build="const p=(v.phone||'').replace(/\\D/g,''); if(!p) return ''; const m=v.msg?'?text='+encodeURIComponent(v.msg):''; return `https://wa.me/${p}${m}`;",
    aeoQ="How do I create a WhatsApp click-to-chat link?",
    aeoA="Use the format `https://wa.me/<countrycode+number>?text=<urlencoded message>`. The phone number must be digits only with the country code; the message must be URL-encoded.",
    geo=[("Realtor in Miami, FL","Adds a WhatsApp CTA to listing pages so buyers chat in one tap."),
         ("Restaurant in Austin, TX","Lets diners place takeout orders with a pre-filled menu request."),
         ("Coach in Los Angeles, CA","Books discovery calls via Instagram bio link."),
         ("Boutique in NYC","Handles SMS-style customer support without sharing a personal number.")],
    faqs=[("Do I need WhatsApp Business?","No — wa.me works with any WhatsApp account, personal or Business."),
          ("Why isn't the link working?","Strip spaces, dashes and the `+` from the number. It must be only digits with the country code."),
          ("Can I add multiple lines to the message?","Yes — newlines are encoded as `%0A` automatically by the URL encoder."),
          ("Is there a character limit on the message?","Practically yes — keep it under ~1,000 characters so it works on every device."),
          ("Can I track clicks?","Wrap the wa.me URL behind a short-link generator or UTM-tagged redirect.")],
    steps=["Enter your full phone number (country code + number, digits only).","Type the message you want pre-filled when customers tap.","Copy the wa.me link.","Add it to your website, Instagram bio, email signature or QR code."],
    related=["mailto-link-generator","qr-code-link-generator","short-link-generator","utm-link-generator"])

add(slug="mailto-link-generator", name="Mailto Link Generator", h1="Mailto Link Generator with Subject, Body, CC & BCC",
    intro="Build a mailto: link that opens the user's email client pre-filled with recipient, subject, body, CC and BCC.",
    fields=[{"name":"to","label":"To","type":"email","placeholder":"team@example.com"},
            {"name":"subject","label":"Subject","type":"text"},
            {"name":"body","label":"Body","type":"textarea"},
            {"name":"cc","label":"CC (optional)","type":"text"},
            {"name":"bcc","label":"BCC (optional)","type":"text"}],
    build="if(!v.to) return ''; const p=new URLSearchParams(); if(v.subject)p.set('subject',v.subject); if(v.body)p.set('body',v.body); if(v.cc)p.set('cc',v.cc); if(v.bcc)p.set('bcc',v.bcc); const q=p.toString().replace(/\\+/g,'%20'); return `mailto:${v.to}${q?'?'+q:''}`;",
    aeoQ="How do I build a mailto link with a subject and body?",
    aeoA="Use `mailto:address@example.com?subject=Hi&body=Message`. Subject and body must be URL-encoded; multiple recipients separate with commas; CC and BCC use `cc=` and `bcc=` params.",
    geo=[("Support team in Austin, TX","Drops 'Email Support' buttons that pre-fill a ticket template."),
         ("Recruiter in NYC","Sends candidates a pre-formatted intro request."),
         ("Sales rep in Chicago, IL","Embeds a one-click 'request a quote' link in proposals."),
         ("Designer in San Francisco, CA","Adds a contact CTA to portfolio sites without a backend.")],
    faqs=[("Will every email client open the link?","All major clients — Gmail (with the right default), Apple Mail, Outlook, Thunderbird — handle mailto links."),
          ("Why are line breaks broken?","Encode newlines as `%0A` (or just type them in the body field above — we encode automatically)."),
          ("Can I send multiple recipients?","Yes — comma-separate addresses in `to`, `cc` or `bcc`."),
          ("Are mailto attachments possible?","No — RFC 6068 does not allow attachments via mailto links."),
          ("How long can a mailto link be?","Most clients accept ~2,000 chars total. Keep bodies short and link to a longer page for details.")],
    steps=["Enter the recipient address.","Add subject, body and optional CC/BCC.","Copy the mailto: link.","Add it to a button, signature or website CTA."],
    related=["whatsapp-link-generator","short-link-generator","qr-code-link-generator","utm-link-generator"])

add(slug="google-maps-link-generator", name="Google Maps Link Generator", h1="Google Maps Directions Link Generator",
    intro="Generate a Google Maps link for any address, lat/lng or place — with optional travel mode for directions.",
    fields=[{"name":"q","label":"Address, place name, or lat,lng","type":"text","placeholder":"1600 Amphitheatre Pkwy, Mountain View, CA"},
            {"name":"mode","label":"Travel mode (for directions)","type":"select","options":[
                {"value":"","label":"None — show place"},
                {"value":"driving","label":"Driving"},
                {"value":"walking","label":"Walking"},
                {"value":"bicycling","label":"Bicycling"},
                {"value":"transit","label":"Transit"}]}],
    build="if(!v.q) return ''; const q=encodeURIComponent(String(v.q).trim()); return v.mode ? `https://www.google.com/maps/dir/?api=1&destination=${q}&travelmode=${v.mode}` : `https://www.google.com/maps/search/?api=1&query=${q}`;",
    aeoQ="What's the URL format for a Google Maps link?",
    aeoA="Use `https://www.google.com/maps/search/?api=1&query=<address>` to show a place, or `https://www.google.com/maps/dir/?api=1&destination=<address>&travelmode=driving` for turn-by-turn directions.",
    geo=[("Restaurant in Austin, TX","Pins ‘Get directions’ on Google Business and the homepage footer."),
         ("Realtor in Miami, FL","Sends listing addresses with one-tap walking directions."),
         ("Event venue in Las Vegas, NV","Drops a directions link inside attendee email confirmations."),
         ("Local salon in Brooklyn, NY","Embeds a transit directions link on the contact page.")],
    faqs=[("Can I use latitude and longitude?","Yes — paste `lat,lng` as the query. Maps treats the comma value as coordinates."),
          ("Does the link work on iOS?","Yes — iPhones open Google Maps if installed or fall back to Apple Maps via the URL."),
          ("How do I link to a specific Place ID?","Use `https://www.google.com/maps/place/?q=place_id:YOUR_PLACE_ID`."),
          ("Can I add a starting point?","Yes — append `&origin=<address>` to the directions URL."),
          ("Is there a character limit?","URLs over ~2,000 chars may truncate in SMS — shorten the result for messaging.")],
    steps=["Enter an address, place name or `lat,lng` coordinates.","Pick a travel mode if you want directions; leave blank to show a pin.","Copy the URL.","Add it to your site, email or QR code."],
    related=["google-review-link-generator","whatsapp-link-generator","qr-code-link-generator","short-link-generator"])

add(slug="google-review-link-generator", name="Google Review Link Generator", h1="Google Review Link Generator",
    intro="Turn your Google Business Place ID into a direct ‘Write a review’ link customers can tap from a QR code, SMS or receipt.",
    fields=[{"name":"pid","label":"Google Place ID","type":"text","placeholder":"ChIJN1t_tDeuEmsRUsoyG83frY4","hint":"Find yours at developers.google.com/maps/documentation/places/web-service/place-id"}],
    build="return v.pid ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(String(v.pid).trim())}` : '';",
    aeoQ="How do I create a Google review link?",
    aeoA="Use `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`. Find your Place ID in Google's free Place ID Finder tool — it's a long alphanumeric string starting with `ChIJ`.",
    geo=[("Local plumber in Phoenix, AZ","Prints a QR linking to the review form on every invoice."),
         ("Restaurant in Austin, TX","Adds a ‘Rate us’ link to the after-meal SMS receipt."),
         ("Auto detailer in Miami, FL","Shares the link via WhatsApp after each appointment."),
         ("Dentist in Chicago, IL","Emails the review link 24 hours after a cleaning.")],
    faqs=[("Why does the link open the review dialog directly?","Google's `writereview` endpoint takes a Place ID and pops the 5-star modal once the user is signed in."),
          ("Where do I find my Place ID?","Use Google's free Place ID Finder. Search your business name and copy the ID shown."),
          ("Can I make it a QR code?","Yes — paste the result into the QR Code Link Generator and print it on receipts."),
          ("Does this work for unverified listings?","No — your Google Business Profile must be verified to collect reviews."),
          ("Will customers need a Google account?","Yes — Google requires a signed-in account to post reviews.")],
    steps=["Find your Place ID with Google's Place ID Finder.","Paste it above.","Copy the writereview URL.","Print it as a QR code or add it to receipts, SMS and emails."],
    related=["qr-code-link-generator","whatsapp-link-generator","google-maps-link-generator","short-link-generator"])

add(slug="add-to-calendar-link-generator", name="Add to Calendar Link Generator", h1="Add to Calendar Link Generator (Google, Outlook, Yahoo, .ics)",
    intro="Generate a Google Calendar add-event URL from a title, time, location and details. Works in any browser.",
    fields=[{"name":"t","label":"Event title","type":"text"},
            {"name":"start","label":"Start (UTC, YYYYMMDDTHHmmssZ)","type":"text","placeholder":"20260615T140000Z"},
            {"name":"end","label":"End (UTC)","type":"text","placeholder":"20260615T150000Z"},
            {"name":"loc","label":"Location","type":"text"},
            {"name":"det","label":"Description","type":"textarea"}],
    build="if(!v.t||!v.start||!v.end) return ''; const p=new URLSearchParams({action:'TEMPLATE',text:v.t,dates:`${v.start}/${v.end}`}); if(v.loc)p.set('location',v.loc); if(v.det)p.set('details',v.det); return `https://calendar.google.com/calendar/render?${p.toString().replace(/\\+/g,'%20')}`;",
    aeoQ="How do I build an ‘Add to Google Calendar’ link?",
    aeoA="Use `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Title&dates=YYYYMMDDTHHmmssZ/YYYYMMDDTHHmmssZ&location=Place&details=Info`. Times must be in UTC basic ISO format.",
    geo=[("Event organizer in Las Vegas, NV","Embeds the link in confirmation emails so attendees one-click RSVP."),
         ("Yoga studio in Austin, TX","Adds class schedule buttons to the website."),
         ("Webinar host in San Francisco, CA","Drops the link in the registration thank-you page."),
         ("Sports club in Boston, MA","Lets parents add practice schedules with one tap.")],
    faqs=[("What format does Google want for dates?","UTC basic ISO: `YYYYMMDDTHHmmssZ` — e.g. `20260615T140000Z`."),
          ("Will this work on iPhone?","Yes — Safari opens the Google Calendar web flow; iCloud users can import a .ics file instead."),
          ("Can I include a Zoom link?","Yes — paste the meeting URL into the description field."),
          ("Does it support recurring events?","Add `&recur=RRULE:FREQ=WEEKLY;BYDAY=MO` for weekly Monday events."),
          ("How do I make an Outlook link?","Use `https://outlook.live.com/calendar/0/deeplink/compose` with `subject`, `startdt`, `enddt` params.")],
    steps=["Enter the event title, start and end times in UTC.","Optionally add a location and description.","Copy the Google Calendar URL.","Share it via email, on a landing page, or as a QR code."],
    related=["google-meet-link-generator","zoom-meeting-link-generator","mailto-link-generator","qr-code-link-generator"])

add(slug="affiliate-link-generator", name="Affiliate Link Generator", h1="Amazon & AliExpress Affiliate Link Generator",
    intro="Append your affiliate tag to any product URL. Works for Amazon Associates (`tag=`), AliExpress and any generic affiliate parameter.",
    fields=[{"name":"u","label":"Product URL","type":"url","placeholder":"https://www.amazon.com/dp/B08N5WRWNW"},
            {"name":"param","label":"Tag parameter name","type":"text","default":"tag","placeholder":"tag"},
            {"name":"tag","label":"Your affiliate tag","type":"text","placeholder":"yourtag-20"},
            {"name":"sub","label":"Sub-ID (optional, for tracking)","type":"text"}],
    build="if(!v.u||!v.tag) return ''; try{ const url=new URL(v.u); url.searchParams.set(v.param||'tag',v.tag); if(v.sub) url.searchParams.set('ascsubtag',v.sub); return url.toString(); }catch{return ''}",
    aeoQ="How do I build an Amazon affiliate link?",
    aeoA="Take any Amazon product URL and append `?tag=yourtag-20` (or `&tag=…` if the URL already has a query). Add `&ascsubtag=` for per-placement tracking inside Amazon Associates reports.",
    geo=[("Tech blogger in Brooklyn, NY","Tags every product mention with the post slug as ascsubtag."),
         ("Home-cook YouTuber in Austin, TX","Builds a kitchen-gear page that funnels to Amazon Associates."),
         ("Affiliate marketer in Phoenix, AZ","Tracks AliExpress conversions per landing page with sub-IDs."),
         ("SEO consultant in Chicago, IL","Adds tagged buy buttons to client comparison posts.")],
    faqs=[("What is the `ascsubtag` parameter?","Amazon's sub-ID parameter — useful for attribution across campaigns or pages inside a single Associates account."),
          ("Will tagging break the product URL?","No — Amazon ignores extra params and still loads the right product."),
          ("Do I need to disclose affiliate links?","Yes — the FTC requires clear disclosure on US-facing content."),
          ("Can I use this for non-Amazon affiliates?","Yes — change the parameter name to match your network (e.g. `aff_id`, `partner`)."),
          ("Why is my tag stripped sometimes?","Affiliate redirects from other networks can drop params. Use a permalink directly to the merchant.")],
    steps=["Paste a product URL.","Confirm or change the affiliate parameter name.","Enter your tag and optional sub-ID.","Copy the tagged URL into posts, videos or email."],
    related=["short-link-generator","utm-link-generator","referral-link-generator","qr-code-link-generator"])

add(slug="referral-link-generator", name="Referral Link Generator", h1="Custom Referral & Invite Link Generator",
    intro="Append a referral code to any URL. Use it for product invites, partner programs and word-of-mouth campaigns.",
    fields=[{"name":"u","label":"Base URL","type":"url","placeholder":"https://yourapp.com/signup"},
            {"name":"key","label":"Parameter name","type":"text","default":"ref"},
            {"name":"code","label":"Referral code","type":"text","placeholder":"alex42"}],
    build="if(!v.u||!v.code) return ''; try{ const url=new URL(v.u); url.searchParams.set(v.key||'ref',v.code); return url.toString(); }catch{return ''}",
    aeoQ="How do I create a referral link?",
    aeoA="Append a query parameter such as `?ref=USERCODE` to your signup URL. Store the value when the visitor lands and credit the referrer on conversion.",
    geo=[("SaaS founder in San Francisco, CA","Powers a launch referral leaderboard from a landing page."),
         ("Course creator in Austin, TX","Lets students earn a discount for each friend they invite."),
         ("Crypto exchange in Miami, FL","Pays signup bonuses tracked via `?ref=` codes."),
         ("DTC brand in Brooklyn, NY","Powers a give-$10-get-$10 program through email.")],
    faqs=[("How do I track the referrer?","Capture the `ref` param on landing, persist it in localStorage or a cookie, and attribute on signup."),
          ("Can I use letters and numbers?","Yes — most teams use short alphanumeric codes for readability."),
          ("Do I need a separate URL per friend?","Yes — each user gets a unique code so credit attaches to them."),
          ("Will the code break if shared on social?","Most platforms preserve query params; Twitter and Facebook share dialogs keep them intact."),
          ("Can I shorten the link?","Yes — pair the referral URL with our short link generator for SMS and bios.")],
    steps=["Paste the page you want to send referrals to.","Pick a parameter name (default `ref`).","Enter the unique code for the referrer.","Share the URL — store the param on landing for attribution."],
    related=["affiliate-link-generator","short-link-generator","utm-link-generator","qr-code-link-generator"])

add(slug="utm-link-generator", name="UTM Link Generator", h1="Google Analytics UTM Link Generator",
    intro="Build campaign URLs with the standard UTM parameters that Google Analytics, GA4 and most marketing tools recognize.",
    fields=[{"name":"u","label":"Landing page URL","type":"url","placeholder":"https://example.com/landing"},
            {"name":"source","label":"utm_source","type":"text","placeholder":"newsletter"},
            {"name":"medium","label":"utm_medium","type":"text","placeholder":"email"},
            {"name":"campaign","label":"utm_campaign","type":"text","placeholder":"spring-launch"},
            {"name":"term","label":"utm_term (optional)","type":"text"},
            {"name":"content","label":"utm_content (optional)","type":"text"}],
    build="if(!v.u) return ''; try{ const url=new URL(v.u); ['source','medium','campaign','term','content'].forEach(k=>{ if(v[k]) url.searchParams.set('utm_'+k,v[k]); }); return url.toString(); }catch{return ''}",
    aeoQ="What are the standard UTM parameters?",
    aeoA="The five UTMs are `utm_source` (where), `utm_medium` (channel), `utm_campaign` (initiative), and the optional `utm_term` (paid keyword) and `utm_content` (creative variant). GA4 reads them automatically.",
    geo=[("Growth marketer in San Francisco, CA","Tags every email and ad creative for full attribution in GA4."),
         ("Agency in NYC","Standardizes UTMs across client campaigns for consistent reporting."),
         ("E-commerce brand in Austin, TX","Tracks which influencer drove a holiday-campaign conversion."),
         ("B2B SaaS in Boston, MA","Maps LinkedIn ads to closed-won deals through the CRM.")],
    faqs=[("Are UTM values case-sensitive?","Yes — `Email` and `email` show as two rows. Stick to lowercase to keep reports clean."),
          ("Should I UTM internal links?","No — internal UTMs overwrite the original source. Use them only on external referrers."),
          ("What's the difference between source and medium?","`utm_source` is where (newsletter, twitter), `utm_medium` is how (email, social, cpc)."),
          ("Where do UTMs show up in GA4?","Under Acquisition → Traffic acquisition; also in Explorations and Looker Studio."),
          ("Can I shorten the URL?","Yes — most short-link tools preserve query params so attribution stays intact.")],
    steps=["Paste the destination URL.","Fill in source, medium and campaign at minimum.","Optionally add term and content for paid or creative-variant tracking.","Copy and use the URL in the matching channel."],
    related=["short-link-generator","affiliate-link-generator","referral-link-generator","qr-code-link-generator"])

add(slug="short-link-generator", name="Short Link Generator", h1="Free Short Link & Tiny URL Generator",
    intro="Shorten any URL using the free is.gd public API — no signup, no tracking. Optional custom alias.",
    fields=[{"name":"u","label":"Long URL","type":"url","placeholder":"https://example.com/very/long/path?with=params"}],
    build="return '';",  # client-side, see custom override below
    aeoQ="How do free URL shorteners work?",
    aeoA="The shortener stores your long URL in a database and gives you a tiny redirect URL. When someone opens it, the service issues a 301 to the original destination. We use the free is.gd API.",
    geo=[("Marketer in Austin, TX","Shortens every email CTA so SMS fallbacks fit under 160 chars."),
         ("Real estate agent in Miami, FL","Prints short URLs on yard signs and open-house flyers."),
         ("Podcaster in Brooklyn, NY","Drops a memorable short link in episode show notes."),
         ("Recruiter in Chicago, IL","Shares job-posting URLs in LinkedIn DMs without ugly tracking strings.")],
    faqs=[("Are these short links permanent?","is.gd promises long-term storage but, like any third-party shortener, the link's fate depends on the provider."),
          ("Do you track clicks?","No — this page just calls the public is.gd API. For analytics, use a dedicated shortener like Bitly or Rebrandly."),
          ("Can I use a custom alias?","is.gd supports custom URLs via its UI; the API call here generates random aliases for simplicity."),
          ("What's the rate limit?","is.gd allows roughly one request per second per IP — fine for human use."),
          ("Will UTMs survive?","Yes — the shortener stores the full URL including query params; redirects keep them intact.")],
    steps=["Paste your long URL.","Click Shorten to call the is.gd API.","Copy the short link.","Use it in SMS, social bios, QR codes or print."],
    related=["qr-code-link-generator","utm-link-generator","affiliate-link-generator","referral-link-generator"],
    custom_page="""function Page() {
  const [u, setU] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function shorten() {
    if (!u.trim()) return;
    setBusy(true); setErr(""); setOut("");
    try {
      const r = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(u.trim())}`);
      const t = await r.text();
      if (t.startsWith("http")) setOut(t.trim());
      else setErr(t);
    } catch (e) { setErr("Network error — try again."); }
    setBusy(false);
  }
  return (
    <>
      <ToolCard>
        <Field label="Long URL">
          <input type="url" className={inputCls} placeholder="https://example.com/very/long/path?with=params" value={u} onChange={(e) => setU(e.target.value)} />
        </Field>
        <button type="button" onClick={shorten} disabled={busy || !u.trim()} className="px-4 py-2 rounded-lg bg-gradient-sunset text-white text-sm font-semibold shadow-warm disabled:opacity-40">{busy ? "Shortening…" : "Shorten URL"}</button>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <div>
          <span className="block text-sm font-semibold mb-1.5">Short link</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>
    </>
  );
}""")

add(slug="qr-code-link-generator", name="QR Code Link Generator", h1="QR Code Link Generator",
    intro="Turn any URL into a downloadable QR code PNG. Scan-tested on iPhone, Android and dedicated readers.",
    fields=[{"name":"u","label":"URL or text","type":"url","placeholder":"https://example.com"}],
    build="return v.u?String(v.u).trim():'';",
    preview="qr",
    aeoQ="How do I generate a QR code for a URL?",
    aeoA="Encode the URL as a QR symbol — most generators (including this one) call a public QR rendering API such as goqr.me to return a PNG. Scan-test it before printing.",
    geo=[("Restaurant in Austin, TX","Prints menu QR codes on table tents."),
         ("Realtor in Miami, FL","Adds a QR to yard signs that opens the listing."),
         ("Event organizer in Las Vegas, NV","Distributes scannable check-in codes on badges."),
         ("Wedding planner in Charleston, SC","Shares a photo-album QR on the menu card.")],
    faqs=[("Will the QR work offline?","Yes — printed QRs scan whether the device is online; the URL inside needs internet to load."),
          ("How big should I print it?","Aim for at least 2x2 cm at typical reading distance; larger for posters."),
          ("Why does my QR look pixelated?","Use the download size of 300px or larger and ensure quiet (white) margin around it."),
          ("Can I customize the colors?","Yes — high-contrast dark-on-light works best; we render solid black by default for max compatibility."),
          ("Can I add a logo?","Some QR readers allow logos in the center if error-correction is set to high.")],
    steps=["Paste a URL or text payload.","Wait for the QR preview to render.","Right-click the QR and Save Image, or use the download link.","Print or embed as needed."],
    related=["short-link-generator","whatsapp-link-generator","google-review-link-generator","mailto-link-generator"])

add(slug="slug-generator", name="SEO URL Slug Generator", h1="SEO-Friendly URL Slug Generator",
    intro="Convert any title into a clean, lowercase, hyphen-separated slug ideal for WordPress permalinks and SEO-friendly URLs.",
    fields=[{"name":"t","label":"Title or sentence","type":"text","placeholder":"How to write great SEO titles"}],
    build="return String(v.t||'').toLowerCase().normalize('NFKD').replace(/[\\u0300-\\u036f]/g,'').replace(/[^a-z0-9\\s-]/g,'').trim().replace(/\\s+/g,'-').replace(/-+/g,'-').slice(0,80);",
    aeoQ="What makes a good SEO URL slug?",
    aeoA="Keep it short, lowercase, hyphen-separated, free of stop words and Unicode marks, and include the primary keyword. Google and most CMSs treat hyphens as word separators.",
    geo=[("Blogger in Austin, TX","Generates permalinks before publishing in WordPress."),
         ("Headless CMS dev in San Francisco, CA","Slugifies titles in a content pipeline."),
         ("Marketer in NYC","Cleans up exported product names for landing-page URLs."),
         ("SEO consultant in Chicago, IL","Standardizes client-site URL hygiene.")],
    faqs=[("Should slugs contain stop words?","Usually no — strip ‘the’, ‘a’, ‘of’ unless they're integral to the meaning."),
          ("Underscores or hyphens?","Hyphens. Google treats `-` as a separator and `_` as a word joiner."),
          ("Does length matter?","Shorter is better; aim for under 60 characters and 3–5 words."),
          ("Should I include the year?","Only for evergreen content you'll update; otherwise it dates the URL."),
          ("What about non-English characters?","Transliterate to ASCII for maximum compatibility, as this tool does.")],
    steps=["Enter the article title or sentence.","The slug updates as you type.","Copy it into your CMS permalink field.","Avoid changing slugs after publish — redirect if you must."],
    related=["utm-link-generator","short-link-generator","qr-code-link-generator","mailto-link-generator"])

add(slug="rickroll-link-generator", name="Rick Roll Link Generator", h1="Rick Roll Link Generator",
    intro="Disguise the classic Rick Astley video behind any custom URL slug. For pranks, April Fools and friendly meetings only.",
    fields=[{"name":"label","label":"Display text or slug","type":"text","default":"important-document"}],
    build="return `https://rickroll.it/?l=${encodeURIComponent(v.label||'click-here')}`;",
    aeoQ="What is a rickroll link?",
    aeoA="A rickroll link is any URL that secretly redirects to Rick Astley's ‘Never Gonna Give You Up’ music video, used as a harmless internet prank.",
    geo=[("Dev team in San Francisco, CA","Drops rickrolls in the office Slack on April 1st."),
         ("Streamer in LA, CA","Disguises ‘bonus content’ links during live streams."),
         ("Friend group anywhere in the USA","Shares it in group texts for a laugh."),
         ("Office prankster in NYC","Sends a ‘meeting agenda’ link to coworkers.")],
    faqs=[("Is rickrolling harmful?","No — it just opens a music video. Keep it friendly and don't disguise it as anything malicious."),
          ("Can I use my own custom domain?","Yes — set up a redirect on your own short-link service if you want full control."),
          ("Will browsers warn about it?","No — it's a normal YouTube redirect."),
          ("Where did rickrolling start?","On 4chan in 2007 as a bait-and-switch joke."),
          ("Is there a Rick Roll holiday?","April 1st (April Fools) is peak rickroll season.")],
    steps=["Enter a display label or slug.","Copy the disguised URL.","Drop it where a real link would normally go.","Watch the reactions."],
    related=["short-link-generator","qr-code-link-generator","youtube-link-generator","mailto-link-generator"])

add(slug="youtube-link-generator", name="YouTube Link Generator", h1="YouTube Link Generator (Subscribe, Timestamp, Autoplay)",
    intro="Build YouTube URLs with auto-subscribe, timestamps and autoplay parameters from a video URL or ID.",
    fields=[{"name":"id","label":"YouTube video URL or ID","type":"text","placeholder":"dQw4w9WgXcQ or https://youtu.be/dQw4w9WgXcQ"},
            {"name":"ts","label":"Start at (seconds)","type":"number","placeholder":"60"},
            {"name":"sub","label":"Channel ID for auto-subscribe (optional)","type":"text","placeholder":"UCxxxx"},
            {"name":"auto","label":"Autoplay","type":"checkbox"}],
    build="const m=(v.id||'').match(/(?:v=|youtu\\.be\\/|embed\\/)([A-Za-z0-9_-]{11})/) || (String(v.id||'').length===11?[null,v.id]:null); if(!m && !v.sub) return ''; if(v.sub) return `https://www.youtube.com/channel/${v.sub}?sub_confirmation=1`; const id=m[1]; const p=new URLSearchParams(); if(v.ts) p.set('t',String(v.ts)+'s'); if(v.auto) p.set('autoplay','1'); const q=p.toString(); return `https://www.youtube.com/watch?v=${id}${q?'&'+q:''}`;",
    aeoQ="How do I create a YouTube auto-subscribe link?",
    aeoA="Append `?sub_confirmation=1` to your channel URL: `https://www.youtube.com/channel/CHANNEL_ID?sub_confirmation=1`. The subscribe modal opens automatically when a logged-in viewer clicks.",
    geo=[("YouTuber in LA, CA","Adds a one-click subscribe link to every video description."),
         ("Course creator in Austin, TX","Sends students timestamped lesson links."),
         ("Podcast clip editor in Brooklyn, NY","Shares specific moments via timestamped URLs."),
         ("Marketing team in San Francisco, CA","Embeds autoplay video URLs on landing pages.")],
    faqs=[("Where do I find my channel ID?","YouTube → Settings → Advanced. It starts with `UC`."),
          ("Does autoplay work on mobile?","Mobile browsers usually require a user gesture; autoplay may be blocked."),
          ("How do I link to a specific moment?","Use the `t=` param in seconds (e.g. `t=90s`) for the watch page, or `start=` on embed URLs."),
          ("Will the subscribe modal appear for everyone?","Only for users signed in to YouTube. Others see the channel page."),
          ("Can I shorten youtu.be links further?","Yes — pass the URL into the short-link generator.")],
    steps=["Paste a video URL or 11-char video ID (or a channel ID for subscribe links).","Optionally set a start time or enable autoplay.","Copy the URL.","Share in descriptions, emails, embeds or QR codes."],
    related=["short-link-generator","video-link-generator","qr-code-link-generator","utm-link-generator"])

# ---- Social / meeting / payments ----
add(slug="discord-invite-link-generator", name="Discord Invite Link Generator", h1="Discord Invite Link Generator",
    intro="Format a discord.gg invite URL from an invite code or a vanity name. Validates the code structure.",
    fields=[{"name":"code","label":"Invite code or vanity","type":"text","placeholder":"abcDEF or your-vanity"}],
    build="const c=(v.code||'').trim().replace(/^.*discord\\.gg\\//,''); return c?`https://discord.gg/${c}`:'';",
    aeoQ="What's the format of a Discord invite link?",
    aeoA="`https://discord.gg/<code>` where `<code>` is either an auto-generated invite code or a server's vanity URL (Boost level 3 servers can claim one).",
    geo=[("Community manager in Austin, TX","Posts a stable vanity invite on the website."),
         ("Game dev in Seattle, WA","Drops invites in YouTube descriptions and Twitter bios."),
         ("Streamer in LA, CA","Shares the server invite in stream overlays."),
         ("Open-source maintainer anywhere in the USA","Adds a contributor Discord invite to the README.")],
    faqs=[("Do invite codes expire?","Default invites last 7 days; you can set them to never expire in the server's invite settings."),
          ("What's a vanity URL?","A custom `discord.gg/yourname` link available to Boost level 3 servers."),
          ("Can I limit uses?","Yes — set max-uses when creating the invite in Discord."),
          ("How do I revoke an invite?","Server Settings → Invites → delete the row."),
          ("Will scammers abuse my link?","Public invites can attract bots. Use verification gating and a welcome channel.")],
    steps=["Paste a Discord invite code or a full discord.gg URL.","The tool extracts just the code.","Copy the cleaned URL.","Share it in your community channels."],
    related=["telegram-link-generator","whatsapp-link-generator","short-link-generator","qr-code-link-generator"])

add(slug="zoom-meeting-link-generator", name="Zoom Meeting Link Generator", h1="Zoom Meeting Link Generator",
    intro="Build a Zoom join URL from a meeting ID and optional passcode. Send a single tap-to-join link.",
    fields=[{"name":"id","label":"Zoom meeting ID","type":"text","placeholder":"123 4567 8901"},
            {"name":"pwd","label":"Passcode (optional)","type":"text"}],
    build="const id=(v.id||'').replace(/\\D/g,''); if(!id) return ''; const p=v.pwd?'?pwd='+encodeURIComponent(v.pwd):''; return `https://zoom.us/j/${id}${p}`;",
    aeoQ="What's the format of a Zoom join link?",
    aeoA="`https://zoom.us/j/MEETING_ID?pwd=PASSCODE`. The meeting ID is digits only; the encoded passcode is optional but recommended for security.",
    geo=[("Consultant in Boston, MA","Sends pre-built join links in calendar invites."),
         ("Yoga studio in Austin, TX","Distributes class Zoom links via email."),
         ("Teacher in Chicago, IL","Posts the meeting URL in the LMS each week."),
         ("Sales team in San Francisco, CA","Standardizes Zoom links across all booked demos.")],
    faqs=[("Why is the passcode in the URL?","Modern Zoom links bake the passcode in so attendees don't have to type it."),
          ("Is the join link safe to share publicly?","Anyone with the link can join — protect high-value meetings with a waiting room."),
          ("Does this work for recurring meetings?","Yes — recurring meetings reuse the same ID and URL."),
          ("Can I embed the link in a button?","Yes — wrap with `<a href=…>Join</a>` in HTML or use it in any rich-text editor."),
          ("How do I copy the link from Zoom?","Schedule the meeting and click ‘Copy Invitation’.")],
    steps=["Enter the Zoom meeting ID (digits).","Add the passcode if required.","Copy the join URL.","Send via email, calendar invite or chat."],
    related=["google-meet-link-generator","teams-meeting-link-generator","add-to-calendar-link-generator","mailto-link-generator"])

add(slug="google-meet-link-generator", name="Google Meet Link Generator", h1="Google Meet Link Generator",
    intro="Format a meet.google.com join URL from a meeting code, or grab the ‘new meeting’ shortcut.",
    fields=[{"name":"code","label":"Meet code (xxx-xxxx-xxx) or leave blank for new meeting","type":"text","placeholder":"abc-defg-hij"}],
    build="const c=(v.code||'').trim(); return c ? `https://meet.google.com/${c}` : 'https://meet.google.com/new';",
    aeoQ="How do I share a Google Meet link?",
    aeoA="Use `https://meet.google.com/<code>` for a specific meeting (codes look like `abc-defg-hij`) or `https://meet.google.com/new` to start an instant one.",
    geo=[("Marketer in Austin, TX","Adds an instant-meeting link to the email signature."),
         ("Teacher in Chicago, IL","Posts class Meet codes in Google Classroom."),
         ("Therapist in Brooklyn, NY","Sends tele-health links via SMS reminders."),
         ("Designer in San Francisco, CA","Drops a Meet link into Figma comments for live review.")],
    faqs=[("Do attendees need a Google account?","For Workspace meetings, often yes; consumer meetings allow guests with the link."),
          ("Where do I get the meeting code?","Schedule a Meet in Google Calendar or Workspace; the code shows in the invite."),
          ("Can I dial in by phone?","Workspace Meet generates a phone number; consumer Meet does not."),
          ("Does meet.google.com/new work for everyone?","It opens an instant meeting for signed-in Google users."),
          ("Can I lock the meeting?","Hosts can use ‘Quick Access’ and ‘Host Controls’ to gate entry.")],
    steps=["Enter the meeting code, or leave blank for an instant meeting.","Copy the URL.","Share in calendar invites, email or chat."],
    related=["zoom-meeting-link-generator","teams-meeting-link-generator","add-to-calendar-link-generator","mailto-link-generator"])

add(slug="teams-meeting-link-generator", name="Microsoft Teams Meeting Link Generator", h1="Microsoft Teams Meeting Link Helper",
    intro="Paste a Microsoft Teams meeting URL to verify and copy a clean join link. Teams join URLs are issued by Microsoft 365 when scheduling.",
    fields=[{"name":"u","label":"Teams meeting join URL","type":"url","placeholder":"https://teams.microsoft.com/l/meetup-join/..."}],
    build="const u=(v.u||'').trim(); return u.startsWith('https://teams.microsoft.com/')?u:'';",
    aeoQ="How do I share a Microsoft Teams meeting link?",
    aeoA="Schedule the meeting in Outlook or Teams; Microsoft 365 generates a `https://teams.microsoft.com/l/meetup-join/…` URL. Paste it above to verify and share.",
    geo=[("Enterprise team in Boston, MA","Standardizes the meeting link copied into project status decks."),
         ("HR in Chicago, IL","Sends interview Teams links in calendar invites."),
         ("Consultant in San Francisco, CA","Drops Teams links in client engagement emails."),
         ("Hybrid team in Austin, TX","Pins Teams links in channel descriptions.")],
    faqs=[("Can I create a Teams link without Microsoft 365?","No — Teams meeting URLs are issued by your tenant when scheduling."),
          ("Do guests need a Teams account?","No — guests can join via browser without an account."),
          ("Is the link single-use?","No — Teams join links are reusable for the meeting series."),
          ("Can I customize the URL?","No — Microsoft assigns the meetup-join path."),
          ("How do I revoke access?","Cancel the meeting in Outlook or Teams.")],
    steps=["Schedule a Teams meeting from Outlook or Teams.","Copy the generated join URL.","Paste it above to validate it.","Share via email, calendar or chat."],
    related=["zoom-meeting-link-generator","google-meet-link-generator","add-to-calendar-link-generator","mailto-link-generator"])

add(slug="payment-link-generator", name="Payment Link Generator", h1="Hosted Payment Request Link Helper",
    intro="Compose a structured payment-request URL (amount, currency, description) you can plug into any processor's hosted-checkout pattern.",
    fields=[{"name":"base","label":"Hosted checkout base URL","type":"url","placeholder":"https://yourstore.com/pay"},
            {"name":"amount","label":"Amount","type":"number","placeholder":"49.00"},
            {"name":"currency","label":"Currency","type":"select","options":[
                {"value":"USD","label":"USD"},{"value":"EUR","label":"EUR"},{"value":"GBP","label":"GBP"},{"value":"CAD","label":"CAD"},{"value":"AUD","label":"AUD"},{"value":"INR","label":"INR"}]},
            {"name":"desc","label":"Description","type":"text","placeholder":"Pro plan — annual"}],
    build="if(!v.base||!v.amount) return ''; try{ const url=new URL(v.base); url.searchParams.set('amount',v.amount); url.searchParams.set('currency',v.currency); if(v.desc) url.searchParams.set('description',v.desc); return url.toString(); }catch{return ''}",
    aeoQ="How do I generate a payment link?",
    aeoA="Pick a processor that supports hosted payment links (Stripe Payment Links, PayPal Buttons, Square Online Checkout). Each provides a base URL plus query parameters for amount, currency and description.",
    geo=[("Freelancer in Austin, TX","Sends pay-as-you-go invoices with a one-tap link."),
         ("Coach in LA, CA","Embeds a checkout link in the booking confirmation email."),
         ("Online store in NYC","Generates ad-hoc payment requests for custom orders."),
         ("Nonprofit in Boston, MA","Builds donation links with preset amounts.")],
    faqs=[("Which processor is easiest?","Stripe Payment Links and Square Checkout don't require code — generate URLs from their dashboards."),
          ("Are payment links secure?","Yes — checkout happens on the processor's domain with TLS and PCI-compliance built in."),
          ("Can I prefill the amount?","Yes — most processors accept `amount` or `value` query params on hosted links."),
          ("How do I refund?","Issue the refund inside the processor's dashboard; the link itself is just a checkout entry point."),
          ("Can I shorten the URL?","Yes — pair the link with our short-link generator for SMS and bios.")],
    steps=["Get your hosted checkout base URL from Stripe, Square or PayPal.","Set amount, currency and description.","Copy the composed URL.","Send by email, SMS or QR code."],
    related=["paypal-me-link-generator","short-link-generator","qr-code-link-generator","mailto-link-generator"])

add(slug="paypal-me-link-generator", name="PayPal.Me Link Generator", h1="PayPal.Me Payment Request Link Generator",
    intro="Build a `paypal.me/handle/amount` link that opens PayPal pre-filled with your requested amount and currency.",
    fields=[{"name":"handle","label":"PayPal.Me handle","type":"text","placeholder":"yourname"},
            {"name":"amount","label":"Amount (optional)","type":"number"},
            {"name":"currency","label":"Currency","type":"select","options":[
                {"value":"USD","label":"USD"},{"value":"EUR","label":"EUR"},{"value":"GBP","label":"GBP"},{"value":"CAD","label":"CAD"},{"value":"AUD","label":"AUD"}]}],
    build="if(!v.handle) return ''; const h=String(v.handle).trim().replace(/^@/,''); return v.amount ? `https://paypal.me/${h}/${v.amount}${v.currency}` : `https://paypal.me/${h}`;",
    aeoQ="What's the format of a PayPal.Me link?",
    aeoA="`https://paypal.me/<handle>/<amount><currency>` — for example `https://paypal.me/alex/25USD`. Drop the amount to let the payer choose.",
    geo=[("Musician in Nashville, TN","Posts a PayPal.Me tip link in show bios."),
         ("Tutor in Boston, MA","Sends invoice links via SMS with a fixed amount."),
         ("Friend group anywhere in the USA","Splits dinner bills via group chat."),
         ("Artist in Brooklyn, NY","Sells one-off prints with a tap-to-pay URL.")],
    faqs=[("Do I need a PayPal Business account?","No — personal accounts can claim a PayPal.Me handle for free."),
          ("Can the payer change the amount?","Yes — even with an amount in the URL, payers can edit before confirming."),
          ("What currencies are supported?","Major currencies including USD, EUR, GBP, CAD and AUD."),
          ("Are PayPal.Me payments protected?","‘Goods & services’ payments are; ‘friends & family’ payments aren't — the payer chooses."),
          ("Will it work without an amount?","Yes — `paypal.me/yourname` opens a free-form payment page.")],
    steps=["Enter your PayPal.Me handle (without `@`).","Optionally set an amount and currency.","Copy the link.","Share in invoices, bios or SMS."],
    related=["payment-link-generator","short-link-generator","qr-code-link-generator","mailto-link-generator"])

add(slug="instagram-link-generator", name="Instagram Link Generator", h1="Instagram Profile, DM & Story-Share Link Generator",
    intro="Build deep links to an Instagram profile, direct message thread, or story-share intent.",
    fields=[{"name":"kind","label":"Link type","type":"select","options":[
                {"value":"profile","label":"Profile"},{"value":"dm","label":"Direct message"},{"value":"reel","label":"Reel by ID"}]},
            {"name":"handle","label":"Username or ID","type":"text","placeholder":"username (without @)"}],
    build="if(!v.handle) return ''; const h=String(v.handle).trim().replace(/^@/,''); if(v.kind==='dm') return `https://ig.me/m/${h}`; if(v.kind==='reel') return `https://www.instagram.com/reel/${h}/`; return `https://www.instagram.com/${h}/`;",
    aeoQ="How do I link to an Instagram DM?",
    aeoA="Use `https://ig.me/m/<username>` — Instagram's official short-domain that opens directly into a new DM thread on mobile and the web.",
    geo=[("Boutique in NYC","Adds a DM link to the website footer for customer questions."),
         ("Influencer in LA, CA","Sends collab requests via ig.me/m links in email."),
         ("Realtor in Miami, FL","Embeds an Instagram profile QR on yard signs."),
         ("Coffee shop in Austin, TX","Cross-links the menu to their Reels.")],
    faqs=[("Will ig.me open the app?","Yes — mobile devices with Instagram installed open the app; otherwise they fall back to the web."),
          ("Do I need a Business account for DM links?","No — ig.me works for any public account."),
          ("Can I link to a story?","Stories are ephemeral — you can link to a Highlight or use the share-sheet from the app."),
          ("Will the profile link work for private accounts?","It opens the profile; viewers still need to follow to see posts."),
          ("Can I track clicks?","Wrap the link in a short-link or UTM redirect.")],
    steps=["Pick the type of link (profile, DM, or Reel).","Enter the username or Reel ID.","Copy the URL.","Add it to your bio, website or email."],
    related=["facebook-share-link-generator","telegram-link-generator","short-link-generator","qr-code-link-generator"])

add(slug="facebook-share-link-generator", name="Facebook Share Link Generator", h1="Facebook Share Dialog Link Generator",
    intro="Build a `facebook.com/sharer` URL that opens Facebook's share dialog pre-filled with any link.",
    fields=[{"name":"u","label":"URL to share","type":"url","placeholder":"https://example.com/article"}],
    build="if(!v.u) return ''; return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(String(v.u).trim())}`;",
    aeoQ="How do I create a Facebook share link?",
    aeoA="Use `https://www.facebook.com/sharer/sharer.php?u=<URL>`. Clicking it opens Facebook's share dialog pre-populated with the URL's Open Graph preview.",
    geo=[("Publisher in NYC","Adds Share buttons under every article."),
         ("E-commerce brand in Austin, TX","Sends Facebook share CTAs in post-purchase emails."),
         ("Nonprofit in Chicago, IL","Asks supporters to share fundraising pages."),
         ("SaaS in San Francisco, CA","Lets users share milestone achievements.")],
    faqs=[("Does the preview look right?","Facebook pulls Open Graph tags (`og:title`, `og:image`, `og:description`) — set those on your URL."),
          ("Why is the image missing?","Add an `og:image` of at least 1200×630px to the shared page."),
          ("Can I prefill a caption?","Facebook removed prefilled captions in 2017; users type their own."),
          ("Will this work on mobile?","Yes — mobile browsers open the Facebook app if installed."),
          ("Can I track shares?","Use a UTM-tagged URL inside the `u=` parameter.")],
    steps=["Paste the URL to share.","Copy the sharer URL.","Use it on share buttons, emails or QR codes."],
    related=["instagram-link-generator","linkedin-link-generator","telegram-link-generator","utm-link-generator"])

add(slug="telegram-link-generator", name="Telegram Link Generator", h1="Telegram t.me Link Generator (Channel, Group, Bot, Share)",
    intro="Build a t.me URL for a Telegram channel, group, bot or the share-link intent.",
    fields=[{"name":"kind","label":"Link type","type":"select","options":[
                {"value":"channel","label":"Channel / group / user"},{"value":"bot","label":"Bot with /start"},{"value":"share","label":"Share URL"}]},
            {"name":"value","label":"Username, bot name, or URL to share","type":"text","placeholder":"yourchannel"}],
    build="const x=(v.value||'').trim().replace(/^@/,''); if(!x) return ''; if(v.kind==='share') return `https://t.me/share/url?url=${encodeURIComponent(x)}`; if(v.kind==='bot') return `https://t.me/${x}?start=hi`; return `https://t.me/${x}`;",
    aeoQ="What's the format of a Telegram t.me link?",
    aeoA="`https://t.me/<username>` for users, channels and groups; `https://t.me/<bot>?start=<payload>` for bots; `https://t.me/share/url?url=<URL>` for the share intent.",
    geo=[("Crypto project in Miami, FL","Distributes its t.me channel in social bios."),
         ("Community manager in Austin, TX","Embeds bot deep-links in product onboarding."),
         ("Newsletter in Brooklyn, NY","Adds a ‘Share on Telegram’ button to articles."),
         ("Game studio in Seattle, WA","Sends Telegram channel invites in patch notes.")],
    faqs=[("Do users need Telegram installed?","Yes for app deep-link; otherwise t.me opens a web preview with a Join button."),
          ("What's the `start` payload?","A short string a bot receives when a user taps the link — useful for tracking referrers."),
          ("Are usernames case-sensitive?","No — t.me normalizes them."),
          ("Can I create a t.me link for private groups?","Use the group's invite link from Telegram's admin panel."),
          ("How do I shorten t.me links?","Pass the URL to our short-link generator.")],
    steps=["Pick the link type.","Enter the username, bot name, or URL to share.","Copy the t.me URL.","Drop it in social bios, emails or QR codes."],
    related=["discord-invite-link-generator","whatsapp-link-generator","short-link-generator","qr-code-link-generator"])

add(slug="linkedin-link-generator", name="LinkedIn Link Generator", h1="LinkedIn Profile, Company & Share Link Generator",
    intro="Build LinkedIn URLs for personal profiles, company pages, or the share-link sheet.",
    fields=[{"name":"kind","label":"Link type","type":"select","options":[
                {"value":"in","label":"Personal profile"},{"value":"company","label":"Company page"},{"value":"share","label":"Share URL"}]},
            {"name":"value","label":"Username or URL","type":"text","placeholder":"in: johndoe — company: acme — share: https://…"}],
    build="const x=(v.value||'').trim(); if(!x) return ''; if(v.kind==='share') return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(x)}`; if(v.kind==='company') return `https://www.linkedin.com/company/${x.replace(/^.*\\/company\\//,'')}/`; return `https://www.linkedin.com/in/${x.replace(/^.*\\/in\\//,'')}/`;",
    aeoQ="How do I share a LinkedIn profile or post?",
    aeoA="Profiles: `https://www.linkedin.com/in/<vanity>/`. Companies: `https://www.linkedin.com/company/<slug>/`. Share intent: `https://www.linkedin.com/sharing/share-offsite/?url=<URL>`.",
    geo=[("Recruiter in NYC","Sends candidates a one-tap profile preview."),
         ("Founder in San Francisco, CA","Pins the company-page link in the email signature."),
         ("B2B marketer in Boston, MA","Adds Share-on-LinkedIn buttons to blog articles."),
         ("Career coach in Austin, TX","Drops their LinkedIn vanity in every podcast bio.")],
    faqs=[("How do I get a vanity LinkedIn URL?","LinkedIn → Edit public profile & URL → set a custom vanity."),
          ("Can I prefill share text?","LinkedIn removed prefilled text in 2021; users type their own."),
          ("Does share-offsite require login?","Yes — sharing requires a LinkedIn account."),
          ("Will the share preview look right?","LinkedIn reads Open Graph tags — set `og:title`, `og:image`, `og:description`."),
          ("Can I track LinkedIn share clicks?","Pass a UTM-tagged URL into the `url` parameter.")],
    steps=["Pick personal, company or share.","Paste the slug or URL.","Copy the LinkedIn URL.","Use it in email signatures, websites, or share buttons."],
    related=["facebook-share-link-generator","telegram-link-generator","short-link-generator","utm-link-generator"])

add(slug="premium-link-generator", name="Premium Link Generator", h1="Premium File-Host Direct Link Validator",
    intro="Validate file URLs from the most-requested premium hosts (Rapidgator, Turbobit, Nitroflare and more). This is a structural validator, not a debrid service.",
    fields=[{"name":"host","label":"Host","type":"select","options":[
                {"value":"rapidgator","label":"Rapidgator"},{"value":"turbobit","label":"Turbobit"},{"value":"nitroflare","label":"Nitroflare"},
                {"value":"filejoker","label":"Filejoker"},{"value":"keep2share","label":"Keep2Share / K2S"},{"value":"hitfile","label":"Hitfile"},
                {"value":"ddownload","label":"DDownload"},{"value":"uploadhaven","label":"Uploadhaven"},{"value":"katfile","label":"Katfile"},
                {"value":"fastfile","label":"Fastfile.cc"},{"value":"filesfly","label":"Filesfly"}]},
            {"name":"u","label":"Source file URL","type":"url","placeholder":"https://rapidgator.net/file/…"}],
    build="if(!v.u) return ''; const map={rapidgator:'rapidgator.net',turbobit:'turbobit.net',nitroflare:'nitroflare.com',filejoker:'filejoker.net',keep2share:'k2s.cc',hitfile:'hitfile.net',ddownload:'ddownload.com',uploadhaven:'uploadhaven.com',katfile:'katfile.com',fastfile:'fastfile.cc',filesfly:'filesfly.cc'}; const want=map[String(v.host)]; if(!want) return ''; return v.u.includes(want) ? v.u : `⚠ URL does not look like a ${want} link.`;",
    aeoQ="What is a premium link generator?",
    aeoA="A premium link generator (a.k.a. debrid service) converts a free-host file URL into a higher-speed direct download by routing through a premium account. This page validates URL structure only — it does not host or fetch files.",
    geo=[("Archivist in San Francisco, CA","Validates file-host URLs before submitting to a debrid service."),
         ("Linux user in Austin, TX","Double-checks ISO mirrors hosted on premium hosts."),
         ("Community moderator in NYC","Pre-screens forum file links for typos."),
         ("Researcher in Boston, MA","Confirms dataset URLs point at the expected host.")],
    faqs=[("Does this tool unlock premium downloads?","No — it's a URL validator. For actual debrid, use a paid service like Real-Debrid, AllDebrid or Premiumize."),
          ("Which hosts are most popular?","Rapidgator, Turbobit, Nitroflare and Keep2Share top community surveys."),
          ("Is using a debrid service legal?","Debrid services themselves are legal; downloading copyrighted content without rights is not."),
          ("Why does my URL fail validation?","The URL must contain the host's canonical domain — strip redirects and tracking wrappers first."),
          ("Can I batch-validate URLs?","Paste them one at a time here, or write a script using the same domain-match rule.")],
    steps=["Pick the file host from the list.","Paste the source URL.","Read the validation result.","Submit valid URLs to your debrid service."],
    related=["short-link-generator","direct-download-link-generator","mega-link-generator","magnet-link-generator"])

# Build files
TEMPLATE = """import { createFileRoute } from "@tanstack/react-router";
__IMPORTS__
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/__SLUG__"]?.keywords ?? [];

const FAQS = __FAQS__;
const STEPS = __STEPS__;
const TITLE = "__TITLE__";
const DESC = "__DESC__";

export const Route = createFileRoute("/__SLUG__")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/__SLUG__",
    name: "__NAME__", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "__NAME__", item: "/__SLUG__" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the __NAME__",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

__PAGE__
"""

DEFAULT_PAGE = """function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: __NAME_JSON__ }]} />
      <ToolHero h1={__H1__} intro={__INTRO__} keywords={KW} />

      <ToolForm
        fields={__FIELDS__}
        build={(v) => { __BUILD__ }}
        __EXTRA_PROPS__
      />

      <HowToUse heading={__HOW_HEADING__} steps={STEPS} />

      <AeoBlock
        question={__AEO_Q__}
        answer={__AEO_A__}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={__GEO__}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={__RELATED__}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}"""

CUSTOM_PAGE_WRAP = """function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: __NAME_JSON__ }]} />
      <ToolHero h1={__H1__} intro={__INTRO__} keywords={KW} />
      __INNER__
      <HowToUse heading={__HOW_HEADING__} steps={STEPS} />
      <AeoBlock question={__AEO_Q__} answer={__AEO_A__} keywords={KW} />
      <GeoBlock heading={"USA use cases"} keywords={KW} items={__GEO__} />
      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />
      <ContextualLinks heading="Related link generators" links={__RELATED__} />
      <BackToHomeLink />
    </ToolLayout>
  );
}"""

NAME_MAP = {t["slug"]: t["name"] for t in T}

def j(obj): return json.dumps(obj, ensure_ascii=False)

def render(spec):
    extra = []
    if spec.get("preview"): extra.append(f'preview={j(spec["preview"])}')
    if spec.get("outputLabel"): extra.append(f'outputLabel={j(spec["outputLabel"])}')
    if spec.get("multiline"): extra.append('multiline')
    related = [{"to":"/"+s,"anchor":NAME_MAP.get(s, s.replace("-"," ").title()),"blurb":"related link generator."} for s in spec["related"]]
    title = f'{spec["name"]} — Free Online Tool'
    # Trim description to ~150 chars
    desc = (spec["intro"][:155]).rstrip()
    if spec.get("custom_page"):
        # custom_page is a full Page function string; we need to extract its <return> body — simpler: replace entire Page with custom string
        page_block = spec["custom_page"]
        # but still need outer ToolLayout wrappers around custom card + standard sections
        # Use CUSTOM_PAGE_WRAP and replace __INNER__ with what's inside the <> fragment
        inner = re.search(r"<>\s*(.*?)\s*</>", spec["custom_page"], re.S)
        inner_str = inner.group(1) if inner else ""
        page = (CUSTOM_PAGE_WRAP
            .replace("__NAME__", spec["name"])
            .replace("__H1__", spec["h1"])
            .replace("__INTRO__", spec["intro"])
            .replace("__INNER__", inner_str)
            .replace("__NAME_LOWER__", spec["name"].lower())
            .replace("__AEO_Q__", spec["aeoQ"])
            .replace("__AEO_A__", spec["aeoA"])
            .replace("__GEO__", j([{"who":w,"how":h} for w,h in spec["geo"]]))
            .replace("__RELATED__", j(related)))
    else:
        page = (DEFAULT_PAGE
            .replace("__NAME__", spec["name"])
            .replace("__H1__", spec["h1"])
            .replace("__INTRO__", spec["intro"])
            .replace("__FIELDS__", j(spec["fields"]))
            .replace("__BUILD__", spec["build"])
            .replace("__EXTRA_PROPS__", " ".join(extra))
            .replace("__NAME_LOWER__", spec["name"].lower())
            .replace("__AEO_Q__", spec["aeoQ"])
            .replace("__AEO_A__", spec["aeoA"])
            .replace("__GEO__", j([{"who":w,"how":h} for w,h in spec["geo"]]))
            .replace("__RELATED__", j(related)))
    imports = "import { useState } from \"react\";" if spec.get("custom_page") else ""
    out = (TEMPLATE
        .replace("__IMPORTS__", imports)
        .replace("__SLUG__", spec["slug"])
        .replace("__FAQS__", j([{"q":q,"a":a} for q,a in spec["faqs"]]))
        .replace("__STEPS__", j(spec["steps"]))
        .replace("__TITLE__", title)
        .replace("__DESC__", desc)
        .replace("__NAME__", spec["name"])
        .replace("__PAGE__", page))
    return out

for spec in T:
    p = ROUTES / f"{spec['slug']}.tsx"
    p.write_text(render(spec))
    print("wrote", p.name)

print(f"\n{len(T)} routes regenerated.")
