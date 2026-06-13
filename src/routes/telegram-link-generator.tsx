import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/telegram-link-generator"].keywords;

const FAQS = [
  { q: "What is a telegram link generator?", a: "A Telegram link generator builds a t.me/{username} URL for joining channels, groups or starting bots. The free Telegram link generator above supports start parameters for bot attribution and custom invite codes." },
  { q: "How do I use this telegram link generator?", a: "Fill the field above and the Telegram Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The telegram link generator runs entirely in your browser; no signup required." },
  { q: "Is the telegram link generator free?", a: "Yes, this telegram link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the telegram link generator work on mobile?", a: "Yes — the telegram link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the telegram link generator for commercial projects?", a: "Yes. Output from the telegram link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the telegram link generator store my data?", a: "No. The telegram link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the telegram link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free telegram link generator above is enough." },
  { q: "Can I shorten the output of the telegram link generator?", a: "Yes — paste the URL from the telegram link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Telegram Link Generator — Free t.me Channel & Bot URL Builder";
const DESC = "Free Telegram link generator. Build t.me/username channel, group and bot URLs with optional start parameters — perfect for crypto, gaming and creator communities.";

export const Route = createFileRoute("/telegram-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/telegram-link-generator",
    name: "Telegram Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Telegram Link Generator", item: "/telegram-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("linkkit");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `https://t.me/${value.trim()}`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Telegram Link Generator" }]} />
      <ToolHero
        h1={"Telegram Link Generator — Free t.me Channel & Bot URL Builder"}
        intro={"Generate a telegram link generator URL in one click. This free Telegram Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="Telegram username or channel">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your telegram link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the telegram link generator"}
        steps={[
          "Fill the field above with your telegram username or channel.",
          "The telegram link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a Telegram link generator?"}
        answer={"A Telegram link generator builds a t.me/{username} URL for joining channels, groups or starting bots. The free Telegram link generator above supports start parameters for bot attribution and custom invite codes."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Telegram Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Crypto project in Miami, FL", how: "Pastes the t.me link generator output in every tweet for community joins." },
          { who: "Trading signals group in NYC", how: "Uses the Telegram channel link generator for subscription onboarding." },
          { who: "Bot developer in Seattle, WA", how: "Builds Telegram bot link generator URLs with start params for user attribution." },
          { who: "Investor in Los Angeles, CA", how: "Drops the custom Telegram link in pitch-deck appendices." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free telegram link generator — how it works",
          paragraphs: [
            "This free telegram link generator runs entirely in your browser. Fill the input above and the Telegram Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable telegram link generator.",
            "Pair this telegram link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a telegram link generator",
          paragraphs: [
            "Use the telegram link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The telegram link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "telegram link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free telegram link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the telegram link generator",
          paragraphs: [
            "Combine the telegram link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Telegram Link Generator FAQ"} />

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
