import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { ShareAndGuestbook } from "@/components/backlink-block";
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

      <WorkedExample intro={"A support page that opens a pre-addressed email with the ticket template already filled in."} rows={[{"input": "To support@example.com, subject \"Refund request\"", "output": "mailto:support@example.com?subject=Refund%20request"}, {"input": "\u2026plus CC billing@example.com and a two-line body", "output": "&cc=billing%40example.com&body=Order%20number%3A%0AReason%3A"}, {"input": "Two recipients", "output": "mailto:a@example.com,b@example.com \u2014 comma separated, no spaces"}]} note={"The @ in a CC or BCC address must be encoded as %40; the first address after mailto: does not need encoding."} />

      <Pitfalls items={[{"problem": "Publishing a plain address in the page text", "fix": "Scrapers harvest it within days. The mailto link itself is enough; the address does not need to appear as visible text."}, {"problem": "Long bodies", "fix": "Older Outlook builds cut mailto URLs near 2,000 characters. Keep templates to a few prompting lines."}, {"problem": "Assuming a desktop mail client exists", "fix": "On machines with no configured client nothing happens. Show the address as a copyable fallback next to the button."}, {"problem": "Using real line breaks in the body", "fix": "They must be encoded as %0A, otherwise the link breaks at the first newline."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/whatsapp-link-generator", "anchor": "WhatsApp Link Generator", "blurb": "wa.me click-to-chat link with prefilled message & QR."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "Build Google Analytics UTM campaign tracking links."}]}
      />

      <ShareAndGuestbook path="/mailto-link-generator" title={TITLE} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
