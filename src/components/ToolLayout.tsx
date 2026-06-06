import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type Tool = {
  to: string;
  label: string;
  short: string;
  icon: string;
  blurb: string;
  accent?: string; // tailwind class for icon chip tint
};

// Homepage = General Link Generator hub (pillar page).
export const HUB: Tool = {
  to: "/",
  label: "Link Generator",
  short: "Link Generator Hub",
  icon: "🔗",
  blurb: "Free link generator hub — every utility URL tool in one place.",
  accent: "from-orange-400 to-pink-500",
};

export const TOOLS: Tool[] = [
  {
    to: "/premium-link-generator",
    label: "Premium Link Generator",
    short: "Premium Link",
    icon: "★",
    blurb: "Rapidgator, Turbobit, Nitroflare, Filejoker, K2S & 8 more hosts.",
    accent: "from-amber-400 to-orange-500",
  },
  {
    to: "/whatsapp-link-generator",
    label: "WhatsApp Link Generator",
    short: "WhatsApp Link",
    icon: "💬",
    blurb: "wa.me click-to-chat link with prefilled message & QR code.",
    accent: "from-green-400 to-emerald-500",
  },
  {
    to: "/google-review-link-generator",
    label: "Google Review Link Generator",
    short: "Google Review",
    icon: "⭐",
    blurb: "Google Business 5-star review link for local SEO.",
    accent: "from-yellow-400 to-amber-500",
  },
  {
    to: "/mailto-link-generator",
    label: "Mailto Link Generator",
    short: "Mailto",
    icon: "✉️",
    blurb: "HTML mailto link with subject, body, CC and BCC.",
    accent: "from-sky-400 to-blue-500",
  },
  {
    to: "/google-maps-link-generator",
    label: "Google Maps Link Generator",
    short: "Maps",
    icon: "📍",
    blurb: "Maps & directions link from address, lat/lng or Place ID.",
    accent: "from-rose-400 to-red-500",
  },
  {
    to: "/add-to-calendar-link-generator",
    label: "Add to Calendar Link Generator",
    short: "Calendar",
    icon: "📅",
    blurb: "Google, Outlook, Yahoo & .ics add-to-calendar links.",
    accent: "from-purple-400 to-fuchsia-500",
  },
  {
    to: "/affiliate-link-generator",
    label: "Affiliate Link Generator",
    short: "Affiliate",
    icon: "🔗",
    blurb: "Amazon, AliExpress & custom affiliate links with your tag.",
    accent: "from-orange-400 to-rose-500",
  },
  {
    to: "/referral-link-generator",
    label: "Referral Link Generator",
    short: "Referral",
    icon: "🎁",
    blurb: "Custom referral & invite links with tracking codes.",
    accent: "from-pink-400 to-fuchsia-500",
  },
  {
    to: "/slug-generator",
    label: "SEO URL Slug Generator",
    short: "SEO Slug",
    icon: "🔡",
    blurb: "Clean WordPress-friendly permalinks & SEO URL slugs.",
    accent: "from-teal-400 to-cyan-500",
  },
  {
    to: "/rickroll-link-generator",
    label: "Rick Roll Link Generator",
    short: "Rickroll",
    icon: "🎵",
    blurb: "Custom rickroll, prank and fake link generator.",
    accent: "from-indigo-400 to-purple-500",
  },
];

export const ALL_TOOLS: Tool[] = [HUB, ...TOOLS];

export function ToolLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-card/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="font-display font-extrabold tracking-tight text-xl">
            <span className="text-gradient-sunset">LinkKit</span>
          </Link>
          <nav className="hidden lg:flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-muted-foreground">
            <Link to="/" activeOptions={{ exact: true }} className="hover:text-primary transition" activeProps={{ className: "text-primary font-semibold" }}>
              Link Generator Hub
            </Link>
            {TOOLS.slice(0, 6).map((t) => (
              <Link key={t.to} to={t.to} className="hover:text-primary transition"
                activeProps={{ className: "text-primary font-semibold" }}>
                {t.short}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>
      <footer className="border-t border-border/60 mt-20 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-display font-extrabold text-lg text-gradient-sunset">LinkKit</span>
            <span className="text-xs text-muted-foreground">— free link generators for the web</span>
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            All free link generators
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {ALL_TOOLS.map((t) => (
              <Link key={t.to} to={t.to} className="text-foreground/70 hover:text-primary transition flex items-center gap-2">
                <span aria-hidden>{t.icon}</span>
                {t.label}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            © {new Date().getFullYear()} LinkKit — Free utility link generators for marketers, developers and businesses across the USA.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function IconToolGrid({ tools = TOOLS, heading }: { tools?: Tool[]; heading?: string }) {
  return (
    <section className="mt-12">
      {heading && <h2 className="text-2xl md:text-3xl font-bold mb-5">{heading}</h2>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tools.map((t, i) => (
          <Link
            key={t.to}
            to={t.to}
            style={{ animationDelay: `${i * 40}ms` }}
            className="animate-fade-up group block rounded-2xl border border-border bg-card p-4 hover:border-primary hover:shadow-warm transition-all"
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex-shrink-0 w-11 h-11 rounded-xl grid place-items-center text-xl bg-gradient-to-br ${t.accent ?? "from-orange-400 to-pink-500"} text-white shadow-card`}
                aria-hidden="true"
              >
                {t.icon}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition text-sm md:text-base leading-tight">
                  {t.label}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-snug mt-1">{t.blurb}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* Backwards-compatible export used by existing tool pages.
   Anchors point to the new homepage (Link Generator hub) AND to
   /premium-link-generator using the exact keyword anchor text. */
export function BackToHomeLink() {
  return (
    <p className="mt-10 text-sm text-foreground/80">
      Need more URL tools? Explore the full{" "}
      <Link to="/" className="text-primary font-semibold hover:underline">Link Generator</Link>{" "}
      hub, or grab a free{" "}
      <Link to="/premium-link-generator" className="text-primary font-semibold hover:underline">
        Premium Link Generator
      </Link>{" "}
      for Rapidgator, Turbobit, Nitroflare, Filejoker, Keep2Share and 8 more file hosts.
    </p>
  );
}
