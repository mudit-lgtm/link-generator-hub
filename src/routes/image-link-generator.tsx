import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, WorkedExample, Pitfalls, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/image-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Are uploaded images sent to a server?", "a": "No — uploads stay in your browser. The generated URL only works in the current tab."}, {"q": "How do I get a permanent image link?", "a": "Host the file on Imgur, Cloudinary, GitHub, S3 or your own CDN, then copy that URL."}, {"q": "Will the preview URL work in email?", "a": "Browser blob URLs only work in the current tab. Use a real host for email and social embeds."}, {"q": "What image formats are supported?", "a": "Anything the browser renders: JPG, PNG, WebP, GIF, AVIF and SVG."}, {"q": "Can I shorten the link?", "a": "Yes — paste a hosted image URL into our short link generator."}];
const STEPS = ["Choose an image file, or paste an existing image URL.", "Confirm the preview renders as expected.", "Copy the link for use in code, posts or chats.", "For permanent hosting, upload to your image CDN of choice."];
const TITLE = "Image Link Generator — Free Online Tool";
const DESC = "Upload an image and instantly get a shareable in-browser preview URL — or paste an existing URL to validate it. Perfect for quick mockups and Discord embed";

export const Route = createFileRoute("/image-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/image-link-generator",
    name: "Image Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Image Link Generator", item: "/image-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Image Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Image Link Generator" }]} />
      <ToolHero h1={"Image Link Generator"} intro={"Upload an image and instantly get a shareable in-browser preview URL — or paste an existing URL to validate it. Perfect for quick mockups and Discord embeds."} keywords={KW} />

      <ToolForm
        fields={[{"name": "f", "label": "Upload an image", "type": "file", "accept": "image/*"}, {"name": "u", "label": "…or paste an existing image URL", "type": "url", "placeholder": "https://example.com/photo.jpg"}]}
        build={(v) => { return (v.f) || (v.u?String(v.u).trim():''); }}
        preview="image"
      />

      <HowToUse heading={"How to use the image link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a sharable image link?"}
        answer={"Either host the image on a service like Imgur, GitHub, Cloudinary or your own server and copy that public URL — or use the upload field above to generate a temporary in-browser preview URL for quick local sharing."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Open-source maintainer in Seattle, WA", "how": "Generates README badge previews before pushing to GitHub."}, {"who": "Designer in Brooklyn, NY", "how": "Drops mockups into Slack and Notion as quick image links."}, {"who": "Email marketer in Austin, TX", "how": "Validates hero-banner URLs before sending an MJML template."}, {"who": "Forum moderator in Chicago, IL", "how": "Checks signature graphics render correctly on every device."}]}
      />

      <WorkedExample intro={"One product photo prepared as a hosted link, an HTML tag and a clickable banner."} rows={[{"input": "photo.jpg uploaded", "output": "A direct https URL ending in .jpg"}, {"input": "HTML output", "output": "<img src=\"\u2026/photo.jpg\" alt=\"Linen shirt in oat\" width=\"800\">"}, {"input": "Clickable version", "output": "<a href=\"/products/linen-shirt\"><img \u2026></a>"}]} note={"Setting width and height on the tag reserves the space before the image loads, which stops the page jumping and improves layout scores."} />

      <Pitfalls items={[{"problem": "Empty alt text on meaningful images", "fix": "Describe what the image shows. Leave alt empty only for purely decorative graphics."}, {"problem": "Uploading a 4000px camera file", "fix": "Resize to roughly twice the displayed width. A 6 MB hero image is the most common mobile slowdown."}, {"problem": "Hotlinking from someone else's site", "fix": "It can be blocked or swapped for another picture at any moment, and it is using their bandwidth."}, {"problem": "PNG for photographs", "fix": "Use JPEG or WebP; PNG is for flat graphics and transparency, and triples the file size on photos."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/pdf-link-generator", "anchor": "PDF Link Generator", "blurb": "Build direct download links for PDF files."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}, {"to": "/direct-download-link-generator", "anchor": "Direct Download Link Generator", "blurb": "Force-download URLs for any hosted file."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
