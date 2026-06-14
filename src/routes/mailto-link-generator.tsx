import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/mailto-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Will every email client open the link?", "a": "All major clients — Gmail (with the right default), Apple Mail, Outlook, Thunderbird — handle mailto links."}, {"q": "Why are line breaks broken?", "a": "Encode newlines as `%0A` (or just type them in the body field above — we encode automatically)."}, {"q": "Can I send multiple recipients?", "a": "Yes — comma-separate addresses in `to`, `cc` or `bcc`."}, {"q": "Are mailto attachments possible?", "a": "No — RFC 6068 does not allow attachments via mailto links."}, {"q": "How long can a mailto link be?", "a": "Most clients accept ~2,000 chars total. Keep bodies short and link to a longer page for details."}];
const STEPS = ["Enter the recipient address.", "Add subject, body and optional CC/BCC.", "Copy the mailto: link.", "Add it to a button, signature or website CTA."];
const TITLE = "Mailto Link Generator — Free Online Tool";
const DESC = "Build a mailto: link that opens the user's email client pre-filled with recipient, subject, body, CC and BCC.";

export const Route = createFileRoute("/mailto-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/mailto-link-generator",
    name: "Mailto Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Mailto Link Generator", item: "/mailto-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Mailto Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Mailto Link Generator" }]} />
      <ToolHero h1={"Mailto Link Generator with Subject, Body, CC & BCC"} intro={"Build a mailto: link that opens the user's email client pre-filled with recipient, subject, body, CC and BCC."} keywords={KW} />

      <ToolForm
        fields={[{"name": "to", "label": "To", "type": "email", "placeholder": "team@example.com"}, {"name": "subject", "label": "Subject", "type": "text"}, {"name": "body", "label": "Body", "type": "textarea"}, {"name": "cc", "label": "CC (optional)", "type": "text"}, {"name": "bcc", "label": "BCC (optional)", "type": "text"}]}
        build={(v) => { if(!v.to) return ''; const p=new URLSearchParams(); if(v.subject)p.set('subject',v.subject); if(v.body)p.set('body',v.body); if(v.cc)p.set('cc',v.cc); if(v.bcc)p.set('bcc',v.bcc); const q=p.toString().replace(/\+/g,'%20'); return `mailto:${v.to}${q?'?'+q:''}`; }}
        
      />

      <HowToUse heading={"How to use the mailto link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I build a mailto link with a subject and body?"}
        answer={"Use `mailto:address@example.com?subject=Hi&body=Message`. Subject and body must be URL-encoded; multiple recipients separate with commas; CC and BCC use `cc=` and `bcc=` params."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Support team in Austin, TX", "how": "Drops 'Email Support' buttons that pre-fill a ticket template."}, {"who": "Recruiter in NYC", "how": "Sends candidates a pre-formatted intro request."}, {"who": "Sales rep in Chicago, IL", "how": "Embeds a one-click 'request a quote' link in proposals."}, {"who": "Designer in San Francisco, CA", "how": "Adds a contact CTA to portfolio sites without a backend."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/whatsapp-link-generator", "anchor": "WhatsApp Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
