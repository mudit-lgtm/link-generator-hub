import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/venmo-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does Venmo work outside the US?", "a": "No — US-only as of 2026."}, {"q": "Will it open in browser if no app?", "a": "Yes — venmo.com renders a fallback page."}, {"q": "Can I add an emoji to the note?", "a": "Yes — emojis encode correctly through URLSearchParams."}, {"q": "What's the difference between pay and charge?", "a": "`pay` sends; `charge` requests."}, {"q": "Are fees deducted?", "a": "Personal Venmo transfers are free; business profiles incur a fee."}];
const STEPS = ["Enter your Venmo username.", "Set amount and note.", "Pick pay or charge.", "Copy the link or convert to a QR."];
const TITLE = "Venmo Link Generator — Free Online Tool";
const DESC = "Build a Venmo deep link that opens the mobile app pre-filled with a recipient, amount, note and pay/charge intent.";

export const Route = createFileRoute("/venmo-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/venmo-link-generator",
    name: "Venmo Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Venmo Link Generator", item: "/venmo-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Venmo Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Venmo Link Generator" }]} />
      <ToolHero h1={"Venmo Pay & Charge Link Generator"} intro={"Build a Venmo deep link that opens the mobile app pre-filled with a recipient, amount, note and pay/charge intent."} keywords={KW} />

      <ToolForm
        fields={[{"name": "recip", "label": "Recipient username", "type": "text", "placeholder": "yourname"}, {"name": "amount", "label": "Amount (USD)", "type": "number"}, {"name": "note", "label": "Note", "type": "text", "placeholder": "Pizza split"}, {"name": "action", "label": "Action", "type": "select", "options": [{"value": "pay", "label": "Pay"}, {"value": "charge", "label": "Charge"}]}]}
        build={(v) => { if(!v.recip) return ''; const q=new URLSearchParams({txn:v.action||'pay',recipients:String(v.recip).replace(/^@/,'')}); if(v.amount) q.set('amount',String(v.amount)); if(v.note) q.set('note',v.note); return `https://venmo.com/?${q.toString()}`; }}
        
      />

      <HowToUse heading={"How to use the venmo link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a Venmo payment link?"}
        answer={"Use `https://venmo.com/?txn=pay&recipients=<user>&amount=<amount>&note=<note>` for pay, or `txn=charge` to request money. The link opens the Venmo app pre-filled."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Roommate in Brooklyn, NY", "how": "Splits rent with one tap."}, {"who": "Photographer in Austin, TX", "how": "Charges deposits via Venmo URL."}, {"who": "Tutor in Boston, MA", "how": "Requests session fees via SMS link."}, {"who": "Bartender in Nashville, TN", "how": "Posts a Venmo tip QR."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/cashapp-link-generator", "anchor": "Cashapp Link Generator", "blurb": "related link generator."}, {"to": "/paypal-me-link-generator", "anchor": "PayPal.Me Link Generator", "blurb": "related link generator."}, {"to": "/payment-link-generator", "anchor": "Payment Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
