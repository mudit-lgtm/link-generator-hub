import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/telegram-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Do users need Telegram installed?", "a": "Yes for app deep-link; otherwise t.me opens a web preview with a Join button."}, {"q": "What's the `start` payload?", "a": "A short string a bot receives when a user taps the link — useful for tracking referrers."}, {"q": "Are usernames case-sensitive?", "a": "No — t.me normalizes them."}, {"q": "Can I create a t.me link for private groups?", "a": "Use the group's invite link from Telegram's admin panel."}, {"q": "How do I shorten t.me links?", "a": "Pass the URL to our short-link generator."}];
const STEPS = ["Pick the link type.", "Enter the username, bot name, or URL to share.", "Copy the t.me URL.", "Drop it in social bios, emails or QR codes."];
const TITLE = "Telegram Link Generator — Free Online Tool";
const DESC = "Build a t.me URL for a Telegram channel, group, bot or the share-link intent.";

export const Route = createFileRoute("/telegram-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/telegram-link-generator",
    name: "Telegram Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Telegram Link Generator", item: "/telegram-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Telegram Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Telegram Link Generator" }]} />
      <ToolHero h1={"Telegram t.me Link Generator (Channel, Group, Bot, Share)"} intro={"Build a t.me URL for a Telegram channel, group, bot or the share-link intent."} keywords={KW} />

      <ToolForm
        fields={[{"name": "kind", "label": "Link type", "type": "select", "options": [{"value": "channel", "label": "Channel / group / user"}, {"value": "bot", "label": "Bot with /start"}, {"value": "share", "label": "Share URL"}]}, {"name": "value", "label": "Username, bot name, or URL to share", "type": "text", "placeholder": "yourchannel"}]}
        build={(v) => { const x=(v.value||'').trim().replace(/^@/,''); if(!x) return ''; if(v.kind==='share') return `https://t.me/share/url?url=${encodeURIComponent(x)}`; if(v.kind==='bot') return `https://t.me/${x}?start=hi`; return `https://t.me/${x}`; }}
        
      />

      <HowToUse heading={"How to use the telegram link generator"} steps={STEPS} />

      <AeoBlock
        question={"What's the format of a Telegram t.me link?"}
        answer={"`https://t.me/<username>` for users, channels and groups; `https://t.me/<bot>?start=<payload>` for bots; `https://t.me/share/url?url=<URL>` for the share intent."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Crypto project in Miami, FL", "how": "Distributes its t.me channel in social bios."}, {"who": "Community manager in Austin, TX", "how": "Embeds bot deep-links in product onboarding."}, {"who": "Newsletter in Brooklyn, NY", "how": "Adds a ‘Share on Telegram’ button to articles."}, {"who": "Game studio in Seattle, WA", "how": "Sends Telegram channel invites in patch notes."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/discord-invite-link-generator", "anchor": "Discord Invite Link Generator", "blurb": "related link generator."}, {"to": "/whatsapp-link-generator", "anchor": "WhatsApp Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
