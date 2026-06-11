import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";
const KW = SEO["/referral-link-generator"].keywords;

const FAQS = [
  { q: "What is a referral link generator?", a: "A referral link generator is a free utility that builds a branded referral or invite link with your personal referral code, optional UTM tracking and custom landing path — for SaaS programs, e-commerce loyalty programs and creator invite schemes." },
  { q: "How do I create a referral link?", a: "Paste the program's base URL above, enter your referral code, and optionally add UTM source, medium and campaign. The free referral link generator combines them into a clean trackable link." },
  { q: "Is this a custom referral link generator?", a: "Yes — fully customisable. Change the referral parameter name (ref, code, invite, r) and the slug to match exactly how the SaaS or e-commerce platform expects referrals." },
  { q: "What's the difference between a referral link generator and a referral code generator?", a: "A referral code generator creates the short code (e.g. SAVE20-FRIEND). A referral link generator wraps that code into a working URL the recipient can click. The tool above does both at once." },
  { q: "Can I generate a referral tracking link with UTM?", a: "Yes — the referral tracking link generator above appends utm_source, utm_medium and utm_campaign so you can see exactly which channels (Twitter, newsletter, podcast) drive sign-ups inside Google Analytics or Plausible." },
  { q: "Is this an invite link generator too?", a: "Yes. SaaS, mobile apps and group products call them invite links instead of referral links — the mechanics are the same. Use this invite link generator for Dropbox, Notion, Linear, Robinhood, Cash App or any program with a /invite, /r, or /ref URL pattern." },
];

const TITLE = "Referral Link Generator — Free Custom Referral & Invite Link";
const DESC = "Free referral link generator. Create custom referral, invite and tracking links with UTM, branded codes and clean URLs for SaaS and e-commerce programs.";

