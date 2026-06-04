import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout, RelatedTools } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What is a Google review link generator?", a: "It builds a short URL that takes customers directly to the Google review form for your business — no searching, no scrolling, just one tap to leave a review." },
  { q: "How do I generate a Google review link with 5 stars?", a: "Enable the '5-star prefill' option in the tool. The generated link opens the review dialog with 5 stars pre-selected (customers can still change it)." },
  { q: "How do I find my Google Place ID?", a: "Use Google's free Place ID Finder at developers.google.com/maps/documentation/places/web-service/place-id and search your business name." },
  { q: "Is this Google My Business review link generator free?", a: "Yes, free and unlimited. No signup, no extension needed." },
  { q: "Will it work for businesses outside the US?", a: "Yes — Google review links work worldwide for any verified Google Business Profile." },
];

const TITLE = "Google Review Link Generator — Free with 5-Star Prefill";
const DESC = "Free Google review link generator. Create a direct review link (with 5-star prefill) for your Google Business Profile in seconds.";

export const Route = createFileRoute("/google-review-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/google-review-link-generator",
    name: "Google Review Link Generator", faqs: FAQS,
  }),
  component: Page,
});

function Page() {
  const [placeId, setPlaceId] = useState("ChIJj61dQgK6j4AR4GeTYWZsKWw");
  const [fiveStar, setFiveStar] = useState(true);

  const { review, search } = useMemo(() => {
    const base = `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
    return {
      review: fiveStar ? `${base}&rating=5` : base,
      search: `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`,
    };
  }, [placeId, fiveStar]);

  return (
    <ToolLayout>
      <ToolHero
        h1="Google Review Link Generator"
        intro="Turn your Google Business Profile into a one-tap review link. Optionally prefill 5 stars to make leaving a positive review effortless for happy customers."
      />
      <ToolCard>
        <Field label="Google Place ID" hint="Find yours at developers.google.com/maps/documentation/places/web-service/place-id">
          <input className={inputCls} value={placeId} onChange={(e) => setPlaceId(e.target.value)} />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={fiveStar} onChange={(e) => setFiveStar(e.target.checked)} />
          Prefill 5 stars
        </label>
        <div>
          <span className="block text-sm font-medium mb-1.5">Google review link</span>
          <OutputBlock value={review} />
        </div>
        <div>
          <span className="block text-sm font-medium mb-1.5">Business profile link</span>
          <OutputBlock value={search} />
        </div>
      </ToolCard>
      <HowToUse steps={[
        "Find your Google Place ID using Google's Place ID Finder.",
        "Paste the Place ID here and choose whether to prefill 5 stars.",
        "Copy the link and send it to customers via email, SMS, or QR code.",
      ]} />
      <FaqSection items={FAQS} />
      <RelatedTools exclude="/google-review-link-generator" />
    </ToolLayout>
  );
}
