"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` no cliente, `useEffect` no servidor.
 *
 * A queda precisa escrever os transforms **antes** da pintura: se a
 * primeira pintura da cena viva sair com os itens ainda empilhados no
 * centro, o navegador não só mostra a pilha por um quadro como decide
 * que todos os prints estão na tela e os carrega de uma vez. O React
 * avisa quando `useLayoutEffect` roda no servidor, então a escolha é
 * feita aqui, uma vez.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
