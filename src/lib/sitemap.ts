import { SERVICE_ORDER } from "@/content/site";
import { serviceHref, SITE_ORIGIN } from "./service-routes";
const escapeXml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
export function sitemap() {
  const groups = [
    ["/?lang=en", "/?lang=ar"],
    ...SERVICE_ORDER.map((id) => [serviceHref(id, "en"), serviceHref(id, "ar")]),
  ];
  return (
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
    groups
      .flatMap((paths) =>
        paths.map(
          (path) =>
            `<url><loc>${escapeXml(SITE_ORIGIN + path)}</loc>${paths.map((alternate, index) => `<xhtml:link rel="alternate" hreflang="${index ? "ar" : "en"}" href="${escapeXml(SITE_ORIGIN + alternate)}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(SITE_ORIGIN + paths[0])}"/></url>`,
        ),
      )
      .join("") +
    "</urlset>"
  );
}

export function robots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}
