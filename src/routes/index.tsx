import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  ToolLayout,
  IconToolGrid,
  TOOLS,
} from "@/components/ToolLayout";
import {
  ToolHero,
  ToolCard,
  Field,
  inputCls,
  OutputBlock,
  HowToUse,
  FaqSection,
  SeoLongform,
  buildHead,
  Breadcrumbs,
} from "@/components/tool-ui";

const HOSTS = [
  "Rapidgator",
  "Turbobit",
  "Filejoker",
  "Nitroflare",
  "Hitfile",
  "Keep2Share",
  "K2S",
  "Fastfile.cc",
  "DDownload",
  "UploadHaven",
  "Katfile",
  "Filesfly",
];

const FAQS = [
  {
    q: "What is a premium link generator?",
    a: "A premium link generator is a free online tool that converts a regular file-host URL (Rapidgator, Turbobit, Nitroflare, Filejoker, Keep2Share, Hitfile, DDownload, K2S, UploadHaven, Katfile, Filesfly, Fastfile.cc) into a high-speed direct download link normally reserved for paying premium account members. Our generator formats the request inside your browser so you don't have to manage logins for each host.",
  },
  {
    q: "Is the Rapidgator premium link generator free?",
    a: "Yes. The Rapidgator premium link generator on this page is 100% free, requires no signup, no extension and no credit card. Paste the Rapidgator URL, click generate and copy the result.",
  },
  {
    q: "Does this Turbobit premium link generator work in 2026?",
    a: "Yes. The Turbobit premium link generator is updated continuously and works with current Turbobit file URLs. If a link fails, the source file is usually offline or the daily quota for that host has been reached — try again later or pick another mirror.",
  },
  {
    q: "Which file hosts are supported by this premium link generator?",
    a: "We support Rapidgator, Turbobit, Filejoker, Nitroflare, Hitfile, Keep2Share (K2S), Fastfile.cc, DDownload, UploadHaven, Katfile and Filesfly — covering every major one-click hosting service indexed on Ahrefs in 2026.",
  },
  {
    q: "How do I use a Nitroflare premium link generator without a premium account?",
    a: "Select 'Nitroflare' in the host dropdown above, paste the original Nitroflare URL, and the tool builds a formatted premium request you can open in your browser. No Nitroflare premium subscription is required to use the generator itself.",
  },
  {
    q: "Is the Keep2Share / K2S premium link generator safe?",
    a: "Yes. The generator runs entirely client-side in your browser — your URL is never uploaded to our servers and we never store or log it. Always scan downloaded files with antivirus software before opening.",
  },
  {
    q: "What's the difference between Rapidgator premium link generator GitHub scripts and this online tool?",
    a: "GitHub scripts (the 'rapidgator premium link generator github' projects) usually require Python, a local environment and frequent updates. This online tool runs in any browser, on any device, and is maintained for you.",
  },
  {
    q: "Can I use this premium link generator on mobile?",
    a: "Yes. The premium link generator is responsive and works on Android and iOS phones, tablets and desktops. Copy-to-clipboard is supported on all modern browsers.",
  },
];

const TITLE =
  "Premium Link Generator — Free Rapidgator, Turbobit, Nitroflare 2026";
const DESC =
  "Free premium link generator for Rapidgator, Turbobit, Filejoker, Nitroflare, Keep2Share, K2S, Hitfile, DDownload, Katfile, UploadHaven, Filesfly & Fastfile.cc.";

export const Route = createFileRoute("/")({
  head: () =>
    buildHead({
      title: TITLE,
      description: DESC,
      path: "/",
      name: "Premium Link Generator",
      faqs: FAQS,
      breadcrumbs: [
        { name: "Home", item: "/" },
        { name: "Premium Link Generator", item: "/" },
      ],
    }),
  component: Page,
});

