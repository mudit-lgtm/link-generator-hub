#!/usr/bin/env python3
"""Generate 20 tool pages (Tier 1 + Tier 2) + update seo-keywords.ts + ToolLayout TOOLS array."""
import pathlib, json, re

ROUTES = pathlib.Path("src/routes")
SEO_FILE = pathlib.Path("src/lib/seo-keywords.ts")
LAYOUT_FILE = pathlib.Path("src/components/ToolLayout.tsx")

# ---------------- Tool definitions ----------------
TOOLS = [
  # ---------- TIER 1 ----------
  {
    "slug": "discord-invite-link-generator",
    "name": "Discord Invite Link Generator",
    "short": "Discord Invite",
    "icon": "🟣",
    "accent": "from-indigo-500 to-purple-600",
    "primary": "discord invite link generator",
    "keywords": ["discord invite link generator","discord link generator","discord server link generator","custom discord invite link","permanent discord invite","discord vanity link generator","free discord invite link generator"],
    "blurb": "Custom Discord server invite links with vanity codes.",
    "title": "Discord Invite Link Generator — Free Custom Server Invites",
    "desc": "Free Discord invite link generator. Build custom discord server invite links with vanity codes — works for permanent invites, vanity URLs and server promos.",
    "input_label": "Discord server ID or vanity code",
    "input_default": "linkkit",
    "format": "https://discord.gg/{{value}}",
    "geo": [
      ("Gaming community in Austin, TX", "Spins up vanity Discord invite links for every Twitch raid event."),
      ("Crypto group in Miami, FL", "Uses the Discord server link generator with a permanent invite for the pinned tweet."),
      ("Edu-creator in Brooklyn, NY", "Generates a custom Discord invite link for each cohort intake."),
      ("Esports team in Los Angeles, CA", "Drops the Discord vanity link generator URL on their TikTok bio."),
    ],
    "aeo": ("What is a Discord invite link generator?",
      "A Discord invite link generator builds a custom discord.gg/{code} URL with an optional vanity code so members can join your server in one click. The free Discord invite link generator above creates permanent invite links that work on web, desktop and mobile Discord apps."),
  },
  {
    "slug": "zoom-meeting-link-generator",
    "name": "Zoom Meeting Link Generator",
    "short": "Zoom Link",
    "icon": "🎥",
    "accent": "from-blue-400 to-sky-600",
    "primary": "zoom meeting link generator",
    "keywords": ["zoom meeting link generator","zoom link generator","zoom invite link generator","zoom meeting url generator","free zoom link generator","custom zoom meeting link","zoom join link generator"],
    "blurb": "Build shareable Zoom meeting join links.",
    "title": "Zoom Meeting Link Generator — Free Join URL Builder",
    "desc": "Free Zoom meeting link generator. Build a zoom.us join URL from any meeting ID with an optional passcode — perfect for invitations, calendar events and email signatures.",
    "input_label": "Zoom meeting ID",
    "input_default": "84512345678",
    "format": "https://zoom.us/j/{{value}}",
    "geo": [
      ("Sales team in Atlanta, GA", "Pre-builds Zoom meeting links for every demo slot and pastes into HubSpot sequences."),
      ("Online coach in Phoenix, AZ", "Generates a Zoom join link for each weekly group call."),
      ("Recruiter in Chicago, IL", "Drops the Zoom meeting URL into Calendly auto-emails for interview confirmations."),
      ("University TA in Boston, MA", "Adds the Zoom invite link to the syllabus PDF for office hours."),
    ],
    "aeo": ("What is a Zoom meeting link generator?",
      "A Zoom meeting link generator turns a meeting ID and optional passcode into a clean zoom.us/j/{id} join URL. The free Zoom link generator above is perfect for invitations, Google Calendar events, email signatures and SMS reminders."),
  },
  {
    "slug": "google-meet-link-generator",
    "name": "Google Meet Link Generator",
    "short": "Google Meet",
    "icon": "📹",
    "accent": "from-emerald-400 to-green-600",
    "primary": "google meet link generator",
    "keywords": ["google meet link generator","meet.google.com link generator","google meet invite link","custom google meet link","free google meet link generator","google meet url generator","instant google meet link"],
    "blurb": "Generate meet.google.com instant meeting links.",
    "title": "Google Meet Link Generator — Free Instant Meeting URLs",
    "desc": "Free Google Meet link generator. Build a meet.google.com link from any meeting code — instant meetings, team standups and 1:1 invites in seconds.",
    "input_label": "Meeting code (10 chars, dashes optional)",
    "input_default": "abc-defg-hij",
    "format": "https://meet.google.com/{{value}}",
    "geo": [
      ("Startup founder in San Francisco, CA", "Generates Google Meet links for investor intros and drops them into the email template."),
      ("HR manager in Dallas, TX", "Uses the Google Meet link generator for daily standups across remote teams."),
      ("Tutor in Seattle, WA", "Sends a fresh google.com/meet link to every student via SMS before each session."),
      ("Consultant in Denver, CO", "Embeds the Google Meet invite link in proposal PDFs for kickoff calls."),
    ],
    "aeo": ("What is a Google Meet link generator?",
      "A Google Meet link generator turns a meeting code into a meet.google.com/{code} URL that opens an instant Google Meet call. The free Google Meet link generator above works for standups, sales demos, tutoring sessions and any quick video chat — no Google Workspace setup required."),
  },
  {
    "slug": "teams-meeting-link-generator",
    "name": "Microsoft Teams Link Generator",
    "short": "Teams Link",
    "icon": "💠",
    "accent": "from-blue-500 to-indigo-600",
    "primary": "teams meeting link generator",
    "keywords": ["teams meeting link generator","microsoft teams link generator","teams invite link generator","ms teams meeting link","teams join link generator","free teams meeting link","teams.microsoft.com link generator"],
    "blurb": "Microsoft Teams meeting & join URL builder.",
    "title": "Microsoft Teams Meeting Link Generator — Free Join URL",
    "desc": "Free Microsoft Teams meeting link generator. Build a teams.microsoft.com join URL from any meeting thread — works for Teams invites, calendar events and email signatures.",
    "input_label": "Teams meeting thread ID",
    "input_default": "19:meeting_ABC123@thread.v2",
    "format": "https://teams.microsoft.com/l/meetup-join/{{encoded}}/0",
    "encode": True,
    "geo": [
      ("Enterprise IT in NYC", "Pre-builds Teams meeting links for every ticket triage call."),
      ("Insurance agent in Hartford, CT", "Uses the Microsoft Teams link generator for client policy reviews."),
      ("Federal contractor in DC", "Sends Teams invite links via Outlook for cleared-team standups."),
      ("Hospital admin in Cleveland, OH", "Adds the Teams join link to interdepartmental meeting agendas."),
    ],
    "aeo": ("What is a Teams meeting link generator?",
      "A Teams meeting link generator builds a teams.microsoft.com/l/meetup-join URL from a meeting thread ID. The free Microsoft Teams link generator above works for Outlook invites, calendar events and email signatures across enterprise environments."),
  },
  {
    "slug": "payment-link-generator",
    "name": "Payment Link Generator",
    "short": "Payment Link",
    "icon": "💳",
    "accent": "from-emerald-500 to-teal-600",
    "primary": "payment link generator",
    "keywords": ["payment link generator","stripe payment link generator","online payment link generator","custom payment link","invoice payment link","free payment link generator","accept payment link"],
    "blurb": "Build hosted Stripe-style payment request links.",
    "title": "Payment Link Generator — Free Stripe-Style Checkout URLs",
    "desc": "Free payment link generator. Build hosted checkout URLs with amount, currency and description — works as a Stripe payment link generator alternative for invoices and quick sales.",
    "input_label": "Amount (USD)",
    "input_default": "99.00",
    "format": "https://pay.linkkit.dev/?amount={{value}}&currency=USD",
    "geo": [
      ("Freelance designer in Brooklyn, NY", "Generates payment links for milestone invoices in the proposal."),
      ("Bakery in Portland, OR", "Drops the online payment link in Instagram DMs for custom cake orders."),
      ("Consultant in Miami, FL", "Uses the custom payment link in onboarding emails to collect retainers fast."),
      ("Tutor in Austin, TX", "Sends an invoice payment link via SMS after each lesson."),
    ],
    "aeo": ("What is a payment link generator?",
      "A payment link generator builds a hosted checkout URL with amount, currency and description so customers can pay in one tap. The free payment link generator above works as a Stripe payment link generator alternative for freelancers, agencies and small businesses."),
  },
  {
    "slug": "paypal-me-link-generator",
    "name": "PayPal.Me Link Generator",
    "short": "PayPal.Me",
    "icon": "🅿️",
    "accent": "from-sky-500 to-blue-700",
    "primary": "paypal.me link generator",
    "keywords": ["paypal.me link generator","paypal link generator","paypal payment link generator","custom paypal.me link","paypal me url generator","free paypal link generator","paypal request link"],
    "blurb": "Custom PayPal.Me payment request URLs.",
    "title": "PayPal.Me Link Generator — Free Custom Payment Request URL",
    "desc": "Free PayPal.Me link generator. Build paypal.me/yourname/amount URLs with currency for instant payment requests — perfect for invoices, tips and quick collections.",
    "input_label": "PayPal.Me username",
    "input_default": "linkkit",
    "amount_field": True,
    "format": "https://paypal.me/{{value}}/{{amount}}USD",
    "geo": [
      ("Wedding photographer in Charleston, SC", "Sends PayPal.Me links via text for deposit collection."),
      ("Twitch streamer in Las Vegas, NV", "Pastes the paypal.me link generator URL in chat for tip jars."),
      ("Etsy seller in Brooklyn, NY", "Uses the PayPal link generator for custom order pre-payments."),
      ("Tutor in Atlanta, GA", "Drops the paypal request link in lesson confirmation emails."),
    ],
    "aeo": ("What is a PayPal.Me link generator?",
      "A PayPal.Me link generator builds a paypal.me/{username}/{amount} URL that opens PayPal's payment screen pre-filled with your amount and currency. The free PayPal.Me link generator above is perfect for freelancers, streamers, tutors and side-hustlers in the USA."),
  },
  {
    "slug": "instagram-link-generator",
    "name": "Instagram Link Generator",
    "short": "Instagram",
    "icon": "📸",
    "accent": "from-fuchsia-500 to-pink-600",
    "primary": "instagram link generator",
    "keywords": ["instagram link generator","instagram profile link generator","instagram dm link generator","instagram story link","custom instagram link","instagram bio link generator","free instagram link generator"],
    "blurb": "Profile, DM and story-share Instagram URLs.",
    "title": "Instagram Link Generator — Free Profile, DM & Story URL Builder",
    "desc": "Free Instagram link generator. Build instagram.com/{username} profile URLs, DM links and share links — perfect for bios, link-in-bio pages and creator promos.",
    "input_label": "Instagram @username",
    "input_default": "linkkit",
    "format": "https://instagram.com/{{value}}",
    "geo": [
      ("Influencer in Los Angeles, CA", "Generates Instagram profile links for every brand-partnership media kit."),
      ("Med-spa in Miami, FL", "Drops the Instagram DM link generator URL in Google review responses."),
      ("Yoga studio in Austin, TX", "Uses the custom Instagram link in their Google Business Profile."),
      ("Restaurant in Brooklyn, NY", "Prints the Instagram bio link QR code on table tents."),
    ],
    "aeo": ("What is an Instagram link generator?",
      "An Instagram link generator builds an instagram.com/{username} or DM URL for use in bios, link-in-bio pages, Google Business profiles and offline QR codes. The free Instagram link generator above works for profile share, story share and direct-message deep links."),
  },
  {
    "slug": "facebook-share-link-generator",
    "name": "Facebook Share Link Generator",
    "short": "FB Share",
    "icon": "👥",
    "accent": "from-blue-600 to-indigo-700",
    "primary": "facebook share link generator",
    "keywords": ["facebook share link generator","facebook link generator","facebook share url generator","fb share link","facebook share button link","custom facebook share link","free facebook share link generator"],
    "blurb": "Facebook share dialog URLs for any page.",
    "title": "Facebook Share Link Generator — Free Share Dialog URL",
    "desc": "Free Facebook share link generator. Build facebook.com/sharer URLs that open the share dialog pre-filled with any URL — perfect for share buttons, blog CTAs and viral promos.",
    "input_label": "URL to share",
    "input_default": "https://example.com/article",
    "format": "https://www.facebook.com/sharer/sharer.php?u={{encoded}}",
    "encode": True,
    "geo": [
      ("Blogger in Austin, TX", "Adds a Facebook share button link to every WordPress post."),
      ("News site in Washington, DC", "Embeds the Facebook share URL generator output in article footers."),
      ("E-commerce store in Brooklyn, NY", "Drops the FB share link in post-purchase emails for referral lift."),
      ("Non-profit in Atlanta, GA", "Uses the custom Facebook share link in donation thank-you pages."),
    ],
    "aeo": ("What is a Facebook share link generator?",
      "A Facebook share link generator builds a facebook.com/sharer URL that opens Facebook's share dialog pre-filled with your page URL. The free Facebook share link generator above powers share buttons on blogs, e-commerce stores and news sites without loading the FB SDK."),
  },
  {
    "slug": "telegram-link-generator",
    "name": "Telegram Link Generator",
    "short": "Telegram",
    "icon": "✈️",
    "accent": "from-sky-400 to-cyan-600",
    "primary": "telegram link generator",
    "keywords": ["telegram link generator","t.me link generator","telegram channel link generator","telegram group invite link","telegram bot link generator","custom telegram link","free telegram link generator"],
    "blurb": "t.me channel, group & bot invite URLs.",
    "title": "Telegram Link Generator — Free t.me Channel & Bot URL Builder",
    "desc": "Free Telegram link generator. Build t.me/username channel, group and bot URLs with optional start parameters — perfect for crypto, gaming and creator communities.",
    "input_label": "Telegram username or channel",
    "input_default": "linkkit",
    "format": "https://t.me/{{value}}",
    "geo": [
      ("Crypto project in Miami, FL", "Pastes the t.me link generator output in every tweet for community joins."),
      ("Trading signals group in NYC", "Uses the Telegram channel link generator for subscription onboarding."),
      ("Bot developer in Seattle, WA", "Builds Telegram bot link generator URLs with start params for user attribution."),
      ("Investor in Los Angeles, CA", "Drops the custom Telegram link in pitch-deck appendices."),
    ],
    "aeo": ("What is a Telegram link generator?",
      "A Telegram link generator builds a t.me/{username} URL for joining channels, groups or starting bots. The free Telegram link generator above supports start parameters for bot attribution and custom invite codes."),
  },
  {
    "slug": "linkedin-link-generator",
    "name": "LinkedIn Link Generator",
    "short": "LinkedIn",
    "icon": "in",
    "accent": "from-blue-700 to-sky-700",
    "primary": "linkedin link generator",
    "keywords": ["linkedin link generator","linkedin profile link generator","linkedin share link generator","linkedin company link generator","custom linkedin link","linkedin url generator","free linkedin link generator"],
    "blurb": "Profile, company & share LinkedIn URLs.",
    "title": "LinkedIn Link Generator — Free Profile & Share URL Builder",
    "desc": "Free LinkedIn link generator. Build linkedin.com/in/{username} profile URLs, company pages and share links — perfect for email signatures, resumes and CTAs.",
    "input_label": "LinkedIn vanity name (linkedin.com/in/...)",
    "input_default": "linkkit",
    "format": "https://linkedin.com/in/{{value}}",
    "geo": [
      ("Recruiter in NYC", "Generates LinkedIn profile links to drop into Greenhouse candidate notes."),
      ("B2B SaaS founder in San Francisco, CA", "Uses the LinkedIn share link generator on every blog post."),
      ("Sales rep in Chicago, IL", "Adds the custom LinkedIn link to email signatures across the team."),
      ("Job seeker in Austin, TX", "Pastes the LinkedIn URL generator output on resume PDFs."),
    ],
    "aeo": ("What is a LinkedIn link generator?",
      "A LinkedIn link generator builds a linkedin.com/in/{vanity} profile URL, linkedin.com/company/{slug} page URL or LinkedIn share dialog URL. The free LinkedIn link generator above is perfect for resumes, email signatures and B2B share buttons."),
  },

  # ---------- TIER 2 ----------
  {
    "slug": "google-drive-direct-link-generator",
    "name": "Google Drive Direct Link Generator",
    "short": "Drive Direct",
    "icon": "📁",
    "accent": "from-yellow-400 to-amber-600",
    "primary": "google drive direct download link generator",
    "keywords": ["google drive direct download link generator","google drive direct link generator","drive direct download link","google drive image direct link","gdrive direct link generator","convert google drive link to direct","free google drive direct link generator"],
    "blurb": "Convert Google Drive shares to direct downloads.",
    "title": "Google Drive Direct Download Link Generator — Free",
    "desc": "Free Google Drive direct download link generator. Convert a Drive share URL into a direct download link that bypasses the preview page — works for images, PDFs and any file.",
    "input_label": "Google Drive share URL",
    "input_default": "https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I/view?usp=sharing",
    "format": "https://drive.google.com/uc?export=download&id={{driveId}}",
    "drive": True,
    "geo": [
      ("E-commerce store in Brooklyn, NY", "Hot-links product spec PDFs from Google Drive using the direct download URL."),
      ("WordPress blogger in Austin, TX", "Embeds Google Drive direct image links in posts instead of re-uploading."),
      ("Course creator in Denver, CO", "Sends Drive direct download links in onboarding emails for course resources."),
      ("Designer in Miami, FL", "Shares Google Drive image direct links so clients see previews without signing in."),
    ],
    "aeo": ("What is a Google Drive direct download link generator?",
      "A Google Drive direct download link generator converts a Drive share URL into a direct download link of the form drive.google.com/uc?export=download&id={id}. The free Google Drive direct link generator above bypasses the preview page so files download in one click."),
  },
  {
    "slug": "dropbox-direct-link-generator",
    "name": "Dropbox Direct Link Generator",
    "short": "Dropbox Direct",
    "icon": "📦",
    "accent": "from-blue-500 to-indigo-600",
    "primary": "dropbox direct link generator",
    "keywords": ["dropbox direct link generator","dropbox direct download link","dropbox hot link generator","dropbox raw link generator","convert dropbox link to direct","free dropbox direct link generator","dropbox image direct link"],
    "blurb": "Convert Dropbox shares to direct downloads.",
    "title": "Dropbox Direct Link Generator — Free Direct Download URL",
    "desc": "Free Dropbox direct link generator. Convert a Dropbox share URL into a direct download link by swapping ?dl=0 for ?dl=1 — works for images, PDFs and zip files.",
    "input_label": "Dropbox share URL",
    "input_default": "https://www.dropbox.com/s/abc123/photo.jpg?dl=0",
    "format": "{{dropbox}}",
    "dropbox": True,
    "geo": [
      ("Wedding photographer in Charleston, SC", "Sends Dropbox direct download links to clients so galleries download in one tap."),
      ("Podcast producer in Nashville, TN", "Uses the Dropbox raw link generator for hot-linked MP3 episodes."),
      ("Designer in Brooklyn, NY", "Shares Dropbox image direct links in Figma comments for client review."),
      ("Marketing team in Chicago, IL", "Embeds Dropbox direct links in Notion docs for campaign assets."),
    ],
    "aeo": ("What is a Dropbox direct link generator?",
      "A Dropbox direct link generator converts a Dropbox share URL ending in ?dl=0 into a direct download URL ending in ?dl=1. The free Dropbox direct link generator above is perfect for hot-linked images, PDFs and audio files in blogs, podcasts and client deliverables."),
  },
  {
    "slug": "onedrive-direct-link-generator",
    "name": "OneDrive Direct Link Generator",
    "short": "OneDrive Direct",
    "icon": "☁️",
    "accent": "from-sky-500 to-blue-600",
    "primary": "onedrive direct link generator",
    "keywords": ["onedrive direct link generator","onedrive direct download link","onedrive embed link generator","sharepoint direct link","convert onedrive link to direct","free onedrive direct link generator","onedrive image direct link"],
    "blurb": "Convert OneDrive shares to direct downloads.",
    "title": "OneDrive Direct Link Generator — Free Direct Download URL",
    "desc": "Free OneDrive direct link generator. Convert a 1drv.ms or onedrive.live.com share into a direct download URL — works for images, PDFs and Office files across personal and business OneDrive.",
    "input_label": "OneDrive share URL",
    "input_default": "https://1drv.ms/u/s!Abc123XYZ",
    "format": "{{value}}&download=1",
    "geo": [
      ("Enterprise IT in Seattle, WA", "Generates OneDrive direct download links for software deployment manifests."),
      ("Accountant in Dallas, TX", "Uses the OneDrive direct link generator for client tax-form delivery."),
      ("Architect in Boston, MA", "Sends SharePoint direct links to contractors for DWG file access."),
      ("Teacher in Phoenix, AZ", "Embeds OneDrive image direct links in Canvas course pages."),
    ],
    "aeo": ("What is a OneDrive direct link generator?",
      "A OneDrive direct link generator converts a OneDrive or SharePoint share URL into a direct download link by appending &download=1. The free OneDrive direct link generator above works for personal OneDrive (1drv.ms) and OneDrive for Business / SharePoint."),
  },
  {
    "slug": "mega-link-generator",
    "name": "MEGA Link Generator",
    "short": "MEGA Link",
    "icon": "🅼",
    "accent": "from-red-500 to-rose-600",
    "primary": "mega link generator",
    "keywords": ["mega link generator","mega.nz link generator","mega download link generator","mega folder link generator","free mega link generator","mega cloud link generator","mega share link generator"],
    "blurb": "MEGA.nz share & folder link formatter.",
    "title": "MEGA Link Generator — Free MEGA.nz Share URL Builder",
    "desc": "Free MEGA link generator. Format mega.nz file and folder share links with embedded decryption keys — perfect for archive sharing and large-file delivery.",
    "input_label": "MEGA file ID",
    "input_default": "ABC123DEF",
    "key_field": True,
    "format": "https://mega.nz/file/{{value}}#{{key}}",
    "geo": [
      ("Open-source maintainer in Austin, TX", "Hosts large nightly builds on MEGA and shares the mega.nz link in release notes."),
      ("YouTuber in Los Angeles, CA", "Uses the MEGA link generator for project files attached to tutorials."),
      ("Indie game dev in Seattle, WA", "Drops MEGA folder links in itch.io devlogs for asset packs."),
      ("Music producer in Brooklyn, NY", "Sends MEGA share links to collaborators for stems and project sessions."),
    ],
    "aeo": ("What is a MEGA link generator?",
      "A MEGA link generator builds mega.nz/file/{id}#{key} or mega.nz/folder/{id}#{key} URLs with the embedded decryption key. The free MEGA link generator above is perfect for sharing large files, indie game assets and archived projects."),
  },
  {
    "slug": "pdf-link-generator",
    "name": "PDF Link Generator",
    "short": "PDF Link",
    "icon": "📄",
    "accent": "from-rose-500 to-red-600",
    "primary": "pdf link generator",
    "keywords": ["pdf link generator","direct pdf link generator","pdf download link generator","pdf url generator","embed pdf link","free pdf link generator","pdf share link generator"],
    "blurb": "Build direct download links for PDF files.",
    "title": "PDF Link Generator — Free Direct PDF Download URL Builder",
    "desc": "Free PDF link generator. Build direct download or inline-view URLs for any hosted PDF — perfect for lead magnets, whitepapers, course handouts and invoices.",
    "input_label": "PDF file URL",
    "input_default": "https://example.com/whitepaper.pdf",
    "format": "{{value}}#view=FitH",
    "geo": [
      ("B2B SaaS marketer in Austin, TX", "Uses the PDF link generator to gate whitepapers behind a download CTA."),
      ("Lawyer in NYC", "Sends direct PDF links via email for engagement-letter signing."),
      ("Realtor in Phoenix, AZ", "Shares PDF download links for property fact sheets via SMS."),
      ("Course creator in Denver, CO", "Embeds inline PDF view URLs in the LMS for handouts."),
    ],
    "aeo": ("What is a PDF link generator?",
      "A PDF link generator builds direct download URLs (or inline #view=FitH viewer URLs) for hosted PDF files. The free PDF link generator above is perfect for lead magnets, whitepapers, invoices and course handouts shared via email or SMS."),
  },
  {
    "slug": "image-link-generator",
    "name": "Image Link Generator",
    "short": "Image Link",
    "icon": "🖼️",
    "accent": "from-pink-400 to-fuchsia-600",
    "primary": "image link generator",
    "keywords": ["image link generator","direct image link generator","image url generator","photo link generator","hotlink image generator","free image link generator","image share link generator"],
    "blurb": "Direct image hotlink & share URL builder.",
    "title": "Image Link Generator — Free Direct Image URL Builder",
    "desc": "Free image link generator. Build direct hotlink URLs for any hosted image — perfect for forum signatures, Discord embeds, README previews and email banners.",
    "input_label": "Image URL",
    "input_default": "https://example.com/photo.jpg",
    "format": "{{value}}",
    "geo": [
      ("Open-source maintainer in Seattle, WA", "Generates direct image links for GitHub README badges and screenshots."),
      ("Forum moderator in Chicago, IL", "Uses the image hotlink generator for user signature graphics."),
      ("Designer in Brooklyn, NY", "Pastes direct image URLs in Slack & Discord channels for client review."),
      ("Email marketer in Austin, TX", "Embeds image link generator output in MJML templates for hero banners."),
    ],
    "aeo": ("What is an image link generator?",
      "An image link generator returns a direct URL to a hosted image so it can be hotlinked in Markdown, HTML, forum posts, Discord embeds and email templates. The free image link generator above validates the URL and copies it ready-to-paste."),
  },
  {
    "slug": "audio-link-generator",
    "name": "Audio Link Generator",
    "short": "Audio Link",
    "icon": "🎵",
    "accent": "from-purple-500 to-pink-600",
    "primary": "audio link generator",
    "keywords": ["audio link generator","mp3 link generator","direct audio link generator","podcast link generator","audio url generator","free audio link generator","audio share link generator"],
    "blurb": "MP3 & podcast direct download URLs.",
    "title": "Audio Link Generator — Free MP3 & Podcast URL Builder",
    "desc": "Free audio link generator. Build direct MP3 download or stream URLs for hosted audio files — perfect for podcasts, voice notes, music drops and audio messages.",
    "input_label": "Audio file URL (MP3, M4A, OGG)",
    "input_default": "https://example.com/episode-01.mp3",
    "format": "{{value}}",
    "geo": [
      ("Podcast producer in Nashville, TN", "Uses the audio link generator to embed episode MP3s in show notes."),
      ("Voice-over artist in Los Angeles, CA", "Sends MP3 link generator URLs to clients for demo reels."),
      ("Indie musician in Austin, TX", "Drops direct audio links in Discord servers for fan previews."),
      ("Coach in Miami, FL", "Generates audio share links for client homework recordings."),
    ],
    "aeo": ("What is an audio link generator?",
      "An audio link generator returns a direct URL to a hosted audio file (MP3, M4A, OGG, WAV) so it can be streamed, downloaded or embedded. The free audio link generator above is perfect for podcasters, voice-over artists, musicians and coaches."),
  },
  {
    "slug": "video-link-generator",
    "name": "Video Link Generator",
    "short": "Video Link",
    "icon": "🎬",
    "accent": "from-red-500 to-orange-600",
    "primary": "video link generator",
    "keywords": ["video link generator","direct video link generator","mp4 link generator","video url generator","video share link generator","free video link generator","embed video link"],
    "blurb": "Direct MP4 / video share URL builder.",
    "title": "Video Link Generator — Free Direct MP4 & Share URL",
    "desc": "Free video link generator. Build direct MP4 download or stream URLs for hosted video files — perfect for testimonials, product demos, course videos and DM previews.",
    "input_label": "Video file URL (MP4, WebM, MOV)",
    "input_default": "https://example.com/demo.mp4",
    "format": "{{value}}",
    "geo": [
      ("SaaS marketer in San Francisco, CA", "Uses the video link generator to attach product demos in cold emails."),
      ("Real-estate agent in Miami, FL", "Sends MP4 link generator URLs via SMS for property walkthroughs."),
      ("Course creator in Denver, CO", "Generates direct video links for paid downloads outside the LMS."),
      ("Recruiter in NYC", "Drops video share links in LinkedIn DMs for role intros."),
    ],
    "aeo": ("What is a video link generator?",
      "A video link generator returns a direct URL to a hosted video file (MP4, WebM, MOV) so it can be streamed, embedded or downloaded. The free video link generator above is perfect for product demos, course videos, real-estate walkthroughs and client testimonials."),
  },
  {
    "slug": "magnet-link-generator",
    "name": "Magnet Link Generator",
    "short": "Magnet",
    "icon": "🧲",
    "accent": "from-zinc-500 to-slate-700",
    "primary": "magnet link generator",
    "keywords": ["magnet link generator","torrent magnet link generator","magnet url generator","free magnet link generator","magnet link from hash","convert torrent to magnet","custom magnet link"],
    "blurb": "Build magnet URIs from BitTorrent info hashes.",
    "title": "Magnet Link Generator — Free Torrent Magnet URI Builder",
    "desc": "Free magnet link generator. Build a magnet: URI from a BitTorrent info hash with display name and trackers — perfect for distributing legal torrents, public datasets and open-source ISOs.",
    "input_label": "BitTorrent info hash (40 hex or base32)",
    "input_default": "C9E15763F722F23E98A29DECDFAE341B98D53056",
    "name_field": True,
    "format": "magnet:?xt=urn:btih:{{value}}&dn={{name}}&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337",
    "geo": [
      ("Open-source community in San Francisco, CA", "Distributes Linux ISOs with the magnet link generator URI in release notes."),
      ("Researcher in Boston, MA", "Shares public datasets via magnet links on academic mailing lists."),
      ("Indie game dev in Seattle, WA", "Uses the torrent magnet link generator for free demo distribution."),
      ("Archivist in Austin, TX", "Generates magnet URIs for the Internet Archive collection mirrors."),
    ],
    "aeo": ("What is a magnet link generator?",
      "A magnet link generator builds a magnet:?xt=urn:btih:{hash} URI with display name and tracker parameters. The free magnet link generator above is perfect for legal torrent distribution — Linux ISOs, public datasets, open-source releases and indie game demos."),
  },
  {
    "slug": "direct-download-link-generator",
    "name": "Direct Download Link Generator",
    "short": "Direct Download",
    "icon": "⬇️",
    "accent": "from-emerald-500 to-green-700",
    "primary": "direct download link generator",
    "keywords": ["direct download link generator","direct link generator","force download link","direct file link generator","free direct download link generator","ddl link generator","instant download link generator"],
    "blurb": "Force-download URLs for any hosted file.",
    "title": "Direct Download Link Generator — Free Force-Download URLs",
    "desc": "Free direct download link generator. Build force-download URLs for any hosted file by adding response-content-disposition — perfect for one-click downloads of PDFs, ZIPs and installers.",
    "input_label": "File URL",
    "input_default": "https://example.com/installer.zip",
    "filename_field": True,
    "format": "{{value}}?response-content-disposition=attachment%3Bfilename%3D{{filename}}",
    "geo": [
      ("Software vendor in Austin, TX", "Uses the direct download link generator for one-click Windows installer downloads."),
      ("Course creator in Denver, CO", "Generates direct file links for ZIP bundles emailed after checkout."),
      ("Game studio in Seattle, WA", "Drops the DDL link generator URL in Discord for demo builds."),
      ("Marketing team in Brooklyn, NY", "Sends instant download links for media kits via cold outreach."),
    ],
    "aeo": ("What is a direct download link generator?",
      "A direct download link generator builds a URL that triggers an immediate file download instead of opening the file in the browser. The free direct download link generator above works for PDFs, ZIPs, installers and any hosted file by setting response-content-disposition to attachment."),
  },
]

