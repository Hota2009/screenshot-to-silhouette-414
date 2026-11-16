import heroImage from "@/assets/hero-engine-hall.jpg";
import logoImage from "@/assets/brand/kw-mark.png";
import { SERVICE_COVERS } from "@/content/service-media";
import {
  CONTENT,
  CONTACT,
  ENGINEERS,
  SERVICE_ORDER,
  type Lang,
  type ServiceId,
} from "@/content/site";
import { homeHref, serviceHref, SITE_ORIGIN } from "./service-routes";

const absolute = (path: string) => new URL(path, SITE_ORIGIN + "/").href;
export const localizedPath = (lang: Lang, id?: ServiceId) =>
  id ? serviceHref(id, lang) : `/?lang=${lang}`;
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

/** One source for canonical, language alternates, social previews and structured data. */
export function seoHead(lang: Lang, id?: ServiceId) {
  const t = CONTENT[lang];
  const copy = id ? t.seo.services[id] : t.seo.home;
  const canonical = absolute(localizedPath(lang, id));
  const image = absolute(id ? SERVICE_COVERS[id] : heroImage);
  const imageAlt = id ? t.services.items[id].title : t.brand.legal;
  const organizationId = `${SITE_ORIGIN}/#organization`;
  const websiteId = `${SITE_ORIGIN}/#website`;
  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: t.brand.legal,
    alternateName: CONTENT[lang === "en" ? "ar" : "en"].brand.legal,
    url: SITE_ORIGIN + "/",
    logo: absolute(logoImage),
    email: CONTACT.email,
    contactPoint: ENGINEERS.map((engineer) => ({
      "@type": "ContactPoint",
      name: engineer.name[lang],
      telephone: engineer.tel,
      email: engineer.email,
      contactType: "customer service",
      availableLanguage: ["en", "ar"],
      areaServed: "SA",
    })),
  };
  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE_ORIGIN + "/",
    name: t.brand.legal,
    inLanguage: ["en", "ar"],
    publisher: { "@id": organizationId },
  };
  const webpage = {
    "@type": "WebPage",
    "@id": canonical + "#webpage",
    url: canonical,
    name: copy.title,
    description: copy.description,
    inLanguage: lang,
    isPartOf: { "@id": websiteId },
    about: { "@id": id ? canonical + "#service" : organizationId },
    primaryImageOfPage: { "@type": "ImageObject", url: image },
    ...(id ? { breadcrumb: { "@id": canonical + "#breadcrumb" } } : {}),
  };
  const graph: object[] = [organization, website, webpage];
  if (id) {
    graph.push(
      {
        "@type": "Service",
        "@id": canonical + "#service",
        url: canonical,
        name: t.servicePage.items[id].title,
        serviceType: t.services.items[id].title,
        description: t.services.items[id].long,
        provider: { "@id": organizationId },
        areaServed: { "@type": "Country", name: t.seo.region },
      },
      {
        "@type": "BreadcrumbList",
        "@id": canonical + "#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t.nav.services,
            item: absolute(homeHref(lang)),
          },
          { "@type": "ListItem", position: 2, name: t.services.items[id].title, item: canonical },
        ],
      },
    );
  } else {
    graph.push({
      "@type": "ItemList",
      "@id": canonical + "#services",
      name: t.services.label,
      itemListElement: SERVICE_ORDER.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: t.services.items[service].title,
        url: absolute(serviceHref(service, lang)),
      })),
    });
  }
  return {
    meta: [
      { title: copy.title },
      { name: "description", content: copy.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: t.brand.legal },
      { property: "og:title", content: copy.title },
      { property: "og:description", content: copy.description },
      { property: "og:url", content: canonical },
      { property: "og:locale", content: lang === "ar" ? "ar_SA" : "en_SA" },
      { property: "og:locale:alternate", content: lang === "ar" ? "en_SA" : "ar_SA" },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: copy.title },
      { name: "twitter:description", content: copy.description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [
      { rel: "canonical", href: canonical },
      ...(["en", "ar"] as const).map((language) => ({
        rel: "alternate",
        hrefLang: language,
        href: absolute(localizedPath(language, id)),
      })),
      { rel: "alternate", hrefLang: "x-default", href: absolute(localizedPath("en", id)) },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: serializeJsonLd({ "@context": "https://schema.org", "@graph": graph }),
      },
    ],
  };
}
