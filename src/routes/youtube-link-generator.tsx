import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";
const KW = SEO["/youtube-link-generator"].keywords;

const FAQS = [
  { q: "What is a YouTube link generator?", a: "A YouTube link generator builds direct, subscribe and timestamped YouTube URLs from a channel ID or video ID. The free youtube link generator above produces auto-subscribe popups, 1k subscribers link, and timestamped video links in seconds." },
  { q: "How to generate a YouTube link for my channel?", a: "Paste your channel handle, channel ID or video ID into the field above. The youtube link to video generator builds the correct YouTube URL with the option to add ?sub_confirmation=1 (auto subscribe link generator) or &t=1m20s (timestamp)." },
  { q: "What's a YouTube subscribe link generator?", a: "A YouTube subscribe link generator appends ?sub_confirmation=1 to your channel URL. When viewers click, YouTube opens a one-click subscribe popup — the easiest growth trick for creators chasing 1k subscribers." },
  { q: "Does the auto subscribe link generator actually work?", a: "Yes — ?sub_confirmation=1 is an official YouTube URL parameter. It triggers the subscribe confirmation modal as soon as the user lands on your channel page." },
  { q: "How do I generate a YouTube timestamp link?", a: "Switch the mode above to 'Timestamp link' and enter the time (e.g. 1m20s). The youtube direct link generator outputs https://youtu.be/VIDEO_ID?t=80." },
  { q: "Can I use this for end-screen and description CTAs?", a: "Yes. The youtube link generator output works in video descriptions, end screens, community posts, Shorts CTAs and external blogs." },
  { q: "Is this YouTube link generator free?", a: "100% free, no signup, runs entirely in your browser." },
];

const TITLE = "YouTube Link Generator — Free Subscribe & Timestamp Link Builder";
const DESC = "Free YouTube link generator. Generate subscribe link, auto subscribe link, 1k subscribers link and timestamped video links — the easiest youtube link to video generator.";

