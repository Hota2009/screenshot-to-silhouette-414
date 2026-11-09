import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { BRANCHES } from "@/content/site";
import { useI18n } from "@/lib/i18n";

import { Logo, scrollToId } from "./primitives";

const LINKS = ["about", "vision", "values", "services", "clients", "projects", "contact"] as const;

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-navy-muted">{t.hero.body}</p>
          </div>
          <nav className="md:col-span-3" aria-label="Footer">
            <ul className="grid grid-cols-2 gap-3 text-sm md:grid-cols-1">
              {LINKS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => (e.preventDefault(), scrollToId(id))}
                    className="text-navy-muted transition-colors hover:text-navy-foreground"
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-6 text-sm md:col-span-4">
            {BRANCHES.map((b) => (
              <div key={b.id}>
                <p className="eyebrow text-primary-glow">{t.branches[b.id].city}</p>
                <p className="mt-2 font-semibold">{t.branches[b.id].engineer}</p>
                <a href={`tel:${b.tel}`} dir="ltr" className="mt-1 block text-navy-muted hover:text-navy-foreground rtl:text-right">
                  {b.phone}
                </a>
                <a href={`mailto:${b.email}`} dir="ltr" className="block text-navy-muted hover:text-navy-foreground rtl:text-right">
                  {b.email}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-navy-line pt-6 text-xs text-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t.brand.legal}. {t.footer.rights}
          </p>
          <p className="eyebrow">{t.hero.line1} {t.hero.line2}</p>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => scrollToId("top")}
          aria-label={t.footer.backToTop}
          className="bg-electric fixed bottom-6 end-6 z-30 flex size-12 items-center justify-center rounded-full text-primary-foreground shadow-glow transition-transform hover:-translate-y-1"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
