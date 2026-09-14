import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
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

      <WorkedExample intro={"A Teams join link shared with people outside the organisation."} rows={[{"input": "Meeting URL from the calendar", "output": "https://teams.microsoft.com/l/meetup-join/\u2026"}, {"input": "Chat with one person", "output": "https://teams.microsoft.com/l/chat/0/0?users=dana@example.com"}, {"input": "External guest", "output": "Same link \u2014 they join through the browser without a Teams account"}]} note={"Teams join links are long and contain a context token; shortening them for print is fine, but never edit the query string by hand."} />

      <Pitfalls items={[{"problem": "Trimming the join URL", "fix": "Removing the context parameter makes the link unusable. Copy it whole."}, {"problem": "Lobby settings left strict", "fix": "External guests wait indefinitely if no one admits them. Set who can bypass the lobby before the call."}, {"problem": "Assuming guests can share screen", "fix": "Browser guests have limited controls; ask them to install the app if they are presenting."}, {"problem": "Reusing a link from a deleted event", "fix": "Deleting the calendar item invalidates the meeting; the link then errors for everyone."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/zoom-meeting-link-generator", "anchor": "Zoom Meeting Link Generator", "blurb": "Build shareable Zoom meeting join links."}, {"to": "/google-meet-link-generator", "anchor": "Google Meet Link Generator", "blurb": "Generate meet.google.com instant meeting links."}, {"to": "/add-to-calendar-link-generator", "anchor": "Add to Calendar Link Generator", "blurb": "Google, Outlook, Yahoo & .ics add-to-calendar links."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "HTML mailto link with subject, body, CC and BCC."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
