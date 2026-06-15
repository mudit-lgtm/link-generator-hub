import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/premium-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does this tool unlock premium downloads?", "a": "No — it's a URL validator. For actual debrid, use a paid service like Real-Debrid, AllDebrid or Premiumize."}, {"q": "Which hosts are most popular?", "a": "Rapidgator, Turbobit, Nitroflare and Keep2Share top community surveys."}, {"q": "Is using a debrid service legal?", "a": "Debrid services themselves are legal; downloading copyrighted content without rights is not."}, {"q": "Why does my URL fail validation?", "a": "The URL must contain the host's canonical domain — strip redirects and tracking wrappers first."}, {"q": "Can I batch-validate URLs?", "a": "Paste them one at a time here, or write a script using the same domain-match rule."}];
const STEPS = ["Pick the file host from the list.", "Paste the source URL.", "Read the validation result.", "Submit valid URLs to your debrid service."];
const TITLE = "Premium Link Generator — Free Online Tool";
const DESC = "Validate file URLs from the most-requested premium hosts (Rapidgator, Turbobit, Nitroflare and more). This is a structural validator, not a debrid service.";

export const Route = createFileRoute("/premium-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/premium-link-generator",
    name: "Premium Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Premium Link Generator", item: "/premium-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Premium Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Premium Link Generator" }]} />
      <ToolHero h1={"Premium File-Host Direct Link Validator"} intro={"Validate file URLs from the most-requested premium hosts (Rapidgator, Turbobit, Nitroflare and more). This is a structural validator, not a debrid service."} keywords={KW} />

      <ToolForm
        fields={[{"name": "host", "label": "Host", "type": "select", "options": [{"value": "rapidgator", "label": "Rapidgator"}, {"value": "turbobit", "label": "Turbobit"}, {"value": "nitroflare", "label": "Nitroflare"}, {"value": "filejoker", "label": "Filejoker"}, {"value": "keep2share", "label": "Keep2Share / K2S"}, {"value": "hitfile", "label": "Hitfile"}, {"value": "ddownload", "label": "DDownload"}, {"value": "uploadhaven", "label": "Uploadhaven"}, {"value": "katfile", "label": "Katfile"}, {"value": "fastfile", "label": "Fastfile.cc"}, {"value": "filesfly", "label": "Filesfly"}]}, {"name": "u", "label": "Source file URL", "type": "url", "placeholder": "https://rapidgator.net/file/…"}]}
        build={(v) => { if(!v.u) return ''; const map={rapidgator:'rapidgator.net',turbobit:'turbobit.net',nitroflare:'nitroflare.com',filejoker:'filejoker.net',keep2share:'k2s.cc',hitfile:'hitfile.net',ddownload:'ddownload.com',uploadhaven:'uploadhaven.com',katfile:'katfile.com',fastfile:'fastfile.cc',filesfly:'filesfly.cc'}; const want=(map as Record<string,string>)[String(v.host)]; if(!want) return ''; return v.u.includes(want) ? v.u : `⚠ URL does not look like a ${want} link.`; }}
        
      />

      <HowToUse heading={"How to use the premium link generator"} steps={STEPS} />

      <AeoBlock
        question={"What is a premium link generator?"}
        answer={"A premium link generator (a.k.a. debrid service) converts a free-host file URL into a higher-speed direct download by routing through a premium account. This page validates URL structure only — it does not host or fetch files."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Archivist in San Francisco, CA", "how": "Validates file-host URLs before submitting to a debrid service."}, {"who": "Linux user in Austin, TX", "how": "Double-checks ISO mirrors hosted on premium hosts."}, {"who": "Community moderator in NYC", "how": "Pre-screens forum file links for typos."}, {"who": "Researcher in Boston, MA", "how": "Confirms dataset URLs point at the expected host."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/direct-download-link-generator", "anchor": "Direct Download Link Generator", "blurb": "related link generator."}, {"to": "/mega-link-generator", "anchor": "MEGA Link Generator", "blurb": "related link generator."}, {"to": "/magnet-link-generator", "anchor": "Magnet Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
