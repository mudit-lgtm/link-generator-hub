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
  "/premium-link-generator": {
    path: "/premium-link-generator",
    primary: "premium link generator",
    keywords: [
      "premium link generator",
      "rapidgator premium link generator",
      "turbobit premium link generator",
      "filejoker premium link generator",
      "nitroflare premium link generator",
      "hitfile premium link generator",
      "fastfile.cc premium link generator",
      "keep2share premium link generator",
      "k2s premium link generator",
      "ddownload premium link generator",
      "uploadhaven premium link generator",
      "katfile premium link generator",
      "filesfly premium link generator",
      "free premium link generator",
      "best premium link generator",
    ],
  },
  "/whatsapp-link-generator": {
    path: "/whatsapp-link-generator",
    primary: "whatsapp link generator",
    keywords: [
      "whatsapp link generator",
      "wa.me link generator",
      "whatsapp link generator with qr code",
      "whatsapp click to chat",
      "whatsapp business link generator",
      "whatsapp link with prefilled message",
      "generate whatsapp link",
      "free whatsapp link generator",
    ],
  },
  "/google-review-link-generator": {
    path: "/google-review-link-generator",
    primary: "google review link generator",
    keywords: [
      "google review link generator",
      "google review link",
      "google my business review link",
      "5 star google review link",
      "google review qr code generator",
      "review link for business",
      "place id review link",
    ],
  },
  "/mailto-link-generator": {
    path: "/mailto-link-generator",
    primary: "mailto link generator",
    keywords: [
      "mailto link generator",
      "email link generator",
      "mailto link with subject and body",
      "html email link",
      "mailto link with cc and bcc",
      "gmail link generator",
      "create email link",
    ],
  },
  "/google-maps-link-generator": {
    path: "/google-maps-link-generator",
    primary: "google maps link generator",
    keywords: [
      "google maps link generator",
      "google maps directions link",
      "share location google maps",
      "place id google maps link",
      "lat long google maps link",
      "embed google maps link",
    ],
  },
  "/add-to-calendar-link-generator": {
    path: "/add-to-calendar-link-generator",
    primary: "add to calendar link generator",
    keywords: [
      "add to calendar link generator",
      "google calendar link generator",
      "outlook calendar link generator",
      "ics file generator",
      "yahoo calendar link",
      "event link for email",
    ],
  },
  "/affiliate-link-generator": {
    path: "/affiliate-link-generator",
    primary: "affiliate link generator",
    keywords: [
      "affiliate link generator",
      "amazon affiliate link generator",
      "aliexpress affiliate link generator",
      "free affiliate link generator",
      "custom affiliate link",
      "affiliate tag generator",
    ],
  },
  "/referral-link-generator": {
    path: "/referral-link-generator",
    primary: "referral link generator",
    keywords: [
      "referral link generator",
      "referral code generator",
      "invite link generator",
      "custom referral link",
      "referral url generator",
      "saas referral link",
    ],
  },
  "/slug-generator": {
    path: "/slug-generator",
    primary: "seo url slug generator",
    keywords: [
      "seo url slug generator",
      "slug generator",
      "wordpress permalink generator",
      "url slug from title",
      "seo friendly url generator",
      "clean url generator",
    ],
  },
  "/rickroll-link-generator": {
    path: "/rickroll-link-generator",
    primary: "rick roll link generator",
    keywords: [
      "rick roll link generator",
      "rickroll link generator",
      "fake link generator",
      "prank link generator",
      "custom rickroll link",
      "disguised rickroll url",
    ],
  },
};

export const ALL_PATHS = Object.keys(SEO);
