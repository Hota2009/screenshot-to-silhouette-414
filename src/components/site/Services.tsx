import { SERVICE_IMAGES } from "@/content/service-media";
import {
  ArrowUpRight,
  Cog,
  Droplets,
  Fan,
  Flame,
  Power,
  Snowflake,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { SERVICE_ORDER, type ServiceId } from "@/content/site";
import { serviceHref } from "@/lib/service-routes";
import { useI18n } from "@/lib/i18n";

import { Reveal, SectionLabel, SectionTitle } from "./primitives";

const MEDIA: Record<ServiceId, { img: string; Icon: LucideIcon }> = {
  firefighting: { img: SERVICE_IMAGES.firefighting, Icon: Flame },
  motors: { img: SERVICE_IMAGES.motors, Icon: Cog },
  pumps: { img: SERVICE_IMAGES.pumps, Icon: Droplets },
  transformers: { img: SERVICE_IMAGES.transformers, Icon: Zap },
  generators: { img: SERVICE_IMAGES.generators, Icon: Power },
  hvac: { img: SERVICE_IMAGES.hvac, Icon: Snowflake },
  ducting: { img: SERVICE_IMAGES.ducting, Icon: Fan },
};

export function ServiceCard({ id, index = 0 }: { id: ServiceId; index?: number }) {
  const { t, lang } = useI18n();
  const s = t.services;
  const item = s.items[id];
  const { img, Icon } = MEDIA[id];
  const i = index;
  return (
    <Reveal delay={(i % 3) * 0.08}>
      <a
        href={serviceHref(id, lang)}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg border bg-card text-start shadow-card transition-[transform,box-shadow,border-color] duration-500 ease-expo hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elegant"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={img}
            alt=""
            width={1024}
            height={768}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.07]"
          />
          <div className="bg-fade-bottom absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
          <span className="eyebrow absolute start-5 top-5 rounded-sm bg-navy/70 px-2 py-1 text-navy-foreground backdrop-blur">
            0{SERVICE_ORDER.indexOf(id) + 1}
          </span>
          <span className="absolute bottom-5 start-5 flex size-12 items-center justify-center rounded-md bg-electric text-primary-foreground shadow-glow">
            <Icon className="size-5" aria-hidden />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display-wide text-xl font-bold leading-snug rtl:leading-relaxed">
            {item.title}
          </h3>
          <p className="mt-3 text-muted-foreground">{item.short}</p>
          <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-primary">
            {s.learnMore}
            <ArrowUpRight className="flip-rtl size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}
export function Services() {
  const { t } = useI18n();
  const s = t.services;
  return (
    <section id="services" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel index={s.index}>{s.label}</SectionLabel>
            <SectionTitle className="mt-8">{s.title}</SectionTitle>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground">{s.body}</p>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_ORDER.map((id, i) => (
            <ServiceCard key={id} id={id} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
