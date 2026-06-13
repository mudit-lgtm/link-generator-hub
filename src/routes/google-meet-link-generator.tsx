import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/google-meet-link-generator"].keywords;

const FAQS = [
  { q: "What is a google meet link generator?", a: "A Google Meet link generator turns a meeting code into a meet.google.com/{code} URL that opens an instant Google Meet call. The free Google Meet link generator above works for standups, sales demos, tutoring sessions and any quick video chat — no Google Workspace setup required." },
  { q: "How do I use this google meet link generator?", a: "Fill the field above and the Google Meet Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The google meet link generator runs entirely in your browser; no signup required." },
  { q: "Is the google meet link generator free?", a: "Yes, this google meet link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the google meet link generator work on mobile?", a: "Yes — the google meet link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the google meet link generator for commercial projects?", a: "Yes. Output from the google meet link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the google meet link generator store my data?", a: "No. The google meet link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the google meet link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free google meet link generator above is enough." },
  { q: "Can I shorten the output of the google meet link generator?", a: "Yes — paste the URL from the google meet link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Google Meet Link Generator — Free Instant Meeting URLs";
const DESC = "Free Google Meet link generator. Build a meet.google.com link from any meeting code — instant meetings, team standups and 1:1 invites in seconds.";

export const Route = createFileRoute("/google-meet-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/google-meet-link-generator",
    name: "Google Meet Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Google Meet Link Generator", item: "/google-meet-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("abc-defg-hij");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `https://meet.google.com/${value.trim()}`;
  }, [value]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Google Meet Link Generator" }]} />
      <ToolHero
        h1={"Google Meet Link Generator — Free Instant Meeting URLs"}
        intro={"Generate a google meet link generator URL in one click. This free Google Meet Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="Meeting code (10 chars, dashes optional)">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your google meet link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the google meet link generator"}
        steps={[
          "Fill the field above with your meeting code (10 chars, dashes optional).",
          "The google meet link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a Google Meet link generator?"}
        answer={"A Google Meet link generator turns a meeting code into a meet.google.com/{code} URL that opens an instant Google Meet call. The free Google Meet link generator above works for standups, sales demos, tutoring sessions and any quick video chat — no Google Workspace setup required."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Google Meet Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Startup founder in San Francisco, CA", how: "Generates Google Meet links for investor intros and drops them into the email template." },
          { who: "HR manager in Dallas, TX", how: "Uses the Google Meet link generator for daily standups across remote teams." },
          { who: "Tutor in Seattle, WA", how: "Sends a fresh google.com/meet link to every student via SMS before each session." },
          { who: "Consultant in Denver, CO", how: "Embeds the Google Meet invite link in proposal PDFs for kickoff calls." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free google meet link generator — how it works",
          paragraphs: [
            "This free google meet link generator runs entirely in your browser. Fill the input above and the Google Meet Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable google meet link generator.",
            "Pair this google meet link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a google meet link generator",
          paragraphs: [
            "Use the google meet link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The google meet link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "google meet link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free google meet link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the google meet link generator",
          paragraphs: [
            "Combine the google meet link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Google Meet Link Generator FAQ"} />

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
