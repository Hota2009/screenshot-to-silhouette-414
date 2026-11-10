import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import missionImg from "@/assets/mission-diagnostics.jpg";
import visionImg from "@/assets/vision-horizon.jpg";
import { useI18n } from "@/lib/i18n";

import { Reveal, SectionLabel, SectionTitle } from "./primitives";

export function Vision() {
  const { t } = useI18n();
  const v = t.vision;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="vision"
      ref={ref}
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-navy-deep text-navy-foreground"
    >
      <motion.img
        src={visionImg}
        alt=""
        width={1920}
        height={1088}
        loading="lazy"
        style={{ y }}
        className="absolute inset-0 -z-20 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-fade-bottom" />

      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionLabel index={v.index} tone="dark">
            {v.label}
          </SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionTitle className="mt-8 max-w-4xl text-[clamp(2.2rem,5.2vw,4.6rem)] leading-[1.02] rtl:leading-[1.3]">{v.title}</SectionTitle>
        </Reveal>
        <div className="mt-12 grid max-w-5xl gap-8 border-t border-navy-line pt-8 text-lg leading-relaxed text-navy-muted md:grid-cols-2">
          <Reveal delay={0.12}>
            <p>{v.body}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p>{v.body2}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Mission() {
  const { t } = useI18n();
  const m = t.mission;

  return (
    <section id="mission" className="bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        <Reveal className="relative lg:col-span-5">
          <div className="sticky top-28 overflow-hidden rounded-lg shadow-elegant">
            <img
              src={missionImg}
              alt=""
              width={1024}
              height={1280}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="glass-dark absolute inset-x-4 bottom-4 rounded-md border p-5 text-navy-foreground">
              <p className="eyebrow text-primary-glow">{m.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-muted">{m.points[0]}</p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel index={m.index}>{m.label}</SectionLabel>
            <SectionTitle className="mt-8">{m.title}</SectionTitle>
            <p className="mt-8 text-lg text-muted-foreground">{m.intro}</p>
          </Reveal>

          <ol className="mt-10 border-t">
            {m.points.map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <li className="group flex gap-6 border-b py-6">
                  <span className="font-display-wide text-3xl font-bold text-primary/30 transition-colors duration-500 group-hover:text-primary">
                    0{i + 1}
                  </span>
                  <p className="pt-1.5 text-lg leading-relaxed">{p}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <blockquote className="mt-12 border-s-2 border-primary ps-6 text-xl leading-relaxed text-foreground rtl:leading-loose">
              {m.statement}
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