# ---------------- Templates ----------------

PAGE_TPL = '''import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {{
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
}} from "@/components/tool-ui";
import {{ SEO }} from "@/lib/seo-keywords";

const KW = SEO["{path}"].keywords;

const FAQS = [
{faqs}
];

const TITLE = {title_json};
const DESC = {desc_json};

export const Route = createFileRoute("{path}")({{
  head: () => buildHead({{
    title: TITLE, description: DESC, path: "{path}",
    name: "{name}", faqs: FAQS,
    breadcrumbs: [{{ name: "Link Generator", item: "/" }}, {{ name: "{name}", item: "{path}" }}],
  }}),
  component: Page,
}});

function Page() {{
{state}
  const out = useMemo(() => {{
{logic}
  }}, [{deps}]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={{[{{ label: "Link Generator", to: "/" }}, {{ label: "{name}" }}]}} />
      <ToolHero
        h1={hero_h1_json}
        intro={hero_intro_json}
        keywords={{KW}}
      />

      <ToolCard>
{fields}
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your {primary} URL</span>
          <OutputBlock value={{out}} />
        </div>
      </ToolCard>

      <HowToUse
        heading={howto_heading_json}
        steps={{[
{steps}
        ]}}
      />

      <AeoBlock
        question={aeo_q_json}
        answer={aeo_a_json}
        keywords={{KW}}
      />

      <GeoBlock
        heading={geo_heading_json}
        keywords={{KW}}
        items={{[
{geo_items}
        ]}}
      />

      <SeoLongform keywords={{KW}} sections={{[
{seo_sections}
      ]}} />

      <FaqSection items={{FAQS}} keywords={{KW}} heading={faq_heading_json} />

      <ContextualLinks
        heading="Related link generators"
        links={{[
          {{ to: "/", anchor: "Link Generator Hub", blurb: "browse every free link generator." }},
          {{ to: "/short-link-generator", anchor: "Short Link Generator", blurb: "shorten the URL above for SMS, bios and QR codes." }},
          {{ to: "/qr-code-link-generator", anchor: "QR Code Link Generator", blurb: "convert your link into a downloadable QR code." }},
          {{ to: "/premium-link-generator", anchor: "Premium Link Generator", blurb: "Rapidgator, Turbobit and Nitroflare premium downloads." }},
        ]}}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}}
'''


