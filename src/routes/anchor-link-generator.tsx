import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/anchor-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Do anchors need an id?", "a": "Yes, unless you use a text fragment link."}, {"q": "Are text fragments universal?", "a": "No — Chrome and Edge support them; Safari and Firefox ignore the fragment."}, {"q": "Can anchors show in Google?", "a": "Yes, Google can surface jump-to links for well-structured pages."}, {"q": "Should ids have spaces?", "a": "No — use lowercase hyphenated slugs."}, {"q": "Do anchors affect the canonical URL?", "a": "No, fragments are ignored for indexing."}];
const STEPS = ["Paste the page URL.", "Type the heading you want to link to.", "Copy the jump link and the matching heading markup.", "Add the id to that heading on your page."];
const TITLE = "Anchor Link Generator — Free Online Tool";
const DESC = "Turn a heading into a clean #anchor and get the full jump link plus the heading markup you need on the page.";

export const Route = createFileRoute("/anchor-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/anchor-link-generator",
    name: "Anchor Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Anchor Link Generator", item: "/anchor-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use the ${"Anchor Link Generator"}`,
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Anchor Link Generator" }]} />
      <ToolHero h1={"Jump-To Anchor Link Generator"} intro={DESC} keywords={KW} />

      <ToolForm
        fields={[{"name": "url", "label": "Page URL", "type": "url", "placeholder": "https://example.com/guide"}, {"name": "heading", "label": "Heading text", "type": "text", "placeholder": "How pricing works"}, {"name": "scroll", "label": "Use Chrome text-fragment instead of an id", "type": "checkbox"}]}
        build={(v) => { if(!v.heading) return ''; const slug=String(v.heading).toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-'); const base=String(v.url||'').replace(/#.*$/,''); if(v.scroll) return `${base}#:~:text=${encodeURIComponent(v.heading)}`; return `${base}#${slug}\n<h2 id="${slug}">${v.heading}</h2>`; }}
      />

      <HowToUse heading={"How to use the anchor link generator"} steps={STEPS} />

      <AeoBlock question={"How do I link to a specific part of a page?"} answer={"Give the heading an `id` and append `#id` to the URL. If you can't edit the page, use a text fragment: `#:~:text=your%20phrase`, supported in Chrome and Edge."} keywords={KW} />

      <GeoBlock heading={"USA use cases"} keywords={KW} items={[{"who": "Docs writer in San Francisco, CA", "how": "Links readers to one section."}, {"who": "Support team in Tampa, FL", "how": "Sends customers to an exact FAQ."}, {"who": "Publisher in NYC", "how": "Builds a table of contents."}, {"who": "SEO in Nashville, TN", "how": "Earns jump-to sitelinks."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks heading="Related link generators" links={[{"to": "/html-link-generator", "anchor": "Html Link Generator", "blurb": "related link generator."}, {"to": "/slug-generator", "anchor": "Slug Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/utm-link-generator", "anchor": "Utm Link Generator", "blurb": "related link generator."}]} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
