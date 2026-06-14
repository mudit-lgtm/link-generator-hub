import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/video-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Where should I host videos publicly?", "a": "YouTube and Vimeo for reach, Mux and Cloudflare Stream for embeds, S3+CloudFront for self-hosted."}, {"q": "Will huge files work in the browser?", "a": "Large videos load slowly but work. For 4K masters use a desktop player to QA."}, {"q": "Do you upload my video?", "a": "No — files stay in your browser."}, {"q": "What formats can I preview?", "a": "Anything your browser supports: MP4 (H.264), WebM and HLS streams."}, {"q": "Can I generate a thumbnail?", "a": "Right-click the video in most browsers to save the current frame."}];
const STEPS = ["Upload a video file or paste a hosted video URL.", "Play it back inline to confirm encoding and audio.", "Copy the link for QA notes or chat.", "For production embedding, host on a streaming platform."];
const TITLE = "Video Link Generator — Free Online Tool";
const DESC = "Upload an MP4 or paste a video URL to get an instant in-browser preview link. Quick way to QA a hosted video or share a one-off clip locally.";

export const Route = createFileRoute("/video-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/video-link-generator",
    name: "Video Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Video Link Generator", item: "/video-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Video Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Video Link Generator" }]} />
      <ToolHero h1={"Video Link Generator"} intro={"Upload an MP4 or paste a video URL to get an instant in-browser preview link. Quick way to QA a hosted video or share a one-off clip locally."} keywords={KW} />

      <ToolForm
        fields={[{"name": "f", "label": "Upload video file", "type": "file", "accept": "video/*"}, {"name": "u", "label": "…or paste a video URL", "type": "url", "placeholder": "https://example.com/clip.mp4"}]}
        build={(v) => { return (v.f) || (v.u?String(v.u).trim():''); }}
        preview="video"
      />

      <HowToUse heading={"How to use the video link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I share a video file as a link?"}
        answer={"Upload to a host like YouTube, Vimeo, Mux, Cloudflare Stream or S3+CloudFront and share the playback URL. The uploader above creates a temporary local preview for quick checks."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Course creator in Austin, TX", "how": "QA-checks lesson videos before uploading to Teachable."}, {"who": "Wedding videographer in Denver, CO", "how": "Previews highlight reels before delivery."}, {"who": "Marketing team in San Francisco, CA", "how": "Validates product-demo MP4s before embedding on the landing page."}, {"who": "YouTuber in Los Angeles, CA", "how": "Reviews export quality before publishing."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/audio-link-generator", "anchor": "Audio Link Generator", "blurb": "related link generator."}, {"to": "/youtube-link-generator", "anchor": "YouTube Link Generator", "blurb": "related link generator."}, {"to": "/direct-download-link-generator", "anchor": "Direct Download Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
