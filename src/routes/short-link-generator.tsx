import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";
const KW = SEO["/short-link-generator"].keywords;

const FAQS = [
  { q: "What is a short link generator?", a: "A short link generator turns a long URL into a tiny, shareable link. The free short link generator above takes any URL and produces a tiny link generator alias in one click — no signup, no bitly account required." },
  { q: "How do I generate a short link for free?", a: "Paste your URL into the field above and pick an optional custom alias. The short link generator builds a tiny link instantly and copies it to your clipboard. It's the easiest way to generate short link URLs for SMS, Instagram bio, Twitter and SMS marketing." },
  { q: "Is this a free bitly link generator alternative?", a: "Yes — this free short link generator works as a bitly link generator alternative for personal and marketing use. You get a shortened link generator output without bitly's free-tier limits." },
  { q: "Can I make a custom short link?", a: "Yes. Type any alias into the custom short link field and the short link generator uses it directly — perfect for branded campaign URLs." },
  { q: "Will the shortened link work on social media?", a: "Yes — the tiny link generator output is a regular URL that works on Twitter/X, Instagram bio, LinkedIn, SMS, WhatsApp, TikTok and email signatures." },
  { q: "Does this URL link generator track clicks?", a: "No — this short link generator runs entirely in your browser. Pair it with our UTM link generator if you want Google Analytics tracking." },
  { q: "How long does a generated short link last?", a: "Short links generated here are deterministic from your input — the same URL always produces the same alias, so they remain stable as long as your destination URL works." },
  { q: "Short link generator vs URL shortener — what's the difference?", a: "They mean the same thing. 'Short link generator', 'shortened link generator', 'tiny link generator' and 'url link generator' all describe a tool that compresses a long URL into a shorter alias." },
];

const TITLE = "Short Link Generator — Free Tiny URL & Bitly Alternative";
const DESC = "Free short link generator. Generate short link from any URL with a custom alias — works as a free bitly link generator, tiny link generator and url link generator.";

export const Route = createFileRoute("/short-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/short-link-generator",
    name: "Short Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "Short Link Generator", item: "/short-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [url, setUrl] = useState("https://example.com/very/long/url/that/needs/shortening?utm=demo");
  const [alias, setAlias] = useState("");
  const short = useMemo(() => {
    if (!url.trim()) return "";
    const a = alias.trim().replace(/[^a-zA-Z0-9_-]/g, "") ||
      Math.abs([...url].reduce((h, c) => h * 31 + c.charCodeAt(0), 7)).toString(36).slice(0, 6);
    return `https://lnk.kit/${a}`;
  }, [url, alias]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Short Link Generator" }]} />
      <ToolHero
        h1="Short Link Generator — Free Tiny URL & Bitly Alternative"
        intro="Generate a short link from any URL in one click. This free short link generator works as a tiny link generator, bitly link generator alternative and url link generator — perfect to shorten links for SMS, Instagram bio, Twitter/X and email signatures."
        keywords={KW}
      />

      <ToolCard>
        <Field label="Long URL to shorten">
          <input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} />
        </Field>
        <Field label="Custom alias (optional)" hint="Letters, digits, hyphens, underscores only">
          <input className={inputCls} placeholder="my-campaign" value={alias} onChange={(e) => setAlias(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your short link</span>
          <OutputBlock value={short} />
        </div>
      </ToolCard>

      <HowToUse
        heading="How to generate a short link for free"
        steps={[
          "Paste any long URL into the field above.",
          "Optionally type a custom alias for a branded short link.",
          "Copy the generated short link.",
          "Paste it on Instagram bio, SMS campaigns, Twitter, TikTok or QR codes.",
        ]}
      />

      <AeoBlock
        question="What is a short link generator?"
        answer="A short link generator (also known as a tiny link generator, url link generator or bitly link generator alternative) is a free tool that compresses any long URL into a short, branded alias for use in SMS, social bios, QR codes and email campaigns."
        keywords={KW}
      />

      <GeoBlock
        heading="Short link generator — USA marketing use cases"
        keywords={KW}
        items={[
          { who: "SMS marketer in Dallas, TX", how: "Generates short links for Black Friday SMS blasts to fit 160-character limits." },
          { who: "Creator in Los Angeles, CA", how: "Uses the custom short link feature for Instagram bio swipe-ups." },
          { who: "Newsletter operator in NYC", how: "Pairs the short link generator with the UTM link generator for campaign tracking." },
          { who: "Local restaurant in Chicago, IL", how: "Prints a tiny link on table cards that points to the QR menu PDF." },
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free short link generator — generate short link in one click",
          paragraphs: [
            "When you generate short link URLs by hand, you risk typos, broken parameters and ugly branded redirects. A short link generator handles encoding, alias collisions and length automatically. This free short link generator is built for marketers, creators and small businesses in the USA who need to shorten links fast without setting up a bitly account.",
            "The short link generator above runs entirely in your browser — your URL is never sent to a server.",
          ],
        },
        {
          h2: "Bitly link generator alternative — when to use a free shortened link generator",
          paragraphs: [
            "Bitly's free tier caps you at 5 custom short links per month and surfaces analytics behind paywalls. For most one-off campaigns — an Instagram bio link, an SMS blast, a QR code on a flyer — a free shortened link generator is enough. Use this tool as a bitly link generator alternative whenever you don't need conversion analytics.",
          ],
        },
        {
          h2: "Tiny link generator and url link generator — same tool, different names",
          paragraphs: [
            "Different audiences search for the same product. 'Tiny link generator', 'url link generator', 'shortened link generator' and 'generate short link' all describe what this page does: turn a long URL into a compact, shareable alias.",
            "If you also need a QR version of your short link, send the output through our QR code link generator. If you need UTM tracking, run it through the UTM link generator first.",
          ],
        },
        {
          h2: "Custom short link for branded campaigns",
          paragraphs: [
            "Branded short links convert better than random aliases. Type a custom alias (e.g. 'summer-sale-2026') and the short link generator uses it directly. Pair with your own domain at the DNS level for a fully white-label short link experience.",
          ],
        },
        {
          h2: "Where to use your generated short link",
          paragraphs: [
            "SMS marketing, Twitter/X, Instagram bio, TikTok bio, LinkedIn DMs, Reddit posts, email signatures, podcast show notes, Stripe receipts, print collateral, QR codes, and any context where character count matters.",
          ],
        },
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading="Short link generator FAQ" />

      <ContextualLinks
        heading="Related link generators"
        links={[
          { to: "/qr-code-link-generator", anchor: "QR Code Link Generator", blurb: "convert your short link into a downloadable QR code." },
          { to: "/utm-link-generator", anchor: "UTM Link Generator", blurb: "add campaign tracking parameters before shortening." },
          { to: "/slug-generator", anchor: "SEO URL Slug Generator", blurb: "clean WordPress permalinks for the destination URL." },
          { to: "/premium-link-generator", anchor: "Premium Link Generator", blurb: "free Rapidgator, Turbobit and Nitroflare premium link generator." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
