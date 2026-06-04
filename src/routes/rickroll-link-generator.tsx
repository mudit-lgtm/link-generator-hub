import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout, RelatedTools } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What is a rickroll link generator?", a: "It creates a disguised link that looks like it points to something interesting — but actually opens the famous 'Never Gonna Give You Up' video. Classic harmless prank." },
  { q: "Does the rickroll link work on Discord?", a: "Yes. Discord shows the disguised preview text you choose, then redirects to the Rick Astley video when clicked." },
  { q: "Can I make a custom rick roll link?", a: "Absolutely — pick any preview title and use a short, shareable URL." },
  { q: "Is it free?", a: "Yes, the prank link generator is free and runs entirely in your browser." },
  { q: "Will it work for Roblox or other platforms?", a: "Any platform that lets you share a URL with link preview will work, including Roblox, Discord, Twitter, and Slack." },
];

const TITLE = "Rickroll Link Generator — Free Prank & Fake Link Tool";
const DESC = "Free rickroll link generator. Create custom rick roll, prank, and fake links to send to friends — works on Discord, Roblox, and more.";

export const Route = createFileRoute("/rickroll-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/rickroll-link-generator",
    name: "Rickroll Link Generator", faqs: FAQS,
  }),
  component: Page,
});

const RICK = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

function Page() {
  const [label, setLabel] = useState("You won't believe this!");
  const link = `https://l.rickrolled.fun/?t=${encodeURIComponent(label)}&go=${encodeURIComponent(RICK)}`;
  return (
    <ToolLayout>
      <ToolHero
        h1="Rickroll Link Generator"
        intro="Create custom rickroll, prank, and fake links with your own preview text. Share on Discord, Roblox, Twitter, or anywhere a URL renders a preview."
      />
      <ToolCard>
        <Field label="Disguise text (what people see)">
          <input className={inputCls} value={label} onChange={(e) => setLabel(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">Your rickroll link</span>
          <OutputBlock value={link} />
        </div>
        <p className="text-xs text-muted-foreground">
          Final destination: <a href={RICK} className="underline">Rick Astley — Never Gonna Give You Up</a>
        </p>
      </ToolCard>
      <HowToUse steps={[
        "Choose a tempting preview title (the more clickbait, the better).",
        "Copy the generated prank link.",
        "Share it and wait for the rickroll reactions.",
      ]} />
      <FaqSection items={FAQS} />
      <RelatedTools exclude="/rickroll-link-generator" />
    </ToolLayout>
  );
}
