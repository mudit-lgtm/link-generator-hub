import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What is an affiliate link generator?", a: "An affiliate link generator is a free tool that appends your unique tracking tag to a product URL, so any purchase made via that link is credited to your affiliate account. It works with Amazon Associates, AliExpress affiliate program, ShareASale, Impact, CJ and most major affiliate networks." },
  { q: "How to generate an Amazon affiliate link?", a: "Paste the Amazon product URL into the free affiliate link generator above and enter your Amazon Associates tracking tag (e.g. yourname-20). The generator appends ?tag=yourtag and removes Amazon's own tracking parameters for a clean shareable link." },
  { q: "How to generate affiliate links for AliExpress?", a: "Paste the AliExpress product URL above and add your affiliate ID. Our amazon affiliate program link generator interface works for AliExpress URLs too — the parameter pattern is similar." },
  { q: "Why is my Amazon affiliate link not generating?", a: "If the Amazon affiliate link is not generating, double-check that you are logged into your Associates account on amazon.com (or the correct country store) and that your account is approved. Some new accounts must drive 3 qualifying sales within 180 days before commissions become payable." },
  { q: "Is this a free affiliate link generator?", a: "Yes — 100% free and unlimited. Unlike Amazon's own SiteStripe (which requires browser extensions and account login) the free affiliate link generator above runs in any browser and never sees your account." },
  { q: "Is there a difference between an affiliate link generator and a referral link generator?", a: "Yes. An affiliate link tracks purchases for commission. A referral link rewards a user for inviting others (usually with credits, not cash). For referral programs, see our dedicated referral link generator." },
];

const TITLE = "Affiliate Link Generator — Free Amazon, AliExpress, Custom Tag";
const DESC = "Free affiliate link generator. Generate Amazon affiliate links, AliExpress and custom tracking links with your tag — clean, copy-ready, no extensions.";

