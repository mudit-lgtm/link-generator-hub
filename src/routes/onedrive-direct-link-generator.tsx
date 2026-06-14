import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/onedrive-direct-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does this work for personal and business OneDrive?", "a": "Yes — the Microsoft Graph shares endpoint accepts both consumer (1drv.ms) and SharePoint share URLs."}, {"q": "Is the share URL public?", "a": "Anyone with the encoded link can download. Set the underlying share's audience to match your intent."}, {"q": "Why does my URL still show the preview page?", "a": "Make sure you copied the raw share URL from Share → Copy link, not the page URL of an opened file."}, {"q": "Are there file-size limits?", "a": "OneDrive supports large files; very large downloads may stream slowly through the shares endpoint."}, {"q": "Can I reverse the encoded URL?", "a": "Yes — base64-decode the portion after `u!` (after restoring `_`→`/`, `-`→`+`) to recover the share URL."}];
const STEPS = ["Right-click the file in OneDrive and choose Share → Copy link.", "Paste the share URL above.", "Copy the generated /root/content direct URL.", "Share it in email, SMS or scripts."];
const TITLE = "OneDrive Direct Link Generator — Free Online Tool";
const DESC = "Convert a OneDrive share URL into a Microsoft Graph direct content URL. Paste the share link and copy a one-click download.";

export const Route = createFileRoute("/onedrive-direct-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/onedrive-direct-link-generator",
    name: "OneDrive Direct Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "OneDrive Direct Link Generator", item: "/onedrive-direct-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the OneDrive Direct Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "OneDrive Direct Link Generator" }]} />
      <ToolHero h1={"OneDrive Direct Download Link Generator"} intro={"Convert a OneDrive share URL into a Microsoft Graph direct content URL. Paste the share link and copy a one-click download."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "OneDrive share URL", "type": "url", "placeholder": "https://1drv.ms/b/s!Abc..."}]}
        build={(v) => { if(!v.u) return ''; const b64=btoa(v.u).replace(/=+$/,'').replace(/\//g,'_').replace(/\+/g,'-'); return `https://api.onedrive.com/v1.0/shares/u!${b64}/root/content`; }}
        
      />

      <HowToUse heading={"How to use the onedrive direct link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I get a direct download from OneDrive?"}
        answer={"Base64-encode the share URL, swap `/` for `_` and `+` for `-`, then prefix with `https://api.onedrive.com/v1.0/shares/u!` and suffix `/root/content`. The tool above does this for you."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "IT admin in Chicago, IL", "how": "Distributes signed installer MSIs via OneDrive direct links in Intune."}, {"who": "HR lead in Atlanta, GA", "how": "Delivers offer-letter PDFs straight from a OneDrive share."}, {"who": "Microsoft 365 consultant in Phoenix, AZ", "how": "Builds quick file-share automations in Power Automate using the direct URL pattern."}, {"who": "Teacher in Portland, OR", "how": "Shares lesson printables that download instantly from a class link."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/google-drive-direct-link-generator", "anchor": "Google Drive Direct Link Generator", "blurb": "related link generator."}, {"to": "/dropbox-direct-link-generator", "anchor": "Dropbox Direct Link Generator", "blurb": "related link generator."}, {"to": "/direct-download-link-generator", "anchor": "Direct Download Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
