"use client";

import { createContext, useContext } from "react";
import type { FallParams } from "@/lib/content";

/**
 * O registro de itens da cena.
 *
 * Nada aqui passa por estado do React. Cada `FallItem` entrega o próprio
 * nó e os próprios parâmetros; o `Fall` guarda os dois num Map e, a cada
 * quadro, escreve transform, opacity e visibility direto no nó. Um
 * `setState` por quadro com uma dúzia de itens na tela seria uma árvore
 * inteira reconciliada 60 vezes por segundo.
 */
export interface FallRegistry {
  register(el: HTMLElement, params: FallParams): () => void;
}

export const FallContext = createContext<FallRegistry | null>(null);

export function useFallRegistry(): FallRegistry | null {
  return useContext(FallContext);
}
