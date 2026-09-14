"use client";

import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Experience.module.css";

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();

  useReveal(root, [
    { selector: ".secHead > *", start: "top 84%", y: 22, stagger: 0.08 },
    { selector: `.${styles.row}`, start: "top 92%", y: 18, duration: 0.6 },
  ]);

  return (
    <section id="path" className="sec" ref={root}>
      <div className="shell">
        <div className="secHead">
          <div className="top">
            <p className="eyebrow">{t.path.eyebrow}</p>
            <span className="idx">05 / 06</span>
          </div>
          <h2 className="h2">{t.path.h}</h2>
        </div>

        <div className={styles.list}>
          {t.path.roles.map((role) => (
            <div className={styles.row} key={`${role.org}-${role.when}`}>
              <span className={styles.when}>{role.when}</span>
              <div>
                <h3 className={styles.role}>{role.role}</h3>
                <span className={styles.org}>{role.org}</span>
                <p className={styles.desc}>{role.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
