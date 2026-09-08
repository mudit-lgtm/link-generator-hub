#!/usr/bin/env python3
"""Add remaining tier 3/4 tools, merge thin pages, fix stale internal links."""
import json, re, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
ROUTES = ROOT / "src/routes"
SEO_FILE = ROOT / "src/lib/seo-keywords.ts"
LAYOUT = ROOT / "src/components/ToolLayout.tsx"

TEMPLATE = '''import { createFileRoute } from "@tanstack/react-router";

import { ToolLayout } from "@/components/ToolLayout";
import {
  ToolHero, HowToUse, FaqSection,
  ContextualLinks, BackToHomeLink, Breadcrumbs, buildHead, AeoBlock, GeoBlock, ToolForm,
} from "@/components/tool-ui";
import { SEO } from "@/lib/seo-keywords";

const KW = SEO["__PATH__"]?.keywords ?? [];

const FAQS = __FAQS__;
const STEPS = __STEPS__;
const TITLE = __TITLE__;
const DESC = __DESC__;

export const Route = createFileRoute("__PATH__")({
  head: () => buildHead({
    title: TITLE, description: DESC, path: "__PATH__",
    name: __NAME__, faqs: FAQS,
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: __NAME__, item: "__PATH__" }],
    extraSchemas: [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use the ${__NAME__}`,
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `Step ${i + 1}`, text: s })),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolLayout>
      <Breadcrumbs trail={[{ label: "Link Generator", to: "/" }, { label: __NAME__ }]} />
      <ToolHero h1={__H1__} intro={DESC} keywords={KW} />

      <ToolForm
        fields={__FIELDS__}
        build={__BUILD__}
      />

      <HowToUse heading={__HOWTO__} steps={STEPS} />

      <AeoBlock question={__Q__} answer={__A__} keywords={KW} />

      <GeoBlock heading={"USA use cases"} keywords={KW} items={__GEO__} />

      <FaqSection items={FAQS} keywords={KW} heading={"FAQ"} />

      <ContextualLinks heading="Related link generators" links={__LINKS__} />

      <BackToHomeLink />
    </ToolLayout>
  );
}
'''

def j(x): return json.dumps(x, ensure_ascii=False)

