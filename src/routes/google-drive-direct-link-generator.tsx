import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/google-drive-direct-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Why doesn't the regular Google Drive link download directly?", "a": "Drive defaults to a preview page so it can scan files for malware. The direct URL bypasses that step for files you own and trust."}, {"q": "Does the file have to be public?", "a": "Yes — set sharing to ‘Anyone with the link’ in Drive, otherwise recipients hit a login wall."}, {"q": "Will huge files work?", "a": "Files over ~100 MB show a ‘can't scan for viruses’ confirm screen. That's a Google limit, not this tool."}, {"q": "Is it safe to share direct Drive links publicly?", "a": "Anyone with the URL can download. Only share files you intend to be public."}, {"q": "Can I use this for Google Docs or Sheets?", "a": "Use Drive's File → Download menu to grab the export URL for Docs, Sheets and Slides."}];
const STEPS = ["Open the file in Google Drive and click Share → ‘Anyone with the link’.", "Copy the share URL from the browser address bar.", "Paste it above to get the direct download link.", "Send the new link by email, SMS or QR code."];
const TITLE = "Google Drive Direct Link Generator — Free Online Tool";
const DESC = "Convert any Google Drive share URL into a one-click direct download link. Paste the share URL and copy the direct link instantly.";

export const Route = createFileRoute("/google-drive-direct-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/google-drive-direct-link-generator",
    name: "Google Drive Direct Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Google Drive Direct Link Generator", item: "/google-drive-direct-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Google Drive Direct Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Google Drive Direct Link Generator" }]} />
      <ToolHero h1={"Google Drive Direct Download Link Generator"} intro={"Convert any Google Drive share URL into a one-click direct download link. Paste the share URL and copy the direct link instantly."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "Google Drive share URL", "type": "url", "placeholder": "https://drive.google.com/file/d/FILE_ID/view"}]}
        build={(v) => { const m=v.u && (v.u.match(/\/d\/([^/?]+)/)||[null,new URL(v.u).searchParams.get('id')]); const id=m && m[1]; return id ? `https://drive.google.com/uc?export=download&id=${id}` : ''; }}
        
      />

      <HowToUse heading={"How to use the google drive direct link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I make a Google Drive direct download link?"}
        answer={"Replace the share URL `https://drive.google.com/file/d/FILE_ID/view` with `https://drive.google.com/uc?export=download&id=FILE_ID`. This tool extracts the file ID and builds the direct link automatically."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Online course creator in Austin, TX", "how": "Sends students one-click downloads for PDF workbooks hosted on Drive."}, {"who": "Realtor in Miami, FL", "how": "Embeds Drive listing photos and floor plans as direct previews in email."}, {"who": "Podcaster in Brooklyn, NY", "how": "Shares episode MP3s as direct downloads instead of Drive's preview screen."}, {"who": "Wedding photographer in Denver, CO", "how": "Delivers client gallery ZIPs with a single shareable download URL."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}, {"to": "/dropbox-direct-link-generator", "anchor": "Dropbox Direct Link Generator", "blurb": "related link generator."}, {"to": "/direct-download-link-generator", "anchor": "Direct Download Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
