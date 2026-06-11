#!/usr/bin/env bun
/**
 * SEO QA — crawl every page in src/lib/seo-keywords.ts on the running dev/preview server
 * and assert per-page checks: single H1, title length, meta description length, canonical,
 * JSON-LD presence (SoftwareApplication, FAQPage, WebPage, BreadcrumbList), word count,
 * primary keyword in H1, sitemap inclusion, no noindex.
 *
 * Usage:
 *   bun run dev          # in another terminal
 *   bun scripts/seo-qa.ts http://localhost:3000
 *
 * Exit code: 0 if all pages pass, 1 otherwise.
 */
import { SEO, ALL_PATHS } from "../src/lib/seo-keywords";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

type Result = { path: string; ok: boolean; issues: string[] };

function pick(html: string, re: RegExp): string | null {
  const m = html.match(re);
  return m ? m[1] : null;
}

function countMatches(html: string, re: RegExp): number {
  return (html.match(re) || []).length;
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function check(path: string, sitemapUrls: Set<string>): Promise<Result> {
  const issues: string[] = [];
  const url = `${base}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    return { path, ok: false, issues: [`HTTP ${res.status} fetching ${url}`] };
  }
  const html = await res.text();

  // <title>
  const title = pick(html, /<title>([^<]*)<\/title>/i)?.trim() ?? "";
  if (title.length < 30 || title.length > 70) issues.push(`title length ${title.length} not in 30..70 (${title.slice(0, 80)})`);

  // meta description
  const desc = pick(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ?? "";
  if (desc.length < 110 || desc.length > 180) issues.push(`meta description length ${desc.length} not in 110..180`);

  // canonical
  const canonical = pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (!canonical) issues.push("missing <link rel=canonical>");
  else if (canonical !== path && canonical !== `${base}${path}`) issues.push(`canonical mismatch: ${canonical} vs ${path}`);

  // exactly one <h1>
  const h1Count = countMatches(html, /<h1[\s>]/gi);
  if (h1Count !== 1) issues.push(`expected 1 <h1>, found ${h1Count}`);

  // primary keyword in H1
  const h1Text = pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) ?? "";
  const h1Plain = stripTags(h1Text).toLowerCase();
  const primary = SEO[path].primary.toLowerCase();
  if (!h1Plain.includes(primary)) issues.push(`H1 missing primary keyword "${primary}"`);

  // additional keywords in body
  const bodyPlain = stripTags(html).toLowerCase();
  const missingKws = SEO[path].keywords.filter((k) => !bodyPlain.includes(k.toLowerCase()));
  if (missingKws.length > Math.ceil(SEO[path].keywords.length * 0.3))
    issues.push(`>30% keywords missing: ${missingKws.slice(0, 5).join(", ")}${missingKws.length > 5 ? "…" : ""}`);

  // word count
  const wc = wordCount(bodyPlain);
  if (wc < 700) issues.push(`word count ${wc} < 700`);

  // JSON-LD types
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1]);
  const types = new Set<string>();
  for (const b of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(b);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      for (const obj of arr) if (obj?.["@type"]) types.add(obj["@type"]);
    } catch { issues.push("invalid JSON-LD block"); }
  }
  for (const t of ["SoftwareApplication", "FAQPage", "WebPage", "BreadcrumbList"]) {
    if (!types.has(t)) issues.push(`missing JSON-LD @type ${t}`);
  }

  // noindex
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html))
    issues.push("page has noindex");

  // sitemap inclusion
  if (!sitemapUrls.has(path)) issues.push("URL missing from /sitemap.xml");

  return { path, ok: issues.length === 0, issues };
}

async function loadSitemap(): Promise<Set<string>> {
  const res = await fetch(`${base}/sitemap.xml`);
  if (!res.ok) {
    console.error(`! /sitemap.xml returned ${res.status}`);
    return new Set();
  }
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(base, "").replace(/^https?:\/\/[^/]+/, "") || "/",
  );
  return new Set(locs);
}

const sitemapUrls = await loadSitemap();
const results: Result[] = [];
for (const p of ALL_PATHS) {
  const r = await check(p, sitemapUrls);
  results.push(r);
  const icon = r.ok ? "✅" : "❌";
  console.log(`${icon} ${p}`);
  for (const i of r.issues) console.log(`     • ${i}`);
}
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} pages passed.`);
process.exit(failed === 0 ? 0 : 1);