TOOLS = [
 dict(path="/html-link-generator", name="HTML Link Generator", h1="HTML, Markdown & BBCode Link Generator",
  label="HTML Link Generator", short="HTML Link", icon="</>", accent="from-sky-500 to-indigo-600",
  blurb="Clickable HTML, Markdown and BBCode link code.",
  primary="html link generator",
  keywords=["html link generator","clickable link generator","markdown link generator","bbcode link generator","hyperlink generator","anchor tag generator"],
  desc="Turn any URL into ready-to-paste clickable link code in HTML, Markdown, BBCode or plain text, with optional new-tab and nofollow attributes.",
  fields=[{"name":"url","label":"Destination URL","type":"url","placeholder":"https://example.com/page"},
          {"name":"text","label":"Anchor text","type":"text","placeholder":"Visit our pricing page"},
          {"name":"format","label":"Output format","type":"select","default":"html","options":[{"value":"html","label":"HTML <a>"},{"value":"markdown","label":"Markdown"},{"value":"bbcode","label":"BBCode"},{"value":"plain","label":"Plain text"}]},
          {"name":"blank","label":"Open in a new tab","type":"checkbox","default":True},
          {"name":"nofollow","label":"Add rel=\"nofollow\"","type":"checkbox"}],
  build="(v) => { if(!v.url) return ''; const t=String(v.text||v.url); const u=String(v.url); if(v.format==='markdown') return `[${t}](${u})`; if(v.format==='bbcode') return `[url=${u}]${t}[/url]`; if(v.format==='plain') return `${t} — ${u}`; const rel=[v.blank?'noopener':'', v.nofollow?'nofollow':''].filter(Boolean).join(' '); return `<a href=\"${u}\"${v.blank?' target=\"_blank\"':''}${rel?` rel=\"${rel}\"`:''}>${t}</a>`; }",
  steps=["Paste the destination URL.","Write the anchor text people will click.","Pick HTML, Markdown or BBCode.","Copy the code into your page, README or forum post."],
  q="How do I make a clickable link in HTML?",
  a="Wrap the anchor text in an `<a href=\"URL\">` tag. Add `target=\"_blank\" rel=\"noopener\"` to open a new tab safely, and `rel=\"nofollow\"` for paid or untrusted links.",
  geo=[{"who":"Blogger in Austin, TX","how":"Pastes Markdown links into posts."},{"who":"Forum mod in Chicago, IL","how":"Shares BBCode links."},{"who":"Agency in Miami, FL","how":"Marks sponsored links nofollow."},{"who":"Developer in Seattle, WA","how":"Adds README links fast."}],
  links=["/anchor-link-generator","/iframe-embed-link-generator","/slug-generator","/short-link-generator"],
  group="Marketing & Tracking",
  faqs=[{"q":"Does it support Markdown?","a":"Yes — choose Markdown and you get `[text](url)` output."},
        {"q":"When should I use nofollow?","a":"On paid, sponsored or user-generated links so search engines don't pass ranking credit."},
        {"q":"Why add rel=noopener?","a":"It stops the new tab from accessing your page via window.opener."},
        {"q":"Can I use it for emails?","a":"Yes — HTML output pastes into most email builders."},
        {"q":"Is the code SEO friendly?","a":"Yes, real anchor tags with descriptive text are exactly what crawlers read."}]),

 dict(path="/iframe-embed-link-generator", name="Iframe Embed Link Generator", h1="Iframe Embed Code Generator",
  label="Iframe Embed Generator", short="Iframe Embed", icon="🖥️", accent="from-slate-500 to-slate-700",
  blurb="Responsive iframe embed code for any URL.",
  primary="iframe link generator",
  keywords=["iframe link generator","embed link generator","iframe embed code","website embed generator","youtube embed link generator"],
  desc="Generate a clean iframe embed snippet for any page, video or map, with your own size and fullscreen permissions.",
  fields=[{"name":"url","label":"URL to embed","type":"url","placeholder":"https://www.youtube.com/embed/dQw4w9WgXcQ"},
          {"name":"title","label":"Accessible title","type":"text","placeholder":"Product demo video"},
          {"name":"width","label":"Width","type":"text","default":"100%"},
          {"name":"height","label":"Height (px)","type":"number","default":"420"},
          {"name":"fs","label":"Allow fullscreen","type":"checkbox","default":True}],
  build="(v) => { if(!v.url) return ''; const w=v.width||'100%'; const h=v.height||420; return `<iframe src=\"${v.url}\" width=\"${w}\" height=\"${h}\" title=\"${v.title||'Embedded content'}\" style=\"border:0\" loading=\"lazy\"${v.fs?' allowfullscreen':''}></iframe>`; }",
  steps=["Paste the embed URL (use /embed/ for YouTube).","Add a short title for screen readers.","Set width and height.","Copy the snippet into your HTML."],
  q="How do I embed a link in an iframe?",
  a="Use `<iframe src=\"URL\" title=\"...\" loading=\"lazy\"></iframe>`. Sites that send `X-Frame-Options: DENY` cannot be embedded — use a normal link instead.",
  geo=[{"who":"SaaS team in San Jose, CA","how":"Embeds demo videos."},{"who":"Realtor in Denver, CO","how":"Embeds a map of listings."},{"who":"School in Columbus, OH","how":"Embeds a signup form."},{"who":"Nonprofit in Atlanta, GA","how":"Embeds a donation page."}],
  links=["/html-link-generator","/video-link-generator","/youtube-link-generator","/google-maps-link-generator"],
  group="Marketing & Tracking",
  faqs=[{"q":"Why is my iframe blank?","a":"The target site likely blocks framing with X-Frame-Options or CSP frame-ancestors."},
        {"q":"How do I embed YouTube?","a":"Use the youtube.com/embed/VIDEO_ID form, not the watch URL."},
        {"q":"Is lazy loading included?","a":"Yes, loading=\"lazy\" is added so embeds don't slow first paint."},
        {"q":"Can I make it responsive?","a":"Keep width at 100% and wrap it in a container with a fixed aspect ratio."},
        {"q":"Does it hurt SEO?","a":"Iframe content isn't credited to your page, so keep key text outside the frame."}]),

 dict(path="/tel-link-generator", name="Phone Call Link Generator", h1="Click-to-Call (tel:) Link Generator",
  label="Phone Call Link Generator", short="Call Link", icon="📞", accent="from-emerald-400 to-teal-600",
  blurb="tel: click-to-call links with extensions.",
  primary="tel link generator",
  keywords=["tel link generator","click to call link generator","phone number link generator","call link generator","tel: html link"],
  desc="Create a tel: click-to-call link that dials your number straight from a phone, with optional extension support.",
  fields=[{"name":"phone","label":"Phone number (E.164)","type":"tel","placeholder":"+15555550123"},
          {"name":"ext","label":"Extension (optional)","type":"text","placeholder":"204"},
          {"name":"text","label":"Button text","type":"text","default":"Call us"},
          {"name":"html","label":"Output as HTML link","type":"checkbox"}],
  build="(v) => { if(!v.phone) return ''; const p=String(v.phone).replace(/[^+0-9]/g,''); const href=`tel:${p}${v.ext?`,${String(v.ext).replace(/[^0-9]/g,'')}`:''}`; return v.html?`<a href=\"${href}\">${v.text||'Call us'}</a>`:href; }",
  steps=["Enter the number in E.164 format (+1 for the US).","Add an extension if callers need one.","Choose raw tel: link or HTML button code.","Paste it on your contact page."],
  q="What is a tel: link?",
  a="`tel:+15555550123` tells a phone, tablet or desktop calling app to dial that number when tapped. Always use E.164 (country code + number, no spaces).",
  geo=[{"who":"HVAC company in Dallas, TX","how":"Adds tap-to-call to mobile ads."},{"who":"Clinic in Portland, OR","how":"Lets patients dial reception."},{"who":"Law firm in Boston, MA","how":"Routes callers to an extension."},{"who":"Towing service in Las Vegas, NV","how":"Puts a call button in every listing."}],
  links=["/sms-link-generator","/whatsapp-link-generator","/mailto-link-generator","/qr-code-link-generator"],
  group="Social & Messaging",
  faqs=[{"q":"Do extensions work?","a":"A comma adds a pause before the extension digits; most carriers honour it."},
        {"q":"Will it work on desktop?","a":"Yes, if a calling app such as FaceTime, Skype or Teams is installed."},
        {"q":"Should I include the country code?","a":"Yes — always. Without it international visitors can't connect."},
        {"q":"Can I track calls?","a":"Use a call-tracking number as the destination."},
        {"q":"Can I turn it into a QR code?","a":"Yes — paste the tel: link into the QR Code Link Generator."}]),

 dict(path="/anchor-link-generator", name="Anchor Link Generator", h1="Jump-To Anchor Link Generator",
  label="Anchor Link Generator", short="Anchor Link", icon="⚓", accent="from-cyan-500 to-blue-600",
  blurb="Jump links and #section anchors for long pages.",
  primary="anchor link generator",
  keywords=["anchor link generator","jump link generator","html anchor generator","link to section of page","#section link generator"],
  desc="Turn a heading into a clean #anchor and get the full jump link plus the heading markup you need on the page.",
  fields=[{"name":"url","label":"Page URL","type":"url","placeholder":"https://example.com/guide"},
          {"name":"heading","label":"Heading text","type":"text","placeholder":"How pricing works"},
          {"name":"scroll","label":"Use Chrome text-fragment instead of an id","type":"checkbox"}],
  build="(v) => { if(!v.heading) return ''; const slug=String(v.heading).toLowerCase().trim().replace(/[^a-z0-9\\s-]/g,'').replace(/\\s+/g,'-'); const base=String(v.url||'').replace(/#.*$/,''); if(v.scroll) return `${base}#:~:text=${encodeURIComponent(v.heading)}`; return `${base}#${slug}\\n<h2 id=\"${slug}\">${v.heading}</h2>`; }",
  steps=["Paste the page URL.","Type the heading you want to link to.","Copy the jump link and the matching heading markup.","Add the id to that heading on your page."],
  q="How do I link to a specific part of a page?",
  a="Give the heading an `id` and append `#id` to the URL. If you can't edit the page, use a text fragment: `#:~:text=your%20phrase`, supported in Chrome and Edge.",
  geo=[{"who":"Docs writer in San Francisco, CA","how":"Links readers to one section."},{"who":"Support team in Tampa, FL","how":"Sends customers to an exact FAQ."},{"who":"Publisher in NYC","how":"Builds a table of contents."},{"who":"SEO in Nashville, TN","how":"Earns jump-to sitelinks."}],
  links=["/html-link-generator","/slug-generator","/short-link-generator","/utm-link-generator"],
  group="Marketing & Tracking",
  faqs=[{"q":"Do anchors need an id?","a":"Yes, unless you use a text fragment link."},
        {"q":"Are text fragments universal?","a":"No — Chrome and Edge support them; Safari and Firefox ignore the fragment."},
        {"q":"Can anchors show in Google?","a":"Yes, Google can surface jump-to links for well-structured pages."},
        {"q":"Should ids have spaces?","a":"No — use lowercase hyphenated slugs."},
        {"q":"Do anchors affect the canonical URL?","a":"No, fragments are ignored for indexing."}]),

 dict(path="/upi-link-generator", name="UPI Payment Link Generator", h1="UPI Payment Link Generator",
  label="UPI Payment Link Generator", short="UPI Link", icon="🇮🇳", accent="from-amber-500 to-orange-600",
  blurb="upi://pay deep links for GPay, PhonePe & Paytm.",
  primary="upi link generator",
  keywords=["upi link generator","upi payment link generator","gpay link generator","phonepe payment link","upi qr link generator"],
  desc="Build a upi://pay deep link with your VPA, payee name, amount and note that opens GPay, PhonePe, Paytm or any UPI app.",
  fields=[{"name":"vpa","label":"UPI ID (VPA)","type":"text","placeholder":"yourname@okhdfcbank"},
          {"name":"name","label":"Payee name","type":"text","placeholder":"Acme Studio"},
          {"name":"amount","label":"Amount (optional)","type":"number","placeholder":"499"},
          {"name":"note","label":"Payment note","type":"text","placeholder":"Invoice 1042"}],
  build="(v) => { if(!v.vpa) return ''; const p=new URLSearchParams(); p.set('pa',String(v.vpa)); if(v.name)p.set('pn',String(v.name)); if(v.amount)p.set('am',String(v.amount)); if(v.note)p.set('tn',String(v.note)); p.set('cu','INR'); return `upi://pay?${p.toString()}`; }",
  steps=["Enter your UPI ID (VPA).","Add the payee name shown in the app.","Optionally lock the amount and note.","Share the link or turn it into a QR code."],
  q="What is a UPI payment link?",
  a="`upi://pay?pa=vpa&pn=name&am=amount&cu=INR` is a deep link that opens any UPI app with the payment pre-filled. It works on Android and iOS where a UPI app is installed.",
  geo=[{"who":"Freelancer billing US clients","how":"Collects INR payouts."},{"who":"Etsy seller shipping to the USA","how":"Takes UPI from Indian buyers."},{"who":"Tutor with NRI students","how":"Shares a fixed-amount link."},{"who":"Creator on a US platform","how":"Adds a UPI tip link."}],
  links=["/payment-link-generator","/qr-code-link-generator","/whatsapp-link-generator","/short-link-generator"],
  group="Meetings & Payments",
  faqs=[{"q":"Does it work on desktop?","a":"No — UPI deep links need a UPI app, so pair them with a QR code for desktop users."},
        {"q":"Can I leave the amount blank?","a":"Yes, the payer then enters any amount."},
        {"q":"Is my UPI ID safe to share?","a":"A VPA is designed to be public; it only lets people pay you."},
        {"q":"Which apps open it?","a":"GPay, PhonePe, Paytm, BHIM and most bank apps."},
        {"q":"Is a transaction ID needed?","a":"No, but you can add a note so payments are easy to reconcile."}]),

 dict(path="/email-signature-link-generator", name="Email Signature Link Generator", h1="Email Signature Link Generator",
  label="Email Signature Generator", short="Email Signature", icon="✍️", accent="from-violet-500 to-purple-700",
  blurb="HTML signature block with linked website & socials.",
  primary="email signature link generator",
  keywords=["email signature link generator","html email signature generator","signature link generator","email footer link generator","clickable email signature"],
  desc="Create a clean HTML email signature with clickable website, email, phone and LinkedIn links that pastes into Gmail or Outlook.",
  fields=[{"name":"name","label":"Full name","type":"text","placeholder":"Jordan Lee"},
          {"name":"title","label":"Job title & company","type":"text","placeholder":"Head of Growth, Acme Inc"},
          {"name":"email","label":"Email","type":"email","placeholder":"jordan@acme.com"},
          {"name":"phone","label":"Phone","type":"tel","placeholder":"+15555550123"},
          {"name":"site","label":"Website","type":"url","placeholder":"https://acme.com"},
          {"name":"linkedin","label":"LinkedIn URL","type":"url","placeholder":"https://linkedin.com/in/jordanlee"}],
  build="(v) => { if(!v.name) return ''; const rows=[`<strong>${v.name}</strong>`]; if(v.title) rows.push(v.title); const links=[]; if(v.email) links.push(`<a href=\"mailto:${v.email}\">${v.email}</a>`); if(v.phone) links.push(`<a href=\"tel:${String(v.phone).replace(/[^+0-9]/g,'')}\">${v.phone}</a>`); if(v.site) links.push(`<a href=\"${v.site}\">${String(v.site).replace(/^https?:\\/\\//,'')}</a>`); if(v.linkedin) links.push(`<a href=\"${v.linkedin}\">LinkedIn</a>`); if(links.length) rows.push(links.join(' &middot; ')); return `<table><tr><td style=\"font:14px Arial,sans-serif;color:#222\">${rows.join('<br>')}</td></tr></table>`; }",
  steps=["Fill in your name, title and contact details.","Add your website and LinkedIn URL.","Copy the HTML block.","Paste it into Gmail or Outlook signature settings."],
  q="How do I add clickable links to an email signature?",
  a="Use real anchor tags: `mailto:` for email, `tel:` for phone and a full `https://` URL for your site. Inline styles are required because email clients strip stylesheets.",
  geo=[{"who":"Sales rep in Charlotte, NC","how":"Links a booking page."},{"who":"Recruiter in Chicago, IL","how":"Adds LinkedIn to every email."},{"who":"Founder in Austin, TX","how":"Drives traffic to the site."},{"who":"Consultant in Denver, CO","how":"Makes the phone tap-to-call."}],
  links=["/mailto-link-generator","/tel-link-generator","/linkedin-link-generator","/html-link-generator"],
  group="Social & Messaging",
  faqs=[{"q":"Does it work in Gmail?","a":"Yes — paste the rendered block into Gmail's signature editor."},
        {"q":"Why inline styles?","a":"Most email clients remove <style> blocks, so styling must live on the element."},
        {"q":"Can I add an image logo?","a":"Host the image and add an <img> tag inside the table cell."},
        {"q":"Will links be tracked?","a":"Only if you append UTM parameters — use the UTM Link Generator."},
        {"q":"Is a table needed?","a":"Tables remain the most reliable layout in Outlook."}]),
]

