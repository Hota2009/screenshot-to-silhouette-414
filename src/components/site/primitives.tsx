import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import kwMark from "@/assets/brand/kw-mark.png";
import kwMarkLight from "@/assets/brand/kw-mark-light.png";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

export function Reveal({ delay = 0, y = 28, className, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({
  index,
  children,
  tone = "light",
}: {
  index: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "dark" ? "text-navy-muted" : "text-muted-foreground",
      )}
    >
      <span className="text-primary">{index}</span>
      <span className={cn("h-px w-10", tone === "dark" ? "bg-navy-line" : "bg-border")} />
      <span>{children}</span>
    </div>
  );
}

export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-display-wide text-balance text-[clamp(2rem,4.2vw,3.6rem)] font-bold leading-[1.02] rtl:leading-[1.25]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const { t } = useI18n();
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <img
        src={tone === "light" ? kwMarkLight : kwMark}
        alt=""
        width={655}
        height={445}
        className="h-9 w-auto"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display-wide text-[0.95rem] font-extrabold uppercase tracking-[0.04em] rtl:text-base rtl:tracking-normal",
            tone === "light" ? "text-navy-foreground" : "text-foreground",
          )}
        >
          {t.brand.name}
        </span>
        <span
          className={cn(
            "mt-1 text-[0.7rem] tracking-[0.18em] uppercase rtl:tracking-normal rtl:text-xs",
            tone === "light" ? "text-navy-muted" : "text-muted-foreground",
          )}
        >
          {t.brand.tagline}
        </span>
      </span>
      <span className="sr-only">{t.brand.legal}</span>
    </span>
  );
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
