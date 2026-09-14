"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { emphasize, useI18n } from "@/lib/i18n";
import styles from "./Hero.module.css";

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
          `.${styles.frame}`,
          { y: 34, opacity: 0, scale: 0.97, duration: 1.15 },
          "-=0.95",
        )
        .from(
          `.${styles.shotCaption}`,
          { opacity: 0, duration: 0.6 },
          "-=0.45",
        )
        .from(
          [`.${styles.railLabel}`, `.${styles.product}`],
          { y: 14, opacity: 0, duration: 0.6, stagger: 0.07 },
          "-=0.7",
        );

      // Paralaxe leve: o screenshot sobe um pouco mais devagar que a página.
      gsap.to(`.${styles.shot}`, {
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
        y: -46,
        ease: "none",
      });
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

          <figure className={styles.shot}>
            <div className={styles.frame}>
              <div className={styles.bar}>
                <span className={styles.dots}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.barLabel}>
                  tableflow.software / kds
                </span>
              </div>
              <Image
                src="/tableflow-kds.png"
                alt="Tela do KDS do Tableflow com pedidos em preparo"
                width={641}
                height={605}
                sizes="(max-width: 1000px) 100vw, 46vw"
                priority
              />
            </div>
            <figcaption className={styles.shotCaption}>
              {t.hero.shotCaption}
            </figcaption>
          </figure>
        </div>

        <div className={styles.rail}>
          <p className={styles.railLabel}>{t.hero.railLabel}</p>
          <div className={styles.railItems}>
            <a
              className={styles.product}
              href="https://tableflow.software"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <span className={styles.wordmark}>
                  table<span className={styles.tf}>flow</span>
                </span>
                <span className={styles.desc}>{t.hero.rail.tableflow}</span>
              </span>
            </a>

            <span className={styles.product}>
              <span>
                <span className={styles.wordmark}>Servin</span>
                <span className={styles.desc}>{t.hero.rail.servin}</span>
              </span>
            </span>

            <a
              className={styles.product}
              href="https://valeotijolo.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <span className={styles.wordmark}>Vale o Tijolo?</span>
                <span className={styles.desc}>{t.hero.rail.tijolo}</span>
              </span>
            </a>

            <span className={styles.product}>
              <span>
                <span className={styles.wordmark}>Copa AI</span>
                <span className={styles.desc}>{t.hero.rail.copa}</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
