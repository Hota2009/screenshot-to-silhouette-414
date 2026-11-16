import { describe, expect, it } from "vitest";
import { CONTENT, ENGINEERS, SERVICE_ORDER, type ServiceId } from "@/content/site";
import { seoHead, serializeJsonLd } from "@/lib/seo";
import { robots, sitemap } from "@/lib/sitemap";
import { SITE_ORIGIN } from "@/lib/service-routes";

describe("Search metadata", () => {
  const pages: (ServiceId | undefined)[] = [undefined, ...SERVICE_ORDER];
  const titles: string[] = [];
  const descriptions: string[] = [];
  for (const lang of ["en", "ar"] as const)
    for (const id of pages) {
      it(`${lang} ${id ?? "home"}: localized canonical, previews and truthful structured data`, () => {
        const head = seoHead(lang, id);
        const canonical = head.links.find((link) => link.rel === "canonical")!.href;
        const url = new URL(canonical);
        expect(url.origin).toBe(SITE_ORIGIN);
        expect(url.searchParams.get("lang")).toBe(lang);
        expect(
          head.links.filter((link) => link.rel === "alternate").map((link) => link.hrefLang),
        ).toEqual(["en", "ar", "x-default"]);
        const meta = (key: string) =>
          head.meta.find((m) => m.name === key || m.property === key)?.content;
        expect(meta("og:url")).toBe(canonical);
        expect(meta("og:image")).toMatch(/^https:\/\//);
        expect(meta("twitter:image")).toBe(meta("og:image"));
        expect(meta("description")!.length).toBeLessThanOrEqual(200);
        const copy = id ? CONTENT[lang].seo.services[id] : CONTENT[lang].seo.home;
        expect(meta("description")).toBe(copy.description);
        titles.push(copy.title);
        descriptions.push(copy.description);
        const data = JSON.parse(head.scripts[0]!.children);
        const node = (type: string) =>
          data["@graph"].find((entry: Record<string, unknown>) => entry["@type"] === type);
        expect(
          node("Organization").contactPoint.map((point: { telephone: string }) => point.telephone),
        ).toEqual(ENGINEERS.map((engineer) => engineer.tel));
        expect(node("WebPage").inLanguage).toBe(lang);
        expect(node("WebPage").url).toBe(canonical);
        if (id) {
          expect(node("Service").name).toBe(CONTENT[lang].servicePage.items[id].title);
          expect(node("Service").provider["@id"]).toBe(node("Organization")["@id"]);
          expect(node("BreadcrumbList").itemListElement.at(-1).item).toBe(canonical);
        } else expect(node("ItemList").itemListElement).toHaveLength(7);
        expect(head.scripts[0]!.children).not.toMatch(/aggregateRating|openingHours|streetAddress/);
      });
    }
  it("has unique titles/descriptions across all 16 pages", () => {
    expect(new Set(titles).size).toBe(16);
    expect(new Set(descriptions).size).toBe(16);
  });
  it("keeps sitemap and robots on the configured domain with reciprocal alternates", () => {
    expect(robots()).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`);
    const xml = new DOMParser().parseFromString(sitemap(), "application/xml");
    expect(xml.querySelector("parsererror")).toBeNull();
    for (const entry of Array.from(xml.querySelectorAll("url"))) {
      expect(entry.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "link")).toHaveLength(3);
      expect(sitemap()).toContain(entry.querySelector("loc")!.textContent!);
    }
  });
  it("escapes embedded script terminators in structured data", () => {
    const serialized = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized).name).toBe("</script><script>alert(1)</script>");
  });
});
