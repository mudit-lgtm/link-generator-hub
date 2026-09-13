import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/google-meet-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Do attendees need a Google account?", "a": "For Workspace meetings, often yes; consumer meetings allow guests with the link."}, {"q": "Where do I get the meeting code?", "a": "Schedule a Meet in Google Calendar or Workspace; the code shows in the invite."}, {"q": "Can I dial in by phone?", "a": "Workspace Meet generates a phone number; consumer Meet does not."}, {"q": "Does meet.google.com/new work for everyone?", "a": "It opens an instant meeting for signed-in Google users."}, {"q": "Can I lock the meeting?", "a": "Hosts can use ‘Quick Access’ and ‘Host Controls’ to gate entry."}];
const STEPS = ["Enter the meeting code, or leave blank for an instant meeting.", "Copy the URL.", "Share in calendar invites, email or chat."];
const TITLE = "Google Meet Link Generator — Free Online Tool";
const DESC = "Format a meet.google.com join URL from a meeting code, or grab the ‘new meeting’ shortcut.";

export const Route = createFileRoute("/google-meet-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/google-meet-link-generator",
    name: "Google Meet Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Google Meet Link Generator", item: "/google-meet-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Google Meet Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Google Meet Link Generator" }]} />
      <ToolHero h1={"Google Meet Link Generator"} intro={"Format a meet.google.com join URL from a meeting code, or grab the ‘new meeting’ shortcut."} keywords={KW} />

      <ToolForm
        fields={[{"name": "code", "label": "Meet code (xxx-xxxx-xxx) or leave blank for new meeting", "type": "text", "placeholder": "abc-defg-hij"}]}
        build={(v) => { const c=(v.code||'').trim(); return c ? `https://meet.google.com/${c}` : 'https://meet.google.com/new'; }}
        
      />

      <HowToUse heading={"How to use the google meet link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I share a Google Meet link?"}
        answer={"Use `https://meet.google.com/<code>` for a specific meeting (codes look like `abc-defg-hij`) or `https://meet.google.com/new` to start an instant one."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Marketer in Austin, TX", "how": "Adds an instant-meeting link to the email signature."}, {"who": "Teacher in Chicago, IL", "how": "Posts class Meet codes in Google Classroom."}, {"who": "Therapist in Brooklyn, NY", "how": "Sends tele-health links via SMS reminders."}, {"who": "Designer in San Francisco, CA", "how": "Drops a Meet link into Figma comments for live review."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/zoom-meeting-link-generator", "anchor": "Zoom Meeting Link Generator", "blurb": "Build shareable Zoom meeting join links."}, {"to": "/teams-meeting-link-generator", "anchor": "Microsoft Teams Meeting Link Generator", "blurb": "Microsoft Teams meeting & join URL builder."}, {"to": "/add-to-calendar-link-generator", "anchor": "Add to Calendar Link Generator", "blurb": "Google, Outlook, Yahoo & .ics add-to-calendar links."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "HTML mailto link with subject, body, CC and BCC."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
