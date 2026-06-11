import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";
const KW = SEO["/qr-code-link-generator"].keywords;

const FAQS = [
  { q: "What is a QR code link generator?", a: "A QR code link generator turns any URL into a scannable QR code PNG. The free link to QR code generator above produces a high-resolution image you can download, print and share — no signup." },
  { q: "How do I generate a QR code from a link?", a: "Paste your URL into the field above. The QR link generator builds the QR code instantly, ready to download or right-click save." },
  { q: "Is this link QR code generator free?", a: "Yes — this is a 100% free link to qr code generator. No watermarks, no signups, no limits." },
  { q: "Will the generated QR code work on all phones?", a: "Yes. The link QR code generator outputs a standard PNG using the QR Model 2 spec, which every iPhone and Android camera reads natively." },
  { q: "Can I use this QR code for marketing materials?", a: "Yes — the link to qr generator output is yours to use on flyers, packaging, posters, business cards, restaurant menus and storefront windows." },
  { q: "Does the QR code expire?", a: "No. The QR code generator from link encodes the URL directly — there's no redirect, so the QR works forever as long as your destination URL is alive." },
  { q: "Can I customise the QR code colours?", a: "The default QR is high-contrast black on white for maximum scan reliability. For brand-coloured QR codes you'd want a paid tool — but for 99% of use cases, the free QR code link generator above is enough." },
  { q: "What size QR code should I use for print?", a: "Download the PNG and scale to at least 1 inch (2.5 cm) per side for handheld scans, or 4 inches+ for posters viewed from a distance." },
];

const TITLE = "QR Code Link Generator — Free Link to QR Code Converter";
const DESC = "Free QR code link generator. Convert any link to a downloadable QR code PNG instantly — the easiest link to qr code generator, qr link generator and link qr code generator.";

export const Route = createFileRoute("/qr-code-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/qr-code-link-generator",
    name: "QR Code Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "QR Code Link Generator", item: "/qr-code-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [url, setUrl] = useState("https://linkkit.fun");
  const [qr, setQr] = useState("");

  useEffect(() => {
    if (!url) return setQr("");
    QRCode.toDataURL(url, { width: 320, margin: 1 }).then(setQr).catch(() => setQr(""));
  }, [url]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "QR Code Link Generator" }]} />
      <ToolHero
        h1="QR Code Link Generator — Free Link to QR Code Converter"
        intro="Generate a QR code from any link in one click. This free QR code link generator works as a link to qr code generator, qr link generator and link qr code generator — download the PNG and print it on flyers, packaging, menus or business cards."
        keywords={KW}
      />

      <ToolCard>
        <Field label="URL to convert to QR code">
          <input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} />
        </Field>
        {qr && (
          <div className="flex items-center gap-4 rounded-lg border border-border bg-accent/30 p-4">
            <img src={qr} alt={`QR code for ${url}`} width={200} height={200} className="rounded-md" />
            <a href={qr} download="link-qr.png" className="px-4 py-2 rounded-md bg-gradient-sunset text-white text-sm font-semibold shadow-warm">
              Download QR PNG
            </a>
          </div>
        )}
      </ToolCard>

      <HowToUse
        heading="How to generate a QR code from a link"
        steps={[
          "Paste any URL into the field above.",
          "Wait a fraction of a second while the QR link generator renders the QR.",
          "Click Download QR PNG.",
          "Print or paste the QR wherever you need a scannable link.",
        ]}
      />

      <AeoBlock
        question="What is a QR code link generator?"
        answer="A QR code link generator is a free tool that converts a URL into a scannable QR Model 2 PNG image. The link to qr code generator output is a high-resolution PNG that works with every iPhone and Android camera app, perfect for print marketing, packaging, menus and storefront windows."
        keywords={KW}
      />

      <GeoBlock
        heading="QR code link generator — USA business use cases"
        keywords={KW}
        items={[
          { who: "Restaurant in Brooklyn, NY", how: "Prints a QR code link on every table that opens the digital menu." },
          { who: "Real-estate agent in Phoenix, AZ", how: "Adds a QR code generator from link output to yard signs that opens the listing." },
          { who: "Pop-up market in Portland, OR", how: "Uses the link to qr code generator to point to a Stripe checkout from physical stalls." },
          { who: "Conference organiser in Las Vegas, NV", how: "Prints a QR code link on lanyards that opens the live agenda." },
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free link to QR code generator — generate QR code from link in seconds",
          paragraphs: [
            "QR codes have become the default bridge between print and digital in the United States — since 2020, scanning rates have grown over 400%. A free link to QR code generator like this one turns any URL into a scannable QR PNG in a fraction of a second, ready for download, print and packaging.",
            "Use the QR code link generator above for restaurant menus, product packaging, real-estate yard signs, business cards, conference badges, retail shelf-talkers and storefront windows.",
          ],
        },
        {
          h2: "QR link generator vs paid QR platforms",
          paragraphs: [
            "Paid QR platforms (QRTiger, Beaconstac, Uniqode) bundle the QR with analytics and dynamic redirects. For most US small businesses, the free QR code link generator above is enough — it produces a permanent static QR that encodes your URL directly. Reach for a paid platform only when you need scan analytics or A/B testing.",
          ],
        },
        {
          h2: "Where to use your generated QR code",
          paragraphs: [
            "Anywhere a phone camera can see: receipts, packaging, menus, posters, billboards, business cards, sticker labels, conference signage, gift cards, books, magazines, garage doors, even t-shirts.",
            "Pair the QR code link generator output with the short link generator for a clean, branded URL underneath the QR.",
          ],
        },
        {
          h2: "QR code generator from link — how the encoding works",
          paragraphs: [
            "The QR link generator above uses the standard QR Model 2 spec (max ~2,953 bytes per code). It picks the smallest error-correction level that fits your URL while keeping the QR scannable from arm's length. Longer URLs produce denser QR codes — for very long URLs, shorten the link first with our short link generator.",
          ],
        },
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading="QR code link generator FAQ" />

      <ContextualLinks
        heading="Related link generators"
        links={[
          { to: "/short-link-generator", anchor: "Short Link Generator", blurb: "shorten the URL first for a denser, scan-friendly QR." },
          { to: "/whatsapp-link-generator", anchor: "WhatsApp Link Generator", blurb: "generate a WhatsApp click-to-chat QR for menus and packaging." },
          { to: "/google-review-link-generator", anchor: "Google Review Link Generator", blurb: "QR-code a Google review link for instant 5-star reviews." },
          { to: "/utm-link-generator", anchor: "UTM Link Generator", blurb: "add UTM tags before generating the QR for campaign tracking." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
