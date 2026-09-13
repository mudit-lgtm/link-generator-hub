import { createFileRoute, Link } from "@tanstack/react-router";
import { ToolLayout, TOOLS, ALL_TOOLS } from "@/components/ToolLayout";
import { SEO, ALL_PATHS } from "@/lib/seo-keywords";
import { buildHead } from "@/components/tool-ui";

export const Route = createFileRoute("/qa")({
  head: () => buildHead({
    title: "QA Status — Businestools Links",
    description: "Internal QA dashboard listing every link generator tool and its registration status.",
    path: "/qa",
    name: "QA Status",
    faqs: [],
    breadcrumbs: [{ name: "Link Generator", item: "/" }, { name: "QA Status", item: "/qa" }],
    noindex: true,
  } as never),
  component: Page,
});

type Row = {
  path: string;
  label: string;
  primary: string;
  inTools: boolean;
  inSeo: boolean;
  category: string;
};

function Page() {
  const toolMap = new Map(TOOLS.map((t) => [t.to, t]));
  const rows: Row[] = ALL_PATHS
    .filter((p) => p !== "/")
    .map((p) => {
      const seo = SEO[p];
      const tool = toolMap.get(p);
      return {
        path: p,
        label: tool?.label ?? seo?.primary ?? p,
        primary: seo?.primary ?? "",
        inTools: !!tool,
        inSeo: !!seo,
        category: tool ? guessCategory(p) : "—",
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  const totalReady = rows.filter((r) => r.inTools && r.inSeo).length;

  return (
    <ToolLayout>
      <h1 className="text-3xl font-bold mb-2">QA Status — All Tools</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {totalReady}/{rows.length} tools fully registered (TOOLS array + SEO keywords + sitemap).
        Run <code className="px-1 py-0.5 rounded bg-muted">bunx vitest run</code> for the full schema/JSON-LD/breadcrumb test suite.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Stat k={String(rows.length)} v="Total tools" />
        <Stat k={String(totalReady)} v="Fully registered" />
        <Stat k={String(rows.filter((r) => !r.inTools).length)} v="Missing from menu" />
        <Stat k={String(rows.filter((r) => !r.inSeo).length)} v="Missing SEO meta" />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr className="text-left">
              <th className="px-3 py-2 font-semibold">Tool</th>
              <th className="px-3 py-2 font-semibold">Category</th>
              <th className="px-3 py-2 font-semibold text-center">Route</th>
              <th className="px-3 py-2 font-semibold text-center">SEO</th>
              <th className="px-3 py-2 font-semibold text-center">Menu</th>
              <th className="px-3 py-2 font-semibold text-center">Open</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.path} className="border-t border-border/60 hover:bg-accent/30">
                <td className="px-3 py-2">
                  <div className="font-semibold text-foreground">{r.label}</div>
                  <code className="text-[11px] text-muted-foreground">{r.path}</code>
                </td>
                <td className="px-3 py-2 text-muted-foreground">{r.category}</td>
                <td className="px-3 py-2 text-center"><Badge ok /></td>
                <td className="px-3 py-2 text-center"><Badge ok={r.inSeo} /></td>
                <td className="px-3 py-2 text-center"><Badge ok={r.inTools} /></td>
                <td className="px-3 py-2 text-center">
                  <Link to={r.path} className="text-primary font-semibold hover:underline">Open →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-10 rounded-2xl border border-border bg-card p-5">
        <h2 className="font-bold mb-3">Per-tool manual QA checklist</h2>
        <ul className="text-sm text-foreground/80 space-y-1.5 list-disc pl-5">
          <li>H1 contains the primary keyword and reads naturally.</li>
          <li>Form input matches the tool (file upload / URL / structured fields).</li>
          <li>Submitting the form updates the OutputBlock with the expected URL token.</li>
          <li>Breadcrumb trail is <strong>Link Generator → Tool</strong>.</li>
          <li>JSON-LD includes BreadcrumbList, FAQPage, SoftwareApplication and HowTo.</li>
          <li>Related-tools CTA at the bottom links to 3–4 in-network tools.</li>
          <li>Mega menu opens, stays open while hovered, and links route correctly.</li>
        </ul>
      </section>
    </ToolLayout>
  );
}

function Badge({ ok }: { ok?: boolean }) {
  return (
    <span className={`inline-block w-5 h-5 rounded-full text-[10px] font-bold leading-5 text-center ${ok ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`} aria-label={ok ? "ok" : "missing"}>
      {ok ? "✓" : "✕"}
    </span>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
      <div className="text-2xl font-display font-extrabold text-gradient-sunset">{k}</div>
      <div className="text-xs text-muted-foreground mt-1">{v}</div>
    </div>
  );
}

const CATS: Record<string, string> = {
  "/utm-link-generator": "Marketing", "/affiliate-link-generator": "Marketing", "/referral-link-generator": "Marketing",
  "/short-link-generator": "Marketing", "/qr-code-link-generator": "Marketing", "/slug-generator": "Marketing",
  "/google-review-link-generator": "Marketing", "/tinyurl-link-generator": "Marketing",
  "/app-store-link-generator": "Marketing", "/play-store-link-generator": "Marketing", "/deep-link-generator": "Marketing",
  "/whatsapp-link-generator": "Social", "/mailto-link-generator": "Social", "/instagram-link-generator": "Social",
  "/facebook-share-link-generator": "Social", "/telegram-link-generator": "Social", "/linkedin-link-generator": "Social",
  "/discord-invite-link-generator": "Social", "/youtube-link-generator": "Social", "/tiktok-link-generator": "Social",
  "/twitter-share-link-generator": "Social", "/reddit-share-link-generator": "Social", "/pinterest-share-link-generator": "Social",
  "/sms-link-generator": "Social", "/gmail-compose-link-generator": "Social", "/unsubscribe-link-generator": "Social",
  "/zoom-meeting-link-generator": "Meetings", "/google-meet-link-generator": "Meetings", "/teams-meeting-link-generator": "Meetings",
  "/add-to-calendar-link-generator": "Meetings", "/google-maps-link-generator": "Meetings",
  "/payment-link-generator": "Payments", "/paypal-me-link-generator": "Payments", "/venmo-link-generator": "Payments",
  "/cashapp-link-generator": "Payments", "/calendly-link-generator": "Meetings", "/facetime-link-generator": "Meetings",
};
function guessCategory(p: string) { return CATS[p] ?? "Files & Media"; }
