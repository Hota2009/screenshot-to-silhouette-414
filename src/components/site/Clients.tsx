import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { CLIENT_SECTORS, type ClientSectorId } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { EASE, Reveal, SectionLabel, SectionTitle } from "./primitives";

function monogram(name: string) {
  const words = name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w) && !["Co.", "Al", "Ltd.", "&"].includes(w));
  return (words[0]?.[0] ?? name[0]) + (words[1]?.[0] ?? "");
}

export function Clients() {
  const { t, lang } = useI18n();
  const c = t.clients;
  const [sector, setSector] = useState<ClientSectorId | "all">("all");

  const list = useMemo(
    () =>
      CLIENT_SECTORS.filter((s) => sector === "all" || s.id === sector).flatMap((s) =>
        s.clients.map((client) => ({ client, sector: s })),
      ),
    [sector],
  );
  const allNames = CLIENT_SECTORS.flatMap((s) => s.clients);
  const total = allNames.length;

  return (
    <section id="clients" className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="bg-blueprint-light absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel index={c.index}>{c.label}</SectionLabel>
            <SectionTitle className="mt-8">{c.title}</SectionTitle>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground">{c.body}</p>
          </Reveal>
        </div>
      </div>

      {/* Name ticker — forced LTR so the loop direction stays seamless in both languages. */}
      <div dir="ltr" className="relative mt-16 overflow-hidden border-y bg-background py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 motion-reduce:animate-none">
          {[...allNames, ...allNames].map((n, i) => (
            <span
              key={i}
              aria-hidden={i >= total}
              className="font-display-wide flex items-center gap-12 whitespace-nowrap text-lg font-semibold text-foreground/70"
            >
              {n[lang]}
              <span className="size-1.5 rotate-45 bg-primary" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div role="tablist" aria-label={c.label} className="mt-12 flex flex-wrap gap-2">
          {[{ id: "all" as const, label: c.all, count: total }, ...CLIENT_SECTORS.map((s) => ({ id: s.id, label: s.name[lang], count: s.clients.length }))].map(
            (tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={sector === tab.id}
                onClick={() => setSector(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-[background-color,color,border-color] duration-300",
                  sector === tab.id
                    ? "border-navy bg-navy text-navy-foreground"
                    : "bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 text-xs tabular-nums",
                    sector === tab.id ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {tab.count}
                </span>
              </button>
            ),
          )}
        </div>

        <motion.ul layout className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map(({ client, sector: s }) => (
              <motion.li
                layout
                key={client.en}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="group flex items-center gap-4 rounded-lg border bg-card p-4 shadow-card transition-[border-color,transform] duration-500 ease-expo hover:-translate-y-0.5 hover:border-primary/40"
              >
                <span className="font-display-wide flex size-12 shrink-0 items-center justify-center rounded-md bg-navy text-sm font-bold uppercase text-navy-foreground transition-colors duration-500 group-hover:bg-primary">
                  {monogram(client.en)}
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold leading-snug">{client[lang]}</span>
                  <span className="mt-1 block truncate text-xs text-muted-foreground">{s.name[lang]}</span>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
