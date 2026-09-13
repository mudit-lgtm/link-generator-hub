import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/pdf-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "What does `#view=FitH` do?", "a": "It tells Adobe Reader and most browsers to open the PDF zoomed to fit the page width."}, {"q": "Can I force the PDF to download instead of open?", "a": "Add the `download` attribute to your `<a>` tag or use the Direct Download Link Generator."}, {"q": "Will the preview URL work in email?", "a": "Browser preview URLs only work in the current tab. Email needs a hosted URL."}, {"q": "Are mobile browsers OK with #view fragments?", "a": "Most ignore them gracefully — the PDF still opens, just without the zoom hint."}, {"q": "Is there a way to jump to a specific page?", "a": "Yes — append `#page=3` (or combine: `#page=3&view=FitH`)."}];
const STEPS = ["Upload a PDF or paste a hosted PDF URL.", "The viewer fragment is added automatically.", "Copy the link for emails, SMS, social posts or QR codes.", "Embed it in an iframe for inline display."];
const TITLE = "PDF Link Generator — Free Online Tool";
const DESC = "Upload a PDF for instant in-browser viewing or paste a hosted URL to append a viewer fragment (#view=FitH) for a clean inline display.";

export const Route = createFileRoute("/pdf-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/pdf-link-generator",
    name: "PDF Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "PDF Link Generator", item: "/pdf-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the PDF Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "PDF Link Generator" }]} />
      <ToolHero h1={"PDF Direct Link Generator"} intro={"Upload a PDF for instant in-browser viewing or paste a hosted URL to append a viewer fragment (#view=FitH) for a clean inline display."} keywords={KW} />

      <ToolForm
        fields={[{"name": "f", "label": "Upload PDF", "type": "file", "accept": "application/pdf"}, {"name": "u", "label": "…or paste a hosted PDF URL", "type": "url", "placeholder": "https://example.com/whitepaper.pdf"}]}
        build={(v) => { const base=(v.f)||(v.u?String(v.u).trim():''); return base ? (base.includes('#')?base:base+'#view=FitH') : ''; }}
        preview="pdf"
      />

      <HowToUse heading={"How to use the pdf link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I share a PDF as a direct link?"}
        answer={"Host the PDF on your site, S3, Drive or Dropbox and append `#view=FitH` so most browsers open it fit-to-width. Use the upload above for a temporary in-browser preview."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Lawyer in NYC", "how": "Sends engagement letters as inline-viewable PDFs."}, {"who": "Realtor in Phoenix, AZ", "how": "Shares property fact sheets via SMS with one-tap preview."}, {"who": "B2B SaaS marketer in Austin, TX", "how": "Gates whitepapers behind a download CTA on the landing page."}, {"who": "Course creator in Denver, CO", "how": "Embeds PDF handouts inline in the LMS lesson page."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/direct-download-link-generator", "anchor": "Direct Download Link Generator", "blurb": "Force-download URLs for any hosted file."}, {"to": "/image-link-generator", "anchor": "Image Link Generator", "blurb": "Direct image hotlink & share URL builder."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
