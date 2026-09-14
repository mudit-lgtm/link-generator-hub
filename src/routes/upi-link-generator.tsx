import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/upi-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does it work on desktop?", "a": "No — UPI deep links need a UPI app, so pair them with a QR code for desktop users."}, {"q": "Can I leave the amount blank?", "a": "Yes, the payer then enters any amount."}, {"q": "Is my UPI ID safe to share?", "a": "A VPA is designed to be public; it only lets people pay you."}, {"q": "Which apps open it?", "a": "GPay, PhonePe, Paytm, BHIM and most bank apps."}, {"q": "Is a transaction ID needed?", "a": "No, but you can add a note so payments are easy to reconcile."}];
const STEPS = ["Enter your UPI ID (VPA).", "Add the payee name shown in the app.", "Optionally lock the amount and note.", "Share the link or turn it into a QR code."];
const TITLE = "UPI Payment Link Generator — Free Online Tool";
const DESC = "Build a upi://pay deep link with your VPA, payee name, amount and note that opens GPay, PhonePe, Paytm or any UPI app.";

export const Route = createFileRoute("/upi-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/upi-link-generator",
    name: "UPI Payment Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "UPI Payment Link Generator", item: "/upi-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use the ${"UPI Payment Link Generator"}`,
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "UPI Payment Link Generator" }]} />
      <ToolHero h1={"UPI Payment Link Generator"} intro={DESC} keywords={KW} />

      <ToolForm
        fields={[{"name": "vpa", "label": "UPI ID (VPA)", "type": "text", "placeholder": "yourname@okhdfcbank"}, {"name": "name", "label": "Payee name", "type": "text", "placeholder": "Acme Studio"}, {"name": "amount", "label": "Amount (optional)", "type": "number", "placeholder": "499"}, {"name": "note", "label": "Payment note", "type": "text", "placeholder": "Invoice 1042"}]}
        build={(v) => { if(!v.vpa) return ''; const p=new URLSearchParams(); p.set('pa',String(v.vpa)); if(v.name)p.set('pn',String(v.name)); if(v.amount)p.set('am',String(v.amount)); if(v.note)p.set('tn',String(v.note)); p.set('cu','INR'); return `upi://pay?${p.toString()}`; }}
      />

      <HowToUse heading={"How to use the upi link generator"} steps={STEPS} />

      <AeoBlock question={"What is a UPI payment link?"} answer={"`upi://pay?pa=vpa&pn=name&am=amount&cu=INR` is a deep link that opens any UPI app with the payment pre-filled. It works on Android and iOS where a UPI app is installed."} keywords={KW} />

      <GeoBlock heading={"USA use cases"} keywords={KW} items={[{"who": "Freelancer billing US clients", "how": "Collects INR payouts."}, {"who": "Etsy seller shipping to the USA", "how": "Takes UPI from Indian buyers."}, {"who": "Tutor with NRI students", "how": "Shares a fixed-amount link."}, {"who": "Creator on a US platform", "how": "Adds a UPI tip link."}]} />

      <WorkedExample intro={"A fixed invoice amount and an open tip jar, both as UPI deep links."} rows={[{"input": "VPA acme@okhdfcbank, \u20b9499", "output": "upi://pay?pa=acme@okhdfcbank&pn=Acme&am=499&cu=INR"}, {"input": "Amount left blank", "output": "The payer types any amount \u2014 right for tips"}, {"input": "With a note", "output": "&tn=Invoice%201042 \u2014 shows in the payer's history and yours"}]} note={"cu=INR is mandatory; UPI rejects the request without a currency even though rupees are the only option."} />

      <Pitfalls items={[{"problem": "Sharing the link to desktop users", "fix": "Nothing opens without a UPI app. Pair every UPI link with a QR code."}, {"problem": "Typos in the VPA", "fix": "The money can reach a real stranger's handle. Send yourself \u20b91 before publishing."}, {"problem": "No transaction note", "fix": "Reconciling a day of identical \u20b9499 payments becomes guesswork."}, {"problem": "Trusting the app's success screen alone", "fix": "Confirm against your bank statement; app status can lag or show pending as done."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks heading="Related link generators" links={[{"to": "/payment-link-generator", "anchor": "Payment Link Generator", "blurb": "Build hosted Stripe-style payment request links."}, {"to": "/qr-code-link-generator", "anchor": "Qr Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}, {"to": "/whatsapp-link-generator", "anchor": "Whatsapp Link Generator", "blurb": "wa.me click-to-chat link with prefilled message & QR."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}]} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
