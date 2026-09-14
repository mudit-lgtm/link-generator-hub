import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/sms-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Will it work on desktop?", "a": "Most modern desktops (iMessage on macOS, Phone Link on Windows) handle sms:."}, {"q": "Why `?&body=`?", "a": "iOS requires the `?&` quirk to keep the body param after the phone number."}, {"q": "Can I omit the phone?", "a": "Yes — `sms:?&body=text` opens a blank composer with prefilled text."}, {"q": "Does Android need a different format?", "a": "No — Android accepts the same syntax."}, {"q": "Carrier blocks the SMS?", "a": "sms: just opens the composer; sending depends on the user's plan."}];
const STEPS = ["Type the phone in E.164 form.", "Add the message body.", "Copy the sms: link.", "Place it on Contact buttons or QR codes."];
const TITLE = "SMS Link Generator — Free Online Tool";
const DESC = "Build an `sms:` link with a phone number and pre-filled message that opens the user's default SMS app.";

export const Route = createFileRoute("/sms-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/sms-link-generator",
    name: "SMS Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "SMS Link Generator", item: "/sms-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the SMS Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "SMS Link Generator" }]} />
      <ToolHero h1={"SMS Click-to-Text Link Generator"} intro={"Build an `sms:` link with a phone number and pre-filled message that opens the user's default SMS app."} keywords={KW} />

      <ToolForm
        fields={[{"name": "phone", "label": "Phone (E.164)", "type": "text", "placeholder": "+15555550123"}, {"name": "body", "label": "Pre-filled message", "type": "textarea", "placeholder": "Hi, I'd like to know more"}]}
        build={(v) => { if(!v.phone) return ''; const p=String(v.phone).replace(/[^+0-9]/g,''); const b=v.body?`?&body=${encodeURIComponent(v.body)}`:''; return `sms:${p}${b}`; }}
        
      />

      <HowToUse heading={"How to use the sms link generator"} steps={STEPS} />

      <AeoBlock
        question={"What is an sms: link?"}
        answer={"`sms:<phone>?&body=<text>` opens the device's SMS composer with the number and message ready. Use E.164 phone format (`+1` for the US)."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Plumber in Houston, TX", "how": "Adds 'Text us' to Google Business listing."}, {"who": "Restaurant in NYC", "how": "Lets diners text for reservations."}, {"who": "Tutor in Boston, MA", "how": "Allows parents to SMS with one tap."}, {"who": "Salon in Phoenix, AZ", "how": "Sends appointment confirmations."}]}
      />

      <WorkedExample intro={"A poster CTA that opens the messages app with the keyword already typed."} rows={[{"input": "Number +15551234567, body \"JOIN\"", "output": "sms:+15551234567?&body=JOIN"}, {"input": "iOS-safe form", "output": "The &amp; after ? is what makes older iOS keep the body"}, {"input": "Body with a line break", "output": "Encoded as %0A; some Android clients strip it"}]} note={"The ?& quirk is real: iOS historically dropped the body without the extra ampersand, and it does no harm on Android."} />

      <Pitfalls items={[{"problem": "Desktop visitors", "fix": "Nothing happens without a paired messages app. Show the number as text alongside the button."}, {"problem": "Long prefilled messages", "fix": "Anything over 160 characters becomes a multipart message and may be charged as several."}, {"problem": "Assuming delivery is free", "fix": "The sender pays their normal rate. Say so next to any shortcode-style CTA."}, {"problem": "Skipping the country code", "fix": "A local-format number fails for anyone roaming or abroad."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/whatsapp-link-generator", "anchor": "WhatsApp Link Generator", "blurb": "wa.me click-to-chat link with prefilled message & QR."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "HTML mailto link with subject, body, CC and BCC."}, {"to": "/sms-link-generator", "anchor": "Facetime Link Generator", "blurb": "sms: click-to-text deep links."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
