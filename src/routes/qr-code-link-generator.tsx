import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { ShareAndGuestbook } from "@/components/backlink-block";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/qr-code-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Will the QR work offline?", "a": "Yes — printed QRs scan whether the device is online; the URL inside needs internet to load."}, {"q": "How big should I print it?", "a": "Aim for at least 2x2 cm at typical reading distance; larger for posters."}, {"q": "Why does my QR look pixelated?", "a": "Use the download size of 300px or larger and ensure quiet (white) margin around it."}, {"q": "Can I customize the colors?", "a": "Yes — high-contrast dark-on-light works best; we render solid black by default for max compatibility."}, {"q": "Can I add a logo?", "a": "Some QR readers allow logos in the center if error-correction is set to high."}];
const STEPS = ["Paste a URL or text payload.", "Wait for the QR preview to render.", "Right-click the QR and Save Image, or use the download link.", "Print or embed as needed."];
const TITLE = "QR Code Link Generator — Free Online Tool";
const DESC = "Turn any URL into a downloadable QR code PNG. Scan-tested on iPhone, Android and dedicated readers.";

export const Route = createFileRoute("/qr-code-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/qr-code-link-generator",
    name: "QR Code Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "QR Code Link Generator", item: "/qr-code-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the QR Code Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "QR Code Link Generator" }]} />
      <ToolHero h1={"QR Code Link Generator"} intro={"Turn any URL into a downloadable QR code PNG. Scan-tested on iPhone, Android and dedicated readers."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "URL or text", "type": "url", "placeholder": "https://example.com"}]}
        build={(v) => { return v.u?String(v.u).trim():''; }}
        preview="qr"
      />

      <HowToUse heading={"How to use the qr code link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I generate a QR code for a URL?"}
        answer={"Encode the URL as a QR symbol — most generators (including this one) call a public QR rendering API such as goqr.me to return a PNG. Scan-test it before printing."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Restaurant in Austin, TX", "how": "Prints menu QR codes on table tents."}, {"who": "Realtor in Miami, FL", "how": "Adds a QR to yard signs that opens the listing."}, {"who": "Event organizer in Las Vegas, NV", "how": "Distributes scannable check-in codes on badges."}, {"who": "Wedding planner in Charleston, SC", "how": "Shares a photo-album QR on the menu card."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/whatsapp-link-generator", "anchor": "WhatsApp Link Generator", "blurb": "wa.me click-to-chat link with prefilled message & QR."}, {"to": "/google-review-link-generator", "anchor": "Google Review Link Generator", "blurb": "Google Business 5-star review link for local SEO."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "HTML mailto link with subject, body, CC and BCC."}]}
      />

      <ShareAndGuestbook path="/qr-code-link-generator" title={TITLE} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
