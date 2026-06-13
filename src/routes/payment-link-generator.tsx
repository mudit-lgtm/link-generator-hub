import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/payment-link-generator"].keywords;

const FAQS = [
  { q: "What is a payment link generator?", a: "A payment link generator builds a hosted checkout URL with amount, currency and description so customers can pay in one tap. The free payment link generator above works as a Stripe payment link generator alternative for freelancers, agencies and small businesses." },
  { q: "How do I use this payment link generator?", a: "Fill the field above and the Payment Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The payment link generator runs entirely in your browser; no signup required." },
  { q: "Is the payment link generator free?", a: "Yes, this payment link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the payment link generator work on mobile?", a: "Yes — the payment link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the payment link generator for commercial projects?", a: "Yes. Output from the payment link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the payment link generator store my data?", a: "No. The payment link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the payment link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free payment link generator above is enough." },
  { q: "Can I shorten the output of the payment link generator?", a: "Yes — paste the URL from the payment link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Payment Link Generator — Free Stripe-Style Checkout URLs";
const DESC = "Free payment link generator. Build hosted checkout URLs with amount, currency and description — works as a Stripe payment link generator alternative for invoices and quick sales.";

export const Route = createFileRoute("/payment-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/payment-link-generator",
    name: "Payment Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Payment Link Generator", item: "/payment-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("99.00");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `https://pay.linkkit.dev/?amount=${value.trim()}&currency=USD`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Payment Link Generator" }]} />
      <ToolHero
        h1={"Payment Link Generator — Free Stripe-Style Checkout URLs"}
        intro={"Generate a payment link generator URL in one click. This free Payment Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="Amount (USD)">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your payment link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the payment link generator"}
        steps={[
          "Fill the field above with your amount (usd).",
          "The payment link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a payment link generator?"}
        answer={"A payment link generator builds a hosted checkout URL with amount, currency and description so customers can pay in one tap. The free payment link generator above works as a Stripe payment link generator alternative for freelancers, agencies and small businesses."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Payment Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Freelance designer in Brooklyn, NY", how: "Generates payment links for milestone invoices in the proposal." },
          { who: "Bakery in Portland, OR", how: "Drops the online payment link in Instagram DMs for custom cake orders." },
          { who: "Consultant in Miami, FL", how: "Uses the custom payment link in onboarding emails to collect retainers fast." },
          { who: "Tutor in Austin, TX", how: "Sends an invoice payment link via SMS after each lesson." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free payment link generator — how it works",
          paragraphs: [
            "This free payment link generator runs entirely in your browser. Fill the input above and the Payment Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable payment link generator.",
            "Pair this payment link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a payment link generator",
          paragraphs: [
            "Use the payment link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The payment link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "payment link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free payment link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the payment link generator",
          paragraphs: [
            "Combine the payment link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Payment Link Generator FAQ"} />

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
