import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/magnet-link-generator"].keywords;

const FAQS = [
  { q: "What is a magnet link generator?", a: "A magnet link generator builds a magnet:?xt=urn:btih:{hash} URI with display name and tracker parameters. The free magnet link generator above is perfect for legal torrent distribution — Linux ISOs, public datasets, open-source releases and indie game demos." },
  { q: "How do I use this magnet link generator?", a: "Fill the field above and the Magnet Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The magnet link generator runs entirely in your browser; no signup required." },
  { q: "Is the magnet link generator free?", a: "Yes, this magnet link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the magnet link generator work on mobile?", a: "Yes — the magnet link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the magnet link generator for commercial projects?", a: "Yes. Output from the magnet link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the magnet link generator store my data?", a: "No. The magnet link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the magnet link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free magnet link generator above is enough." },
  { q: "Can I shorten the output of the magnet link generator?", a: "Yes — paste the URL from the magnet link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "Magnet Link Generator — Free Torrent Magnet URI Builder";
const DESC = "Free magnet link generator. Build a magnet: URI from a BitTorrent info hash with display name and trackers — perfect for distributing legal torrents, public datasets and open-source ISOs.";

export const Route = createFileRoute("/magnet-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/magnet-link-generator",
    name: "Magnet Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Magnet Link Generator", item: "/magnet-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("C9E15763F722F23E98A29DECDFAE341B98D53056");
  const [name, setName] = useState("ubuntu-24.04-desktop-amd64.iso");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `magnet:?xt=urn:btih:${value.trim()}&dn=${encodeURIComponent(name.trim())}&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337`;
  }, [value, name]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Magnet Link Generator" }]} />
      <ToolHero
        h1={"Magnet Link Generator — Free Torrent Magnet URI Builder"}
        intro={"Generate a magnet link generator URL in one click. This free Magnet Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="BitTorrent info hash (40 hex or base32)">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <Field label="Display name (dn)">
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your magnet link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the magnet link generator"}
        steps={[
          "Fill the field above with your bittorrent info hash (40 hex or base32).",
          "The magnet link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a magnet link generator?"}
        answer={"A magnet link generator builds a magnet:?xt=urn:btih:{hash} URI with display name and tracker parameters. The free magnet link generator above is perfect for legal torrent distribution — Linux ISOs, public datasets, open-source releases and indie game demos."}
        keywords={KW}
      />

      <GeoBlock
        heading={"Magnet Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Open-source community in San Francisco, CA", how: "Distributes Linux ISOs with the magnet link generator URI in release notes." },
          { who: "Researcher in Boston, MA", how: "Shares public datasets via magnet links on academic mailing lists." },
          { who: "Indie game dev in Seattle, WA", how: "Uses the torrent magnet link generator for free demo distribution." },
          { who: "Archivist in Austin, TX", how: "Generates magnet URIs for the Internet Archive collection mirrors." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free magnet link generator — how it works",
          paragraphs: [
            "This free magnet link generator runs entirely in your browser. Fill the input above and the Magnet Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable magnet link generator.",
            "Pair this magnet link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a magnet link generator",
          paragraphs: [
            "Use the magnet link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The magnet link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "magnet link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free magnet link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the magnet link generator",
          paragraphs: [
            "Combine the magnet link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"Magnet Link Generator FAQ"} />

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
