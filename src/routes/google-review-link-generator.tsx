import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection,
  SeoLongform, ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What is a Google review link generator?", a: "A Google review link generator is a free tool that builds a short URL that opens the Google review form for your Google Business Profile in one tap — no scrolling, no searching, no extra clicks." },
  { q: "How do I generate a Google review link?", a: "Find your Google Place ID, paste it into the generator above, and copy the resulting link. The free Google review link generator builds the official search.google.com/local/writereview URL Google itself uses." },
  { q: "How to generate a Google review link with 5 stars?", a: "Enable the '5-star prefill' option. The Google review link generator 5 stars version opens the review dialog with 5 stars pre-selected (customers can still change it before submitting)." },
  { q: "Is the Google My Business review link generator free?", a: "Yes — completely free with no extension required. Unlike the paid Whitespark Google review link generator, this tool runs in your browser and never asks for an account." },
  { q: "How to find my Google Place ID for the review link generator?", a: "Use Google's free Place ID Finder at developers.google.com/maps/documentation/places/web-service/place-id. Search your business name, copy the Place ID and paste it into the generator above." },
  { q: "Why use a Google business review link generator vs the long URL?", a: "The generated Google business review link opens the review dialog directly. Sharing the raw Google Maps URL forces customers to search, scroll and tap multiple times — most give up. A direct link more than doubles review conversion." },
  { q: "Can I use this as a Yelp or Facebook review link generator?", a: "This tool focuses on Google reviews. For Yelp, Facebook and Amazon reviews you can build similar short links by hand — but Google is the highest-impact platform for local SEO in the USA." },
];

const TITLE = "Google Review Link Generator — Free, 5-Star Prefill, Place ID";
const DESC = "Free Google review link generator with 5-star prefill. Create a Google My Business review link from your Place ID in seconds — no extension, no signup.";

export const Route = createFileRoute("/google-review-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/google-review-link-generator",
    name: "Google Review Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Home", item: "/" }, { name: "Google Review Link Generator", item: "/google-review-link-generator" }],
  }),
  component: Page,
});

