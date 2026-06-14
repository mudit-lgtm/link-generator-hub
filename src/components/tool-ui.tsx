import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";


export { BackToHomeLink } from "./ToolLayout";

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        if (!value) return;
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="px-3 py-1.5 rounded-md bg-gradient-sunset text-primary-foreground text-xs font-semibold shadow-warm hover:opacity-90 disabled:opacity-40 transition"
      disabled={!value}
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

export function OutputBlock({ value, multiline = false }: { value: string; multiline?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-accent/40 p-3 flex items-start justify-between gap-3">
      <code className={`text-xs break-all ${multiline ? "whitespace-pre-wrap" : ""} flex-1 font-mono text-foreground`}>
        {value || <span className="text-muted-foreground">Output will appear here</span>}
      </code>
      <CopyButton value={value} />
    </div>
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-1.5 text-foreground">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted-foreground mt-1">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition";

/* -----------------------------------------------------------
 * Keyword highlighting (auto-bold)
 * --------------------------------------------------------- */
function highlight(text: string, keywords?: string[]): ReactNode {
  if (!keywords || keywords.length === 0) return text;
  // Sort longest-first to prefer multi-word matches.
  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "ig");
  const parts = text.split(re);
  return parts.map((p, i) =>
    re.test(p) ? <strong key={i} className="kw">{p}</strong> : <span key={i}>{p}</span>,
  );
}

export function FaqSection({ items, heading = "Frequently asked questions", keywords }: { items: { q: string; a: string }[]; heading?: string; keywords?: string[] }) {
  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mb-5 text-gradient-sunset">{heading}</h2>
      <div className="space-y-3">
        {items.map((it) => (
          <details key={it.q} className="rounded-xl border border-border bg-card p-4 group shadow-card">
            <summary className="cursor-pointer font-semibold text-sm md:text-base list-none flex justify-between items-center gap-3">
              <span>{highlight(it.q, keywords)}</span>
              <span className="text-primary group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">{highlight(it.a, keywords)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ToolHero({ h1, intro, keywords, eyebrow }: { h1: string; intro: string; keywords?: string[]; eyebrow?: string }) {
  return (
    <div className="mb-8 animate-fade-up">
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-accent rounded-full px-3 py-1 mb-3">
          {eyebrow}
        </span>
      )}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
        <span className="text-gradient-sunset">{h1}</span>
      </h1>
      <p className="text-foreground/80 leading-relaxed text-base md:text-lg">{highlight(intro, keywords)}</p>
    </div>
  );
}

export function ToolCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-warm space-y-4 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-sunset" aria-hidden />
      {children}
    </div>
  );
}

export function HowToUse({ steps, heading = "How to use" }: { steps: string[]; heading?: string }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{heading}</h2>
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-sunset text-white text-xs font-bold grid place-items-center">{i + 1}</span>
            <span className="text-sm md:text-base text-foreground/85 leading-relaxed pt-0.5">{s}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export type SeoSection = { h2: string; paragraphs: string[]; bullets?: string[] };

export function SeoLongform({ sections, keywords }: { sections: SeoSection[]; keywords?: string[] }) {
  return (
    <article className="mt-14">
      {sections.map((s, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-foreground">{highlight(s.h2, keywords)}</h2>
          {s.paragraphs.map((p, j) => (
            <p key={j} className="text-sm md:text-base text-foreground/80 leading-relaxed mb-3">
              {highlight(p, keywords)}
            </p>
          ))}
          {s.bullets && (
            <ul className="list-disc list-inside text-sm md:text-base text-foreground/80 space-y-1">
              {s.bullets.map((b, k) => <li key={k}>{highlight(b, keywords)}</li>)}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}

/* AEO direct-answer block (≤55 words, optimized for AI Overviews / featured snippets) */
export function AeoBlock({ question, answer, keywords }: { question: string; answer: string; keywords?: string[] }) {
  return (
    <section className="mt-10 rounded-2xl border border-primary/30 bg-accent/40 p-5 md:p-6 relative">
      <span className="absolute -top-3 left-4 text-[10px] font-bold uppercase tracking-widest bg-gradient-sunset text-white px-2 py-0.5 rounded-md">
        Direct answer
      </span>
      <h2 className="text-lg md:text-xl font-bold mb-2">{question}</h2>
      <p className="text-sm md:text-base text-foreground/90 leading-relaxed">{highlight(answer, keywords)}</p>
    </section>
  );
}

/* GEO (Generative Engine / local) block — US business-context examples */
export function GeoBlock({ heading = "Real-world USA use cases", items, keywords }: { heading?: string; items: { who: string; how: string }[]; keywords?: string[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{heading}</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <p className="font-semibold text-foreground text-sm md:text-base mb-1">{it.who}</p>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{highlight(it.how, keywords)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContextualLinks({ heading = "Related link generators", links }: { heading?: string; links: { to: string; anchor: string; blurb: string }[] }) {
  return (
    <section className="mt-12 rounded-2xl border border-border bg-card p-5 md:p-6 shadow-card">
      <h2 className="text-lg md:text-xl font-bold mb-3">{heading}</h2>
      <ul className="space-y-2 text-sm md:text-base">
        {links.map((l) => (
          <li key={l.to + l.anchor}>
            <Link to={l.to} className="text-primary font-semibold hover:underline">{l.anchor}</Link>
            <span className="text-muted-foreground"> — {l.blurb}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Breadcrumbs({ trail }: { trail: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
      <ol className="flex flex-wrap gap-1">
        {trail.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {c.to ? (
              <Link to={c.to} className="hover:text-primary hover:underline">{c.label}</Link>
            ) : (
              <span className="text-foreground font-medium">{c.label}</span>
            )}
            {i < trail.length - 1 && <span>›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type Faq = { q: string; a: string };

export function buildSchemas({ name, description, url, faqs, breadcrumbs, extra }: {
  name: string; description: string; url: string; faqs: Faq[];
  breadcrumbs?: { name: string; item: string }[];
  extra?: object[];
}) {
  const out: { type: string; children: string }[] = [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name, description,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        url,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "184" },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name, description, url,
      }),
    },
  ];
  if (breadcrumbs?.length) {
    out.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem", position: i + 1, name: b.name, item: b.item,
        })),
      }),
    });
  }
  if (extra) {
    for (const e of extra) {
      out.push({ type: "application/ld+json", children: JSON.stringify(e) });
    }
  }
  return out;
}

export function buildHead({ title, description, path, faqs, name, breadcrumbs, extraSchemas }: {
  title: string; description: string; path: string; faqs: Faq[]; name: string;
  breadcrumbs?: { name: string; item: string }[];
  extraSchemas?: object[];
}) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: path },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: buildSchemas({ name, description, url: path, faqs, breadcrumbs, extra: extraSchemas }),
  };
}
