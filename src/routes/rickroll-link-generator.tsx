import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";
const KW = SEO["/rickroll-link-generator"].keywords;

const FAQS = [
  { q: "What is a rick roll link generator?", a: "A rick roll link generator (or rickroll link generator) is a free prank tool that creates a disguised URL — friends think they're clicking a normal link, but it redirects to Rick Astley's 'Never Gonna Give You Up' on YouTube." },
  { q: "How does the rickrolled link generator work?", a: "Type any custom label (a fake news headline, a 'leaked' meme, a job offer) and the rickrolling link generator builds a short URL that takes whoever clicks it straight to the official Rick Astley video. Classic, harmless, undefeated since 2007." },
  { q: "Is this a fake link generator?", a: "Yes — and a prank link generator, troll link generator, custom rick roll link generator and fake link generator prank in one. All output is harmless and points to a public YouTube video." },
  { q: "Can I use this as a Discord fake link generator?", a: "Yes. The discord fake link generator output is a regular URL — paste it into any Discord channel or DM. The link preview shows your custom title and image, then redirects to the rickroll video when clicked." },
  { q: "Does it work as a Roblox fake link generator?", a: "Yes — the roblox fake link generator output works anywhere a URL is supported, including Roblox chat, Discord, Twitter, WhatsApp and SMS." },
  { q: "Is the fake link prank generator safe?", a: "Yes. Every generated link points to the official YouTube video of Rick Astley's 'Never Gonna Give You Up'. No malware, no tracking, no data collected. Just an unbeatable, age-old internet prank." },
];

const TITLE = "Rick Roll Link Generator — Free Custom Rickroll & Fake Link";
const DESC = "Free rick roll link generator. Create custom rickroll, fake link, prank link and troll link with any title — works on Discord, Roblox, WhatsApp & SMS.";

export const Route = createFileRoute("/rickroll-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/rickroll-link-generator",
    name: "Rick Roll Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "Rick Roll Link Generator", item: "/rickroll-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [label, setLabel] = useState("LEAKED: New iPhone announcement");
  const link = useMemo(() => {
    const enc = encodeURIComponent(label || "click-me");
    return `https://linkkit.fun/r/${enc}`;
  }, [label]);
  const target = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Rick Roll Link Generator" }]} />
      <ToolHero
        h1="Rick Roll Link Generator — Free Custom Rickroll & Fake Link Generator"
        intro="Generate a custom rickroll link, fake link, prank link or troll link with any title in seconds. The free rick roll link generator below is the all-in-one rickrolling link generator, custom rick roll link generator, discord fake link generator and roblox fake link generator — perfect harmless internet pranking."
      />

      <ToolCard>
        <Field label="Custom label (the title your friends will see)">
          <input className={inputCls} value={label} onChange={(e) => setLabel(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">Your prank rickroll link</span>
          <OutputBlock value={link} />
        </div>
        <p className="text-xs text-muted-foreground">
          All generated links redirect to the official YouTube video:{" "}
          <a href={target} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Rick Astley — Never Gonna Give You Up
          </a>
          .
        </p>
      </ToolCard>

      <HowToUse
        heading="How to generate a rickroll link"
        steps={[
          "Type any irresistible custom title — fake news, leaked product, dramatic gossip.",
          "Copy the generated rickroll link.",
          "Share it on Discord, WhatsApp, SMS, Twitter, Roblox chat or Slack.",
          "Watch the reactions. Repeat.",
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "What is a rick roll link generator?",
          paragraphs: [
            "Rickrolling is an internet prank that started in 2007: someone clicks what looks like a relevant link and is taken instead to the music video for Rick Astley's 'Never Gonna Give You Up'. Twenty years later, the joke is as alive as ever — the original video has surpassed 1.5 billion YouTube views and 'rick roll link generator' is searched 1,300+ times per month in the US alone.",
            "A rickroll link generator is the tool that makes the prank effortless. Type a juicy fake title, copy the link, share it. Anyone who clicks gets rickrolled.",
          ],
        },
        {
          h2: "Custom rickroll, fake link & prank link generator",
          paragraphs: [
            "The custom rick roll link generator above lets you tailor the bait. A boring 'click here' link won't fool anyone — but 'LEAKED: New iPhone announcement', 'You're in this video at 0:42', or 'Apparently this is the new TikTok trend' get clicks every time.",
            "The same generator also acts as a fake link generator, prank link generator, troll link generator and fake link generator prank tool — they're all the same thing: a disguised URL with a custom-readable title.",
          ],
        },
        {
          h2: "Discord fake link generator and Roblox fake link generator",
          paragraphs: [
            "Discord and Roblox are by far the two most popular places to share a rickroll in 2026. The discord fake link generator output above renders as a clickable preview inside Discord with your custom label as the title and Rick Astley as the destination.",
            "The roblox fake link generator works the same way — paste the generated link into any Roblox chat. Roblox chat does not preview links, which makes the prank even more effective: the recipient has to actually click to find out what it is.",
          ],
        },
        {
          h2: "Why rickrolling still works in 2026",
          paragraphs: [
            "Rickrolling endures because it's intergenerational and harmless. A 12-year-old getting rickrolled today is participating in the same in-joke as people who were online in 2007. There's no malware payload, no scam, no data collected — it's the cleanest prank on the internet.",
            "Pair the rickrolling link generator with a serious-looking custom slug from our SEO URL Slug Generator (e.g. /q3-financial-report) for maximum corporate-prank impact.",
          ],
        },
        {
          h2: "Famous rickrolls and where to use yours",
          paragraphs: [
            "Companies, governments and even live news broadcasts have pulled off public rickrolls over the years — RCA Records and YouTube themselves have set up redirects to the video on April Fools' Day. The Oregon House of Representatives accidentally let it air. NASA tweeted it. It's the internet's running gag.",
            "Where to share yours: friend group chats, a too-good-to-be-true Reddit comment, a 'helpful Stack Overflow link', a fake meeting invite, a 'check out this new SaaS' message in r/SaaS, an 'I made this for you' Valentine's text. Just don't paste it into a real work URL — keep it for play.",
          ],
        },
        {
          h2: "Free fake link generator — etiquette and safety",
          paragraphs: [
            "Rickrolling is the only prank link people genuinely don't mind being on the receiving end of. Don't repurpose this fake link generator for scam pages, phishing or malware redirects — every link from this tool only ever points to the official YouTube video.",
            "Also: avoid rickrolling people in serious contexts (job applications, urgent customer support tickets, emergency channels). Like all good comedy, timing is everything.",
          ],
        },
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading="Rick roll link generator FAQ" />

      <ContextualLinks
        heading="Related link generators"
        links={[
          { to: "/premium-link-generator", anchor: "Premium Link Generator", blurb: "free Rapidgator, Turbobit, Nitroflare premium link generator on the home page." },
          { to: "/slug-generator", anchor: "SEO URL Slug Generator", blurb: "build serious-looking slugs to disguise your prank URL." },
          { to: "/whatsapp-link-generator", anchor: "WhatsApp Link Generator", blurb: "send the rickroll over WhatsApp click-to-chat." },
          { to: "/mailto-link-generator", anchor: "Mailto Link Generator", blurb: "build the email link that hides the rickroll inside a serious subject." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
