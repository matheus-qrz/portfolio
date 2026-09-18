"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Instância viva do Lenis, guardada no módulo para que qualquer seção
 * possa mandar a página até uma posição sem brigar com o rAF dele.
 */
let current: Lenis | null = null;

/**
 * Leva a página até `y`. Com o Lenis de pé, usa o próprio Lenis; sem ele
 * (movimento reduzido, JS parcial), cai no scroll nativo.
 */
export function scrollToY(y: number, duration = 1) {
  if (current) current.scrollTo(y, { duration });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/**
 * Liga o Lenis ao ScrollTrigger e trata âncoras internas.
 * Não renderiza nada; existe só pelos efeitos.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href")!);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -70 });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      current = null;
    };
  }, []);

  return null;
}
