import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/zoom-meeting-link-generator"].keywords;

const FAQS = [
  { q: "What is a zoom meeting link generator?", a: "A Zoom meeting link generator turns a meeting ID and optional passcode into a clean zoom.us/j/{id} join URL. The free Zoom link generator above is perfect for invitations, Google Calendar events, email signatures and SMS reminders." },
  { q: "How do I use this zoom meeting link generator?", a: "Fill the field above and the Zoom Meeting Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The zoom meeting link generator runs entirely in your browser; no signup required." },
  { q: "Is the zoom meeting link generator free?", a: "Yes, this zoom meeting link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the zoom meeting link generator work on mobile?", a: "Yes — the zoom meeting link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the zoom meeting link generator for commercial projects?", a: "Yes. Output from the zoom meeting link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the zoom meeting link generator store my data?", a: "No. The zoom meeting link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the zoom meeting link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free zoom meeting link generator above is enough." },
  { q: "Can I shorten the output of the zoom meeting link generator?", a: "Yes — paste the URL from the zoom meeting link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Zoom Meeting Link Generator — Free Join URL Builder";
const DESC = "Free Zoom meeting link generator. Build a zoom.us join URL from any meeting ID with an optional passcode — perfect for invitations, calendar events and email signatures.";

export const Route = createFileRoute("/zoom-meeting-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/zoom-meeting-link-generator",
    name: "Zoom Meeting Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Zoom Meeting Link Generator", item: "/zoom-meeting-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("84512345678");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `https://zoom.us/j/${value.trim()}`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Zoom Meeting Link Generator" }]} />
      <ToolHero
        h1={"Zoom Meeting Link Generator — Free Join URL Builder"}
        intro={"Generate a zoom meeting link generator URL in one click. This free Zoom Meeting Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="Zoom meeting ID">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your zoom meeting link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the zoom meeting link generator"}
        steps={[
          "Fill the field above with your zoom meeting id.",
          "The zoom meeting link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a Zoom meeting link generator?"}
        answer={"A Zoom meeting link generator turns a meeting ID and optional passcode into a clean zoom.us/j/{id} join URL. The free Zoom link generator above is perfect for invitations, Google Calendar events, email signatures and SMS reminders."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Zoom Meeting Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Sales team in Atlanta, GA", how: "Pre-builds Zoom meeting links for every demo slot and pastes into HubSpot sequences." },
          { who: "Online coach in Phoenix, AZ", how: "Generates a Zoom join link for each weekly group call." },
          { who: "Recruiter in Chicago, IL", how: "Drops the Zoom meeting URL into Calendly auto-emails for interview confirmations." },
          { who: "University TA in Boston, MA", how: "Adds the Zoom invite link to the syllabus PDF for office hours." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free zoom meeting link generator — how it works",
          paragraphs: [
            "This free zoom meeting link generator runs entirely in your browser. Fill the input above and the Zoom Meeting Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable zoom meeting link generator.",
            "Pair this zoom meeting link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a zoom meeting link generator",
          paragraphs: [
            "Use the zoom meeting link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The zoom meeting link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "zoom meeting link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free zoom meeting link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the zoom meeting link generator",
          paragraphs: [
            "Combine the zoom meeting link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Zoom Meeting Link Generator FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[
          { to: "/", anchor: "Link Generator Hub", blurb: "browse every free link generator." },
          { to: "/short-link-generator", anchor: "Short Link Generator", blurb: "shorten the URL above for SMS, bios and QR codes." },
          { to: "/qr-code-link-generator", anchor: "QR Code Link Generator", blurb: "convert your link into a downloadable QR code." },
          { to: "/premium-link-generator", anchor: "Premium Link Generator", blurb: "Rapidgator, Turbobit and Nitroflare premium downloads." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