def make_faqs(t):
  p = t["primary"]
  name = t["name"]
  return [
    {"q": f"What is a {p}?", "a": t["aeo"][1]},
    {"q": f"How do I use this {p}?", "a": f"Fill the field above and the {name} builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The {p} runs entirely in your browser; no signup required."},
    {"q": f"Is the {p} free?", "a": f"Yes, this {p} is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets."},
    {"q": f"Does the {p} work on mobile?", "a": f"Yes — the {p} is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go."},
    {"q": f"Can I use the {p} for commercial projects?", "a": f"Yes. Output from the {p} is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products."},
    {"q": f"Does the {p} store my data?", "a": f"No. The {p} runs entirely in your browser. Your input is never sent to a server, never logged and never shared."},
    {"q": f"What's the difference between the {p} and a paid tool?", "a": f"Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free {p} above is enough."},
    {"q": f"Can I shorten the output of the {p}?", "a": f"Yes — paste the URL from the {p} into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use."},
  ]


def jsstr(s):
  return json.dumps(s, ensure_ascii=False)


def build_page(t):
  path = "/" + t["slug"]
  primary = t["primary"]
  name = t["name"]

  # state + logic + fields
  state_lines = [f'  const [value, setValue] = useState({jsstr(t["input_default"])});']
  field_lines = [f'        <Field label={jsstr(t["input_label"])}>\n          <input className={{inputCls}} value={{value}} onChange={{(e) => setValue(e.target.value)}} />\n        </Field>']
  deps = ["value"]
  logic_lines = []

  if t.get("amount_field"):
    state_lines.append('  const [amount, setAmount] = useState("25.00");')
    field_lines.append('        <Field label="Amount (USD)">\n          <input className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />\n        </Field>')
    deps.append("amount")
  if t.get("key_field"):
    state_lines.append('  const [key, setKey] = useState("XYZ987DECRYPTIONKEY");')
    field_lines.append('        <Field label="Decryption key (#key)">\n          <input className={inputCls} value={key} onChange={(e) => setKey(e.target.value)} />\n        </Field>')
    deps.append("key")
  if t.get("name_field"):
    state_lines.append('  const [name, setName] = useState("ubuntu-24.04-desktop-amd64.iso");')
    field_lines.append('        <Field label="Display name (dn)">\n          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />\n        </Field>')
    deps.append("name")
  if t.get("filename_field"):
    state_lines.append('  const [filename, setFilename] = useState("download.zip");')
    field_lines.append('        <Field label="Force download as filename">\n          <input className={inputCls} value={filename} onChange={(e) => setFilename(e.target.value)} />\n        </Field>')
    deps.append("filename")

  fmt = t["format"]
  if t.get("encode"):
    logic_lines.append('    const encoded = encodeURIComponent(value.trim());')
    fmt_js = fmt.replace("{{encoded}}", "${encoded}").replace("{{value}}", "${value.trim()}")
  elif t.get("drive"):
    logic_lines.append('    const m = value.match(/\\/d\\/([a-zA-Z0-9_-]+)/) || value.match(/id=([a-zA-Z0-9_-]+)/);')
    logic_lines.append('    const driveId = m ? m[1] : value.trim();')
    fmt_js = fmt.replace("{{driveId}}", "${driveId}")
  elif t.get("dropbox"):
    logic_lines.append('    if (!value.trim()) return "";')
    logic_lines.append('    return value.replace(/[?&]dl=0/, "?dl=1").replace(/^(https?:\\/\\/)www\\.dropbox\\.com/, "$1dl.dropboxusercontent.com").replace(/\\?dl=1.*/, "?dl=1");')
    fmt_js = None
  else:
    fmt_js = fmt
    for k in ("value","amount","key","name","filename"):
      fmt_js = fmt_js.replace("{{"+k+"}}", "${"+("encodeURIComponent("+k+".trim())" if k in ("amount","name","filename","key") else k+".trim()")+"}")

  if fmt_js is None:
    pass  # dropbox returned inline
  else:
    logic_lines.append(f'    if (!value.trim()) return "";')
    logic_lines.append(f'    return `{fmt_js}`;')

  # FAQs
  faqs = make_faqs(t)
  faqs_src = ",\n".join(f"  {{ q: {jsstr(f['q'])}, a: {jsstr(f['a'])} }}" for f in faqs)

  # Steps
  steps = [
    f"Fill the field above with your {t['input_label'].lower()}.",
    f"The {primary} builds the URL instantly as you type.",
    "Copy the result with one click.",
    "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works.",
  ]
  steps_src = ",\n".join("          " + jsstr(s) for s in steps)

  # GEO
  geo_items_src = ",\n".join(
    f'          {{ who: {jsstr(w)}, how: {jsstr(h)} }}' for w, h in t["geo"]
  )

  # SEO longform
  sections = [
    {
      "h2": f"Free {primary} — how it works",
      "p": [
        f"This free {primary} runs entirely in your browser. Fill the input above and the {name} builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable {primary}.",
        f"Pair this {primary} with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack.",
      ],
    },
    {
      "h2": f"When to use a {primary}",
      "p": [
        f"Use the {primary} any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The {primary} guarantees the URL is encoded correctly and works across browsers, devices and email clients.",
      ],
    },
    {
      "h2": f"{primary} vs paid alternatives",
      "p": [
        f"Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free {primary} above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters.",
      ],
    },
    {
      "h2": f"Tips to get more from the {primary}",
      "p": [
        f"Combine the {primary} with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards.",
      ],
    },
  ]
  sec_src = ",\n".join(
    "        {\n" +
    f"          h2: {jsstr(s['h2'])},\n" +
    "          paragraphs: [\n" +
    ",\n".join("            " + jsstr(p) for p in s["p"]) +
    "\n          ],\n        }"
    for s in sections
  )

  intro = f"Generate a {primary} URL in one click. This free {name} works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."

  page = PAGE_TPL.format(
    path=path,
    title_json=jsstr(t["title"]),
    desc_json=jsstr(t["desc"]),
    name=name,
    primary=primary,
    state="\n".join(state_lines),
    logic="\n".join(logic_lines),
    deps=", ".join(deps),
    fields="\n".join(field_lines),
    hero_h1_json=jsstr(t["title"].split(" — ")[0] + " — " + t["title"].split(" — ")[1]) if " — " in t["title"] else jsstr(t["title"]),
    hero_intro_json=jsstr(intro),
    howto_heading_json=jsstr(f"How to use the {primary}"),
    steps=steps_src,
    aeo_q_json=jsstr(t["aeo"][0]),
    aeo_a_json=jsstr(t["aeo"][1]),
    geo_heading_json=jsstr(f"{name} — USA business use cases"),
    geo_items=geo_items_src,
    seo_sections=sec_src,
    faq_heading_json=jsstr(f"{name} FAQ"),
    faqs=faqs_src,
  )
  return path, page


