import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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
export function I18nProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Lang | undefined;
}) {
  const [preferred, setPreferred] = useState<Lang>(initialLang ?? "en");
  const lang = initialLang ?? preferred;
  useEffect(() => {
    if (initialLang) return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ar") setPreferred(saved);
      else if (window.navigator.language?.startsWith("ar")) setPreferred("ar");
    } catch {
      /* Storage is optional. */
    }
  }, [initialLang]);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = CONTENT[lang].meta.dir;
  }, [lang]);
  const setLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* URL remains authoritative. */
    }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.location.assign(url.href);
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
