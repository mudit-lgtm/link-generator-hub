import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/facetime-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does FaceTime work on Android?", "a": "Only via shareable links generated inside the FaceTime app, not the facetime: URI."}, {"q": "Will Safari prompt before calling?", "a": "Yes — Apple shows a confirmation."}, {"q": "Can I use this on Windows?", "a": "No — facetime: only resolves on Apple devices."}, {"q": "How do I make a shareable link?", "a": "Open FaceTime → Create Link, then share that facetime.apple.com URL."}, {"q": "Difference between video and audio URIs?", "a": "`facetime:` is video; `facetime-audio:` is audio."}];
const STEPS = ["Pick video or audio.", "Enter phone or Apple ID email.", "Copy the link.", "Add to mailto signatures or website CTAs."];
const TITLE = "FaceTime Link Generator — Free Online Tool";
const DESC = "Build a `facetime:` URI from a phone or email so taps launch a FaceTime audio or video call.";

export const Route = createFileRoute("/facetime-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/facetime-link-generator",
    name: "FaceTime Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "FaceTime Link Generator", item: "/facetime-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the FaceTime Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "FaceTime Link Generator" }]} />
      <ToolHero h1={"FaceTime Click-to-Call Link Generator"} intro={"Build a `facetime:` URI from a phone or email so taps launch a FaceTime audio or video call."} keywords={KW} />

      <ToolForm
        fields={[{"name": "kind", "label": "Call type", "type": "select", "options": [{"value": "facetime", "label": "Video"}, {"value": "facetime-audio", "label": "Audio"}]}, {"name": "id", "label": "Phone or email", "type": "text", "placeholder": "+15555550123 or you@apple.com"}]}
        build={(v) => { if(!v.id) return ''; const id=String(v.id).trim(); return `${v.kind||'facetime'}:${id}`; }}
        
      />

      <HowToUse heading={"How to use the facetime link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a FaceTime link?"}
        answer={"Use `facetime:<phone-or-email>` for video, or `facetime-audio:<id>` for audio. For shareable web links, generate one inside the FaceTime app on iOS/macOS (facetime.apple.com)."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Realtor in Miami, FL", "how": "Adds tap-to-FaceTime for property tours."}, {"who": "Consultant in San Francisco, CA", "how": "Lets clients FaceTime from contact page."}, {"who": "Teacher in Boston, MA", "how": "Sets up office hours via FaceTime."}, {"who": "Doctor in Seattle, WA", "how": "Offers tele-visits via FaceTime audio."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/sms-link-generator", "anchor": "Sms Link Generator", "blurb": "related link generator."}, {"to": "/whatsapp-link-generator", "anchor": "WhatsApp Link Generator", "blurb": "related link generator."}, {"to": "/zoom-meeting-link-generator", "anchor": "Zoom Meeting Link Generator", "blurb": "related link generator."}, {"to": "/google-meet-link-generator", "anchor": "Google Meet Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
