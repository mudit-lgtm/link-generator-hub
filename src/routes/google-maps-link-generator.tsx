import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout, RelatedTools } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What is a Google Maps link generator?", a: "It creates a shareable Google Maps URL from any address, latitude/longitude pair, or Place ID — ideal for websites, emails, and SMS." },
  { q: "What's the difference between a maps link and a directions link?", a: "A maps link opens the pin on the map; a directions link opens turn-by-turn navigation from the user's current location to your destination." },
  { q: "How do I find a Google Place ID?", a: "Use Google's Place ID Finder (developers.google.com/maps/documentation/places/web-service/place-id) and paste the result here for the most accurate link." },
  { q: "Will the link work on mobile?", a: "Yes — Google Maps URLs open the app on iOS and Android, or the web map if the app isn't installed." },
  { q: "Is the Google business map link generator free?", a: "100% free, no signup, runs entirely in your browser." },
];

const TITLE = "Google Maps Link Generator — Directions & Place ID";
const DESC = "Free Google Maps link generator. Create maps and directions links from any address, lat/lng, or Place ID. Perfect for businesses.";

export const Route = createFileRoute("/google-maps-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/google-maps-link-generator",
    name: "Google Maps Link Generator", faqs: FAQS,
  }),
  component: Page,
});

function Page() {
  const [query, setQuery] = useState("1600 Amphitheatre Parkway, Mountain View, CA");
  const [placeId, setPlaceId] = useState("");

  const { map, directions } = useMemo(() => {
    const q = encodeURIComponent(query);
    const placeSuffix = placeId ? `&query_place_id=${encodeURIComponent(placeId)}` : "";
    return {
      map: `https://www.google.com/maps/search/?api=1&query=${q}${placeSuffix}`,
      directions: `https://www.google.com/maps/dir/?api=1&destination=${q}${placeId ? `&destination_place_id=${encodeURIComponent(placeId)}` : ""}`,
    };
  }, [query, placeId]);

  return (
    <ToolLayout>
      <ToolHero
        h1="Google Maps Link Generator"
        intro="Generate Google Maps and directions links from any address, latitude/longitude, or Google Place ID. Use them on your business website, in emails, or in SMS confirmations."
      />
      <ToolCard>
        <Field label="Address or lat,lng">
          <input className={inputCls} value={query} onChange={(e) => setQuery(e.target.value)} />
        </Field>
        <Field label="Google Place ID (optional, recommended for businesses)">
          <input className={inputCls} value={placeId} onChange={(e) => setPlaceId(e.target.value)} placeholder="ChIJ..." />
        </Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">Google Maps link</span>
          <OutputBlock value={map} />
        </div>
        <div>
          <span className="block text-sm font-medium mb-1.5">Google Maps directions link</span>
          <OutputBlock value={directions} />
        </div>
      </ToolCard>
      <HowToUse steps={[
        "Paste your business address or lat/lng coordinates.",
        "Optionally add your Google Place ID for the most accurate result.",
        "Copy either the map link or the directions link and share.",
      ]} />
      <FaqSection items={FAQS} />
      <RelatedTools exclude="/google-maps-link-generator" />
    </ToolLayout>
  );
}
