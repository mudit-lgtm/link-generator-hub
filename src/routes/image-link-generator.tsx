import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/image-link-generator"].keywords;

const FAQS = [
  { q: "What is a image link generator?", a: "An image link generator returns a direct URL to a hosted image so it can be hotlinked in Markdown, HTML, forum posts, Discord embeds and email templates. The free image link generator above validates the URL and copies it ready-to-paste." },
  { q: "How do I use this image link generator?", a: "Fill the field above and the Image Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The image link generator runs entirely in your browser; no signup required." },
  { q: "Is the image link generator free?", a: "Yes, this image link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the image link generator work on mobile?", a: "Yes — the image link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the image link generator for commercial projects?", a: "Yes. Output from the image link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the image link generator store my data?", a: "No. The image link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the image link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free image link generator above is enough." },
  { q: "Can I shorten the output of the image link generator?", a: "Yes — paste the URL from the image link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Image Link Generator — Free Direct Image URL Builder";
const DESC = "Free image link generator. Build direct hotlink URLs for any hosted image — perfect for forum signatures, Discord embeds, README previews and email banners.";

export const Route = createFileRoute("/image-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/image-link-generator",
    name: "Image Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Image Link Generator", item: "/image-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("https://example.com/photo.jpg");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `${value.trim()}`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Image Link Generator" }]} />
      <ToolHero
        h1={"Image Link Generator — Free Direct Image URL Builder"}
        intro={"Generate a image link generator URL in one click. This free Image Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="Image URL">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your image link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the image link generator"}
        steps={[
          "Fill the field above with your image url.",
          "The image link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is an image link generator?"}
        answer={"An image link generator returns a direct URL to a hosted image so it can be hotlinked in Markdown, HTML, forum posts, Discord embeds and email templates. The free image link generator above validates the URL and copies it ready-to-paste."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Image Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Open-source maintainer in Seattle, WA", how: "Generates direct image links for GitHub README badges and screenshots." },
          { who: "Forum moderator in Chicago, IL", how: "Uses the image hotlink generator for user signature graphics." },
          { who: "Designer in Brooklyn, NY", how: "Pastes direct image URLs in Slack & Discord channels for client review." },
          { who: "Email marketer in Austin, TX", how: "Embeds image link generator output in MJML templates for hero banners." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free image link generator — how it works",
          paragraphs: [
            "This free image link generator runs entirely in your browser. Fill the input above and the Image Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable image link generator.",
            "Pair this image link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a image link generator",
          paragraphs: [
            "Use the image link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The image link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "image link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free image link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the image link generator",
          paragraphs: [
            "Combine the image link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Image Link Generator FAQ"} />

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
