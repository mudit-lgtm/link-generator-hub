import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout, RelatedTools } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What is an SEO URL slug?", a: "A slug is the readable, keyword-rich part of a URL after the domain — e.g. /best-coffee-makers. Clean slugs help Google understand your page and improve click-through rates." },
  { q: "How does the WordPress slug generator work?", a: "It lowercases your title, removes accents and special characters, and joins words with hyphens — exactly the format WordPress, Ghost, and most CMSes expect." },
  { q: "Should I remove stopwords?", a: "Removing 'the', 'a', 'and', etc. produces shorter, more focused slugs and is the recommended SEO practice for most pages." },
  { q: "What is a permalink generator?", a: "Same as a slug generator — 'permalink' refers to the full permanent URL, of which the slug is the readable part." },
  { q: "Is the slugify tool free?", a: "Yes, the SEO URL generator is 100% free and runs in your browser — no data leaves your device." },
];

const TITLE = "SEO URL Slug Generator — Free Slugify Tool";
const DESC = "Free SEO-friendly URL slug generator. Convert any title to a clean, lowercase, hyphenated slug for WordPress, Ghost, and any CMS.";

export const Route = createFileRoute("/slug-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/slug-generator",
    name: "SEO URL Slug Generator", faqs: FAQS,
  }),
  component: Page,
});

const STOP = new Set(["a","an","the","and","or","but","of","in","on","at","to","for","with","by","is","it","as","be"]);

function Page() {
  const [text, setText] = useState("The Ultimate Guide to Building a SaaS in 2026!");
  const [removeStop, setRemoveStop] = useState(true);
  const [maxLen, setMaxLen] = useState(60);

  const slug = useMemo(() => {
    let s = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    s = s.replace(/[^a-z0-9\s-]/g, "").trim();
    let words = s.split(/[\s-]+/).filter(Boolean);
    if (removeStop) words = words.filter((w) => !STOP.has(w));
    let out = words.join("-");
    if (out.length > maxLen) out = out.slice(0, maxLen).replace(/-[^-]*$/, "");
    return out;
  }, [text, removeStop, maxLen]);

  return (
    <ToolLayout>
      <ToolHero
        h1="SEO URL Slug Generator"
        intro="Convert any title into a clean, lowercase, hyphenated URL slug. SEO-friendly, accent-stripped, WordPress-ready — slugify any title in one click."
      />
      <ToolCard>
        <Field label="Title">
          <input className={inputCls} value={text} onChange={(e) => setText(e.target.value)} />
        </Field>
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={removeStop} onChange={(e) => setRemoveStop(e.target.checked)} />
            Remove stopwords
          </label>
          <Field label="Max length">
            <input type="number" className={inputCls} value={maxLen} min={10} max={150} onChange={(e) => setMaxLen(+e.target.value)} />
          </Field>
        </div>
        <div>
          <span className="block text-sm font-medium mb-1.5">Slug</span>
          <OutputBlock value={slug} />
        </div>
      </ToolCard>
      <HowToUse steps={[
        "Paste your article or page title.",
        "Toggle stopword removal for shorter, SEO-friendly slugs.",
        "Copy the slug into WordPress, Ghost, or any CMS permalink field.",
      ]} />
      <FaqSection items={FAQS} />
      <RelatedTools exclude="/slug-generator" />
    </ToolLayout>
  );
}
