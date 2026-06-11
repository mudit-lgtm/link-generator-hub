import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";
const KW = SEO["/utm-link-generator"].keywords;

const FAQS = [
  { q: "What is a UTM link generator?", a: "A UTM link generator (also known as a UTM builder or campaign URL builder) appends Google Analytics utm_source, utm_medium, utm_campaign, utm_term and utm_content parameters to any URL — so GA4 attributes every click to the right channel and campaign." },
  { q: "How do I generate a UTM link for Google Analytics?", a: "Fill in the destination URL plus the UTM source, medium and campaign fields above. The free UTM link generator URL-encodes everything and outputs a clean, GA-compatible tracking link generator URL." },
  { q: "Are utm_term and utm_content required?", a: "No — only utm_source, utm_medium and utm_campaign are required by GA4. The UTM parameter generator above leaves term and content blank if you don't fill them." },
  { q: "What's the difference between a UTM link generator and a tracking link generator?", a: "They mean the same thing. 'UTM link generator', 'tracking link generator', 'campaign url builder' and 'UTM builder' all describe a tool that adds UTM parameters to a URL for analytics attribution." },
  { q: "Will the UTM link work in all browsers?", a: "Yes — the free UTM link generator output is a standard URL with query parameters. It works on every browser, iOS and Android, and survives redirects as long as the destination preserves query strings." },
  { q: "Can I shorten my UTM link?", a: "Yes — paste the UTM output into our Short Link Generator for a clean, branded short URL with tracking intact." },
  { q: "Best UTM naming conventions for 2026?", a: "Use lowercase, hyphens (not spaces), consistent source names ('facebook', not 'FB' or 'Facebook'), and a dated campaign label ('summer-sale-2026') so reports stay clean year-over-year." },
];

const TITLE = "UTM Link Generator — Free Google Analytics Campaign URL Builder";
const DESC = "Free UTM link generator. Generate Google Analytics UTM tracking links with utm_source, utm_medium and utm_campaign — the easiest UTM builder & campaign URL builder.";

