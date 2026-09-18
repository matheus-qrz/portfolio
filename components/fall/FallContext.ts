"use client";

import { createContext, useContext } from "react";
import type { FallParams } from "@/lib/content";

/** O que o loop conhece da cena em cada quadro. */
export interface FallFrame {
  /** Progresso da seção, de 0 a 1. */
  p: number;
  /** Altura e largura da cena, em px. */
  H: number;
  W: number;
  /** Rolagem útil da seção: altura total menos uma tela. */
  D: number;
  mobile: boolean;
}

/** Camada que se desenha sozinha a partir do quadro: atmosfera, canvas. */
export type FallLayer = (frame: FallFrame) => void;

/**
 * O registro da cena.
 *
 * Nada aqui passa por estado do React. Cada `FallItem` entrega o próprio
 * nó e os próprios parâmetros; o `Fall` guarda os dois num Map e, a cada
 * quadro, escreve transform, opacity e visibility direto no nó. Um
 * `setState` por quadro com uma dúzia de itens na tela seria uma árvore
 * inteira reconciliada 60 vezes por segundo.
 *
 * A atmosfera e o canvas entram pelo mesmo caminho, por `registerLayer`:
 * um `requestAnimationFrame` para a página inteira, e não um por efeito.
 * Pausar a cena pausa tudo de uma vez.
 */
export interface FallRegistry {
  register(el: HTMLElement, params: FallParams): () => void;
  registerLayer(draw: FallLayer): () => void;
}

export const FallContext = createContext<FallRegistry | null>(null);

export function useFallRegistry(): FallRegistry | null {
  return useContext(FallContext);
}
