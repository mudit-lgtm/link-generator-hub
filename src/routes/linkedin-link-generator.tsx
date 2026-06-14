import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/linkedin-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "How do I get a vanity LinkedIn URL?", "a": "LinkedIn → Edit public profile & URL → set a custom vanity."}, {"q": "Can I prefill share text?", "a": "LinkedIn removed prefilled text in 2021; users type their own."}, {"q": "Does share-offsite require login?", "a": "Yes — sharing requires a LinkedIn account."}, {"q": "Will the share preview look right?", "a": "LinkedIn reads Open Graph tags — set `og:title`, `og:image`, `og:description`."}, {"q": "Can I track LinkedIn share clicks?", "a": "Pass a UTM-tagged URL into the `url` parameter."}];
const STEPS = ["Pick personal, company or share.", "Paste the slug or URL.", "Copy the LinkedIn URL.", "Use it in email signatures, websites, or share buttons."];
const TITLE = "LinkedIn Link Generator — Free Online Tool";
const DESC = "Build LinkedIn URLs for personal profiles, company pages, or the share-link sheet.";

export const Route = createFileRoute("/linkedin-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/linkedin-link-generator",
    name: "LinkedIn Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "LinkedIn Link Generator", item: "/linkedin-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the LinkedIn Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "LinkedIn Link Generator" }]} />
      <ToolHero h1={"LinkedIn Profile, Company & Share Link Generator"} intro={"Build LinkedIn URLs for personal profiles, company pages, or the share-link sheet."} keywords={KW} />

      <ToolForm
        fields={[{"name": "kind", "label": "Link type", "type": "select", "options": [{"value": "in", "label": "Personal profile"}, {"value": "company", "label": "Company page"}, {"value": "share", "label": "Share URL"}]}, {"name": "value", "label": "Username or URL", "type": "text", "placeholder": "in: johndoe — company: acme — share: https://…"}]}
        build={(v) => { const x=(v.value||'').trim(); if(!x) return ''; if(v.kind==='share') return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(x)}`; if(v.kind==='company') return `https://www.linkedin.com/company/${x.replace(/^.*\/company\//,'')}/`; return `https://www.linkedin.com/in/${x.replace(/^.*\/in\//,'')}/`; }}
        
      />

      <HowToUse heading={"How to use the linkedin link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I share a LinkedIn profile or post?"}
        answer={"Profiles: `https://www.linkedin.com/in/<vanity>/`. Companies: `https://www.linkedin.com/company/<slug>/`. Share intent: `https://www.linkedin.com/sharing/share-offsite/?url=<URL>`."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Recruiter in NYC", "how": "Sends candidates a one-tap profile preview."}, {"who": "Founder in San Francisco, CA", "how": "Pins the company-page link in the email signature."}, {"who": "B2B marketer in Boston, MA", "how": "Adds Share-on-LinkedIn buttons to blog articles."}, {"who": "Career coach in Austin, TX", "how": "Drops their LinkedIn vanity in every podcast bio."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/facebook-share-link-generator", "anchor": "Facebook Share Link Generator", "blurb": "related link generator."}, {"to": "/telegram-link-generator", "anchor": "Telegram Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
