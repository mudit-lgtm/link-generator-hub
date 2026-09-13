import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/audio-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Are my audio files uploaded?", "a": "No. The upload stays in your browser; nothing is sent to a server."}, {"q": "What's the best host for podcast audio?", "a": "Buzzsprout, Transistor, Captivate and Libsyn handle bandwidth and analytics."}, {"q": "Does the preview URL persist?", "a": "No — the in-browser URL works only in the current tab."}, {"q": "What formats can I share?", "a": "MP3 is the most compatible. WAV and FLAC work in modern browsers."}, {"q": "Can I add chapters?", "a": "Use ID3 chapter tags in your MP3; players like Pocket Casts and Overcast surface them."}];
const STEPS = ["Upload an audio file or paste an MP3/WAV URL.", "Use the inline player to verify playback.", "Copy the link for use in show notes or social posts.", "For public distribution, host on a podcast service."];
const TITLE = "Audio Link Generator — Free Online Tool";
const DESC = "Drop an MP3, WAV or M4A file to get an in-browser playback link, or validate an existing audio URL. Useful for quick demos and podcast previews.";

export const Route = createFileRoute("/audio-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/audio-link-generator",
    name: "Audio Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Audio Link Generator", item: "/audio-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Audio Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Audio Link Generator" }]} />
      <ToolHero h1={"Audio Link Generator"} intro={"Drop an MP3, WAV or M4A file to get an in-browser playback link, or validate an existing audio URL. Useful for quick demos and podcast previews."} keywords={KW} />

      <ToolForm
        fields={[{"name": "f", "label": "Upload audio file", "type": "file", "accept": "audio/*"}, {"name": "u", "label": "…or paste an existing audio URL", "type": "url", "placeholder": "https://example.com/episode.mp3"}]}
        build={(v) => { return (v.f) || (v.u?String(v.u).trim():''); }}
        preview="audio"
      />

      <HowToUse heading={"How to use the audio link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I share an audio file as a link?"}
        answer={"Host the file on a podcast host (Buzzsprout, Transistor), Cloudinary, S3 or any HTTPS server and share that public URL. Use the upload above for a temporary in-browser preview."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Podcaster in Brooklyn, NY", "how": "QA-checks episode MP3s before pushing to Buzzsprout."}, {"who": "Music producer in Atlanta, GA", "how": "Shares rough mixes with collaborators in Discord."}, {"who": "Voice-over artist in Chicago, IL", "how": "Sends demo reels to casting directors as direct links."}, {"who": "Audiobook narrator in Nashville, TN", "how": "Validates chapter audio files before uploading to ACX."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/video-link-generator", "anchor": "Video Link Generator", "blurb": "Direct MP4 / video share URL builder."}, {"to": "/direct-download-link-generator", "anchor": "Direct Download Link Generator", "blurb": "Force-download URLs for any hosted file."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
