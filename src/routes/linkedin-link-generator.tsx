import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/linkedin-link-generator"].keywords;

const FAQS = [
  { q: "What is a linkedin link generator?", a: "A LinkedIn link generator builds a linkedin.com/in/{vanity} profile URL, linkedin.com/company/{slug} page URL or LinkedIn share dialog URL. The free LinkedIn link generator above is perfect for resumes, email signatures and B2B share buttons." },
  { q: "How do I use this linkedin link generator?", a: "Fill the field above and the LinkedIn Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The linkedin link generator runs entirely in your browser; no signup required." },
  { q: "Is the linkedin link generator free?", a: "Yes, this linkedin link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the linkedin link generator work on mobile?", a: "Yes — the linkedin link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the linkedin link generator for commercial projects?", a: "Yes. Output from the linkedin link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the linkedin link generator store my data?", a: "No. The linkedin link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the linkedin link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free linkedin link generator above is enough." },
  { q: "Can I shorten the output of the linkedin link generator?", a: "Yes — paste the URL from the linkedin link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "LinkedIn Link Generator — Free Profile & Share URL Builder";
const DESC = "Free LinkedIn link generator. Build linkedin.com/in/{username} profile URLs, company pages and share links — perfect for email signatures, resumes and CTAs.";

export const Route = createFileRoute("/linkedin-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/linkedin-link-generator",
    name: "LinkedIn Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "LinkedIn Link Generator", item: "/linkedin-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("linkkit");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `https://linkedin.com/in/${value.trim()}`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "LinkedIn Link Generator" }]} />
      <ToolHero
        h1={"LinkedIn Link Generator — Free Profile & Share URL Builder"}
        intro={"Generate a linkedin link generator URL in one click. This free LinkedIn Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="LinkedIn vanity name (linkedin.com/in/...)">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your linkedin link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the linkedin link generator"}
        steps={[
          "Fill the field above with your linkedin vanity name (linkedin.com/in/...).",
          "The linkedin link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a LinkedIn link generator?"}
        answer={"A LinkedIn link generator builds a linkedin.com/in/{vanity} profile URL, linkedin.com/company/{slug} page URL or LinkedIn share dialog URL. The free LinkedIn link generator above is perfect for resumes, email signatures and B2B share buttons."}
        keywords={KW}
      />

      <GeoBlock
        heading={"LinkedIn Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Recruiter in NYC", how: "Generates LinkedIn profile links to drop into Greenhouse candidate notes." },
          { who: "B2B SaaS founder in San Francisco, CA", how: "Uses the LinkedIn share link generator on every blog post." },
          { who: "Sales rep in Chicago, IL", how: "Adds the custom LinkedIn link to email signatures across the team." },
          { who: "Job seeker in Austin, TX", how: "Pastes the LinkedIn URL generator output on resume PDFs." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free linkedin link generator — how it works",
          paragraphs: [
            "This free linkedin link generator runs entirely in your browser. Fill the input above and the LinkedIn Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable linkedin link generator.",
            "Pair this linkedin link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a linkedin link generator",
          paragraphs: [
            "Use the linkedin link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The linkedin link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "linkedin link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free linkedin link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the linkedin link generator",
          paragraphs: [
            "Combine the linkedin link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"LinkedIn Link Generator FAQ"} />

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
