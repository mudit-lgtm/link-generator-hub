import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";
const KW = SEO["/slug-generator"].keywords;

const STOPWORDS = new Set(["a","an","the","and","or","but","of","on","in","at","to","for","with","by","is","it","this","that","from"]);

function slugify(input: string, stripStop: boolean, max: number) {
  let s = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .split(/\s+/);
  if (stripStop) s = s.filter((w) => !STOPWORDS.has(w));
  let out = s.join("-").replace(/-+/g, "-");
  if (max && out.length > max) out = out.slice(0, max).replace(/-[^-]*$/, "");
  return out.replace(/^-|-$/g, "");
}

const FAQS = [
  { q: "What is a slug generator?", a: "A slug generator (also called a URL slug generator or SEO URL generator) is a free utility that converts a page title or product name into a clean, lowercase, dash-separated URL slug suitable for use as a permalink — for example 'Best Premium Link Generator 2026' becomes 'best-premium-link-generator-2026'." },
  { q: "What is an SEO URL generator?", a: "An SEO URL generator (also called a SEO friendly URL generator or clean URL generator) creates short, keyword-rich URLs that both humans and Google can read. The slug generator above is built specifically for SEO." },
  { q: "Is this a WordPress slug generator?", a: "Yes — the slug generator output above is fully compatible as a WordPress slug or permalink. Paste the result into the WordPress 'Edit slug' field on any post or page." },
  { q: "What is a slugify URL generator?", a: "Slugify is the process of converting a string into a URL slug. The slugify URL generator above handles Unicode normalization, special-character stripping, accent removal and optional stopword removal." },
  { q: "What is a permalink generator?", a: "A permalink generator builds the permanent URL of a page or post. Combine your domain with the slug generated above to produce the full permalink — e.g. example.com/blog/best-premium-link-generator." },
  { q: "How long should an SEO URL slug be?", a: "Keep slugs under 60 characters. The slug generator above includes a max-length option that trims neatly on word boundaries. Shorter slugs rank no worse — and are easier to share, paste and remember." },
];

const TITLE = "SEO URL Slug Generator — Free Permalink & WordPress Slug Generator";
const DESC = "Free slug generator. Convert any title into a clean, SEO-friendly URL slug — works as a WordPress slug, permalink and slugify URL generator. Instant.";

export const Route = createFileRoute("/slug-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/slug-generator",
    name: "SEO URL Slug Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "SEO URL Slug Generator", item: "/slug-generator" }],
  }),
  component: Page,
});

