import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { ShareAndGuestbook } from "@/components/backlink-block";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/google-review-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Why does the link open the review dialog directly?", "a": "Google's `writereview` endpoint takes a Place ID and pops the 5-star modal once the user is signed in."}, {"q": "Where do I find my Place ID?", "a": "Use Google's free Place ID Finder. Search your business name and copy the ID shown."}, {"q": "Can I make it a QR code?", "a": "Yes — paste the result into the QR Code Link Generator and print it on receipts."}, {"q": "Does this work for unverified listings?", "a": "No — your Google Business Profile must be verified to collect reviews."}, {"q": "Will customers need a Google account?", "a": "Yes — Google requires a signed-in account to post reviews."}];
const STEPS = ["Find your Place ID with Google's Place ID Finder.", "Paste it above.", "Copy the writereview URL.", "Print it as a QR code or add it to receipts, SMS and emails."];
const TITLE = "Google Review Link Generator — Free Online Tool";
const DESC = "Turn your Google Business Place ID into a direct ‘Write a review’ link customers can tap from a QR code, SMS or receipt.";

export const Route = createFileRoute("/google-review-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/google-review-link-generator",
    name: "Google Review Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Google Review Link Generator", item: "/google-review-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Google Review Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Google Review Link Generator" }]} />
      <ToolHero h1={"Google Review Link Generator"} intro={"Turn your Google Business Place ID into a direct ‘Write a review’ link customers can tap from a QR code, SMS or receipt."} keywords={KW} />

      <ToolForm
        fields={[{"name": "pid", "label": "Google Place ID", "type": "text", "placeholder": "ChIJN1t_tDeuEmsRUsoyG83frY4", "hint": "Find yours at developers.google.com/maps/documentation/places/web-service/place-id"}]}
        build={(v) => { return v.pid ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(String(v.pid).trim())}` : ''; }}
        
      />

      <HowToUse heading={"How to use the google review link generator"} steps={STEPS} />

      <AeoBlock
        question={"How do I create a Google review link?"}
        answer={"Use `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`. Find your Place ID in Google's free Place ID Finder tool — it's a long alphanumeric string starting with `ChIJ`."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Local plumber in Phoenix, AZ", "how": "Prints a QR linking to the review form on every invoice."}, {"who": "Restaurant in Austin, TX", "how": "Adds a ‘Rate us’ link to the after-meal SMS receipt."}, {"who": "Auto detailer in Miami, FL", "how": "Shares the link via WhatsApp after each appointment."}, {"who": "Dentist in Chicago, IL", "how": "Emails the review link 24 hours after a cleaning."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "Convert any link to a downloadable QR code PNG."}, {"to": "/whatsapp-link-generator", "anchor": "WhatsApp Link Generator", "blurb": "wa.me click-to-chat link with prefilled message & QR."}, {"to": "/google-maps-link-generator", "anchor": "Google Maps Link Generator", "blurb": "Maps & directions link from address, lat/lng or Place ID."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "Free short link & tiny URL generator with custom alias."}]}
      />

      <ShareAndGuestbook path="/google-review-link-generator" title={TITLE} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
