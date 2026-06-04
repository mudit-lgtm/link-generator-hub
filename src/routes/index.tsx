import { createFileRoute, Link } from "@tanstack/react-router";
import { ToolLayout, TOOLS } from "@/components/ToolLayout";

const DESCRIPTIONS: Record<string, string> = {
  "/premium-link-generator": "Generate premium download links for Rapidgator, Turbobit, Filejoker, Nitroflare and more.",
  "/add-to-calendar-link-generator": "Create Google, Outlook, Yahoo, and iCal add-to-calendar links for any event.",
  "/rickroll-link-generator": "Make custom rickroll, prank, and fake links to share with friends.",
  "/mailto-link-generator": "Build mailto: links with subject, body, CC, BCC, and copy-ready HTML.",
  "/google-maps-link-generator": "Create Google Maps and directions links from any address or Place ID.",
  "/whatsapp-link-generator": "Generate wa.me links with prefilled messages and a downloadable QR code.",
  "/slug-generator": "Convert any title into a clean, SEO-friendly URL slug instantly.",
  "/affiliate-link-generator": "Build Amazon, AliExpress, and custom affiliate links with your tracking tag.",
  "/referral-link-generator": "Create branded referral links with custom codes and UTM tracking.",
  "/google-review-link-generator": "Generate a direct Google review link (with optional 5-star prefill) for any business.",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LinkKit — Free Link Generator Tools for the Web" },
      {
        name: "description",
        content:
          "Free, fast utility tools: premium link, mailto, WhatsApp, Google Maps, calendar, slug, affiliate, referral, and Google review link generators.",
      },
      { property: "og:title", content: "LinkKit — Free Link Generator Tools" },
      { property: "og:description", content: "10 focused link generators for developers, marketers, and businesses." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "LinkKit",
          url: "/",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ToolLayout>
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Free link generator tools
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Ten focused utilities for developers, marketers, and business owners.
          No signup, no tracking, instant copy.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {TOOLS.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="block rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all"
          >
            <h2 className="font-semibold text-foreground mb-1">{t.label} Generator</h2>
            <p className="text-sm text-muted-foreground leading-snug">{DESCRIPTIONS[t.to]}</p>
          </Link>
        ))}
      </div>
    </ToolLayout>
  );
}
