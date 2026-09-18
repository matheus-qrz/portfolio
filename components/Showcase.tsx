"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SHOWCASE, sectionIndex } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { scrollToY } from "./SmoothScroll";
import Wordmark from "./Wordmark";
import styles from "./Showcase.module.css";

export default function Showcase() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  useReveal(root, [{ selector: ".secHead > *", start: "top 84%", y: 22, stagger: 0.08 }]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    /**
     * Só no desktop e só com movimento liberado a seção prende. Fora
     * disso os cinco produtos ficam empilhados e legíveis — é esse o
     * estado que sai do servidor, e o movimento é o que o encena.
     */
    mm.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        const wrapEl = wrap.current;
        const stageEl = stage.current;
        if (!wrapEl || !stageEl) return;

        /* A classe entra antes da timeline: é ela que empilha os slides
           na mesma célula, e o pin precisa medir a altura já final. */
        wrapEl.classList.add(styles.pinned);

        const slides = gsap.utils.toArray<HTMLElement>(
          `.${styles.slide}`,
          stageEl,
        );
        const n = slides.length;

        /* O corte é de cada parte, nunca do slide inteiro: o plano sangra
           para fora da coluna, e um `clip-path` no slide o cortaria de
           volta na borda da shell. */
        const partsOf = (el: HTMLElement) =>
          el.querySelectorAll<HTMLElement>(
            `.${styles.copy}, .${styles.plane}`,
          );

        const enter = { xPercent: 4, clipPath: "inset(0% 100% 0% 0%)" };
        const on = { xPercent: 0, clipPath: "inset(0% 0% 0% 0%)" };
        const exit = { xPercent: -4, clipPath: "inset(0% 0% 0% 100%)" };

        gsap.set(slides, { autoAlpha: 0 });
        for (const el of slides) gsap.set(partsOf(el), enter);
        gsap.set(slides[0], { autoAlpha: 1 });
        gsap.set(partsOf(slides[0]), on);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapEl,
            start: "top top",
            end: () => `+=${(n - 1) * 88}%`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(n - 1, Math.floor(self.progress * n));
              setActive((prev) => (prev === i ? prev : i));
              if (rail.current) {
                gsap.set(rail.current, { scaleX: self.progress });
              }
            },
          },
        });

        trigger.current = tl.scrollTrigger ?? null;

        /* Um produto não some por fade: ele é cortado fora enquanto o
           seguinte é cortado para dentro, com 180 ms de sobreposição. */
        for (let i = 1; i < n; i += 1) {
          const at = i - 1;
          tl.to(
            partsOf(slides[i - 1]),
            { ...exit, duration: 0.42, ease: "power2.in", stagger: 0.06 },
            at + 0.55,
          )
            .to(slides[i - 1], { autoAlpha: 0, duration: 0.18 }, at + 0.85)
            .to(slides[i], { autoAlpha: 1, duration: 0.18 }, at + 0.62)
            .to(
              partsOf(slides[i]),
              { ...on, duration: 0.48, ease: "power2.out", stagger: 0.08 },
              at + 0.68,
            );
        }
        tl.to({}, { duration: 0.45 });

        return () => {
          trigger.current = null;
          wrapEl.classList.remove(styles.pinned);
          gsap.set(slides, { clearProps: "all" });
          for (const el of slides) gsap.set(partsOf(el), { clearProps: "all" });
          if (rail.current) gsap.set(rail.current, { clearProps: "all" });
          setActive(0);
        };
      },
    );

    return () => mm.revert();
  }, []);

  /**
   * Um nome na trilha leva até o trecho de rolagem daquele produto. Com a
   * seção presa isso é uma posição dentro do curso; sem ela, é o slide
   * empilhado logo abaixo.
   */
  function goTo(i: number) {
    setActive(i);
    const trig = trigger.current;
    if (trig) {
      const span = trig.end - trig.start;
      scrollToY(trig.start + (span * (i + 0.28)) / SHOWCASE.length);
      return;
    }
    document
      .getElementById(`slide-${SHOWCASE[i].id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /** As setas ficam presas à trilha: escutar na janela roubaria a página. */
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const delta =
      event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + SHOWCASE.length) % SHOWCASE.length;
    goTo(next);
    tabs.current[next]?.focus();
  }

  const total = String(SHOWCASE.length).padStart(2, "0");

  return (
    <section id="showcase" className={styles.sec} ref={root}>
      <div className="shell">
        <div className="secHead">
          <div className="top">
            <p className="eyebrow">{t.showcase.eyebrow}</p>
            <span className="idx">{sectionIndex("showcase")}</span>
          </div>
          <h2 className="h2">{t.showcase.h}</h2>
          <p className="lede">{t.showcase.lede}</p>
        </div>
      </div>

      <div className={styles.wrap} ref={wrap}>
        {/* Trilho de progresso do curso preso: a única coisa que diz
            quanto falta, sem virar barra de rolagem falsa. */}
        <div className={styles.progress} aria-hidden="true">
          <div className={styles.progressFill} ref={rail} />
        </div>

        <div className={styles.stage} ref={stage}>
          {SHOWCASE.map((p) => {
            const copy = t.work.items[p.id];
            return (
              <article
                key={p.id}
                id={`slide-${p.id}`}
                className={styles.slide}
                aria-label={copy.name}
              >
                <div className={styles.copy}>
                  <p className={styles.sector}>{t.showcase.sectors[p.id]}</p>
                  <h3 className={styles.name}>
                    <Wordmark id={p.id} name={copy.name} accent={styles.tf} />
                  </h3>
                  <p className={styles.blurb}>{t.showcase.blurbs[p.id]}</p>

                  <div className="chips">
                    {p.tags.map((tag) => (
                      <span className="chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.links}>
                    {p.url && (
                      <a
                        className={styles.link}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.showcase.visit} ↗
                      </a>
                    )}
                    {p.repo && (
                      <a
                        className={styles.link}
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.showcase.repo} ↗
                      </a>
                    )}
                    <span className={styles.state}>
                      <i className={p.live ? styles.live : undefined}>
                        {copy.state}
                      </i>
                    </span>
                  </div>
                </div>

                {/* O plano sangra para fora da tela pela direita: é o que
                    tira o produto de dentro de um card. */}
                <div className={styles.plane}>
                  {p.shot ? (
                    <Image
                      src={`/shots/${p.id}.png`}
                      alt={`${copy.name} — ${copy.host}`}
                      fill
                      sizes="(max-width: 900px) 100vw, 46vw"
                      className={styles.img}
                    />
                  ) : (
                    <span className={styles.pending}>{t.showcase.noShot}</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.trackWrap}>
          <div
            className={styles.track}
            role="tablist"
            aria-label={t.showcase.pick}
            onKeyDown={onKeyDown}
          >
            <span
              className={styles.marker}
              aria-hidden="true"
              style={{ transform: `translateX(${active * 100}%)` }}
            />
            {SHOWCASE.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={i === active}
                aria-controls={`slide-${p.id}`}
                tabIndex={i === active ? 0 : -1}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                className={`${styles.tab} ${i === active ? styles.tabOn : ""}`}
                onClick={() => goTo(i)}
              >
                <Wordmark id={p.id} name={t.work.items[p.id].name} />
              </button>
            ))}
          </div>

          <p className={styles.foot}>
            <span>{t.showcase.counter}</span>
            <b className="num">{String(active + 1).padStart(2, "0")}</b>
            <span className="num"> / {total}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
