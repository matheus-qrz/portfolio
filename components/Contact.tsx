const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/matheus-oliveira-a35618322",
  },
  { label: "Email", href: "mailto:mthsqrz97@gmail.com" },
  { label: "GitHub", href: "https://github.com/matheus-qrz" },
];

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 960,
          margin: "0 auto",
          padding: "80px 48px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <style>{`
          .contact-link { font-size:13px; font-weight:500; padding:13px 28px; border:1px solid var(--border2); border-radius:100px; color:var(--text); text-decoration:none; transition:border-color 0.2s, color 0.2s, transform 0.15s; display:inline-block; }
          .contact-link:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-1px); }
        `}</style>
        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: "var(--accent)",
            marginBottom: 40,
          }}
        >
          Contact
        </p>
        <h2
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px,4vw,52px)",
            color: "var(--text)",
            lineHeight: 1.1,
            marginBottom: 20,
            maxWidth: 500,
          }}
        >
          Open to remote work.
          <br />
          Let&apos;s build something!
        </h2>
        <p
          style={{
            fontSize: 15,
            fontWeight: 300,
            color: "var(--muted)",
            marginBottom: 40,
          }}
        >
          Selectively available for international opportunities and freelance
          projects.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
          {links.map((l) => (
            <a
              key={l.label}
              className="contact-link"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}
        </div>
      </section>

      <footer
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 960,
          margin: "0 auto",
          padding: "32px 48px 48px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 12, color: "var(--muted)" }}>
          Matheus Queiroz © 2025
        </span>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>
          João Pessoa, BR
        </span>
      </footer>
    </>
  );
}
