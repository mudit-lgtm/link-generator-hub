import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type Tool = {
  to: string;
  label: string;
  short: string;
  icon: string;
  blurb: string;
};

// Homepage = Premium Link Generator (highest volume / lowest KD)
// Inner pages = the other 9 generators
export const HOME: Tool = {
  to: "/",
  label: "Premium Link Generator",
  short: "Premium Link",
  icon: "★",
  blurb:
    "Free Rapidgator, Turbobit, Nitroflare, Filejoker, K2S & 8 more premium link generator.",
};

export const TOOLS: Tool[] = [
  {
    to: "/whatsapp-link-generator",
    label: "WhatsApp Link Generator",
    short: "WhatsApp Link",
    icon: "💬",
    blurb: "wa.me click-to-chat link + free QR code with prefilled message.",
  },
  {
    to: "/google-review-link-generator",
    label: "Google Review Link Generator",
    short: "Google Review Link",
    icon: "⭐",
    blurb: "Google My Business review link with 5-star prefill for local SEO.",
  },
  {
    to: "/mailto-link-generator",
    label: "Mailto Link Generator",
    short: "Mailto Link",
    icon: "✉️",
    blurb: "HTML mailto link with subject, body, CC and BCC.",
  },
  {
    to: "/google-maps-link-generator",
    label: "Google Maps Link Generator",
    short: "Google Maps Link",
    icon: "📍",
    blurb: "Google Maps & directions link from address, lat/lng or Place ID.",
  },
  {
    to: "/add-to-calendar-link-generator",
    label: "Add to Calendar Link Generator",
    short: "Calendar Link",
    icon: "📅",
    blurb: "Google, Outlook, Yahoo & .ics add-to-calendar event links.",
  },
  {
    to: "/affiliate-link-generator",
    label: "Affiliate Link Generator",
    short: "Affiliate Link",
    icon: "🔗",
    blurb: "Amazon, AliExpress & custom affiliate link generator with your tag.",
  },
  {
    to: "/referral-link-generator",
    label: "Referral Link Generator",
    short: "Referral Link",
    icon: "🎁",
    blurb: "Custom referral & invite link generator with tracking codes.",
  },
  {
    to: "/slug-generator",
    label: "SEO URL Slug Generator",
    short: "SEO Slug",
    icon: "🔡",
    blurb: "Clean WordPress-friendly permalink and SEO URL slug generator.",
  },
  {
    to: "/rickroll-link-generator",
    label: "Rick Roll Link Generator",
    short: "Rickroll Link",
    icon: "🎵",
    blurb: "Custom rickroll, prank and fake link generator for friends.",
  },
];

export const ALL_TOOLS: Tool[] = [HOME, ...TOOLS];

export function ToolLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="font-bold tracking-tight text-lg">
            LinkKit<span className="text-primary">.</span>
          </Link>
          <nav className="hidden lg:flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground font-medium" }}>
              Premium Link Generator
            </Link>
            {TOOLS.slice(0, 5).map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground font-medium" }}
              >
                {t.short}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            All free link generators
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {ALL_TOOLS.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.icon} {t.label}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} LinkKit — Free utility link generators for marketers, developers and businesses in the USA and worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function IconToolGrid({ tools = TOOLS, heading }: { tools?: Tool[]; heading?: string }) {
  return (
    <section className="mt-12">
      {heading && <h2 className="text-2xl font-bold mb-4">{heading}</h2>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group block rounded-xl border border-border bg-card p-5 hover:border-primary/60 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none" aria-hidden="true">{t.icon}</span>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm md:text-base">
                  {t.label}
                </h3>
                <p className="text-xs text-muted-foreground leading-snug mt-1">{t.blurb}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function BackToHomeLink() {
  return (
    <p className="mt-10 text-sm text-muted-foreground">
      Looking for a{" "}
      <Link to="/" className="text-primary font-medium hover:underline">
        Premium Link Generator
      </Link>{" "}
      for Rapidgator, Turbobit, Nitroflare, Filejoker, Keep2Share and more? It's our flagship free tool on the home page.
    </p>
  );
}
