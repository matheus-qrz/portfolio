"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./Footer.module.css";

/**
 * Copyright e cidade, e nada mais. Qualquer número sobre desempenho só
 * entra aqui depois de ser medido de verdade.
 */
export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.meta}`}>
        <span>© {new Date().getFullYear()} Matheus Oliveira</span>
        <span>{t.footer.city}</span>
      </div>
    </footer>
  );
}
