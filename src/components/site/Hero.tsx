import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";

import heroImg from "@/assets/hero-engine-hall.jpg";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

import { EASE, scrollToId } from "./primitives";

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden bg-navy-deep text-navy-foreground"
    >
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-20">
        <motion.img
          src={heroImg}
          alt=""
          width={1920}
          height={1088}
          fetchPriority="high"
          initial={{ scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
          className="flip-rtl h-full w-full object-cover object-[68%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="absolute inset-0 -z-10 bg-blueprint opacity-30" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-fade-bottom" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-32 sm:px-8 sm:pb-14"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          className="eyebrow flex items-center gap-3 text-navy-muted"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-spark opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-spark" />
          </span>
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="font-display-wide mt-6 text-[clamp(1.85rem,7.9vw,6.8rem)] font-extrabold uppercase leading-[0.94] rtl:leading-[1.2]">
          {[t.hero.line1, t.hero.line2].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className={i === 1 ? "text-electric block" : "block"}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.45 + i * 0.14 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-navy-muted sm:text-lg"
        >
          {t.hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <Button variant="electric" size="xl" onClick={() => scrollToId("services")}>
            {t.hero.ctaPrimary}
            <ArrowRight className="flip-rtl" />
          </Button>
          <Button variant="outline-light" size="xl" onClick={() => scrollToId("contact")}>
            {t.hero.ctaSecondary}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="mt-14 flex flex-col gap-5 border-t border-navy-line pt-6 md:flex-row md:items-center md:justify-between"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-muted">
            {t.hero.tags.map((tag) => (
              <li key={tag} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-primary-glow" />
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-end gap-6 text-sm text-navy-muted">
            <button
              type="button"
              onClick={() => scrollToId("about")}
              className="eyebrow hidden items-center gap-2 text-navy-foreground md:flex"
            >
              {t.hero.scroll}
              <span className="relative flex h-8 w-5 justify-center rounded-full border border-navy-line">
                <ArrowDown className="mt-1 size-3 animate-scan" aria-hidden />
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
