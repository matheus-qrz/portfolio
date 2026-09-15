"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { emphasize, useI18n } from "@/lib/i18n";
import styles from "./Hero.module.css";

/**
 * Faixa de produtos. O Tableflow tem o acento laranja da própria marca;
 * os outros são wordmarks simples, para a faixa ler como um conjunto.
 */
const RAIL: { id: string; url?: string; label: ReactNode }[] = [
  {
    id: "tableflow",
    url: "https://tableflow.software",
    label: (
      <>
        table<span className={styles.tf}>flow</span>
      </>
    ),
  },
  { id: "meirendeu", url: "https://mei-rendeu.com.br", label: "MEI Rendeu" },
  { id: "servin", label: "Servin" },
  { id: "tijolo", url: "https://valeotijolo.com.br", label: "Vale o Tijolo?" },
  { id: "copa", label: "Copa AI" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(`.${styles.meta} li`, {
          y: 12,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
        })
        .from(
          `.${styles.headline}`,
          { y: 26, opacity: 0, duration: 1 },
          "-=0.35",
        )
        .from(
          [`.${styles.sub}`, `.${styles.ctas}`],
          { y: 18, opacity: 0, duration: 0.75, stagger: 0.08 },
          "-=0.72",
        )
        .from(
          `.${styles.domainRow}`,
          { x: 20, opacity: 0, duration: 0.65, stagger: 0.07 },
          "-=0.85",
        )
        .from(
          [`.${styles.railLabel}`, `.${styles.product}`],
          { y: 14, opacity: 0, duration: 0.6, stagger: 0.07 },
          "-=0.5",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={root}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.top}>
          <div>
            <ul className={styles.meta}>
              {t.hero.meta.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h1 className={styles.headline}>{emphasize(t.hero.headline)}</h1>
            <p className={styles.sub}>{t.hero.sub}</p>

            <div className={styles.ctas}>
              <a href="#contact" className={`${styles.btn} ${styles.primary}`}>
                {t.hero.ctaTalk}
              </a>
              <a href="#work" className={`${styles.btn} ${styles.secondary}`}>
                {t.hero.ctaWork} ↓
              </a>
            </div>
          </div>

          {/* A prova de versatilidade como informação, não como efeito:
              cada linha é um setor em que já existe algo entregue. */}
          <div className={styles.domains}>
            <p className={styles.domainsLabel}>{t.hero.domainsLabel}</p>
            <ul className={styles.domainList}>
              {t.hero.domains.map((d, i) => (
                <li className={styles.domainRow} key={d.sector}>
                  <span className={styles.domainNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className={styles.domainSector}>{d.sector}</span>
                    <span className={styles.domainWhat}>{d.what}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.rail}>
          <p className={styles.railLabel}>{t.hero.railLabel}</p>
          <div className={styles.railItems}>
            {RAIL.map((p) => {
              const body = (
                <span>
                  <span className={styles.wordmark}>{p.label}</span>
                  <span className={styles.desc}>{t.hero.rail[p.id]}</span>
                </span>
              );
              return p.url ? (
                <a
                  key={p.id}
                  className={styles.product}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {body}
                </a>
              ) : (
                <span key={p.id} className={styles.product}>
                  {body}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
