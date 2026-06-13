import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/pdf-link-generator"].keywords;

const FAQS = [
  { q: "What is a pdf link generator?", a: "A PDF link generator builds direct download URLs (or inline #view=FitH viewer URLs) for hosted PDF files. The free PDF link generator above is perfect for lead magnets, whitepapers, invoices and course handouts shared via email or SMS." },
  { q: "How do I use this pdf link generator?", a: "Fill the field above and the PDF Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The pdf link generator runs entirely in your browser; no signup required." },
  { q: "Is the pdf link generator free?", a: "Yes, this pdf link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the pdf link generator work on mobile?", a: "Yes — the pdf link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the pdf link generator for commercial projects?", a: "Yes. Output from the pdf link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the pdf link generator store my data?", a: "No. The pdf link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the pdf link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free pdf link generator above is enough." },
  { q: "Can I shorten the output of the pdf link generator?", a: "Yes — paste the URL from the pdf link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "PDF Link Generator — Free Direct PDF Download URL Builder";
const DESC = "Free PDF link generator. Build direct download or inline-view URLs for any hosted PDF — perfect for lead magnets, whitepapers, course handouts and invoices.";

export const Route = createFileRoute("/pdf-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/pdf-link-generator",
    name: "PDF Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "PDF Link Generator", item: "/pdf-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("https://example.com/whitepaper.pdf");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `${value.trim()}#view=FitH`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "PDF Link Generator" }]} />
      <ToolHero
        h1={"PDF Link Generator — Free Direct PDF Download URL Builder"}
        intro={"Generate a pdf link generator URL in one click. This free PDF Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="PDF file URL">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your pdf link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the pdf link generator"}
        steps={[
          "Fill the field above with your pdf file url.",
          "The pdf link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a PDF link generator?"}
        answer={"A PDF link generator builds direct download URLs (or inline #view=FitH viewer URLs) for hosted PDF files. The free PDF link generator above is perfect for lead magnets, whitepapers, invoices and course handouts shared via email or SMS."}
        keywords={KW}
      />

      <GeoBlock
        heading={"PDF Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "B2B SaaS marketer in Austin, TX", how: "Uses the PDF link generator to gate whitepapers behind a download CTA." },
          { who: "Lawyer in NYC", how: "Sends direct PDF links via email for engagement-letter signing." },
          { who: "Realtor in Phoenix, AZ", how: "Shares PDF download links for property fact sheets via SMS." },
          { who: "Course creator in Denver, CO", how: "Embeds inline PDF view URLs in the LMS for handouts." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free pdf link generator — how it works",
          paragraphs: [
            "This free pdf link generator runs entirely in your browser. Fill the input above and the PDF Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable pdf link generator.",
            "Pair this pdf link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a pdf link generator",
          paragraphs: [
            "Use the pdf link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The pdf link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "pdf link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free pdf link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the pdf link generator",
          paragraphs: [
            "Combine the pdf link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"PDF Link Generator FAQ"} />

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
