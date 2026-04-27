"use client";
const stack = ["React","Next.js","TypeScript","Tailwind CSS","Styled Components","Redux Sagas","Zustand","React Query","React Hook Form","Zod","Node.js","MongoDB","AWS","Vercel"];

export default function Stack() {
  return (
    <section id="stack" style={{ position:"relative", zIndex:1, maxWidth:960, margin:"0 auto", padding:"80px 48px", borderTop:"1px solid var(--border)" }}>
      <p style={{ fontSize:10, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:"var(--accent)", marginBottom:40 }}>Stack</p>
      <div style={{ display:"flex", flexWrap:"wrap" as const, gap:10 }}>
        {stack.map(t => (
          <span key={t} style={{ fontSize:12, fontWeight:400, padding:"8px 18px", border:"1px solid var(--border2)", borderRadius:100, color:"var(--muted)", cursor:"default", transition:"border-color 0.2s, color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.color="var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border2)"; e.currentTarget.style.color="var(--muted)"; }}
          >{t}</span>
        ))}
      </div>
    </section>
  );
}
