import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/deep-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Will deep links open without the app?", "a": "No — pair with Universal Links (iOS) or App Links (Android) so the web URL falls back if the app is absent."}, {"q": "Do iOS apps register schemes?", "a": "Yes — declare `CFBundleURLSchemes` in Info.plist."}, {"q": "Can I track deep-link clicks?", "a": "Use Branch, Adjust, AppsFlyer or your own attribution layer."}, {"q": "Are dashes valid in schemes?", "a": "No — schemes must match `[a-z0-9]+`."}, {"q": "How do I escape special characters?", "a": "URL-encode each value; our tool does it for you."}];
const STEPS = ["Enter the URL scheme (no `://`).", "Set the path and optional query params.", "Copy the deep link.", "Test from notes, SMS or Safari."];
const TITLE = "Deep Link Generator — Free Online Tool";
const DESC = "Assemble a custom-scheme deep link (`yourapp://path?key=value`) for mobile, desktop and web app handlers.";

export const Route = createFileRoute("/deep-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/deep-link-generator",
    name: "Deep Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Deep Link Generator", item: "/deep-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Deep Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Deep Link Generator" }]} />
      <ToolHero h1={"App Deep Link & Custom URL Scheme Generator"} intro={"Assemble a custom-scheme deep link (`yourapp://path?key=value`) for mobile, desktop and web app handlers."} keywords={KW} />

      <ToolForm
        fields={[{"name": "scheme", "label": "URL scheme", "type": "text", "placeholder": "yourapp"}, {"name": "path", "label": "Path", "type": "text", "placeholder": "product/123"}, {"name": "q", "label": "Query params (key=value per line)", "type": "textarea", "placeholder": "ref=email\\ncampaign=spring"}]}
        build={(v) => { if(!v.scheme) return ''; const params=(v.q||'').split(/\r?\n/).filter(Boolean).map((l: string)=>{const [k,...r]=l.split('='); return `${encodeURIComponent(k.trim())}=${encodeURIComponent(r.join('=').trim())}`;}).join('&'); const qs=params?`?${params}`:''; return `${v.scheme}://${(v.path||'').replace(/^\/+/,'')}${qs}`; }}
        
      />

      <HowToUse heading={"How to use the deep link generator"} steps={STEPS} />

      <AeoBlock
        question={"What is a deep link?"}
        answer={"A deep link is a URL using your app's custom URL scheme (`myapp://path?param=value`) that opens a specific screen instead of the app's home. Combine with Universal Links / App Links for HTTPS fallback."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Mobile dev in Austin, TX", "how": "Tests in-app navigation from external triggers."}, {"who": "Growth team in SF, CA", "how": "Builds deep links for push-notification campaigns."}, {"who": "QA engineer in NYC", "how": "Scripts repeatable deep-link smoke tests."}, {"who": "Affiliate marketer in LA, CA", "how": "Routes ad clicks straight to in-app product pages."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/app-store-link-generator", "anchor": "App Store Link Generator", "blurb": "related link generator."}, {"to": "/play-store-link-generator", "anchor": "Play Store Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
