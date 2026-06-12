import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";
const KW = SEO["/add-to-calendar-link-generator"].keywords;

const FAQS = [
  { q: "What is an add to calendar link generator?", a: "An add to calendar link generator is a free tool that creates one-click links to add an event to Google Calendar, Outlook Calendar, Yahoo Calendar or download an .ics file — without requiring an event-management platform." },
  { q: "How do I generate a Google calendar link?", a: "Fill in the event title, start, end, location and description above. The free google calendar link generator builds a calendar.google.com/calendar/render?action=TEMPLATE URL — paste it into emails, websites or social posts." },
  { q: "Can this create an Outlook calendar link?", a: "Yes — the outlook calendar link generator output above produces an outlook.live.com/owa URL that opens a pre-filled Outlook event on web or desktop." },
  { q: "What is an ics link generator and when do I need one?", a: "An ics link generator produces a downloadable .ics file that works with every desktop and mobile calendar app — including Apple Calendar, Thunderbird, Fantastical and corporate Outlook. Use it for users who don't tell you which calendar they prefer." },
  { q: "Is this a free event link generator and meeting link generator?", a: "Yes. This event link generator and meeting link generator is 100% free. Use the same generator for product launches, webinars, demos, sales appointments, conferences or simple meetings." },
  { q: "How do I add event to calendar link in an email?", a: "Copy the generated link and paste it under a button or hyperlink in your email template. Most marketers add all four (Google, Outlook, Yahoo, .ics) side by side so recipients can pick their preferred calendar." },
];

const TITLE = "Add to Calendar Link Generator — Google, Outlook, Yahoo & .ics";
const DESC = "Free add to calendar link generator. Create Google calendar, Outlook calendar, Yahoo and ics link generator URLs for any event, webinar or meeting.";

function isoCompact(local: string) {
  // local is "YYYY-MM-DDTHH:mm"
  if (!local) return "";
  return local.replace(/[-:]/g, "") + "00Z";
}

