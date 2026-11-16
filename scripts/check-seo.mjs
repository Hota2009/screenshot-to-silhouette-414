import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { JSDOM } from "jsdom";

const built = process.argv.includes("--built");
const origin = built
  ? "https://screenshot-to-silhouette.ahmedhota2009.workers.dev"
  : process.argv[2] || "http://127.0.0.1:8080";
const worker = built ? (await import("../.output/server/index.mjs")).default : null;
const request = (path) =>
  worker ? worker.fetch(new Request(origin + path), {}, { waitUntil() {} }) : fetch(origin + path);
const slugs = [
  "firefighting-systems",
  "electric-motors",
  "pump-maintenance",
  "transformer-maintenance",
  "generators-ats",
  "central-hvac",
  "hvac-ducting",
];
const canonicalUrls = new Set();
const titles = new Set();
const descriptions = new Set();
let canonicalOrigin;
for (const lang of ["en", "ar"]) {
  for (const slug of [null, ...slugs]) {
    const path = `${slug ? `/services/${slug}` : "/"}?lang=${lang}`;
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const document = new JSDOM(await response.text()).window.document;
    const meta = (key) =>
      document
        .querySelector(`meta[name="${key}"],meta[property="${key}"]`)
        ?.getAttribute("content");
    assert.equal(document.documentElement.lang, lang);
    assert.equal(document.documentElement.dir, lang === "ar" ? "rtl" : "ltr");
    assert.equal(document.querySelectorAll("h1").length, 1);
    assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
    assert.equal(document.querySelectorAll('meta[name="description"]').length, 1);
    const canonical = document.querySelector('link[rel="canonical"]').href;
    const url = new URL(canonical);
    canonicalOrigin ??= url.origin;
    assert.equal(url.origin, canonicalOrigin);
    assert.equal(url.pathname + url.search, path);
    canonicalUrls.add(canonical);
    assert(!titles.has(document.title), `Duplicate title: ${path}`);
    titles.add(document.title);
    const description = meta("description");
    assert(
      description && description.length <= 200 && !descriptions.has(description),
      `Description: ${path}`,
    );
    descriptions.add(description);
    for (const language of ["en", "ar", "x-default"]) {
      const alternate = document.querySelector(`link[rel="alternate"][hreflang="${language}"]`);
      assert(alternate, `${language} alternate missing: ${path}`);
      const target = new URL(alternate.href);
      assert.equal(target.pathname, url.pathname);
      assert.equal(target.searchParams.get("lang"), language === "x-default" ? "en" : language);
    }
    assert.equal(meta("og:url"), canonical);
    assert.equal(meta("og:title"), document.title);
    assert.equal(meta("twitter:image"), meta("og:image"));
    const image = new URL(meta("og:image"));
    assert.equal(image.origin, canonicalOrigin);
    if (built)
      assert(
        existsSync(new URL("../.output/public" + image.pathname, import.meta.url)),
        `Missing share image: ${image.pathname}`,
      );
    else assert.equal((await request(image.pathname)).status, 200);
    const graphs = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(
      (script) => JSON.parse(script.textContent)["@graph"] || [],
    );
    const node = (type) => graphs.find((entry) => entry["@type"] === type);
    assert.equal(node("WebPage").url, canonical);
    assert.equal(node("WebPage").inLanguage, lang);
    assert.equal(node("Organization").contactPoint.length, 2);
    if (slug) {
      assert.equal(node("Service").url, canonical);
      assert.equal(node("BreadcrumbList").itemListElement.at(-1).item, canonical);
      assert.equal(
        document.querySelector("main select").value,
        {
          "firefighting-systems": "firefighting",
          "electric-motors": "motors",
          "pump-maintenance": "pumps",
          "transformer-maintenance": "transformers",
          "generators-ats": "generators",
          "central-hvac": "hvac",
          "hvac-ducting": "ducting",
        }[slug],
      );
    }
    console.log("PASS SEO", path);
  }
}
const sitemapResponse = await request("/sitemap.xml");
assert.equal(sitemapResponse.status, 200);
const xml = new JSDOM(await sitemapResponse.text(), { contentType: "application/xml" }).window
  .document;
assert.equal(xml.querySelectorAll("url").length, 16);
for (const entry of xml.querySelectorAll("url")) {
  assert(canonicalUrls.has(entry.querySelector("loc").textContent));
  assert.equal(entry.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "link").length, 3);
}
const robotsResponse = await request("/robots.txt");
assert.equal(robotsResponse.status, 200);
assert((await robotsResponse.text()).includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
for (const path of ["/services/unknown?lang=en", "/not-a-page"]) {
  const response = await request(path);
  assert.equal(response.status, 404);
  assert(response.headers.get("x-robots-tag")?.includes("noindex"));
}
const tracked = await request("/services/electric-motors?lang=ar&utm_source=test");
const trackedDoc = new JSDOM(await tracked.text()).window.document;
assert.equal(
  trackedDoc.querySelector('link[rel="canonical"]').href,
  `${canonicalOrigin}/services/electric-motors?lang=ar`,
);
console.log("PASS sitemap, robots, error noindex, tracking-parameter canonical");
