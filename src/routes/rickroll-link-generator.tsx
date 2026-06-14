import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/rickroll-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Is rickrolling harmful?", "a": "No — it just opens a music video. Keep it friendly and don't disguise it as anything malicious."}, {"q": "Can I use my own custom domain?", "a": "Yes — set up a redirect on your own short-link service if you want full control."}, {"q": "Will browsers warn about it?", "a": "No — it's a normal YouTube redirect."}, {"q": "Where did rickrolling start?", "a": "On 4chan in 2007 as a bait-and-switch joke."}, {"q": "Is there a Rick Roll holiday?", "a": "April 1st (April Fools) is peak rickroll season."}];
const STEPS = ["Enter a display label or slug.", "Copy the disguised URL.", "Drop it where a real link would normally go.", "Watch the reactions."];
const TITLE = "Rick Roll Link Generator — Free Online Tool";
const DESC = "Disguise the classic Rick Astley video behind any custom URL slug. For pranks, April Fools and friendly meetings only.";

export const Route = createFileRoute("/rickroll-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/rickroll-link-generator",
    name: "Rick Roll Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Rick Roll Link Generator", item: "/rickroll-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Rick Roll Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Rick Roll Link Generator" }]} />
      <ToolHero h1={"Rick Roll Link Generator"} intro={"Disguise the classic Rick Astley video behind any custom URL slug. For pranks, April Fools and friendly meetings only."} keywords={KW} />

      <ToolForm
        fields={[{"name": "label", "label": "Display text or slug", "type": "text", "default": "important-document"}]}
        build={(v) => { return `https://rickroll.it/?l=${encodeURIComponent(v.label||'click-here')}`; }}
        
      />

      <HowToUse heading={"How to use the rick roll link generator"} steps={STEPS} />

      <AeoBlock
        question={"What is a rickroll link?"}
        answer={"A rickroll link is any URL that secretly redirects to Rick Astley's ‘Never Gonna Give You Up’ music video, used as a harmless internet prank."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Dev team in San Francisco, CA", "how": "Drops rickrolls in the office Slack on April 1st."}, {"who": "Streamer in LA, CA", "how": "Disguises ‘bonus content’ links during live streams."}, {"who": "Friend group anywhere in the USA", "how": "Shares it in group texts for a laugh."}, {"who": "Office prankster in NYC", "how": "Sends a ‘meeting agenda’ link to coworkers."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}, {"to": "/youtube-link-generator", "anchor": "YouTube Link Generator", "blurb": "related link generator."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
