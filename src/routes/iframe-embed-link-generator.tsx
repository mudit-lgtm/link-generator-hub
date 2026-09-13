import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/iframe-embed-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Why is my iframe blank?", "a": "The target site likely blocks framing with X-Frame-Options or CSP frame-ancestors."}, {"q": "How do I embed YouTube?", "a": "Use the youtube.com/embed/VIDEO_ID form, not the watch URL."}, {"q": "Is lazy loading included?", "a": "Yes, loading=\"lazy\" is added so embeds don't slow first paint."}, {"q": "Can I make it responsive?", "a": "Keep width at 100% and wrap it in a container with a fixed aspect ratio."}, {"q": "Does it hurt SEO?", "a": "Iframe content isn't credited to your page, so keep key text outside the frame."}];
const STEPS = ["Paste the embed URL (use /embed/ for YouTube).", "Add a short title for screen readers.", "Set width and height.", "Copy the snippet into your HTML."];
const TITLE = "Iframe Embed Link Generator — Free Online Tool";
const DESC = "Generate a clean iframe embed snippet for any page, video or map, with your own size and fullscreen permissions.";

export const Route = createFileRoute("/iframe-embed-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/iframe-embed-link-generator",
    name: "Iframe Embed Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Iframe Embed Link Generator", item: "/iframe-embed-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use the ${"Iframe Embed Link Generator"}`,
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Iframe Embed Link Generator" }]} />
      <ToolHero h1={"Iframe Embed Code Generator"} intro={DESC} keywords={KW} />

      <ToolForm
        fields={[{"name": "url", "label": "URL to embed", "type": "url", "placeholder": "https://www.youtube.com/embed/dQw4w9WgXcQ"}, {"name": "title", "label": "Accessible title", "type": "text", "placeholder": "Product demo video"}, {"name": "width", "label": "Width", "type": "text", "default": "100%"}, {"name": "height", "label": "Height (px)", "type": "number", "default": "420"}, {"name": "fs", "label": "Allow fullscreen", "type": "checkbox", "default": true}]}
        build={(v) => { if(!v.url) return ''; const w=v.width||'100%'; const h=v.height||420; return `<iframe src="${v.url}" width="${w}" height="${h}" title="${v.title||'Embedded content'}" style="border:0" loading="lazy"${v.fs?' allowfullscreen':''}></iframe>`; }}
      />

      <HowToUse heading={"How to use the iframe link generator"} steps={STEPS} />

      <AeoBlock question={"How do I embed a link in an iframe?"} answer={"Use `<iframe src=\"URL\" title=\"...\" loading=\"lazy\"></iframe>`. Sites that send `X-Frame-Options: DENY` cannot be embedded — use a normal link instead."} keywords={KW} />

      <GeoBlock heading={"USA use cases"} keywords={KW} items={[{"who": "SaaS team in San Jose, CA", "how": "Embeds demo videos."}, {"who": "Realtor in Denver, CO", "how": "Embeds a map of listings."}, {"who": "School in Columbus, OH", "how": "Embeds a signup form."}, {"who": "Nonprofit in Atlanta, GA", "how": "Embeds a donation page."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks heading="Related link generators" links={[{"to": "/html-link-generator", "anchor": "Html Link Generator", "blurb": "Clickable HTML, Markdown and BBCode link code."}, {"to": "/video-link-generator", "anchor": "Video Link Generator", "blurb": "Direct MP4 / video share URL builder."}, {"to": "/youtube-link-generator", "anchor": "Youtube Link Generator", "blurb": "Subscribe, auto-subscribe & timestamped YouTube links."}, {"to": "/google-maps-link-generator", "anchor": "Google Maps Link Generator", "blurb": "Maps & directions link from address, lat/lng or Place ID."}]} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