# ---------- 1. write route files ----------
for t in TOOLS:
    body = TEMPLATE
    for k, v in {
        "__PATH__": t["path"], "__NAME__": j(t["name"]), "__H1__": j(t["h1"]),
        "__TITLE__": j(f"{t['name']} — Free Online Tool"), "__DESC__": j(t["desc"]),
        "__FAQS__": j(t["faqs"]), "__STEPS__": j(t["steps"]), "__FIELDS__": j(t["fields"]),
        "__BUILD__": t["build"], "__Q__": j(t["q"]), "__A__": j(t["a"]), "__GEO__": j(t["geo"]),
        "__HOWTO__": j(f"How to use the {t['primary']}"),
        "__LINKS__": j([{"to": p, "anchor": p.strip("/").replace("-", " ").title(), "blurb": "related link generator."} for p in t["links"]]),
    }.items():
        body = body.replace(k, v)
    (ROUTES / (t["path"].strip("/") + ".tsx")).write_text(body)

# ---------- 2. merges (thin/duplicate intent) ----------
MERGES = {"/play-store-link-generator": "/app-store-link-generator",
          "/deep-link-generator": "/app-store-link-generator",
          "/pinterest-share-link-generator": "/reddit-share-link-generator"}

seo = SEO_FILE.read_text()
for src, dest in MERGES.items():
    m = re.search(r'  "%s": \{.*?\n  \},\n' % re.escape(src), seo, re.S)
    if not m:
        continue
    kws = re.findall(r'"([^"]+)"', m.group(0).split("keywords:")[1])
    seo = seo.replace(m.group(0), "")
    dm = re.search(r'("%s": \{.*?keywords: \[)' % re.escape(dest), seo, re.S)
    seo = seo[:dm.end()] + "".join(f'"{k}", ' for k in kws) + seo[dm.end():]

