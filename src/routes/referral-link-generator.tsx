import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout, RelatedTools } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What's the difference between a referral link and an affiliate link?", a: "Affiliate links earn you commission on sales from any product. Referral links typically reward you for inviting new users to a specific SaaS or service — usually with credits or account perks." },
  { q: "Can I create a custom referral link?", a: "Yes — use any base URL plus your unique referral code, and optionally append UTM parameters for analytics." },
  { q: "What is a referral tracking link?", a: "It's a URL that includes a code or UTM tags so the destination service can attribute new signups back to you." },
  { q: "Is the invite link generator free?", a: "Yes, completely free with no signup required." },
  { q: "Will UTM parameters break my referral?", a: "No — UTMs are independent of the referral param and are passed through to your analytics platform." },
];

const TITLE = "Referral Link Generator — Custom Invite & Tracking";
const DESC = "Free referral link generator with UTM tracking. Create custom invite links for your SaaS, app, or product referral program.";

export const Route = createFileRoute("/referral-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/referral-link-generator",
    name: "Referral Link Generator", faqs: FAQS,
  }),
  component: Page,
});

function Page() {
  const [base, setBase] = useState("https://app.example.com/signup");
  const [param, setParam] = useState("ref");
  const [code, setCode] = useState("YOURNAME");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");

  const out = useMemo(() => {
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
      <ToolHero
        h1="Referral Link Generator"
        intro="Build custom referral and invite links with optional UTM tracking. Perfect for SaaS referral programs, app invites, and creator partnerships."
      />
      <ToolCard>
        <Field label="Base URL"><input className={inputCls} value={base} onChange={(e) => setBase(e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Referral parameter" hint="e.g. ref, code, invite">
            <input className={inputCls} value={param} onChange={(e) => setParam(e.target.value)} />
          </Field>
          <Field label="Your referral code"><input className={inputCls} value={code} onChange={(e) => setCode(e.target.value)} /></Field>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field label="UTM source"><input className={inputCls} value={source} onChange={(e) => setSource(e.target.value)} /></Field>
          <Field label="UTM medium"><input className={inputCls} value={medium} onChange={(e) => setMedium(e.target.value)} /></Field>
          <Field label="UTM campaign"><input className={inputCls} value={campaign} onChange={(e) => setCampaign(e.target.value)} /></Field>
        </div>
        <div>
          <span className="block text-sm font-medium mb-1.5">Referral link</span>
          <OutputBlock value={out} />
        </div>
      </ToolCard>
      <HowToUse steps={[
        "Paste the signup or invite URL.",
        "Set the referral parameter name and your unique code.",
        "Optionally add UTM tags, then copy the final link.",
      ]} />
      <FaqSection items={FAQS} />
      <RelatedTools exclude="/referral-link-generator" />
    </ToolLayout>
  );
}