export const Route = createFileRoute("/affiliate-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/affiliate-link-generator",
    name: "Affiliate Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "Affiliate Link Generator", item: "/affiliate-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [url, setUrl] = useState("https://www.amazon.com/dp/B08N5WRWNW");
  const [tag, setTag] = useState("yourname-20");
  const [param, setParam] = useState("tag");

  const output = useMemo(() => {
    if (!url) return "";
    try {
      const u = new URL(url);
      // strip common tracking
      ["ref", "ref_", "linkCode", "psc"].forEach((k) => u.searchParams.delete(k));
      if (tag) u.searchParams.set(param || "tag", tag);
      return u.toString();
    } catch {
      return "";
    }
  }, [url, tag, param]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Affiliate Link Generator" }]} />
      <ToolHero
        h1="Affiliate Link Generator — Free Amazon Affiliate Program Link Generator"
        intro="Generate clean affiliate links with your tracking tag in seconds. This free amazon affiliate link generator also works as an AliExpress affiliate link generator, ShareASale link generator and custom affiliate link generator — paste any product URL, add your tag, copy."
      />

      <ToolCard>
        <Field label="Product URL">
          <input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} />
        </Field>
        <Field label="Your affiliate tag / tracking ID">
          <input className={inputCls} value={tag} onChange={(e) => setTag(e.target.value)} placeholder="yourname-20" />
        </Field>
        <Field label="Tag parameter name" hint="Amazon uses 'tag', AliExpress uses 'aff_trace_key', most networks use 'ref' or 'aff_id'">
          <input className={inputCls} value={param} onChange={(e) => setParam(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">Generated affiliate link</span>
          <OutputBlock value={output} />
        </div>
      </ToolCard>

      <HowToUse
        heading="How to generate an affiliate link"
        steps={[
          "Paste the product or landing-page URL you want to share.",
          "Add your affiliate tracking tag (Amazon Associates tag, AliExpress ID or custom network ID).",
          "Pick the tag parameter — 'tag' for Amazon, 'aff_trace_key' for AliExpress, 'ref' for most others.",
          "Copy the clean affiliate link and post it on your blog, YouTube, TikTok or Instagram bio.",
        ]}
      />

      <SeoLongform sections={[
        {
          h2: "What is an affiliate link generator?",
          paragraphs: [
            "An affiliate link generator is a tool that adds your affiliate tracking parameter to any URL, so when someone clicks and buys, you earn a commission. It's the most basic — and most important — utility in any affiliate marketer's workflow.",
            "The free affiliate link generator above is network-agnostic. It works with Amazon Associates, AliExpress, ShareASale, Impact, CJ Affiliate, Awin, Rakuten, FlexOffers, ClickBank, Digistore24 and almost every other affiliate network. Each network uses a slightly different parameter name (tag, aff_id, ref, partner) — choose the right one in the field above.",
          ],
        },
        {
          h2: "How to generate Amazon affiliate links the right way",
          paragraphs: [
            "How to generate Amazon affiliate links is the highest-volume search in this category (480+ monthly searches in the US for 'how to generate amazon affiliate link'). The mechanics are simple: append ?tag=YOURTAG-20 to any Amazon product URL.",
            "Things to watch out for: (1) Make sure your Amazon Associates account is active and you're using the correct country tag — a US tag doesn't earn on amazon.co.uk. (2) Strip Amazon's own ref= and linkCode= parameters first; our generator does this automatically. (3) Use canonical /dp/<ASIN>/ URLs rather than long /gp/product/ URLs.",
            "If your Amazon affiliate link is not generating commissions even though clicks are tracked, check the Reports tab in Associates Central — most issues are 24-hour cookie expiry, returned items or non-Prime ineligible products.",
          ],
        },
        {
          h2: "Amazon affiliate program link generator vs SiteStripe vs Idea Hub",
          paragraphs: [
            "Amazon offers two official tools — SiteStripe (a toolbar that appears when you're logged into amazon.com as an Associate) and the Idea Hub mobile app. Both work but both require login on amazon.com.",
            "Our amazon affiliate program link generator is different: it runs in your own browser, doesn't require login, and lets you append any tag to any URL — including legacy URLs you have stored in spreadsheets or CMSs. Many affiliate marketers use both SiteStripe (for one-off browsing) and our free generator (for bulk URL processing).",
          ],
        },
        {
          h2: "AliExpress affiliate link generator and other networks",
          paragraphs: [
            "AliExpress runs its affiliate program through its Portals dashboard. Once you have your tracking ID, paste any AliExpress product URL into the generator above with parameter 'aff_trace_key' (or whatever AliExpress assigns you) and your ID.",
            "For ShareASale, Impact, CJ and Awin, the network gives you a deep-linking tool — but those tools often produce ugly redirect URLs (e.g. shareasale.com/r.cfm?...). If you have a direct merchant URL and your unique affiliate ID, our free affiliate link generator builds the same outbound link with a clean appearance.",
          ],
        },
        {
          h2: "Affiliate link generator best practices for 2026",
          paragraphs: [
            "Disclose. Every affiliate link must be disclosed in clear language ('I may earn a commission'). The US FTC enforces this, and YouTube, TikTok and Instagram each have their own disclosure rules. Our generator does not add disclosure — that's up to you to write.",
            "Cloak responsibly. Use a slug like /go/product instead of a 200-character affiliate URL. Many affiliates pair this affiliate link generator with a redirect plugin (Pretty Links, Thirsty Affiliates) to track clicks on their own server.",
            "Don't over-tag. Adding multiple affiliate tags from different networks to the same URL is against most program terms — pick one network per link.",
          ],
        },
        {
          h2: "Affiliate vs referral links — pick the right tool",
          paragraphs: [
            "Affiliate links generate commission from third-party brand products. Referral links generate credits or rewards from inviting users to a SaaS or app you already use (Dropbox, Uber, Robinhood, Cash App).",
            "If you're sharing your personal invite code rather than promoting a product catalog, use our dedicated referral link generator instead — it includes UTM tracking and custom-code support tailored to SaaS referral programs.",
          ],
        },
      ]} />

      <FaqSection items={FAQS} heading="Affiliate link generator FAQ" />

      <ContextualLinks
        heading="Related marketer link generators"
        links={[
          { to: "/", anchor: "Premium Link Generator", blurb: "free Rapidgator, Turbobit, Nitroflare premium link generator on the home page." },
          { to: "/referral-link-generator", anchor: "Referral Link Generator", blurb: "create branded referral links with UTM tracking for SaaS." },
          { to: "/slug-generator", anchor: "SEO URL Slug Generator", blurb: "build clean cloaked slugs (e.g. /go/product) for your affiliate links." },
          { to: "/mailto-link-generator", anchor: "Mailto Link Generator", blurb: "share affiliate links via email signatures and newsletters." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
