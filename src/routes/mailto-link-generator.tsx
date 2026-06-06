import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";
const KW = SEO["/mailto-link-generator"].keywords;

const FAQS = [
  { q: "What is a mailto link generator?", a: "A mailto link generator is a free tool that builds an HTML mailto: link with optional subject, body, CC and BCC fields. Clicking the link opens the visitor's default email client with the message ready to send." },
  { q: "How do I generate a mailto link with subject and body?", a: "Fill the 'to', 'subject' and 'body' fields above. The free mailto link generator URL-encodes the values and produces both the mailto: string and a copy-ready <a href> HTML snippet." },
  { q: "Is this a free mailto link generator?", a: "Yes — 100% free, no signup. Generate as many mailto links as you want and copy them into your website, email signature or documentation." },
  { q: "How to generate a mailto link for Gmail?", a: "A standard mailto: link opens whatever the user has set as their default email handler — including Gmail (web or app) if it's configured. There is no special 'gmail link generator' — the same mailto link works for Gmail, Outlook, Apple Mail and every other client." },
  { q: "How do I create a mailto link with CC and BCC?", a: "Use the CC and BCC fields in the generator above. They are encoded as &cc= and &bcc= parameters on the mailto: URL — fully supported by every modern email client." },
  { q: "How to generate an email link with HTML?", a: "After generating the mailto string, copy the HTML email link snippet — it's a ready-to-paste <a href=\"mailto:...\">…</a> tag that works in any HTML page or email template." },
  { q: "Why isn't my mailto link working?", a: "If clicking a mailto link does nothing, the visitor's browser doesn't have a default email handler set. On Windows, set it in Settings → Apps → Default apps. On macOS, set it inside Mail's Preferences." },
];

const TITLE = "Mailto Link Generator — Free Email Link with Subject & Body";
const DESC = "Free mailto link generator. Generate an email link with subject, body, CC, BCC and copy-ready HTML — works with Gmail, Outlook, Apple Mail.";

