import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/mega-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "What is the `#` part of a MEGA link?", "a": "It's the end-to-end encryption key. MEGA never sees it; only people with the full URL can decrypt the file."}, {"q": "Why is my MEGA link missing a key?", "a": "You copied just the URL bar text after the page redirected. Use the official Share → Copy link option."}, {"q": "Can I shorten a MEGA link safely?", "a": "Most shorteners drop the URL fragment after `#`. Use a shortener that preserves fragments or share the full URL."}, {"q": "Are there bandwidth limits on MEGA?", "a": "Free recipients hit a quota; the uploader can use MEGA's transfer add-on or paid plans for unlimited delivery."}, {"q": "Is MEGA blocked anywhere?", "a": "Some networks block MEGA. Pair the share with a mirror on a second host for reliability."}];
const STEPS = ["In MEGA, right-click the file or folder and choose Share.", "Copy the link including the part after `#`.", "Paste it above to verify the structure.", "Share the validated URL with recipients."];
const TITLE = "MEGA Link Generator — Free Online Tool";
const DESC = "Validate and format MEGA.nz share links for files and folders. Paste a MEGA URL and we'll check the structure and decryption key.";

export const Route = createFileRoute("/mega-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/mega-link-generator",
    name: "MEGA Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "MEGA Link Generator", item: "/mega-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the MEGA Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "MEGA Link Generator" }]} />
      <ToolHero h1={"MEGA.nz Share Link Formatter"} intro={"Validate and format MEGA.nz share links for files and folders. Paste a MEGA URL and we'll check the structure and decryption key."} keywords={KW} />

      <ToolForm
        fields={[{"name": "u", "label": "MEGA.nz URL", "type": "url", "placeholder": "https://mega.nz/file/ABC123#decryption_key"}]}
        build={(v) => { if(!v.u) return ''; const m=v.u.match(/mega\.nz\/(file|folder)\/([A-Za-z0-9_-]+)(?:#([A-Za-z0-9_-]+))?/); if(!m) return ''; if(!m[3]) return 'Missing decryption key (#...) — recipients cannot decrypt this share.'; return `https://mega.nz/${m[1]}/${m[2]}#${m[3]}`; }}
        
      />

      <HowToUse heading={"How to use the mega link generator"} steps={STEPS} />

      <AeoBlock
        question={"What makes a valid MEGA share link?"}
        answer={"A working MEGA link contains the type (file or folder), the share ID and a decryption key after `#`. Without the `#key` portion recipients cannot decrypt the share."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "VFX artist in Vancouver-adjacent Seattle, WA", "how": "Sends 50 GB render bundles to clients via MEGA folder links."}, {"who": "Indie label in Nashville, TN", "how": "Distributes mastered tracks to streaming aggregators through MEGA."}, {"who": "Researcher in Cambridge, MA", "how": "Shares datasets too large for institutional file servers."}, {"who": "Translator in Austin, TX", "how": "Returns large bilingual asset packs to enterprise clients."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/premium-link-generator", "anchor": "Premium Link Generator", "blurb": "related link generator."}, {"to": "/direct-download-link-generator", "anchor": "Direct Download Link Generator", "blurb": "related link generator."}, {"to": "/magnet-link-generator", "anchor": "Magnet Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
