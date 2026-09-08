import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { ShareAndGuestbook } from "@/components/backlink-block";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/add-to-calendar-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "What format does Google want for dates?", "a": "UTC basic ISO: `YYYYMMDDTHHmmssZ` — e.g. `20260615T140000Z`."}, {"q": "Will this work on iPhone?", "a": "Yes — Safari opens the Google Calendar web flow; iCloud users can import a .ics file instead."}, {"q": "Can I include a Zoom link?", "a": "Yes — paste the meeting URL into the description field."}, {"q": "Does it support recurring events?", "a": "Add `&recur=RRULE:FREQ=WEEKLY;BYDAY=MO` for weekly Monday events."}, {"q": "How do I make an Outlook link?", "a": "Use `https://outlook.live.com/calendar/0/deeplink/compose` with `subject`, `startdt`, `enddt` params."}];
const STEPS = ["Enter the event title, start and end times in UTC.", "Optionally add a location and description.", "Copy the Google Calendar URL.", "Share it via email, on a landing page, or as a QR code."];
const TITLE = "Add to Calendar Link Generator — Free Online Tool";
const DESC = "Generate a Google Calendar add-event URL from a title, time, location and details. Works in any browser.";

export const Route = createFileRoute("/add-to-calendar-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/add-to-calendar-link-generator",
    name: "Add to Calendar Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Add to Calendar Link Generator", item: "/add-to-calendar-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Add to Calendar Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Add to Calendar Link Generator" }]} />
      <ToolHero h1={"Add to Calendar Link Generator (Google, Outlook, Yahoo, .ics)"} intro={"Generate a Google Calendar add-event URL from a title, time, location and details. Works in any browser."} keywords={KW} />

      <ToolForm
        fields={[{"name": "t", "label": "Event title", "type": "text"}, {"name": "start", "label": "Start (UTC, YYYYMMDDTHHmmssZ)", "type": "text", "placeholder": "20260615T140000Z"}, {"name": "end", "label": "End (UTC)", "type": "text", "placeholder": "20260615T150000Z"}, {"name": "loc", "label": "Location", "type": "text"}, {"name": "det", "label": "Description", "type": "textarea"}]}
        build={(v) => { if(!v.t||!v.start||!v.end) return ''; const p=new URLSearchParams({action:'TEMPLATE',text:v.t,dates:`${v.start}/${v.end}`}); if(v.loc)p.set('location',v.loc); if(v.det)p.set('details',v.det); return `https://calendar.google.com/calendar/render?${p.toString().replace(/\+/g,'%20')}`; }}
        
      />

      <HowToUse heading={"How to use the add to calendar link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I build an ‘Add to Google Calendar’ link?"}
        answer={"Use `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Title&dates=YYYYMMDDTHHmmssZ/YYYYMMDDTHHmmssZ&location=Place&details=Info`. Times must be in UTC basic ISO format."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Event organizer in Las Vegas, NV", "how": "Embeds the link in confirmation emails so attendees one-click RSVP."}, {"who": "Yoga studio in Austin, TX", "how": "Adds class schedule buttons to the website."}, {"who": "Webinar host in San Francisco, CA", "how": "Drops the link in the registration thank-you page."}, {"who": "Sports club in Boston, MA", "how": "Lets parents add practice schedules with one tap."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/google-meet-link-generator", "anchor": "Google Meet Link Generator", "blurb": "related link generator."}, {"to": "/zoom-meeting-link-generator", "anchor": "Zoom Meeting Link Generator", "blurb": "related link generator."}, {"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}]}
      />

      <ShareAndGuestbook path="/add-to-calendar-link-generator" title={TITLE} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
