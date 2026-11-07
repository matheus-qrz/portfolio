"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { HIRE_CASES, HIRE_LINKS, hire, type HireCase } from "@/lib/hire";
import styles from "./Hire.module.css";

const mailto = `mailto:${HIRE_LINKS.email}`;

/**
 * /hire: a mesma noite, a mesma tipografia e a mesma brasa da home, mas
 * sem a queda. Quem chega aqui é recrutador com trinta segundos para
 * decidir — a página precisa ser lida de relance, não descoberta.
 */
export default function Hire() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  /* O layout raiz serve `lang="pt-BR"`. Esta página é inteira em inglês:
     o wrapper já carrega `lang="en"` no HTML servido, e o documento
     acompanha depois da hidratação. */
  useEffect(() => {
    const html = document.documentElement;
    const before = html.lang;
    html.lang = "en";
    return () => {
      html.lang = before;
    };
  }, []);

  return (
    <div lang="en" ref={root} className={styles.page}>
      <Header />

      <main id="top">
        <Hero />
        <Work />
        <Approach />
        <Experience />
        <Contact />
      </main>

      <footer className={styles.footer}>
        <div className={`shell ${styles.footerRow}`}>
          <span>
            © {new Date().getFullYear()} {hire.footer}
          </span>
          <a href="/">{hire.backHome}</a>
        </div>
      </footer>
    </div>
  );
}

/* ── header ────────────────────────────────────────────────────────── */

function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.chrome} ${solid ? styles.solid : ""}`}>
      <a className={styles.mark} href="#top">
        <span className={styles.monogram} aria-hidden="true">
          MO
        </span>
        <span className={styles.markName}>Matheus Oliveira</span>
      </a>

      <nav className={styles.links} aria-label="Sections">
        {hire.nav.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={styles.link}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className={`btn btn-brasa ${styles.headerCta}`} href={mailto}>
        {hire.navCta}
      </a>
    </header>
  );
}

/* ── hero ──────────────────────────────────────────────────────────── */

function Hero() {
  const { hero } = hire;

  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`shell ${styles.heroInner}`}>
        <p className="eyebrow">{hero.eyebrow}</p>

        <h1 className={`d1 ${styles.heroTitle}`}>
          {hero.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        <p className={`lede ${styles.heroSub}`}>{hero.sub}</p>

        <div className={styles.actions}>
          <a className="btn btn-brasa" href={mailto}>
            {hero.primary}
          </a>
          {HIRE_LINKS.cv && (
            <a className="btn" href={HIRE_LINKS.cv} download>
              {hero.cv}
            </a>
          )}
          <span className={styles.socials}>
            <a href={HIRE_LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={HIRE_LINKS.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </span>
        </div>

        <dl className={styles.facts}>
          {hero.facts.map((f) => (
            <div key={f.k} className={styles.fact}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ── trabalho ──────────────────────────────────────────────────────── */

function Work() {
  const { work } = hire;
  /* A imagem alterna de lado só entre os casos que têm imagem. */
  let shotIndex = 0;

  return (
    <section id="work" className={`sec ${styles.anchor}`}>
      <div className="shell">
        <div className="secHead">
          <p className="eyebrow" data-reveal>
            {work.eyebrow}
          </p>
          <h2 className="d2" data-reveal>
            {work.h}
          </h2>
          <p className="lede" data-reveal>
            {work.lede}
          </p>
        </div>

        <div className={styles.cases}>
          {HIRE_CASES.map((c) => {
            const flip = c.shot ? shotIndex++ % 2 === 1 : false;
            return <Case key={c.id} c={c} flip={flip} />;
          })}
        </div>
      </div>
    </section>
  );
}

function Case({ c, flip }: { c: HireCase; flip: boolean }) {
  const { labels } = hire.work;

  const head = (
    <div className={styles.caseHead}>
      <p className={styles.caseMeta}>
        <span>{c.kind}</span>
        {c.when && <span className={styles.caseWhen}>{c.when}</span>}
      </p>
      <h3 className={styles.caseName}>{c.name}</h3>
      <p className={styles.caseLine}>{c.line}</p>
    </div>
  );

  const details = (
    <div className={styles.caseDetails}>
      <div className={styles.block}>
        <h4 className={styles.blockLabel}>{labels.problem}</h4>
        <p>{c.problem}</p>
      </div>
      <div className={styles.block}>
        <h4 className={styles.blockLabel}>{labels.built}</h4>
        <ul className={styles.built}>
          {c.built.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
      <div className={`${styles.block} ${styles.result}`}>
        <h4 className={styles.blockLabel}>{labels.result}</h4>
        <p>{c.result}</p>
      </div>
    </div>
  );

  const foot = (
    <div className={styles.caseFoot}>
      <span className={styles.stack}>{c.stack}</span>
      {c.url && (
        <a
          className={styles.visit}
          href={c.url.href}
          target="_blank"
          rel="noreferrer"
        >
          {labels.open} {c.url.label} ↗
        </a>
      )}
    </div>
  );

  if (!c.shot) {
    return (
      <article className={`${styles.case} ${styles.caseText}`} data-reveal>
        <div>
          {head}
          {foot}
        </div>
        {details}
      </article>
    );
  }

  return (
    <article
      className={`${styles.case} ${flip ? styles.flip : ""}`}
      data-reveal
    >
      <div className={styles.caseCopy}>
        {head}
        {details}
        {foot}
      </div>
      <BrowserFrame shot={c.shot} />
    </article>
  );
}

function BrowserFrame({ shot }: { shot: NonNullable<HireCase["shot"]> }) {
  return (
    <figure className={styles.frame}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        {shot.domain && <span className={styles.domain}>{shot.domain}</span>}
      </div>
      <div className={styles.viewport}>
        <Image
          src={`/shots/${shot.file}`}
          alt={shot.alt}
          fill
          sizes="(max-width: 900px) 92vw, 640px"
          className={styles.shotImg}
        />
      </div>
    </figure>
  );
}

/* ── como trabalho ─────────────────────────────────────────────────── */

function Approach() {
  const { approach } = hire;

  return (
    <section id="approach" className={`sec ${styles.anchor}`}>
      <div className="shell">
        <div className="secHead">
          <p className="eyebrow" data-reveal>
            {approach.eyebrow}
          </p>
          <h2 className="d2" data-reveal>
            {approach.h}
          </h2>
        </div>

        <ol className={styles.approach}>
          {approach.items.map((item, i) => (
            <li key={item.title} className={styles.principle} data-reveal>
              <span className={`num ${styles.principleN}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.principleTitle}>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── experiência ───────────────────────────────────────────────────── */

