"use client";

import Image from "next/image";
import { useRef } from "react";
import { emphasize, useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import styles from "./About.module.css";

export default function About() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();

  useReveal(root, [
    { selector: ".secHead > *", start: "top 84%", y: 22, stagger: 0.08 },
    {
      selector: `.${styles.portrait} img`,
      trigger: "#about",
      start: "top 78%",
      x: -22,
      y: 0,
      duration: 1.15,
    },
    {
      selector: `.${styles.caption}`,
      trigger: "#about",
      start: "top 78%",
      y: 10,
      duration: 0.7,
      delay: 0.35,
      ease: "power3.out",
    },
    {
      selector: `.${styles.body} p`,
      start: "top 88%",
      y: 18,
      stagger: 0.09,
      duration: 0.7,
    },
  ]);

  return (
    <section id="about" className="sec" ref={root}>
      <div className="shell">
        <div className="secHead">
          <div className="top">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <span className="idx">04 / 06</span>
          </div>
        </div>

        <div className={styles.grid}>
          <figure className={styles.portrait}>
            <Image
              src="/matheus.jpeg"
              alt="Matheus Oliveira"
              width={620}
              height={826}
              sizes="(max-width: 1000px) 330px, 370px"
              priority={false}
            />
            <figcaption className={styles.caption}>
              <b>Matheus Oliveira</b>
              <span>{t.about.caption}</span>
            </figcaption>
          </figure>

          <div className={styles.body}>
            {t.about.paras.map((para, i) => (
              <p key={i}>{emphasize(para)}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
