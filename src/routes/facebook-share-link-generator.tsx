import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/facebook-share-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does the preview look right?", "a": "Facebook pulls Open Graph tags (`og:title`, `og:image`, `og:description`) — set those on your URL."}, {"q": "Why is the image missing?", "a": "Add an `og:image` of at least 1200×630px to the shared page."}, {"q": "Can I prefill a caption?", "a": "Facebook removed prefilled captions in 2017; users type their own."}, {"q": "Will this work on mobile?", "a": "Yes — mobile browsers open the Facebook app if installed."}, {"q": "Can I track shares?", "a": "Use a UTM-tagged URL inside the `u=` parameter."}];
const STEPS = ["Paste the URL to share.", "Copy the sharer URL.", "Use it on share buttons, emails or QR codes."];
const TITLE = "Facebook Share Link Generator — Free Online Tool";
const DESC = "Build a `facebook.com/sharer` URL that opens Facebook's share dialog pre-filled with any link.";

export const Route = createFileRoute("/facebook-share-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/facebook-share-link-generator",
    name: "Facebook Share Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Facebook Share Link Generator", item: "/facebook-share-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Facebook Share Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Facebook Share Link Generator" }]} />
      <ToolHero h1={"Facebook Share Dialog Link Generator"} intro={"Build a `facebook.com/sharer` URL that opens Facebook's share dialog pre-filled with any link."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "URL to share", "type": "url", "placeholder": "https://example.com/article"}]}
        build={(v) => { if(!v.u) return ''; return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(String(v.u).trim())}`; }}
        
      />

      <HowToUse heading={"How to use the facebook share link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a Facebook share link?"}
        answer={"Use `https://www.facebook.com/sharer/sharer.php?u=<URL>`. Clicking it opens Facebook's share dialog pre-populated with the URL's Open Graph preview."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Publisher in NYC", "how": "Adds Share buttons under every article."}, {"who": "E-commerce brand in Austin, TX", "how": "Sends Facebook share CTAs in post-purchase emails."}, {"who": "Nonprofit in Chicago, IL", "how": "Asks supporters to share fundraising pages."}, {"who": "SaaS in San Francisco, CA", "how": "Lets users share milestone achievements."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/instagram-link-generator", "anchor": "Instagram Link Generator", "blurb": "related link generator."}, {"to": "/linkedin-link-generator", "anchor": "LinkedIn Link Generator", "blurb": "related link generator."}, {"to": "/telegram-link-generator", "anchor": "Telegram Link Generator", "blurb": "related link generator."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
