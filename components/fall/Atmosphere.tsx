"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFallRegistry, type FallFrame } from "./FallContext";
import { seeded } from "./random";
import { layersAt } from "./sky";
import styles from "./Atmosphere.module.css";

interface Cloud {
  /** Momento em que passa pelo centro e velocidade relativa. */
  t: number;
  s: number;
  x: number;
  w: number;
  h: number;
  a: number;
  blur: number;
  front: boolean;
}

const NEBULAE = [
  { x: 18, y: 22, size: 46, color: "rgba(66,52,120,.46)" },
  { x: 76, y: 38, size: 38, color: "rgba(24,64,118,.4)" },
  { x: 44, y: 74, size: 52, color: "rgba(104,48,74,.3)" },
];

/**
 * Doze nuvens no desktop, sete no celular — e, no celular, nenhuma na
 * frente do conteúdo.
 */
function makeClouds(mobile: boolean): Cloud[] {
  const rnd = seeded(0x7a31);
  const n = mobile ? 7 : 12;
  return Array.from({ length: n }, (_, i) => {
    const front = !mobile && i % 4 === 3;
    return {
      t: 0.32 + (i / n) * 0.44 + rnd() * 0.03,
      s: front ? 1.5 + rnd() * 0.5 : 0.55 + rnd() * 0.6,
      x: (rnd() - 0.5) * (mobile ? 70 : 108),
      w: (front ? 62 : 34) + rnd() * (front ? 40 : 30),
      h: (front ? 22 : 12) + rnd() * 10,
      a: front ? 0.5 + rnd() * 0.25 : 0.35 + rnd() * 0.4,
      blur: front ? 34 : 14 + rnd() * 12,
      front,
    };
  });
}

export default function Atmosphere() {
  const registry = useFallRegistry();
  const back = useRef<HTMLDivElement>(null);
  const front = useRef<HTMLDivElement>(null);
  const moon = useRef<HTMLDivElement>(null);
  const nebulae = useRef<(HTMLDivElement | null)[]>([]);
  const clouds = useRef<(HTMLDivElement | null)[]>([]);
  const [on, setOn] = useState(false);

  const mobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 900,
    [],
  );
  const shapes = useMemo(() => makeClouds(mobile), [mobile]);

  useEffect(() => {
    if (!registry) return;

    const draw = ({ p, H, W, D, mobile: isMobile }: FallFrame) => {
      const layer = layersAt(p);
      const screens = D / Math.max(1, H);

      /* ── nebulosas: pertencem ao espaço e somem até P = 0,38 ─────── */
      for (let i = 0; i < nebulae.current.length; i++) {
        const el = nebulae.current[i];
        if (!el) continue;
        el.style.opacity = layer.nebula.toFixed(3);
        if (layer.nebula < 0.004) continue;
        el.style.transform = `translate3d(0, ${(p * H * 0.5).toFixed(1)}px, 0)`;
      }

      /* ── lua: passa devagar, porque está longe ────────────────────── */
      if (moon.current) {
        const dv = (0.33 - p) * screens;
        const dy = dv * H * 0.5;
        const visible = Math.abs(dy) < 1.7 * H;
        moon.current.style.visibility = visible ? "" : "hidden";
        if (visible) {
          const bx = ((isMobile ? 18 : 26) * W) / 100;
          moon.current.style.transform = `translate3d(${bx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
          moon.current.style.opacity = (
            1 - Math.min(1, Math.max(0, (Math.abs(dy) - 0.5 * H) / (0.7 * H)))
          ).toFixed(3);
        }
      }

      /* ── nuvens: só existem no miolo da descida ───────────────────── */
      const cloudFade = layer.clouds;
      for (let i = 0; i < shapes.length; i++) {
        const el = clouds.current[i];
        const c = shapes[i];
        if (!el) continue;
        if (cloudFade < 0.004) {
          el.style.visibility = "hidden";
          continue;
        }
        const dv = (c.t - p) * screens;
        const dy = dv * H * c.s;
        if (Math.abs(dy) > 1.6 * H) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "";
        el.style.transform = `translate3d(${((c.x * W) / 100).toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
        el.style.opacity = (c.a * cloudFade).toFixed(3);
      }
    };

    const stop = registry.registerLayer(draw);
    const raf = requestAnimationFrame(() => setOn(true));
    return () => {
      cancelAnimationFrame(raf);
      stop();
    };
  }, [registry, shapes]);

  const cloudNode = (c: Cloud, i: number) => (
    <div
      key={i}
      ref={(el) => {
        clouds.current[i] = el;
      }}
      className={styles.cloud}
      style={{
        width: `${c.w}vw`,
        height: `${c.h}vh`,
        marginLeft: `${-c.w / 2}vw`,
        marginTop: `${-c.h / 2}vh`,
        filter: `blur(${c.blur}px)`,
      }}
    />
  );

  return (
    <>
      <div
        ref={back}
        className={`${styles.layer} ${styles.back} ${on ? styles.on : ""}`}
        aria-hidden="true"
      >
        {NEBULAE.map((n, i) => (
          <div
            key={i}
            ref={(el) => {
              nebulae.current[i] = el;
            }}
            className={styles.nebula}
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              width: `${n.size}vw`,
              height: `${n.size}vw`,
              marginLeft: `${-n.size / 2}vw`,
              marginTop: `${-n.size / 2}vw`,
              background: `radial-gradient(circle, ${n.color}, rgba(0,0,0,0) 70%)`,
            }}
          />
        ))}
        <div ref={moon} className={styles.moon} />
        {shapes.map((c, i) => (c.front ? null : cloudNode(c, i)))}
      </div>

      <div
        ref={front}
        className={`${styles.layer} ${styles.front} ${on ? styles.on : ""}`}
        aria-hidden="true"
      >
        {shapes.map((c, i) => (c.front ? cloudNode(c, i) : null))}
      </div>
    </>
  );
}