function Page() {
  const [placeId, setPlaceId] = useState("ChIJj61dQgK6j4AR4GeTYWZsKWw");
  const [fiveStar, setFiveStar] = useState(true);
  const { review, profile } = useMemo(() => {
    const base = `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
    return {
      review: fiveStar ? `${base}&rating=5` : base,
      profile: `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`,
    };
  }, [placeId, fiveStar]);

  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Google Review Link Generator" }]} />
      <ToolHero
        h1="Google Review Link Generator — Free with 5-Star Prefill"
        intro="Generate a direct Google review link for your Google My Business profile in seconds. Optionally prefill 5 stars so happy customers can leave a 5-star Google review with one tap — the fastest, free Google review link generator for local businesses."
      />

      <ToolCard>
        <Field label="Google Place ID" hint="Find yours at developers.google.com/maps/documentation/places/web-service/place-id">
          <input className={inputCls} value={placeId} onChange={(e) => setPlaceId(e.target.value)} />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={fiveStar} onChange={(e) => setFiveStar(e.target.checked)} />
          Prefill 5 stars (recommended for happy customers)
        </label>
        <div>
          <span className="block text-sm font-medium mb-1.5">Google review link</span>
          <OutputBlock value={review} />
        </div>
        <div>
          <span className="block text-sm font-medium mb-1.5">Google Business Profile link</span>
          <OutputBlock value={profile} />
        </div>
      </ToolCard>

      <HowToUse
        heading="How to generate a Google review link"
        steps={[
          "Open Google's free Place ID Finder and search your business name.",
          "Copy the Place ID (it starts with ChIJ...).",
          "Paste the Place ID into the generator above and choose whether to prefill 5 stars.",
          "Copy the generated Google review link and share it via SMS, email, WhatsApp or a printed QR code.",
        ]}
      />

      <SeoLongform sections={[
        {
          h2: "What is a Google review link generator?",
          paragraphs: [
            "A Google review link generator is a small SEO utility that converts your Google Business Profile (formerly Google My Business) into a single short link that opens the review form directly. When a customer taps it, they're taken straight to the 'Rate and review' modal — no searching for your listing, no scrolling, no extra taps.",
            "Reviews are the strongest local-SEO ranking factor in 2026. The volume of reviews, recency and average rating directly influence whether your business appears in the Google Local 3-Pack. Removing friction from the review-leaving flow is the single biggest lever a local business has to grow.",
            "The free Google review link generator above builds the official search.google.com/local/writereview URL — exactly the same one Google itself uses inside the Business Profile dashboard.",
          ],
        },
        {
          h2: "How to generate a Google review link with 5 stars prefilled",
          paragraphs: [
            "Toggling the 5-star prefill option on the generator above appends &rating=5 to the URL. When a happy customer taps it, the review form opens with 5 stars already selected. They can still change it — Google does not allow forced ratings — but most people will simply leave it as-is and write a short comment.",
            "This is the legitimate, Google-supported way to encourage 5-star reviews. It's the same mechanism used by Whitespark, BirdEye and other paid platforms. The difference: ours is completely free.",
          ],
        },
        {
          h2: "How to find your Google Place ID",
          paragraphs: [
            "Your Google Place ID is a permanent, unique identifier for your business location. Find it in one of three ways: (1) Use Google's official Place ID Finder at developers.google.com/maps/documentation/places/web-service/place-id and search your business name. (2) Open your Google Business Profile, click 'Share your business profile' and inspect the URL. (3) Use the Place ID Lookup inside Google Maps Platform console.",
            "Once you have it (it always starts with 'ChIJ'), paste it into the generator above. The Place ID never changes — generate the review link once and you can reuse it forever.",
          ],
        },
        {
          h2: "Where to share your Google review link",
          paragraphs: [
            "The highest-converting places to share a Google review link: post-purchase email, SMS receipt, payment-success page, printed receipt, business card, table tent (for restaurants), service-completion email (for trades), thank-you card included in packaging, and a follow-up WhatsApp message.",
            "Pro tip: turn the generated Google review link into a QR code and print it at the counter, on menus, or on packaging. Customers scan and review in under 30 seconds.",
          ],
        },
        {
          h2: "Google review link generator for Google My Business — local SEO impact",
          paragraphs: [
            "Local businesses that systematically request reviews using a direct Google My Business review link generator typically gain 3–10x more reviews per month than those who hope customers find the listing on their own. In competitive USA markets (HVAC, dentistry, real estate, restaurants), this often translates into 1–2 spots higher in the local pack within 60–90 days.",
            "Pair the Google review link generator with consistent NAP (name, address, phone) info across your site, accurate categories and a fresh Google Business Profile, and you have the highest-leverage free local-SEO stack available.",
          ],
        },
        {
          h2: "Free Google review link generator vs paid tools (Whitespark, BirdEye)",
          paragraphs: [
            "Paid tools like Whitespark, BirdEye, Podium and NiceJob bundle review-link generation with review monitoring, response automation, SMS sending and reputation reporting. If you need those workflows at scale, they're worth the $99–$499/month.",
            "If you just need the link itself, this free Google review link generator does the exact same job. Many small businesses run the free generator alongside a simple Zapier flow (Stripe payment → SMS with review link) to get 90% of the impact at 0% of the cost.",
          ],
        },
      ]} />

      <FaqSection items={FAQS} heading="Google review link generator FAQ" />

      <ContextualLinks
        heading="Related local-SEO link generators"
        links={[
          { to: "/premium-link-generator", anchor: "Premium Link Generator", blurb: "free Rapidgator, Turbobit & Nitroflare premium link generator on the home page." },
          { to: "/google-maps-link-generator", anchor: "Google Maps Link Generator", blurb: "directions and Place ID links for your business profile." },
          { to: "/whatsapp-link-generator", anchor: "WhatsApp Link Generator", blurb: "send the review link via WhatsApp click-to-chat." },
          { to: "/mailto-link-generator", anchor: "Mailto Link Generator", blurb: "build an email link to ask happy customers for a review." },
        ]}
      />

      <BackToHomeLink />
    </ToolLayout>
  );
}
