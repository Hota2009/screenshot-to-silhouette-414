import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { EASE, Logo, scrollToId } from "./primitives";

const LINKS = ["about", "vision", "values", "services", "clients", "projects", "contact"] as const;

export function Navbar() {
  const { t, toggle } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-expo",
        scrolled || open ? "glass-dark" : "border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" aria-label={t.brand.legal} onClick={(e) => (e.preventDefault(), go("top"))}>
          <Logo tone="light" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => (e.preventDefault(), go(id))}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm text-navy-muted transition-colors hover:text-navy-foreground",
                  active === id && "text-navy-foreground",
                )}
              >
                {t.nav[id]}
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-electric"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={t.meta.switchAria}
            className="flex h-10 items-center gap-2 rounded-md border border-navy-line px-3 text-sm text-navy-foreground transition-colors hover:bg-navy-foreground/10"
          >
            <Languages className="hidden size-4 text-primary-glow sm:block" aria-hidden />
            <span lang={t.meta.dir === "rtl" ? "en" : "ar"}>{t.meta.switchLabel}</span>
          </button>
          <Button variant="electric" className="hidden h-10 px-5 md:inline-flex" onClick={() => go("contact")}>
            {t.nav.cta}
          </Button>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-md border border-navy-line text-navy-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100svh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden bg-navy-deep lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-10 pt-4 sm:px-8">
              {LINKS.map((id, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.5, ease: EASE }}
                >
                  <a
                    href={`#${id}`}
                    onClick={(e) => (e.preventDefault(), go(id))}
                    className="flex items-baseline gap-4 border-b border-navy-line py-4 text-navy-foreground"
                  >
                    <span className="eyebrow text-primary-glow">0{i + 1}</span>
                    <span className="font-display-wide text-2xl font-semibold">{t.nav[id]}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
