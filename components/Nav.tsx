"use client";

import { useScrollState } from "@/hooks/useScrollState";
import { useI18n } from "@/lib/i18n";
import type { SectionId } from "@/lib/content";
import styles from "./Nav.module.css";

const NAV_ITEMS: Exclude<SectionId, "hero">[] = [
  "build",
  "print",
  "work",
  "about",
  "path",
  "contact",
];

export default function Nav() {
  const { locale, setLocale, t } = useI18n();
  const { active } = useScrollState();

  return (
    <header className={styles.chrome}>
      <a className={styles.mark} href="#hero">
        MATHEUS<b>.</b>OLIVEIRA
      </a>

      <nav className={styles.links} aria-label={t.nav.work}>
        {NAV_ITEMS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={styles.link}
            aria-current={active === id}
          >
            {t.nav[id]}
          </a>
        ))}
      </nav>

      <div className={styles.right}>
        <span className={styles.status}>
          <span className={styles.dot} />
          {t.status}
        </span>
        <div className={styles.lang} role="group" aria-label="Idioma / Language">
          <button
            id="lang-pt"
            type="button"
            aria-pressed={locale === "pt"}
            onClick={() => setLocale("pt")}
          >
            PT
          </button>
          <button
            id="lang-en"
            type="button"
            aria-pressed={locale === "en"}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
