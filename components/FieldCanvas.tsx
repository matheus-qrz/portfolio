"use client";

import { useEffect, useRef } from "react";

interface Mark {
  x: number;
  y: number;
  a: number;
}

const BASE_LEN = 5;
const REACH = 240;

/**
 * Campo de traços que se orientam na direção do cursor. Canvas 2D em vez
 * de SVG porque são centenas de marcas redesenhadas a cada quadro.
 */
export default function FieldCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let marks: Mark[] = [];
    let width = 0;
    let height = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let frame = 0;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = width < 620 ? 34 : 44;
      marks = [];
      for (let y = step / 2; y < height; y += step) {
        for (let x = step / 2; x < width; x += step) {
          marks.push({ x, y, a: Math.random() * Math.PI });
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const mark of marks) {
        const dx = pointerX - mark.x;
        const dy = pointerY - mark.y;
        const dist = Math.hypot(dx, dy);
        const near = Math.max(0, 1 - dist / REACH);

        const toPointer = dist < 0.001 ? mark.a : Math.atan2(dy, dx);
        const drift = mark.a + time * 0.00013 + (mark.x + mark.y) * 0.0016;
        const angle =
          near > 0.01 ? drift + (toPointer - drift) * near : drift;

        const len = BASE_LEN + near * 11;
        const cx = Math.cos(angle) * len;
        const cy = Math.sin(angle) * len;

        ctx.strokeStyle =
          near > 0.06
            ? `rgba(226, 71, 44, ${(0.18 + near * 0.72).toFixed(3)})`
            : "rgba(150, 138, 126, 0.26)";
        ctx.lineWidth = near > 0.4 ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(mark.x - cx / 2, mark.y - cy / 2);
        ctx.lineTo(mark.x + cx / 2, mark.y + cy / 2);
        ctx.stroke();
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const onResize = () => {
      layout();
      draw(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };

    layout();
    draw(0);
    if (!reduce) frame = requestAnimationFrame(loop);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
