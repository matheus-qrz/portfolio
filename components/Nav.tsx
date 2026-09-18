"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useScrollState } from "@/hooks/useScrollState";
import { useI18n } from "@/lib/i18n";
import { NAV_ITEMS } from "@/lib/content";
import styles from "./Nav.module.css";

export default function Nav() {
  const { locale, setLocale, t } = useI18n();
  const { active } = useScrollState();
  const links = useRef<HTMLElement>(null);
  const ink = useRef<HTMLSpanElement>(null);

  /**
   * O item ativo deixa de ser um fundo que pisca no lugar certo: um risco
   * vermelho desliza até ele. Medir na hora é mais barato que guardar as
   * posições, e sobrevive à troca de idioma, que muda a largura de todos.
   */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bar = ink.current;
    const list = links.current;
    const current = list?.querySelector<HTMLAnchorElement>(
      '[aria-current="true"]',
    );
    if (!bar || !list) return;

    if (!current) {
      gsap.to(bar, { autoAlpha: 0, duration: 0.2 });
      return;
    }

    const box = current.getBoundingClientRect();
    const origin = list.getBoundingClientRect();
    gsap.to(bar, {
      x: box.left - origin.left,
      width: box.width,
      autoAlpha: 1,
      duration: 0.38,
      ease: "power3.out",
    });
  }, [active, locale]);

  return (
    <header className={styles.chrome}>
      <a className={styles.mark} href="#hero">
        MATHEUS<b>.</b>OLIVEIRA
      </a>

      <nav className={styles.links} aria-label={t.nav.work} ref={links}>
        <span className={styles.ink} aria-hidden="true" ref={ink} />
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
