"use client";

import { useEffect, type RefObject } from "react";

/**
 * Revelação por rolagem, sem biblioteca de animação e sem custo por
 * quadro: um `IntersectionObserver` acrescenta uma classe e o resto é
 * transição de CSS.
 *
 * O estado escondido é aplicado pelo próprio efeito, nunca pela folha de
 * estilo servida. Sem JavaScript — ou com movimento reduzido — nada
 * chega a ficar invisível: a seção simplesmente já está lá.
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(
      el.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!targets.length) return;

    for (const target of targets) target.classList.add("reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          /* O escalonamento é por grupo de irmãos: uma lista de quatro
             passos entra em cascata, duas seções distantes não. */
          const siblings = node.parentElement
            ? Array.from(node.parentElement.children)
            : [];
          node.style.transitionDelay = `${Math.min(siblings.indexOf(node), 6) * 70}ms`;
          node.classList.add("reveal-in");
          io.unobserve(node);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    for (const target of targets) io.observe(target);
    return () => io.disconnect();
  }, [root]);
}
