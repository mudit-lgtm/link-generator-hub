import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/dropbox-direct-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does the file have to be public?", "a": "Yes — the share link's audience must include ‘Anyone with the link’."}, {"q": "Will Dropbox block direct downloads if traffic spikes?", "a": "Free accounts get a daily bandwidth cap. High-volume distribution should host elsewhere."}, {"q": "What's the difference between dl=0 and dl=1?", "a": "`dl=0` opens the Dropbox preview page; `dl=1` triggers the browser download."}, {"q": "Can I use this with Dropbox folder links?", "a": "Folder links open the folder browser; only file URLs convert to direct downloads."}, {"q": "Do shortened ?st= URLs work?", "a": "Yes — Dropbox's signed URLs convert the same way."}];
const STEPS = ["In Dropbox, click Share on the file and copy the link.", "Paste the URL into the field above.", "Copy the rewritten dl.dropboxusercontent.com link.", "Use it in email campaigns, README files, or auto-responders."];
const TITLE = "Dropbox Direct Link Generator — Free Online Tool";
const DESC = "Turn any Dropbox share URL into a force-download link by swapping the host and flipping the dl flag. Paste, copy, share.";

export const Route = createFileRoute("/dropbox-direct-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/dropbox-direct-link-generator",
    name: "Dropbox Direct Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Dropbox Direct Link Generator", item: "/dropbox-direct-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Dropbox Direct Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Dropbox Direct Link Generator" }]} />
      <ToolHero h1={"Dropbox Direct Download Link Generator"} intro={"Turn any Dropbox share URL into a force-download link by swapping the host and flipping the dl flag. Paste, copy, share."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "Dropbox share URL", "type": "url", "placeholder": "https://www.dropbox.com/s/abc123/file.pdf?dl=0"}]}
        build={(v) => { if(!v.u) return ''; try{ const url=new URL(v.u); url.host='dl.dropboxusercontent.com'; url.searchParams.set('dl','1'); return url.toString(); }catch{return ''} }}
        
      />

      <HowToUse heading={"How to use the dropbox direct link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I force a Dropbox link to download?"}
        answer={"Change `www.dropbox.com` to `dl.dropboxusercontent.com` and append `?dl=1`. This tool does both edits at once so the file downloads instead of opening the Dropbox preview."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Indie game dev in Seattle, WA", "how": "Distributes playtest builds via a stable Dropbox direct link in Discord."}, {"who": "Author in Nashville, TN", "how": "Sends bonus chapters as PDFs from the welcome email autoresponder."}, {"who": "Studio engineer in Los Angeles, CA", "how": "Delivers WAV stems to mix engineers without the preview detour."}, {"who": "Nonprofit in Boston, MA", "how": "Shares annual report PDFs on social with a tracked direct-download URL."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/google-drive-direct-link-generator", "anchor": "Google Drive Direct Link Generator", "blurb": "related link generator."}, {"to": "/direct-download-link-generator", "anchor": "Direct Download Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
