import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
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

      <WorkedExample intro={"A harmless office prank link, disguised as a document share."} rows={[{"input": "No options", "output": "A short link that lands on the famous 1987 video"}, {"input": "Custom alias \"q3-budget\"", "output": "A link that reads like a spreadsheet share"}, {"input": "Autoplay start", "output": "\u2026?autoplay=1&t=43 \u2014 opens straight at the chorus"}]} note={"Keep it to friends and group chats. The same trick in a work email or a customer message stops being funny fast."} />

      <Pitfalls items={[{"problem": "Using it in marketing", "fix": "Bait-and-switch links raise complaint rates and can get a sending domain blocked."}, {"problem": "Sending it to a client", "fix": "Never disguise a prank as a business document. It reads as a phishing test gone wrong."}, {"problem": "Autoplay in a quiet office", "fix": "Funny once, then it is your colleague's speakers at full volume in a meeting."}, {"problem": "Posting it in a support channel", "fix": "Many platforms treat deceptive links as spam and will remove the account, not just the post."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}, {"to": "/youtube-link-generator", "anchor": "YouTube Link Generator", "blurb": "Subscribe, auto-subscribe & timestamped YouTube links."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "HTML mailto link with subject, body, CC and BCC."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
