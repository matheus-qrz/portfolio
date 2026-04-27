"use client";

const links = ["About", "Stack", "Projects", "Experience", "Contact"];

export default function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 48px",
        borderBottom: "1px solid var(--border)",
        background: "rgba(8,8,8,0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 16,
          letterSpacing: "0.1em",
          color: "var(--accent)",
        }}
      >
        MQ
      </span>
      <div style={{ display: "flex", gap: 36 }}>
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: "var(--muted)",
              textDecoration: "none",
              textTransform: "uppercase" as const,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}
