import { SERVICE_COVERS } from "@/content/service-media";
import { MotionConfig } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer, BackToTop } from "./Footer";
import { Contact } from "./Contact";
import { ServiceCard } from "./Services";
import { Reveal, SectionLabel, SectionTitle } from "./primitives";
import { Button } from "@/components/ui/button";
import { SERVICE_WORK, type ServiceId } from "@/content/site";
import { photosFor, FIREFIGHTING_PHOTOS } from "@/content/work";
import { homeHref, RELATED } from "@/lib/service-routes";
import { useI18n } from "@/lib/i18n";

export function ServicePage({ id }: { id: ServiceId }) {
  const { t, lang } = useI18n();
  const page = t.servicePage;
  const detail = page.items[id];
  const item = t.services.items[id];
  // Firefighting photos were confirmed by the company; ducting remains undocumented.
  const photos =
    id === "firefighting"
      ? FIREFIGHTING_PHOTOS.slice(0, 6)
      : id === "ducting"
        ? []
        : photosFor(SERVICE_WORK[id], 6);
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main id="top">
        <section className="relative isolate overflow-hidden bg-navy-deep pb-24 pt-36 text-navy-foreground sm:pb-32 sm:pt-44">
          <img
            src={SERVICE_COVERS[id]}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-black/60" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <nav aria-label={t.nav.services} className="text-sm text-navy-muted">
              <a className="hover:text-navy-foreground" href={homeHref(lang)}>
                {t.nav.services}
              </a>
              <span aria-hidden className="mx-3">
                /
              </span>
              <span aria-current="page">{item.title}</span>
            </nav>
            <div className="mt-12 max-w-5xl">
              <SectionLabel index={t.services.index} tone="dark">
                {t.services.label}
              </SectionLabel>
              <h1 className="font-display-wide mt-8 text-balance text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.05] rtl:leading-[1.3]">
                {detail.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-navy-muted">{item.short}</p>
              <Button asChild variant="electric" size="xl" className="mt-8">
                <a href="#contact">
                  {page.quote}
                  <ArrowUpRight className="flip-rtl" />
                </a>
              </Button>
            </div>
          </div>
        </section>
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
            <Reveal>
              <SectionTitle>{page.scope}</SectionTitle>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{item.long}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-6">
                {detail.steps.map((text) => (
                  <li
                    key={text}
                    className="border-s-2 border-primary ps-6 text-lg leading-relaxed text-muted-foreground"
                  >
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-lg border bg-card p-6 shadow-card">
                <h3 className="font-display-wide text-xl font-bold">{page.prepare}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{page.prepareBody}</p>
              </div>
            </Reveal>
          </div>
        </section>
        {photos.length > 0 && (
          <section className="bg-surface py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Reveal>
                <SectionLabel index="01">{page.gallery}</SectionLabel>
                <SectionTitle className="mt-8">{t.services.fromField}</SectionTitle>
              </Reveal>
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {photos.map((p) => (
                  <Reveal key={p.id}>
                    <img
                      src={p.src}
                      alt={`${id === "firefighting" ? item.title : t.workCategories[p.category]} — ${page.gallery}`}
                      loading="lazy"
                      width={640}
                      height={480}
                      className="aspect-[4/3] w-full rounded-lg border object-cover shadow-card"
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
        <Contact requestedService={id} />
        <section className="bg-surface py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <SectionTitle>{page.related}</SectionTitle>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {detail.related}
              </p>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {RELATED[id].map((related, index) => (
                <ServiceCard key={related} id={related} index={index} />
              ))}
            </div>
            <a
              className="mt-10 inline-flex font-semibold text-primary hover:underline"
              href={homeHref(lang)}
            >
              {t.nav.services}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
