import { createFileRoute, Link } from "@tanstack/react-router";

import { ToolLayout, TOOLS } from "@/components/ToolLayout";
import { ToolHero, Breadcrumbs, buildHead, FaqSection } from "@/components/tool-ui";

const TITLE = "About Businestools Links — Who Builds These URL Tools";
const DESC =
  "Businestools Links is a free browser-based URL utility from businestools.online. Learn who runs it, how the tools work, what data we store, and what we are not.";

const FAQS = [
  {
    q: "Who runs Businestools Links?",
    a: "It is an independent web utility published at shortlink.businestools.online, part of the businestools.online family of small-business web tools. There is no company account, no paywall and no sales team behind it.",
  },
  {
    q: "Is this related to the LinkKit IoT / hardware platform?",
    a: "No. Businestools Links has no connection to any hardware, firmware or IoT platform with a similar name. We publish browser-based URL builders only — nothing is installed, flashed or shipped.",
  },
  {
    q: "Do you store the data I type into a tool?",
    a: "No. Every URL is assembled in your browser with JavaScript. Nothing is posted to a server, so we never see phone numbers, email addresses, file links or messages. The only thing stored is the guestbook text you deliberately submit, and that stays in your own browser.",
  },
  {
    q: "Why did the premium file-host page disappear?",
    a: "It targeted paid file-host debrid queries, which is off-topic for a business URL toolkit and risky for site quality. It was retired and now points to the general direct download link tool.",
  },
  {
    q: "Can I suggest or request a tool?",
    a: "Yes. Use the guestbook on any tool page to leave a request; it is the fastest way to get a new generator into the queue.",
  },
];

export const Route = createFileRoute("/about")({
  head: () =>
    buildHead({
      title: TITLE,
      description: DESC,
      path: "/about",
      name: "About Businestools Links",
      faqs: FAQS,
      breadcrumbs: [
        { name: "Link Generator", item: "/" },
        { name: "About", item: "/about" },
      ],
      extraSchemas: [
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: TITLE,
          url: "/about",
          mainEntity: {
            "@type": "Organization",
            "@id": "https://shortlink.businestools.online/#organization",
            name: "Businestools Links",
            url: "/",
            description:
              "Free browser-based URL builders for marketers, developers and small businesses. Not affiliated with any hardware or IoT product of a similar name.",
            knowsAbout: [
              "URL encoding",
              "wa.me click-to-chat links",
              "mailto links",
              "UTM campaign tagging",
              "QR codes",
              "direct download URLs",
            ],
          },
        },
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "About" }]} />
      <ToolHero
        h1="About Businestools Links"
        intro="Businestools Links is a free, browser-only toolkit that assembles correctly encoded URLs — wa.me chats, mailto messages, UTM-tagged campaigns, QR images, calendar invites and direct file downloads. It is published by businestools.online for people who need one working URL and do not want an account to get it."
      />

      <section className="mt-10 space-y-4 text-sm md:text-base leading-relaxed text-foreground/85">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">What we actually do</h2>
        <p>
          Every tool here takes structured input — a phone number, a Place ID, a Drive file ID, a campaign name — and returns a
          single URL that is percent-encoded correctly and tested against the platform's own documented format. That is the whole
          product. There is no dashboard, no redirect service of our own, and nothing to install.
        </p>
        <p>
          The work happens in your browser. Because the URL never leaves your device, there is no server log to leak, no rate limit
          to hit, and no account to create. Close the tab and the input is gone.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">What we are not</h2>
        <p>
          Businestools Links is not a hardware platform, an IoT SDK, a device-connectivity kit, or a paid file-host debrid service.
          If you arrived here looking for an embedded-systems product with a similar name, this is a different thing entirely: a web
          page that writes URLs.
        </p>

        <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">Editorial standards</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Each tool page documents the exact URL format it produces, so you can verify the output by hand.</li>
          <li>We do not publish invented statistics, ratings or testimonials.</li>
          <li>Pages that stopped serving a real purpose get retired and redirected rather than left up for traffic.</li>
          <li>Tools that would only help spam, phishing or paid-content leeching are not built.</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-bold text-foreground pt-4">Scope</h2>
        <p>
          There are currently {TOOLS.length} tools covering messaging, social sharing, meetings, payments, files and on-page HTML.
          Start at the <Link to="/" className="text-primary font-semibold hover:underline">tool hub</Link>, or jump straight to the
          most-used ones: <Link to="/whatsapp-link-generator" className="text-primary font-semibold hover:underline">WhatsApp chat links</Link>,{" "}
          <Link to="/qr-code-link-generator" className="text-primary font-semibold hover:underline">QR codes</Link> and{" "}
          <Link to="/utm-link-generator" className="text-primary font-semibold hover:underline">UTM campaign tagging</Link>.
        </p>
      </section>

      <FaqSection items={FAQS} heading="Questions about this site" />
    </ToolLayout>
  );
}
