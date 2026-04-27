const experience = [
  {
    period: "2021 — now",
    role: "Frontend Developer",
    company: "Wisecare",
    desc: "Building and maintaining the core product frontend with Next.js, React 19 and a custom internal design system. Close collaboration with design and backend teams across multiple product lines.",
  },
  {
    period: "2021 — 2024",
    role: "Frontend Developer",
    company: "Netfans",
    desc: "Building and maintaining the core product frontend with React 18 and 8D audio virtual rooms development for multiple entertainment purposes.",
  },
  {
    period: "2023 — now",
    role: "Founder & Developer",
    company: "Independent",
    desc: "Building SaaS products and taking on freelance projects. Full ownership from architecture to deployment — handling frontend, backend, infra and billing infrastructure.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 960,
        margin: "0 auto",
        padding: "80px 48px",
        borderTop: "1px solid var(--border)",
      }}
    >
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
        Experience
      </p>
      <div>
        {experience.map((e, i) => (
          <div
            key={e.company}
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: 32,
              padding: "32px 0",
              borderBottom:
                i < experience.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <span
              style={{ fontSize: 12, color: "var(--muted)", paddingTop: 4 }}
            >
              {e.period}
            </span>
            <div>
              <p
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: 4,
                }}
              >
                {e.role}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--accent)",
                  letterSpacing: "0.06em",
                  marginBottom: 12,
                }}
              >
                {e.company}
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "var(--muted)",
                }}
              >
                {e.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
