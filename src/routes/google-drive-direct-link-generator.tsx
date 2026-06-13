import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/google-drive-direct-link-generator"].keywords;

const FAQS = [
  { q: "What is a google drive direct download link generator?", a: "A Google Drive direct download link generator converts a Drive share URL into a direct download link of the form drive.google.com/uc?export=download&id={id}. The free Google Drive direct link generator above bypasses the preview page so files download in one click." },
  { q: "How do I use this google drive direct download link generator?", a: "Fill the field above and the Google Drive Direct Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The google drive direct download link generator runs entirely in your browser; no signup required." },
  { q: "Is the google drive direct download link generator free?", a: "Yes, this google drive direct download link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the google drive direct download link generator work on mobile?", a: "Yes — the google drive direct download link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the google drive direct download link generator for commercial projects?", a: "Yes. Output from the google drive direct download link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the google drive direct download link generator store my data?", a: "No. The google drive direct download link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the google drive direct download link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free google drive direct download link generator above is enough." },
  { q: "Can I shorten the output of the google drive direct download link generator?", a: "Yes — paste the URL from the google drive direct download link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Google Drive Direct Download Link Generator — Free";
const DESC = "Free Google Drive direct download link generator. Convert a Drive share URL into a direct download link that bypasses the preview page — works for images, PDFs and any file.";

export const Route = createFileRoute("/google-drive-direct-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/google-drive-direct-link-generator",
    name: "Google Drive Direct Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Google Drive Direct Link Generator", item: "/google-drive-direct-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I/view?usp=sharing");
  const out = useMemo(() => {
    const m = value.match(/\/d\/([a-zA-Z0-9_-]+)/) || value.match(/id=([a-zA-Z0-9_-]+)/);
    const driveId = m ? m[1] : value.trim();
    if (!value.trim()) return "";
    return `https://drive.google.com/uc?export=download&id=${driveId}`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Google Drive Direct Link Generator" }]} />
      <ToolHero
        h1={"Google Drive Direct Download Link Generator — Free"}
        intro={"Generate a google drive direct download link generator URL in one click. This free Google Drive Direct Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="Google Drive share URL">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your google drive direct download link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the google drive direct download link generator"}
        steps={[
          "Fill the field above with your google drive share url.",
          "The google drive direct download link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a Google Drive direct download link generator?"}
        answer={"A Google Drive direct download link generator converts a Drive share URL into a direct download link of the form drive.google.com/uc?export=download&id={id}. The free Google Drive direct link generator above bypasses the preview page so files download in one click."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Google Drive Direct Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "E-commerce store in Brooklyn, NY", how: "Hot-links product spec PDFs from Google Drive using the direct download URL." },
          { who: "WordPress blogger in Austin, TX", how: "Embeds Google Drive direct image links in posts instead of re-uploading." },
          { who: "Course creator in Denver, CO", how: "Sends Drive direct download links in onboarding emails for course resources." },
          { who: "Designer in Miami, FL", how: "Shares Google Drive image direct links so clients see previews without signing in." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free google drive direct download link generator — how it works",
          paragraphs: [
            "This free google drive direct download link generator runs entirely in your browser. Fill the input above and the Google Drive Direct Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable google drive direct download link generator.",
            "Pair this google drive direct download link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a google drive direct download link generator",
          paragraphs: [
            "Use the google drive direct download link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The google drive direct download link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "google drive direct download link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free google drive direct download link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the google drive direct download link generator",
          paragraphs: [
            "Combine the google drive direct download link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Google Drive Direct Link Generator FAQ"} />

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
