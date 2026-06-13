import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/facebook-share-link-generator"].keywords;

const FAQS = [
  { q: "What is a facebook share link generator?", a: "A Facebook share link generator builds a facebook.com/sharer URL that opens Facebook's share dialog pre-filled with your page URL. The free Facebook share link generator above powers share buttons on blogs, e-commerce stores and news sites without loading the FB SDK." },
  { q: "How do I use this facebook share link generator?", a: "Fill the field above and the Facebook Share Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The facebook share link generator runs entirely in your browser; no signup required." },
  { q: "Is the facebook share link generator free?", a: "Yes, this facebook share link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the facebook share link generator work on mobile?", a: "Yes — the facebook share link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the facebook share link generator for commercial projects?", a: "Yes. Output from the facebook share link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the facebook share link generator store my data?", a: "No. The facebook share link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the facebook share link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free facebook share link generator above is enough." },
  { q: "Can I shorten the output of the facebook share link generator?", a: "Yes — paste the URL from the facebook share link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Facebook Share Link Generator — Free Share Dialog URL";
const DESC = "Free Facebook share link generator. Build facebook.com/sharer URLs that open the share dialog pre-filled with any URL — perfect for share buttons, blog CTAs and viral promos.";

export const Route = createFileRoute("/facebook-share-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/facebook-share-link-generator",
    name: "Facebook Share Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Facebook Share Link Generator", item: "/facebook-share-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("https://example.com/article");
  const out = useMemo(() => {
    const encoded = encodeURIComponent(value.trim());
    if (!value.trim()) return "";
    return `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Facebook Share Link Generator" }]} />
      <ToolHero
        h1={"Facebook Share Link Generator — Free Share Dialog URL"}
        intro={"Generate a facebook share link generator URL in one click. This free Facebook Share Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="URL to share">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your facebook share link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the facebook share link generator"}
        steps={[
          "Fill the field above with your url to share.",
          "The facebook share link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a Facebook share link generator?"}
        answer={"A Facebook share link generator builds a facebook.com/sharer URL that opens Facebook's share dialog pre-filled with your page URL. The free Facebook share link generator above powers share buttons on blogs, e-commerce stores and news sites without loading the FB SDK."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Facebook Share Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Blogger in Austin, TX", how: "Adds a Facebook share button link to every WordPress post." },
          { who: "News site in Washington, DC", how: "Embeds the Facebook share URL generator output in article footers." },
          { who: "E-commerce store in Brooklyn, NY", how: "Drops the FB share link in post-purchase emails for referral lift." },
          { who: "Non-profit in Atlanta, GA", how: "Uses the custom Facebook share link in donation thank-you pages." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free facebook share link generator — how it works",
          paragraphs: [
            "This free facebook share link generator runs entirely in your browser. Fill the input above and the Facebook Share Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable facebook share link generator.",
            "Pair this facebook share link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a facebook share link generator",
          paragraphs: [
            "Use the facebook share link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The facebook share link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "facebook share link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free facebook share link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the facebook share link generator",
          paragraphs: [
            "Combine the facebook share link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Facebook Share Link Generator FAQ"} />

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
