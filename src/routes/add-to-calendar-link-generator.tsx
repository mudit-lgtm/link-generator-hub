import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout, RelatedTools } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What is an add to calendar link generator?", a: "It creates one-click links that let anyone add an event to Google Calendar, Outlook, Yahoo, or download an .ics file — perfect for event pages, email invitations, and newsletters." },
  { q: "Does the Google Calendar link generator work on mobile?", a: "Yes. The link opens the Google Calendar app on Android and the web version on iOS / desktop with the event details prefilled." },
  { q: "What's an ICS link?", a: "An .ics file is the universal calendar event format. Apple Calendar, Outlook desktop, and most other apps can import it directly." },
  { q: "Can I add multiple attendees?", a: "Google Calendar links don't reliably support attendees; for invites with attendees, use the .ics download." },
  { q: "Is there a meeting link generator option?", a: "Yes — fill in a location like 'https://meet.google.com/abc-defg-hij' as the event location and it will be linked from each calendar." },
];

const TITLE = "Add to Calendar Link Generator — Google, Outlook, iCal";
const DESC = "Free add to calendar link generator. Create Google Calendar, Outlook, Yahoo, and ICS event links for your invites and pages.";

export const Route = createFileRoute("/add-to-calendar-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/add-to-calendar-link-generator",
    name: "Add to Calendar Link Generator", faqs: FAQS,
  }),
  component: Page,
});

function fmt(d: string) {
  return d.replace(/[-:]/g, "").replace(/\.\d{3}/, "") + "Z";
}

function Page() {
  const [title, setTitle] = useState("Team Standup");
  const [start, setStart] = useState("2026-06-10T10:00");
  const [end, setEnd] = useState("2026-06-10T10:30");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  const links = useMemo(() => {
    const s = fmt(new Date(start).toISOString());
    const e = fmt(new Date(end).toISOString());
    const enc = encodeURIComponent;
    return {
      google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(title)}&dates=${s}/${e}&details=${enc(details)}&location=${enc(location)}`,
      outlook: `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${enc(title)}&startdt=${enc(new Date(start).toISOString())}&enddt=${enc(new Date(end).toISOString())}&body=${enc(details)}&location=${enc(location)}`,
      yahoo: `https://calendar.yahoo.com/?v=60&title=${enc(title)}&st=${s}&et=${e}&desc=${enc(details)}&in_loc=${enc(location)}`,
      ics: `data:text/calendar;charset=utf8,${enc(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${s}\nDTEND:${e}\nLOCATION:${location}\nDESCRIPTION:${details}\nEND:VEVENT\nEND:VCALENDAR`)}`,
    };
  }, [title, start, end, location, details]);

  return (
    <ToolLayout>
      <ToolHero
        h1="Add to Calendar Link Generator"
        intro="Create Google Calendar, Outlook, Yahoo, and ICS event links from one form. Drop them into emails, landing pages, or invites — your audience adds the event in one click."
      />
      <ToolCard>
        <Field label="Event title">
          <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start">
            <input type="datetime-local" className={inputCls} value={start} onChange={(e) => setStart(e.target.value)} />
          </Field>
          <Field label="End">
            <input type="datetime-local" className={inputCls} value={end} onChange={(e) => setEnd(e.target.value)} />
          </Field>
        </div>
        <Field label="Location (optional)">
          <input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} />
        </Field>
        <Field label="Description (optional)">
          <textarea className={inputCls} rows={3} value={details} onChange={(e) => setDetails(e.target.value)} />
        </Field>
        <div className="space-y-3 pt-2">
          {[
            ["Google Calendar link", links.google],
            ["Outlook calendar link", links.outlook],
            ["Yahoo calendar link", links.yahoo],
            ["ICS download link", links.ics],
          ].map(([label, value]) => (
            <div key={label}>
              <span className="block text-sm font-medium mb-1.5">{label}</span>
              <OutputBlock value={value as string} />
            </div>
          ))}
        </div>
      </ToolCard>
      <HowToUse steps={[
        "Fill in the event title, start and end times.",
        "Add an optional location (meeting URL works too) and description.",
        "Copy the Google, Outlook, Yahoo, or ICS link and share it.",
      ]} />
      <FaqSection items={FAQS} />
      <RelatedTools exclude="/add-to-calendar-link-generator" />
    </ToolLayout>
  );
}
