import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/magnet-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "What is an info hash?", "a": "A SHA-1 (40 hex chars) or base32 (32 chars) fingerprint of the torrent's metadata. It uniquely identifies the swarm."}, {"q": "Are trackers required?", "a": "No — DHT and PEX can discover peers — but trackers speed up initial connection."}, {"q": "Can I add a web seed?", "a": "Yes, append `&ws=https://your-mirror/file` to fall back to HTTP if peers are scarce."}, {"q": "Is sharing a magnet legal?", "a": "Magnet URIs are just identifiers. Legality depends on the content, not the link format."}, {"q": "Why isn't my client connecting?", "a": "Check that the hash is correct and add at least one healthy public tracker."}];
const STEPS = ["Paste the 40-character info hash from your torrent.", "Add a display name to help your peers identify the content.", "Paste public trackers, one per line.", "Copy the assembled magnet URI."];
const TITLE = "Magnet Link Generator — Free Online Tool";
const DESC = "Assemble a magnet URI from a BitTorrent info hash, display name and tracker list. No torrent file required.";

export const Route = createFileRoute("/magnet-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/magnet-link-generator",
    name: "Magnet Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Magnet Link Generator", item: "/magnet-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Magnet Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Magnet Link Generator" }]} />
      <ToolHero h1={"BitTorrent Magnet Link Generator"} intro={"Assemble a magnet URI from a BitTorrent info hash, display name and tracker list. No torrent file required."} keywords={KW} />

      <ToolForm
        fields={[{"name": "hash", "label": "Info hash (40-char SHA-1 or 32-char base32)", "type": "text", "placeholder": "e.g. c12fe1c06bba254a9dc9f519b335aa7c1367a88a"}, {"name": "dn", "label": "Display name", "type": "text", "placeholder": "my-release-name"}, {"name": "tr", "label": "Trackers (one per line)", "type": "textarea", "placeholder": "udp://tracker.opentrackr.org:1337/announce"}]}
        build={(v) => { if(!v.hash) return ''; const trs=(v.tr||'').split(/\r?\n/).filter(Boolean).map((t: string)=>'&tr='+encodeURIComponent(t.trim())).join(''); const dn=v.dn?'&dn='+encodeURIComponent(v.dn):''; return `magnet:?xt=urn:btih:${v.hash.trim()}${dn}${trs}`; }}
        
      />

      <HowToUse heading={"How to use the magnet link generator"} steps={STEPS} />

      <AeoBlock
        question={"What is a magnet link?"}
        answer={"A magnet link is a URI starting with `magnet:?xt=urn:btih:` followed by a BitTorrent info hash, optional display name (`dn=`) and tracker addresses (`tr=`). Clients use it instead of downloading a .torrent file."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Linux distro mirror in Raleigh, NC", "how": "Publishes magnet URIs alongside ISO downloads for resilient delivery."}, {"who": "Open-data archivist in San Francisco, CA", "how": "Distributes academic dataset bundles via magnet so peers cache copies."}, {"who": "Game modder in Austin, TX", "how": "Ships large texture packs to community via magnet links on a forum."}, {"who": "Software publisher in Seattle, WA", "how": "Offers magnet downloads as a fallback when CDN traffic spikes."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/direct-download-link-generator", "anchor": "Direct Download Link Generator", "blurb": "related link generator."}, {"to": "/premium-link-generator", "anchor": "Premium Link Generator", "blurb": "related link generator."}, {"to": "/mega-link-generator", "anchor": "MEGA Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
