import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout, IconToolGrid, TOOLS } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, AeoBlock, GeoBlock, Breadcrumbs, buildHead,
} from "@/components/tool-ui";
import { buildWhatsAppLink } from "@/lib/link-builders";

const FAQS = [
  { q: "What does a link generator actually do?", a: "It assembles a URL for you. Each platform expects its own syntax — wa.me needs a digits-only number in E.164 form, mailto: needs percent-encoded subject and body, Google Calendar needs ISO-8601 timestamps in UTC. The tool applies the right format and encoding so the URL works the first time you paste it." },
  { q: "Is Businestools Links free?", a: "Yes. There is no account, no usage cap and no paid tier. The tools run in your browser, so they cost nothing to serve." },
  { q: "Does anything I type get uploaded?", a: "No. URLs are built locally in JavaScript. Phone numbers, email addresses, file IDs and messages never reach a server, and nothing is logged." },
  { q: "How do I turn a Google Drive share link into a direct download?", a: "Paste the share URL into the tool above with \"Google Drive direct download\" selected. It extracts the file ID and rebuilds the URL as drive.google.com/uc?export=download&id=FILE_ID, which skips the Drive preview screen. Files over roughly 100 MB still show a virus-scan confirmation." },
  { q: "What is the difference between this and a URL shortener?", a: "A shortener takes an existing URL and gives you a shorter alias that redirects through its own domain. These tools build the destination URL itself — wa.me/…, mailto:…, upi://… — and there is no redirect hop in between. You can pair the two: generate the URL here, then shorten it if you need a tidier string." },
  { q: "Can I use the generated URLs commercially?", a: "Yes. The output is just a URL you assembled — put it on invoices, ads, packaging, email signatures or client sites without restriction or attribution." },
  { q: "Which tool should I start with?", a: "For customer contact, start with WhatsApp chat links or mailto. For campaign measurement, start with UTM tagging. For local business visibility, start with Google review and Maps URLs. For file delivery, start with the direct download tool." },
];

const TITLE = "Link Generator — Free URL Builder Hub for 40+ Utility Tools";
const DESC = "Build any URL in seconds: WhatsApp chats, mailto emails, QR codes, UTM campaigns, Google reviews, calendar invites and direct downloads. Free, no signup.";

export const Route = createFileRoute("/")({
  head: () => buildHead({
    title: TITLE,
    description: DESC,
    path: "/",
    name: "Link Generator",
    faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }],
    extraSchemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Businestools Links",
        url: "/",
        publisher: { "@id": "https://shortlink.businestools.online/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Businestools Links URL tools",
        itemListElement: TOOLS.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.label,
          url: t.to,
        })),
      },
    ],
  }),
  component: Page,
});

type HeroMode = "whatsapp" | "drive" | "short" | "slug";

const MODE_FIELD: Record<HeroMode, { label: string; placeholder: string }> = {
  whatsapp: { label: "Phone number (with country code)", placeholder: "+1 555 123 4567" },
  drive: { label: "Source URL or title", placeholder: "https://drive.google.com/file/d/1AbCDefGhIjKlMnOpQ/view?usp=sharing" },
  short: { label: "Source URL or title", placeholder: "https://example.com/a-very-long-url" },
  slug: { label: "Source URL or title", placeholder: "10 Best URL Tools in 2026" },
};

