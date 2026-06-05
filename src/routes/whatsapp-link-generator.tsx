import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import QRCode from "qrcode";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What is a WhatsApp link generator?", a: "A WhatsApp link generator creates a wa.me click-to-chat link that opens a WhatsApp conversation with your number — optionally with a prefilled message — without the sender having to save your contact first. It's the easiest way to add WhatsApp click-to-chat to a website, email signature, Instagram bio or business card." },
  { q: "How do I generate a WhatsApp link for my number?", a: "Enter your phone number with country code in international format (digits only, no plus sign, no spaces). The free WhatsApp link generator above wraps it into a wa.me URL that works on Android, iPhone and WhatsApp Web." },
  { q: "How can I generate a WhatsApp link with a prefilled message?", a: "Type any text in the 'prefilled message' field. The WhatsApp link generator URL-encodes the message and appends it as ?text= so it shows up in the chat composer when the recipient taps the link." },
  { q: "How do I generate a WhatsApp link with QR code?", a: "Every link our generator produces also renders as a downloadable QR code below the output box. Save the PNG and print it on flyers, packaging, menus or posters for instant scan-to-chat." },
  { q: "How can I generate my WhatsApp link for WhatsApp Business?", a: "Use the same generator above with your WhatsApp Business number. The wa.me link works identically for WhatsApp and WhatsApp Business accounts — no extra setup is needed." },
  { q: "Is this WhatsApp link generation tool free?", a: "Yes — 100% free with no signup, no usage limits and no tracking. Unlike wati and other paid generators, you keep ownership of the link and the QR code." },
  { q: "Why isn't my generated WhatsApp link opening?", a: "The most common reason is that the phone number is missing the country code. WhatsApp wa.me links require full international format (e.g. 14155552671 for a US number, 919876543210 for India). Re-enter the number with the country code and re-generate." },
];

const TITLE = "WhatsApp Link Generator — Free wa.me Link & QR Code Generator";
const DESC = "Free WhatsApp link generator. Generate a wa.me link with prefilled message and QR code for your number, WhatsApp Business or click-to-chat button.";

