import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/referral-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "How do I track the referrer?", "a": "Capture the `ref` param on landing, persist it in localStorage or a cookie, and attribute on signup."}, {"q": "Can I use letters and numbers?", "a": "Yes — most teams use short alphanumeric codes for readability."}, {"q": "Do I need a separate URL per friend?", "a": "Yes — each user gets a unique code so credit attaches to them."}, {"q": "Will the code break if shared on social?", "a": "Most platforms preserve query params; Twitter and Facebook share dialogs keep them intact."}, {"q": "Can I shorten the link?", "a": "Yes — pair the referral URL with our short link generator for SMS and bios."}];
const STEPS = ["Paste the page you want to send referrals to.", "Pick a parameter name (default `ref`).", "Enter the unique code for the referrer.", "Share the URL — store the param on landing for attribution."];
const TITLE = "Referral Link Generator — Free Online Tool";
const DESC = "Append a referral code to any URL. Use it for product invites, partner programs and word-of-mouth campaigns.";

export const Route = createFileRoute("/referral-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/referral-link-generator",
    name: "Referral Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Referral Link Generator", item: "/referral-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Referral Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Referral Link Generator" }]} />
      <ToolHero h1={"Custom Referral & Invite Link Generator"} intro={"Append a referral code to any URL. Use it for product invites, partner programs and word-of-mouth campaigns."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "Base URL", "type": "url", "placeholder": "https://yourapp.com/signup"}, {"name": "key", "label": "Parameter name", "type": "text", "default": "ref"}, {"name": "code", "label": "Referral code", "type": "text", "placeholder": "alex42"}]}
        build={(v) => { if(!v.u||!v.code) return ''; try{ const url=new URL(v.u); url.searchParams.set(v.key||'ref',v.code); return url.toString(); }catch{return ''} }}
        
      />

      <HowToUse heading={"How to use the referral link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a referral link?"}
        answer={"Append a query parameter such as `?ref=USERCODE` to your signup URL. Store the value when the visitor lands and credit the referrer on conversion."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "SaaS founder in San Francisco, CA", "how": "Powers a launch referral leaderboard from a landing page."}, {"who": "Course creator in Austin, TX", "how": "Lets students earn a discount for each friend they invite."}, {"who": "Crypto exchange in Miami, FL", "how": "Pays signup bonuses tracked via `?ref=` codes."}, {"who": "DTC brand in Brooklyn, NY", "how": "Powers a give-$10-get-$10 program through email."}]}
      />

      <WorkedExample intro={"A member-get-member link that credits the right person and survives signup."} rows={[{"input": "Code DANA20", "output": "https://example.com/signup?ref=DANA20"}, {"input": "Landing on a content page", "output": "https://example.com/blog/post?ref=DANA20 \u2014 the code follows through to signup"}, {"input": "Code with spaces", "output": "dana20 \u2014 normalised to lowercase, no spaces"}]} note={"Store the referral code in a first-party cookie on arrival; most signups happen on a later visit, not the first click."} />

      <Pitfalls items={[{"problem": "Relying on the query string at signup", "fix": "People browse first, then register. Without a stored cookie the credit is lost."}, {"problem": "No self-referral check", "fix": "The first thing a determined user tries is referring themselves from a second email."}, {"problem": "Unreadable codes", "fix": "Names and short words get shared verbally. Random strings do not."}, {"problem": "No expiry or cap", "fix": "Set a window and a per-user limit before launch; changing the terms afterwards annoys your best advocates."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/affiliate-link-generator", "anchor": "Affiliate Link Generator", "blurb": "Amazon, AliExpress & custom affiliate links with your tag."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/utm-link-generator", "anchor": "UTM Link Generator", "blurb": "Build Google Analytics UTM campaign tracking links."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