# add new SEO entries
new_entries = "".join(
    '  "{p}": {{\n    path: "{p}",\n    primary: {pr},\n    keywords: {kw},\n  }},\n'.format(
        p=t["path"], pr=j(t["primary"]), kw=j(t["keywords"]))
    for t in TOOLS)
idx = seo.rindex("};")
seo = seo[:idx] + new_entries + seo[idx:]
SEO_FILE.write_text(seo)

# redirect stubs
for src, dest in MERGES.items():
    (ROUTES / (src.strip("/") + ".tsx")).write_text(
        'import { createFileRoute, redirect } from "@tanstack/react-router";\n\n'
        f'export const Route = createFileRoute("{src}")({{\n'
        f'  beforeLoad: () => {{\n    throw redirect({{ to: "{dest}", replace: true }});\n  }},\n'
        '  component: () => null,\n});\n')

# ---------- 3. registry + menu ----------
lay = LAYOUT.read_text()
for src in MERGES:
    lay = re.sub(r'  \{ to: "%s",.*?\},\n' % re.escape(src), "", lay, flags=re.S)
    lay = lay.replace(f'"{src}",', "").replace(f',"{src}"', "")
add = "".join(
    '  {{ to: "{p}", label: {l}, short: {s}, icon: {i},\n    blurb: {b}, accent: {a} }},\n'.format(
        p=t["path"], l=j(t["label"]), s=j(t["short"]), i=j(t["icon"]), b=j(t["blurb"]), a=j(t["accent"]))
    for t in TOOLS)
