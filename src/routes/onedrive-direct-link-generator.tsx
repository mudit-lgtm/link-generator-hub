import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/onedrive-direct-link-generator"].keywords;

const FAQS = [
  { q: "What is a onedrive direct link generator?", a: "A OneDrive direct link generator converts a OneDrive or SharePoint share URL into a direct download link by appending &download=1. The free OneDrive direct link generator above works for personal OneDrive (1drv.ms) and OneDrive for Business / SharePoint." },
  { q: "How do I use this onedrive direct link generator?", a: "Fill the field above and the OneDrive Direct Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The onedrive direct link generator runs entirely in your browser; no signup required." },
  { q: "Is the onedrive direct link generator free?", a: "Yes, this onedrive direct link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the onedrive direct link generator work on mobile?", a: "Yes — the onedrive direct link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the onedrive direct link generator for commercial projects?", a: "Yes. Output from the onedrive direct link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the onedrive direct link generator store my data?", a: "No. The onedrive direct link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the onedrive direct link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free onedrive direct link generator above is enough." },
  { q: "Can I shorten the output of the onedrive direct link generator?", a: "Yes — paste the URL from the onedrive direct link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "OneDrive Direct Link Generator — Free Direct Download URL";
const DESC = "Free OneDrive direct link generator. Convert a 1drv.ms or onedrive.live.com share into a direct download URL — works for images, PDFs and Office files across personal and business OneDrive.";

export const Route = createFileRoute("/onedrive-direct-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/onedrive-direct-link-generator",
    name: "OneDrive Direct Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "OneDrive Direct Link Generator", item: "/onedrive-direct-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("https://1drv.ms/u/s!Abc123XYZ");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `${value.trim()}&download=1`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "OneDrive Direct Link Generator" }]} />
      <ToolHero
        h1={"OneDrive Direct Link Generator — Free Direct Download URL"}
        intro={"Generate a onedrive direct link generator URL in one click. This free OneDrive Direct Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="OneDrive share URL">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your onedrive direct link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the onedrive direct link generator"}
        steps={[
          "Fill the field above with your onedrive share url.",
          "The onedrive direct link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a OneDrive direct link generator?"}
        answer={"A OneDrive direct link generator converts a OneDrive or SharePoint share URL into a direct download link by appending &download=1. The free OneDrive direct link generator above works for personal OneDrive (1drv.ms) and OneDrive for Business / SharePoint."}
        keywords={KW}
      />

      <GeoBlock
        heading={"OneDrive Direct Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Enterprise IT in Seattle, WA", how: "Generates OneDrive direct download links for software deployment manifests." },
          { who: "Accountant in Dallas, TX", how: "Uses the OneDrive direct link generator for client tax-form delivery." },
          { who: "Architect in Boston, MA", how: "Sends SharePoint direct links to contractors for DWG file access." },
          { who: "Teacher in Phoenix, AZ", how: "Embeds OneDrive image direct links in Canvas course pages." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free onedrive direct link generator — how it works",
          paragraphs: [
            "This free onedrive direct link generator runs entirely in your browser. Fill the input above and the OneDrive Direct Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable onedrive direct link generator.",
            "Pair this onedrive direct link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a onedrive direct link generator",
          paragraphs: [
            "Use the onedrive direct link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The onedrive direct link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "onedrive direct link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free onedrive direct link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the onedrive direct link generator",
          paragraphs: [
            "Combine the onedrive direct link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"OneDrive Direct Link Generator FAQ"} />

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
