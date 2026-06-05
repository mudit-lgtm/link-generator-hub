import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What is a Google Maps link generator?", a: "A Google Maps link generator is a free online tool that creates a shareable Google Maps URL from any address, latitude/longitude pair or Google Place ID. The generated map link generator URL works on iOS, Android and desktop." },
  { q: "What is the difference between a Google Maps link generator and a Google Maps direction link generator?", a: "A Google Maps link generator produces a link that drops a pin on the map. A Google Maps direction link generator produces a link that opens turn-by-turn navigation from the user's current location to the destination. The tool above produces both at once." },
  { q: "Is this a free Google business map link generator?", a: "Yes. The Google business map link generator above is 100% free and works for any verified Google Business Profile. Optionally paste your Place ID for the most accurate result." },
  { q: "Can I use this as a directions link generator for emails and SMS?", a: "Yes — paste the generated directions link into emails, SMS confirmations, calendar invites and WhatsApp messages. The Google Maps link generator output is a plain URL that opens the Maps app on every modern phone." },
  { q: "Where do I find my Google Place ID for the generator?", a: "Use Google's free Place ID Finder at developers.google.com/maps/documentation/places/web-service/place-id. It's the same Place ID generator Google itself recommends." },
  { q: "Does the map link generator work for latitude/longitude?", a: "Yes. Paste coordinates in the 'lat,lng' format (for example 37.4220,-122.0841) into the address field. The Google Maps link generator builds a valid URL that opens the exact spot." },
  { q: "Will the generated Google Maps link work on mobile?", a: "Yes — Google Maps URLs open the Google Maps app on Android and iOS when installed, and fall back to maps.google.com in any browser." },
];

const TITLE = "Google Maps Link Generator — Directions, Place ID, Map URL";
const DESC = "Free Google Maps link generator. Build maps and directions links from any address, lat/lng or Place ID — ideal for businesses, emails, SMS and websites.";

export const Route = createFileRoute("/google-maps-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/google-maps-link-generator",
    name: "Google Maps Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "Google Maps Link Generator", item: "/google-maps-link-generator" }],
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
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Google Maps Link Generator" }]} />
      <ToolHero
        h1="Google Maps Link Generator — Free Map & Directions Link Generator"
        intro="Generate a Google Maps link, Google Maps direction link or Google business map link from any address, latitude/longitude pair or Place ID. The free directions link generator below outputs both a map link and a turn-by-turn directions URL ready to share."
      />

      <ToolCard>
        <Field label="Address or lat,lng">
          <input className={inputCls} value={query} onChange={(e) => setQuery(e.target.value)} />
        </Field>
        <Field label="Google Place ID (optional — recommended for businesses)">
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

      <HowToUse
        heading="How to generate a Google Maps link"
        steps={[
          "Paste your business address, a postcode, or latitude/longitude coordinates.",
          "Optionally add your Google Place ID for the most accurate result (recommended for businesses).",
          "Copy the map link to drop a pin, or the directions link for turn-by-turn navigation.",
          "Paste the link in your website footer, contact page, email signature, SMS confirmation or calendar invite.",
        ]}
      />

      <SeoLongform sections={[
        {
          h2: "What is a Google Maps link generator?",
          paragraphs: [
            "A Google Maps link generator is a free utility that builds a properly-formatted Google Maps URL from a place name, street address, latitude/longitude or Place ID. Instead of opening Google Maps, searching, copying the URL and trimming the tracking parameters by hand, the generator does it in one step.",
            "Two types of links are produced: a map link (drops a pin) and a Google Maps direction link generator output (opens turn-by-turn navigation from the user's current location).",
            "Both URLs use Google's officially documented maps.google.com/maps/?api=1 format — the only format guaranteed to keep working across every Google Maps web and app update.",
          ],
        },
        {
          h2: "Google Maps direction link generator for businesses",
          paragraphs: [
            "If you run a brick-and-mortar business — a restaurant, salon, dental clinic, real-estate office, hotel, gym or retail store — adding a 'Get directions' link to your website and email confirmations meaningfully improves walk-in conversion. Customers shouldn't have to copy your address into another app.",
            "Use the Google Maps direction link generator above with your Place ID for the most accurate result. The Place ID locks the destination to your exact storefront entrance rather than the closest geocoded address, which can occasionally point next door.",
          ],
        },
        {
          h2: "Google business map link generator and Google Place ID generator",
          paragraphs: [
            "Your Google Place ID is a permanent unique identifier for your physical business. It does not change when you rename your business, move within the same building, or update your Google Business Profile. Find it using Google's free Place ID Finder (the same tool sometimes searched as 'google place id generator').",
            "Once you have it, paste the Place ID into the field above. The Google business map link generator appends &query_place_id= and &destination_place_id= so Google Maps always opens your exact listing — useful for the Google Maps review link generator workflow too.",
          ],
        },
        {
          h2: "Map link generator for lat/lng coordinates",
          paragraphs: [
            "If you don't have a street address — for example you're sharing a trailhead, a marina slip, a remote vacation rental or a parking spot at a stadium — use latitude and longitude. Type the coordinates in the address field as 'lat,lng' (for example 37.4220,-122.0841).",
            "The map link generator output works on every device and never requires the recipient to install anything. Apple devices that don't have Google Maps installed will open the web map at maps.google.com.",
          ],
        },
        {
          h2: "Where to use your generated Google Maps and directions links",
          paragraphs: [
            "The highest-impact placements: contact page (replace the static address text with a clickable directions link), order confirmation emails (so customers can drive to pick up), event invites, calendar attachments built with our add to calendar link generator, SMS appointment reminders, footer of every page, and printed receipts.",
            "For multi-location businesses, generate one Google Maps link per location and store them in your CMS — never hardcode static maps URLs you copied from the browser address bar because they include short-lived session parameters that break.",
          ],
        },
        {
          h2: "Google Maps link generator vs Google Maps Embed",
          paragraphs: [
            "Use the Google Maps link generator when you want a clickable link the user opens in Google Maps itself. Use Google Maps Embed when you want to display a live, interactive map inside your own page.",
            "For most local businesses, a directions link is better than an embed — embeds are heavy, slow down your page speed score, and rarely convert better than a plain link. The Google Maps direction link generator output above is faster, accessible and works inside email (where iframes are blocked).",
          ],
        },
      ]} />

      <FaqSection items={FAQS} heading="Google Maps link generator FAQ" />

      <ContextualLinks
        heading="Related local-business link generators"
        links={[
          { to: "/", anchor: "Premium Link Generator", blurb: "free Rapidgator, Turbobit, Nitroflare premium link generator on the home page." },
          { to: "/google-review-link-generator", anchor: "Google Review Link Generator", blurb: "5-star Google My Business review link for the same Place ID." },
          { to: "/whatsapp-link-generator", anchor: "WhatsApp Link Generator", blurb: "click-to-chat link to share alongside your directions link." },
          { to: "/add-to-calendar-link-generator", anchor: "Add to Calendar Link Generator", blurb: "attach event details with the venue directions link inline." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
