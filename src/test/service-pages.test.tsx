import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { ReactNode } from "react";
let root: Root | undefined;
function render(node: ReactNode) {
  const host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  act(() => root!.render(node));
}
function cleanup() {
  act(() => root?.unmount());
  document.body.innerHTML = "";
}

import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { ServicePage } from "@/components/site/ServicePage";
import { Services } from "@/components/site/Services";
import { CONTENT, SERVICE_ORDER } from "@/content/site";
import { I18nProvider } from "@/lib/i18n";
import { serviceHref, serviceId, SERVICE_SLUGS } from "@/lib/service-routes";
import { sitemap } from "@/lib/sitemap";
import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "@/routeTree.gen";

beforeAll(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});
afterEach(cleanup);
describe("Bilingual service pages", () => {
  for (const lang of ["en", "ar"] as const) {
    it(`links every home card to the ${lang} service`, () => {
      render(
        <I18nProvider initialLang={lang}>
          <Services />
        </I18nProvider>,
      );
      for (const id of SERVICE_ORDER)
        expect(document.querySelector(`a[href="${serviceHref(id, lang)}"]`)).toHaveTextContent(
          CONTENT[lang].services.items[id].title,
        );
    });
    for (const id of SERVICE_ORDER)
      it(`renders ${id} in ${lang} with a preselected enquiry and crawlable links`, () => {
        render(
          <I18nProvider initialLang={lang}>
            <ServicePage id={id} />
          </I18nProvider>,
        );
        expect(document.querySelector("h1")).toHaveTextContent(
          CONTENT[lang].servicePage.items[id].title,
        );
        expect(document.documentElement).toHaveAttribute("lang", lang);
        expect(document.documentElement).toHaveAttribute("dir", lang === "ar" ? "rtl" : "ltr");
        expect(document.querySelector("select")).toHaveValue(id);
        expect(document.querySelector('main a[href="#contact"]')).toHaveAttribute(
          "href",
          "#contact",
        );
        expect(document.querySelectorAll('a[href^="/services/"]').length).toBe(2);
        expect(document.querySelector('a[href^="tel:"]')).toBeTruthy();
        // Exercise the actual language button without navigating jsdom.
        const locationDescriptor = Object.getOwnPropertyDescriptor(window, "location")!;
        const assign = vi.fn();
        const other = lang === "en" ? "ar" : "en";
        Object.defineProperty(window, "location", {
          configurable: true,
          value: { href: "https://example.test" + serviceHref(id, lang) + "#contact", assign },
        });
        try {
          const switcher = document.querySelector<HTMLButtonElement>(
            `button[aria-label="${CONTENT[lang].meta.switchAria}"]`,
          )!;
          act(() => switcher.click());
          expect(assign).toHaveBeenCalledWith(
            "https://example.test" + serviceHref(id, other) + "#contact",
          );
          expect(window.localStorage.getItem("ee-lang")).toBe(other);
        } finally {
          Object.defineProperty(window, "location", locationDescriptor);
        }
        const gallery = Array.from(document.querySelectorAll("img")).find((img) =>
          img.alt.includes(CONTENT[lang].servicePage.gallery),
        );
        expect(Boolean(gallery)).toBe(id !== "ducting");
        const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
        expect(router.matchRoutes(`/services/${SERVICE_SLUGS[id]}`).at(-1)?.routeId).toBe(
          "/services/$slug",
        );
      });
  }
  it("rejects unknown service slugs and lists 14 localized service URLs in sitemap", () => {
    expect(serviceId("unknown")).toBeUndefined();
    const xml = new DOMParser().parseFromString(sitemap(), "application/xml");
    expect(xml.querySelector("parsererror")).toBeNull();
    expect(xml.querySelectorAll("url")).toHaveLength(16);
    for (const id of SERVICE_ORDER)
      for (const lang of ["en", "ar"] as const) expect(sitemap()).toContain(serviceHref(id, lang));
  });
});
