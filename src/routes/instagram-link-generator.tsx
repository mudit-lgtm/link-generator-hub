import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/instagram-link-generator"].keywords;

const FAQS = [
  { q: "What is a instagram link generator?", a: "An Instagram link generator builds an instagram.com/{username} or DM URL for use in bios, link-in-bio pages, Google Business profiles and offline QR codes. The free Instagram link generator above works for profile share, story share and direct-message deep links." },
  { q: "How do I use this instagram link generator?", a: "Fill the field above and the Instagram Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The instagram link generator runs entirely in your browser; no signup required." },
  { q: "Is the instagram link generator free?", a: "Yes, this instagram link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the instagram link generator work on mobile?", a: "Yes — the instagram link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the instagram link generator for commercial projects?", a: "Yes. Output from the instagram link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the instagram link generator store my data?", a: "No. The instagram link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the instagram link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free instagram link generator above is enough." },
  { q: "Can I shorten the output of the instagram link generator?", a: "Yes — paste the URL from the instagram link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Instagram Link Generator — Free Profile, DM & Story URL Builder";
const DESC = "Free Instagram link generator. Build instagram.com/{username} profile URLs, DM links and share links — perfect for bios, link-in-bio pages and creator promos.";

export const Route = createFileRoute("/instagram-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/instagram-link-generator",
    name: "Instagram Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Instagram Link Generator", item: "/instagram-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("linkkit");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `https://instagram.com/${value.trim()}`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Instagram Link Generator" }]} />
      <ToolHero
        h1={"Instagram Link Generator — Free Profile, DM & Story URL Builder"}
        intro={"Generate a instagram link generator URL in one click. This free Instagram Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="Instagram @username">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your instagram link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the instagram link generator"}
        steps={[
          "Fill the field above with your instagram @username.",
          "The instagram link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is an Instagram link generator?"}
        answer={"An Instagram link generator builds an instagram.com/{username} or DM URL for use in bios, link-in-bio pages, Google Business profiles and offline QR codes. The free Instagram link generator above works for profile share, story share and direct-message deep links."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Instagram Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Influencer in Los Angeles, CA", how: "Generates Instagram profile links for every brand-partnership media kit." },
          { who: "Med-spa in Miami, FL", how: "Drops the Instagram DM link generator URL in Google review responses." },
          { who: "Yoga studio in Austin, TX", how: "Uses the custom Instagram link in their Google Business Profile." },
          { who: "Restaurant in Brooklyn, NY", how: "Prints the Instagram bio link QR code on table tents." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free instagram link generator — how it works",
          paragraphs: [
            "This free instagram link generator runs entirely in your browser. Fill the input above and the Instagram Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable instagram link generator.",
            "Pair this instagram link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a instagram link generator",
          paragraphs: [
            "Use the instagram link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The instagram link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "instagram link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free instagram link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the instagram link generator",
          paragraphs: [
            "Combine the instagram link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Instagram Link Generator FAQ"} />

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
