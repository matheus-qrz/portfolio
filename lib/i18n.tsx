"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { content, type Content, type Locale } from "./content";

const STORAGE_KEY = "mo-lang";

interface I18n {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Content;
}

const I18nContext = createContext<I18n>({
  locale: "pt",
  setLocale: () => {},
  t: content.pt,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt");

  /**
   * Preferência salva vence; sem ela, o idioma do navegador decide.
   * Tudo isso só depois da hidratação: o primeiro render continua em `pt`
   * nos dois lados, senão servidor e cliente divergem.
   */
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* localStorage indisponível — cai no navegador */
    }

    if (saved === "en" || saved === "pt") {
      setLocale(saved);
      return;
    }

    const nav = navigator.language ?? "";
    setLocale(nav.toLowerCase().startsWith("pt") ? "pt" : "en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignorado */
    }
  }, [locale]);

  const value = useMemo<I18n>(
    () => ({ locale, setLocale, t: content[locale] }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

/**
 * Renderiza os trechos entre ** ** como <strong>. Mantém o texto do
 * conteúdo legível em `content.ts` sem precisar de HTML solto.
 */
export function emphasize(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>,
  );
}
