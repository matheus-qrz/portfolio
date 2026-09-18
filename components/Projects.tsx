"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, sectionIndex } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Projects.module.css";

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();

  useReveal(root, [
    { selector: ".secHead > *", start: "top 84%", y: 22, stagger: 0.08 },
  ]);

  /**
   * A lista deixou de ser grade: cada linha é revelada de cima para baixo,
   * por corte, uma por vez conforme entra na tela — o mesmo gesto da
   * máscara de linha do título, aplicado a uma régua inteira.
   */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      for (const row of gsap.utils.toArray<HTMLElement>(`.${styles.item}`)) {
        gsap.from(row, {
          scrollTrigger: { trigger: row, start: "top 92%", once: true },
          clipPath: "inset(0% 0% 100% 0%)",
          y: 20,
          duration: 0.85,
          ease: "expo.out",
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="sec" ref={root}>
      <div className="shell">
        <div className="secHead">
          <div className="top">
            <p className="eyebrow">{t.work.eyebrow}</p>
            <span className="idx">{sectionIndex("work")}</span>
          </div>
          <h2 className="h2">{t.work.h}</h2>
          <p className="lede">{t.work.lede}</p>
        </div>

        <div className={styles.list}>
          {PROJECTS.map((project, i) => {
            const copy = t.work.items[project.id];
            return (
              <div className={styles.item} key={project.id}>
                <span className={styles.n}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className={styles.name}>{copy.name}</h3>
                  {/* Os links ficam explícitos em vez de a linha inteira ser
                      uma âncora: um projeto pode ter site e repositório, e
                      âncora dentro de âncora é HTML inválido. */}
                  {project.url ? (
                    <a
                      className={`${styles.host} ${styles.hostLink}`}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {copy.host}
                    </a>
                  ) : (
                    <span className={styles.host}>{copy.host}</span>
                  )}
                </div>

                <div>
                  <p className={styles.desc}>{copy.desc}</p>
                  <div className="chips">
                    {project.tags.map((tag) => (
                      <span className="chip" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span className={styles.state}>
                  <i className={project.live ? styles.live : undefined}>
                    {copy.state}
                  </i>
                  {project.repo && (
                    <a
                      className={styles.repo}
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.work.repo} ↗
                    </a>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
