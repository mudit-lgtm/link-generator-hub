import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/slug-generator"]?.keywords ?? [];

const FAQS = [{"q": "Should slugs contain stop words?", "a": "Usually no — strip ‘the’, ‘a’, ‘of’ unless they're integral to the meaning."}, {"q": "Underscores or hyphens?", "a": "Hyphens. Google treats `-` as a separator and `_` as a word joiner."}, {"q": "Does length matter?", "a": "Shorter is better; aim for under 60 characters and 3–5 words."}, {"q": "Should I include the year?", "a": "Only for evergreen content you'll update; otherwise it dates the URL."}, {"q": "What about non-English characters?", "a": "Transliterate to ASCII for maximum compatibility, as this tool does."}];
const STEPS = ["Enter the article title or sentence.", "The slug updates as you type.", "Copy it into your CMS permalink field.", "Avoid changing slugs after publish — redirect if you must."];
const TITLE = "SEO URL Slug Generator — Free Online Tool";
const DESC = "Convert any title into a clean, lowercase, hyphen-separated slug ideal for WordPress permalinks and SEO-friendly URLs.";

export const Route = createFileRoute("/slug-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/slug-generator",
    name: "SEO URL Slug Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "SEO URL Slug Generator", item: "/slug-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the SEO URL Slug Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "SEO URL Slug Generator" }]} />
      <ToolHero h1={"SEO-Friendly URL Slug Generator"} intro={"Convert any title into a clean, lowercase, hyphen-separated slug ideal for WordPress permalinks and SEO-friendly URLs."} keywords={KW} />

      <ToolForm
        fields={[{"name": "t", "label": "Title or sentence", "type": "text", "placeholder": "How to write great SEO titles"}]}
        build={(v) => { return String(v.t||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-').slice(0,80); }}
        
      />

      <HowToUse heading={"How to use the seo url slug generator"} steps={STEPS} />

      <AeoBlock
        question={"What makes a good SEO URL slug?"}
        answer={"Keep it short, lowercase, hyphen-separated, free of stop words and Unicode marks, and include the primary keyword. Google and most CMSs treat hyphens as word separators."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Blogger in Austin, TX", "how": "Generates permalinks before publishing in WordPress."}, {"who": "Headless CMS dev in San Francisco, CA", "how": "Slugifies titles in a content pipeline."}, {"who": "Marketer in NYC", "how": "Cleans up exported product names for landing-page URLs."}, {"who": "SEO consultant in Chicago, IL", "how": "Standardizes client-site URL hygiene."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
