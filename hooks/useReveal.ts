"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface RevealStep {
  /** Seletor resolvido dentro do root. */
  selector: string;
  /** Gatilho; por padrão o próprio elemento. */
  trigger?: string;
  start?: string;
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
}

/**
 * Anima elementos a partir do estado final do HTML (`gsap.from`), de forma
 * que a página continue legível se o JavaScript não rodar.
 */
export function useReveal(
  root: RefObject<HTMLElement | null>,
  steps: RevealStep[],
) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      for (const step of steps) {
        const targets = gsap.utils.toArray<HTMLElement>(
          step.selector,
          root.current,
        );
        if (!targets.length) continue;

        gsap.from(targets, {
          scrollTrigger: {
            trigger: step.trigger ?? targets[0],
            start: step.start ?? "top 88%",
            once: true,
          },
          y: step.y ?? 20,
          x: step.x ?? 0,
          opacity: 0,
          duration: step.duration ?? 0.7,
          stagger: step.stagger ?? 0,
          delay: step.delay ?? 0,
          ease: step.ease ?? "expo.out",
        });
      }
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
