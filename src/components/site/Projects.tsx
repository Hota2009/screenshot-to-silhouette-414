import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { WorkCategory } from "@/content/site";
import { WORK_CATEGORIES, WORK_PHOTOS } from "@/content/work";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { EASE, Reveal, SectionLabel, SectionTitle } from "./primitives";

export function Projects() {
  const { t, dir } = useI18n();
  const p = t.projects;
  const [cat, setCat] = useState<WorkCategory | "all">("all");
  const [index, setIndex] = useState<number | null>(null);

  const photos = useMemo(
    () => (cat === "all" ? WORK_PHOTOS : WORK_PHOTOS.filter((x) => x.category === cat)),
    [cat],
  );

  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
      const back = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
      if (e.key === forward) step(1);
      if (e.key === back) step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step, dir]);

  const current = index !== null ? photos[index] : null;
  const Prev = dir === "rtl" ? ChevronRight : ChevronLeft;
  const Next = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <section id="projects" className="surface-navy relative isolate overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel index={p.index} tone="dark">
              {p.label}
            </SectionLabel>
            <SectionTitle className="mt-8">{p.title}</SectionTitle>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-navy-muted">{p.body}</p>
          </Reveal>
        </div>

        <div role="tablist" aria-label={p.label} className="mt-12 flex flex-wrap gap-2">
          {(["all", ...WORK_CATEGORIES] as const).map((c) => {
            const count = c === "all" ? WORK_PHOTOS.length : WORK_PHOTOS.filter((x) => x.category === c).length;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-[background-color,color,border-color] duration-300",
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-navy-line text-navy-muted hover:border-navy-foreground/40 hover:text-navy-foreground",
                )}
              >
                {c === "all" ? p.all : t.workCategories[c]}
                <span className="text-xs tabular-nums opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="mt-10 grid grid-flow-dense grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {photos.map((photo, i) => (
              <motion.li
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={cn(i % 9 === 0 && "col-span-2 row-span-2")}
              >
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${p.open}: ${t.workCategories[photo.category]}`}
                  className="group relative block aspect-square w-full overflow-hidden rounded-md bg-navy-raised"
                >
                  <img
                    src={photo.src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-[transform,filter] duration-[1.2s] ease-expo group-hover:scale-110 group-hover:brightness-110"
                  />
                  <span className="bg-fade-bottom absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-between text-start text-xs text-navy-foreground opacity-0 transition-[opacity,transform] duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {t.workCategories[photo.category]}
                    <Expand className="size-4" aria-hidden />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <DialogPrimitive.Root open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-navy-deep/95 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            dir={dir}
            className="fixed inset-0 z-50 flex flex-col text-navy-foreground outline-none"
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <DialogPrimitive.Title className="eyebrow text-navy-muted">
                {current ? t.workCategories[current.category] : ""}
                <span className="mx-3 text-navy-line">/</span>
                <span className="tabular-nums text-navy-foreground">
                  {index !== null ? index + 1 : 0} {p.of} {photos.length}
                </span>
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">{p.body}</DialogPrimitive.Description>
              <DialogPrimitive.Close
                aria-label={p.close}
                className="flex size-11 items-center justify-center rounded-full border border-navy-line transition-colors hover:bg-navy-raised"
              >
                <X className="size-5" />
              </DialogPrimitive.Close>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-20">
              <AnimatePresence mode="wait">
                {current && (
                  <motion.img
                    key={current.id}
                    src={current.src}
                    alt={t.workCategories[current.category]}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="max-h-[78svh] w-auto max-w-full rounded-md object-contain shadow-elegant"
                  />
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={p.prev}
                className="glass-dark absolute start-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border transition-colors hover:bg-navy-raised sm:start-6"
              >
                <Prev className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={p.next}
                className="glass-dark absolute end-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border transition-colors hover:bg-navy-raised sm:end-6"
              >
                <Next className="size-5" />
              </button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}
