"use client";

import { useRef, useState, type FormEvent } from "react";
import { LINKS, sectionIndex } from "@/lib/content";
import { fieldErrors, type FieldName } from "@/lib/quote";
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

type Status = "idle" | "sending" | "ok" | "error";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const { t } = useI18n();
  const f = t.contact.form;

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  useReveal(root, [
    { selector: ".secHead > *", start: "top 84%", y: 22, stagger: 0.08 },
    { selector: `.${styles.card}`, start: "top 88%", y: 20, duration: 0.8 },
  ]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const problems = fieldErrors(data);
    if (problems) {
      setErrors(
        Object.fromEntries(
          Object.entries(problems).map(([k, v]) => [k, f[v]]),
        ) as Partial<Record<FieldName, string>>,
      );
      setStatus("idle");
      const firstBad = Object.keys(problems)[0];
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const busy = status === "sending";

  return (
    <>
      <section id="contact" className={`sec ${styles.contact}`} ref={root}>
        <div className="shell">
          <div className="secHead">
            <div className="top">
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <span className="idx">{sectionIndex("contact")}</span>
            </div>
            <h2 className="h2">{t.contact.h}</h2>
            <p className="lede">{t.contact.lede}</p>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{f.title}</p>

              {status === "ok" ? (
                <div className={styles.result} role="status">
                  <p className={styles.resultTitle}>{f.okTitle}</p>
                  <p className={styles.resultBody}>{f.okBody}</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={onSubmit} noValidate>
                  <div className={styles.row}>
                    <label className={styles.label} htmlFor="q-name">
                      {f.name}
                    </label>
                    <input
                      className={styles.input}
                      id="q-name"
                      name="name"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "q-name-err" : undefined}
                    />
                    {errors.name && (
                      <p className={styles.err} id="q-name-err">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className={styles.row}>
                    <label className={styles.label} htmlFor="q-company">
                      {f.company} <span className={styles.hint}>{f.companyHint}</span>
                    </label>
                    <input
                      className={styles.input}
                      id="q-company"
                      name="company"
                      autoComplete="organization"
                    />
                  </div>

                  <div className={styles.row}>
                    <label className={styles.label} htmlFor="q-email">
                      {f.email}
                    </label>
                    <input
                      className={styles.input}
                      id="q-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "q-email-err" : undefined}
                    />
                    {errors.email && (
                      <p className={styles.err} id="q-email-err">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className={styles.row}>
                    <label className={styles.label} htmlFor="q-need">
                      {f.need}
                    </label>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      id="q-need"
                      name="need"
                      rows={5}
                      aria-invalid={!!errors.need}
                      aria-describedby="q-need-hint"
                    />
                    <p className={styles.hintBlock} id="q-need-hint">
                      {errors.need ? (
                        <span className={styles.err}>{errors.need}</span>
                      ) : (
                        f.needHint
                      )}
                    </p>
                  </div>

                  {/* Honeypot: fora da ordem de tabulação e escondido de
                      leitores de tela. Bot preenche, humano não. */}
                  <div className={styles.pot} aria-hidden="true">
                    <label htmlFor="q-website">Website</label>
                    <input
                      id="q-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <button className={styles.submit} type="submit" disabled={busy}>
                    {busy ? f.sending : f.submit}
                  </button>

                  {status === "error" && (
                    <div className={styles.resultErr} role="alert">
                      <p className={styles.resultTitle}>{f.errTitle}</p>
                      <p className={styles.resultBody}>{f.errBody}</p>
                    </div>
                  )}

                  <p className={styles.privacy}>{f.privacy}</p>
                </form>
              )}
            </div>

            <div className={styles.side}>
              <p className={styles.sideLabel}>{t.contact.direct}</p>
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
          </div>
        </div>
      </section>

    </>
  );
}
