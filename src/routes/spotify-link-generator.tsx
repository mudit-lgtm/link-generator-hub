import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
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

      <WorkedExample intro={"A track link for a bio, and the app deep link for a mobile campaign."} rows={[{"input": "Track ID 4cOdK2wGLETKBW3PvgPWqT", "output": "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT"}, {"input": "App deep link", "output": "spotify:track:4cOdK2wGLETKBW3PvgPWqT"}, {"input": "Copied share link", "output": "Strip ?si=\u2026 \u2014 that suffix is a share-tracking token, not part of the link"}]} note={"open.spotify.com links open the app automatically when it is installed, so there is rarely a reason to use the spotify: scheme on the web."} />

      <Pitfalls items={[{"problem": "Leaving the ?si= token in a public link", "fix": "It ties every play back to your own share session and clutters printed URLs."}, {"problem": "Linking a track that is region-locked", "fix": "Licensing varies by country; check the release is live in your main markets."}, {"problem": "Using the spotify: scheme in an email", "fix": "Many clients refuse non-http schemes and show it as plain text."}, {"problem": "Pointing new listeners at a single track", "fix": "An artist or playlist link keeps them listening longer and counts more monthly listeners."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/app-store-link-generator", "anchor": "App Store Link Generator", "blurb": "apps.apple.com canonical URLs."}, {"to": "/app-store-link-generator", "anchor": "Play Store Link Generator", "blurb": "apps.apple.com canonical URLs."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
