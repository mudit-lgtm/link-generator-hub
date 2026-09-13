import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/discord-invite-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Do invite codes expire?", "a": "Default invites last 7 days; you can set them to never expire in the server's invite settings."}, {"q": "What's a vanity URL?", "a": "A custom `discord.gg/yourname` link available to Boost level 3 servers."}, {"q": "Can I limit uses?", "a": "Yes — set max-uses when creating the invite in Discord."}, {"q": "How do I revoke an invite?", "a": "Server Settings → Invites → delete the row."}, {"q": "Will scammers abuse my link?", "a": "Public invites can attract bots. Use verification gating and a welcome channel."}];
const STEPS = ["Paste a Discord invite code or a full discord.gg URL.", "The tool extracts just the code.", "Copy the cleaned URL.", "Share it in your community channels."];
const TITLE = "Discord Invite Link Generator — Free Online Tool";
const DESC = "Format a discord.gg invite URL from an invite code or a vanity name. Validates the code structure.";

export const Route = createFileRoute("/discord-invite-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/discord-invite-link-generator",
    name: "Discord Invite Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Discord Invite Link Generator", item: "/discord-invite-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Discord Invite Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Discord Invite Link Generator" }]} />
      <ToolHero h1={"Discord Invite Link Generator"} intro={"Format a discord.gg invite URL from an invite code or a vanity name. Validates the code structure."} keywords={KW} />

      <ToolForm
        fields={[{"name": "code", "label": "Invite code or vanity", "type": "text", "placeholder": "abcDEF or your-vanity"}]}
        build={(v) => { const c=(v.code||'').trim().replace(/^.*discord\.gg\//,''); return c?`https://discord.gg/${c}`:''; }}
        
      />

      <HowToUse heading={"How to use the discord invite link generator"} steps={STEPS} />

      <AeoBlock
        question={"What's the format of a Discord invite link?"}
        answer={"`https://discord.gg/<code>` where `<code>` is either an auto-generated invite code or a server's vanity URL (Boost level 3 servers can claim one)."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Community manager in Austin, TX", "how": "Posts a stable vanity invite on the website."}, {"who": "Game dev in Seattle, WA", "how": "Drops invites in YouTube descriptions and Twitter bios."}, {"who": "Streamer in LA, CA", "how": "Shares the server invite in stream overlays."}, {"who": "Open-source maintainer anywhere in the USA", "how": "Adds a contributor Discord invite to the README."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/telegram-link-generator", "anchor": "Telegram Link Generator", "blurb": "t.me channel, group & bot invite URLs."}, {"to": "/whatsapp-link-generator", "anchor": "WhatsApp Link Generator", "blurb": "wa.me click-to-chat link with prefilled message & QR."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
