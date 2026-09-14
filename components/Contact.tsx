"use client";

import { useRef } from "react";
import { LINKS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Contact.module.css";

function ArrowOut() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 11L11 3M11 3H5.5M11 3V8.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();

  useReveal(root, [
    { selector: ".secHead > *", start: "top 84%", y: 22, stagger: 0.08 },
    { selector: `.${styles.cta}`, start: "top 92%", y: 14, stagger: 0.07 },
  ]);

  return (
    <>
      <section id="contact" className={`sec ${styles.contact}`} ref={root}>
        <div className="shell">
          <div className="secHead">
            <div className="top">
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <span className="idx">06 / 06</span>
            </div>
            <h2 className="h2">{t.contact.h}</h2>
            <p className="lede">{t.contact.lede}</p>
          </div>

          <div className={styles.links}>
            <a className={styles.cta} href={`mailto:${LINKS.email}`}>
              {LINKS.email}
            </a>
            <a
              className={styles.cta}
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowOut />
            </a>
            <a
              className={styles.cta}
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowOut />
            </a>
          </div>
        </div>
      </section>

      <div className="shell">
        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Matheus Oliveira</span>
          <span>{t.footerMid}</span>
          <span className="num">−7.1195, −34.8450</span>
        </footer>
      </div>
    </>
  );
}
