"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "%#@$&!*0123456789/\\<>+=~";

/**
 * Hiperquadro: a palavra troca de glifo algumas vezes antes de assentar.
 * Sem interpolação — cada quadro é uma troca seca, como um decodificador.
 *
 * O texto real é o que sai do servidor e o que fica se o JavaScript não
 * rodar: a troca só acontece depois da hidratação e sempre termina no
 * texto certo.
 */
export default function Scramble({
  text,
  frames = 4,
  step = 110,
  delay = 0,
  className,
}: {
  text: string;
  frames?: number;
  step?: number;
  delay?: number;
  className?: string;
}) {
  const [shown, setShown] = useState(text);
  const timer = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const noise = () =>
      Array.from(text, (char) =>
        char === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0],
      ).join("");

    const tick = () => {
      if (frame >= frames) {
        setShown(text);
        return;
      }
      frame += 1;
      setShown(noise());
      timer.current = window.setTimeout(tick, step);
    };

    timer.current = window.setTimeout(tick, delay);
    return () => {
      window.clearTimeout(timer.current);
      setShown(text);
    };
  }, [text, frames, step, delay]);

  /* `inline-block` para o baseline não dançar entre os quadros. */
  return (
    <span className={className} style={{ display: "inline-block" }}>
      {shown}
    </span>
  );
}
