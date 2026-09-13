import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/html-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does it support Markdown?", "a": "Yes — choose Markdown and you get `[text](url)` output."}, {"q": "When should I use nofollow?", "a": "On paid, sponsored or user-generated links so search engines don't pass ranking credit."}, {"q": "Why add rel=noopener?", "a": "It stops the new tab from accessing your page via window.opener."}, {"q": "Can I use it for emails?", "a": "Yes — HTML output pastes into most email builders."}, {"q": "Is the code SEO friendly?", "a": "Yes, real anchor tags with descriptive text are exactly what crawlers read."}];
const STEPS = ["Paste the destination URL.", "Write the anchor text people will click.", "Pick HTML, Markdown or BBCode.", "Copy the code into your page, README or forum post."];
const TITLE = "HTML Link Generator — Free Online Tool";
const DESC = "Turn any URL into ready-to-paste clickable link code in HTML, Markdown, BBCode or plain text, with optional new-tab and nofollow attributes.";

export const Route = createFileRoute("/html-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/html-link-generator",
    name: "HTML Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "HTML Link Generator", item: "/html-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use the ${"HTML Link Generator"}`,
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "HTML Link Generator" }]} />
      <ToolHero h1={"HTML, Markdown & BBCode Link Generator"} intro={DESC} keywords={KW} />

      <ToolForm
        fields={[{"name": "url", "label": "Destination URL", "type": "url", "placeholder": "https://example.com/page"}, {"name": "text", "label": "Anchor text", "type": "text", "placeholder": "Visit our pricing page"}, {"name": "format", "label": "Output format", "type": "select", "default": "html", "options": [{"value": "html", "label": "HTML <a>"}, {"value": "markdown", "label": "Markdown"}, {"value": "bbcode", "label": "BBCode"}, {"value": "plain", "label": "Plain text"}]}, {"name": "blank", "label": "Open in a new tab", "type": "checkbox", "default": true}, {"name": "nofollow", "label": "Add rel=\"nofollow\"", "type": "checkbox"}]}
        build={(v) => { if(!v.url) return ''; const t=String(v.text||v.url); const u=String(v.url); if(v.format==='markdown') return `[${t}](${u})`; if(v.format==='bbcode') return `[url=${u}]${t}[/url]`; if(v.format==='plain') return `${t} — ${u}`; const rel=[v.blank?'noopener':'', v.nofollow?'nofollow':''].filter(Boolean).join(' '); return `<a href="${u}"${v.blank?' target="_blank"':''}${rel?` rel="${rel}"`:''}>${t}</a>`; }}
      />

      <HowToUse heading={"How to use the html link generator"} steps={STEPS} />

      <AeoBlock question={"How do I make a clickable link in HTML?"} answer={"Wrap the anchor text in an `<a href=\"URL\">` tag. Add `target=\"_blank\" rel=\"noopener\"` to open a new tab safely, and `rel=\"nofollow\"` for paid or untrusted links."} keywords={KW} />

      <GeoBlock heading={"USA use cases"} keywords={KW} items={[{"who": "Blogger in Austin, TX", "how": "Pastes Markdown links into posts."}, {"who": "Forum mod in Chicago, IL", "how": "Shares BBCode links."}, {"who": "Agency in Miami, FL", "how": "Marks sponsored links nofollow."}, {"who": "Developer in Seattle, WA", "how": "Adds README links fast."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks heading="Related link generators" links={[{"to": "/anchor-link-generator", "anchor": "Anchor Link Generator", "blurb": "Jump links and #section anchors for long pages."}, {"to": "/iframe-embed-link-generator", "anchor": "Iframe Embed Link Generator", "blurb": "Responsive iframe embed code for any URL."}, {"to": "/slug-generator", "anchor": "Slug Generator", "blurb": "Clean WordPress-friendly permalinks & SEO URL slugs."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}]} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
