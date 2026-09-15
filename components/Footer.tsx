"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useI18n();
  return (
    <div className="shell">
      <div className={styles.close}>
        <p className={styles.closeText}>{t.contact.h}</p>
        <a className={styles.closeCta} href="#contact">
          {t.hero.ctaTalk} ↑
        </a>
      </div>
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Matheus Oliveira</span>
        <span>{t.footerMid}</span>
        <span className="num">−7.1195, −34.8450</span>
      </footer>
    </div>
  );
}
