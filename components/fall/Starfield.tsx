"use client";

import { useEffect, useRef, useState } from "react";
import { useFallRegistry } from "./FallContext";
import { seeded } from "./random";
import { layersAt } from "./sky";
import styles from "./Starfield.module.css";

/**
 * Celular paga metade do orçamento de partículas e um DPR menor. Não é
 * uma degradação visível a olho nu numa tela de 6 polegadas — é a
 * diferença entre a queda rodar a 60 quadros e engasgar.
 */
const DESK = { stars: 380, lights: 340, dpr: 2 };
const MOB = { stars: 160, lights: 160, dpr: 1.5 };

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  /** Profundidade: o quanto a estrela acompanha a descida. */
  depth: number;
  phase: number;
}

interface Building {
  x: number;
  w: number;
  h: number;
}

interface Light {
  b: number;
  x: number;
  y: number;
  a: number;
}

function makeStars(n: number): Star[] {
  const rnd = seeded(0x51f7);
  return Array.from({ length: n }, () => ({
    x: rnd(),
    y: rnd(),
    r: 0.4 + rnd() * rnd() * 1.5,
    a: 0.25 + rnd() * 0.75,
    depth: 0.08 + rnd() * 0.5,
    phase: rnd() * Math.PI * 2,
  }));
}

function makeCity(lights: number): { buildings: Building[]; lights: Light[] } {
  const rnd = seeded(0x2c19);
  const buildings: Building[] = [];
  let x = -0.04;
  while (x < 1.04) {
    const w = 0.026 + rnd() * 0.055;
    buildings.push({ x, w, h: 0.08 + rnd() * rnd() * 0.42 });
    x += w + rnd() * 0.012;
  }

  const out: Light[] = [];
  for (let i = 0; i < lights; i++) {
    const b = Math.floor(rnd() * buildings.length);
    out.push({ b, x: 0.12 + rnd() * 0.76, y: 0.06 + rnd() * 0.86, a: 0.3 + rnd() * 0.7 });
  }
  return { buildings, lights: out };
}

export default function Starfield() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const registry = useFallRegistry();
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = canvas.current;
    if (!el || !registry) return;

    const ctx = el.getContext("2d", { alpha: true });
    if (!ctx) return;

    const mobile = window.innerWidth < 900;
    const budget = mobile ? MOB : DESK;
    const stars = makeStars(budget.stars);
    const city = makeCity(budget.lights);

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = (W: number, H: number, isMobile: boolean) => {
      const next = Math.min(window.devicePixelRatio || 1, isMobile ? MOB.dpr : DESK.dpr);
      if (W === w && H === h && next === dpr) return;
      w = W;
      h = H;
      dpr = next;
      el.width = Math.max(1, Math.round(w * dpr));
      el.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = ({ p, H, W, D, mobile: isMobile }: {
      p: number;
      H: number;
      W: number;
      D: number;
      mobile: boolean;
    }) => {
      resize(W, H, isMobile);
      ctx.clearRect(0, 0, w, h);

      const layer = layersAt(p);
      const time = performance.now() * 0.001;
      /* Quanto a cena já desceu, em telas. É o que dá paralaxe às
         estrelas sem precisar de um segundo progresso. */
      const fallen = (p * D) / Math.max(1, H);

      /* ── estrelas ─────────────────────────────────────────────────── */
      const starFade = 1 - layer.city * 0.55;
      if (starFade > 0.01) {
        for (const s of stars) {
          const y = (((s.y - fallen * s.depth) % 1) + 1) % 1;
          const a =
            s.a * starFade * (0.72 + 0.28 * Math.sin(time * 0.9 + s.phase));
          if (a <= 0.02) continue;
          ctx.fillStyle = `rgba(239,233,221,${a.toFixed(3)})`;
          ctx.fillRect(s.x * w, y * h, s.r, s.r);
        }
      }

      /* ── cidade ───────────────────────────────────────────────────── */
      if (layer.city > 0.001) {
        const band = h * 0.46;
        /* A cidade sobe meia faixa, não uma inteira: subindo o caminho
           todo, o telhado mais alto só apareceria nos últimos 9% da
           queda, e a aterrissagem chegaria sem aviso. */
        const base = h + band * (1 - layer.city) * 0.5;

        /* O brilho do horizonte chega antes dos prédios: é ele que avisa
           que tem chão lá embaixo. */
        const glow = ctx.createLinearGradient(0, h - band, 0, h);
        glow.addColorStop(0, "rgba(240,112,63,0)");
        glow.addColorStop(1, `rgba(240,112,63,${(0.16 * layer.city).toFixed(3)})`);
        ctx.fillStyle = glow;
        ctx.fillRect(0, h - band, w, band);

        ctx.fillStyle = `rgba(4,6,12,${(0.55 + 0.45 * layer.city).toFixed(3)})`;
        for (const b of city.buildings) {
          const bh = b.h * band;
          ctx.fillRect(b.x * w, base - bh, b.w * w + 1, bh + band);
        }

        for (const l of city.lights) {
          const b = city.buildings[l.b];
          if (!b) continue;
          const bh = b.h * band;
          const a = l.a * layer.city;
          ctx.fillStyle = `rgba(240,112,63,${(a * 0.85).toFixed(3)})`;
          ctx.fillRect(
            (b.x + l.x * b.w) * w,
            base - bh + l.y * bh,
            1.6,
            1.6,
          );
        }
      }
    };

    const stop = registry.registerLayer(draw);
    const raf = requestAnimationFrame(() => setOn(true));

    return () => {
      cancelAnimationFrame(raf);
      stop();
    };
  }, [registry]);

  return (
    <canvas
      ref={canvas}
      className={`${styles.canvas} ${on ? styles.on : ""}`}
      aria-hidden="true"
    />
  );
}
