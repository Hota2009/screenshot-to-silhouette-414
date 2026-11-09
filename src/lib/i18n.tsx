import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { CONTENT, type Content, type Lang } from "@/content/site";

const STORAGE_KEY = "ee-lang";

type I18nValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Content;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore the visitor's choice after hydration (SSR always renders English first).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ar") {
      setLangState(saved);
    } else if (window.navigator.language?.toLowerCase().startsWith("ar")) {
      setLangState("ar");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = CONTENT[lang].meta.dir;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir: CONTENT[lang].meta.dir,
      t: CONTENT[lang],
      setLang,
      toggle: () => setLang(lang === "en" ? "ar" : "en"),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
