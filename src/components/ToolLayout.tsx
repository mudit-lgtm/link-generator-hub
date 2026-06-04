import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const TOOLS = [
  { to: "/premium-link-generator", label: "Premium Link Generator" },
  { to: "/add-to-calendar-link-generator", label: "Add to Calendar Link" },
  { to: "/rickroll-link-generator", label: "Rickroll Link" },
  { to: "/mailto-link-generator", label: "Mailto Link" },
  { to: "/google-maps-link-generator", label: "Google Maps Link" },
  { to: "/whatsapp-link-generator", label: "WhatsApp Link" },
  { to: "/slug-generator", label: "SEO Slug" },
  { to: "/affiliate-link-generator", label: "Affiliate Link" },
  { to: "/referral-link-generator", label: "Referral Link" },
  { to: "/google-review-link-generator", label: "Google Review Link" },
] as const;

export function ToolLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="font-bold tracking-tight text-lg">
            LinkKit<span className="text-primary">.</span>
          </Link>
          <nav className="hidden md:flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {TOOLS.slice(0, 6).map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground font-medium" }}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            All Tools
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {TOOLS.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.label}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} LinkKit — Free utility tools for the web.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function RelatedTools({ exclude }: { exclude: string }) {
  const others = TOOLS.filter((t) => t.to !== exclude).slice(0, 3);
  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-lg font-semibold mb-3">Related tools</h2>
      <ul className="space-y-1">
        {others.map((t) => (
          <li key={t.to}>
            <Link
              to={t.to}
              className="text-primary hover:underline text-sm"
            >
              → {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
