import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { ShareAndGuestbook } from "@/components/backlink-block";
import { buildWhatsAppLink } from "@/lib/link-builders";
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
        build={(v) => buildWhatsAppLink(v.phone || "", v.msg)}
        
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

      <WorkedExample intro={"A Chicago bakery wants order enquiries to land in WhatsApp with the order form already typed out."} rows={[{"input": "Phone +1 (555) 123-4567, no message", "output": "https://wa.me/15551234567"}, {"input": "Phone +44 7700 900123, message \"Hi, is the sourdough available today?\"", "output": "https://wa.me/447700900123?text=Hi%2C%20is%20the%20sourdough%20available%20today%3F"}, {"input": "Message with two lines (order + pickup time)", "output": "\u2026?text=Order%3A%202%20loaves%0APickup%3A%204pm"}]} note={"Line breaks become %0A, so a multi-line order template arrives formatted in the chat."} />

      <Pitfalls items={[{"problem": "Leaving the + or leading zeros in the number", "fix": "wa.me accepts digits only. +44 (0)7700 900123 must be sent as 447700900123 \u2014 the national trunk zero is dropped."}, {"problem": "Using api.whatsapp.com links in Instagram bios", "fix": "Some in-app browsers block the api subdomain. wa.me redirects cleanly on both iOS and Android."}, {"problem": "Very long prefilled messages", "fix": "Above roughly 1,000 characters older Android builds truncate the text silently. Keep the template short and let the customer add detail."}, {"problem": "Expecting the message to send itself", "fix": "WhatsApp only pre-types the text. The customer still taps send, which is why a question works better than a statement."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "HTML mailto link with subject, body, CC and BCC."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "Build Google Analytics UTM campaign tracking links."}]}
      />

      <ShareAndGuestbook path="/whatsapp-link-generator" title={TITLE} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