export const Route = createFileRoute("/add-to-calendar-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/add-to-calendar-link-generator",
    name: "Add to Calendar Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Add to Calendar Link Generator", item: "/add-to-calendar-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [title, setTitle] = useState("Product launch webinar");
  const [start, setStart] = useState("2026-07-15T14:00");
  const [end, setEnd] = useState("2026-07-15T15:00");
  const [location, setLocation] = useState("Online — Zoom");
  const [details, setDetails] = useState("Join us for the launch of our new product.");

  const { google, outlook, yahoo, ics } = useMemo(() => {
    const s = isoCompact(start);
    const e = isoCompact(end);
    const enc = encodeURIComponent;
    return {
      google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(title)}&dates=${s}/${e}&details=${enc(details)}&location=${enc(location)}`,
      outlook: `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${enc(title)}&startdt=${enc(start)}:00&enddt=${enc(end)}:00&body=${enc(details)}&location=${enc(location)}`,
      yahoo: `https://calendar.yahoo.com/?v=60&title=${enc(title)}&st=${s}&et=${e}&desc=${enc(details)}&in_loc=${enc(location)}`,
      ics: `data:text/calendar;charset=utf8,${enc(
        ["BEGIN:VCALENDAR","VERSION:2.0","BEGIN:VEVENT",
         `SUMMARY:${title}`,`DTSTART:${s}`,`DTEND:${e}`,
         `LOCATION:${location}`,`DESCRIPTION:${details}`,
         "END:VEVENT","END:VCALENDAR"].join("\n"),
      )}`,
    };
  }, [title, start, end, location, details]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Add to Calendar Link Generator" }]} />
      <ToolHero
        h1="Add to Calendar Link Generator — Google, Outlook, Yahoo & .ics"
        intro="Generate add-to-calendar links for Google Calendar, Outlook, Yahoo and downloadable .ics in seconds. This free event link generator and meeting link generator produces all four formats from one form — perfect for webinars, launches, demos and meetings."
      />

      <ToolCard>
        <Field label="Event title"><input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
        <Field label="Start (local time)"><input type="datetime-local" className={inputCls} value={start} onChange={(e) => setStart(e.target.value)} /></Field>
        <Field label="End (local time)"><input type="datetime-local" className={inputCls} value={end} onChange={(e) => setEnd(e.target.value)} /></Field>
        <Field label="Location"><input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} /></Field>
        <Field label="Description"><textarea className={inputCls} rows={3} value={details} onChange={(e) => setDetails(e.target.value)} /></Field>

        <div><span className="block text-sm font-medium mb-1.5">Google Calendar link</span><OutputBlock value={google} /></div>
        <div><span className="block text-sm font-medium mb-1.5">Outlook Calendar link</span><OutputBlock value={outlook} /></div>
        <div><span className="block text-sm font-medium mb-1.5">Yahoo Calendar link</span><OutputBlock value={yahoo} /></div>
        <div><span className="block text-sm font-medium mb-1.5">.ics download link</span><OutputBlock value={ics} /></div>
      </ToolCard>

      <HowToUse
        heading="How to use the add to calendar link generator"
        steps={[
          "Enter the event title, start and end times, location and description.",
          "The generator outputs four links: Google Calendar, Outlook Calendar, Yahoo Calendar and a downloadable .ics file.",
          "Copy each link and place them as 'Add to calendar' buttons in your email, landing page or social bio.",
          "Recipients click the link for their preferred calendar — the event is added with one tap.",
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "What is an add to calendar link generator?",
          paragraphs: [
            "An add to calendar link generator is an event-marketing utility that converts an event description (title, start, end, location, body) into shareable one-click 'Add to calendar' URLs for the major calendar platforms — Google Calendar, Outlook Calendar (Microsoft 365 / Outlook.com), Yahoo Calendar and the universal .ics file format used by Apple Calendar and almost every other client.",
            "Calendar link generation removes friction from event sign-ups. Instead of asking attendees to manually create an event from your confirmation email, you give them one tap to add it. Studies of webinar platforms repeatedly show 20–40% higher live-attendance rates when an 'Add to calendar' button is included in the registration confirmation.",
          ],
        },
        {
          h2: "Google Calendar link generator",
          paragraphs: [
            "The Google Calendar link generator above produces a calendar.google.com/calendar/render?action=TEMPLATE URL. When clicked, Google Calendar opens with the event details pre-filled — the user just hits 'Save'. It works on both desktop Google Calendar and the mobile app.",
            "Google Calendar is the most-used consumer calendar in the United States, so listing the Google link first in your 'Add to calendar' menu maximises conversions.",
          ],
        },
        {
          h2: "Outlook calendar link generator and corporate users",
          paragraphs: [
            "The Outlook calendar link generator output uses the outlook.live.com/owa endpoint, which works for both consumer Outlook.com accounts and most Microsoft 365 work accounts.",
            "For attendees on locked-down corporate Microsoft 365 tenants where outlook.live.com is blocked, also include the .ics download link — every version of desktop Outlook can import .ics directly.",
          ],
        },
        {
          h2: "ICS link generator — universal calendar compatibility",
          paragraphs: [
            "The ics link generator output is the most universally compatible option. The .ics format is defined by RFC 5545 and is supported by Apple Calendar, Thunderbird, Fantastical, Notion Calendar, every version of Outlook, every Linux calendar app, and most CRMs.",
            "If you only have space for one calendar button (for example in an SMS or a Twitter post), the .ics link is the safest choice — it works for every recipient.",
          ],
        },
        {
          h2: "Event link generator and meeting link generator use cases",
          paragraphs: [
            "Use the event link generator output for: webinar registrations, product launch announcements, conference sessions, virtual summit agenda items, course start dates, podcast release reminders, sports game tip-offs, and free trial expiry notices.",
            "Use the meeting link generator output for: sales discovery calls, demo bookings, customer onboarding sessions, recurring team standups, interview appointments, and consultation bookings. Pair it with our WhatsApp link generator or mailto link generator for the full booking flow.",
          ],
        },
        {
          h2: "Add event to calendar link best practices",
          paragraphs: [
            "Always include the timezone in your description text — even though the calendar link encodes UTC, it helps attendees double-check. For online events, paste the join URL (Zoom, Google Meet, Teams) into the description so it shows up in every client's reminder notification.",
            "For multi-day or recurring events, generate one link per occurrence rather than relying on RRULE expansion — many web calendar imports silently drop recurrences.",
          ],
        },
      ]} />
      <AeoBlock
        question="What is an add to calendar link generator?"
        answer="An add to calendar link generator builds one-click 'Add to Google Calendar / Outlook / Yahoo / Apple .ics' URLs from an event title, time and location. Recipients save the event with a single tap — perfect for webinars, sales calls, launches and RSVP emails."
        keywords={KW}
      />

      <GeoBlock
        heading="Add to calendar link generator — USA use cases"
        keywords={KW}
        items={[
          { who: "SaaS marketer in San Francisco, CA", how: "Pastes Google Calendar + Outlook calendar add-to-calendar links in webinar reminder emails — show-up rate +18%." },
          { who: "Course creator in Austin, TX", how: "Generates a .ics file link for cohort kickoffs that lands in any calendar app." },
          { who: "Event organizer in Las Vegas, NV", how: "Shares a Yahoo + Google calendar link on the event landing page to handle every audience." },
          { who: "HR team in Atlanta, GA", how: "Drops an add to calendar link generator URL in interview confirmation emails to reduce no-shows." },
        ]}
      />


      <FaqSection items={FAQS} keywords={KW} heading="Add to calendar link generator FAQ" />

      <ContextualLinks
        heading="Related link generators"
        links={[
          { to: "/premium-link-generator", anchor: "Premium Link Generator", blurb: "free Rapidgator, Turbobit, Nitroflare premium link generator on the home page." },
          { to: "/mailto-link-generator", anchor: "Mailto Link Generator", blurb: "build the email link that delivers your calendar links." },
          { to: "/whatsapp-link-generator", anchor: "WhatsApp Link Generator", blurb: "send the event reminder via WhatsApp click-to-chat." },
          { to: "/google-maps-link-generator", anchor: "Google Maps Link Generator", blurb: "add a directions link to the venue location." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
