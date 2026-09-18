"use client";

import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { useKindLink } from "@/lib/quoteKind";
import { useReveal } from "@/hooks/useReveal";
import styles from "./Sites.module.css";

export default function Sites() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();
  const pickSite = useKindLink("site");
  useReveal(root);

  return (
    <section id="sites" className="sec" ref={root}>
      <div className="shell">
        <div className="secHead">
          <p className="eyebrow" data-reveal>
            {t.sites.eyebrow}
          </p>
          <h2 className="d2" data-reveal>
            {t.sites.h}
          </h2>
          <p className="lede" data-reveal>
            {t.sites.lede}
          </p>
        </div>

        {/*
          A moeda segue o idioma, e não o país de quem acessa. Se um dia
          precisar seguir o país, o header `x-vercel-ip-country` já chega
          na requisição e basta escolher o preço a partir dele — não há
          nada aqui que dependa de `locale` além desta string.
        */}
        <div className={styles.price}>
          <p className={styles.priceValue} data-reveal>
            {t.sites.price.value}
          </p>
          <p className={styles.priceNote} data-reveal>
            {t.sites.price.note}
          </p>
        </div>

        <p className={styles.label}>{t.sites.includesLabel}</p>
        <div className={styles.includes}>
          {t.sites.includes.map((column) => (
            <div className={styles.column} key={column.title} data-reveal>
              <h3 className={styles.columnTitle}>{column.title}</h3>
              <ul className={styles.list}>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className={styles.label}>{t.sites.stepsLabel}</p>
        <div className={styles.steps}>
          {t.sites.steps.map((step) => (
            <div className={styles.step} key={step.n} data-reveal>
              <p className={`${styles.stepN} num`}>{step.n}</p>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <a className="btn btn-brasa" href="#orcamento" onClick={pickSite}>
            {t.sites.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
