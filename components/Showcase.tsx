"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Wordmark from "./Wordmark";
import { PROJECTS, SHOWCASE, sectionIndex } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Showcase.module.css";

function Chevron({ back }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={back ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Showcase() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { t } = useI18n();
  const [index, setIndex] = useState(0);

  const total = SHOWCASE.length;
  const id = SHOWCASE[index];
  const project = PROJECTS.find((p) => p.id === id)!;
  const copy = t.showcase.items[id];
  const work = t.work.items[id];

  useReveal(root, [
    { selector: ".secHead > *", start: "top 84%", y: 22, stagger: 0.08 },
    { selector: `.${styles.stage}`, start: "top 86%", y: 24, duration: 0.8 },
    { selector: `.${styles.controls}`, start: "top 96%", y: 14 },
  ]);

  // Anima só na troca de slide, nunca na primeira renderização — o
  // primeiro quadro da página tem que estar legível de imediato.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = stage.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [`.${styles.left}`, `.${styles.body}`],
        { opacity: 0, x: 18 },
        { opacity: 1, x: 0, duration: 0.55, stagger: 0.07, ease: "expo.out" },
      );
    }, el);
    return () => ctx.revert();
  }, [index]);

  const go = useCallback(
    (next: number) => setIndex((next + total) % total),
    [total],
  );

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

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

        {/* Sem avanço automático: cada slide tem um parágrafo inteiro, e
            ser arrancado no meio da leitura é pior que não ter carrossel. */}
        <div
          role="group"
          aria-roledescription="carrossel"
          aria-label={t.showcase.h}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div
            className={styles.stage}
            ref={stage}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className={styles.left}>
              <p className={styles.mark}>
                <Wordmark id={id} accentClass={styles.accent} />
              </p>
              <p className={styles.sector}>{copy.sector}</p>

              {project.shot && (
                <figure className={styles.shot}>
                  <Image
                    src={`/shots/${id}.png`}
                    alt={`${work.name} — ${copy.sector}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 44vw"
                    priority={index === 0}
                  />
                </figure>
              )}
            </div>

            <div className={styles.body}>
              <p className={styles.desc}>{copy.desc}</p>
              <div className="chips">
                {project.tags.map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.links}>
                <span
                  className={`${styles.state} ${project.live ? styles.live : ""}`}
                >
                  {work.state}
                </span>
                {project.url && (
                  <a
                    className={styles.link}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {work.host}
                  </a>
                )}
                {project.repo && (
                  <a
                    className={styles.link}
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.work.repo} ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.arrows}>
              <button
                className={styles.arrow}
                type="button"
                onClick={() => go(index - 1)}
                aria-label={t.showcase.prev}
              >
                <Chevron back />
              </button>
              <button
                className={styles.arrow}
                type="button"
                onClick={() => go(index + 1)}
                aria-label={t.showcase.next}
              >
                <Chevron />
              </button>
            </div>

            <div className={styles.dots}>
              {SHOWCASE.map((slideId, i) => (
                <button
                  className={styles.dot}
                  type="button"
                  key={slideId}
                  onClick={() => setIndex(i)}
                  aria-current={i === index}
                  aria-label={`${t.showcase.goTo} ${t.work.items[slideId].name}`}
                >
                  {t.work.items[slideId].name}
                </button>
              ))}
            </div>

            <span className={styles.counter}>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
