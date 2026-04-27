const projects = [
  {
    num: "01",
    name: "Servin",
    desc: "Hospitality management SaaS. QR code ordering, all registered hotel services management, thermal printer integration (ESC/POS).",
    tags: ["Next.js", "Node.js", "AWS", "MongoDB"],
    url: null,
  },
  {
    num: "02",
    name: "Tableflow",
    desc: "Food service management SaaS with real-time qr code table ordering, thermal printer integration (ESC/POS), takeaway, delivery, statistics and subscription billing infrastructure.",
    tags: ["Next.js", "TypeScript", "Stripe", "AWS Amplify"],
    url: "https://tableflow.software",
  },
  {
    num: "03",
    name: "Freelas",
    desc: "A Next.js monorepo of productivity tools for Brazilian freelancers — pricing calculator, contract generator, and more.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: null,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
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
        .proj-card { background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:28px 24px; display:flex; flex-direction:column; gap:14px; transition:border-color 0.25s, transform 0.2s; position:relative; text-decoration:none; }
        .proj-card:hover { border-color:var(--border2); transform:translateY(-3px); }
        .proj-card.linked:hover { border-color:#ff6b2b; }
        .proj-arrow { position:absolute; top:20px; right:20px; width:32px; height:32px; border-radius:50%; background:#ff6b2b; display:flex; align-items:center; justify-content:center; opacity:0; transform:scale(0.7); transition:opacity 0.2s, transform 0.2s; }
        .proj-card.linked:hover .proj-arrow { opacity:1; transform:scale(1); }
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
        Projects
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 16,
        }}
      >
        {projects.map((p) => {
          const Tag = p.url ? "a" : "div";
          return (
            <Tag
              key={p.num}
              {...(p.url
                ? { href: p.url, target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`proj-card${p.url ? " linked" : ""}`}
            >
              {p.url && (
                <div className="proj-arrow">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5"
                      stroke="#080808"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                }}
              >
                {p.num}
              </span>
              <p
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "var(--text)",
                }}
              >
                {p.name}
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: "var(--muted)",
                  flex: 1,
                }}
              >
                {p.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap" as const,
                  gap: 6,
                  paddingTop: 6,
                  borderTop: "1px solid var(--border)",
                }}
              >
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 12,
                      padding: "4px 10px",
                      border: "1px solid var(--border)",
                      borderRadius: 100,
                      color: "var(--accent)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
