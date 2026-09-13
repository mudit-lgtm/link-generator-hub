import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/calendly-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Do clients need a Calendly account?", "a": "No — bookers can use any email."}, {"q": "Can I prefill the booker's name and email?", "a": "Yes — append `?name=...&email=...`."}, {"q": "Will UTM params propagate to my CRM?", "a": "Yes if Calendly + CRM integration is enabled."}, {"q": "How do I embed instead of link?", "a": "Use Calendly's embed snippet."}, {"q": "What's the difference between event types?", "a": "Each `event-slug` is a separate Calendly meeting template."}];
const STEPS = ["Enter your Calendly handle.", "Add the event slug.", "Optionally tag with a UTM source.", "Copy the URL."];
const TITLE = "Calendly Link Generator — Free Online Tool";
const DESC = "Build a calendly.com/<handle>/<event> URL with optional UTM parameters for booking-flow attribution.";

export const Route = createFileRoute("/calendly-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/calendly-link-generator",
    name: "Calendly Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Calendly Link Generator", item: "/calendly-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Calendly Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Calendly Link Generator" }]} />
      <ToolHero h1={"Calendly Booking & Embed Link Generator"} intro={"Build a calendly.com/<handle>/<event> URL with optional UTM parameters for booking-flow attribution."} keywords={KW} />

      <ToolForm
        fields={[{"name": "handle", "label": "Calendly handle", "type": "text", "placeholder": "yourname"}, {"name": "event", "label": "Event slug", "type": "text", "placeholder": "30min"}, {"name": "utm", "label": "UTM source (optional)", "type": "text", "placeholder": "newsletter"}]}
        build={(v) => { if(!v.handle) return ''; const h=String(v.handle).replace(/^@/,''); const e=v.event?`/${v.event}`:''; const u=v.utm?`?utm_source=${encodeURIComponent(v.utm)}`:''; return `https://calendly.com/${h}${e}${u}`; }}
        
      />

      <HowToUse heading={"How to use the calendly link generator"} steps={STEPS} />

      <AeoBlock
        question={"What's the Calendly URL format?"}
        answer={"`https://calendly.com/<handle>/<event-slug>` — append UTMs for attribution: `?utm_source=...&utm_campaign=...`."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Coach in Denver, CO", "how": "Embeds a Calendly link in welcome emails."}, {"who": "Sales rep in Austin, TX", "how": "Tracks bookings by UTM source."}, {"who": "Recruiter in NYC", "how": "Shares interview slots via Calendly URL."}, {"who": "Consultant in San Francisco, CA", "how": "Adds Calendly to LinkedIn bio."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/add-to-calendar-link-generator", "anchor": "Add to Calendar Link Generator", "blurb": "Google, Outlook, Yahoo & .ics add-to-calendar links."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "HTML mailto link with subject, body, CC and BCC."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "Build Google Analytics UTM campaign tracking links."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
