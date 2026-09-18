/**
 * A cor do céu ao longo da queda, e as janelas em que cada camada da
 * atmosfera entra e sai. Tudo o que descreve *quando* algo acontece na
 * descida vive aqui, para o loop e o canvas lerem a mesma fonte.
 */

export interface SkyStop {
  /** Progresso da seção, de 0 a 1. */
  at: number;
  rgb: [number, number, number];
}

/**
 * Do espaço à cidade. Termina exatamente na cor da noite para a seção
 * seguinte não aparecer como um degrau de cor.
 */
export const SKY_STOPS: SkyStop[] = [
  { at: 0.0, rgb: [4, 6, 12] },
  { at: 0.3, rgb: [7, 10, 18] },
  { at: 0.55, rgb: [10, 17, 34] },
  { at: 0.8, rgb: [21, 35, 63] },
  { at: 0.93, rgb: [22, 38, 74] },
  { at: 1.0, rgb: [9, 12, 20] },
];

export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

/** Interpolação linear entre 0 e 1 dentro da janela [a, b]. */
export function ramp(v: number, a: number, b: number): number {
  return b === a ? (v >= b ? 1 : 0) : clamp((v - a) / (b - a), 0, 1);
}

/** Cor do céu no progresso `p`, como string `rgb()`. */
export function skyAt(p: number): string {
  const t = clamp(p, 0, 1);
  let lo = SKY_STOPS[0];
  let hi = SKY_STOPS[SKY_STOPS.length - 1];

  for (let i = 0; i < SKY_STOPS.length - 1; i++) {
    if (t >= SKY_STOPS[i].at && t <= SKY_STOPS[i + 1].at) {
      lo = SKY_STOPS[i];
      hi = SKY_STOPS[i + 1];
      break;
    }
  }

  const k = ramp(t, lo.at, hi.at);
  const c = (i: number) => Math.round(lo.rgb[i] + (hi.rgb[i] - lo.rgb[i]) * k);
  return `rgb(${c(0)}, ${c(1)}, ${c(2)})`;
}

/**
 * Opacidade de cada camada da atmosfera no progresso `p`.
 *
 * As nebulosas pertencem ao espaço e somem até 0,38. As nuvens só
 * existem no meio da descida. A cidade sobe no fim, quando o visitante
 * já está perto do chão.
 */
export function layersAt(p: number) {
  return {
    nebula: 1 - ramp(p, 0, 0.38),
    clouds: ramp(p, 0.3, 0.38) * (1 - ramp(p, 0.74, 0.84)),
    city: ramp(p, 0.78, 1),
  };
}
