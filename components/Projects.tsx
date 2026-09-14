"use client";

import { useRef } from "react";
import { PROJECTS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Projects.module.css";

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();

  useReveal(root, [
    { selector: ".secHead > *", start: "top 84%", y: 22, stagger: 0.08 },
    { selector: `.${styles.item}`, start: "top 92%", y: 18, duration: 0.6 },
  ]);

  return (
    <section id="work" className="sec" ref={root}>
      <div className="shell">
        <div className="secHead">
          <div className="top">
            <p className="eyebrow">{t.work.eyebrow}</p>
            <span className="idx">03 / 06</span>
          </div>
          <h2 className="h2">{t.work.h}</h2>
        </div>

        <div className={styles.list}>
          {PROJECTS.map((project, i) => {
            const copy = t.work.items[project.id];
            const body = (
              <>
                <span className={styles.n}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.name}>{copy.name}</h3>
                  <span className={styles.host}>{copy.host}</span>
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
                </span>
              </>
            );

            return project.url ? (
              <a
                key={project.id}
                className={styles.item}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {body}
              </a>
            ) : (
              <div key={project.id} className={styles.item}>
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
