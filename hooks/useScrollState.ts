"use client";

import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "@/lib/content";

interface ScrollState {
  active: SectionId;
  pct: number;
}

/** Seção visível e progresso da página, atualizados no scroll. */
export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({ active: "hero", pct: 0 });

  useEffect(() => {
    let queued = false;

    const measure = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;

      let active: SectionId = SECTIONS[0];
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          active = id;
        }
      }

      setState((prev) =>
        prev.active === active && prev.pct === pct ? prev : { active, pct },
      );
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return state;
}
