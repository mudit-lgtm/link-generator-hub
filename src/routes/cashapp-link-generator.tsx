import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/cashapp-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Do I need a Cash App account?", "a": "Yes — to receive payments you need a verified Cashtag."}, {"q": "Can the user change the amount?", "a": "Yes — the prefilled amount is editable."}, {"q": "Is there an international version?", "a": "Cash App is US + UK only as of 2026."}, {"q": "Will fees apply?", "a": "Personal transfers free; business profiles charge a percentage."}, {"q": "How do I QR-code my link?", "a": "Pair with our QR code generator."}];
const STEPS = ["Type your $Cashtag.", "Add an optional amount.", "Copy the link.", "Share via SMS, QR or bio."];
const TITLE = "Cash App Link Generator — Free Online Tool";
const DESC = "Generate a `cash.app/$cashtag` payment link with an optional pre-filled amount in USD.";

export const Route = createFileRoute("/cashapp-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/cashapp-link-generator",
    name: "Cash App Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Cash App Link Generator", item: "/cashapp-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Cash App Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Cash App Link Generator" }]} />
      <ToolHero h1={"Cash App $Cashtag Pay Link Generator"} intro={"Generate a `cash.app/$cashtag` payment link with an optional pre-filled amount in USD."} keywords={KW} />

      <ToolForm
        fields={[{"name": "tag", "label": "$Cashtag", "type": "text", "placeholder": "$yourname"}, {"name": "amount", "label": "Amount (optional)", "type": "number"}]}
        build={(v) => { if(!v.tag) return ''; const t=String(v.tag).replace(/^\$/,''); return v.amount ? `https://cash.app/$${t}/${v.amount}` : `https://cash.app/$${t}`; }}
        
      />

      <HowToUse heading={"How to use the cash app link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I share a Cash App link?"}
        answer={"`https://cash.app/$<cashtag>` opens your pay screen. Append `/<amount>` to prefill: `https://cash.app/$alex/25`."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Vendor at flea market in Austin, TX", "how": "Posts Cash App QR for sales."}, {"who": "Stylist in Atlanta, GA", "how": "Charges deposits via Cash App link."}, {"who": "Streamer in LA, CA", "how": "Adds Cash App tip URL to overlay."}, {"who": "Friend splitting bill in NYC", "how": "Sends pay link in SMS."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/venmo-link-generator", "anchor": "Venmo Link Generator", "blurb": "related link generator."}, {"to": "/paypal-me-link-generator", "anchor": "PayPal.Me Link Generator", "blurb": "related link generator."}, {"to": "/payment-link-generator", "anchor": "Payment Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
