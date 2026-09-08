import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout, IconToolGrid, TOOLS } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, AeoBlock, GeoBlock, Breadcrumbs, buildHead,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/"].keywords;

const FAQS = [
  { q: "What is a link generator?", a: "A link generator is a free online tool that builds a ready-to-use URL for a specific purpose — a WhatsApp click-to-chat URL, a mailto email link, a Google review link, a Google Maps directions link, an affiliate link with your tag, a calendar event link, a premium download link, or an SEO-friendly slug. Instead of writing the URL by hand and risking encoding errors, the link generator does it in one click." },
  { q: "Is this online link generator free?", a: "Yes — every link generator on LinkKit is 100% free with no signup, no usage limits and no hidden upsells. All generators run inside your browser so we never see your data." },
  { q: "What is the best free link generator for marketing?", a: "For marketers in the USA the most-used picks are the WhatsApp link generator (click-to-chat), the Google review link generator (reviews drive local SEO), the mailto link generator (email signatures) and the affiliate link generator (Amazon Associates, AliExpress). All four are linked in the icon grid above." },
  { q: "Can I use a link generator for a Google Drive direct download link?", a: "Yes. Use the SEO URL Slug Generator's helper or the direct-download converter inside the hub above — paste a Google Drive share link and the generator rewrites it as a direct download URL." },
  { q: "What's the difference between a link generator and a URL shortener?", a: "A link generator builds a fully-formed, purpose-specific URL (wa.me/…, mailto:…, https://maps.google.com/?cid=…). A URL shortener takes any existing URL and produces a shorter alias (bit.ly/x, t.co/x). LinkKit focuses on link generation; pair it with any shortener if you also need a short alias." },
  { q: "How does this free link generator help with SEO?", a: "Generated links are clean, properly URL-encoded, contain valid query parameters, and use canonical formats that search engines recognise. Review links boost Google Business profile signals, calendar links increase engagement, and SEO URL slug generation keeps your permalinks crawlable." },
  { q: "Are these link generators safe to use?", a: "Yes. Every generator on LinkKit runs entirely client-side — the URL is built inside your browser using JavaScript and never sent to a server. We don't track or log your inputs." },
  { q: "Do you have a custom link generator I can use on my own site?", a: "Not yet as an embeddable widget, but the hub above covers every common custom link generator use case: WhatsApp, mailto, review, maps, calendar, affiliate, referral, slug, premium download and rickroll. Bookmark the hub and use it on demand." },
];

const TITLE = "Link Generator — Free URL Generator Hub for 40+ Utility Tools";
const DESC = "Free link generator hub. Generate WhatsApp, mailto, Google review, Maps, calendar, affiliate, referral, premium download and SEO URL slug links — no signup.";