end = lay.index("\n];", lay.index("export const TOOLS")) + 1
lay = lay[:end] + add + lay[end:]
for t in TOOLS:
    grp = re.search(r'title: "%s",\n    tools: TOOLS\.filter\(\(t\) => \[' % re.escape(t["group"]), lay)
    lay = lay[:grp.end()] + f'"{t["path"]}",' + lay[grp.end():]
LAYOUT.write_text(lay)

# ---------- 4. fix stale internal links to merged routes ----------
ALL_MERGES = dict(MERGES, **{
    "/facetime-link-generator": "/sms-link-generator",
    "/tinyurl-link-generator": "/short-link-generator",
    "/gmail-compose-link-generator": "/mailto-link-generator",
    "/unsubscribe-link-generator": "/mailto-link-generator",
    "/venmo-link-generator": "/payment-link-generator",
    "/cashapp-link-generator": "/payment-link-generator",
    "/paypal-me-link-generator": "/payment-link-generator",
    "/dropbox-direct-link-generator": "/direct-download-link-generator",
    "/onedrive-direct-link-generator": "/direct-download-link-generator",
    "/mega-link-generator": "/direct-download-link-generator",
})
for f in ROUTES.glob("*.tsx"):
    if f.stem in {m.strip("/") for m in ALL_MERGES}:
        continue
    txt = orig = f.read_text()
    for src, dest in ALL_MERGES.items():
        txt = txt.replace(f'"to": "{src}"', f'"to": "{dest}"').replace(f'to: "{src}"', f'to: "{dest}"')
    if txt != orig:
        f.write_text(txt)

print("routes:", len(TOOLS), "merged:", len(MERGES))
