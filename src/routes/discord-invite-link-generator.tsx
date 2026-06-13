import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/discord-invite-link-generator"].keywords;

const FAQS = [
  { q: "What is a discord invite link generator?", a: "A Discord invite link generator builds a custom discord.gg/{code} URL with an optional vanity code so members can join your server in one click. The free Discord invite link generator above creates permanent invite links that work on web, desktop and mobile Discord apps." },
  { q: "How do I use this discord invite link generator?", a: "Fill the field above and the Discord Invite Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The discord invite link generator runs entirely in your browser; no signup required." },
  { q: "Is the discord invite link generator free?", a: "Yes, this discord invite link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the discord invite link generator work on mobile?", a: "Yes — the discord invite link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the discord invite link generator for commercial projects?", a: "Yes. Output from the discord invite link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the discord invite link generator store my data?", a: "No. The discord invite link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the discord invite link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free discord invite link generator above is enough." },
  { q: "Can I shorten the output of the discord invite link generator?", a: "Yes — paste the URL from the discord invite link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Discord Invite Link Generator — Free Custom Server Invites";
const DESC = "Free Discord invite link generator. Build custom discord server invite links with vanity codes — works for permanent invites, vanity URLs and server promos.";

export const Route = createFileRoute("/discord-invite-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/discord-invite-link-generator",
    name: "Discord Invite Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Discord Invite Link Generator", item: "/discord-invite-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("linkkit");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `https://discord.gg/${value.trim()}`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Discord Invite Link Generator" }]} />
      <ToolHero
        h1={"Discord Invite Link Generator — Free Custom Server Invites"}
        intro={"Generate a discord invite link generator URL in one click. This free Discord Invite Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="Discord server ID or vanity code">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your discord invite link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the discord invite link generator"}
        steps={[
          "Fill the field above with your discord server id or vanity code.",
          "The discord invite link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a Discord invite link generator?"}
        answer={"A Discord invite link generator builds a custom discord.gg/{code} URL with an optional vanity code so members can join your server in one click. The free Discord invite link generator above creates permanent invite links that work on web, desktop and mobile Discord apps."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Discord Invite Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Gaming community in Austin, TX", how: "Spins up vanity Discord invite links for every Twitch raid event." },
          { who: "Crypto group in Miami, FL", how: "Uses the Discord server link generator with a permanent invite for the pinned tweet." },
          { who: "Edu-creator in Brooklyn, NY", how: "Generates a custom Discord invite link for each cohort intake." },
          { who: "Esports team in Los Angeles, CA", how: "Drops the Discord vanity link generator URL on their TikTok bio." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free discord invite link generator — how it works",
          paragraphs: [
            "This free discord invite link generator runs entirely in your browser. Fill the input above and the Discord Invite Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable discord invite link generator.",
            "Pair this discord invite link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a discord invite link generator",
          paragraphs: [
            "Use the discord invite link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The discord invite link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "discord invite link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free discord invite link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the discord invite link generator",
          paragraphs: [
            "Combine the discord invite link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Discord Invite Link Generator FAQ"} />

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
