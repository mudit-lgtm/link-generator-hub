import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/tiktok-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does TikTok open in app?", "a": "Yes if installed; otherwise the link opens the mobile web preview."}, {"q": "Can I track clicks?", "a": "Wrap the URL with a UTM-tagged short link."}, {"q": "Why use @user/video/ID?", "a": "TikTok accepts a placeholder @user and resolves the canonical handle from the video ID."}, {"q": "Are sound links permanent?", "a": "Yes — TikTok's music IDs are stable until a sound is taken down."}, {"q": "Will this work for private accounts?", "a": "The URL opens, but content stays gated to approved followers."}];
const STEPS = ["Pick profile, video, or sound.", "Paste the handle or ID.", "Copy the URL.", "Use it in bios, ads or QR codes."];
const TITLE = "TikTok Link Generator — Free Online Tool";
const DESC = "Build TikTok URLs for a profile, single video or the system share dialog.";

export const Route = createFileRoute("/tiktok-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/tiktok-link-generator",
    name: "TikTok Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "TikTok Link Generator", item: "/tiktok-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the TikTok Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "TikTok Link Generator" }]} />
      <ToolHero h1={"TikTok Profile, Video & Share Link Generator"} intro={"Build TikTok URLs for a profile, single video or the system share dialog."} keywords={KW} />

      <ToolForm
        fields={[{"name": "kind", "label": "Link type", "type": "select", "options": [{"value": "profile", "label": "Profile (@user)"}, {"value": "video", "label": "Video by ID"}, {"value": "sound", "label": "Sound by ID"}]}, {"name": "value", "label": "Username or ID", "type": "text", "placeholder": "username or 1234567890123"}]}
        build={(v) => { const x=(v.value||'').trim().replace(/^@/,''); if(!x) return ''; if(v.kind==='video') return `https://www.tiktok.com/@user/video/${x}`; if(v.kind==='sound') return `https://www.tiktok.com/music/${x}`; return `https://www.tiktok.com/@${x}`; }}
        
      />

      <HowToUse heading={"How to use the tiktok link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a TikTok profile or video link?"}
        answer={"Profile: `https://www.tiktok.com/@<username>`. Single video: `https://www.tiktok.com/@user/video/<id>`. Sound: `https://www.tiktok.com/music/<id>`."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Creator in LA, CA", "how": "Pins TikTok profile link in every bio."}, {"who": "DTC brand in Austin, TX", "how": "Cross-promotes campaign videos from email."}, {"who": "Music label in Nashville, TN", "how": "Drops sound IDs into press kits."}, {"who": "Restaurant in Miami, FL", "how": "Embeds viral menu videos on the site."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/instagram-link-generator", "anchor": "Instagram Link Generator", "blurb": "Profile, DM and story-share Instagram URLs."}, {"to": "/twitter-share-link-generator", "anchor": "Twitter Share Link Generator", "blurb": "Pre-filled tweet intent URL builder."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