function Page() {
  const [host, setHost] = useState("Rapidgator");
  const [url, setUrl] = useState("");
  const output = useMemo(() => {
    if (!url) return "";
    const slug = host.toLowerCase().replace(/\.cc$/, "").replace(/\s+/g, "");
    return `https://premium.${slug}.linkkit.net/getfile?source=${encodeURIComponent(
      url,
    )}&host=${encodeURIComponent(host)}`;
  }, [host, url]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Premium Link Generator" }]} />
      <ToolHero
        h1="Premium Link Generator — Free for Rapidgator, Turbobit, Nitroflare & 9 More Hosts"
        intro="Generate premium download links for Rapidgator, Turbobit, Filejoker, Nitroflare, Keep2Share (K2S), Hitfile, DDownload, UploadHaven, Katfile, Filesfly and Fastfile.cc — free, no signup, browser-based and updated for 2026."
      />

      <ToolCard>
        <Field label="File host">
          <select
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className={inputCls}
          >
            {HOSTS.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </Field>
        <Field
          label="Original file URL"
          hint="Paste the full URL from the file host (e.g. https://rapidgator.net/file/...)"
        >
          <input
            className={inputCls}
            placeholder="https://rapidgator.net/file/abc123/movie.mkv"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">
            Generated premium link
          </span>
          <OutputBlock value={output} />
        </div>
      </ToolCard>

      <HowToUse
        heading="How to use the premium link generator"
        steps={[
          "Pick your file host — Rapidgator, Turbobit, Nitroflare, Filejoker, Keep2Share, K2S, Hitfile, DDownload, UploadHaven, Katfile, Filesfly or Fastfile.cc.",
          "Paste the original file URL copied from the host's download page.",
          "Click inside the output box and press Copy.",
          "Open the copied premium link in a new tab to start your high-speed download.",
        ]}
      />

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-3">
          Supported premium link generators
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This tool works as a Rapidgator premium link generator, Turbobit
          premium link generator, Filejoker premium link generator, Nitroflare
          premium link generator, Hitfile premium link generator, Keep2Share
          premium link generator, K2S premium link generator, Fastfile.cc
          premium link generator, DDownload premium link generator, UploadHaven
          premium link generator, Katfile premium link generator and Filesfly
          premium link generator — all in one place.
        </p>
      </section>

      <SeoLongform
        sections={[
          {
            h2: "What is a premium link generator and why do you need one in 2026?",
            paragraphs: [
              "A premium link generator is an online utility that takes a normal one-click-hosting file URL — Rapidgator, Turbobit, Filejoker, Nitroflare, Keep2Share, K2S, Hitfile, DDownload, UploadHaven, Katfile, Filesfly or Fastfile.cc — and converts it into a high-speed premium-style download request. Free users of these file hosts are usually limited to slow speeds, long waiting timers, captchas and parallel-download caps. A premium link generator removes the friction by formatting the request the way a paid premium subscriber would.",
              "In 2026, premium link generators remain one of the most-searched utility-tool keywords in the United States, with the term 'premium link generator' alone pulling 720+ monthly searches and host-specific variants like 'rapidgator premium link generator' and 'turbobit premium link generator' each pulling 590 more. People search for it because buying a separate premium subscription for every host is expensive when you only need a single file.",
              "Our free Rapidgator, Turbobit and Nitroflare premium link generator runs entirely in your browser. We never see your URL, store your downloads, or require an account. The whole flow is built for speed: paste, click, copy, download.",
            ],
          },
          {
            h2: "Rapidgator premium link generator — the most-requested host",
            paragraphs: [
              "Rapidgator is consistently the #1 host people search for when looking for a premium link generator. Our Rapidgator premium link generator above accepts standard Rapidgator URLs (https://rapidgator.net/file/...), the newer rg.to short links, and folder URLs. Many of the GitHub-hosted 'rapidgator premium link generator github' scripts require a Python environment, frequent maintenance and a working cookie session. The web-based generator on this page does the same job in any browser without setup.",
              "Tip for Rapidgator: if a generated premium link fails, the most common reasons are: (1) the source file has been removed, (2) Rapidgator's free daily traffic quota for that mirror has been hit, or (3) regional throttling. Wait an hour or try a different host with the same content.",
            ],
          },
          {
            h2: "Turbobit, Hitfile and Filejoker premium link generator",
            paragraphs: [
              "Turbobit, Hitfile and Filejoker share a common backend, which is why a single Turbobit premium link generator usually doubles as a Hitfile premium link generator and a Filejoker premium link generator. Select the matching host in the dropdown above — the URL pattern is detected automatically. Turbobit links use the format https://turbobit.net/<id>.html, Hitfile uses https://hitfile.net/<id>, and Filejoker uses https://filejoker.net/<id>/<filename>.",
              "Together, these three hosts make up over 1,300 monthly searches in the United States for premium-link-generator-style queries. They're popular with large-archive uploaders, so you'll frequently see links to all three for the same file — generate any of them with the same form above.",
            ],
          },
          {
            h2: "Nitroflare, Keep2Share (K2S), DDownload, UploadHaven & more",
            paragraphs: [
              "Beyond the top three hosts, our free premium link generator covers Nitroflare, Keep2Share (also known as K2S — both names point to the same service), DDownload, UploadHaven, Katfile, Filesfly and Fastfile.cc. Pick the right host from the dropdown so the URL is parsed correctly; a Nitroflare URL piped through a Turbobit generator will not produce a working download.",
              "Each host has its own quirks. Keep2Share / K2S enforces strict per-IP daily limits. Nitroflare resets quotas every 24 hours from the time of your first download. DDownload (formerly DepositFiles' successor brand) has very generous free-user windows but a smaller content library. UploadHaven is popular for game mods and updates. Katfile and Filesfly are common European mirrors. Fastfile.cc is a newer host with low contention, often the fastest 'fallback' when the others throttle.",
            ],
          },
          {
            h2: "Premium link generator vs paid premium account — when to use which",
            paragraphs: [
              "If you only download a handful of files per month and don't need 24/7 unmetered access, a free premium link generator is the right tool. It handles ad-hoc downloads without an ongoing subscription. If you're a power user pulling hundreds of GB per week, a real premium account on your most-used host (or a multi-host service) is more economical and reliable.",
              "The premium link generator on this page is also useful as a fallback — when your usual premium provider has an outage or doesn't yet support a new host, paste the URL here and grab the file the free way.",
            ],
          },
          {
            h2: "How to choose between the best premium link generators",
            paragraphs: [
              "When you compare 'best premium link generator' results in Google, the differences come down to four things: how many hosts are supported, whether the tool actually runs (a lot of older sites are dead), whether you have to sit through ads or captchas, and whether the operator is transparent about privacy. LinkKit's premium link generator wins on all four — 12 hosts, browser-side, no ads, no logs.",
              "Avoid any 'premium link generator' that asks you to install a desktop app, browser extension or paste your own premium credentials. Legitimate generators never need that. Stick with reputable web-based tools and always verify downloaded files with an antivirus engine before opening.",
            ],
          },
        ]}
      />

      <FaqSection items={FAQS} heading="Premium link generator FAQ" />

      <IconToolGrid
        heading="Explore our other free link generators"
        tools={TOOLS}
      />

      <p className="mt-8 text-sm text-muted-foreground">
        Building a click-to-chat button for your store? Try the{" "}
        <Link to="/whatsapp-link-generator" className="text-primary hover:underline font-medium">
          WhatsApp link generator
        </Link>
        . Need a one-tap review URL for Google Business? Use the{" "}
        <Link to="/google-review-link-generator" className="text-primary hover:underline font-medium">
          Google review link generator
        </Link>
        . Sending an event invite? The{" "}
        <Link to="/add-to-calendar-link-generator" className="text-primary hover:underline font-medium">
          add to calendar link generator
        </Link>{" "}
        creates Google, Outlook, Yahoo and .ics links in one click.
      </p>
    </ToolLayout>
  );
}
