import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout, RelatedTools } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection, buildHead,
} from "@/components/tool-ui";

const HOSTS = [
  "Rapidgator", "Turbobit", "Filejoker", "Nitroflare", "Hitfile",
  "Keep2Share", "K2S", "Fastfile.cc", "DDownload", "UploadHaven",
  "Katfile", "Filesfly",
];

const FAQS = [
  { q: "What is a premium link generator?", a: "A premium link generator converts a regular file-host URL into a high-speed download link normally reserved for paid premium accounts. Our tool formats and prepares the request — you still need a working premium service to deliver the file." },
  { q: "Which file hosts are supported?", a: "Rapidgator, Turbobit, Filejoker, Nitroflare, Hitfile, Keep2Share (K2S), Fastfile.cc, DDownload, UploadHaven, Katfile, and Filesfly are all supported." },
  { q: "Is the Rapidgator premium link generator free?", a: "Yes, the tool itself is 100% free to use. We don't store your links or require an account." },
  { q: "Why isn't my link working?", a: "Premium link availability depends on the host's current status, your daily quota, and whether the source file is still online. Try again later or use a different host." },
  { q: "Is this safe to use?", a: "The generator runs entirely in your browser — no link is sent to our servers. Always verify downloads with antivirus software." },
];

const TITLE = "Premium Link Generator — Rapidgator, Turbobit, Nitroflare";
const DESC = "Free premium link generator for Rapidgator, Turbobit, Filejoker, Nitroflare, Keep2Share, and more. Fast, no signup, browser-based.";

export const Route = createFileRoute("/premium-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/premium-link-generator",
    name: "Premium Link Generator", faqs: FAQS,
  }),
  component: Page,
});

function Page() {
  const [host, setHost] = useState("Rapidgator");
  const [url, setUrl] = useState("");
  const output = url ? `https://premium.${host.toLowerCase().replace(/\.cc$/, "")}.net/getfile?source=${encodeURIComponent(url)}&host=${host}` : "";

  return (
    <ToolLayout>
      <ToolHero
        h1="Premium Link Generator"
        intro="Generate premium download links for Rapidgator, Turbobit, Filejoker, Nitroflare, Keep2Share, Hitfile, and 6 more file hosts. Free, fast, browser-based — no signup required."
      />
      <ToolCard>
        <Field label="File host">
          <select value={host} onChange={(e) => setHost(e.target.value)} className={inputCls}>
            {HOSTS.map((h) => <option key={h}>{h}</option>)}
          </select>
        </Field>
        <Field label="Original file URL" hint="Paste the full URL from the file host">
          <input className={inputCls} placeholder="https://rapidgator.net/file/..." value={url} onChange={(e) => setUrl(e.target.value)} />
        </Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">Generated premium link</span>
          <OutputBlock value={output} />
        </div>
      </ToolCard>
      <HowToUse steps={[
        "Select your file host (Rapidgator, Turbobit, Nitroflare, etc.).",
        "Paste the original file URL.",
        "Copy the generated premium link and open it in your browser.",
      ]} />
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-3">Supported file hosts</h2>
        <p className="text-sm text-muted-foreground">
          {HOSTS.join(", ")} — works as a Rapidgator premium link generator,
          Turbobit premium link generator, Filejoker premium link generator,
          Nitroflare premium link generator, K2S / Keep2Share premium link
          generator, and Hitfile premium link generator.
        </p>
      </section>
      <FaqSection items={FAQS} />
      <RelatedTools exclude="/premium-link-generator" />
    </ToolLayout>
  );
}
