"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/**
 * Instância viva do Lenis, guardada no módulo para que qualquer seção
 * possa mandar a página até uma posição sem brigar com o rAF dele.
 */
let current: Lenis | null = null;

/**
 * Âncoras que não são simplesmente "o topo de um elemento".
 *
 * A queda é uma cena sticky e transformada: o alvo de "Trabalho" está
 * dentro dela, e `scrollIntoView` mira onde o elemento *foi desenhado*,
 * não onde a rolagem precisa parar. Quem sabe calcular essa posição —
 * o próprio `Fall` — se registra aqui e devolve o Y correto.
 */
const resolvers = new Map<string, () => number>();

export function registerAnchor(id: string, resolve: () => number): () => void {
  resolvers.set(id, resolve);
  return () => {
    if (resolvers.get(id) === resolve) resolvers.delete(id);
  };
}

/** Folga entre o topo da janela e o alvo, para o header fixo não cobrir. */
const OFFSET = 40;

/**
 * Leva a página até `y`. Com o Lenis de pé, usa o próprio Lenis; sem ele
 * (movimento reduzido, JS parcial), cai no scroll nativo.
 */
export function scrollToY(y: number, duration = 1) {
  const top = Math.max(0, Math.round(y));
  if (current) current.scrollTo(top, { duration });
  else window.scrollTo({ top, behavior: "smooth" });
}

/** Rola até a âncora `id`, respeitando quem registrou posição própria. */
export function scrollToAnchor(id: string) {
  const resolve = resolvers.get(id);
  if (resolve) {
    scrollToY(resolve());
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  scrollToY(el.getBoundingClientRect().top + window.scrollY - OFFSET);
}

/**
 * Liga o Lenis e trata as âncoras internas. Não renderiza nada; existe
 * só pelos efeitos.
 *
 * O tratamento de âncora é instalado sempre, inclusive com movimento
 * reduzido: é ele que sabe consultar o registro acima. O que o modo
 * reduzido desliga é o Lenis, não a navegação.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /**
     * O Lenis chega por import dinâmico: rolagem suave é melhoria, não
     * requisito, e ele não tem o que fazer no caminho da primeira
     * pintura. Até ele chegar, as âncoras já funcionam pelo scroll
     * nativo.
     */
    let frame = 0;
    let alive = true;
    if (!reduced) {
      void import("lenis").then(({ default: Lenis }) => {
        if (!alive) return;
        const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
        current = lenis;
        const raf = (time: number) => {
          lenis.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      });
    }

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      const href = anchor?.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      if (!resolvers.has(id) && !document.getElementById(id)) return;
      event.preventDefault();
      scrollToAnchor(id);
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      alive = false;
      document.removeEventListener("click", onAnchorClick);
      if (frame) cancelAnimationFrame(frame);
      current?.destroy();
      current = null;
    };
  }, []);

  return null;
}
