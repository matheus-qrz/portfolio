"use client";

import { useRef, useState, type FormEvent } from "react";
import { LINKS, QUOTE_KINDS_ORDER } from "@/lib/content";
import { fieldErrors, type FieldName } from "@/lib/quote";
import { useI18n } from "@/lib/i18n";
import { useQuoteKind } from "@/lib/quoteKind";
import { whatsappHref } from "@/lib/whatsapp";
import { useReveal } from "@/hooks/useReveal";
import { WhatsAppGlyph } from "./WhatsAppButton";
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
  const { kind, setKind } = useQuoteKind();
  const f = t.quote.form;

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  useReveal(root);

  const whatsapp = whatsappHref(t.whatsapp.message);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const problems = fieldErrors(data);
    if (problems) {
      setErrors(
        Object.fromEntries(
          Object.entries(problems).map(([field, code]) => [field, f[code]]),
        ) as Partial<Record<FieldName, string>>,
      );
      setStatus("idle");
      const first = Object.keys(problems)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
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
    <section id="orcamento" className="sec" ref={root}>
      <div className="shell">
        <div className="secHead">
          <p className="eyebrow" data-reveal>
            {t.quote.eyebrow}
          </p>
          <h2 className="d2" data-reveal>
            {t.quote.h}
          </h2>
          <p className="lede" data-reveal>
            {t.quote.lede}
          </p>
        </div>

        <div className={styles.grid}>
          {status === "ok" ? (
            <div className={styles.result} role="status">
              <p className={styles.resultTitle}>{f.okTitle}</p>
              <p className={styles.resultBody}>{f.okBody}</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              {/*
                O tipo já vem marcado por quem clicou numa das portas do
                hero ou num CTA de seção: não faz sentido perguntar de
                novo o que a pessoa acabou de responder clicando.
              */}
              <fieldset className={styles.row}>
                <legend className={styles.label}>{f.kindLabel}</legend>
                <div className={styles.kinds}>
                  {QUOTE_KINDS_ORDER.map((option) => (
                    <label className={styles.kind} key={option}>
                      <input
                        type="radio"
                        name="kind"
                        value={option}
                        checked={kind === option}
                        onChange={() => setKind(option)}
                      />
                      <span>{f.kinds[option]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className={styles.pair}>
                <div className={styles.row}>
                  <label className={styles.label} htmlFor="q-name">
                    {f.name}
                  </label>
                  <input
                    className={styles.input}
                    id="q-name"
                    name="name"
                    autoComplete="name"
                    maxLength={120}
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
                    maxLength={200}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "q-email-err" : undefined}
                  />
                  {errors.email && (
                    <p className={styles.err} id="q-email-err">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.pair}>
                <div className={styles.row}>
                  <label className={styles.label} htmlFor="q-company">
                    {f.company}{" "}
                    <span className={styles.hint}>{f.optional}</span>
                  </label>
                  <input
                    className={styles.input}
                    id="q-company"
                    name="company"
                    autoComplete="organization"
                    maxLength={160}
                  />
                </div>

                <div className={styles.row}>
                  <label className={styles.label} htmlFor="q-phone">
                    {f.phone} <span className={styles.hint}>{f.phoneHint}</span>
                  </label>
                  <input
                    className={styles.input}
                    id="q-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={40}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "q-phone-err" : undefined}
                  />
                  {errors.phone && (
                    <p className={styles.err} id="q-phone-err">
                      {errors.phone}
                    </p>
                  )}
                </div>
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
                  maxLength={4000}
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

              <button
                className={`btn btn-brasa ${styles.submit}`}
                type="submit"
                disabled={busy}
              >
                {busy ? f.sending : f.submit}
              </button>

              {status === "error" && (
                <div className={styles.result} role="alert">
                  <p className={styles.resultTitle}>{f.errTitle}</p>
                  <p className={styles.resultBody}>{f.errBody}</p>
                </div>
              )}

              <p className={styles.privacy}>{f.privacy}</p>
            </form>
          )}

          <div className={styles.side}>
            <p className={styles.sideLabel}>{t.quote.direct}</p>
            <div className={styles.links}>
              <a className={styles.cta} href={`mailto:${LINKS.email}`}>
                {LINKS.email}
              </a>
              {/* Sem NEXT_PUBLIC_WHATSAPP não existe link — e o atalho
                  simplesmente não aparece. */}
              {whatsapp && (
                <a
                  className={styles.cta}
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span data-glyph="whatsapp">
                    <WhatsAppGlyph />
                  </span>
                  {t.whatsapp.label}
                </a>
              )}
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
  );
}
