import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

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
      className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 disabled:opacity-50"
      disabled={!value}
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

export function OutputBlock({ value, multiline = false }: { value: string; multiline?: boolean }) {
  return (
    <div className="rounded-md border border-border bg-muted/40 p-3 flex items-start justify-between gap-3">
      <code className={`text-xs break-all ${multiline ? "whitespace-pre-wrap" : ""} flex-1 font-mono text-foreground`}>
        {value || <span className="text-muted-foreground">Output will appear here</span>}
      </code>
      <CopyButton value={value} />
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted-foreground mt-1">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

export function FaqSection({ items, heading = "Frequently asked questions" }: { items: { q: string; a: string }[]; heading?: string }) {
  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold mb-4">{heading}</h2>
      <div className="space-y-3">
        {items.map((it) => (
          <details
            key={it.q}
            className="rounded-md border border-border bg-card p-4 group"
          >
            <summary className="cursor-pointer font-medium text-sm list-none flex justify-between items-center">
              <span>{it.q}</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ToolHero({
  h1,
  intro,
}: {
  h1: string;
  intro: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{h1}</h1>
      <p className="text-muted-foreground leading-relaxed text-base">{intro}</p>
    </div>
  );
}

export function ToolCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6 shadow-sm space-y-4">
      {children}
    </div>
  );
}

export function HowToUse({ steps, heading = "How to use" }: { steps: string[]; heading?: string }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-3">{heading}</h2>
      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </section>
  );
}

export type SeoSection = { h2: string; paragraphs: string[]; bullets?: string[] };

export function SeoLongform({ sections }: { sections: SeoSection[] }) {
  return (
    <article className="mt-12 prose prose-sm md:prose-base max-w-none">
      {sections.map((s, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-foreground">{s.h2}</h2>
          {s.paragraphs.map((p, j) => (
            <p key={j} className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              {p}
            </p>
          ))}
          {s.bullets && (
            <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1">
              {s.bullets.map((b, k) => <li key={k}>{b}</li>)}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}

export function ContextualLinks({
  heading = "Related link generators",
  links,
}: {
  heading?: string;
  links: { to: string; anchor: string; blurb: string }[];
}) {
  return (
    <section className="mt-10 rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg font-semibold mb-3">{heading}</h2>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-primary font-medium hover:underline">
              {l.anchor}
            </Link>
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
              <Link to={c.to} className="hover:text-foreground hover:underline">{c.label}</Link>
            ) : (
              <span className="text-foreground">{c.label}</span>
            )}
            {i < trail.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type Faq = { q: string; a: string };

export function buildSchemas({
  name,
  description,
  url,
  faqs,
  breadcrumbs,
}: {
  name: string;
  description: string;
  url: string;
  faqs: Faq[];
  breadcrumbs?: { name: string; item: string }[];
}) {
  const out = [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name,
        description,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        url,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "184",
        },
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
        name,
        description,
        url,
      }),
    },
  ];
  if (breadcrumbs && breadcrumbs.length) {
    out.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: b.item,
        })),
      }),
    });
  }
  return out;
}

export function buildHead({
  title,
  description,
  path,
  faqs,
  name,
  breadcrumbs,
}: {
  title: string;
  description: string;
  path: string;
  faqs: Faq[];
  name: string;
  breadcrumbs?: { name: string; item: string }[];
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
    scripts: buildSchemas({ name, description, url: path, faqs, breadcrumbs }),
  };
}
