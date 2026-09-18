"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { QuoteKind } from "./content";

interface QuoteKindApi {
  kind: QuoteKind;
  setKind: (k: QuoteKind) => void;
}

const QuoteKindContext = createContext<QuoteKindApi>({
  kind: "indefinido",
  setKind: () => {},
});

/**
 * As duas portas do hero e os CTAs das seções sabem que tipo de trabalho
 * o visitante veio procurar. Guardar isso aqui deixa o formulário já
 * marcado quando ele chega lá embaixo, em vez de perguntar de novo o que
 * ele acabou de responder clicando.
 */
export function QuoteKindProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<QuoteKind>("indefinido");
  const value = useMemo(() => ({ kind, setKind }), [kind]);
  return (
    <QuoteKindContext.Provider value={value}>
      {children}
    </QuoteKindContext.Provider>
  );
}

export function useQuoteKind(): QuoteKindApi {
  return useContext(QuoteKindContext);
}

/**
 * Link que pré-seleciona o tipo antes de rolar. A rolagem em si continua
 * sendo do `SmoothScroll`, que trata todo `a[href^="#"]` da página.
 */
export function useKindLink(kind: QuoteKind) {
  const { setKind } = useQuoteKind();
  return useCallback(() => setKind(kind), [setKind, kind]);
}
