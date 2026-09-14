"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useI18n } from "@/lib/i18n";
import styles from "./Manifest.module.css";

export default function Manifest() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();

  useReveal(root, [
    { selector: ".secHead > *", start: "top 84%", y: 22, stagger: 0.08 },
    { selector: `.${styles.row}`, start: "top 92%", y: 18, duration: 0.6 },
  ]);

  return (
    <section id="build" className="sec" ref={root}>
      <div className="shell">
        <div className="secHead">
          <div className="top">
            <p className="eyebrow">{t.build.eyebrow}</p>
            <span className="idx">01 / 06</span>
          </div>
          <h2 className="h2">{t.build.h}</h2>
          <p className="lede">{t.build.lede}</p>
        </div>

        <div className={styles.table}>
          {t.build.rows.map((row) => (
            <div className={styles.row} key={row.layer}>
              <span className={styles.layer}>{row.layer}</span>
              <span className={styles.tool}>{row.tool}</span>
              <span className={styles.role}>{row.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
