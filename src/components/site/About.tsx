import teamOnsite from "@/assets/work/about-team-onsite.jpg";
import teamPump from "@/assets/work/about-team-pump.jpg";
import { useI18n } from "@/lib/i18n";

import { Reveal, SectionLabel } from "./primitives";

export function About() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section id="about" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionLabel index={a.index}>{a.label}</SectionLabel>
            <p className="font-display-wide mt-8 text-balance text-[clamp(1.7rem,3.2vw,2.75rem)] font-bold leading-[1.1] rtl:leading-[1.45]">
              {a.statement}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-7 lg:pt-14">
            <p className="text-foreground">{a.p1}</p>
            <p>{a.p2}</p>
            <p>{a.p3}</p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-12">
          <Reveal className="relative md:col-span-8">
            <figure className="group relative overflow-hidden rounded-lg shadow-elegant">
              <img
                src={teamOnsite}
                alt={a.caption}
                width={828}
                height={621}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-[1.6s] ease-expo group-hover:scale-[1.04]"
              />
              <figcaption className="glass-dark absolute bottom-4 start-4 rounded-md border px-4 py-2 text-sm text-navy-foreground">
                {a.caption}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-4">
            <div className="flex h-full flex-col gap-5">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={teamPump}
                  alt=""
                  width={540}
                  height={728}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover md:aspect-auto md:h-64"
                />
              </div>
              <div className="surface-navy relative flex flex-1 flex-col justify-end overflow-hidden rounded-lg p-7">
                <div className="bg-blueprint absolute inset-0 opacity-60" />
                <p className="eyebrow relative text-primary-glow">{t.brand.legal}</p>
                <p className="font-display-wide relative mt-3 text-2xl font-bold">{t.hero.line1}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
          {a.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="bg-background p-8">
              <span className="eyebrow text-primary">0{i + 1}</span>
              <h3 className="font-display-wide mt-4 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
