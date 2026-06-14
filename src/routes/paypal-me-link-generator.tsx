import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/paypal-me-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Do I need a PayPal Business account?", "a": "No — personal accounts can claim a PayPal.Me handle for free."}, {"q": "Can the payer change the amount?", "a": "Yes — even with an amount in the URL, payers can edit before confirming."}, {"q": "What currencies are supported?", "a": "Major currencies including USD, EUR, GBP, CAD and AUD."}, {"q": "Are PayPal.Me payments protected?", "a": "‘Goods & services’ payments are; ‘friends & family’ payments aren't — the payer chooses."}, {"q": "Will it work without an amount?", "a": "Yes — `paypal.me/yourname` opens a free-form payment page."}];
const STEPS = ["Enter your PayPal.Me handle (without `@`).", "Optionally set an amount and currency.", "Copy the link.", "Share in invoices, bios or SMS."];
const TITLE = "PayPal.Me Link Generator — Free Online Tool";
const DESC = "Build a `paypal.me/handle/amount` link that opens PayPal pre-filled with your requested amount and currency.";

export const Route = createFileRoute("/paypal-me-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/paypal-me-link-generator",
    name: "PayPal.Me Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "PayPal.Me Link Generator", item: "/paypal-me-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the PayPal.Me Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "PayPal.Me Link Generator" }]} />
      <ToolHero h1={"PayPal.Me Payment Request Link Generator"} intro={"Build a `paypal.me/handle/amount` link that opens PayPal pre-filled with your requested amount and currency."} keywords={KW} />

      <ToolForm
        fields={[{"name": "handle", "label": "PayPal.Me handle", "type": "text", "placeholder": "yourname"}, {"name": "amount", "label": "Amount (optional)", "type": "number"}, {"name": "currency", "label": "Currency", "type": "select", "options": [{"value": "USD", "label": "USD"}, {"value": "EUR", "label": "EUR"}, {"value": "GBP", "label": "GBP"}, {"value": "CAD", "label": "CAD"}, {"value": "AUD", "label": "AUD"}]}]}
        build={(v) => { if(!v.handle) return ''; const h=String(v.handle).trim().replace(/^@/,''); return v.amount ? `https://paypal.me/${h}/${v.amount}${v.currency}` : `https://paypal.me/${h}`; }}
        
      />

      <HowToUse heading={"How to use the paypal.me link generator"} steps={STEPS} />

      <AeoBlock
        question={"What's the format of a PayPal.Me link?"}
        answer={"`https://paypal.me/<handle>/<amount><currency>` — for example `https://paypal.me/alex/25USD`. Drop the amount to let the payer choose."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Musician in Nashville, TN", "how": "Posts a PayPal.Me tip link in show bios."}, {"who": "Tutor in Boston, MA", "how": "Sends invoice links via SMS with a fixed amount."}, {"who": "Friend group anywhere in the USA", "how": "Splits dinner bills via group chat."}, {"who": "Artist in Brooklyn, NY", "how": "Sells one-off prints with a tap-to-pay URL."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/payment-link-generator", "anchor": "Payment Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
