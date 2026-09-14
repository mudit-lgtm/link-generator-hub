import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/twitter-share-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does this work on x.com?", "a": "Yes — intent URLs work on both twitter.com and x.com."}, {"q": "Why no `via` parameter?", "a": "X removed the `via` attribution from intents in 2023."}, {"q": "Can I prefill an image?", "a": "No — intents don't accept image params. The image is taken from OG tags."}, {"q": "Will hashtags render?", "a": "Yes — comma-separated `hashtags=` are added without `#`."}, {"q": "Is this rate-limited?", "a": "No — intent URLs are static; no API call."}];
const STEPS = ["Type the tweet text.", "Optionally add a URL and hashtags.", "Copy the intent URL.", "Paste into Share-on-X buttons."];
const TITLE = "Twitter / X Share Link Generator — Free Online Tool";
const DESC = "Build a Twitter (X) intent URL that pre-fills tweet text, a shared URL and hashtags.";

export const Route = createFileRoute("/twitter-share-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/twitter-share-link-generator",
    name: "Twitter / X Share Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Twitter / X Share Link Generator", item: "/twitter-share-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Twitter / X Share Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Twitter / X Share Link Generator" }]} />
      <ToolHero h1={"Twitter / X Share Link Generator"} intro={"Build a Twitter (X) intent URL that pre-fills tweet text, a shared URL and hashtags."} keywords={KW} />

      <ToolForm
        fields={[{"name": "text", "label": "Tweet text", "type": "text", "placeholder": "Check this out"}, {"name": "u", "label": "URL to share (optional)", "type": "url", "placeholder": "https://example.com"}, {"name": "hashtags", "label": "Hashtags (comma-separated, optional)", "type": "text", "placeholder": "webdev,seo"}]}
        build={(v) => { const q=new URLSearchParams(); if(v.text) q.set('text',v.text); if(v.u) q.set('url',v.u); if(v.hashtags) q.set('hashtags',String(v.hashtags).replace(/[#\s]/g,'')); const s=q.toString(); return s ? `https://twitter.com/intent/tweet?${s}` : ''; }}
        
      />

      <HowToUse heading={"How to use the twitter / x share link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a Tweet intent link?"}
        answer={"Use `https://twitter.com/intent/tweet?text=...&url=...&hashtags=...`. The query params pre-fill the composer on both twitter.com and x.com."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Indie hacker in Austin, TX", "how": "Adds Share-on-X buttons to launch pages."}, {"who": "Author in Brooklyn, NY", "how": "Embeds tweet templates in blog posts."}, {"who": "Nonprofit in DC", "how": "Lets supporters tweet pre-written advocacy messages."}, {"who": "Conference in San Francisco, CA", "how": "Provides speaker-share tweet URLs."}]}
      />

      <WorkedExample intro={"A share button that opens the composer with the post title, link and one hashtag."} rows={[{"input": "Text + URL", "output": "https://twitter.com/intent/tweet?text=How%20we%20cut%20load%20time&url=https%3A%2F%2Fexample.com%2Fpost"}, {"input": "Plus a mention and hashtag", "output": "&via=acmestudio&hashtags=webperf"}, {"input": "x.com domain", "output": "Both twitter.com and x.com intent URLs still work"}]} note={"The URL counts as a fixed 23 characters regardless of its real length, so budget the text around that, not around the raw link."} />

      <Pitfalls items={[{"problem": "Putting the URL inside the text parameter", "fix": "It gets double-counted and encoded oddly. Use the separate url parameter."}, {"problem": "Three or more hashtags", "fix": "Engagement drops. One or two relevant tags outperform a list."}, {"problem": "hashtags with a # prefix", "fix": "The parameter takes bare words, comma separated. A # becomes %23 and breaks the tag."}, {"problem": "Relying on the preview card", "fix": "Cards only render if the destination has twitter:card tags and has been crawled."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/facebook-share-link-generator", "anchor": "Facebook Share Link Generator", "blurb": "Facebook share dialog URLs for any page."}, {"to": "/linkedin-link-generator", "anchor": "LinkedIn Link Generator", "blurb": "Profile, company & share LinkedIn URLs."}, {"to": "/reddit-share-link-generator", "anchor": "Reddit Share Link Generator", "blurb": "reddit.com/submit pre-fill links."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
