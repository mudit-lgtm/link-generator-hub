import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/direct-download-link-generator"].keywords;

const FAQS = [
  { q: "What is a direct download link generator?", a: "A direct download link generator builds a URL that triggers an immediate file download instead of opening the file in the browser. The free direct download link generator above works for PDFs, ZIPs, installers and any hosted file by setting response-content-disposition to attachment." },
  { q: "How do I use this direct download link generator?", a: "Fill the field above and the Direct Download Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The direct download link generator runs entirely in your browser; no signup required." },
  { q: "Is the direct download link generator free?", a: "Yes, this direct download link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the direct download link generator work on mobile?", a: "Yes — the direct download link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the direct download link generator for commercial projects?", a: "Yes. Output from the direct download link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the direct download link generator store my data?", a: "No. The direct download link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the direct download link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free direct download link generator above is enough." },
  { q: "Can I shorten the output of the direct download link generator?", a: "Yes — paste the URL from the direct download link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Direct Download Link Generator — Free Force-Download URLs";
const DESC = "Free direct download link generator. Build force-download URLs for any hosted file by adding response-content-disposition — perfect for one-click downloads of PDFs, ZIPs and installers.";

export const Route = createFileRoute("/direct-download-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/direct-download-link-generator",
    name: "Direct Download Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Direct Download Link Generator", item: "/direct-download-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("https://example.com/installer.zip");
  const [filename, setFilename] = useState("download.zip");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `${value.trim()}?response-content-disposition=attachment%3Bfilename%3D${encodeURIComponent(filename.trim())}`;
  }, [value, filename]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Direct Download Link Generator" }]} />
      <ToolHero
        h1={"Direct Download Link Generator — Free Force-Download URLs"}
        intro={"Generate a direct download link generator URL in one click. This free Direct Download Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="File URL">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <Field label="Force download as filename">
          <input className={inputCls} value={filename} onChange={(e) => setFilename(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your direct download link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the direct download link generator"}
        steps={[
          "Fill the field above with your file url.",
          "The direct download link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a direct download link generator?"}
        answer={"A direct download link generator builds a URL that triggers an immediate file download instead of opening the file in the browser. The free direct download link generator above works for PDFs, ZIPs, installers and any hosted file by setting response-content-disposition to attachment."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Direct Download Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Software vendor in Austin, TX", how: "Uses the direct download link generator for one-click Windows installer downloads." },
          { who: "Course creator in Denver, CO", how: "Generates direct file links for ZIP bundles emailed after checkout." },
          { who: "Game studio in Seattle, WA", how: "Drops the DDL link generator URL in Discord for demo builds." },
          { who: "Marketing team in Brooklyn, NY", how: "Sends instant download links for media kits via cold outreach." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free direct download link generator — how it works",
          paragraphs: [
            "This free direct download link generator runs entirely in your browser. Fill the input above and the Direct Download Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable direct download link generator.",
            "Pair this direct download link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a direct download link generator",
          paragraphs: [
            "Use the direct download link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The direct download link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "direct download link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free direct download link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the direct download link generator",
          paragraphs: [
            "Combine the direct download link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Direct Download Link Generator FAQ"} />

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
