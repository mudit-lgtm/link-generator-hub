import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/dropbox-direct-link-generator"].keywords;

const FAQS = [
  { q: "What is a dropbox direct link generator?", a: "A Dropbox direct link generator converts a Dropbox share URL ending in ?dl=0 into a direct download URL ending in ?dl=1. The free Dropbox direct link generator above is perfect for hot-linked images, PDFs and audio files in blogs, podcasts and client deliverables." },
  { q: "How do I use this dropbox direct link generator?", a: "Fill the field above and the Dropbox Direct Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The dropbox direct link generator runs entirely in your browser; no signup required." },
  { q: "Is the dropbox direct link generator free?", a: "Yes, this dropbox direct link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the dropbox direct link generator work on mobile?", a: "Yes — the dropbox direct link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the dropbox direct link generator for commercial projects?", a: "Yes. Output from the dropbox direct link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the dropbox direct link generator store my data?", a: "No. The dropbox direct link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the dropbox direct link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free dropbox direct link generator above is enough." },
  { q: "Can I shorten the output of the dropbox direct link generator?", a: "Yes — paste the URL from the dropbox direct link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Dropbox Direct Link Generator — Free Direct Download URL";
const DESC = "Free Dropbox direct link generator. Convert a Dropbox share URL into a direct download link by swapping ?dl=0 for ?dl=1 — works for images, PDFs and zip files.";

export const Route = createFileRoute("/dropbox-direct-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/dropbox-direct-link-generator",
    name: "Dropbox Direct Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Dropbox Direct Link Generator", item: "/dropbox-direct-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("https://www.dropbox.com/s/abc123/photo.jpg?dl=0");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return value.replace(/[?&]dl=0/, "?dl=1").replace(/^(https?:\/\/)www\.dropbox\.com/, "$1dl.dropboxusercontent.com").replace(/\?dl=1.*/, "?dl=1");
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Dropbox Direct Link Generator" }]} />
      <ToolHero
        h1={"Dropbox Direct Link Generator — Free Direct Download URL"}
        intro={"Generate a dropbox direct link generator URL in one click. This free Dropbox Direct Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="Dropbox share URL">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your dropbox direct link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the dropbox direct link generator"}
        steps={[
          "Fill the field above with your dropbox share url.",
          "The dropbox direct link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a Dropbox direct link generator?"}
        answer={"A Dropbox direct link generator converts a Dropbox share URL ending in ?dl=0 into a direct download URL ending in ?dl=1. The free Dropbox direct link generator above is perfect for hot-linked images, PDFs and audio files in blogs, podcasts and client deliverables."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Dropbox Direct Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Wedding photographer in Charleston, SC", how: "Sends Dropbox direct download links to clients so galleries download in one tap." },
          { who: "Podcast producer in Nashville, TN", how: "Uses the Dropbox raw link generator for hot-linked MP3 episodes." },
          { who: "Designer in Brooklyn, NY", how: "Shares Dropbox image direct links in Figma comments for client review." },
          { who: "Marketing team in Chicago, IL", how: "Embeds Dropbox direct links in Notion docs for campaign assets." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free dropbox direct link generator — how it works",
          paragraphs: [
            "This free dropbox direct link generator runs entirely in your browser. Fill the input above and the Dropbox Direct Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable dropbox direct link generator.",
            "Pair this dropbox direct link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a dropbox direct link generator",
          paragraphs: [
            "Use the dropbox direct link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The dropbox direct link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "dropbox direct link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free dropbox direct link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the dropbox direct link generator",
          paragraphs: [
            "Combine the dropbox direct link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Dropbox Direct Link Generator FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[
          { to: "/", anchor: "Link Generator Hub", blurb: "browse every free link generator." },
          { to: "/short-link-generator", anchor: "Short Link Generator", blurb: "shorten the URL above for SMS, bios and QR codes." },
          { to: "/qr-code-link-generator", anchor: "QR Code Link Generator", blurb: "convert your link into a downloadable QR code." },
          { to: "/premium-link-generator", anchor: "Premium Link Generator", blurb: "Rapidgator, Turbobit and Nitroflare premium downloads." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