export const Route = createFileRoute("/")({
  head: () => buildHead({
    title: TITLE,
    description: DESC,
    path: "/",
    name: "Link Generator",
    faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }],
    extraSchemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "LinkKit",
        url: "/",
        potentialAction: {
          "@type": "SearchAction",
          target: "/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "LinkKit Link Generators",
        itemListElement: TOOLS.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.label,
          url: t.to,
        })),
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [input, setInput] = useState("https://drive.google.com/file/d/1AbCDefGhIjKlMnOpQ/view?usp=sharing");
  const [mode, setMode] = useState<"drive" | "short" | "slug">("drive");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    if (mode === "drive") {
      const m = input.match(/\/d\/([a-zA-Z0-9_-]+)/) || input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (m) return `https://drive.google.com/uc?export=download&id=${m[1]}`;
      return "";
    }
    if (mode === "short") {
      const hash = Math.abs([...input].reduce((a, c) => a * 31 + c.charCodeAt(0), 7)).toString(36).slice(0, 6);
      return `https://lnk.kit/${hash}`;
    }
    return input.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
  }, [input, mode]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator" }]} />
      <ToolHero
        eyebrow={`Free • No Signup • ${TOOLS.length}+ Tools`}
        h1="Link Generator — Free URL Generator Hub"
        intro="LinkKit is a free link generator hub. Generate a wa.me WhatsApp link, mailto email link, Google review link, Google Maps directions link, Amazon affiliate link, calendar event link, premium download link or SEO URL slug — all from one place. Every online link generator on this page is free, no signup."
        keywords={KW}
      />

      <ToolCard>
        <Field label="What kind of link do you want to generate?">
          <select value={mode} onChange={(e) => setMode(e.target.value as never)} className={inputCls}>
            <option value="drive">Google Drive direct download link</option>
            <option value="short">Short link (custom hash)</option>
            <option value="slug">SEO URL slug</option>
          </select>
        </Field>
        <Field label="Source URL or title" hint="Paste a Google Drive share link, any URL to shorten, or a title to slug-ify.">
          <input className={inputCls} value={input} onChange={(e) => setInput(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Generated link</span>
          <OutputBlock value={output} />
        </div>
        <p className="text-xs text-muted-foreground">
          Need something more specific? Pick a dedicated link generator from the grid below.
        </p>
      </ToolCard>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { k: "14+", v: "Free generators" },
          { k: "0", v: "Signup required" },
          { k: "100%", v: "Client-side" },
          { k: "USA", v: "Optimised" },
        ].map((s) => (
          <div key={s.v} className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
            <div className="text-2xl md:text-3xl font-display font-extrabold text-gradient-sunset">{s.k}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      <IconToolGrid heading="All free link generators" tools={TOOLS} />


      <HowToUse
        heading="How to use the link generator hub"
        steps={[
          "Pick a generator from the icon grid above (premium download, WhatsApp, mailto, Google review, maps, calendar, affiliate, referral, slug or rickroll).",
          "Fill the form on the dedicated tool page — every field has a hint with an example.",
          "Click Copy and paste the generated link wherever you need it: website, email signature, Instagram bio, QR code, invoice, ad.",
          "Bookmark LinkKit to come back next time you need a custom link generator.",
        ]}
      />

      <AeoBlock
        question="What is a link generator?"
        answer="A link generator is a free online tool that builds a fully-formed URL for a specific use case — WhatsApp click-to-chat, mailto email, Google review, Maps directions, affiliate tag, calendar event, premium download or SEO slug. It handles URL encoding, parameter formatting and platform-specific syntax so the link works correctly on first paste."
        keywords={KW}
      />

      <GeoBlock
        heading="How USA businesses use the link generator hub"
        keywords={KW}
        items={[
          { who: "Local dentist in Miami, FL", how: "Pairs the Google review link generator with the WhatsApp link generator to collect 5-star reviews and field new-patient enquiries from the same QR code." },
          { who: "Shopify store in Austin, TX", how: "Uses the affiliate link generator for influencer partners and the mailto link generator for one-click 'reply to confirm' transactional emails." },
          { who: "Realtor in Phoenix, AZ", how: "Drops a Google Maps link generator URL into open-house emails and an add-to-calendar link generator event for showings." },
          { who: "SaaS founder in San Francisco", how: "Combines the referral link generator with the SEO URL slug generator for branded campaign links that rank in Google." },
          { who: "Restaurant in Brooklyn, NY", how: "Prints a WhatsApp link generator QR code for reservations and a Google review link generator QR for post-meal feedback." },
          { who: "Power downloader anywhere in the US", how: "Uses the premium link generator for Rapidgator, Turbobit and Nitroflare without paying for a premium account on every host." },
        ]}
      />

      <SeoLongform
        keywords={KW}
        sections={[
          {
            h2: "A free link generator for every URL you'll ever need",
            paragraphs: [
              "LinkKit is the free link generator hub built for marketers, developers, freelancers and small business owners in the United States. Whether you need a WhatsApp click-to-chat link, a mailto email link, a Google review link, a Google Maps directions link, a premium download link, an affiliate link or an SEO-friendly URL slug, the online link generator you need is one click away.",
              "Every generator on this page runs entirely inside your browser. The URL is built locally with JavaScript and never sent to our servers — that means zero tracking, zero rate limits and zero waiting. Paste, click, copy.",
            ],
          },
          {
            h2: "Google Drive direct download link generator",
            paragraphs: [
              "The Google Drive direct download link generator above takes a regular Drive share URL (https://drive.google.com/file/d/FILE_ID/view) and rewrites it as a direct download link (https://drive.google.com/uc?export=download&id=FILE_ID). Visitors who click the generated link skip the Drive preview and start downloading the file immediately.",
              "This is the most-searched 'direct download link generator' use case in the USA. It works for PDFs, ZIPs, MP4s and any file under Drive's 100 MB virus-scan threshold; larger files trigger a confirmation page that visitors will need to bypass once.",
            ],
          },
          {
            h2: "Short link generator and custom URL generator",
            paragraphs: [
              "Need a quick short link generator without signing up for bit.ly? The mini tool above produces a deterministic short hash from any input URL — perfect for one-off campaigns. For branded short URLs that include keywords, use the SEO URL slug generator and combine it with your own domain.",
              "If you're running referral or affiliate campaigns, swap to the dedicated affiliate link generator and referral link generator — they add the right tracking parameters automatically.",
            ],
          },
          {
            h2: "The most useful free link generators in 2026",
            paragraphs: [
              "Below the hero tool, the icon grid lists every dedicated link generator on LinkKit. Each one is keyword-optimised for the way US users actually search Google in 2026:",
            ],
            bullets: [
              "Premium Link Generator — Rapidgator, Turbobit, Nitroflare, Filejoker, Keep2Share, K2S, Hitfile, DDownload, UploadHaven, Katfile, Filesfly, Fastfile.cc",
              "WhatsApp Link Generator — wa.me click-to-chat link with QR code and prefilled message",
              "Google Review Link Generator — 5-star Google Business review link from Place ID",
              "Mailto Link Generator — email link with subject, body, CC and BCC",
              "Google Maps Link Generator — directions and share-location link",
              "Add to Calendar Link Generator — Google, Outlook, Yahoo and .ics event link",
              "Affiliate Link Generator — Amazon, AliExpress and custom affiliate tag link",
              "Referral Link Generator — custom referral / invite link with tracking code",
              "SEO URL Slug Generator — WordPress-friendly permalink slug from any title",
              "Rick Roll Link Generator — disguised prank URL",
            ],
          },
          {
            h2: "Why use a link generator instead of writing URLs by hand",
            paragraphs: [
              "URLs are deceptively complex. Spaces, ampersands, line breaks, emoji and quotes must be percent-encoded. Phone numbers must be in E.164 format for wa.me. Calendar links need ISO-8601 timestamps. Affiliate tags need to survive redirects. Mistakes in any one of these silently break the link — visitors click and nothing happens.",
              "A purpose-built link generator handles every edge case for you. The result is a single click-tested URL that works on Android, iOS, desktop browsers and in-app webviews.",
            ],
          },
          {
            h2: "How to pick the right link generator for your use case",
            paragraphs: [
              "Selling on social? The WhatsApp link generator and affiliate link generator drive the most conversions. Running a local USA business? The Google review link generator, Google Maps link generator and add to calendar link generator are the local-SEO triple. Publishing content? The SEO URL slug generator and mailto link generator belong in every editorial workflow. Downloading large files? The premium link generator covers all 12 major file hosts.",
              "If you need more than one, keep this hub open in a tab — it's the fastest way to grab any link, any time.",
            ],
          },
        ]}
      />

      <FaqSection items={FAQS} keywords={KW} heading="Link generator FAQ" />

      <p className="mt-10 text-sm text-foreground/80">
        Popular picks today: the{" "}
        <Link to="/premium-link-generator" className="text-primary font-semibold hover:underline">Premium Link Generator</Link>{" "}
        for Rapidgator and Turbobit, the{" "}
        <Link to="/whatsapp-link-generator" className="text-primary font-semibold hover:underline">WhatsApp Link Generator</Link>{" "}
        for click-to-chat, the{" "}
        <Link to="/google-review-link-generator" className="text-primary font-semibold hover:underline">Google Review Link Generator</Link>{" "}
        for local SEO, and the{" "}
        <Link to="/slug-generator" className="text-primary font-semibold hover:underline">SEO URL Slug Generator</Link>{" "}
        for clean permalinks.
      </p>
    </ToolLayout>
  );
}
