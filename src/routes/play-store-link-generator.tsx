import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/play-store-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "How do I find the package name?", "a": "It's the `id` shown in the Play Store URL of a published app."}, {"q": "What is the install referrer?", "a": "A string Google Play forwards to your app for attribution."}, {"q": "Can I link to a region?", "a": "Append `&hl=<lang>&gl=<country>` for locale and country."}, {"q": "Will the link open the Play app?", "a": "Yes — Android intent handlers route play.google.com URLs."}, {"q": "Is there a deep-link alternative?", "a": "Use `market://details?id=<package>` for in-device app links."}];
const STEPS = ["Paste the package name.", "Optionally add an install referrer string.", "Copy the Play Store URL.", "Use in ads, landing pages or QR codes."];
const TITLE = "Google Play Store Link Generator — Free Online Tool";
const DESC = "Build canonical play.google.com URLs from an Android package name, with optional referrer for install attribution.";

export const Route = createFileRoute("/play-store-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/play-store-link-generator",
    name: "Google Play Store Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Google Play Store Link Generator", item: "/play-store-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Google Play Store Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Google Play Store Link Generator" }]} />
      <ToolHero h1={"Google Play Store Link Generator"} intro={"Build canonical play.google.com URLs from an Android package name, with optional referrer for install attribution."} keywords={KW} />

      <ToolForm
        fields={[{"name": "pkg", "label": "Package name", "type": "text", "placeholder": "com.example.app"}, {"name": "referrer", "label": "Install referrer (optional)", "type": "text", "placeholder": "utm_source=site"}]}
        build={(v) => { if(!v.pkg) return ''; const ref=v.referrer?`&referrer=${encodeURIComponent(v.referrer)}`:''; return `https://play.google.com/store/apps/details?id=${v.pkg}${ref}`; }}
        
      />

      <HowToUse heading={"How to use the google play store link generator"} steps={STEPS} />

      <AeoBlock
        question={"What's the Google Play Store URL format?"}
        answer={"`https://play.google.com/store/apps/details?id=<package>` — optionally append `&referrer=<utm>` for Play Install Referrer attribution."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Indie Android dev in Austin, TX", "how": "Tags Play links with UTM referrers for campaigns."}, {"who": "Game publisher in Seattle, WA", "how": "Generates regional Play Store URLs."}, {"who": "Marketing agency in NYC", "how": "Builds Play Install Referrer URLs for clients."}, {"who": "Startup in San Francisco, CA", "how": "Adds Play badges to landing pages."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/app-store-link-generator", "anchor": "App Store Link Generator", "blurb": "related link generator."}, {"to": "/deep-link-generator", "anchor": "Deep Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