export const Route = createFileRoute("/whatsapp-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/whatsapp-link-generator",
    name: "WhatsApp Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "WhatsApp Link Generator", item: "/whatsapp-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [phone, setPhone] = useState("14155552671");
  const [msg, setMsg] = useState("Hi! I found you online.");
  const link = useMemo(() => {
    const clean = phone.replace(/[^\d]/g, "");
    return clean ? `https://wa.me/${clean}${msg ? `?text=${encodeURIComponent(msg)}` : ""}` : "";
  }, [phone, msg]);

  const [qr, setQr] = useState("");
  useEffect(() => {
    if (!link) return setQr("");
    QRCode.toDataURL(link, { width: 240, margin: 1 }).then(setQr).catch(() => setQr(""));
  }, [link]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "WhatsApp Link Generator" }]} />
      <ToolHero
        h1="WhatsApp Link Generator — Free wa.me Link & QR Code"
        intro="Generate a WhatsApp link for your number in seconds. Our free WhatsApp link generator builds a wa.me URL with prefilled message and a downloadable QR code — perfect for click-to-chat buttons, WhatsApp Business, Instagram bios and printed marketing."
      />

      <ToolCard>
        <Field label="Phone number with country code" hint="Digits only — no plus sign, no spaces (e.g. 14155552671 for US, 919876543210 for India)">
          <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <Field label="Prefilled message (optional)">
          <textarea className={inputCls} rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">Your WhatsApp link</span>
          <OutputBlock value={link} />
        </div>
        {qr && (
          <div>
            <span className="block text-sm font-medium mb-1.5">WhatsApp QR code</span>
            <div className="flex items-center gap-4 rounded-md border border-border bg-muted/40 p-4">
              <img src={qr} alt="WhatsApp link QR code" width={160} height={160} className="rounded-md" />
              <a href={qr} download="whatsapp-qr.png" className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">
                Download QR
              </a>
            </div>
          </div>
        )}
      </ToolCard>

      <HowToUse
        heading="How to generate a WhatsApp link with this free generator"
        steps={[
          "Enter your WhatsApp or WhatsApp Business number with country code (digits only).",
          "Type an optional prefilled message — greetings, promo codes, anything.",
          "Copy the generated wa.me link or download the QR code PNG.",
          "Paste the WhatsApp link on your website, Instagram bio, email signature or business card.",
        ]}
      />

      <SeoLongform sections={[
        {
          h2: "What is a WhatsApp link generator?",
          paragraphs: [
            "A WhatsApp link generator is a free online tool that turns your phone number into a wa.me click-to-chat link — sometimes called a WhatsApp click-to-chat URL. When someone taps your generated WhatsApp link, WhatsApp (or WhatsApp Web) opens directly to a conversation with you, with no need for the sender to save your number first.",
            "WhatsApp link generation has become essential for businesses, freelancers and creators because organic chat is the fastest way to convert curious visitors into customers. Instead of typing a phone number into a CRM or saving a contact, your audience taps once and starts talking.",
            "The WhatsApp link generator above is 100% free and generates a wa.me link with QR code in your browser — your number is never sent to our servers.",
          ],
        },
        {
          h2: "How to generate a WhatsApp link with number and prefilled message",
          paragraphs: [
            "To generate a WhatsApp link with a number, paste it in international format (digits only, no plus sign). For example, 14155552671 for the United States, 447911123456 for the United Kingdom, 919876543210 for India. The generator builds a wa.me/<number> URL automatically.",
            "To generate a WhatsApp link with a prefilled message, just type the text in the message field. Common examples include 'Hi, I'd like a quote', 'I'm interested in your Instagram post', or 'Show me the menu, please'. The message is URL-encoded into ?text= and appears in the chat composer as soon as the link is opened.",
          ],
        },
        {
          h2: "Generate WhatsApp link QR code for offline marketing",
          paragraphs: [
            "Our WhatsApp link generator includes a free QR code, ready to download as PNG. Print it on restaurant menus, real-estate flyers, packaging inserts, conference badges, retail shelf-talkers or storefront windows. When a customer scans it with any phone camera, WhatsApp opens directly to your chat with the prefilled message you set.",
            "QR codes from this generator do not expire and are not tracked through a third-party redirector — the QR encodes the wa.me link directly, so it works forever regardless of whether LinkKit is online.",
          ],
        },
        {
          h2: "WhatsApp link generator for WhatsApp Business",
          paragraphs: [
            "If you've moved your customer support to WhatsApp Business, this is the cheapest way to add a click-to-chat button to your site without paying for wati or similar BSP platforms. Generate the link once, embed it as <a href=\"YOUR_LINK\">Chat with us on WhatsApp</a> in your header, footer or product page, and you're live.",
            "For larger teams or shared inboxes, you'll eventually want a proper WhatsApp Business API solution — but for small businesses, solo founders and local stores in the USA, a free WhatsApp link generator covers 95% of the use case.",
          ],
        },
        {
          h2: "Where to use your generated WhatsApp link",
          paragraphs: [
            "The wa.me link works literally anywhere a URL works. Most popular spots: Instagram bio, TikTok bio, Linktree, website header, product page CTA, email signature, abandoned-cart email, Google Business Profile, Etsy shop announcement, Shopify announcement bar, Stripe payment-success page, invoice PDFs.",
            "If you also want a Google review link or a directions link in the same place, our free Google review link generator and Google Maps link generator produce them in seconds — see the related-tools panel below.",
          ],
        },
        {
          h2: "Free WhatsApp link generator vs paid alternatives",
          paragraphs: [
            "Paid WhatsApp link tools (wati, WATI alternatives, AiSensy, Interakt and similar) bundle the link with broadcasting, chatbots and analytics. If all you need is a working WhatsApp link generator with QR code, paying $30–$200/month is overkill — a free generator does the link-generation part identically.",
            "Reach for a paid platform only when you need broadcast messaging at scale, conversation analytics, or multi-agent shared inbox. For everyone else, a free WhatsApp link generator is enough.",
          ],
        },
      ]} />

      <FaqSection items={FAQS} heading="WhatsApp link generator FAQ" />

      <ContextualLinks
        heading="Related free link generators"
        links={[
          { to: "/", anchor: "Premium Link Generator", blurb: "free Rapidgator, Turbobit, Nitroflare premium link generator on the home page." },
          { to: "/google-review-link-generator", anchor: "Google Review Link Generator", blurb: "complement your WhatsApp button with a one-tap Google review link." },
          { to: "/mailto-link-generator", anchor: "Mailto Link Generator", blurb: "build an email link with subject and body for visitors who prefer email." },
          { to: "/google-maps-link-generator", anchor: "Google Maps Link Generator", blurb: "share directions to your business alongside your WhatsApp link." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