export const Route = createFileRoute("/mailto-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/mailto-link-generator",
    name: "Mailto Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "Mailto Link Generator", item: "/mailto-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [to, setTo] = useState("hello@example.com");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("Quick question");
  const [body, setBody] = useState("Hi,\n\nI found you online and wanted to reach out.\n\nThanks!");

  const { mailto, html } = useMemo(() => {
    const params = new URLSearchParams();
    if (cc) params.set("cc", cc);
    if (bcc) params.set("bcc", bcc);
    if (subject) params.set("subject", subject);
    if (body) params.set("body", body);
    const qs = params.toString().replace(/\+/g, "%20");
    const link = `mailto:${to}${qs ? `?${qs}` : ""}`;
    return { mailto: link, html: `<a href="${link}">Email ${to}</a>` };
  }, [to, cc, bcc, subject, body]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Mailto Link Generator" }]} />
      <ToolHero
        h1="Mailto Link Generator — Free HTML Email Link with Subject & Body"
        intro="Generate a mailto link with subject, body, CC and BCC in seconds. This free mailto link generator outputs both the mailto: string and a copy-ready HTML email link snippet — works in Gmail, Outlook, Apple Mail and every modern email client."
      />

      <ToolCard>
        <Field label="To (required)">
          <input className={inputCls} value={to} onChange={(e) => setTo(e.target.value)} />
        </Field>
        <Field label="CC (optional)">
          <input className={inputCls} value={cc} onChange={(e) => setCc(e.target.value)} />
        </Field>
        <Field label="BCC (optional)">
          <input className={inputCls} value={bcc} onChange={(e) => setBcc(e.target.value)} />
        </Field>
        <Field label="Subject">
          <input className={inputCls} value={subject} onChange={(e) => setSubject(e.target.value)} />
        </Field>
        <Field label="Body">
          <textarea className={inputCls} rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">mailto: link</span>
          <OutputBlock value={mailto} />
        </div>
        <div>
          <span className="block text-sm font-medium mb-1.5">HTML email link</span>
          <OutputBlock value={html} multiline />
        </div>
      </ToolCard>

      <HowToUse
        heading="How to generate a mailto link"
        steps={[
          "Enter the recipient email address in the 'To' field.",
          "Add optional CC, BCC, subject and body — they are URL-encoded automatically.",
          "Copy either the mailto: link or the ready-to-paste HTML email link snippet.",
          "Paste the link into your website, documentation, email signature or a button.",
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "What is a mailto link generator and why use one?",
          paragraphs: [
            "A mailto link generator is a small developer and marketing utility that builds an HTML mailto: URL with a single click. The mailto: scheme has been part of the web since RFC 6068 and is supported by every browser and email client — but writing mailto links by hand is error-prone because subject lines and message bodies must be URL-encoded correctly.",
            "Our free mailto link generator handles the encoding for you. Type your message normally — including line breaks, quotes, ampersands and emoji — and the generator produces a clean, click-tested mailto: link.",
            "The output works in Gmail, Outlook, Apple Mail, Thunderbird, ProtonMail, Spark and every modern mail client without modification.",
          ],
        },
        {
          h2: "How to generate a mailto link with subject and body",
          paragraphs: [
            "The mailto: scheme accepts three optional query parameters: subject, body, cc and bcc. The generator above produces a string like mailto:hello@example.com?subject=Quick%20question&body=Hi%2C%0A%0AI%20found%20you%20online.",
            "The %20 codes are spaces, %0A is a line break and %2C is a comma. These are standard URL escapes — never paste raw spaces or special characters into a mailto link by hand; many email clients will silently drop the parameters.",
            "If you need an email link with multiple recipients, separate them with commas in the 'To' field: alice@example.com,bob@example.com.",
          ],
        },
        {
          h2: "Create a mailto link generator for Gmail and other clients",
          paragraphs: [
            "There is no separate 'Gmail link generator' — a properly-formed mailto: link opens whatever email handler the visitor has set as default, including Gmail (web or Android app), Outlook, Yahoo Mail, Apple Mail or any other client.",
            "If you specifically need a 'compose a new Gmail message' URL (one that always opens Gmail web regardless of the user's default), use https://mail.google.com/mail/?view=cm&to=…&su=…&body=… instead. But a regular mailto: link is more universal and respects the user's preferences.",
          ],
        },
        {
          h2: "HTML email link generator — the copy-paste snippet",
          paragraphs: [
            "The HTML email link generator below the mailto: output produces a ready-to-use <a href=\"mailto:…\">…</a> tag. Drop it into your homepage header, contact page, footer, support widget, knowledge-base article, email template or transactional email.",
            "For accessibility, always include readable anchor text — for example 'Email our sales team' rather than the raw address. Screen readers announce the visible text first.",
          ],
        },
        {
          h2: "Common mailto link use cases",
          paragraphs: [
            "Contact pages, support widgets, 'Report a bug' buttons, GitHub README files, prefilled outreach for press kits, abandoned-cart follow-ups, sales 'reply with template' buttons, error-page 'email support' links, invoice disputes, and one-click newsletter unsubscribes.",
            "If you need to email a structured list of recipients (CC + BCC for transparency or compliance), use the CC and BCC fields above — the free mailto link generator handles both.",
          ],
        },
        {
          h2: "Limits of mailto links you should know",
          paragraphs: [
            "Mailto links have practical limits. URL length is technically unlimited per the spec, but most email clients truncate at 2,000 characters — keep prefilled bodies short. Mobile WebViews inside Instagram and Facebook in-app browsers sometimes block mailto: links; use a regular landing page with a 'copy email' button as a fallback.",
            "Also, mailto links cannot include attachments and cannot guarantee delivery — they only open the composer. For automated transactional email, use a real SMTP service or transactional email API instead.",
          ],
        },
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading="Mailto link generator FAQ" />

      <ContextualLinks
        heading="Related link generators"
        links={[
          { to: "/premium-link-generator", anchor: "Premium Link Generator", blurb: "free Rapidgator, Turbobit, Nitroflare premium link generator on the home page." },
          { to: "/whatsapp-link-generator", anchor: "WhatsApp Link Generator", blurb: "click-to-chat wa.me link as an alternative to email." },
          { to: "/google-review-link-generator", anchor: "Google Review Link Generator", blurb: "include a 5-star Google review link in your email signature." },
          { to: "/add-to-calendar-link-generator", anchor: "Add to Calendar Link Generator", blurb: "embed event links inside your mailto link body." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
