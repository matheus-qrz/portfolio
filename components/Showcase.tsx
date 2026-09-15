"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { SHOWCASE, sectionIndex } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import Wordmark from "./Wordmark";
import styles from "./Showcase.module.css";

export default function Showcase() {
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  useReveal(root, [
    { selector: ".secHead > *", start: "top 84%", y: 22, stagger: 0.08 },
    { selector: `.${styles.carousel}`, start: "top 88%", y: 20, duration: 0.8 },
  ]);

  /**
   * Sem avanço automático: cada slide é um parágrafo inteiro, e ser
   * arrancado no meio da leitura é pior do que não ter carrossel.
   */
  function move(delta: number, refocus: boolean) {
    const next = (active + delta + SHOWCASE.length) % SHOWCASE.length;
    setActive(next);
    if (refocus) tabs.current[next]?.focus();
  }

  /**
   * As setas do teclado ficam presas ao carrossel. Escutar na janela
   * roubaria a rolagem da página inteira.
   */
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const delta =
      event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0;
    if (!delta) return;
    event.preventDefault();
    const fromTab =
      (event.target as HTMLElement).getAttribute("role") === "tab";
    move(delta, fromTab);
  }

  const total = String(SHOWCASE.length).padStart(2, "0");

  return (
    <section id="showcase" className="sec" ref={root}>
      <div className="shell">
        <div className="secHead">
          <div className="top">
            <p className="eyebrow">{t.showcase.eyebrow}</p>
            <span className="idx">{sectionIndex("showcase")}</span>
          </div>
          <h2 className="h2">{t.showcase.h}</h2>
          <p className="lede">{t.showcase.lede}</p>
        </div>

        <div
          className={styles.carousel}
          onKeyDown={onKeyDown}
          aria-roledescription="carousel"
          aria-label={t.showcase.eyebrow}
        >
          {/* Todos os slides ficam montados e empilhados na mesma célula
              da grade: a altura passa a ser a do maior e nem a página nem
              os controles pulam ao trocar de produto. */}
          <div className={styles.stage}>
            {SHOWCASE.map((p, i) => {
              const copy = t.work.items[p.id];
              const on = i === active;
              return (
                <article
                  key={p.id}
                  id={`slide-${p.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${p.id}`}
                  className={`${styles.slide} ${on ? styles.on : ""}`}
                  /* Nada de `hidden`: display:none tiraria o slide da
                     célula da grade e a altura voltaria a variar. Ele
                     some por visibilidade e sai do alcance de foco e
                     leitor de tela por `inert`. */
                  inert={!on}
                  aria-hidden={!on}
                >
                  <div className={styles.left}>
                    <p className={styles.sector}>{t.showcase.sectors[p.id]}</p>
                    <h3 className={styles.wordmark}>
                      <Wordmark id={p.id} name={copy.name} accent={styles.tf} />
                    </h3>

                    <div className={styles.shot}>
                      {p.shot ? (
                        <Image
                          src={`/shots/${p.id}.png`}
                          alt={`${copy.name} — ${copy.host}`}
                          fill
                          sizes="(max-width: 900px) 92vw, 46vw"
                          className={styles.img}
                        />
                      ) : (
                        <span className={styles.pending}>
                          {t.showcase.noShot}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.right}>
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
                </article>
              );
            })}
          </div>

          <div className={styles.controls}>
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => move(-1, false)}
                aria-label={t.showcase.prev}
              >
                ←
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => move(1, false)}
                aria-label={t.showcase.next}
              >
                →
              </button>
            </div>

            {/* Navegação por nome, não por pontinho anônimo: quem está
                escolhendo precisa saber para onde vai. */}
            <div
              className={styles.names}
              role="tablist"
              aria-label={t.showcase.pick}
            >
              {SHOWCASE.map((p, i) => {
                const on = i === active;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    id={`tab-${p.id}`}
                    aria-selected={on}
                    aria-controls={`slide-${p.id}`}
                    tabIndex={on ? 0 : -1}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    className={`${styles.name} ${on ? styles.nameOn : ""}`}
                    onClick={() => setActive(i)}
                  >
                    {t.work.items[p.id].name}
                  </button>
                );
              })}
            </div>

            <p className={styles.count}>
              {t.showcase.counter}{" "}
              <b className="num">{String(active + 1).padStart(2, "0")}</b>
              <span className="num"> / {total}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
