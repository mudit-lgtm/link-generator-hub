import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
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

      <WorkedExample intro={"A contact page button that dials reception and jumps straight to an extension."} rows={[{"input": "+1 (555) 123-4567", "output": "tel:+15551234567"}, {"input": "Extension 204", "output": "tel:+15551234567,204 \u2014 the comma is a two-second pause"}, {"input": "Longer IVR path", "output": "tel:+15551234567,,204 \u2014 two commas for slower menus"}]} note={"A comma is a pause; a p also works on many handsets. Extensions dialled with no pause almost always miss the menu."} />

      <Pitfalls items={[{"problem": "Formatting the href like the display text", "fix": "Spaces, brackets and dashes belong in the visible label, never inside tel:."}, {"problem": "No country code", "fix": "The number fails for anyone calling from abroad or on a foreign SIM."}, {"problem": "A call button on desktop with no fallback", "fix": "Show the number as selectable text so it can be copied."}, {"problem": "Tracking numbers swapped by script", "fix": "If a script rewrites numbers, make sure it rewrites the href too, not just the label."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks heading="Related link generators" links={[{"to": "/sms-link-generator", "anchor": "Sms Link Generator", "blurb": "sms: click-to-text deep links."}, {"to": "/whatsapp-link-generator", "anchor": "Whatsapp Link Generator", "blurb": "wa.me click-to-chat link with prefilled message & QR."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "HTML mailto link with subject, body, CC and BCC."}, {"to": "/qr-code-link-generator", "anchor": "Qr Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
