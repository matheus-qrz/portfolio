export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 960,
        margin: "0 auto",
        padding: "140px 48px 100px",
      }}
    >
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .h-tag { animation: fadeUp 0.7s ease 0.1s both; }
        .h-name1 { animation: fadeUp 0.7s ease 0.2s both; }
        .h-name2 { animation: fadeUp 0.7s ease 0.3s both; }
        .h-desc { animation: fadeUp 0.7s ease 0.4s both; }
        .h-cta { animation: fadeUp 0.7s ease 0.5s both; }
        .btn-p { display:inline-block; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; padding:13px 28px; background:var(--accent); color:#080808; border-radius:100px; text-decoration:none; transition:background 0.2s,transform 0.15s; }
        .btn-p:hover { background:var(--accent2); transform:translateY(-1px); }
        .btn-s { display:inline-block; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:400; padding:13px 28px; background:transparent; color:var(--text); border:1px solid var(--border2); border-radius:100px; text-decoration:none; transition:border-color 0.2s,transform 0.15s; }
        .btn-s:hover { border-color:rgba(255,255,255,0.3); transform:translateY(-1px); }
      `}</style>

      <p
        className="h-tag"
        style={{
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 28,
        }}
      >
        Software Engineer · João Pessoa, BR
      </p>
      <h1
        className="h-name1"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(52px, 7vw, 88px)",
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: "var(--text)",
          marginBottom: 4,
        }}
      >
        Matheus Queiroz
      </h1>
      <h1
        className="h-name2"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(52px, 7vw, 88px)",
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: "var(--muted)",
          marginBottom: 40,
        }}
      >
        de Oliveira
      </h1>
      <p
        className="h-desc"
        style={{
          fontSize: 16,
          fontWeight: 300,
          lineHeight: 1.75,
          color: "var(--muted)",
          maxWidth: 440,
          marginBottom: 44,
        }}
      >
        Frontend engineer building polished interfaces and scalable SaaS
        products. Focused on React, Next.js, and everything that ships.
      </p>
      <div
        className="h-cta"
        style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
      >
        <a href="#projects" className="btn-p">
          View projects
        </a>
        <a href="#contact" className="btn-s">
          Get in touch
        </a>
      </div>
    </section>
  );
}