function Page() {
  const [input, setInput] = useState("Best Premium Link Generator for Rapidgator & Turbobit (2026)");
  const [strip, setStrip] = useState(true);
  const [max, setMax] = useState(60);
  const slug = useMemo(() => slugify(input, strip, max), [input, strip, max]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "SEO URL Slug Generator" }]} />
      <ToolHero
        h1="SEO URL Slug Generator — Free Permalink, WordPress & Slugify URL Generator"
        intro="Convert any title into a clean, SEO-friendly URL slug instantly. This free SEO URL generator and url slug generator works as a WordPress slug generator, permalink generator, clean URL generator and slugify URL generator — all in one."
      />

      <ToolCard>
        <Field label="Title or sentence">
          <textarea className={inputCls} rows={3} value={input} onChange={(e) => setInput(e.target.value)} />
        </Field>
        <div className="flex flex-wrap gap-4 items-center">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={strip} onChange={(e) => setStrip(e.target.checked)} />
            Strip stopwords (a, the, of…)
          </label>
          <label className="flex items-center gap-2 text-sm">
            Max length:
            <input type="number" min={20} max={120} value={max} onChange={(e) => setMax(parseInt(e.target.value || "60", 10))} className={`${inputCls} w-20`} />
          </label>
        </div>
        <div>
          <span className="block text-sm font-medium mb-1.5">SEO-friendly slug</span>
          <OutputBlock value={slug} />
        </div>
      </ToolCard>

      <HowToUse
        heading="How to use the SEO URL slug generator"
        steps={[
          "Paste your page title, product name, blog headline or any sentence.",
          "Toggle 'strip stopwords' to remove low-value words like 'the', 'a', 'of'.",
          "Set a max length (60 characters is the SEO sweet spot).",
          "Copy the generated SEO URL slug and paste it into your CMS, WordPress permalink, or static-site frontmatter.",
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "What is a slug generator and why does it matter for SEO?",
          paragraphs: [
            "A slug is the final, human-readable part of a URL after the domain and any prefix — for example in linkkit.com/blog/best-premium-link-generator the slug is best-premium-link-generator. A slug generator (or url slug generator) is a tool that converts any string into a clean slug ready to paste into your CMS.",
            "URL slugs are a small but real SEO ranking signal. Google reads slugs as additional keyword context, and they appear in search results, social shares and browser tabs. A clean SEO URL slug improves click-through rate from search results and is easier to share aloud (on a podcast, in a meeting, on a phone call).",
          ],
        },
        {
          h2: "SEO friendly URL generator — the rules",
          paragraphs: [
            "A good SEO friendly URL generator follows five rules: (1) lowercase only — search engines are case-sensitive in URLs, so mixed case creates duplicate-content risks; (2) words separated by hyphens, not underscores (Google explicitly treats hyphens as word separators); (3) ASCII only — strip accents and Unicode for broad compatibility; (4) include the primary keyword; (5) keep it under 60 characters.",
            "The clean URL generator above enforces all five rules automatically. Just paste your title and copy the result.",
          ],
        },
        {
          h2: "WordPress slug generator and permalink generator",
          paragraphs: [
            "WordPress automatically generates a slug from your post title, but the default isn't always ideal — it leaves stopwords ('the', 'a', 'of') and can produce 90-character mouthfuls. Run your title through our WordPress slug generator first, then paste the cleaner version into the 'Edit slug' field beneath the post title.",
            "Combined with your permalink structure (Settings → Permalinks → /%postname%/), the slug becomes the full permalink. Our permalink generator output works for WordPress, Ghost, Hugo, Astro, Next.js, Nuxt and every other modern CMS or static-site generator.",
          ],
        },
        {
          h2: "Slugify URL generator with Unicode and special-character handling",
          paragraphs: [
            "Real-world titles include accented characters (é, ñ, ü), emoji, currency symbols, ampersands and parentheses. The slugify URL generator above runs NFKD Unicode normalization first to decompose accented characters into their base ASCII equivalents (é → e), then strips anything outside [a-z0-9].",
            "This means a title like 'Café & Tea — Best of 2026 ☕' becomes 'cafe-tea-best-2026' — clean, lowercase, readable, SEO-ready.",
          ],
        },
        {
          h2: "Clean URL generator — why short slugs win",
          paragraphs: [
            "A study of one million Google search results found that the average top-10 result has a URL around 50–60 characters. Pages with shorter slugs aren't ranked higher because they're shorter — they're shorter because the people writing them care about SEO. Tools that produce clean URLs (like this free clean URL generator) correlate with better-optimised pages overall.",
            "Practical rule: include your primary keyword and one secondary qualifier, drop everything else. 'best-premium-link-generator-2026' beats 'the-15-best-premium-link-generators-for-rapidgator-turbobit-and-nitroflare-in-2026'.",
          ],
        },
        {
          h2: "When to keep stopwords (and when to strip them)",
          paragraphs: [
            "Strip stopwords by default — it shortens slugs and removes noise. But keep them when removing them changes the meaning: 'how-to-cook' is a clear search term; 'cook' alone is generic. Same for negation: 'best-tools-not-to-use' loses meaning as 'best-tools-use'.",
            "The slug generator above lets you toggle stopword stripping per slug. Use your judgement — readability beats blind optimization.",
          ],
        },
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading="SEO URL slug generator FAQ" />

      <ContextualLinks
        heading="Related developer & SEO link generators"
        links={[
          { to: "/premium-link-generator", anchor: "Premium Link Generator", blurb: "free Rapidgator, Turbobit, Nitroflare premium link generator on the home page." },
          { to: "/affiliate-link-generator", anchor: "Affiliate Link Generator", blurb: "use clean slugs to cloak long Amazon affiliate URLs." },
          { to: "/referral-link-generator", anchor: "Referral Link Generator", blurb: "wrap referral codes in branded short slugs like /r/john." },
          { to: "/mailto-link-generator", anchor: "Mailto Link Generator", blurb: "complementary developer utility for HTML email links." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