function Page() {
  const [mode, setMode] = useState<HeroMode>("whatsapp");
  const [input, setInput] = useState("+1 555 123 4567");
  const [waMessage, setWaMessage] = useState("");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    if (mode === "whatsapp") return buildWhatsAppLink(input, waMessage);
    if (mode === "drive") {
      const m = input.match(/\/d\/([a-zA-Z0-9_-]+)/) || input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (m) return `https://drive.google.com/uc?export=download&id=${m[1]}`;
      return "";
    }
    if (mode === "short") {
      const hash = Math.abs([...input].reduce((a, c) => a * 31 + c.charCodeAt(0), 7)).toString(36).slice(0, 6);
      return `https://lnk.kit/${hash}`;
    }
    return input.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
  }, [input, mode, waMessage]);

  const handleModeChange = (next: HeroMode) => {
    setMode(next);
    setInput(MODE_FIELD[next].placeholder);
  };

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator" }]} />
      <ToolHero
        eyebrow={`Free • No Signup • ${TOOLS.length}+ Tools`}
        h1="Link Generator — Free URL Builder Hub"
        intro="Type what you have, copy the URL you need. Businestools Links turns a phone number into a WhatsApp chat, an email address into a one-click mailto, a campaign name into UTM tracking, a Drive file into a direct download, and a title into a clean permalink slug — all in your browser, nothing stored."
      />

      <ToolCard>
        <Field label="What kind of link do you want to generate?">
          <select value={mode} onChange={(e) => handleModeChange(e.target.value as HeroMode)} className={inputCls}>
            <option value="whatsapp">WhatsApp Link Generator</option>
            <option value="drive">Google Drive direct download link</option>
            <option value="short">Short link (custom hash)</option>
            <option value="slug">SEO URL slug</option>
          </select>
        </Field>
        <Field
          label={MODE_FIELD[mode].label}
          hint="Enter a phone number with country code for WhatsApp, paste a Google Drive share link, any URL to shorten, or a title to slug-ify."
        >
          <input
            className={inputCls}
            type={mode === "whatsapp" ? "tel" : "text"}
            placeholder={MODE_FIELD[mode].placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Field>
        {mode === "whatsapp" && (
          <Field label="Pre-filled message (optional)">
            <input
              className={inputCls}
              placeholder="Hi! I'd like to know more about…"
              value={waMessage}
              onChange={(e) => setWaMessage(e.target.value)}
            />
          </Field>
        )}
        <div>
          <span className="block text-sm font-semibold mb-1.5">Generated link</span>
          <OutputBlock value={output} />
        </div>
        <p className="text-xs text-muted-foreground">
          Need something more specific? Pick a dedicated tool from the grid below.
        </p>
      </ToolCard>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { k: `${TOOLS.length}+`, v: "Free tools" },
          { k: "0", v: "Signup required" },
          { k: "100%", v: "Runs in your browser" },
          { k: "USA", v: "Formats & examples" },
        ].map((s) => (
          <div key={s.v} className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
            <div className="text-2xl md:text-3xl font-display font-extrabold text-gradient-sunset">{s.k}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      <IconToolGrid heading="All tools" tools={TOOLS} />

      <HowToUse
        heading="How the hub works"
        steps={[
          "Pick the tool that matches your destination — a chat app, an inbox, a map, a calendar, a payment app or a file.",
          "Fill the form. Every field carries a worked example, so you can see the expected format before you type.",
          "Copy the result and paste it into a site, bio, signature, invoice, QR code or ad.",
          "Bookmark the hub — nothing is saved between visits, by design.",
        ]}
      />

      <AeoBlock
        question="What is a link generator?"
        answer="A link generator is a browser tool that assembles a complete, correctly encoded URL for a specific destination — a WhatsApp chat, an email draft, a map route, a calendar event, a payment request or a file download. It applies the platform's required syntax and percent-encodes spaces, ampersands, emoji and line breaks so the URL does not silently break when someone taps it."
      />

      <GeoBlock
        heading="How US businesses use the hub"
        items={[
          { who: "Dentist in Miami, FL", how: "One QR on the reception desk points to a Google review URL; a second on the appointment card opens a WhatsApp chat for rescheduling." },
          { who: "Shopify store in Austin, TX", how: "Tags every influencer post with UTM parameters so Shopify analytics attributes revenue to the right partner." },
          { who: "Realtor in Phoenix, AZ", how: "Sends an open-house email containing a Maps route and an add-to-calendar URL that fills the date, time and address automatically." },
          { who: "SaaS founder in San Francisco", how: "Builds referral URLs with a tracking code and clean slugs for the landing pages behind them." },
          { who: "Freelance designer in Brooklyn, NY", how: "Delivers final files through a direct download URL instead of a preview page, and signs off with a clickable email signature." },
        ]}
      />

      <SeoLongform
        sections={[
          {
            h2: "One toolkit instead of ten bookmarks",
            paragraphs: [
              "Most URL work is small and annoying: you need a wa.me address for the Instagram bio, a mailto with the subject already filled in, a Drive file that downloads instead of previewing, a QR for a printed flyer. Each one has its own quirks and none of them justify installing software.",
              "Businestools Links keeps all of them in one place, with the same three-step flow: choose the tool, fill the form, copy the output. Every generator runs locally in JavaScript — nothing is uploaded, nothing is rate-limited, nothing waits on a server.",
            ],
          },
          {
            h2: "Drive files that download instead of previewing",
            paragraphs: [
              "A standard Google Drive share URL (drive.google.com/file/d/FILE_ID/view) opens a preview screen. The hub tool extracts FILE_ID and rebuilds it as drive.google.com/uc?export=download&id=FILE_ID, so the browser starts the download immediately.",
              "This works for PDFs, ZIPs and video under Drive's virus-scan threshold of roughly 100 MB. Above that, Google shows a one-time confirmation page that the recipient has to click through — no URL format avoids it.",
            ],
          },
          {
            h2: "Tracking, shortening and slugs",
            paragraphs: [
              "The hero tool's short-hash mode is a quick deterministic alias for throwaway use. For campaigns you actually measure, use UTM tagging so Google Analytics and Shopify can attribute traffic, or the referral and affiliate tools when the parameters have to survive a redirect chain.",
              "The slug mode strips accents, punctuation and stop characters from a headline and returns a lowercase, hyphenated permalink that WordPress and most CMSs accept unchanged.",
            ],
          },
          {
            h2: "Why hand-written URLs break",
            paragraphs: [
              "Spaces, ampersands, quotes, line breaks and emoji all have to be percent-encoded. WhatsApp rejects numbers containing +, spaces or dashes. Calendar invites need UTC timestamps in ISO-8601 basic format. Mailto bodies need %0A for each new line. Any single mistake produces a URL that looks fine and does nothing when tapped.",
              "Each tool here encodes its output against the platform's documented format and shows you the finished string, so you can check it before it ships.",
            ],
          },
        ]}
      />

      <FaqSection items={FAQS} heading="Common questions" />

      <p className="mt-10 text-sm text-foreground/80">
        Most used today: the{" "}
        <Link to="/whatsapp-link-generator" className="text-primary font-semibold hover:underline">WhatsApp chat link tool</Link>,{" "}
        <Link to="/qr-code-link-generator" className="text-primary font-semibold hover:underline">QR codes</Link>,{" "}
        <Link to="/google-review-link-generator" className="text-primary font-semibold hover:underline">Google review requests</Link>{" "}
        and{" "}
        <Link to="/utm-link-generator" className="text-primary font-semibold hover:underline">UTM campaign tagging</Link>. New here?{" "}
        <Link to="/about" className="text-primary font-semibold hover:underline">Read about the project</Link>.
      </p>
    </ToolLayout>
  );
}
