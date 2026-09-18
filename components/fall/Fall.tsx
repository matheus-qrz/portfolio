"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { animate, stagger, useScroll } from "framer-motion";
import { FALL, FALL_HERO, type FallParams } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useKindLink } from "@/lib/quoteKind";
import { registerAnchor } from "@/components/SmoothScroll";
import { FallContext, type FallLayer, type FallRegistry } from "./FallContext";
import FallItem from "./FallItem";
import { clamp, skyAt } from "./sky";
import styles from "./Fall.module.css";

/**
 * Nem o canvas nem a atmosfera entram no HTML servido e nenhum dos dois
 * é necessário para ler a página: são a cena, não o conteúdo. Por isso
 * chegam depois do `load`, num momento ocioso, e entram por opacidade.
 */
const Atmosphere = dynamic(() => import("./Atmosphere"), { ssr: false });
const Starfield = dynamic(() => import("./Starfield"), { ssr: false });

type IdleHandle = number;

function whenIdle(run: () => void): () => void {
  let idle: IdleHandle | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const schedule = () => {
    const ric = window.requestIdleCallback;
    if (ric) idle = ric(run, { timeout: 2000 });
    else timer = setTimeout(run, 250);
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    window.removeEventListener("load", schedule);
    if (idle !== undefined) window.cancelIdleCallback?.(idle);
    if (timer !== undefined) clearTimeout(timer);
  };
}

interface Entry {
  params: FallParams;
  /** Defasagem do balanço, para dois itens nunca oscilarem juntos. */
  phase: number;
}

