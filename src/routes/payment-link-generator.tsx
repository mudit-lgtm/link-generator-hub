import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/payment-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Which processor is easiest?", "a": "Stripe Payment Links and Square Checkout don't require code — generate URLs from their dashboards."}, {"q": "Are payment links secure?", "a": "Yes — checkout happens on the processor's domain with TLS and PCI-compliance built in."}, {"q": "Can I prefill the amount?", "a": "Yes — most processors accept `amount` or `value` query params on hosted links."}, {"q": "How do I refund?", "a": "Issue the refund inside the processor's dashboard; the link itself is just a checkout entry point."}, {"q": "Can I shorten the URL?", "a": "Yes — pair the link with our short-link generator for SMS and bios."}];
const STEPS = ["Get your hosted checkout base URL from Stripe, Square or PayPal.", "Set amount, currency and description.", "Copy the composed URL.", "Send by email, SMS or QR code."];
const TITLE = "Payment Link Generator — Free Online Tool";
const DESC = "Compose a structured payment-request URL (amount, currency, description) you can plug into any processor's hosted-checkout pattern.";

export const Route = createFileRoute("/payment-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/payment-link-generator",
    name: "Payment Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Payment Link Generator", item: "/payment-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Payment Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Payment Link Generator" }]} />
      <ToolHero h1={"Hosted Payment Request Link Helper"} intro={"Compose a structured payment-request URL (amount, currency, description) you can plug into any processor's hosted-checkout pattern."} keywords={KW} />

      <ToolForm
        fields={[{"name": "base", "label": "Hosted checkout base URL", "type": "url", "placeholder": "https://yourstore.com/pay"}, {"name": "amount", "label": "Amount", "type": "number", "placeholder": "49.00"}, {"name": "currency", "label": "Currency", "type": "select", "options": [{"value": "USD", "label": "USD"}, {"value": "EUR", "label": "EUR"}, {"value": "GBP", "label": "GBP"}, {"value": "CAD", "label": "CAD"}, {"value": "AUD", "label": "AUD"}, {"value": "INR", "label": "INR"}]}, {"name": "desc", "label": "Description", "type": "text", "placeholder": "Pro plan — annual"}]}
        build={(v) => { if(!v.base||!v.amount) return ''; try{ const url=new URL(v.base); url.searchParams.set('amount',v.amount); url.searchParams.set('currency',v.currency); if(v.desc) url.searchParams.set('description',v.desc); return url.toString(); }catch{return ''} }}
        
      />

      <HowToUse heading={"How to use the payment link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I generate a payment link?"}
        answer={"Pick a processor that supports hosted payment links (Stripe Payment Links, PayPal Buttons, Square Online Checkout). Each provides a base URL plus query parameters for amount, currency and description."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Freelancer in Austin, TX", "how": "Sends pay-as-you-go invoices with a one-tap link."}, {"who": "Coach in LA, CA", "how": "Embeds a checkout link in the booking confirmation email."}, {"who": "Online store in NYC", "how": "Generates ad-hoc payment requests for custom orders."}, {"who": "Nonprofit in Boston, MA", "how": "Builds donation links with preset amounts."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/payment-link-generator", "anchor": "PayPal.Me Link Generator", "blurb": "Build hosted Stripe-style payment request links."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "HTML mailto link with subject, body, CC and BCC."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
