import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/app-store-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "How do I find the App ID?", "a": "Open App Store Connect or the App Store URL — the `id` is the trailing number."}, {"q": "Why include a country?", "a": "Apple shows the right metadata, pricing and availability for that region."}, {"q": "What about Smart App Banners?", "a": "Use `<meta name=\"apple-itunes-app\" content=\"app-id=...\">` on your site."}, {"q": "Is the slug required?", "a": "No — the numeric ID is enough; Apple redirects."}, {"q": "Can I add an affiliate token?", "a": "Yes — append `?at=<token>&ct=<campaign>` if you're an Apple affiliate."}];
const STEPS = ["Paste the App ID.", "Set the country code (defaults to US).", "Optionally add the app's slug.", "Copy the apps.apple.com link."];
const TITLE = "App Store Link Generator — Free Online Tool";
const DESC = "Build canonical apps.apple.com URLs from an app ID, with optional country and affiliate-token parameters.";

export const Route = createFileRoute("/app-store-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/app-store-link-generator",
    name: "App Store Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "App Store Link Generator", item: "/app-store-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the App Store Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "App Store Link Generator" }]} />
      <ToolHero h1={"Apple App Store Link Generator"} intro={"Build canonical apps.apple.com URLs from an app ID, with optional country and affiliate-token parameters."} keywords={KW} />

      <ToolForm
        fields={[{"name": "id", "label": "App ID", "type": "text", "placeholder": "id1234567890 or 1234567890"}, {"name": "country", "label": "Country code", "type": "text", "placeholder": "us", "default": "us"}, {"name": "name", "label": "Slug (optional)", "type": "text", "placeholder": "my-app"}]}
        build={(v) => { if(!v.id) return ''; const id=String(v.id).replace(/^id/,''); const c=(v.country||'us').toLowerCase(); const n=v.name?String(v.name).toLowerCase().replace(/[^a-z0-9]+/g,'-'):'app'; return `https://apps.apple.com/${c}/app/${n}/id${id}`; }}
        
      />

      <HowToUse heading={"How to use the app store link generator"} steps={STEPS} />

      <AeoBlock
        question={"What's the canonical Apple App Store URL format?"}
        answer={"`https://apps.apple.com/<country>/app/<slug>/id<numeric-id>`. Apple resolves any slug to the canonical app as long as the numeric ID is correct."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "App studio in San Francisco, CA", "how": "Generates locale-specific links for global launches."}, {"who": "Marketing team in NYC", "how": "Builds affiliate App Store URLs."}, {"who": "YouTuber in LA, CA", "how": "Adds App Store links to video descriptions."}, {"who": "Startup in Austin, TX", "how": "Shares iOS links in press kits."}]}
      />

      <WorkedExample intro={"One campaign, two stores, so installs can be attributed per platform."} rows={[{"input": "App ID 310633997, US store", "output": "https://apps.apple.com/us/app/id310633997"}, {"input": "Android package com.example.app", "output": "https://play.google.com/store/apps/details?id=com.example.app"}, {"input": "Play link + campaign tag", "output": "&referrer=utm_source%3Dnewsletter%26utm_campaign%3Dspring"}]} note={"Leaving the country code out of an App Store link sends everyone to the US store, which can show \"not available in your region\"."} />

      <Pitfalls items={[{"problem": "Using a country-locked link in global ads", "fix": "Use /app/idXXXX without a locale, or detect the region and pick the matching store."}, {"problem": "Expecting UTMs to work on iOS", "fix": "Apple ignores query strings; use Apple's campaign token (ct=) in App Analytics links instead."}, {"problem": "Linking the developer page, not the app", "fix": "Visitors have to search again, and a large share drop off at that step."}, {"problem": "One button for both platforms", "fix": "Show both, or route by user agent. A Play link on an iPhone is a dead end."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/app-store-link-generator", "anchor": "Play Store Link Generator", "blurb": "apps.apple.com canonical URLs."}, {"to": "/app-store-link-generator", "anchor": "Deep Link Generator", "blurb": "apps.apple.com canonical URLs."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