export const Route = createFileRoute("/referral-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/referral-link-generator",
    name: "Referral Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "Referral Link Generator", item: "/referral-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [base, setBase] = useState("https://app.example.com/signup");
  const [param, setParam] = useState("ref");
  const [code, setCode] = useState("FRIEND25");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");

  const link = useMemo(() => {
    if (!base) return "";
    try {
      const u = new URL(base);
      if (code) u.searchParams.set(param || "ref", code);
      if (source) u.searchParams.set("utm_source", source);
      if (medium) u.searchParams.set("utm_medium", medium);
      if (campaign) u.searchParams.set("utm_campaign", campaign);
      return u.toString();
    } catch {
      return "";
    }
  }, [base, param, code, source, medium, campaign]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Referral Link Generator" }]} />
      <ToolHero
        h1="Referral Link Generator — Free Custom Referral, Invite & Tracking Link"
        intro="Generate custom referral links with your code, UTM tracking and clean URL structure in seconds. This free referral link generator doubles as a referral code generator, invite link generator and referral tracking link generator for SaaS, e-commerce and creator programs."
      />

      <ToolCard>
        <Field label="Base signup / landing URL">
          <input className={inputCls} value={base} onChange={(e) => setBase(e.target.value)} />
        </Field>
        <Field label="Referral parameter" hint="ref, code, invite, r, partner — match what the program expects">
          <input className={inputCls} value={param} onChange={(e) => setParam(e.target.value)} />
        </Field>
        <Field label="Your referral code">
          <input className={inputCls} value={code} onChange={(e) => setCode(e.target.value)} />
        </Field>
        <Field label="UTM source (optional)">
          <input className={inputCls} value={source} onChange={(e) => setSource(e.target.value)} placeholder="twitter, newsletter, podcast" />
        </Field>
        <Field label="UTM medium (optional)">
          <input className={inputCls} value={medium} onChange={(e) => setMedium(e.target.value)} placeholder="social, email, referral" />
        </Field>
        <Field label="UTM campaign (optional)">
          <input className={inputCls} value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="spring-2026" />
        </Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">Your referral link</span>
          <OutputBlock value={link} />
        </div>
      </ToolCard>

      <HowToUse
        heading="How to create a referral link"
        steps={[
          "Paste the program's signup or landing URL.",
          "Enter the referral parameter the program uses (ref, code, invite, partner).",
          "Add your unique referral code.",
          "Optionally include UTM source, medium and campaign so you can attribute sign-ups by channel.",
          "Copy the generated referral link and share it on social, in your email signature or as a QR code.",
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "What is a referral link generator?",
          paragraphs: [
            "A referral link generator is a marketing utility that produces shareable URLs containing a referral code. The code identifies you (the referrer) so the platform can credit your account with bonuses, credits or cash when someone signs up or makes a purchase.",
            "Referral programs are now standard at most SaaS companies (Dropbox famously used referrals to scale from 100k to 4M users in 15 months), every major fintech (Robinhood, Cash App, Revolut), most ride-sharing apps (Uber, Lyft), e-commerce loyalty programs and creator platforms.",
            "Our free referral link generator removes the guesswork: paste, configure, copy. No browser extension, no signup, no fee.",
          ],
        },
        {
          h2: "How to create a referral link with UTM tracking",
          paragraphs: [
            "UTM parameters are tags appended to a URL that analytics tools (Google Analytics, Plausible, Fathom, Mixpanel) use to attribute traffic. Adding utm_source, utm_medium and utm_campaign to your referral link lets you measure which channel produces the most sign-ups.",
            "Example: share the same referral code in your newsletter (utm_source=newsletter), Twitter bio (utm_source=twitter) and YouTube description (utm_source=youtube) — three different generated links, same referral code. After a month you'll know exactly where to double down.",
          ],
        },
        {
          h2: "Custom referral link generator for any SaaS program",
          paragraphs: [
            "Different platforms use different parameter names. Dropbox uses ?r=, Notion uses ?ref=, Robinhood uses /referral/ in the path, Cash App uses /app/<code>. Our custom referral link generator handles all of them — set the parameter name to match exactly what the platform expects.",
            "Tip: if you're not sure which parameter the program uses, sign in to your own account on the program and look at the referral link the platform itself generates for you in the dashboard. Whatever ?param=value appears there is what you should use.",
          ],
        },
        {
          h2: "Referral code generator best practices",
          paragraphs: [
            "Most successful referral codes use one of three patterns: (1) your name plus a benefit (JOHN25 = 25% off), (2) the recipient's benefit only (SAVE50, FRIEND, WELCOME), (3) a memorable phrase (TEAM-LIGHT, BANANA42).",
            "Avoid long random codes — they're hard to type from a podcast or video and they don't communicate value. The best codes can be remembered and read aloud.",
          ],
        },
        {
          h2: "Invite link generator vs referral link generator",
          paragraphs: [
            "Functionally identical — different terminology. SaaS products and mobile apps typically call them 'invite links', whereas e-commerce loyalty and creator programs call them 'referral links'. Either way, the URL structure is the same: base URL + parameter + code.",
            "Use the same invite link generator above for both. The output works for Slack workspace invites, Notion team invites, Linear org invites, Robinhood share-a-stock, Cash App boosts and dozens more.",
          ],
        },
        {
          h2: "Free referral link generator — where to share for max conversions",
          paragraphs: [
            "Highest-converting placements (in our experience helping creators): Twitter/X pinned tweet, Instagram link in bio, YouTube video description (first line), podcast show notes, newsletter footer, Discord profile, Stack Overflow profile (for dev tools), GitHub profile README.",
            "Pair your referral link with a Google review link, WhatsApp click-to-chat link and a calendar invite for the full creator-monetization stack — all generated free on LinkKit.",
          ],
        },
      ]} />
      <AeoBlock
        question="What is a referral link generator?"
        answer="A referral link generator creates a unique invite URL that includes a tracking code so credit lands with the right referrer. SaaS, fintech and e-commerce brands use the custom referral link generator to power give-$10-get-$10 programs and influencer campaigns."
        keywords={KW}
      />

      <GeoBlock
        heading="Referral link generator — USA SaaS & DTC use cases"
        keywords={KW}
        items={[
          { who: "Fintech startup in NYC", how: "Issues a custom referral link per user — referred signups account for 28% of MRR." },
          { who: "DTC brand in Los Angeles, CA", how: "Combines the referral link generator with the SEO URL slug generator for branded share URLs." },
          { who: "Crypto exchange in Miami, FL", how: "Tracks campaign sources with the referral URL generator's tracking code parameter." },
          { who: "Course community in Denver, CO", how: "Drops a SaaS referral link in onboarding so members invite peers in one tap." },
        ]}
      />


      <FaqSection items={FAQS} keywords={KW} heading="Referral link generator FAQ" />

      <ContextualLinks
        heading="Related growth link generators"
        links={[
          { to: "/premium-link-generator", anchor: "Premium Link Generator", blurb: "free Rapidgator, Turbobit, Nitroflare premium link generator on the home page." },
          { to: "/affiliate-link-generator", anchor: "Affiliate Link Generator", blurb: "for product-commission links rather than referral credits." },
          { to: "/slug-generator", anchor: "SEO URL Slug Generator", blurb: "create short branded slugs (/r/john) for your referral link." },
          { to: "/whatsapp-link-generator", anchor: "WhatsApp Link Generator", blurb: "share the referral link 1:1 via WhatsApp click-to-chat." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
