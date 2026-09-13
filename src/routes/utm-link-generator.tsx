import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { ShareAndGuestbook } from "@/components/backlink-block";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/utm-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Are UTM values case-sensitive?", "a": "Yes — `Email` and `email` show as two rows. Stick to lowercase to keep reports clean."}, {"q": "Should I UTM internal links?", "a": "No — internal UTMs overwrite the original source. Use them only on external referrers."}, {"q": "What's the difference between source and medium?", "a": "`utm_source` is where (newsletter, twitter), `utm_medium` is how (email, social, cpc)."}, {"q": "Where do UTMs show up in GA4?", "a": "Under Acquisition → Traffic acquisition; also in Explorations and Looker Studio."}, {"q": "Can I shorten the URL?", "a": "Yes — most short-link tools preserve query params so attribution stays intact."}];
const STEPS = ["Paste the destination URL.", "Fill in source, medium and campaign at minimum.", "Optionally add term and content for paid or creative-variant tracking.", "Copy and use the URL in the matching channel."];
const TITLE = "UTM Link Generator — Free Online Tool";
const DESC = "Build campaign URLs with the standard UTM parameters that Google Analytics, GA4 and most marketing tools recognize.";

export const Route = createFileRoute("/utm-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/utm-link-generator",
    name: "UTM Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "UTM Link Generator", item: "/utm-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the UTM Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "UTM Link Generator" }]} />
      <ToolHero h1={"Google Analytics UTM Link Generator"} intro={"Build campaign URLs with the standard UTM parameters that Google Analytics, GA4 and most marketing tools recognize."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "Landing page URL", "type": "url", "placeholder": "https://example.com/landing"}, {"name": "source", "label": "utm_source", "type": "text", "placeholder": "newsletter"}, {"name": "medium", "label": "utm_medium", "type": "text", "placeholder": "email"}, {"name": "campaign", "label": "utm_campaign", "type": "text", "placeholder": "spring-launch"}, {"name": "term", "label": "utm_term (optional)", "type": "text"}, {"name": "content", "label": "utm_content (optional)", "type": "text"}]}
        build={(v) => { if(!v.u) return ''; try{ const url=new URL(v.u); ['source','medium','campaign','term','content'].forEach(k=>{ if(v[k]) url.searchParams.set('utm_'+k,v[k]); }); return url.toString(); }catch{return ''} }}
        
      />

      <HowToUse heading={"How to use the utm link generator"} steps={STEPS} />

      <AeoBlock
        question={"What are the standard UTM parameters?"}
        answer={"The five UTMs are `utm_source` (where), `utm_medium` (channel), `utm_campaign` (initiative), and the optional `utm_term` (paid keyword) and `utm_content` (creative variant). GA4 reads them automatically."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Growth marketer in San Francisco, CA", "how": "Tags every email and ad creative for full attribution in GA4."}, {"who": "Agency in NYC", "how": "Standardizes UTMs across client campaigns for consistent reporting."}, {"who": "E-commerce brand in Austin, TX", "how": "Tracks which influencer drove a holiday-campaign conversion."}, {"who": "B2B SaaS in Boston, MA", "how": "Maps LinkedIn ads to closed-won deals through the CRM."}]}
      />

      <WorkedExample intro={"One newsletter, two placements, so GA4 can tell the header banner from the footer text link."} rows={[{"input": "source newsletter, medium email, campaign spring_sale", "output": "?utm_source=newsletter&utm_medium=email&utm_campaign=spring_sale"}, {"input": "\u2026plus content header_banner", "output": "&utm_content=header_banner"}, {"input": "Campaign typed as \"Spring Sale\"", "output": "spring_sale \u2014 GA4 treats Spring Sale and spring_sale as two campaigns"}]} note={"Keep every value lowercase with underscores. Case differences are the single most common cause of split campaign rows in GA4."} />

      <Pitfalls items={[{"problem": "Tagging internal links", "fix": "A UTM on a link between your own pages starts a new session and destroys attribution for the original source."}, {"problem": "Putting UTMs on a link that redirects", "fix": "Some redirect services strip query strings. Test the final landing URL, not the short link."}, {"problem": "Using medium for the platform name", "fix": "Medium describes the channel type (email, cpc, social). The platform belongs in source."}, {"problem": "Tagging paid search links twice", "fix": "Google Ads auto-tagging already adds gclid. Manual UTMs on top can override it and hide conversion data."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/affiliate-link-generator", "anchor": "Affiliate Link Generator", "blurb": "Amazon, AliExpress & custom affiliate links with your tag."}, {"to": "/referral-link-generator", "anchor": "Referral Link Generator", "blurb": "Custom referral & invite links with tracking codes."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]}
      />

      <ShareAndGuestbook path="/utm-link-generator" title={TITLE} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
