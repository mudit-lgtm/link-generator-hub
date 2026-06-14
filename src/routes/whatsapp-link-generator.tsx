import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/whatsapp-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Do I need WhatsApp Business?", "a": "No — wa.me works with any WhatsApp account, personal or Business."}, {"q": "Why isn't the link working?", "a": "Strip spaces, dashes and the `+` from the number. It must be only digits with the country code."}, {"q": "Can I add multiple lines to the message?", "a": "Yes — newlines are encoded as `%0A` automatically by the URL encoder."}, {"q": "Is there a character limit on the message?", "a": "Practically yes — keep it under ~1,000 characters so it works on every device."}, {"q": "Can I track clicks?", "a": "Wrap the wa.me URL behind a short-link generator or UTM-tagged redirect."}];
const STEPS = ["Enter your full phone number (country code + number, digits only).", "Type the message you want pre-filled when customers tap.", "Copy the wa.me link.", "Add it to your website, Instagram bio, email signature or QR code."];
const TITLE = "WhatsApp Link Generator — Free Online Tool";
const DESC = "Build a wa.me click-to-chat link with a prefilled message. Customers tap the link and your message is pre-typed — no contact save required.";

export const Route = createFileRoute("/whatsapp-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/whatsapp-link-generator",
    name: "WhatsApp Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "WhatsApp Link Generator", item: "/whatsapp-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the WhatsApp Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "WhatsApp Link Generator" }]} />
      <ToolHero h1={"WhatsApp Click-to-Chat Link Generator"} intro={"Build a wa.me click-to-chat link with a prefilled message. Customers tap the link and your message is pre-typed — no contact save required."} keywords={KW} />

      <ToolForm
        fields={[{"name": "phone", "label": "Phone number with country code", "type": "tel", "placeholder": "15551234567", "hint": "Digits only, including country code."}, {"name": "msg", "label": "Pre-filled message (optional)", "type": "textarea", "placeholder": "Hi! I'd like to know more about…"}]}
        build={(v) => { const p=(v.phone||'').replace(/\D/g,''); if(!p) return ''; const m=v.msg?'?text='+encodeURIComponent(v.msg):''; return `https://wa.me/${p}${m}`; }}
        
      />

      <HowToUse heading={"How to use the whatsapp link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a WhatsApp click-to-chat link?"}
        answer={"Use the format `https://wa.me/<countrycode+number>?text=<urlencoded message>`. The phone number must be digits only with the country code; the message must be URL-encoded."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Realtor in Miami, FL", "how": "Adds a WhatsApp CTA to listing pages so buyers chat in one tap."}, {"who": "Restaurant in Austin, TX", "how": "Lets diners place takeout orders with a pre-filled menu request."}, {"who": "Coach in Los Angeles, CA", "how": "Books discovery calls via Instagram bio link."}, {"who": "Boutique in NYC", "how": "Handles SMS-style customer support without sharing a personal number."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
