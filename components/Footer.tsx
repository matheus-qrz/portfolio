"use client";

import { useI18n } from "@/lib/i18n";
import styles from "./Footer.module.css";

/**
 * Componente próprio, e não um pedaço do Contact: com o formulário no
 * meio da página, deixar o rodapé dentro dele teria levado o rodapé
 * junto. Aqui ele fica onde deve — no fim — e serve de última chance
 * para devolver o leitor ao formulário.
 */
export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.close}>
          <p className={styles.line}>{t.footer.line}</p>
          <a className={styles.cta} href="#contact">
            {t.footer.cta} ↑
          </a>
        </div>

        <div className={styles.meta}>
          <span>© {new Date().getFullYear()} Matheus Oliveira</span>
          <span>{t.footerMid}</span>
          <span className="num">−7.1195, −34.8450</span>
        </div>
      </div>
    </footer>
  );
}