export const Route = createFileRoute("/utm-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/utm-link-generator",
    name: "UTM Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "UTM Link Generator", item: "/utm-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [url, setUrl] = useState("https://example.com/landing");
  const [source, setSource] = useState("newsletter");
  const [medium, setMedium] = useState("email");
  const [campaign, setCampaign] = useState("summer-sale-2026");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const output = useMemo(() => {
    if (!url.trim()) return "";
    const p = new URLSearchParams();
    if (source) p.set("utm_source", source);
    if (medium) p.set("utm_medium", medium);
    if (campaign) p.set("utm_campaign", campaign);
    if (term) p.set("utm_term", term);
    if (content) p.set("utm_content", content);
    const join = url.includes("?") ? "&" : "?";
    return `${url}${p.toString() ? join + p.toString() : ""}`;
  }, [url, source, medium, campaign, term, content]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "UTM Link Generator" }]} />
      <ToolHero
        h1="UTM Link Generator — Free Google Analytics Campaign URL Builder"
        intro="Generate UTM tracking links for Google Analytics in seconds. This free UTM link generator works as a UTM builder, campaign url builder and tracking link generator — perfect for newsletters, paid ads, Instagram and TikTok campaigns."
        keywords={KW}
      />

      <ToolCard>
        <Field label="Destination URL"><input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} /></Field>
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="utm_source *"><input className={inputCls} value={source} onChange={(e) => setSource(e.target.value)} /></Field>
          <Field label="utm_medium *"><input className={inputCls} value={medium} onChange={(e) => setMedium(e.target.value)} /></Field>
          <Field label="utm_campaign *"><input className={inputCls} value={campaign} onChange={(e) => setCampaign(e.target.value)} /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="utm_term (optional)"><input className={inputCls} value={term} onChange={(e) => setTerm(e.target.value)} /></Field>
          <Field label="utm_content (optional)"><input className={inputCls} value={content} onChange={(e) => setContent(e.target.value)} /></Field>
        </div>
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your UTM tracking link</span>
          <OutputBlock value={output} multiline />
        </div>
      </ToolCard>

      <HowToUse
        heading="How to generate a UTM link for Google Analytics"
        steps={[
          "Paste your destination URL.",
          "Fill in utm_source (e.g. newsletter, facebook), utm_medium (e.g. email, cpc), utm_campaign (e.g. summer-sale-2026).",
          "Optionally add utm_term and utm_content for ad-level granularity.",
          "Copy the UTM tracking link and paste into your ad, email or social post.",
        ]}
      />

      <AeoBlock
        question="What is a UTM link generator?"
        answer="A UTM link generator (or campaign URL builder) appends Google Analytics utm_source, utm_medium and utm_campaign parameters to any URL. It lets GA4 attribute every click to the correct channel, ad and campaign so marketers can prove ROI and optimise spend."
        keywords={KW}
      />

      <GeoBlock
        heading="UTM link generator — USA marketer use cases"
        keywords={KW}
        items={[
          { who: "DTC brand in Los Angeles, CA", how: "Generates utm_source=facebook&utm_medium=cpc tracking links for every Meta ad variant." },
          { who: "Newsletter operator in NYC", how: "Adds utm_source=newsletter&utm_medium=email to every CTA in Substack." },
          { who: "Affiliate marketer in Austin, TX", how: "Pairs the UTM link generator with the affiliate link generator for end-to-end attribution." },
          { who: "B2B SaaS in San Francisco", how: "Uses the campaign url builder to track LinkedIn vs Twitter referrals to the demo page." },
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free UTM link generator — Google Analytics-ready tracking links",
          paragraphs: [
            "Without UTM parameters, Google Analytics lumps most of your paid and email traffic into 'direct' or 'referral'. With a UTM link generator, every click carries its full campaign context — source, medium, campaign, term and content — so GA4 reports show real channel performance.",
            "This free UTM link generator builds GA-compatible UTM links instantly, URL-encoded and ready to paste into Meta Ads Manager, Google Ads, Mailchimp, Substack, Beehiiv, LinkedIn or TikTok.",
          ],
        },
        {
          h2: "UTM builder naming conventions",
          paragraphs: [
            "Keep utm_source lowercase and consistent ('facebook', not 'Facebook' or 'FB'). Use utm_medium from a fixed list: email, cpc, social, organic_social, affiliate, referral. Date your utm_campaign labels ('summer-sale-2026') so cohort comparison stays accurate year over year.",
            "Consistent naming is what separates a clean GA4 report from a mess of duplicate channels.",
          ],
        },
        {
          h2: "Campaign URL builder vs tracking link generator",
          paragraphs: [
            "'UTM link generator', 'campaign URL builder' and 'tracking link generator' all describe the same tool. Google's own Campaign URL Builder is the original, but it's clunky and doesn't remember your inputs. Our UTM parameter generator is faster, mobile-friendly and shows the encoded URL as you type.",
          ],
        },
        {
          h2: "Combine UTM links with short links and QR codes",
          paragraphs: [
            "UTM URLs get long. After generating your UTM link, pipe it through our short link generator for a clean SMS/Twitter-friendly alias, then convert to a QR code with the QR code link generator for print campaigns. Attribution stays intact end to end.",
          ],
        },
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading="UTM link generator FAQ" />

      <ContextualLinks
        heading="Related link generators"
        links={[
          { to: "/short-link-generator", anchor: "Short Link Generator", blurb: "shorten the UTM URL for SMS and social bios." },
          { to: "/qr-code-link-generator", anchor: "QR Code Link Generator", blurb: "turn the UTM link into a scannable QR for print campaigns." },
          { to: "/affiliate-link-generator", anchor: "Affiliate Link Generator", blurb: "layer UTM tags on Amazon Associates affiliate URLs." },
          { to: "/referral-link-generator", anchor: "Referral Link Generator", blurb: "attribute referral signups end-to-end." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
