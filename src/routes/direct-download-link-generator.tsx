import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/direct-download-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does `download` work cross-origin?", "a": "Browsers only honor `download` for same-origin URLs or hosts that send a `Content-Disposition: attachment` header."}, {"q": "Can I rename the file on download?", "a": "Yes — set the `download` attribute to the desired filename."}, {"q": "What if I don't control the host?", "a": "You may need a tiny proxy that adds `Content-Disposition` headers, or host the file yourself."}, {"q": "Will this work on iOS Safari?", "a": "iOS handles `download` from same-origin URLs in recent versions; otherwise it opens in a new tab."}, {"q": "Can I track downloads?", "a": "Wrap the link with a Google Analytics event handler or use a redirect URL."}];
const STEPS = ["Upload a file or paste an existing file URL.", "Optionally set a suggested filename.", "Copy the HTML snippet and paste it into your site, email or README.", "Test the snippet in a real browser to confirm it downloads."];
const TITLE = "Direct Download Link Generator — Free Online Tool";
const DESC = "Upload any file or paste a hosted URL to produce a copy-paste HTML snippet that forces the browser to download instead of preview.";

export const Route = createFileRoute("/direct-download-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/direct-download-link-generator",
    name: "Direct Download Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Direct Download Link Generator", item: "/direct-download-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Direct Download Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Direct Download Link Generator" }]} />
      <ToolHero h1={"Direct Download Link Generator"} intro={"Upload any file or paste a hosted URL to produce a copy-paste HTML snippet that forces the browser to download instead of preview."} keywords={KW} />

      <ToolForm
        fields={[{"name": "f", "label": "Upload a file", "type": "file", "accept": "*/*"}, {"name": "u", "label": "…or paste an existing file URL", "type": "url", "placeholder": "https://example.com/file.zip"}, {"name": "fname", "label": "Suggested download name", "type": "text", "placeholder": "file.zip"}]}
        build={(v) => { const href=(v.f)||(v.u?String(v.u).trim():''); if(!href) return ''; const fn=v.fname?` download="${String(v.fname).replace(/"/g,'')}"`:' download'; return `<a href="${href}"${fn}>Download</a>`; }}
        outputLabel="Force-download HTML snippet" multiline
      />

      <HowToUse heading={"How to use the direct download link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I force a file to download instead of opening?"}
        answer={"Use an `<a href=\"file.ext\" download=\"file.ext\">` tag. The `download` attribute tells the browser to save the file rather than open it inline."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Marketer in Austin, TX", "how": "Adds download attributes to lead-magnet links so PDFs save to disk."}, {"who": "Studio in LA, CA", "how": "Delivers WAV stems with a save-to-disk default."}, {"who": "SaaS founder in Boston, MA", "how": "Distributes desktop installers with stable download URLs."}, {"who": "Nonprofit in Chicago, IL", "how": "Shares branded report PDFs that download with a friendly filename."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/pdf-link-generator", "anchor": "PDF Link Generator", "blurb": "Build direct download links for PDF files."}, {"to": "/google-drive-direct-link-generator", "anchor": "Google Drive Direct Link Generator", "blurb": "Convert Google Drive shares to direct downloads."}, {"to": "/direct-download-link-generator", "anchor": "Dropbox Direct Link Generator", "blurb": "Force-download URLs for any hosted file."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
