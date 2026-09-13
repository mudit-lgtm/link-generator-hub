import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { ShareAndGuestbook } from "@/components/backlink-block";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/short-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Are these short links permanent?", "a": "is.gd promises long-term storage but, like any third-party shortener, the link's fate depends on the provider."}, {"q": "Do you track clicks?", "a": "No — this page just calls the public is.gd API. For analytics, use a dedicated shortener like Bitly or Rebrandly."}, {"q": "Can I use a custom alias?", "a": "is.gd supports custom URLs via its UI; the API call here generates random aliases for simplicity."}, {"q": "What's the rate limit?", "a": "is.gd allows roughly one request per second per IP — fine for human use."}, {"q": "Will UTMs survive?", "a": "Yes — the shortener stores the full URL including query params; redirects keep them intact."}];
const STEPS = ["Paste your long URL.", "Click Shorten to call the is.gd API.", "Copy the short link.", "Use it in SMS, social bios, QR codes or print."];
const TITLE = "Short Link Generator — Free Online Tool";
const DESC = "Shorten any URL using the free is.gd public API — no signup, no tracking. Optional custom alias.";

export const Route = createFileRoute("/short-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/short-link-generator",
    name: "Short Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Short Link Generator", item: "/short-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Short Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  const [u, setU] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function shorten() {
    if (!u.trim()) return;
    setBusy(true); setErr(""); setOut("");
    try {
      const r = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(u.trim())}`);
      const t = await r.text();
      if (t.startsWith("http")) setOut(t.trim()); else setErr(t);
    } catch { setErr("Network error — try again."); }
    setBusy(false);
  }
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Short Link Generator" }]} />
      <ToolHero h1={"Free Short Link & Tiny URL Generator"} intro={"Shorten any URL using the free is.gd public API — no signup, no tracking. Optional custom alias."} keywords={KW} />
      <ToolCard>
        <Field label="Long URL">
          <input type="url" className={inputCls} placeholder="https://example.com/very/long/path?with=params" value={u} onChange={(e) => setU(e.target.value)} />
        </Field>
        <button type="button" onClick={shorten} disabled={busy || !u.trim()} className="px-4 py-2 rounded-lg bg-gradient-sunset text-white text-sm font-semibold shadow-warm disabled:opacity-40">{busy ? "Shortening…" : "Shorten URL"}</button>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <div>
          <span className="block text-sm font-semibold mb-1.5">Short link</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>
      <HowToUse heading={"How to use the short link generator"} steps={STEPS} />
      <AeoBlock question={"How do free URL shorteners work?"} answer={"The shortener stores your long URL in a database and gives you a tiny redirect URL. When someone opens it, the service issues a 301 to the original destination. We use the free is.gd API."} keywords={KW} />
      <GeoBlock heading={"USA use cases"} keywords={KW} items={[{"who": "Marketer in Austin, TX", "how": "Shortens every email CTA so SMS fallbacks fit under 160 chars."}, {"who": "Real estate agent in Miami, FL", "how": "Prints short URLs on yard signs and open-house flyers."}, {"who": "Podcaster in Brooklyn, NY", "how": "Drops a memorable short link in episode show notes."}, {"who": "Recruiter in Chicago, IL", "how": "Shares job-posting URLs in LinkedIn DMs without ugly tracking strings."}]} />
      <WorkedExample intro={"The same product URL, prepared for a printed postcard and for a paid social ad."} rows={[{"input": "https://shop.example.com/collections/spring/products/linen-shirt?variant=42", "output": "https://exmpl.co/linen (custom alias)"}, {"input": "No alias supplied", "output": "https://exmpl.co/a7Kd2Q (6-character hash)"}, {"input": "Alias \"Spring Sale\"", "output": "spring-sale \u2014 spaces and capitals are normalised"}]} note={"A six-character alphanumeric hash gives roughly 56 billion combinations, so collisions are not a practical concern."} />

      <Pitfalls items={[{"problem": "Using look-alike characters in a printed alias", "fix": "Avoid 0/O and 1/l/I. People retype printed links by hand and mistype those pairs constantly."}, {"problem": "Reusing one short link for every channel", "fix": "One link per channel is the only way to know whether the postcard or the ad drove the visit."}, {"problem": "Shortening an already shortened link", "fix": "Double redirects add latency and some email filters treat chained redirects as suspicious."}, {"problem": "Free branded domains that expire", "fix": "If the domain lapses, every printed link dies. Use a domain you renew yourself for anything offline."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />
      <ContextualLinks heading="Related link generators" links={[{"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "Build Google Analytics UTM campaign tracking links."}, {"to": "/affiliate-link-generator", "anchor": "Affiliate Link Generator", "blurb": "Amazon, AliExpress & custom affiliate links with your tag."}, {"to": "/referral-link-generator", "anchor": "Referral Link Generator", "blurb": "Custom referral & invite links with tracking codes."}]} />
      <ShareAndGuestbook path="/short-link-generator" title={TITLE} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
