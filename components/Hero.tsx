"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SHOWCASE } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import Scramble from "./Scramble";
import Wordmark from "./Wordmark";
import styles from "./Hero.module.css";

/** Quebra "texto **quente** resto" nas três partes, sem HTML solto. */
function splitKicker(kicker: string): [string, string, string] {
  const match = kicker.match(/^(.*?)\*\*(.+?)\*\*(.*)$/);
  return match
    ? [match[1], match[2], match[3]]
    : [kicker, "", ""];
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const flare = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  const [before, hot, after] = splitKicker(t.hero.kicker);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ── entrada ─────────────────────────────────────────────────
         Tudo anima a partir do estado final: sem JS a página já está
         montada e legível, e o movimento só a encena. */
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(`.${styles.meta} li`, {
          y: 16,
          opacity: 0,
          duration: 0.7,
          stagger: 0.11,
        })
        .from(
          `.${styles.li}`,
          { yPercent: 112, duration: 1.1, stagger: 0.12 },
          0.2,
        )
        .from(
          [`.${styles.sub}`, `.${styles.ctas}`],
          { y: 16, opacity: 0, duration: 0.8, stagger: 0.11 },
          0.85,
        )
        .from(
          `.${styles.sectorsLabel}`,
          { y: 16, opacity: 0, duration: 0.7 },
          0.6,
        )
        .from(
          `.${styles.row}`,
          { y: 16, opacity: 0, duration: 0.8, stagger: 0.11 },
          0.74,
        )
        .from(`.${styles.playhead}`, { opacity: 0, duration: 0.6 }, 2.6);

      /* ── ambiente: a onda vermelha atravessa a matriz sem parar ── */
      if (flare.current) {
        gsap.to(flare.current, {
          keyframes: [
            { x: 560, y: -180, duration: 7 },
            { x: 1080, y: 190, duration: 7 },
            { x: 1560, y: -120, duration: 7 },
          ],
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      /* ── marquise acoplada à rolagem ─────────────────────────────
         Ela nunca para; rolar só acelera. Voltar ao repouso é o que
         faz a faixa parecer presa à página em vez de decorativa. */
      if (track.current) {
        const loop = gsap.to(track.current, {
          xPercent: -50,
          duration: 26,
          ease: "none",
          repeat: -1,
        });

        ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = Math.min(Math.abs(self.getVelocity()) / 900, 2.4);
            gsap.to(loop, {
              timeScale: 1 + boost,
              duration: 0.4,
              overwrite: true,
            });
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={root}>
      {/* A matriz é o fundo: pontos fixos, e uma onda vermelha que passa
          por cima acendendo a região em que está. Duas pinturas, nenhuma
          delas ligada ao layout. */}
      <div className={styles.matrix} aria-hidden="true" />
      <div className={styles.flare} aria-hidden="true" ref={flare} />
      <div className={styles.sweep} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <ul className={styles.meta}>
          {t.hero.meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {/* O título ocupa a largura inteira: é a estrutura da tela, não
            uma coluna. Cada linha mora dentro do próprio corte e sobe de
            dentro dele em vez de aparecer por fade. */}
        <h1 className={styles.headline}>
          {t.hero.lines.map((line) => (
            <span className={styles.ln} key={line}>
              <span className={styles.li}>{line}</span>
            </span>
          ))}
        </h1>

        <div className={styles.top}>
          <div>
            <p className={styles.kicker}>
              <span className={styles.ln}>
                <span className={styles.li}>
                  {before}
                  {hot && (
                    <Scramble
                      text={hot}
                      delay={1500}
                      className={styles.hot}
                    />
                  )}
                  {after}
                </span>
              </span>
            </p>

            <p className={styles.sub}>{t.hero.sub}</p>

            <div className={styles.ctas}>
              <a href="#contact" className={`${styles.btn} ${styles.primary}`}>
                {t.hero.ctaTalk}
                <svg width="13" height="9" viewBox="0 0 13 9" aria-hidden="true">
                  <path
                    d="M1 4.5h10M8 1.5l3 3-3 3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#showcase"
                className={`${styles.btn} ${styles.secondary}`}
              >
                {t.hero.ctaWork}
                <svg width="9" height="13" viewBox="0 0 9 13" aria-hidden="true">
                  <path
                    d="M4.5 1v10M1.5 8l3 3 3-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Os setores deixaram de ser uma caixa: são linhas de régua, e
              o playhead vermelho as percorre uma a uma, em passos. */}
          <div className={styles.sectors}>
            <p className={styles.sectorsLabel}>{t.hero.domainsLabel}</p>
            <div className={styles.rows}>
              <div className={styles.playhead} aria-hidden="true" />
              <ul className={styles.rowList}>
                {t.hero.domains.map((d, i) => (
                  <li className={styles.row} key={d.sector}>
                    <span className={styles.rowNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className={styles.rowSector}>{d.sector}</span>
                      <span className={styles.rowWhat}>{d.what}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* A faixa de produtos vira marquise: o índice do que vem abaixo,
          rodando sozinho, mais rápido quando a página rola. */}
      <div className={styles.rail}>
        <p className={styles.railLabel}>{t.hero.railLabel}</p>
        <div className={styles.marquee}>
          <div className={styles.track} ref={track}>
            {[0, 1].map((copy) => (
              <div
                className={styles.group}
                key={copy}
                aria-hidden={copy === 1 || undefined}
              >
                {SHOWCASE.map((p) => {
                  const name = (
                    <span className={styles.wordmark}>
                      <Wordmark
                        id={p.id}
                        name={t.work.items[p.id].name}
                        accent={styles.tf}
                      />
                    </span>
                  );
                  return (
                    <span className={styles.item} key={`${copy}-${p.id}`}>
                      {p.url && copy === 0 ? (
                        <a
                          className={styles.itemLink}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {name}
                        </a>
                      ) : (
                        name
                      )}
                      <span className={styles.bullet} aria-hidden="true" />
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