function Experience() {
  const { experience } = hire;

  return (
    <section id="experience" className={`sec ${styles.anchor}`}>
      <div className="shell">
        <div className="secHead">
          <p className="eyebrow" data-reveal>
            {experience.eyebrow}
          </p>
          <h2 className="d2" data-reveal>
            {experience.h}
          </h2>
        </div>

        <div className={styles.expGrid}>
          <figure className={styles.portrait} data-reveal>
            <Image
              src="/matheus.jpeg"
              alt="Matheus Oliveira"
              width={620}
              height={826}
              sizes="(max-width: 900px) 260px, 360px"
            />
            <figcaption className={styles.caption}>
              <b>Matheus Oliveira</b>
              <span>{experience.caption}</span>
            </figcaption>
          </figure>

          <div>
            <div className={styles.roles}>
              {experience.roles.map((r) => (
                <div className={styles.role} key={r.org} data-reveal>
                  <span className={`num ${styles.when}`}>{r.when}</span>
                  <div>
                    <h3 className={styles.roleName}>{r.role}</h3>
                    <span className={styles.org}>{r.org}</span>
                    <p className={styles.roleDesc}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.alsoLabel}>{experience.also.label}</p>
            <ul className={styles.also}>
              {experience.also.items.map((a) => (
                <li key={a.name} data-reveal>
                  <b>{a.name}</b>
                  <span>{a.what}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── contato ───────────────────────────────────────────────────────── */

function Contact() {
  const { contact } = hire;

  return (
    <section id="contact" className={`sec ${styles.anchor} ${styles.contact}`}>
      <div className="shell">
        <p className="eyebrow" data-reveal>
          {contact.eyebrow}
        </p>
        <h2 className={`d1 ${styles.contactTitle}`} data-reveal>
          {contact.h}
        </h2>
        <p className="lede" data-reveal>
          {contact.lede}
        </p>

        <a className={styles.email} href={mailto} data-reveal>
          {HIRE_LINKS.email}
        </a>

        <p className={styles.contactLinks} data-reveal>
          <span>{contact.or}</span>
          <a href={HIRE_LINKS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={HIRE_LINKS.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          {HIRE_LINKS.cv && (
            <a href={HIRE_LINKS.cv} download>
              {hire.hero.cv}
            </a>
          )}
        </p>
      </div>
    </section>
  );
}
