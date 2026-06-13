import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/paypal-me-link-generator"].keywords;

const FAQS = [
  { q: "What is a paypal.me link generator?", a: "A PayPal.Me link generator builds a paypal.me/{username}/{amount} URL that opens PayPal's payment screen pre-filled with your amount and currency. The free PayPal.Me link generator above is perfect for freelancers, streamers, tutors and side-hustlers in the USA." },
  { q: "How do I use this paypal.me link generator?", a: "Fill the field above and the PayPal.Me Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The paypal.me link generator runs entirely in your browser; no signup required." },
  { q: "Is the paypal.me link generator free?", a: "Yes, this paypal.me link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the paypal.me link generator work on mobile?", a: "Yes — the paypal.me link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the paypal.me link generator for commercial projects?", a: "Yes. Output from the paypal.me link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the paypal.me link generator store my data?", a: "No. The paypal.me link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the paypal.me link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free paypal.me link generator above is enough." },
  { q: "Can I shorten the output of the paypal.me link generator?", a: "Yes — paste the URL from the paypal.me link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "PayPal.Me Link Generator — Free Custom Payment Request URL";
const DESC = "Free PayPal.Me link generator. Build paypal.me/yourname/amount URLs with currency for instant payment requests — perfect for invoices, tips and quick collections.";

export const Route = createFileRoute("/paypal-me-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/paypal-me-link-generator",
    name: "PayPal.Me Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "PayPal.Me Link Generator", item: "/paypal-me-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("linkkit");
  const [amount, setAmount] = useState("25.00");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `https://paypal.me/${value.trim()}/${encodeURIComponent(amount.trim())}USD`;
  }, [value, amount]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "PayPal.Me Link Generator" }]} />
      <ToolHero
        h1={"PayPal.Me Link Generator — Free Custom Payment Request URL"}
        intro={"Generate a paypal.me link generator URL in one click. This free PayPal.Me Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="PayPal.Me username">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <Field label="Amount (USD)">
          <input className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your paypal.me link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the paypal.me link generator"}
        steps={[
          "Fill the field above with your paypal.me username.",
          "The paypal.me link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a PayPal.Me link generator?"}
        answer={"A PayPal.Me link generator builds a paypal.me/{username}/{amount} URL that opens PayPal's payment screen pre-filled with your amount and currency. The free PayPal.Me link generator above is perfect for freelancers, streamers, tutors and side-hustlers in the USA."}
        keywords={KW}
      />

      <GeoBlock
        heading={"PayPal.Me Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Wedding photographer in Charleston, SC", how: "Sends PayPal.Me links via text for deposit collection." },
          { who: "Twitch streamer in Las Vegas, NV", how: "Pastes the paypal.me link generator URL in chat for tip jars." },
          { who: "Etsy seller in Brooklyn, NY", how: "Uses the PayPal link generator for custom order pre-payments." },
          { who: "Tutor in Atlanta, GA", how: "Drops the paypal request link in lesson confirmation emails." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free paypal.me link generator — how it works",
          paragraphs: [
            "This free paypal.me link generator runs entirely in your browser. Fill the input above and the PayPal.Me Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable paypal.me link generator.",
            "Pair this paypal.me link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a paypal.me link generator",
          paragraphs: [
            "Use the paypal.me link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The paypal.me link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "paypal.me link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free paypal.me link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the paypal.me link generator",
          paragraphs: [
            "Combine the paypal.me link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"PayPal.Me Link Generator FAQ"} />

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