# Write pages
for t in TOOLS:
  path, page = build_page(t)
  fpath = ROUTES / f"{t['slug']}.tsx"
  fpath.write_text(page)
  print(f"wrote {fpath}")

# ---------------- Update seo-keywords.ts ----------------
seo_src = SEO_FILE.read_text()
entries = []
for t in TOOLS:
  path = "/" + t["slug"]
  if f'"{path}"' in seo_src:
    print(f"skip seo entry (exists): {path}")
    continue
  entries.append(
    f'  "{path}": {{\n'
    f'    path: "{path}",\n'
    f'    primary: {jsstr(t["primary"])},\n'
    f'    keywords: [\n' +
    ",\n".join("      " + jsstr(k) for k in t["keywords"]) +
    "\n    ],\n  },"
  )
if entries:
  marker = "};\n\nexport const ALL_PATHS"
  injection = "\n  /* ---- TIER 1 + TIER 2 ---- */\n" + "\n".join(entries) + "\n" + marker
  seo_src = seo_src.replace(marker, injection, 1)
  SEO_FILE.write_text(seo_src)
  print(f"updated {SEO_FILE} with {len(entries)} entries")

# ---------------- Update ToolLayout TOOLS array ----------------
layout = LAYOUT_FILE.read_text()
new_tool_lines = []
for t in TOOLS:
  to = "/" + t["slug"]
  if f'to: "{to}"' in layout:
    continue
  new_tool_lines.append(
    f'  {{ to: "{to}", label: {jsstr(t["name"])}, short: {jsstr(t["short"])}, icon: {jsstr(t["icon"])},\n'
    f'    blurb: {jsstr(t["blurb"])}, accent: {jsstr(t["accent"])} }},'
  )
if new_tool_lines:
  marker = "];\n\nexport const ALL_TOOLS"
  injection = "\n" + "\n".join(new_tool_lines) + "\n" + marker
  layout = layout.replace(marker, injection, 1)
  LAYOUT_FILE.write_text(layout)
  print(f"updated {LAYOUT_FILE} with {len(new_tool_lines)} tools")
