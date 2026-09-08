import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { ShareAndGuestbook } from "@/components/backlink-block";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/affiliate-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "What is the `ascsubtag` parameter?", "a": "Amazon's sub-ID parameter — useful for attribution across campaigns or pages inside a single Associates account."}, {"q": "Will tagging break the product URL?", "a": "No — Amazon ignores extra params and still loads the right product."}, {"q": "Do I need to disclose affiliate links?", "a": "Yes — the FTC requires clear disclosure on US-facing content."}, {"q": "Can I use this for non-Amazon affiliates?", "a": "Yes — change the parameter name to match your network (e.g. `aff_id`, `partner`)."}, {"q": "Why is my tag stripped sometimes?", "a": "Affiliate redirects from other networks can drop params. Use a permalink directly to the merchant."}];
const STEPS = ["Paste a product URL.", "Confirm or change the affiliate parameter name.", "Enter your tag and optional sub-ID.", "Copy the tagged URL into posts, videos or email."];
const TITLE = "Affiliate Link Generator — Free Online Tool";
const DESC = "Append your affiliate tag to any product URL. Works for Amazon Associates (`tag=`), AliExpress and any generic affiliate parameter.";

export const Route = createFileRoute("/affiliate-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/affiliate-link-generator",
    name: "Affiliate Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Affiliate Link Generator", item: "/affiliate-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Affiliate Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Affiliate Link Generator" }]} />
      <ToolHero h1={"Amazon & AliExpress Affiliate Link Generator"} intro={"Append your affiliate tag to any product URL. Works for Amazon Associates (`tag=`), AliExpress and any generic affiliate parameter."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "Product URL", "type": "url", "placeholder": "https://www.amazon.com/dp/B08N5WRWNW"}, {"name": "param", "label": "Tag parameter name", "type": "text", "default": "tag", "placeholder": "tag"}, {"name": "tag", "label": "Your affiliate tag", "type": "text", "placeholder": "yourtag-20"}, {"name": "sub", "label": "Sub-ID (optional, for tracking)", "type": "text"}]}
        build={(v) => { if(!v.u||!v.tag) return ''; try{ const url=new URL(v.u); url.searchParams.set(v.param||'tag',v.tag); if(v.sub) url.searchParams.set('ascsubtag',v.sub); return url.toString(); }catch{return ''} }}
        
      />

      <HowToUse heading={"How to use the affiliate link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I build an Amazon affiliate link?"}
        answer={"Take any Amazon product URL and append `?tag=yourtag-20` (or `&tag=…` if the URL already has a query). Add `&ascsubtag=` for per-placement tracking inside Amazon Associates reports."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Tech blogger in Brooklyn, NY", "how": "Tags every product mention with the post slug as ascsubtag."}, {"who": "Home-cook YouTuber in Austin, TX", "how": "Builds a kitchen-gear page that funnels to Amazon Associates."}, {"who": "Affiliate marketer in Phoenix, AZ", "how": "Tracks AliExpress conversions per landing page with sub-IDs."}, {"who": "SEO consultant in Chicago, IL", "how": "Adds tagged buy buttons to client comparison posts."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "related link generator."}, {"to": "/referral-link-generator", "anchor": "Referral Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}]}
      />

      <ShareAndGuestbook path="/affiliate-link-generator" title={TITLE} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
