import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/pinterest-share-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does Pinterest need the image to be publicly hosted?", "a": "Yes — the `media` URL must be reachable."}, {"q": "Can I prefill a board?", "a": "No — users pick the board in the dialog."}, {"q": "Will the URL work for video Pins?", "a": "Use the image-only Pin-It URL; video Pins require the API."}, {"q": "Why is the description blank?", "a": "Pinterest may strip it; rich snippets work better via `og:description`."}, {"q": "Is there a rich Pin requirement?", "a": "Rich Pins read schema.org markup from your page."}];
const STEPS = ["Paste the image URL.", "Add the page URL and description.", "Copy the Pin-It URL.", "Wire to your share buttons."];
const TITLE = "Pinterest Share Link Generator — Free Online Tool";
const DESC = "Build a `pinterest.com/pin/create` URL that opens the Pin-It dialog with your image, source URL and description ready to go.";

export const Route = createFileRoute("/pinterest-share-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/pinterest-share-link-generator",
    name: "Pinterest Share Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Pinterest Share Link Generator", item: "/pinterest-share-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Pinterest Share Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Pinterest Share Link Generator" }]} />
      <ToolHero h1={"Pinterest Pin-It Share Link Generator"} intro={"Build a `pinterest.com/pin/create` URL that opens the Pin-It dialog with your image, source URL and description ready to go."} keywords={KW} />

      <ToolForm
        fields={[{"name": "media", "label": "Image URL", "type": "url", "placeholder": "https://example.com/image.jpg"}, {"name": "u", "label": "Source page URL", "type": "url", "placeholder": "https://example.com/page"}, {"name": "desc", "label": "Description", "type": "text", "placeholder": "Caption for the Pin"}]}
        build={(v) => { if(!v.media) return ''; const q=new URLSearchParams({media:v.media}); if(v.u) q.set('url',v.u); if(v.desc) q.set('description',v.desc); return `https://www.pinterest.com/pin/create/button/?${q.toString()}`; }}
        
      />

      <HowToUse heading={"How to use the pinterest share link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a Pinterest share link?"}
        answer={"Use `https://www.pinterest.com/pin/create/button/?media=<image>&url=<page>&description=<text>`."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Blogger in Charlotte, NC", "how": "Adds Pin-It buttons to every recipe."}, {"who": "Etsy seller in Portland, OR", "how": "Promotes listings to Pinterest with one click."}, {"who": "Interior designer in Dallas, TX", "how": "Pins portfolio shots from the website."}, {"who": "Wedding planner in Charleston, SC", "how": "Shares inspiration boards."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/facebook-share-link-generator", "anchor": "Facebook Share Link Generator", "blurb": "related link generator."}, {"to": "/instagram-link-generator", "anchor": "Instagram Link Generator", "blurb": "related link generator."}, {"to": "/twitter-share-link-generator", "anchor": "Twitter Share Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
