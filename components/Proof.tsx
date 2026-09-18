"use client";

import { useRef } from "react";
import { OTHERS, TESTIMONIALS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Proof.module.css";

export default function Proof() {
  const root = useRef<HTMLElement>(null);
  const { locale, t } = useI18n();
  useReveal(root);

  return (
    <section id="proof" className="sec" ref={root}>
      <div className="shell">
        <div className="secHead">
          <p className="eyebrow" data-reveal>
            {t.proof.eyebrow}
          </p>
          <h2 className="d2" data-reveal>
            {t.proof.h}
          </h2>
          <p className="lede" data-reveal>
            {t.proof.lede}
          </p>
        </div>

        {/* Enquanto não houver depoimento real, esta parte inteira não
            existe — e a seção começa direto em "Outros projetos". */}
        {TESTIMONIALS.length > 0 && (
          <>
            <p className={styles.label}>{t.proof.testimonialsLabel}</p>
            <div className={styles.quotes}>
              {TESTIMONIALS.map((item) => (
                <blockquote className={styles.quote} key={item.id} data-reveal>
                  <p className={styles.quoteText}>“{item.quote[locale]}”</p>
                  <p className={styles.quoteWho}>
                    {item.author} · {item.role[locale]}
                  </p>
                </blockquote>
              ))}
            </div>
          </>
        )}

        <p className={styles.label}>{t.proof.othersLabel}</p>
        <div className={styles.others}>
          {OTHERS.map((project) => {
            const copy = t.proof.others[project.id];
            if (!copy) return null;

            return (
              <div className={styles.other} key={project.id} data-reveal>
                <h3 className={styles.otherName}>
                  {copy.name}
                  <span className={styles.otherState}>{copy.state}</span>
                </h3>
                <p className={styles.otherWhat}>{copy.what}</p>
                {project.url ? (
                  <a
                    className={styles.otherLink}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.proof.visit} ↗
                  </a>
                ) : (
                  <span />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
