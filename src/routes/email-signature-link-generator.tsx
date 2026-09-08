import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["/email-signature-link-generator"]?.keywords ?? [];

const FAQS = [{"q": "Does it work in Gmail?", "a": "Yes — paste the rendered block into Gmail's signature editor."}, {"q": "Why inline styles?", "a": "Most email clients remove <style> blocks, so styling must live on the element."}, {"q": "Can I add an image logo?", "a": "Host the image and add an <img> tag inside the table cell."}, {"q": "Will links be tracked?", "a": "Only if you append UTM parameters — use the UTM Link Generator."}, {"q": "Is a table needed?", "a": "Tables remain the most reliable layout in Outlook."}];
const STEPS = ["Fill in your name, title and contact details.", "Add your website and LinkedIn URL.", "Copy the HTML block.", "Paste it into Gmail or Outlook signature settings."];
const TITLE = "Email Signature Link Generator — Free Online Tool";
const DESC = "Create a clean HTML email signature with clickable website, email, phone and LinkedIn links that pastes into Gmail or Outlook.";

export const Route = createFileRoute("/email-signature-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/email-signature-link-generator",
    name: "Email Signature Link Generator", faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "Email Signature Link Generator", item: "/email-signature-link-generator" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use the ${"Email Signature Link Generator"}`,
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: "Email Signature Link Generator" }]} />
      <ToolHero h1={"Email Signature Link Generator"} intro={DESC} keywords={KW} />

      <ToolForm
        fields={[{"name": "name", "label": "Full name", "type": "text", "placeholder": "Jordan Lee"}, {"name": "title", "label": "Job title & company", "type": "text", "placeholder": "Head of Growth, Acme Inc"}, {"name": "email", "label": "Email", "type": "email", "placeholder": "jordan@acme.com"}, {"name": "phone", "label": "Phone", "type": "tel", "placeholder": "+15555550123"}, {"name": "site", "label": "Website", "type": "url", "placeholder": "https://acme.com"}, {"name": "linkedin", "label": "LinkedIn URL", "type": "url", "placeholder": "https://linkedin.com/in/jordanlee"}]}
        build={(v) => { if(!v.name) return ''; const rows=[`<strong>${v.name}</strong>`]; if(v.title) rows.push(v.title); const links=[]; if(v.email) links.push(`<a href="mailto:${v.email}">${v.email}</a>`); if(v.phone) links.push(`<a href="tel:${String(v.phone).replace(/[^+0-9]/g,'')}">${v.phone}</a>`); if(v.site) links.push(`<a href="${v.site}">${String(v.site).replace(/^https?:\/\//,'')}</a>`); if(v.linkedin) links.push(`<a href="${v.linkedin}">LinkedIn</a>`); if(links.length) rows.push(links.join(' &middot; ')); return `<table><tr><td style="font:14px Arial,sans-serif;color:#222">${rows.join('<br>')}</td></tr></table>`; }}
      />

      <HowToUse heading={"How to use the email signature link generator"} steps={STEPS} />

      <AeoBlock question={"How do I add clickable links to an email signature?"} answer={"Use real anchor tags: `mailto:` for email, `tel:` for phone and a full `https://` URL for your site. Inline styles are required because email clients strip stylesheets."} keywords={KW} />

      <GeoBlock heading={"USA use cases"} keywords={KW} items={[{"who": "Sales rep in Charlotte, NC", "how": "Links a booking page."}, {"who": "Recruiter in Chicago, IL", "how": "Adds LinkedIn to every email."}, {"who": "Founder in Austin, TX", "how": "Drives traffic to the site."}, {"who": "Consultant in Denver, CO", "how": "Makes the phone tap-to-call."}]} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks heading="Related link generators" links={[{"to": "/mailto-link-generator", "anchor": "Mailto Link Generator", "blurb": "related link generator."}, {"to": "/tel-link-generator", "anchor": "Tel Link Generator", "blurb": "related link generator."}, {"to": "/linkedin-link-generator", "anchor": "Linkedin Link Generator", "blurb": "related link generator."}, {"to": "/html-link-generator", "anchor": "Html Link Generator", "blurb": "related link generator."}]} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
