"use client";

import { useScrollState } from "@/hooks/useScrollState";
import { SECTIONS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import styles from "./Rails.module.css";

export default function Rails() {
  const { active, pct } = useScrollState();
  const { t } = useI18n();

  return (
    <>
      <div className={`${styles.rail} ${styles.left}`} aria-hidden="true">
        {SECTIONS.map((id) => (
          <span
            key={id}
            className={`${styles.tick} ${active === id ? styles.on : ""}`}
          />
        ))}
      </div>
      <div className={`${styles.rail} ${styles.right}`} aria-hidden="true">
        <span className={styles.readout}>
          <b>{String(pct).padStart(2, "0")}</b> / 100 &nbsp;·&nbsp;{" "}
          {t.navLabel[active]}
        </span>
      </div>
    </>
  );
}
