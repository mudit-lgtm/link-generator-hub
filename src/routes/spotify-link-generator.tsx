import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/spotify-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does open.spotify.com require a Spotify app?", "a": "No — it opens a web player and offers an app deep link."}, {"q": "How do I get a track ID?", "a": "Right-click → Share → Copy Spotify URI, then take the part after `spotify:track:`."}, {"q": "Will the link play full songs?", "a": "Free users hear previews; Premium users hear full audio."}, {"q": "Can I link to a specific timestamp?", "a": "Spotify ignores `?t=` for tracks; supported for podcast episodes."}, {"q": "Is there an Apple Music equivalent?", "a": "Yes — use our Apple Music link generator or copy the music.apple.com URL."}];
const STEPS = ["Pick type (track, album, playlist, artist).", "Paste the Spotify ID or URI.", "Copy the open.spotify.com URL.", "Add to bios, posts or QR codes."];
const TITLE = "Spotify Link Generator — Free Online Tool";
const DESC = "Build canonical open.spotify.com URLs from a Spotify URI or ID for tracks, albums, playlists and artists.";

export const Route = createFileRoute("/spotify-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/spotify-link-generator",
    name: "Spotify Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Spotify Link Generator", item: "/spotify-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Spotify Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Spotify Link Generator" }]} />
      <ToolHero h1={"Spotify Track, Album, Playlist & Artist Link Generator"} intro={"Build canonical open.spotify.com URLs from a Spotify URI or ID for tracks, albums, playlists and artists."} keywords={KW} />

      <ToolForm
        fields={[{"name": "kind", "label": "Type", "type": "select", "options": [{"value": "track", "label": "Track"}, {"value": "album", "label": "Album"}, {"value": "playlist", "label": "Playlist"}, {"value": "artist", "label": "Artist"}]}, {"name": "id", "label": "Spotify ID or URI", "type": "text", "placeholder": "3n3Ppam7vgaVa1iaRUc9Lp or spotify:track:..."}]}
        build={(v) => { if(!v.id) return ''; const id=String(v.id).trim().split(':').pop(); return `https://open.spotify.com/${v.kind||'track'}/${id}`; }}
        
      />

      <HowToUse heading={"How to use the spotify link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I get a shareable Spotify link?"}
        answer={"Use `https://open.spotify.com/<type>/<id>` where type is `track`, `album`, `playlist` or `artist`. The Spotify app exposes the ID via Share → Copy link."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Band in Nashville, TN", "how": "Adds a Spotify track link to email signatures."}, {"who": "Podcaster in Brooklyn, NY", "how": "Pins a Spotify show link in episode notes."}, {"who": "Music marketer in LA, CA", "how": "Builds release-day playlist URLs."}, {"who": "Bar in Austin, TX", "how": "Cross-promotes the venue's playlist via QR code."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/app-store-link-generator", "anchor": "App Store Link Generator", "blurb": "related link generator."}, {"to": "/play-store-link-generator", "anchor": "Play Store Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
