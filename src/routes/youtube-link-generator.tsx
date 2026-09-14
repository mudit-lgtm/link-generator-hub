import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/youtube-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Where do I find my channel ID?", "a": "YouTube → Settings → Advanced. It starts with `UC`."}, {"q": "Does autoplay work on mobile?", "a": "Mobile browsers usually require a user gesture; autoplay may be blocked."}, {"q": "How do I link to a specific moment?", "a": "Use the `t=` param in seconds (e.g. `t=90s`) for the watch page, or `start=` on embed URLs."}, {"q": "Will the subscribe modal appear for everyone?", "a": "Only for users signed in to YouTube. Others see the channel page."}, {"q": "Can I shorten youtu.be links further?", "a": "Yes — pass the URL into the short-link generator."}];
const STEPS = ["Paste a video URL or 11-char video ID (or a channel ID for subscribe links).", "Optionally set a start time or enable autoplay.", "Copy the URL.", "Share in descriptions, emails, embeds or QR codes."];
const TITLE = "YouTube Link Generator — Free Online Tool";
const DESC = "Build YouTube URLs with auto-subscribe, timestamps and autoplay parameters from a video URL or ID.";

export const Route = createFileRoute("/youtube-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/youtube-link-generator",
    name: "YouTube Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "YouTube Link Generator", item: "/youtube-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the YouTube Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "YouTube Link Generator" }]} />
      <ToolHero h1={"YouTube Link Generator (Subscribe, Timestamp, Autoplay)"} intro={"Build YouTube URLs with auto-subscribe, timestamps and autoplay parameters from a video URL or ID."} keywords={KW} />

      <ToolForm
        fields={[{"name": "id", "label": "YouTube video URL or ID", "type": "text", "placeholder": "dQw4w9WgXcQ or https://youtu.be/dQw4w9WgXcQ"}, {"name": "ts", "label": "Start at (seconds)", "type": "number", "placeholder": "60"}, {"name": "sub", "label": "Channel ID for auto-subscribe (optional)", "type": "text", "placeholder": "UCxxxx"}, {"name": "auto", "label": "Autoplay", "type": "checkbox"}]}
        build={(v) => { const m=(v.id||'').match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/) || (String(v.id||'').length===11?[null,v.id]:null); if(!m && !v.sub) return ''; if(v.sub) return `https://www.youtube.com/channel/${v.sub}?sub_confirmation=1`; const id=m[1]; const p=new URLSearchParams(); if(v.ts) p.set('t',String(v.ts)+'s'); if(v.auto) p.set('autoplay','1'); const q=p.toString(); return `https://www.youtube.com/watch?v=${id}${q?'&'+q:''}`; }}
        
      />

      <HowToUse heading={"How to use the youtube link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a YouTube auto-subscribe link?"}
        answer={"Append `?sub_confirmation=1` to your channel URL: `https://www.youtube.com/channel/CHANNEL_ID?sub_confirmation=1`. The subscribe modal opens automatically when a logged-in viewer clicks."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "YouTuber in LA, CA", "how": "Adds a one-click subscribe link to every video description."}, {"who": "Course creator in Austin, TX", "how": "Sends students timestamped lesson links."}, {"who": "Podcast clip editor in Brooklyn, NY", "how": "Shares specific moments via timestamped URLs."}, {"who": "Marketing team in San Francisco, CA", "how": "Embeds autoplay video URLs on landing pages."}]}
      />

      <WorkedExample intro={"One video, linked three ways: at a timestamp, as an embed, and with a subscribe prompt."} rows={[{"input": "Video ID + start 1:30", "output": "https://youtu.be/VIDEOID?t=90"}, {"input": "Embed form", "output": "https://www.youtube.com/embed/VIDEOID?start=90"}, {"input": "Subscribe prompt", "output": "https://www.youtube.com/@channel?sub_confirmation=1"}]} note={"The t= parameter takes seconds in a youtu.be link but the embed path wants start=; mixing them is why timestamps often fail."} />

      <Pitfalls items={[{"problem": "Using watch?v= in an iframe", "fix": "It refuses to frame. Only /embed/ works as an embed source."}, {"problem": "Timestamps written as 1:30", "fix": "The parameter takes seconds (90), or the 1m30s form. A colon is ignored."}, {"problem": "Copying a link with a playlist id", "fix": "Viewers get pulled into a whole playlist instead of the one video you meant."}, {"problem": "Autoplay embeds", "fix": "Blocked unless muted, and it hurts page performance scores either way."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/video-link-generator", "anchor": "Video Link Generator", "blurb": "Direct MP4 / video share URL builder."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "Build Google Analytics UTM campaign tracking links."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
