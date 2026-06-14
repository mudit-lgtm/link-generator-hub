import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/google-maps-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Can I use latitude and longitude?", "a": "Yes — paste `lat,lng` as the query. Maps treats the comma value as coordinates."}, {"q": "Does the link work on iOS?", "a": "Yes — iPhones open Google Maps if installed or fall back to Apple Maps via the URL."}, {"q": "How do I link to a specific Place ID?", "a": "Use `https://www.google.com/maps/place/?q=place_id:YOUR_PLACE_ID`."}, {"q": "Can I add a starting point?", "a": "Yes — append `&origin=<address>` to the directions URL."}, {"q": "Is there a character limit?", "a": "URLs over ~2,000 chars may truncate in SMS — shorten the result for messaging."}];
const STEPS = ["Enter an address, place name or `lat,lng` coordinates.", "Pick a travel mode if you want directions; leave blank to show a pin.", "Copy the URL.", "Add it to your site, email or QR code."];
const TITLE = "Google Maps Link Generator — Free Online Tool";
const DESC = "Generate a Google Maps link for any address, lat/lng or place — with optional travel mode for directions.";

export const Route = createFileRoute("/google-maps-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/google-maps-link-generator",
    name: "Google Maps Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Google Maps Link Generator", item: "/google-maps-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use the Google Maps Link Generator",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Google Maps Link Generator" }]} />
      <ToolHero h1={"Google Maps Directions Link Generator"} intro={"Generate a Google Maps link for any address, lat/lng or place — with optional travel mode for directions."} keywords={KW} />

      <ToolForm
        fields={[{"name": "q", "label": "Address, place name, or lat,lng", "type": "text", "placeholder": "1600 Amphitheatre Pkwy, Mountain View, CA"}, {"name": "mode", "label": "Travel mode (for directions)", "type": "select", "options": [{"value": "", "label": "None — show place"}, {"value": "driving", "label": "Driving"}, {"value": "walking", "label": "Walking"}, {"value": "bicycling", "label": "Bicycling"}, {"value": "transit", "label": "Transit"}]}]}
        build={(v) => { if(!v.q) return ''; const q=encodeURIComponent(String(v.q).trim()); return v.mode ? `https://www.google.com/maps/dir/?api=1&destination=${q}&travelmode=${v.mode}` : `https://www.google.com/maps/search/?api=1&query=${q}`; }}
        
      />

      <HowToUse heading={"How to use the google maps link generator"} steps={STEPS} />

      <AeoBlock
        question={"What's the URL format for a Google Maps link?"}
        answer={"Use `https://www.google.com/maps/search/?api=1&query=<address>` to show a place, or `https://www.google.com/maps/dir/?api=1&destination=<address>&travelmode=driving` for turn-by-turn directions."}
        keywords={KW}
      />

      <GeoBlock
        heading={"USA use cases"}
        keywords={KW}
        items={[{"who": "Restaurant in Austin, TX", "how": "Pins ‘Get directions’ on Google Business and the homepage footer."}, {"who": "Realtor in Miami, FL", "how": "Sends listing addresses with one-tap walking directions."}, {"who": "Event venue in Las Vegas, NV", "how": "Drops a directions link inside attendee email confirmations."}, {"who": "Local salon in Brooklyn, NY", "how": "Embeds a transit directions link on the contact page."}]}
      />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks
        heading="Related link generators"
        links={[{"to": "/google-review-link-generator", "anchor": "Google Review Link Generator", "blurb": "related link generator."}, {"to": "/whatsapp-link-generator", "anchor": "WhatsApp Link Generator", "blurb": "related link generator."}, {"to": "/qr-code-link-generator", "anchor": "QR Code Link Generator", "blurb": "related link generator."}, {"to": "/short-link-generator", "anchor": "Short Link Generator", "blurb": "related link generator."}]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
