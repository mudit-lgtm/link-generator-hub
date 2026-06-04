import { useState, type ReactNode } from "react";

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

export function FaqSection({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
      <div className="space-y-3">
        {items.map((it) => (
          <details
            key={it.q}
            className="rounded-md border border-border bg-card p-4 group"
          >
            <summary className="cursor-pointer font-medium text-sm list-none flex justify-between items-center">
              {it.q}
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
      <p className="text-muted-foreground leading-relaxed">{intro}</p>
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

export function HowToUse({ steps }: { steps: string[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-3">How to use</h2>
      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </section>
  );
}

export function buildSchemas({
  name,
  description,
  url,
  faqs,
}: {
  name: string;
  description: string;
  url: string;
  faqs: { q: string; a: string }[];
}) {
  return [
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
  ];
}

export function buildHead({
  title,
  description,
  path,
  faqs,
  name,
}: {
  title: string;
  description: string;
  path: string;
  faqs: { q: string; a: string }[];
  name: string;
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
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: buildSchemas({ name, description, url: path, faqs }),
  };
}
