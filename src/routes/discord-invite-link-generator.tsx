import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
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

      <WorkedExample intro={"A public community invite that will not expire halfway through a launch week."} rows={[{"input": "Invite code aB3dEf", "output": "https://discord.gg/aB3dEf"}, {"input": "Vanity URL (level 3 servers)", "output": "https://discord.gg/yourbrand"}, {"input": "Default settings", "output": "Expires in 7 days, 0 max uses \u2014 set both to never for a website link"}]} note={"Discord defaults every new invite to 7 days. A link printed on a site or video needs expiry explicitly set to never."} />

      <Pitfalls items={[{"problem": "Posting a temporary invite publicly", "fix": "It dies in a week and the traffic hits a \"invite invalid\" screen with no recovery path."}, {"problem": "Inviting straight into a busy channel", "fix": "Point the invite at a rules or welcome channel so new arrivals know what to do first."}, {"problem": "Temporary membership left on", "fix": "That setting kicks people when they disconnect; most server owners enable it by accident."}, {"problem": "No verification level", "fix": "A public invite with no verification attracts spam bots within hours. Require a verified email at minimum."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/telegram-link-generator", "anchor": "Telegram Link Generator", "blurb": "t.me channel, group & bot invite URLs."}, {"to": "/whatsapp-link-generator", "anchor": "WhatsApp Link Generator", "blurb": "wa.me click-to-chat link with prefilled message & QR."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
