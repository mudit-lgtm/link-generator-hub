import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout, RelatedTools } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "How do I generate an Amazon affiliate link?", a: "Paste any Amazon product URL and enter your Associates tracking tag (e.g. yoursite-20). The tool builds a clean affiliate link with your tag appended." },
  { q: "Does this work for AliExpress and other programs?", a: "Yes — use the 'Custom' mode and specify your network's affiliate parameter name and value." },
  { q: "Are these links FTC compliant?", a: "The link itself is compliant. You're still responsible for disclosing your affiliate relationship to your audience as required by FTC guidelines." },
  { q: "Why is my Amazon affiliate link not generating?", a: "Double-check your product URL has a valid ASIN (the 10-character code) and that your tracking tag is correctly formatted." },
  { q: "Is the affiliate link generator free?", a: "Yes — free and unlimited, runs entirely in your browser." },
];

const TITLE = "Affiliate Link Generator — Amazon, AliExpress & Custom";
const DESC = "Free affiliate link generator. Build Amazon Associates, AliExpress, and custom tracking links with your tag in seconds.";

export const Route = createFileRoute("/affiliate-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/affiliate-link-generator",
    name: "Affiliate Link Generator", faqs: FAQS,
  }),
  component: Page,
});

function Page() {
  const [mode, setMode] = useState<"amazon" | "custom">("amazon");
  const [url, setUrl] = useState("https://www.amazon.com/dp/B08N5WRWNW");
  const [tag, setTag] = useState("yoursite-20");
  const [param, setParam] = useState("ref");

  const out = useMemo(() => {
    if (!url) return "";
    try {
      const u = new URL(url);
      if (mode === "amazon") {
        u.searchParams.set("tag", tag);
      } else {
        u.searchParams.set(param || "ref", tag);
      }
      return u.toString();
    } catch {
      return "";
    }
  }, [url, tag, mode, param]);

  return (
    <ToolLayout>
      <ToolHero
        h1="Affiliate Link Generator"
        intro="Build Amazon Associates, AliExpress, and custom affiliate links with your tracking tag. Clean URLs, no redirects, ready to paste into your blog or social bio."
      />
      <ToolCard>
        <div className="flex gap-2">
          {(["amazon", "custom"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium ${mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {m === "amazon" ? "Amazon" : "Custom"}
            </button>
          ))}
        </div>
        <Field label="Product URL"><input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} /></Field>
        {mode === "custom" && (
          <Field label="Affiliate parameter name" hint="e.g. ref, aff_id, partner">
            <input className={inputCls} value={param} onChange={(e) => setParam(e.target.value)} />
          </Field>
        )}
        <Field label={mode === "amazon" ? "Amazon Associates tag" : "Your affiliate ID / tag"}>
          <input className={inputCls} value={tag} onChange={(e) => setTag(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">Affiliate link</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>
      <HowToUse steps={[
        "Pick Amazon or Custom mode.",
        "Paste the product URL and enter your affiliate tag.",
        "Copy the link and share it on your site, newsletter, or socials.",
      ]} />
      <FaqSection items={FAQS} />
      <RelatedTools exclude="/affiliate-link-generator" />
    </ToolLayout>
  );
}
