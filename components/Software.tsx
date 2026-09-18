"use client";

import { useRef } from "react";
import { emphasize, useI18n } from "@/lib/i18n";
import { useKindLink } from "@/lib/quoteKind";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Software.module.css";

export default function Software() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();
  const pickSoftware = useKindLink("sistema");
  useReveal(root);

  return (
    <section id="software" className="sec" ref={root}>
      <div className="shell">
        <div className="secHead">
          <p className="eyebrow" data-reveal>
            {t.software.eyebrow}
          </p>
          <h2 className="d2" data-reveal>
            {t.software.h}
          </h2>
          <p className="lede" data-reveal>
            {t.software.lede}
          </p>
        </div>

        <div className={styles.fronts}>
          {t.software.fronts.map((front) => (
            <div className={styles.front} key={front.title} data-reveal>
              <h3 className={styles.frontTitle}>{front.title}</h3>
              <p className={styles.frontBody}>{front.body}</p>
            </div>
          ))}
        </div>

        <p className={styles.scope} data-reveal>
          {emphasize(t.software.scopeLine)}
        </p>

        <div className={styles.cta}>
          <a className="btn" href="#orcamento" onClick={pickSoftware}>
            {t.software.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
