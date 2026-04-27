export default function About() {
  return (
    <section id="about" style={{ position:"relative", zIndex:1, maxWidth:960, margin:"0 auto", padding:"80px 48px", borderTop:"1px solid var(--border)" }}>
      <p style={{ fontSize:10, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase" as const, color:"var(--accent)", marginBottom:40 }}>About</p>
      <p style={{ fontSize:17, fontWeight:300, lineHeight:1.85, color:"var(--muted)", maxWidth:560 }}>
        I&apos;ve been shipping production code across startups and my own products for years.
        Currently working full-time as a{" "}
        <strong style={{ color:"var(--text)", fontWeight:500 }}>frontend engineer at Wisecare</strong>{" "}
        while running my own software business — building SaaS platforms from scratch,
        taking on select <strong style={{ color:"var(--text)", fontWeight:500 }}>freelance projects</strong>,
        and working closely with design systems and complex state management.
        I actively integrate <strong style={{ color:"var(--text)", fontWeight:500 }}>AI tools</strong> into
        my workflow and products — from LLM APIs to AI-assisted development — to ship faster and build smarter.
      </p>
    </section>
  );
}
