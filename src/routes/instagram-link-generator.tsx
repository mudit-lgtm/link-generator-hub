import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/instagram-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Will ig.me open the app?", "a": "Yes — mobile devices with Instagram installed open the app; otherwise they fall back to the web."}, {"q": "Do I need a Business account for DM links?", "a": "No — ig.me works for any public account."}, {"q": "Can I link to a story?", "a": "Stories are ephemeral — you can link to a Highlight or use the share-sheet from the app."}, {"q": "Will the profile link work for private accounts?", "a": "It opens the profile; viewers still need to follow to see posts."}, {"q": "Can I track clicks?", "a": "Wrap the link in a short-link or UTM redirect."}];
const STEPS = ["Pick the type of link (profile, DM, or Reel).", "Enter the username or Reel ID.", "Copy the URL.", "Add it to your bio, website or email."];
const TITLE = "Instagram Link Generator — Free Online Tool";
const DESC = "Build deep links to an Instagram profile, direct message thread, or story-share intent.";

export const Route = createFileRoute("/instagram-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/instagram-link-generator",
    name: "Instagram Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Instagram Link Generator", item: "/instagram-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Instagram Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Instagram Link Generator" }]} />
      <ToolHero h1={"Instagram Profile, DM & Story-Share Link Generator"} intro={"Build deep links to an Instagram profile, direct message thread, or story-share intent."} keywords={KW} />

      <ToolForm
        fields={[{"name": "kind", "label": "Link type", "type": "select", "options": [{"value": "profile", "label": "Profile"}, {"value": "dm", "label": "Direct message"}, {"value": "reel", "label": "Reel by ID"}]}, {"name": "handle", "label": "Username or ID", "type": "text", "placeholder": "username (without @)"}]}
        build={(v) => { if(!v.handle) return ''; const h=String(v.handle).trim().replace(/^@/,''); if(v.kind==='dm') return `https://ig.me/m/${h}`; if(v.kind==='reel') return `https://www.instagram.com/reel/${h}/`; return `https://www.instagram.com/${h}/`; }}
        
      />

      <HowToUse heading={"How to use the instagram link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I link to an Instagram DM?"}
        answer={"Use `https://ig.me/m/<username>` — Instagram's official short-domain that opens directly into a new DM thread on mobile and the web."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Boutique in NYC", "how": "Adds a DM link to the website footer for customer questions."}, {"who": "Influencer in LA, CA", "how": "Sends collab requests via ig.me/m links in email."}, {"who": "Realtor in Miami, FL", "how": "Embeds an Instagram profile QR on yard signs."}, {"who": "Coffee shop in Austin, TX", "how": "Cross-links the menu to their Reels."}]}
      />

      <WorkedExample intro={"A bio link that opens the app rather than a logged-out web page."} rows={[{"input": "Username acmestudio", "output": "https://instagram.com/acmestudio"}, {"input": "App deep link", "output": "instagram://user?username=acmestudio"}, {"input": "Direct message", "output": "https://ig.me/m/acmestudio \u2014 opens a DM thread"}]} note={"ig.me/m/ is the DM equivalent of wa.me and is the quickest route from an ad to a conversation."} />

      <Pitfalls items={[{"problem": "Using the app scheme on desktop", "fix": "instagram:// does nothing in a desktop browser. Use the https link unless you detect mobile."}, {"problem": "Expecting clickable links in captions", "fix": "Only the bio and story links are tappable. Captions show the URL as plain text."}, {"problem": "Changing your handle", "fix": "Every printed link breaks instantly and the old handle can be claimed by someone else."}, {"problem": "Sending cold traffic to a profile", "fix": "Point campaigns at a specific post or DM link; a profile grid gives no next step."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/facebook-share-link-generator", "anchor": "Facebook Share Link Generator", "blurb": "Facebook share dialog URLs for any page."}, {"to": "/telegram-link-generator", "anchor": "Telegram Link Generator", "blurb": "t.me channel, group & bot invite URLs."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
