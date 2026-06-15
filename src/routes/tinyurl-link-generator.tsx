import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/tinyurl-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Is TinyURL free?", "a": "Yes — no signup, no expiry on free links."}, {"q": "Are aliases unique?", "a": "Yes — TinyURL rejects duplicates."}, {"q": "Can browsers block the call?", "a": "Yes — CORS may block direct fetch; open the API URL in a new tab as a fallback."}, {"q": "Will links expire?", "a": "No — TinyURL keeps them indefinitely."}, {"q": "Is there a paid plan?", "a": "Yes — TinyURL Pro adds analytics and branded domains."}];
const STEPS = ["Paste a long URL.", "Optionally pick a custom alias.", "Click Generate to fetch the TinyURL.", "Share the alias anywhere."];
const TITLE = "TinyURL Link Generator — Free Online Tool";
const DESC = "Shorten any URL to a tinyurl.com alias using the free public TinyURL API. Optional custom alias supported.";

export const Route = createFileRoute("/tinyurl-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/tinyurl-link-generator",
    name: "TinyURL Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "TinyURL Link Generator", item: "/tinyurl-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the TinyURL Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "TinyURL Link Generator" }]} />
      <ToolHero h1={"TinyURL Short Link Generator (Free, No Signup)"} intro={"Shorten any URL to a tinyurl.com alias using the free public TinyURL API. Optional custom alias supported."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "Long URL", "type": "url", "placeholder": "https://example.com/very/long/path"}, {"name": "alias", "label": "Custom alias (optional)", "type": "text", "placeholder": "my-link"}]}
        build={(v) => { if(!v.u) return ''; const a=v.alias?`&alias=${encodeURIComponent(v.alias)}`:''; return `https://tinyurl.com/api-create.php?url=${encodeURIComponent(String(v.u).trim())}${a}`; }}
        
      />

      <HowToUse heading={"How to use the tinyurl link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I shorten a URL with TinyURL for free?"}
        answer={"Call `https://tinyurl.com/api-create.php?url=<URL>&alias=<optional>` — TinyURL returns a `tinyurl.com/...` short link instantly without signup."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Marketer in NYC", "how": "Generates campaign-specific tinyurl aliases."}, {"who": "Teacher in Phoenix, AZ", "how": "Shortens worksheet URLs for class handouts."}, {"who": "Podcaster in Brooklyn, NY", "how": "Shares episode links in voice intros."}, {"who": "Realtor in Miami, FL", "how": "Adds custom tinyurl aliases to yard signs."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
