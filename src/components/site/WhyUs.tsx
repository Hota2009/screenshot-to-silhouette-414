import { Activity, ClipboardCheck, Cpu, Handshake, HardHat, Users, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

import { Reveal, SectionLabel, SectionTitle, scrollToId } from "./primitives";

const ICONS: LucideIcon[] = [HardHat, Users, Cpu, ClipboardCheck, Activity, Handshake];

export function WhyUs() {
  const { t } = useI18n();
  const w = t.why;

  return (
    <section id="why" className="relative isolate overflow-hidden bg-navy-deep py-24 text-navy-foreground sm:py-32">
      <div className="bg-blueprint absolute inset-0 -z-10 opacity-50" />
      <div
        aria-hidden
        className="font-display-wide pointer-events-none absolute -end-10 -top-16 -z-10 select-none text-[22rem] font-black leading-none text-navy-foreground/[0.03]"
      >
        KW
      </div>
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index={w.index} tone="dark">
              {w.label}
            </SectionLabel>
            <SectionTitle className="mt-8">{w.title}</SectionTitle>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-navy-muted">{w.body}</p>
            <Button variant="electric" size="xl" className="mt-10" onClick={() => scrollToId("contact")}>
              {t.nav.cta}
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-lg border border-navy-line bg-navy-line sm:grid-cols-2 lg:col-span-7">
          {w.items.map((item, i) => {
            const Icon = ICONS[i] ?? HardHat;
            return (
              <Reveal key={item.title} delay={(i % 2) * 0.08} className="h-full">
                <div className="group relative h-full bg-navy-deep p-8 transition-colors duration-500 hover:bg-navy-raised">
                  <Icon className="size-7 text-primary-glow transition-transform duration-500 ease-expo group-hover:-translate-y-1" aria-hidden />
                  <h3 className="font-display-wide mt-8 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-navy-muted">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
