"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BYTES, RECEIPT_LINES } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import styles from "./PrintDemo.module.css";

export default function PrintDemo() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();

  useReveal(root, [
    { selector: ".secHead > *", start: "top 84%", y: 22, stagger: 0.08 },
  ]);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(
        `.${styles.line}`,
        section,
      );
      const bytes = gsap.utils.toArray<HTMLElement>(
        `.${styles.byte}`,
        section,
      );
      if (!lines.length) return;

      gsap.set(lines, { opacity: 0, y: -4 });
      let printed = -1;

      ScrollTrigger.create({
        trigger: section,
        start: "top 76%",
        end: "bottom 96%",
        scrub: 0.45,
        onUpdate: (self) => {
          const count = Math.round(self.progress * lines.length);
          if (count !== printed) {
            printed = count;
            lines.forEach((line, i) => {
              gsap.to(line, {
                opacity: i < count ? 1 : 0,
                y: i < count ? 0 : -4,
                duration: 0.18,
                overwrite: true,
              });
            });
          }

          const running = self.progress > 0.02 && self.progress < 0.99;
          const lit = Math.min(
            bytes.length - 1,
            Math.floor(self.progress * bytes.length),
          );
          bytes.forEach((byte, i) => {
            byte.classList.toggle(styles.lit, running && i === lit);
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="print" className={`sec ${styles.print}`} ref={root}>
      <div className="shell">
        <div className="secHead">
          <div className="top">
            <p className="eyebrow">{t.print.eyebrow}</p>
            <span className="idx">02 / 06</span>
          </div>
          <h2 className="h2">{t.print.h}</h2>
          <p className="lede">{t.print.lede}</p>
        </div>

        <div className={styles.track}>
          <div className={styles.printer}>
            <div className={styles.head}>
              <span>TABLEFLOW · KDS</span>
              <span>
                <b>EPSON TM-T20X</b>
              </span>
            </div>
            <div className={styles.slot} />

            <div className={styles.receipt} aria-label={t.print.paper}>
              {RECEIPT_LINES.map((line, i) => (
                <span
                  key={i}
                  className={[
                    styles.line,
                    line.kind === "hi" ? styles.hi : "",
                    line.kind === "tot" ? styles.tot : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {line.text}
                </span>
              ))}
            </div>

            <div className={styles.tear} aria-hidden="true" />
            <p className={styles.foot}>
              <span>{t.print.paper}</span>
              <span className="num">203 dpi</span>
            </p>
          </div>

          <div>
            <div className={styles.bytes}>
              {BYTES.map((byte, i) => (
                <div className={styles.byte} key={byte.hex}>
                  <span className={styles.hex}>{byte.hex}</span>
                  <span className={styles.cmd}>{byte.cmd}</span>
                  <span className={styles.what}>{t.print.bytes[i]}</span>
                </div>
              ))}
            </div>
            <p className={`lede ${styles.note}`}>{t.print.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
