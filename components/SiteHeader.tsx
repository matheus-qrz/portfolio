"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import styles from "./SiteHeader.module.css";

/**
 * Os quatro destinos do menu, na ordem da página. "work" é uma âncora
 * dentro da queda — quem sabe onde ela para é o `Fall`, que registra a
 * posição em `SmoothScroll`.
 */
const ITEMS = ["sites", "software", "work", "about"] as const;
type ItemId = (typeof ITEMS)[number];

export default function SiteHeader() {
  const { locale, setLocale, t } = useI18n();
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<ItemId | null>(null);

  /**
   * Um listener só, em rAF, resolve as duas coisas que o header precisa
   * saber: se já saiu do topo e qual seção está sob a dobra. Consultar o
   * DOM na hora é mais barato que guardar posições que a troca de idioma
   * invalidaria.
   */
  useEffect(() => {
    let queued = false;

    const measure = () => {
      queued = false;
      setSolid(window.scrollY > 24);

      let found: ItemId | null = null;
      for (const id of ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.42) {
          found = id;
        }
      }
      setActive(found);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className={`${styles.chrome} ${solid ? styles.solid : ""}`}>
      <a className={styles.mark} href="#top">
        <span className={styles.monogram} aria-hidden="true">
          MO
        </span>
        <span className={styles.markName}>Matheus Oliveira</span>
      </a>

      <nav className={styles.links} aria-label={t.menu.work}>
        {ITEMS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={styles.link}
            aria-current={active === id}
          >
            {t.menu[id]}
          </a>
        ))}
      </nav>

      <div className={styles.right}>
        <div
          className={styles.lang}
          role="group"
          aria-label="Idioma / Language"
        >
          <button
            type="button"
            aria-pressed={locale === "pt"}
            onClick={() => setLocale("pt")}
          >
            PT
          </button>
          <button
            type="button"
            aria-pressed={locale === "en"}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
        </div>

        <a className={`btn btn-brasa ${styles.quote}`} href="#orcamento">
          {t.quoteCta}
        </a>
      </div>
    </header>
  );
}
