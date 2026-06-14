import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";


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

  { to: "/discord-invite-link-generator", label: "Discord Invite Link Generator", short: "Discord Invite", icon: "🟣",
    blurb: "Custom Discord server invite links with vanity codes.", accent: "from-indigo-500 to-purple-600" },
  { to: "/zoom-meeting-link-generator", label: "Zoom Meeting Link Generator", short: "Zoom Link", icon: "🎥",
    blurb: "Build shareable Zoom meeting join links.", accent: "from-blue-400 to-sky-600" },
  { to: "/google-meet-link-generator", label: "Google Meet Link Generator", short: "Google Meet", icon: "📹",
    blurb: "Generate meet.google.com instant meeting links.", accent: "from-emerald-400 to-green-600" },
  { to: "/teams-meeting-link-generator", label: "Microsoft Teams Link Generator", short: "Teams Link", icon: "💠",
    blurb: "Microsoft Teams meeting & join URL builder.", accent: "from-blue-500 to-indigo-600" },
  { to: "/payment-link-generator", label: "Payment Link Generator", short: "Payment Link", icon: "💳",
    blurb: "Build hosted Stripe-style payment request links.", accent: "from-emerald-500 to-teal-600" },
  { to: "/paypal-me-link-generator", label: "PayPal.Me Link Generator", short: "PayPal.Me", icon: "🅿️",
    blurb: "Custom PayPal.Me payment request URLs.", accent: "from-sky-500 to-blue-700" },
  { to: "/instagram-link-generator", label: "Instagram Link Generator", short: "Instagram", icon: "📸",
    blurb: "Profile, DM and story-share Instagram URLs.", accent: "from-fuchsia-500 to-pink-600" },
  { to: "/facebook-share-link-generator", label: "Facebook Share Link Generator", short: "FB Share", icon: "👥",
    blurb: "Facebook share dialog URLs for any page.", accent: "from-blue-600 to-indigo-700" },
  { to: "/telegram-link-generator", label: "Telegram Link Generator", short: "Telegram", icon: "✈️",
    blurb: "t.me channel, group & bot invite URLs.", accent: "from-sky-400 to-cyan-600" },
  { to: "/linkedin-link-generator", label: "LinkedIn Link Generator", short: "LinkedIn", icon: "in",
    blurb: "Profile, company & share LinkedIn URLs.", accent: "from-blue-700 to-sky-700" },
  { to: "/google-drive-direct-link-generator", label: "Google Drive Direct Link Generator", short: "Drive Direct", icon: "📁",
    blurb: "Convert Google Drive shares to direct downloads.", accent: "from-yellow-400 to-amber-600" },
  { to: "/dropbox-direct-link-generator", label: "Dropbox Direct Link Generator", short: "Dropbox Direct", icon: "📦",
    blurb: "Convert Dropbox shares to direct downloads.", accent: "from-blue-500 to-indigo-600" },
  { to: "/onedrive-direct-link-generator", label: "OneDrive Direct Link Generator", short: "OneDrive Direct", icon: "☁️",
    blurb: "Convert OneDrive shares to direct downloads.", accent: "from-sky-500 to-blue-600" },
  { to: "/mega-link-generator", label: "MEGA Link Generator", short: "MEGA Link", icon: "🅼",
    blurb: "MEGA.nz share & folder link formatter.", accent: "from-red-500 to-rose-600" },
  { to: "/pdf-link-generator", label: "PDF Link Generator", short: "PDF Link", icon: "📄",
    blurb: "Build direct download links for PDF files.", accent: "from-rose-500 to-red-600" },
  { to: "/image-link-generator", label: "Image Link Generator", short: "Image Link", icon: "🖼️",
    blurb: "Direct image hotlink & share URL builder.", accent: "from-pink-400 to-fuchsia-600" },
  { to: "/audio-link-generator", label: "Audio Link Generator", short: "Audio Link", icon: "🎵",
    blurb: "MP3 & podcast direct download URLs.", accent: "from-purple-500 to-pink-600" },
  { to: "/video-link-generator", label: "Video Link Generator", short: "Video Link", icon: "🎬",
    blurb: "Direct MP4 / video share URL builder.", accent: "from-red-500 to-orange-600" },
  { to: "/magnet-link-generator", label: "Magnet Link Generator", short: "Magnet", icon: "🧲",
    blurb: "Build magnet URIs from BitTorrent info hashes.", accent: "from-zinc-500 to-slate-700" },
  { to: "/direct-download-link-generator", label: "Direct Download Link Generator", short: "Direct Download", icon: "⬇️",
    blurb: "Force-download URLs for any hosted file.", accent: "from-emerald-500 to-green-700" },
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

const MENU_GROUPS: { title: string; tools: Tool[] }[] = [
  {
    title: "Marketing & Tracking",
    tools: TOOLS.filter((t) => ["/utm-link-generator","/affiliate-link-generator","/referral-link-generator","/short-link-generator","/qr-code-link-generator","/slug-generator","/google-review-link-generator"].includes(t.to)),
  },
  {
    title: "Social & Messaging",
    tools: TOOLS.filter((t) => ["/whatsapp-link-generator","/mailto-link-generator","/instagram-link-generator","/facebook-share-link-generator","/telegram-link-generator","/linkedin-link-generator","/discord-invite-link-generator","/youtube-link-generator"].includes(t.to)),
  },
  {
    title: "Meetings & Payments",
    tools: TOOLS.filter((t) => ["/zoom-meeting-link-generator","/google-meet-link-generator","/teams-meeting-link-generator","/add-to-calendar-link-generator","/google-maps-link-generator","/payment-link-generator","/paypal-me-link-generator"].includes(t.to)),
  },
  {
    title: "Files & Downloads",
    tools: TOOLS.filter((t) => ["/google-drive-direct-link-generator","/dropbox-direct-link-generator","/onedrive-direct-link-generator","/mega-link-generator","/premium-link-generator","/pdf-link-generator","/image-link-generator","/audio-link-generator","/video-link-generator","/magnet-link-generator","/direct-download-link-generator","/rickroll-link-generator"].includes(t.to)),
  },
];

function MegaMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => { if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; } };
  const scheduleClose = () => { cancelClose(); closeTimer.current = setTimeout(() => setOpen(false), 180); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="static" onMouseEnter={() => { cancelClose(); setOpen(true); }} onMouseLeave={scheduleClose}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-sm font-semibold text-foreground hover:text-primary transition flex items-center gap-1"
        aria-expanded={open}
        aria-haspopup="true"
      >
        All Tools <span className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div
          className="absolute left-0 right-0 top-full w-full z-40"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {/* hover bridge */}
          <div className="h-2" />
          <div className="bg-card border-y border-border shadow-warm">
            <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              {MENU_GROUPS.map((g) => (
                <div key={g.title}>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-3">{g.title}</p>
                  <ul className="space-y-1.5">
                    {g.tools.map((t) => (
                      <li key={t.to}>
                        <Link
                          to={t.to}
                          onClick={() => setOpen(false)}
                          className="flex items-start gap-2 p-1.5 rounded-md hover:bg-accent transition group"
                        >
                          <span aria-hidden className={`flex-shrink-0 w-6 h-6 rounded grid place-items-center text-xs bg-gradient-to-br ${t.accent ?? "from-orange-400 to-pink-500"} text-white`}>{t.icon}</span>
                          <span className="text-xs font-semibold text-foreground leading-tight group-hover:text-primary">{t.short}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ToolLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-card/85 backdrop-blur-md sticky top-0 z-30 relative">
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
            <MegaMenu />
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
