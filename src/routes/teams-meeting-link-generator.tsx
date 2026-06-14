import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/teams-meeting-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Can I create a Teams link without Microsoft 365?", "a": "No — Teams meeting URLs are issued by your tenant when scheduling."}, {"q": "Do guests need a Teams account?", "a": "No — guests can join via browser without an account."}, {"q": "Is the link single-use?", "a": "No — Teams join links are reusable for the meeting series."}, {"q": "Can I customize the URL?", "a": "No — Microsoft assigns the meetup-join path."}, {"q": "How do I revoke access?", "a": "Cancel the meeting in Outlook or Teams."}];
const STEPS = ["Schedule a Teams meeting from Outlook or Teams.", "Copy the generated join URL.", "Paste it above to validate it.", "Share via email, calendar or chat."];
const TITLE = "Microsoft Teams Meeting Link Generator — Free Online Tool";
const DESC = "Paste a Microsoft Teams meeting URL to verify and copy a clean join link. Teams join URLs are issued by Microsoft 365 when scheduling.";

export const Route = createFileRoute("/teams-meeting-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/teams-meeting-link-generator",
    name: "Microsoft Teams Meeting Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Microsoft Teams Meeting Link Generator", item: "/teams-meeting-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Microsoft Teams Meeting Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Microsoft Teams Meeting Link Generator" }]} />
      <ToolHero h1={"Microsoft Teams Meeting Link Helper"} intro={"Paste a Microsoft Teams meeting URL to verify and copy a clean join link. Teams join URLs are issued by Microsoft 365 when scheduling."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "Teams meeting join URL", "type": "url", "placeholder": "https://teams.microsoft.com/l/meetup-join/..."}]}
        build={(v) => { const u=(v.u||'').trim(); return u.startsWith('https://teams.microsoft.com/')?u:''; }}
        
      />

      <HowToUse heading={"How to use the microsoft teams meeting link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I share a Microsoft Teams meeting link?"}
        answer={"Schedule the meeting in Outlook or Teams; Microsoft 365 generates a `https://teams.microsoft.com/l/meetup-join/…` URL. Paste it above to verify and share."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Enterprise team in Boston, MA", "how": "Standardizes the meeting link copied into project status decks."}, {"who": "HR in Chicago, IL", "how": "Sends interview Teams links in calendar invites."}, {"who": "Consultant in San Francisco, CA", "how": "Drops Teams links in client engagement emails."}, {"who": "Hybrid team in Austin, TX", "how": "Pins Teams links in channel descriptions."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/zoom-meeting-link-generator", "anchor": "Zoom Meeting Link Generator", "blurb": "related link generator."}, {"to": "/google-meet-link-generator", "anchor": "Google Meet Link Generator", "blurb": "related link generator."}, {"to": "/add-to-calendar-link-generator", "anchor": "Add to Calendar Link Generator", "blurb": "related link generator."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
