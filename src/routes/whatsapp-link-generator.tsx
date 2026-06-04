import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import QRCode from "qrcode";
import { ToolLayout, RelatedTools } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What is a WhatsApp link generator?", a: "It creates a wa.me link that opens a chat with your WhatsApp number (and optionally a prefilled message) — no need for the sender to save your contact first." },
  { q: "How do I generate a WhatsApp link for my number?", a: "Enter your phone number with country code (no plus sign, no dashes). The tool wraps it into a wa.me URL you can share or QR-code." },
  { q: "Can I generate a WhatsApp link with a prefilled message?", a: "Yes — type a message in the optional field and it's URL-encoded into the link automatically." },
  { q: "Does the generator include a QR code?", a: "Yes — every link gets a downloadable QR code, perfect for business cards, posters, and packaging." },
  { q: "Is the WhatsApp link generator free?", a: "Yes, free and unlimited. The link works for both personal and WhatsApp Business numbers." },
];

const TITLE = "WhatsApp Link Generator — Free wa.me Link & QR Code";
const DESC = "Generate a WhatsApp link with prefilled message and free QR code. Works with any number, perfect for businesses and click-to-chat buttons.";

export const Route = createFileRoute("/whatsapp-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/whatsapp-link-generator",
    name: "WhatsApp Link Generator", faqs: FAQS,
  }),
  component: Page,
});

function Page() {
  const [phone, setPhone] = useState("14155552671");
  const [msg, setMsg] = useState("Hi! I found you online.");
  const link = useMemo(() => {
    const clean = phone.replace(/[^\d]/g, "");
    return `https://wa.me/${clean}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
  }, [phone, msg]);

  const [qr, setQr] = useState("");
  useEffect(() => {
    QRCode.toDataURL(link, { width: 240, margin: 1 }).then(setQr).catch(() => setQr(""));
  }, [link]);

  return (
    <ToolLayout>
      <ToolHero
        h1="WhatsApp Link Generator"
        intro="Create a wa.me link with a prefilled message and download the QR code. Use it on your website, in your email signature, or printed on business cards."
      />
      <ToolCard>
        <Field label="Phone number with country code" hint="Digits only, no spaces, no plus sign (e.g. 14155552671)">
          <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <Field label="Prefilled message (optional)">
          <textarea className={inputCls} rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">WhatsApp link</span>
          <OutputBlock value={link} />
        </div>
        {qr && (
          <div>
            <span className="block text-sm font-medium mb-1.5">QR code</span>
            <div className="flex items-center gap-4 rounded-md border border-border bg-muted/40 p-4">
              <img src={qr} alt="WhatsApp QR code" width={160} height={160} className="rounded-md" />
              <a href={qr} download="whatsapp-qr.png" className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">
                Download QR
              </a>
            </div>
          </div>
        )}
      </ToolCard>
      <HowToUse steps={[
        "Enter your WhatsApp number with country code (digits only).",
        "Add an optional prefilled message.",
        "Copy the wa.me link or download the QR code.",
      ]} />
      <FaqSection items={FAQS} />
      <RelatedTools exclude="/whatsapp-link-generator" />
    </ToolLayout>
  );
}
