"use client";

import Image from "next/image";
import { useRef } from "react";
import { emphasize, useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import styles from "./About.module.css";

/**
 * "Sobre" e "Trajetória" viraram uma seção só. Separadas, a segunda era
 * uma lista de empregos sem contexto logo depois de um texto que já
 * tinha dito o que importava — juntas, a trajetória é a nota de rodapé
 * do texto, que é o lugar dela.
 */
export default function About() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();
  useReveal(root);

  return (
    <section id="about" className="sec" ref={root}>
      <div className="shell">
        <div className="secHead">
          <p className="eyebrow" data-reveal>
            {t.about.eyebrow}
          </p>
          <h2 className="d2" data-reveal>
            {t.about.h}
          </h2>
        </div>

        <div className={styles.grid}>
          <figure className={styles.portrait} data-reveal>
            {/* O retrato é `.jpeg`, não `.jpg`. */}
            <Image
              src="/matheus.jpeg"
              alt="Matheus Oliveira"
              width={620}
              height={826}
              sizes="(max-width: 900px) 320px, 400px"
            />
            <figcaption className={styles.caption}>
              <b>Matheus Oliveira</b>
              <span>{t.about.caption}</span>
            </figcaption>
          </figure>

          <div className={styles.body}>
            {t.about.paras.map((para, i) => (
              <p key={i} data-reveal>
                {emphasize(para)}
              </p>
            ))}

            <p className={styles.pathLabel}>{t.about.pathLabel}</p>
            <div className={styles.path}>
              {t.about.roles.map((role) => (
                <div
                  className={styles.role}
                  key={`${role.org}-${role.when}`}
                  data-reveal
                >
                  <span className={styles.when}>{role.when}</span>
                  <div>
                    <h3 className={styles.roleName}>{role.role}</h3>
                    <span className={styles.org}>{role.org}</span>
                    <p className={styles.roleDesc}>{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
