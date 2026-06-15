import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/gmail-compose-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does this require the user to be in Gmail?", "a": "Yes — the URL opens Gmail's web composer. Use mailto: as a universal fallback."}, {"q": "Why `view=cm`?", "a": "It tells Gmail to open the compose view."}, {"q": "Can I attach files?", "a": "No — attachments aren't supported via URL."}, {"q": "Will it open in the Gmail mobile app?", "a": "On Android with Gmail set as default, yes."}, {"q": "How does this differ from mailto:?", "a": "mailto: opens the user's default mail client; this targets Gmail specifically."}];
const STEPS = ["Fill To, optional CC/BCC.", "Add a subject and body.", "Copy the Gmail composer URL.", "Use in support widgets or email signatures."];
const TITLE = "Gmail Compose Link Generator — Free Online Tool";
const DESC = "Build a Gmail-specific compose URL (`mail.google.com/mail/?view=cm`) that opens a new tab pre-filled with To, CC, BCC, subject and body.";

export const Route = createFileRoute("/gmail-compose-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/gmail-compose-link-generator",
    name: "Gmail Compose Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Gmail Compose Link Generator", item: "/gmail-compose-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Gmail Compose Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Gmail Compose Link Generator" }]} />
      <ToolHero h1={"Gmail Compose URL Generator"} intro={"Build a Gmail-specific compose URL (`mail.google.com/mail/?view=cm`) that opens a new tab pre-filled with To, CC, BCC, subject and body."} keywords={KW} />

      <ToolForm
        fields={[{"name": "to", "label": "To", "type": "text", "placeholder": "alex@example.com"}, {"name": "cc", "label": "CC (optional)", "type": "text"}, {"name": "bcc", "label": "BCC (optional)", "type": "text"}, {"name": "subject", "label": "Subject", "type": "text", "placeholder": "Quick question"}, {"name": "body", "label": "Body", "type": "textarea", "placeholder": "Hi Alex"}]}
        build={(v) => { const q=new URLSearchParams({view:'cm',fs:'1'}); if(v.to) q.set('to',v.to); if(v.cc) q.set('cc',v.cc); if(v.bcc) q.set('bcc',v.bcc); if(v.subject) q.set('su',v.subject); if(v.body) q.set('body',v.body); return `https://mail.google.com/mail/?${q.toString()}`; }}
        
      />

      <HowToUse heading={"How to use the gmail compose link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a Gmail compose link?"}
        answer={"Use `https://mail.google.com/mail/?view=cm&fs=1&to=...&su=...&body=...`. It opens Gmail's compose window in a new tab pre-filled with everything you pass."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Support team in Austin, TX", "how": "Pre-fills Gmail composer for canned responses."}, {"who": "Sales rep in NYC", "how": "Builds Gmail templates for prospect outreach."}, {"who": "Recruiter in SF, CA", "how": "Sends pre-filled Gmail intros to candidates."}, {"who": "Help desk in Chicago, IL", "how": "Wraps Gmail compose URLs in support widgets."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "related link generator."}, {"to": "/outlook-compose-link-generator", "anchor": "Outlook Compose Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/unsubscribe-link-generator", "anchor": "Unsubscribe Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
