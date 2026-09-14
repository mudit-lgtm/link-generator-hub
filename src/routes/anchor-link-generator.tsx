import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
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

      <WorkedExample intro={"A long pricing guide that needs shareable links straight to each section."} rows={[{"input": "Heading \"Annual plans\"", "output": "id=\"annual-plans\" and href=\"#annual-plans\""}, {"input": "Same page, absolute form", "output": "https://example.com/pricing#annual-plans"}, {"input": "Heading with an ampersand: \"Fees & refunds\"", "output": "fees-refunds \u2014 symbols are dropped, not encoded"}]} note={"Chrome also supports text fragments (#:~:text=annual%20plans) when you cannot edit the page to add an id."} />

      <Pitfalls items={[{"problem": "Duplicate ids on one page", "fix": "Only the first match wins. Suffix repeats (-2) or the jump silently lands in the wrong place."}, {"problem": "A sticky header covering the target", "fix": "Add scroll-margin-top to the heading equal to the header height, otherwise the title hides behind the bar."}, {"problem": "Renaming a heading later", "fix": "The id changes and every shared link breaks. Keep the original id even if the wording changes."}, {"problem": "Using spaces or capitals in an id", "fix": "Stick to lowercase and hyphens; mixed case behaves inconsistently across browsers and analytics tools."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks heading="Related link generators" links={[{"to": "/html-link-generator", "anchor": "Html Link Generator", "blurb": "Clickable HTML, Markdown and BBCode link code."}, {"to": "/slug-generator", "anchor": "Slug Generator", "blurb": "Clean WordPress-friendly permalinks & SEO URL slugs."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/utm-link-generator", "anchor": "Utm Link Generator", "blurb": "Build Google Analytics UTM campaign tracking links."}]} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
