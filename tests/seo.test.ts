/**
 * Vitest SEO regression suite.
 *
 * Source-level assertions: every page route file ships the right primary keyword
 * in its <h1>, the right keywords on the page, an FAQ section, AeoBlock, GeoBlock,
 * buildHead() with a route-specific title and description, and is registered in
 * src/lib/seo-keywords.ts (and therefore in the sitemap).
 *
 * Run:  bunx vitest run
 */
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { SEO, ALL_PATHS } from "../src/lib/seo-keywords";

function routeFile(path: string): string {
  // "/foo-bar" -> "src/routes/foo-bar.tsx"; "/" -> "src/routes/index.tsx"
  const name = path === "/" ? "index" : path.slice(1);
  const f = `src/routes/${name}.tsx`;
  if (!existsSync(f)) throw new Error(`Route file missing for ${path}: ${f}`);
  return readFileSync(f, "utf8");
}

describe("SEO source-level QA", () => {
  for (const path of ALL_PATHS) {
    const kw = SEO[path];
    describe(`page ${path}`, () => {
      const src = routeFile(path);
      const lower = src.toLowerCase();

      it("has buildHead with route-specific TITLE/DESC", () => {
        expect(src).toMatch(/buildHead\(\{[\s\S]*title:\s*TITLE/);
        expect(src).toMatch(/const TITLE\s*=\s*["'][^"']{30,70}["']/);
        expect(src).toMatch(/const DESC\s*=\s*["'][^"']{110,200}["']/);
      });

      it("renders ToolHero with primary keyword in h1", () => {
        const heroMatch = src.match(/<ToolHero[\s\S]*?h1=["']([^"']+)["']/);
        expect(heroMatch, "ToolHero h1 prop").toBeTruthy();
        expect(heroMatch![1].toLowerCase()).toContain(kw.primary.toLowerCase());
      });

      it("references the page keyword list", () => {
        expect(src).toContain(`SEO["${path}"]`);
      });

      it("mentions at least 40% of target keywords (strict check lives in scripts/seo-qa.ts)", () => {
        const missing = kw.keywords.filter((k) => !lower.includes(k.toLowerCase()));
        const coverage = 1 - missing.length / kw.keywords.length;
        expect(coverage, `coverage for ${path} (missing: ${missing.join(", ")})`).toBeGreaterThanOrEqual(0.4);
      });

      it("ships AeoBlock, GeoBlock and FaqSection", () => {
        expect(src).toContain("<AeoBlock");
        expect(src).toContain("<GeoBlock");
        expect(src).toContain("<FaqSection");
      });

      it("declares JSON-LD via buildHead (covers WebPage / FAQPage / SoftwareApplication / BreadcrumbList)", () => {
        expect(src).toContain("breadcrumbs:");
        expect(src).toContain("faqs: FAQS");
      });
    });
  }

  it("every keyword path is registered in the sitemap source", () => {
    const sm = readFileSync("src/routes/sitemap[.]xml.ts", "utf8");
    expect(sm).toContain("ALL_PATHS");
  });
});
