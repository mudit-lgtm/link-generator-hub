import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
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

      <WorkedExample intro={"A share button for a company blog post, and a prefilled connection message for outreach."} rows={[{"input": "Article URL", "output": "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fexample.com%2Fpost"}, {"input": "Company page", "output": "https://www.linkedin.com/company/acme"}, {"input": "Profile, clean form", "output": "linkedin.com/in/danalee \u2014 drop everything after the slug"}]} note={"LinkedIn reads the destination's Open Graph tags for the preview; there is no supported way to prefill the post text."} />

      <Pitfalls items={[{"problem": "Sharing a link with no og:image", "fix": "The post appears as a grey box and gets noticeably less engagement."}, {"problem": "Copying a profile URL with tracking junk", "fix": "Trim ?originalSubdomain= and similar; the clean /in/ slug is stable and shorter."}, {"problem": "Stale preview after an edit", "fix": "Use LinkedIn's Post Inspector to refresh the cached preview before sharing again."}, {"problem": "Outbound links in the post body", "fix": "Reach is lower for posts with external links. Many teams put the link in the first comment."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/facebook-share-link-generator", "anchor": "Facebook Share Link Generator", "blurb": "Facebook share dialog URLs for any page."}, {"to": "/telegram-link-generator", "anchor": "Telegram Link Generator", "blurb": "t.me channel, group & bot invite URLs."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "Build Google Analytics UTM campaign tracking links."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
