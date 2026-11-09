import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, Cog, Droplets, Fan, Power, Snowflake, X, Zap, type LucideIcon } from "lucide-react";
import { useState } from "react";

import ductingImg from "@/assets/service-ducting.jpg";
import generatorsImg from "@/assets/service-generators.jpg";
import hvacImg from "@/assets/service-hvac.jpg";
import motorsImg from "@/assets/service-motors.jpg";
import pumpsImg from "@/assets/service-pumps.jpg";
import transformersImg from "@/assets/service-transformers.jpg";
import { Button } from "@/components/ui/button";
import { SERVICE_ORDER, SERVICE_WORK, type ServiceId } from "@/content/site";
import { photosFor } from "@/content/work";
import { useI18n } from "@/lib/i18n";

import { Reveal, SectionLabel, SectionTitle } from "./primitives";

const MEDIA: Record<ServiceId, { img: string; Icon: LucideIcon }> = {
  motors: { img: motorsImg, Icon: Cog },
  pumps: { img: pumpsImg, Icon: Droplets },
  transformers: { img: transformersImg, Icon: Zap },
  generators: { img: generatorsImg, Icon: Power },
  hvac: { img: hvacImg, Icon: Snowflake },
  ducting: { img: ductingImg, Icon: Fan },
};

export function Services({ onRequest }: { onRequest: (id: ServiceId) => void }) {
  const { t } = useI18n();
  const s = t.services;
  const [openId, setOpenId] = useState<ServiceId | null>(null);
  const current = openId ? s.items[openId] : null;

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
          {SERVICE_ORDER.map((id, i) => {
            const { img, Icon } = MEDIA[id];
            const item = s.items[id];
            return (
              <Reveal key={id} delay={(i % 3) * 0.08}>
                <button
                  type="button"
                  onClick={() => setOpenId(id)}
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
                      0{i + 1}
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
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <DialogPrimitive.Root open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-navy-deep/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
          {openId && current && (
            <DialogPrimitive.Content
              dir={t.meta.dir}
              className="fixed left-1/2 top-1/2 z-50 max-h-[92svh] w-[min(96vw,60rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-card shadow-elegant data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
            >
              <div className="relative aspect-[21/9] overflow-hidden">
                <img src={MEDIA[openId].img} alt="" className="h-full w-full object-cover" />
                <div className="bg-fade-bottom absolute inset-0" />
                <DialogPrimitive.Title className="font-display-wide absolute bottom-6 start-6 end-6 text-2xl font-bold text-navy-foreground sm:text-3xl">
                  {current.title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Close
                  aria-label={s.close}
                  className="glass-dark absolute end-4 top-4 flex size-10 items-center justify-center rounded-full border text-navy-foreground transition-colors hover:bg-navy"
                >
                  <X className="size-4" />
                </DialogPrimitive.Close>
              </div>
              <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-5">
                <div className="md:col-span-3">
                  <DialogPrimitive.Description className="text-lg leading-relaxed text-muted-foreground">
                    {current.long}
                  </DialogPrimitive.Description>
                  <Button
                    variant="electric"
                    size="xl"
                    className="mt-8"
                    onClick={() => {
                      const id = openId;
                      setOpenId(null);
                      onRequest(id);
                    }}
                  >
                    {s.request}
                    <ArrowUpRight className="flip-rtl" />
                  </Button>
                </div>
                <div className="md:col-span-2">
                  <p className="eyebrow text-muted-foreground">{s.fromField}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {photosFor(SERVICE_WORK[openId], 4).map((p) => (
                      <img
                        key={p.id}
                        src={p.src}
                        alt={t.workCategories[p.category]}
                        loading="lazy"
                        className="aspect-square w-full rounded-md object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </DialogPrimitive.Content>
          )}
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}
