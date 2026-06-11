import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";

export type Tool = {
  to: string;
  label: string;
  short: string;
  icon: string;
  blurb: string;
  accent?: string;
};

export const HUB: Tool = {
  to: "/",
  label: "Link Generator",
  short: "Link Generator Hub",
  icon: "🔗",
  blurb: "Free link generator hub — every utility URL tool in one place.",
  accent: "from-orange-400 to-pink-500",
};

export const TOOLS: Tool[] = [
  { to: "/premium-link-generator", label: "Premium Link Generator", short: "Premium Link", icon: "★",
    blurb: "Rapidgator, Turbobit, Nitroflare, Filejoker, K2S & 8 more hosts.", accent: "from-amber-400 to-orange-500" },
  { to: "/short-link-generator", label: "Short Link Generator", short: "Short Link", icon: "✂️",
    blurb: "Free short link & tiny URL generator with custom alias.", accent: "from-cyan-400 to-sky-500" },
  { to: "/qr-code-link-generator", label: "QR Code Link Generator", short: "QR Code Link", icon: "▦",
    blurb: "Convert any link to a downloadable QR code PNG.", accent: "from-slate-700 to-slate-900" },
  { to: "/utm-link-generator", label: "UTM Link Generator", short: "UTM Builder", icon: "📊",
    blurb: "Build Google Analytics UTM campaign tracking links.", accent: "from-violet-400 to-indigo-500" },
  { to: "/youtube-link-generator", label: "YouTube Link Generator", short: "YouTube", icon: "▶️",
    blurb: "Subscribe, auto-subscribe & timestamped YouTube links.", accent: "from-red-500 to-rose-500" },
  { to: "/whatsapp-link-generator", label: "WhatsApp Link Generator", short: "WhatsApp Link", icon: "💬",
    blurb: "wa.me click-to-chat link with prefilled message & QR.", accent: "from-green-400 to-emerald-500" },
  { to: "/google-review-link-generator", label: "Google Review Link Generator", short: "Google Review", icon: "⭐",
    blurb: "Google Business 5-star review link for local SEO.", accent: "from-yellow-400 to-amber-500" },
  { to: "/mailto-link-generator", label: "Mailto Link Generator", short: "Mailto", icon: "✉️",
    blurb: "HTML mailto link with subject, body, CC and BCC.", accent: "from-sky-400 to-blue-500" },
  { to: "/google-maps-link-generator", label: "Google Maps Link Generator", short: "Maps", icon: "📍",
    blurb: "Maps & directions link from address, lat/lng or Place ID.", accent: "from-rose-400 to-red-500" },
  { to: "/add-to-calendar-link-generator", label: "Add to Calendar Link Generator", short: "Calendar", icon: "📅",
    blurb: "Google, Outlook, Yahoo & .ics add-to-calendar links.", accent: "from-purple-400 to-fuchsia-500" },
  { to: "/affiliate-link-generator", label: "Affiliate Link Generator", short: "Affiliate", icon: "🛒",
    blurb: "Amazon, AliExpress & custom affiliate links with your tag.", accent: "from-orange-400 to-rose-500" },
  { to: "/referral-link-generator", label: "Referral Link Generator", short: "Referral", icon: "🎁",
    blurb: "Custom referral & invite links with tracking codes.", accent: "from-pink-400 to-fuchsia-500" },
  { to: "/slug-generator", label: "SEO URL Slug Generator", short: "SEO Slug", icon: "🔡",
    blurb: "Clean WordPress-friendly permalinks & SEO URL slugs.", accent: "from-teal-400 to-cyan-500" },
  { to: "/rickroll-link-generator", label: "Rick Roll Link Generator", short: "Rickroll", icon: "🎵",
    blurb: "Custom rickroll, prank and fake link generator.", accent: "from-indigo-400 to-purple-500" },
];

export const ALL_TOOLS: Tool[] = [HUB, ...TOOLS];

function BrandMark() {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-sunset text-white font-display font-extrabold text-base shadow-warm">K</span>
      <span className="font-display font-extrabold tracking-tight text-xl">
        <span className="text-gradient-sunset">Link</span><span className="text-foreground">Kit</span>
      </span>
    </span>
  );
}

function ToolsDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
        className="text-sm font-semibold text-foreground hover:text-primary transition flex items-center gap-1"
        aria-expanded={open}
      >
        Tools <span className="text-xs">▾</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-[28rem] max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-warm z-30 p-3 grid grid-cols-2 gap-1">
          {TOOLS.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              onClick={() => setOpen(false)}
              className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent transition"
            >
              <span aria-hidden className={`flex-shrink-0 w-7 h-7 rounded-md grid place-items-center text-sm bg-gradient-to-br ${t.accent ?? "from-orange-400 to-pink-500"} text-white`}>{t.icon}</span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold text-foreground leading-tight">{t.label}</span>
                <span className="block text-[11px] text-muted-foreground leading-snug line-clamp-1">{t.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function ToolLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-card/85 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center" aria-label="LinkKit home">
            <BrandMark />
          </Link>
          <nav className="flex items-center gap-5">
            <Link to="/" activeOptions={{ exact: true }} className="hidden sm:inline text-sm font-semibold text-foreground hover:text-primary transition" activeProps={{ className: "text-primary" }}>
              Hub
            </Link>
            <Link to="/premium-link-generator" className="hidden md:inline text-sm font-semibold text-foreground hover:text-primary transition" activeProps={{ className: "text-primary" }}>
              Premium
            </Link>
            <Link to="/short-link-generator" className="hidden md:inline text-sm font-semibold text-foreground hover:text-primary transition" activeProps={{ className: "text-primary" }}>
              Short Link
            </Link>
            <ToolsDropdown />
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>
      <footer className="border-t border-border/60 mt-20 bg-card/60">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <BrandMark />
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Free, premium-quality link generators for marketers, developers and businesses across the USA. No signup, no tracking, no limits.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-3">Marketing</p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/whatsapp-link-generator" className="text-foreground/70 hover:text-primary">WhatsApp Link</Link></li>
                <li><Link to="/google-review-link-generator" className="text-foreground/70 hover:text-primary">Google Review Link</Link></li>
                <li><Link to="/mailto-link-generator" className="text-foreground/70 hover:text-primary">Mailto Link</Link></li>
                <li><Link to="/utm-link-generator" className="text-foreground/70 hover:text-primary">UTM Builder</Link></li>
                <li><Link to="/affiliate-link-generator" className="text-foreground/70 hover:text-primary">Affiliate Link</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-3">Utility</p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/short-link-generator" className="text-foreground/70 hover:text-primary">Short Link</Link></li>
                <li><Link to="/qr-code-link-generator" className="text-foreground/70 hover:text-primary">QR Code Link</Link></li>
                <li><Link to="/google-maps-link-generator" className="text-foreground/70 hover:text-primary">Google Maps Link</Link></li>
                <li><Link to="/add-to-calendar-link-generator" className="text-foreground/70 hover:text-primary">Add to Calendar</Link></li>
                <li><Link to="/slug-generator" className="text-foreground/70 hover:text-primary">SEO URL Slug</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground mb-3">Power</p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/premium-link-generator" className="text-foreground/70 hover:text-primary">Premium Link</Link></li>
                <li><Link to="/youtube-link-generator" className="text-foreground/70 hover:text-primary">YouTube Link</Link></li>
                <li><Link to="/referral-link-generator" className="text-foreground/70 hover:text-primary">Referral Link</Link></li>
                <li><Link to="/rickroll-link-generator" className="text-foreground/70 hover:text-primary">Rick Roll Link</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/60 pt-6 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} LinkKit. Free utility link generators for the USA.</p>
            <p className="text-xs text-muted-foreground">Built for marketers, developers & small business owners.</p>
          </div>
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
            className="animate-fade-up group block rounded-2xl border border-border bg-card p-4 hover:border-primary hover:shadow-warm hover:-translate-y-0.5 transition-all"
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

export function BackToHomeLink() {
  return (
    <p className="mt-10 text-sm text-foreground/80">
      Need more URL tools? Explore the full{" "}
      <Link to="/" className="text-primary font-semibold hover:underline">Link Generator</Link>{" "}
      hub, or grab a free{" "}
      <Link to="/premium-link-generator" className="text-primary font-semibold hover:underline">Premium Link Generator</Link>{" "}
      for Rapidgator, Turbobit, Nitroflare and 9 more file hosts.
    </p>
  );
}
