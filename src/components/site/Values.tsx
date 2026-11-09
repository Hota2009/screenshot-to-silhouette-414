import { BadgeCheck, Gauge, Leaf, Lightbulb, ShieldCheck, type LucideIcon } from "lucide-react";

import { useI18n } from "@/lib/i18n";

import { Reveal, SectionLabel, SectionTitle } from "./primitives";

const ICONS: LucideIcon[] = [BadgeCheck, ShieldCheck, Lightbulb, Gauge, Leaf];

export function Values() {
  const { t } = useI18n();
  const v = t.values;

  return (
    <section id="values" className="surface-navy relative isolate overflow-hidden py-24 sm:py-32">
      <div className="bg-blueprint absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel index={v.index} tone="dark">
              {v.label}
            </SectionLabel>
            <SectionTitle className="mt-8">{v.title}</SectionTitle>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {v.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 0.07} className="h-full">
                <article
                  tabIndex={0}
                  className="glass-panel group relative flex h-full min-h-72 flex-col overflow-hidden rounded-lg p-6 outline-none transition-[transform,border-color,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow focus-visible:-translate-y-1.5 focus-visible:border-primary/50 focus-visible:shadow-glow"
                >
                  <span className="bg-electric absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-expo group-hover:scale-x-100 group-focus-visible:scale-x-100 rtl:origin-right" />
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-md border border-navy-line bg-navy-foreground/5 text-primary-glow transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="eyebrow text-navy-muted">0{i + 1}</span>
                  </div>
                  <h3 className="font-display-wide mt-auto pt-10 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-muted">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-24 grid gap-10 border-t border-navy-line pt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-primary-glow">{v.goalsLabel}</p>
          </Reveal>
          <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
            {v.goals.map((g, i) => (
              <Reveal key={g} delay={i * 0.05}>
                <li className="flex gap-4">
                  <span className="font-display-wide text-sm font-bold text-spark">0{i + 1}</span>
                  <p className="leading-relaxed text-navy-foreground/90">{g}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
