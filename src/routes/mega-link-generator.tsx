import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/mega-link-generator"].keywords;

const FAQS = [
  { q: "What is a mega link generator?", a: "A MEGA link generator builds mega.nz/file/{id}#{key} or mega.nz/folder/{id}#{key} URLs with the embedded decryption key. The free MEGA link generator above is perfect for sharing large files, indie game assets and archived projects." },
  { q: "How do I use this mega link generator?", a: "Fill the field above and the MEGA Link Generator builds the URL instantly. Copy it and paste it anywhere — email, SMS, social bios, QR codes or invoices. The mega link generator runs entirely in your browser; no signup required." },
  { q: "Is the mega link generator free?", a: "Yes, this mega link generator is 100% free with no signup, no rate limits and no tracking. It works on desktop, iPhone, Android and tablets." },
  { q: "Does the mega link generator work on mobile?", a: "Yes — the mega link generator is fully responsive. Use it on iPhone, Android, iPad or any mobile browser to generate links on the go." },
  { q: "Can I use the mega link generator for commercial projects?", a: "Yes. Output from the mega link generator is free for personal and commercial use — client work, agency campaigns, e-commerce stores and SaaS products." },
  { q: "Does the mega link generator store my data?", a: "No. The mega link generator runs entirely in your browser. Your input is never sent to a server, never logged and never shared." },
  { q: "What's the difference between the mega link generator and a paid tool?", a: "Paid tools add analytics, custom domains and team features. For most one-off needs — invoices, SMS blasts, social posts — the free mega link generator above is enough." },
  { q: "Can I shorten the output of the mega link generator?", a: "Yes — paste the URL from the mega link generator into our short link generator for a tiny shareable alias, or send it through the QR code link generator for offline use." }
];

const TITLE = "MEGA Link Generator — Free MEGA.nz Share URL Builder";
const DESC = "Free MEGA link generator. Format mega.nz file and folder share links with embedded decryption keys — perfect for archive sharing and large-file delivery.";

export const Route = createFileRoute("/mega-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/mega-link-generator",
    name: "MEGA Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "MEGA Link Generator", item: "/mega-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [value, setValue] = useState("ABC123DEF");
  const [key, setKey] = useState("XYZ987DECRYPTIONKEY");
  const out = useMemo(() => {
    if (!value.trim()) return "";
    return `https://mega.nz/file/${value.trim()}#${encodeURIComponent(key.trim())}`;
  }, [value, key]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "MEGA Link Generator" }]} />
      <ToolHero
        h1={"MEGA Link Generator — Free MEGA.nz Share URL Builder"}
        intro={"Generate a mega link generator URL in one click. This free MEGA Link Generator works on desktop and mobile — no signup, no limits. Build branded URLs for email, SMS, social bios, QR codes and invoices in seconds."}
        keywords={KW}
      />

      <ToolCard>
        <Field label="MEGA file ID">
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <Field label="Decryption key (#key)">
          <input className={inputCls} value={key} onChange={(e) => setKey(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your mega link generator URL</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>

      <HowToUse
        heading={"How to use the mega link generator"}
        steps={[
          "Fill the field above with your mega file id.",
          "The mega link generator builds the URL instantly as you type.",
          "Copy the result with one click.",
          "Paste it in email, SMS, social bios, QR codes, invoices or anywhere a link works."
        ]}
      />

      <AeoBlock
        question={"What is a MEGA link generator?"}
        answer={"A MEGA link generator builds mega.nz/file/{id}#{key} or mega.nz/folder/{id}#{key} URLs with the embedded decryption key. The free MEGA link generator above is perfect for sharing large files, indie game assets and archived projects."}
        keywords={KW}
      />

      <GeoBlock
        heading={"MEGA Link Generator — USA business use cases"}
        keywords={KW}
        items={[
          { who: "Open-source maintainer in Austin, TX", how: "Hosts large nightly builds on MEGA and shares the mega.nz link in release notes." },
          { who: "YouTuber in Los Angeles, CA", how: "Uses the MEGA link generator for project files attached to tutorials." },
          { who: "Indie game dev in Seattle, WA", how: "Drops MEGA folder links in itch.io devlogs for asset packs." },
          { who: "Music producer in Brooklyn, NY", how: "Sends MEGA share links to collaborators for stems and project sessions." }
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free mega link generator — how it works",
          paragraphs: [
            "This free mega link generator runs entirely in your browser. Fill the input above and the MEGA Link Generator builds your URL instantly, ready to copy. No signup, no rate limits, no tracking. Built for marketers, creators, freelancers and small business owners across the USA who need a quick, reliable mega link generator.",
            "Pair this mega link generator with our short link generator, QR code link generator and UTM link generator for a complete link-marketing stack."
          ],
        },
        {
          h2: "When to use a mega link generator",
          paragraphs: [
            "Use the mega link generator any time you need a clean, predictable URL. Common scenarios include email campaigns, SMS blasts, Instagram bios, Twitter/X posts, LinkedIn DMs, QR codes printed on packaging, invoice CTAs and customer onboarding flows. The mega link generator guarantees the URL is encoded correctly and works across browsers, devices and email clients."
          ],
        },
        {
          h2: "mega link generator vs paid alternatives",
          paragraphs: [
            "Paid SaaS tools add analytics dashboards, custom domains and team seats. For one-off needs — a single Instagram bio link, an SMS reminder, a QR code on a flyer — the free mega link generator above is enough. Save the paid tools for high-volume tracked campaigns where attribution matters."
          ],
        },
        {
          h2: "Tips to get more from the mega link generator",
          paragraphs: [
            "Combine the mega link generator with a UTM builder to attribute traffic in Google Analytics, then shrink the result with the short link generator for SMS-friendly length. For offline campaigns, send the final URL through the QR code link generator and print it on packaging, table tents or business cards."
          ],
        }
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading={"MEGA Link Generator FAQ"} />

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
