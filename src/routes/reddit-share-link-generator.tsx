import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/reddit-share-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does the user have to be signed in?", "a": "Yes — Reddit prompts login before submission."}, {"q": "Can I prefill the post body?", "a": "Use `text=` for self-posts (omit `url=`)."}, {"q": "How do I pre-pick a subreddit?", "a": "Replace `/submit` with `/r/<sub>/submit`."}, {"q": "Will the user be able to edit before posting?", "a": "Yes — the composer opens with values pre-filled."}, {"q": "Can I link to old.reddit?", "a": "Yes — swap the host to `old.reddit.com`."}];
const STEPS = ["Paste the URL and a title.", "Optionally specify a subreddit.", "Copy the submit URL.", "Add it to Share buttons."];
const TITLE = "Reddit Share Link Generator — Free Online Tool";
const DESC = "Build a `reddit.com/submit` URL pre-filled with a title and link, ready to post to any subreddit.";

export const Route = createFileRoute("/reddit-share-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/reddit-share-link-generator",
    name: "Reddit Share Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Reddit Share Link Generator", item: "/reddit-share-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Reddit Share Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Reddit Share Link Generator" }]} />
      <ToolHero h1={"Reddit Submit & Share Link Generator"} intro={"Build a `reddit.com/submit` URL pre-filled with a title and link, ready to post to any subreddit."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "URL to share", "type": "url", "placeholder": "https://example.com/article"}, {"name": "title", "label": "Post title", "type": "text", "placeholder": "My new article"}, {"name": "sub", "label": "Subreddit (optional)", "type": "text", "placeholder": "webdev"}]}
        build={(v) => { if(!v.u && !v.title) return ''; const base=v.sub ? `https://www.reddit.com/r/${String(v.sub).replace(/^r\//,'')}/submit` : 'https://www.reddit.com/submit'; const q=new URLSearchParams(); if(v.u) q.set('url',v.u); if(v.title) q.set('title',v.title); return `${base}?${q.toString()}`; }}
        
      />

      <HowToUse heading={"How to use the reddit share link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a Reddit submit link?"}
        answer={"Use `https://www.reddit.com/submit?url=...&title=...` (or `/r/<sub>/submit?...` to pre-select a subreddit)."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Indie maker in Seattle, WA", "how": "Posts launches to /r/SideProject with one click."}, {"who": "Game studio in Austin, TX", "how": "Lets fans cross-post patch notes."}, {"who": "Researcher in Boston, MA", "how": "Promotes papers to /r/science."}, {"who": "News site in NYC", "how": "Adds Share-on-Reddit buttons."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/facebook-share-link-generator", "anchor": "Facebook Share Link Generator", "blurb": "related link generator."}, {"to": "/twitter-share-link-generator", "anchor": "Twitter Share Link Generator", "blurb": "related link generator."}, {"to": "/linkedin-link-generator", "anchor": "LinkedIn Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