export default function Fall() {
  const { t } = useI18n();
  const section = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const items = useRef(new Map<HTMLElement, Entry>());
  const layers = useRef(new Set<FallLayer>());

  /**
   * `live` só liga depois da montagem, e nunca com movimento reduzido.
   * Até lá o HTML servido é a coluna estática — que é também o que fica
   * de pé se o JavaScript não rodar.
   */
  const [live, setLive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  /** Estável por toda a vida do componente: os filhos dependem dele. */
  const registry = useMemo<FallRegistry>(
    () => ({
      register(el, params) {
        items.current.set(el, { params, phase: (params.t * 1437.31) % 6.283 });
        return () => {
          items.current.delete(el);
          el.style.transform = "";
          el.style.opacity = "";
          el.style.visibility = "";
        };
      },
      registerLayer(draw) {
        layers.current.add(draw);
        return () => {
          layers.current.delete(draw);
        };
      },
    }),
    [],
  );

  const [atmosphere, setAtmosphere] = useState(false);

  useEffect(() => {
    setLive(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  /* Com movimento reduzido não há cena para decorar: nem canvas, nem
     atmosfera, nem loop. */
  useEffect(() => {
    if (!live) return;
    return whenIdle(() => setAtmosphere(true));
  }, [live]);

  /* ── entrada do título ───────────────────────────────────────────────
     Três linhas mascaradas subindo de dentro do próprio corte. O título
     é o candidato provável a LCP, então a animação é curta e o texto já
     está no HTML: o que se move é a posição, nunca a existência. */
  useEffect(() => {
    if (!live || !title.current) return;
    const lines = title.current.querySelectorAll<HTMLElement>("[data-line]");
    if (!lines.length) return;

    const controls = animate(
      lines,
      { y: ["105%", "0%"], opacity: [0, 1] },
      {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        delay: stagger(0.08),
      },
    );
    return () => controls.stop();
  }, [live]);

  /* ── o loop ──────────────────────────────────────────────────────────
     Um `requestAnimationFrame` só para a cena inteira. Nenhum `setState`
     por quadro: o que sai daqui são três escritas de estilo por item. */
  useEffect(() => {
    const root = section.current;
    const box = scene.current;
    if (!live || !root || !box) return;

    let H = 1;
    let W = 1;
    let D = 1;
    let mobile = false;

    /** Medir é caro; só em resize, nunca dentro do quadro. */
    const measure = () => {
      H = box.clientHeight || window.innerHeight;
      W = window.innerWidth;
      D = Math.max(1, root.offsetHeight - H);
      mobile = W < 900;
    };

    const render = () => {
      const p = scrollYProgress.get();
      box.style.backgroundColor = skyAt(p);

      for (const draw of layers.current) draw({ p, H, W, D, mobile });

      for (const [el, { params, phase }] of items.current) {
        const dv = ((params.t - p) * D) / H;
        const dy = dv * H * params.s;

        if (Math.abs(dy) > 1.6 * H) {
          if (el.style.visibility !== "hidden") el.style.visibility = "hidden";
          continue;
        }
        if (el.style.visibility) el.style.visibility = "";

        const bx = ((mobile ? params.xm : params.x) * W) / 100;
        const by = ((mobile ? params.ym : params.y) * H) / 100;
        const sway = Math.sin(dv * 1.6 + phase) * params.sway;

        el.style.transform =
          `translate(-50%,-50%) translate3d(${(bx + sway).toFixed(2)}px, ${(by + dy).toFixed(2)}px, 0)` +
          ` rotate(${(params.r + dv * params.rr).toFixed(3)}deg)` +
          ` scale(${params.far ? 0.78 : 1})`;

        let o = params.fade
          ? 1 - clamp((Math.abs(dy) - 0.22 * H) / (0.32 * H), 0, 1)
          : 1;
        if (params.far) o *= 0.82;
        el.style.opacity = o.toFixed(3);
      }
    };

    let frame = 0;
    let running = false;

    const tick = () => {
      render();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };

    measure();
    render();

    /** Fora da tela ou aba em segundo plano, a cena não precisa de quadro. */
    let onScreen = true;
    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        sync();
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(root);

    const ro = new ResizeObserver(() => {
      measure();
      render();
    });
    ro.observe(root);
    ro.observe(box);

    const onResize = () => {
      measure();
      render();
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [live, scrollYProgress]);

  /* ── a âncora "Trabalho" ─────────────────────────────────────────────
     O primeiro projeto está dentro de uma cena sticky e transformada:
     `scrollIntoView` miraria onde o elemento foi desenhado, não onde a
     rolagem precisa parar. A posição certa é `topo + t × D`.

     Com movimento reduzido a cena é uma coluna comum e o elemento está
     onde parece estar — por isso o registro só existe quando `live`. */
  useEffect(() => {
    if (!live) return;
    const first = FALL[0]?.text.t ?? 0;

    return registerAnchor("work", () => {
      const root = section.current;
      const box = scene.current;
      if (!root) return 0;
      const H = box?.clientHeight || window.innerHeight;
      const D = Math.max(1, root.offsetHeight - H);
      return root.getBoundingClientRect().top + window.scrollY + first * D;
    });
  }, [live]);

  const pickSite = useKindLink("site");
  const pickSoftware = useKindLink("sistema");

  return (
    <FallContext.Provider value={registry}>
      <section
        id="hero"
        ref={section}
        className={styles.fall}
        data-fall={live ? "live" : undefined}
      >
        <div className={styles.scene} ref={scene}>
          {atmosphere && (
            <>
              <Starfield />
              <Atmosphere />
            </>
          )}

          <div className={styles.stack}>
            <FallItem params={FALL_HERO} className={`${styles.item} ${styles.hero}`}>
              <h1 className="d1" ref={title}>
                {t.hero.lines.map((line) => (
                  <span className={styles.line} key={line}>
                    <span data-line>{line}</span>
                  </span>
                ))}
              </h1>

              <p className={styles.sub}>{t.hero.sub}</p>

              <div className={styles.doors}>
                <a
                  className={`${styles.door} ${styles.doorSite}`}
                  href="#sites"
                  onClick={pickSite}
                >
                  <span className={styles.doorLabel}>
                    {t.hero.doors.site.label}
                  </span>
                  <span className={styles.doorHint}>
                    {t.hero.doors.site.hint}
                  </span>
                </a>
                <a
                  className={styles.door}
                  href="#software"
                  onClick={pickSoftware}
                >
                  <span className={styles.doorLabel}>
                    {t.hero.doors.software.label}
                  </span>
                  <span className={styles.doorHint}>
                    {t.hero.doors.software.hint}
                  </span>
                </a>
              </div>

              <p className={styles.scroll}>{t.hero.scroll}</p>
            </FallItem>

            {FALL.map((project, i) => {
              const copy = t.fall.projects[project.id];
              if (!copy) return null;

              return (
                <Fragment key={project.id}>
                  <FallItem
                    id={i === 0 ? "work" : undefined}
                    params={project.text}
                    className={`${styles.item} ${styles.card}`}
                  >
                    <p className={styles.cardKind}>{copy.kind}</p>
                    <h2 className={styles.cardName}>{copy.name}</h2>
                    <p className={styles.cardLine}>{copy.line}</p>
                    <p className={styles.cardStack}>{copy.stack}</p>
                    {project.url && (
                      <a
                        className={styles.cardVisit}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.fall.visit} ↗
                      </a>
                    )}
                  </FallItem>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </FallContext.Provider>
  );
}