export const Route = createFileRoute("/youtube-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/youtube-link-generator",
    name: "YouTube Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "YouTube Link Generator", item: "/youtube-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [mode, setMode] = useState<"subscribe" | "video" | "timestamp">("subscribe");
  const [id, setId] = useState("@MrBeast");
  const [time, setTime] = useState("1m20s");

  const link = useMemo(() => {
    if (!id.trim()) return "";
    const handle = id.startsWith("@") ? id : `@${id}`;
    if (mode === "subscribe") return `https://www.youtube.com/${handle}?sub_confirmation=1`;
    if (mode === "video") return `https://youtu.be/${id.replace(/^@/, "")}`;
    // timestamp -> parse 1m20s -> 80
    const m = time.match(/(?:(\d+)m)?(?:(\d+)s)?/);
    const seconds = (parseInt(m?.[1] || "0") * 60) + parseInt(m?.[2] || "0");
    return `https://youtu.be/${id.replace(/^@/, "")}?t=${seconds}`;
  }, [mode, id, time]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "YouTube Link Generator" }]} />
      <ToolHero
        h1="YouTube Link Generator — Free Subscribe, Auto-Subscribe & Timestamp Builder"
        intro="Generate a YouTube link in one click. This free youtube link generator works as a subscribe link generator, auto subscribe link generator, 1k subscribers link generator and youtube link to video generator — perfect for end-screens, descriptions and Shorts CTAs."
        keywords={KW}
      />

      <ToolCard>
        <Field label="Link type">
          <select className={inputCls} value={mode} onChange={(e) => setMode(e.target.value as never)}>
            <option value="subscribe">Subscribe link (auto-confirmation popup)</option>
            <option value="video">Direct video link (youtu.be short)</option>
            <option value="timestamp">Timestamped video link</option>
          </select>
        </Field>
        <Field label={mode === "subscribe" ? "Channel handle (e.g. @MrBeast)" : "Video ID (e.g. dQw4w9WgXcQ)"}>
          <input className={inputCls} value={id} onChange={(e) => setId(e.target.value)} />
        </Field>
        {mode === "timestamp" && (
          <Field label="Start time" hint="Format: 1m20s, 2m, 45s">
            <input className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} />
          </Field>
        )}
        <div>
          <span className="block text-sm font-semibold mb-1.5">Your YouTube link</span>
          <OutputBlock value={link} />
        </div>
      </ToolCard>

      <HowToUse
        heading="How to generate a YouTube link"
        steps={[
          "Pick the link type: subscribe popup, direct video, or timestamped video.",
          "Paste your channel handle or video ID.",
          "(Timestamp mode) Enter when the video should start.",
          "Copy the generated YouTube link and drop it into descriptions, end screens, blogs or community posts.",
        ]}
      />

      <AeoBlock
        question="What is a YouTube subscribe link generator?"
        answer="A YouTube subscribe link generator appends ?sub_confirmation=1 to your channel URL. When viewers click the generated youtube subscribe link, YouTube opens a one-click subscribe confirmation popup — the simplest growth tactic for creators pushing for 1k subscribers and monetisation eligibility."
        keywords={KW}
      />

      <GeoBlock
        heading="YouTube link generator — USA creator use cases"
        keywords={KW}
        items={[
          { who: "Vlogger in Los Angeles, CA", how: "Drops a subscribe link generator URL in every video description and pinned comment." },
          { who: "Tech reviewer in Austin, TX", how: "Uses the timestamped youtube direct link generator to share product close-ups with brand partners." },
          { who: "Faceless channel in Miami, FL", how: "Generates auto subscribe link generator URLs for Reddit and X promotion." },
          { who: "Cooking creator in Brooklyn, NY", how: "Puts the youtube subscribe link generator output in newsletter CTAs." },
        ]}
      />

      <SeoLongform keywords={KW} sections={[
        {
          h2: "Free YouTube link generator — how to generate a youtube link in one click",
          paragraphs: [
            "If you're a creator chasing 1k subscribers and the YouTube Partner Program, you've probably searched 'how to generate a youtube link' or '1k subscribers link generate' a dozen times. The truth is YouTube does most of the work for you — you just need the right URL parameters.",
            "The youtube link generator above handles three patterns: ?sub_confirmation=1 (subscribe popup), the short youtu.be domain (direct video), and ?t=NN (timestamp). That covers 95% of creator use cases.",
          ],
        },
        {
          h2: "Subscribe link generator and auto subscribe link generator",
          paragraphs: [
            "A subscribe link generator (also called an auto subscribe link generator) appends ?sub_confirmation=1 to your channel URL. The result: when a viewer clicks the generated youtube subscribe link, YouTube pops up the subscribe confirmation modal automatically, dramatically increasing subscribe-conversion rates compared to a plain channel link.",
            "Use it in every video description, the pinned comment, your Twitter/X bio, your end-screen card and every cross-promo collaboration.",
          ],
        },
        {
          h2: "YouTube direct link generator and youtube link to video generator",
          paragraphs: [
            "The youtu.be/VIDEO_ID short domain is the cleanest YouTube share URL — no UTM clutter, no playlist parameters. Our youtube direct link generator outputs that format, ready to drop into any social channel.",
            "Add ?t=NN to start the video at a specific second — perfect for highlighting product reveals at the 1m20s mark.",
          ],
        },
        {
          h2: "Where to use your generated YouTube links",
          paragraphs: [
            "Video descriptions, pinned comments, end-screen elements, community posts, Shorts captions, blog embeds, newsletter CTAs, Discord servers, Reddit threads (where allowed), Linktree, Instagram bios.",
          ],
        },
      ]} />

      <FaqSection items={FAQS} keywords={KW} heading="YouTube link generator FAQ" />

      <ContextualLinks
        heading="Related link generators"
        links={[
          { to: "/short-link-generator", anchor: "Short Link Generator", blurb: "shorten the YouTube subscribe link for SMS and social bios." },
          { to: "/qr-code-link-generator", anchor: "QR Code Link Generator", blurb: "QR-code the youtube subscribe link for end-screens and packaging." },
          { to: "/utm-link-generator", anchor: "UTM Link Generator", blurb: "add UTM tags before pasting in newsletter CTAs." },
          { to: "/whatsapp-link-generator", anchor: "WhatsApp Link Generator", blurb: "cross-promote your channel through WhatsApp click-to-chat." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
