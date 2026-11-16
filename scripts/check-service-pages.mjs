// Run with the local preview server available. Optional argument: server origin.
const built = process.argv.includes("--built");
const origin = built
  ? "https://screenshot-to-silhouette.ahmedhota2009.workers.dev"
  : process.argv[2] || "http://127.0.0.1:8080";
const worker = built ? (await import("../.output/server/index.mjs")).default : null;
const request = (url) =>
  worker ? worker.fetch(new Request(url), {}, { waitUntil() {} }) : fetch(url);
const slugs = [
  "firefighting-systems",
  "electric-motors",
  "pump-maintenance",
  "transformer-maintenance",
  "generators-ats",
  "central-hvac",
  "hvac-ducting",
];
for (const lang of ["en", "ar"])
  for (const slug of slugs) {
    const path = `/services/${slug}?lang=${lang}`;
    for (let refresh = 0; refresh < 2; refresh++) {
      const r = await request(origin + path);
      const html = await r.text();
      if (
        r.status !== 200 ||
        !html.includes(`lang="${lang}"`) ||
        !html.includes('rel="canonical"') ||
        !html.toLowerCase().includes('hreflang="ar"') ||
        !html.includes("<h1") ||
        !html.includes('id="contact"')
      )
        throw new Error(`${r.status} ${path}: ${html.slice(0, 300)}`);
    }
    console.log("PASS direct + refresh", path);
  }
for (const path of ["/?lang=en", "/?lang=ar", "/sitemap.xml"]) {
  const r = await request(origin + path);
  if (!r.ok) throw new Error(path + ": " + r.status);
  console.log("PASS", path);
}
const missing = await request(origin + "/services/unknown?lang=en");
if (missing.status !== 404) throw new Error("Unknown service must be 404: " + missing.status);
console.log("PASS unknown service 404");
