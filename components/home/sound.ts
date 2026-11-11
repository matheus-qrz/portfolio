/**
 * Sons curtos em Web Audio, sem arquivo nenhum. O navegador só libera
 * áudio depois de um gesto do visitante, então nada toca antes do
 * primeiro toque ou tecla.
 */
type Ctor = typeof AudioContext;

let ctx: AudioContext | null = null;
let enabled = true;
let touched = false;
let listening = false;

export function listenForFirstGesture() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  const mark = () => {
    touched = true;
  };
  window.addEventListener("pointerdown", mark, { once: true, capture: true });
  window.addEventListener("keydown", mark, { once: true, capture: true });
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
}

function audio(): AudioContext | null {
  if (!enabled || !touched || typeof window === "undefined") return null;
  try {
    const C: Ctor | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext;
    if (!C) return null;
    ctx = ctx ?? new C();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function bell() {
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  for (const [f, g] of [[740, 0.5], [1110, 0.22], [1860, 0.1], [2590, 0.05]]) {
    const o = a.createOscillator();
    const v = a.createGain();
    o.frequency.value = f;
    v.gain.setValueAtTime(g * 0.3, t);
    v.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    o.connect(v).connect(a.destination);
    o.start(t);
    o.stop(t + 1.7);
  }
}

export function thud(pitch = 90) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  const o = a.createOscillator();
  const v = a.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(pitch * 1.8, t);
  o.frequency.exponentialRampToValueAtTime(pitch * 0.6, t + 0.12);
  v.gain.setValueAtTime(0.3, t);
  v.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  o.connect(v).connect(a.destination);
  o.start(t);
  o.stop(t + 0.18);
}

export function pop() {
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  const o = a.createOscillator();
  const v = a.createGain();
  o.frequency.setValueAtTime(880, t);
  o.frequency.exponentialRampToValueAtTime(1320, t + 0.06);
  v.gain.setValueAtTime(0.07, t);
  v.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
  o.connect(v).connect(a.destination);
  o.start(t);
  o.stop(t + 0.14);
}

/** Reinicia uma animação CSS removendo e recolocando a classe. */
export function replay(el: Element | null, cls: string, ...remove: string[]) {
  if (!el) return;
  el.classList.remove(cls, ...remove);
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export const brl = (v: number) =>
  "R$ " +
  v
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
