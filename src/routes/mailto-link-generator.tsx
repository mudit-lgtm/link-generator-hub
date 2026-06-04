import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout, RelatedTools } from "@/components/ToolLayout";
import {
  ToolHero, ToolCard, Field, inputCls, OutputBlock, HowToUse, FaqSection, buildHead,
} from "@/components/tool-ui";

const FAQS = [
  { q: "What is a mailto link?", a: "A mailto: link is a special URL that opens the user's default email app with the recipient, subject, and body prefilled. Perfect for 'contact us' buttons." },
  { q: "How do I generate a mailto link with subject and body?", a: "Fill in the subject and body fields in this tool — the generator URL-encodes them correctly so they appear in the email draft." },
  { q: "Does the mailto link work with Gmail?", a: "Yes. Gmail respects mailto links when set as the default mail handler in the browser, and the generated HTML snippet works in any email signature." },
  { q: "Can I add CC and BCC?", a: "Yes — both fields are supported and properly encoded into the final mailto URL." },
  { q: "Is the HTML email link generator output safe to paste anywhere?", a: "The HTML <a href=mailto:...> snippet is standard markup that works in every website, CMS, and email template." },
];

const TITLE = "Mailto Link Generator — Free Email Link Builder";
const DESC = "Generate a mailto link with subject, body, CC, and BCC. Free HTML email link generator — copy-paste ready, works with Gmail and Outlook.";

export const Route = createFileRoute("/mailto-link-generator")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "/mailto-link-generator",
    name: "Mailto Link Generator", faqs: FAQS,
  }),
  component: Page,
});

function Page() {
  const [to, setTo] = useState("hello@example.com");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const { link, html } = useMemo(() => {
    const params = new URLSearchParams();
    if (cc) params.set("cc", cc);
    if (bcc) params.set("bcc", bcc);
    if (subject) params.set("subject", subject);
    if (body) params.set("body", body);
    const q = params.toString();
    const url = `mailto:${to}${q ? "?" + q : ""}`;
    return { link: url, html: `<a href="${url}">Email us</a>` };
  }, [to, cc, bcc, subject, body]);

  return (
    <ToolLayout>
      <ToolHero
        h1="Mailto Link Generator"
        intro="Build a mailto: link with the recipient, subject, body, CC, and BCC prefilled. Get a clean URL plus a copy-ready HTML snippet for your website or email signature."
      />
      <ToolCard>
        <Field label="To"><input className={inputCls} value={to} onChange={(e) => setTo(e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="CC (optional)"><input className={inputCls} value={cc} onChange={(e) => setCc(e.target.value)} /></Field>
          <Field label="BCC (optional)"><input className={inputCls} value={bcc} onChange={(e) => setBcc(e.target.value)} /></Field>
        </div>
        <Field label="Subject"><input className={inputCls} value={subject} onChange={(e) => setSubject(e.target.value)} /></Field>
        <Field label="Body"><textarea className={inputCls} rows={4} value={body} onChange={(e) => setBody(e.target.value)} /></Field>
        <div>
          <span className="block text-sm font-medium mb-1.5">Mailto link</span>
          <OutputBlock value={link} />
        </div>
        <div>
          <span className="block text-sm font-medium mb-1.5">HTML snippet</span>
          <OutputBlock value={html} multiline />
        </div>
      </ToolCard>
      <HowToUse steps={[
        "Enter the recipient email and optional CC / BCC addresses.",
        "Add a subject line and message body.",
        "Copy the mailto: URL for buttons, or the HTML snippet for your website.",
      ]} />
      <FaqSection items={FAQS} />
      <RelatedTools exclude="/mailto-link-generator" />
    </ToolLayout>
  );
}
