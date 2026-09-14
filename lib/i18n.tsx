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

  // Lê a preferência salva só depois da hidratação, para servidor e cliente
  // renderizarem o mesmo HTML no primeiro passo.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "pt") setLocale(saved);
    } catch {
      /* localStorage indisponível — segue em pt */
    }
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
