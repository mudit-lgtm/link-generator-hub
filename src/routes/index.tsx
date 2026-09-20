import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { ToolLayout, IconToolGrid, TOOLS } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, CopyButton, FaqSection,
  Breadcrumbs, buildHead,
} from "@/components/tool-ui";
import { buildWhatsAppLink } from "@/lib/link-builders";

const FAQS = [
  { q: "How do I create a WhatsApp link without saving the number?", a: "Enter the phone number with its country code into the generator above. The resulting wa.me link opens a chat with that number directly — neither you nor the visitor needs to save it as a contact first." },
  { q: "Can I add a prefilled message to my WhatsApp link?", a: "Yes. Type your message into the optional message field and the generator will encode it into the link. When someone opens the link, WhatsApp opens with that message already typed into the chat box, ready to send." },
  { q: "Does the WhatsApp link work if someone doesn't have my number saved?", a: "Yes. That's the core purpose of a wa.me link — it opens a chat with the number in the link regardless of whether either party has saved the other as a contact." },
  { q: "Will this WhatsApp link work on both iPhone and Android?", a: "Yes. The wa.me link format is cross-platform and opens the WhatsApp app automatically on both iOS and Android, or WhatsApp Web on desktop browsers if the app isn't installed." },
  { q: "Can I turn my WhatsApp link into a QR code?", a: "Yes. After generating your link, use the \"Generate QR Code\" option to create a scannable QR code for printed materials, menus, or storefront signage." },
  { q: "Is this WhatsApp link generator free to use?", a: "Yes. It's completely free with no signup, no usage limits, and no tracking — every link is generated inside your browser." },
];

const TITLE = "WhatsApp Link Generator — Create a wa.me Click-to-Chat Link Free";
const DESC = "Generate a free WhatsApp click-to-chat link (wa.me) with a prefilled message and QR code — no signup, no app, works without saving the contact's number. Plus 40+ more free link generators.";
const OG_TITLE = "WhatsApp Link Generator — Free wa.me Click-to-Chat Link Maker";

export const Route = createFileRoute("/")({
  head: () => buildHead({
    title: TITLE,
    description: DESC,
    path: "/",
    name: "WhatsApp Link Generator",
    faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "WhatsApp Link Generator", item: "/" }],
    ogTitle: OG_TITLE,
    ogSiteName: "Businestools Links",
    extraSchemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "WhatsApp Link Generator",
        url: "https://shortlink.businestools.online/",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "Free WhatsApp click-to-chat link generator with QR code and prefilled message support. No signup required.",
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
  const [qrCode, setQrCode] = useState("");

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

  useEffect(() => setQrCode(""), [output]);

  const handleModeChange = (next: HeroMode) => {
    setMode(next);
    setInput(MODE_FIELD[next].placeholder);
  };

  const generateQrCode = async () => {
    if (!output) return;
    setQrCode(await QRCode.toDataURL(output, { width: 320, margin: 2 }));
  };

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "WhatsApp Link Generator" }]} />
      <ToolHero
        eyebrow="Free • No signup • Private by design"
        h1="WhatsApp Link Generator — Create a Click-to-Chat Link in Seconds"
        intro="Turn any phone number into a wa.me link that opens a WhatsApp chat instantly — no app install, no saving the contact, works on any device."
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
          <div className="rounded-lg border border-border bg-accent/40 p-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <code className="text-xs break-all flex-1 font-mono text-foreground">
              {output || <span className="text-muted-foreground">Output will appear here</span>}
            </code>
            <div className="flex shrink-0 gap-2">
              <CopyButton value={output} />
              <button
                type="button"
                onClick={generateQrCode}
                disabled={!output}
                className="px-3 py-1.5 rounded-md border border-primary text-primary text-xs font-semibold hover:bg-accent disabled:opacity-40 transition"
              >
                Generate QR Code
              </button>
            </div>
          </div>
        </div>
        {qrCode && <img src={qrCode} alt="QR code for the generated WhatsApp link" className="w-48 h-48 rounded-lg border border-border bg-card p-2" />}
      </ToolCard>

      <section className="mt-10 text-base text-foreground/85 leading-relaxed">
        <p>A WhatsApp link generator builds a ready-to-click wa.me URL from a phone number, so anyone can start a WhatsApp chat without saving your contact first. This is the same link format businesses use in Instagram bios, email signatures, printed flyers, and Google Business profiles to turn a click into a conversation. Type a phone number with its country code, add an optional prefilled message so the chat opens with your text already typed in, and copy the finished wa.me link. It works identically on Android, iPhone, and desktop, and it opens WhatsApp Web automatically for anyone without the app installed. Every link is built inside your browser — nothing is sent to a server, nothing is logged, and there's no signup required to generate as many WhatsApp links as you need.</p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-5">How to create a WhatsApp link</h2>
        <ol className="grid md:grid-cols-2 gap-3">
          {[
            ["Enter the phone number with country code", "Use the full international format, e.g. +1 555 123 4567 for the US. Skip the leading zero if your country normally uses one domestically."],
            ["Add a prefilled message (optional)", "Type a message like 'Hi, I'd like to know more about...' and it will already be typed into the chat box when the visitor opens the link — they just hit send."],
            ["Copy the link or generate a QR code", "Use the link directly in a bio, website button, or email signature, or generate a scannable QR code for printed materials, menus, or storefront signage."],
            ["Test it before publishing", "Open the generated link yourself on both mobile and desktop to confirm it opens the correct chat with your message pre-filled."],
          ].map(([title, text], index) => (
            <li key={title} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <span className="text-xs font-bold uppercase text-primary">Step {index + 1}</span>
              <h3 className="font-bold mt-1 mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Why use a WhatsApp link generator instead of typing wa.me manually</h2>
        <p className="text-base text-foreground/85 leading-relaxed">Building a wa.me link by hand is easy to get wrong. The phone number must be in E.164 format with no spaces, dashes, or leading zeros, and any prefilled message text must be percent-encoded — spaces become %20, line breaks become %0A, and punctuation like question marks or ampersands can break the link entirely if left unencoded. A single formatting mistake means the link opens WhatsApp to a blank chat, or doesn't open at all. This WhatsApp link generator handles the encoding automatically, so the link works correctly the first time, whether you're building it for a business card, an Instagram bio, a customer support widget, or a printed QR code for your storefront.</p>
        <p className="mt-4 text-sm text-muted-foreground">For other contact formats, create a <Link to="/sms-link-generator" className="text-primary font-semibold hover:underline">click-to-text link with the SMS Link Generator</Link> or build a <Link to="/telegram-link-generator" className="text-primary font-semibold hover:underline">Telegram contact link</Link>.</p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-5">Common ways businesses use WhatsApp links</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["Local business inquiries", "A WhatsApp link generator on a Google Business profile or storefront QR code turns a walk-by customer into a direct chat, without them needing to save your number first."],
            ["Customer support", "Add a click-to-chat link to your website's contact page so visitors can message support directly instead of filling out a form."],
            ["Event RSVPs", "Include a WhatsApp link with a prefilled 'I'll be there' message in event invites so guests can confirm with one tap."],
            ["Social media bios", "Instagram and TikTok bios don't support clickable phone numbers — a wa.me link is the standard workaround creators and small businesses use."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Need a printable version? Turn the finished wa.me URL into an image with the <Link to="/qr-code-link-generator" className="text-primary font-semibold hover:underline">QR Code Link Generator</Link>.</p>
      </section>

      <FaqSection items={FAQS} heading="WhatsApp link generator FAQ" />
      <IconToolGrid heading="More free link generators" tools={TOOLS} />
    </ToolLayout>
  );
}
