// Per-page target keyword lists (source-of-truth).
// Used by SeoLongform/KeywordIntro for auto-bolding and by scripts/seo-qa.ts
// for keyword-coverage assertions.

export type PageKeywords = {
  path: string;
  primary: string;          // head keyword (must appear in H1)
  keywords: string[];       // bolded/highlighted on the page
  faqAnchors?: string[];    // common PAA-style phrases for QA presence checks
};

export const SEO: Record<string, PageKeywords> = {
  "/": {
    path: "/",
    primary: "link generator",
    keywords: [
      "link generator",
      "generator link",
      "free link generator",
      "url generator",
      "online link generator",
      "google drive direct download link generator",
      "direct download link generator",
      "short link generator",
      "custom link generator",
    ],
  },
  "/whatsapp-link-generator": {
    path: "/whatsapp-link-generator",
    primary: "whatsapp link generator",
    keywords: [
      "whatsapp link generator", "wa.me link generator", "whatsapp link generator with qr code",
      "whatsapp click to chat", "whatsapp business link generator", "whatsapp link with prefilled message",
      "generate whatsapp link", "free whatsapp link generator",
    ],
  },
  "/google-review-link-generator": {
    path: "/google-review-link-generator",
    primary: "google review link generator",
    keywords: [
      "google review link generator", "google review link", "google my business review link",
      "5 star google review link", "google review qr code generator", "review link for business", "place id review link",
    ],
  },
  "/mailto-link-generator": {
    path: "/mailto-link-generator",
    primary: "mailto link generator",
    keywords: [
      "gmail compose link generator",
      "gmail link generator",
      "gmail prefilled link",
      "unsubscribe link generator",
      "email unsubscribe link",
      "mailto link generator", "email link generator", "mailto link with subject and body",
      "html email link", "mailto link with cc and bcc", "gmail link generator", "create email link",
    ],
  },
  "/google-maps-link-generator": {
    path: "/google-maps-link-generator",
    primary: "google maps link generator",
    keywords: [
      "google maps link generator", "google maps directions link", "share location google maps",
      "place id google maps link", "lat long google maps link", "embed google maps link",
    ],
  },
  "/add-to-calendar-link-generator": {
    path: "/add-to-calendar-link-generator",
    primary: "add to calendar link generator",
    keywords: [
      "add to calendar link generator", "google calendar link generator", "outlook calendar link generator",
      "ics file generator", "yahoo calendar link", "event link for email",
    ],
  },
  "/affiliate-link-generator": {
    path: "/affiliate-link-generator",
    primary: "affiliate link generator",
    keywords: [
      "affiliate link generator", "amazon affiliate link generator", "aliexpress affiliate link generator",
      "free affiliate link generator", "custom affiliate link", "affiliate tag generator",
    ],
  },
  "/referral-link-generator": {
    path: "/referral-link-generator",
    primary: "referral link generator",
    keywords: [
      "referral link generator", "referral code generator", "invite link generator",
      "custom referral link", "referral url generator", "saas referral link",
    ],
  },
  "/slug-generator": {
    path: "/slug-generator",
    primary: "seo url slug generator",
    keywords: [
      "seo url slug generator", "slug generator", "wordpress permalink generator",
      "url slug from title", "seo friendly url generator", "clean url generator",
    ],
  },
  "/rickroll-link-generator": {
    path: "/rickroll-link-generator",
    primary: "rick roll link generator",
    keywords: [
      "rick roll link generator", "rickroll link generator", "fake link generator",
      "prank link generator", "custom rickroll link", "disguised rickroll url",
    ],
  },

  /* ---- NEW TOOLS ---- */
  "/short-link-generator": {
    path: "/short-link-generator",
    primary: "short link generator",
    keywords: [
      "tinyurl link generator",
      "short link generator",
      "short link generator", "generate short link", "tiny link generator",
      "url link generator", "shortened link generator", "bitly link generator",
      "free short link generator", "custom short link",
    ],
  },
  "/qr-code-link-generator": {
    path: "/qr-code-link-generator",
    primary: "qr code link generator",
    keywords: [
      "qr code link generator", "link to qr code generator", "qr link generator",
      "link qr code generator", "generate qr code from link", "link to qr generator",
      "qr code generator from link", "free qr code link generator",
    ],
  },
  "/utm-link-generator": {
    path: "/utm-link-generator",
    primary: "utm link generator",
    keywords: [
      "utm link generator", "utm builder", "google analytics utm link",
      "campaign url builder", "utm parameter generator", "tracking link generator",
      "free utm link generator",
    ],
  },
  "/youtube-link-generator": {
    path: "/youtube-link-generator",
    primary: "youtube link generator",
    keywords: [
      "youtube link generator", "how to generate a youtube link", "youtube subscribe link generator",
      "subscribe link generator", "auto subscribe link generator", "youtube direct link generator",
      "youtube link to video generator", "1k subscribers link generate",
    ],
  },

  /* ---- TIER 1 + TIER 2 ---- */
  "/discord-invite-link-generator": {
    path: "/discord-invite-link-generator",
    primary: "discord invite link generator",
    keywords: [
      "discord invite link generator",
      "discord link generator",
      "discord server link generator",
      "custom discord invite link",
      "permanent discord invite",
      "discord vanity link generator",
      "free discord invite link generator"
    ],
  },
  "/zoom-meeting-link-generator": {
    path: "/zoom-meeting-link-generator",
    primary: "zoom meeting link generator",
    keywords: [
      "zoom meeting link generator",
      "zoom link generator",
      "zoom invite link generator",
      "zoom meeting url generator",
      "free zoom link generator",
      "custom zoom meeting link",
      "zoom join link generator"
    ],
  },
  "/google-meet-link-generator": {
    path: "/google-meet-link-generator",
    primary: "google meet link generator",
    keywords: [
      "google meet link generator",
      "meet.google.com link generator",
      "google meet invite link",
      "custom google meet link",
      "free google meet link generator",
      "google meet url generator",
      "instant google meet link"
    ],
  },
  "/teams-meeting-link-generator": {
    path: "/teams-meeting-link-generator",
    primary: "teams meeting link generator",
    keywords: [
      "teams meeting link generator",
      "microsoft teams link generator",
      "teams invite link generator",
      "ms teams meeting link",
      "teams join link generator",
      "free teams meeting link",
      "teams.microsoft.com link generator"
    ],
  },
  "/payment-link-generator": {
    path: "/payment-link-generator",
    primary: "payment link generator",
    keywords: [
      "paypal.me link generator",
      "paypal link generator",
      "paypal payment link generator",
      "custom paypal.me link",
      "paypal me url generator",
      "free paypal link generator",
      "paypal request link",
      "cash app link generator",
      "cashapp link generator",
      "$cashtag link",
      "cash.app pay url",
      "cash app payment link",
      "venmo link generator",
      "venmo payment link",
      "venmo pay link",
      "venmo charge link",
      "venmo deep link",
      "payment link generator",
      "stripe payment link generator",
      "online payment link generator",
      "custom payment link",
      "invoice payment link",
      "free payment link generator",
      "accept payment link"
    ],
  },
  "/instagram-link-generator": {
    path: "/instagram-link-generator",
    primary: "instagram link generator",
    keywords: [
      "instagram link generator",
      "instagram profile link generator",
      "instagram dm link generator",
      "instagram story link",
      "custom instagram link",
      "instagram bio link generator",
      "free instagram link generator"
    ],
  },
  "/facebook-share-link-generator": {
    path: "/facebook-share-link-generator",
    primary: "facebook share link generator",
    keywords: [
      "facebook share link generator",
      "facebook link generator",
      "facebook share url generator",
      "fb share link",
      "facebook share button link",
      "custom facebook share link",
      "free facebook share link generator"
    ],
  },
  "/telegram-link-generator": {
    path: "/telegram-link-generator",
    primary: "telegram link generator",
    keywords: [
      "telegram link generator",
      "t.me link generator",
      "telegram channel link generator",
      "telegram group invite link",
      "telegram bot link generator",
      "custom telegram link",
      "free telegram link generator"
    ],
  },
  "/linkedin-link-generator": {
    path: "/linkedin-link-generator",
    primary: "linkedin link generator",
    keywords: [
      "linkedin link generator",
      "linkedin profile link generator",
      "linkedin share link generator",
      "linkedin company link generator",
      "custom linkedin link",
      "linkedin url generator",
      "free linkedin link generator"
    ],
  },
  "/google-drive-direct-link-generator": {
    path: "/google-drive-direct-link-generator",
    primary: "google drive direct download link generator",
    keywords: [
      "google drive direct download link generator",
      "google drive direct link generator",
      "drive direct download link",
      "google drive image direct link",
      "gdrive direct link generator",
      "convert google drive link to direct",
      "free google drive direct link generator"
    ],
  },
  "/pdf-link-generator": {
    path: "/pdf-link-generator",
    primary: "pdf link generator",
    keywords: [
      "pdf link generator",
      "direct pdf link generator",
      "pdf download link generator",
      "pdf url generator",
      "embed pdf link",
      "free pdf link generator",
      "pdf share link generator"
    ],
  },
  "/image-link-generator": {
    path: "/image-link-generator",
    primary: "image link generator",
    keywords: [
      "image link generator",
      "direct image link generator",
      "image url generator",
      "photo link generator",
      "hotlink image generator",
      "free image link generator",
      "image share link generator"
    ],
  },
  "/audio-link-generator": {
    path: "/audio-link-generator",
    primary: "audio link generator",
    keywords: [
      "audio link generator",
      "mp3 link generator",
      "direct audio link generator",
      "podcast link generator",
      "audio url generator",
      "free audio link generator",
      "audio share link generator"
    ],
  },
  "/video-link-generator": {
    path: "/video-link-generator",
    primary: "video link generator",
    keywords: [
      "video link generator",
      "direct video link generator",
      "mp4 link generator",
      "video url generator",
      "video share link generator",
      "free video link generator",
      "embed video link"
    ],
  },
  "/magnet-link-generator": {
    path: "/magnet-link-generator",
    primary: "magnet link generator",
    keywords: [
      "magnet link generator",
      "torrent magnet link generator",
      "magnet url generator",
      "free magnet link generator",
      "magnet link from hash",
      "convert torrent to magnet",
      "custom magnet link"
    ],
  },
  "/direct-download-link-generator": {
    path: "/direct-download-link-generator",
    primary: "direct download link generator",
    keywords: [
      "mega link generator",
      "mega.nz link generator",
      "mega download link generator",
      "mega folder link generator",
      "free mega link generator",
      "mega cloud link generator",
      "mega share link generator",
      "onedrive direct link generator",
      "onedrive direct download link",
      "onedrive embed link generator",
      "sharepoint direct link",
      "convert onedrive link to direct",
      "free onedrive direct link generator",
      "onedrive image direct link",
      "dropbox direct link generator",
      "dropbox direct download link",
      "dropbox hot link generator",
      "dropbox raw link generator",
      "convert dropbox link to direct",
      "free dropbox direct link generator",
      "dropbox image direct link",
      "direct download link generator",
      "direct link generator",
      "force download link",
      "direct file link generator",
      "free direct download link generator",
      "ddl link generator",
      "instant download link generator"
    ],
  },
  "/tiktok-link-generator": {
    path: "/tiktok-link-generator",
    primary: "tiktok link generator",
    keywords: ["tiktok link generator", "tiktok video link generator", "tiktok share link generator", "tiktok profile link", "custom tiktok link"],
  },
  "/twitter-share-link-generator": {
    path: "/twitter-share-link-generator",
    primary: "twitter share link generator",
    keywords: ["twitter share link generator", "twitter intent link", "x share link generator", "tweet intent url", "share on x link"],
  },
  "/reddit-share-link-generator": {
    path: "/reddit-share-link-generator",
    primary: "reddit share link generator",
    keywords: ["pinterest share link generator", "pin it link generator", "pinterest pin link", "share on pinterest url", "pin button link", "reddit share link generator", "reddit submit link", "share on reddit url", "subreddit share link", "reddit post link generator"],
  },
  "/sms-link-generator": {
    path: "/sms-link-generator",
    primary: "sms link generator",
    keywords: [
      "facetime link generator",
      "facetime: link",
      "facetime audio link",
      "facetime web link",
      "apple facetime url","sms link generator", "click to text link", "sms:// link generator", "text message link", "sms link with body"],
  },
  "/spotify-link-generator": {
    path: "/spotify-link-generator",
    primary: "spotify link generator",
    keywords: ["spotify link generator", "spotify track link", "spotify share link", "open spotify url", "custom spotify link"],
  },
  "/app-store-link-generator": {
    path: "/app-store-link-generator",
    primary: "app store link generator",
    keywords: ["deep link generator", "app deep link", "custom url scheme generator", "mobile deep link", "universal link generator", "google play store link generator", "play store link", "android app link generator", "play store referrer link", "custom play store url", "app store link generator", "apple app store link", "apps.apple.com link generator", "ios app link generator", "app store url generator"],
  },
  "/calendly-link-generator": {
    path: "/calendly-link-generator",
    primary: "calendly link generator",
    keywords: ["calendly link generator", "calendly booking link", "calendly with utm", "calendly embed link", "custom calendly url"],
  },
  "/html-link-generator": {
    path: "/html-link-generator",
    primary: "html link generator",
    keywords: ["html link generator", "clickable link generator", "markdown link generator", "bbcode link generator", "hyperlink generator", "anchor tag generator"],
  },
  "/iframe-embed-link-generator": {
    path: "/iframe-embed-link-generator",
    primary: "iframe link generator",
    keywords: ["iframe link generator", "embed link generator", "iframe embed code", "website embed generator", "youtube embed link generator"],
  },
  "/tel-link-generator": {
    path: "/tel-link-generator",
    primary: "tel link generator",
    keywords: ["tel link generator", "click to call link generator", "phone number link generator", "call link generator", "tel: html link"],
  },
  "/anchor-link-generator": {
    path: "/anchor-link-generator",
    primary: "anchor link generator",
    keywords: ["anchor link generator", "jump link generator", "html anchor generator", "link to section of page", "#section link generator"],
  },
  "/upi-link-generator": {
    path: "/upi-link-generator",
    primary: "upi link generator",
    keywords: ["upi link generator", "upi payment link generator", "gpay link generator", "phonepe payment link", "upi qr link generator"],
  },
  "/email-signature-link-generator": {
    path: "/email-signature-link-generator",
    primary: "email signature link generator",
    keywords: ["email signature link generator", "html email signature generator", "signature link generator", "email footer link generator", "clickable email signature"],
  },
  "/about": {
    path: "/about",
    primary: "about businestools links",
    keywords: ["about businestools links", "who makes these url tools", "free url builder tools"],
  },
};

export const ALL_PATHS = Object.keys(SEO);
