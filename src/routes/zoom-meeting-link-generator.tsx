import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/zoom-meeting-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Why is the passcode in the URL?", "a": "Modern Zoom links bake the passcode in so attendees don't have to type it."}, {"q": "Is the join link safe to share publicly?", "a": "Anyone with the link can join — protect high-value meetings with a waiting room."}, {"q": "Does this work for recurring meetings?", "a": "Yes — recurring meetings reuse the same ID and URL."}, {"q": "Can I embed the link in a button?", "a": "Yes — wrap with `<a href=…>Join</a>` in HTML or use it in any rich-text editor."}, {"q": "How do I copy the link from Zoom?", "a": "Schedule the meeting and click ‘Copy Invitation’."}];
const STEPS = ["Enter the Zoom meeting ID (digits).", "Add the passcode if required.", "Copy the join URL.", "Send via email, calendar invite or chat."];
const TITLE = "Zoom Meeting Link Generator — Free Online Tool";
const DESC = "Build a Zoom join URL from a meeting ID and optional passcode. Send a single tap-to-join link.";

export const Route = createFileRoute("/zoom-meeting-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/zoom-meeting-link-generator",
    name: "Zoom Meeting Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Zoom Meeting Link Generator", item: "/zoom-meeting-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Zoom Meeting Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Zoom Meeting Link Generator" }]} />
      <ToolHero h1={"Zoom Meeting Link Generator"} intro={"Build a Zoom join URL from a meeting ID and optional passcode. Send a single tap-to-join link."} keywords={KW} />

      <ToolForm
        fields={[{"name": "id", "label": "Zoom meeting ID", "type": "text", "placeholder": "123 4567 8901"}, {"name": "pwd", "label": "Passcode (optional)", "type": "text"}]}
        build={(v) => { const id=(v.id||'').replace(/\D/g,''); if(!id) return ''; const p=v.pwd?'?pwd='+encodeURIComponent(v.pwd):''; return `https://zoom.us/j/${id}${p}`; }}
        
      />

      <HowToUse heading={"How to use the zoom meeting link generator"} steps={STEPS} />

      <AeoBlock
        question={"What's the format of a Zoom join link?"}
        answer={"`https://zoom.us/j/MEETING_ID?pwd=PASSCODE`. The meeting ID is digits only; the encoded passcode is optional but recommended for security."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Consultant in Boston, MA", "how": "Sends pre-built join links in calendar invites."}, {"who": "Yoga studio in Austin, TX", "how": "Distributes class Zoom links via email."}, {"who": "Teacher in Chicago, IL", "how": "Posts the meeting URL in the LMS each week."}, {"who": "Sales team in San Francisco, CA", "how": "Standardizes Zoom links across all booked demos."}]}
      />

      <WorkedExample intro={"A webinar join link that does not force every attendee to type a passcode."} rows={[{"input": "Meeting ID 123 4567 8901", "output": "https://zoom.us/j/12345678901"}, {"input": "With embedded passcode", "output": "\u2026/j/12345678901?pwd=<encrypted> \u2014 joins in one click"}, {"input": "Vanity domain", "output": "https://acme.zoom.us/j/\u2026 for paid accounts"}]} note={"The pwd parameter is the hashed passcode Zoom generates, not the numeric code you see in the invite; copy the whole link rather than building it."} />

      <Pitfalls items={[{"problem": "Retyping the pwd value", "fix": "It is not the passcode digits. Hand-built pwd values always fail."}, {"problem": "Posting a join link publicly", "fix": "Zoombombing is still common. Use registration or a waiting room for anything public."}, {"problem": "Personal Meeting ID for external calls", "fix": "Your PMI never changes, so anyone who ever had it can drop into a later meeting."}, {"problem": "No dial-in for phone attendees", "fix": "Include one number and the ID for people joining from a car or a weak connection."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/google-meet-link-generator", "anchor": "Google Meet Link Generator", "blurb": "Generate meet.google.com instant meeting links."}, {"to": "/teams-meeting-link-generator", "anchor": "Microsoft Teams Meeting Link Generator", "blurb": "Microsoft Teams meeting & join URL builder."}, {"to": "/add-to-calendar-link-generator", "anchor": "Add to Calendar Link Generator", "blurb": "Google, Outlook, Yahoo & .ics add-to-calendar links."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "HTML mailto link with subject, body, CC and BCC."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
