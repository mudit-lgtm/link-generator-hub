import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/tel-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Do extensions work?", "a": "A comma adds a pause before the extension digits; most carriers honour it."}, {"q": "Will it work on desktop?", "a": "Yes, if a calling app such as FaceTime, Skype or Teams is installed."}, {"q": "Should I include the country code?", "a": "Yes — always. Without it international visitors can't connect."}, {"q": "Can I track calls?", "a": "Use a call-tracking number as the destination."}, {"q": "Can I turn it into a QR code?", "a": "Yes — paste the tel: link into the QR Code Link Generator."}];
const STEPS = ["Enter the number in E.164 format (+1 for the US).", "Add an extension if callers need one.", "Choose raw tel: link or HTML button code.", "Paste it on your contact page."];
const TITLE = "Phone Call Link Generator — Free Online Tool";
const DESC = "Create a tel: click-to-call link that dials your number straight from a phone, with optional extension support.";

export const Route = createFileRoute("/tel-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/tel-link-generator",
    name: "Phone Call Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Phone Call Link Generator", item: "/tel-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use the ${"Phone Call Link Generator"}`,
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Phone Call Link Generator" }]} />
      <ToolHero h1={"Click-to-Call (tel:) Link Generator"} intro={DESC} keywords={KW} />

      <ToolForm
        fields={[{"name": "phone", "label": "Phone number (E.164)", "type": "tel", "placeholder": "+15555550123"}, {"name": "ext", "label": "Extension (optional)", "type": "text", "placeholder": "204"}, {"name": "text", "label": "Button text", "type": "text", "default": "Call us"}, {"name": "html", "label": "Output as HTML link", "type": "checkbox"}]}
        build={(v) => { if(!v.phone) return ''; const p=String(v.phone).replace(/[^+0-9]/g,''); const href=`tel:${p}${v.ext?`,${String(v.ext).replace(/[^0-9]/g,'')}`:''}`; return v.html?`<a href="${href}">${v.text||'Call us'}</a>`:href; }}
      />

      <HowToUse heading={"How to use the tel link generator"} steps={STEPS} />

      <AeoBlock question={"What is a tel: link?"} answer={"`tel:+15555550123` tells a phone, tablet or desktop calling app to dial that number when tapped. Always use E.164 (country code + number, no spaces)."} keywords={KW} />

      <GeoBlock heading={"USA use cases"} keywords={KW} items={[{"who": "HVAC company in Dallas, TX", "how": "Adds tap-to-call to mobile ads."}, {"who": "Clinic in Portland, OR", "how": "Lets patients dial reception."}, {"who": "Law firm in Boston, MA", "how": "Routes callers to an extension."}, {"who": "Towing service in Las Vegas, NV", "how": "Puts a call button in every listing."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks heading="Related link generators" links={[{"to": "/sms-link-generator", "anchor": "Sms Link Generator", "blurb": "related link generator."}, {"to": "/whatsapp-link-generator", "anchor": "Whatsapp Link Generator", "blurb": "related link generator."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "Qr Code Link Generator", "blurb": "related link generator."}]} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
