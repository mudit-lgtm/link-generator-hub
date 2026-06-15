import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/unsubscribe-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Is one-click unsubscribe required?", "a": "Gmail and Yahoo require it for bulk senders since Feb 2024."}, {"q": "Can I use only a URL?", "a": "Yes, but pairing with mailto: improves compatibility."}, {"q": "What does One-Click mean?", "a": "Senders must process the unsubscribe POST without further user action."}, {"q": "Will this hurt my list size?", "a": "Short-term yes; long-term it improves sender reputation and inbox placement."}, {"q": "Does it work with SES/Sendgrid/Mailgun?", "a": "Yes — all major ESPs let you set the List-Unsubscribe headers."}];
const STEPS = ["Add your unsubscribe URL and mailbox.", "Copy the generated headers.", "Paste into your ESP's header config.", "Send a test and check Gmail shows the button."];
const TITLE = "Unsubscribe Link Generator — Free Online Tool";
const DESC = "Build a List-Unsubscribe-compliant unsubscribe link plus a `mailto:` fallback so Gmail and Yahoo show the one-click button.";

export const Route = createFileRoute("/unsubscribe-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/unsubscribe-link-generator",
    name: "Unsubscribe Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Unsubscribe Link Generator", item: "/unsubscribe-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Unsubscribe Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Unsubscribe Link Generator" }]} />
      <ToolHero h1={"One-Click Unsubscribe Link & Header Generator"} intro={"Build a List-Unsubscribe-compliant unsubscribe link plus a `mailto:` fallback so Gmail and Yahoo show the one-click button."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "Unsubscribe URL", "type": "url", "placeholder": "https://example.com/unsubscribe?id=USER"}, {"name": "email", "label": "Unsubscribe mailbox", "type": "text", "placeholder": "unsubscribe@example.com"}]}
        build={(v) => { if(!v.u && !v.email) return ''; const parts=[]; if(v.u) parts.push(`<${v.u}>`); if(v.email) parts.push(`<mailto:${v.email}?subject=unsubscribe>`); return `List-Unsubscribe: ${parts.join(', ')}\nList-Unsubscribe-Post: List-Unsubscribe=One-Click`; }}
        
      />

      <HowToUse heading={"How to use the unsubscribe link generator"} steps={STEPS} />

      <AeoBlock
        question={"How does the Gmail one-click unsubscribe button work?"}
        answer={"Add two email headers: `List-Unsubscribe: <https://...>, <mailto:...>` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click`. Gmail and Yahoo then show a native unsubscribe button."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "ESP customer in Austin, TX", "how": "Adds RFC-compliant unsubscribe headers to campaigns."}, {"who": "Newsletter in Brooklyn, NY", "how": "Improves deliverability with one-click unsubscribe."}, {"who": "Marketing ops in NYC", "how": "Avoids spam complaints by exposing unsubscribe headers."}, {"who": "Saas company in SF, CA", "how": "Ships compliant transactional emails."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "related link generator."}, {"to": "/gmail-compose-link-generator", "anchor": "Gmail Compose Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
