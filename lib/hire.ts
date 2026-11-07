/* ─────────────────────────────────────────────────────────────────────
   /hire — a página para quem contrata, não para quem compra site.

   Só em inglês: o leitor é recrutador ou time de engenharia de fora.
   Mesma regra do resto do site: nenhum número entra aqui antes de ser
   medido, e nenhum projeto entra com "em produção" se não estiver no ar.
   ──────────────────────────────────────────────────────────────────── */

export const HIRE_LINKS = {
  email: "mthsdev97@gmail.com",
  linkedin: "https://www.linkedin.com/in/matheus-oliveira-a35618322",
  github: "https://github.com/matheus-qrz",
  /**
   * O PDF do currículo em `public/`. Enquanto for `null`, o botão de
   * download não aparece — melhor nenhum botão do que um link que dá 404.
   * Ex.: "/matheus-oliveira-cv.pdf"
   */
  cv: null as string | null,
};

export const hire = {
  meta: {
    title: "Matheus Oliveira — Frontend Engineer",
    description:
      "Frontend engineer with six years of React, Next.js and TypeScript in production. Customer-facing UI, storefronts, checkout and subscription flows. Remote from Brazil, overlapping US Eastern hours.",
  },

  nav: [
    { id: "work", label: "Work" },
    { id: "approach", label: "How I work" },
    { id: "experience", label: "Experience" },
  ],
  navCta: "Email me",

  hero: {
    eyebrow: "Frontend engineer · Remote from Brazil",
    lines: ["From Figma", "to production,", "pixel for pixel."],
    sub: "I'm Matheus Oliveira. I've spent six years shipping React, Next.js and TypeScript to production — storefronts, checkouts and subscription flows, and the reusable components that make the next page faster to build than the last one.",
    primary: "Email me",
    cv: "Download CV",
    facts: [
      { k: "Stack", v: "TypeScript · React · Next.js · Tailwind" },
      { k: "Time zone", v: "UTC−3 · overlaps US Eastern hours" },
      { k: "Experience", v: "6 years in production" },
      { k: "English", v: "Professional working proficiency" },
    ],
  },

  work: {
    eyebrow: "Selected work",
    h: "Shipped work, not mockups.",
    lede: "Two products of my own, a client checkout with real money moving through it, and a client site built from her own brand. Each one: the problem, what I built, and what came out of it.",
    labels: {
      problem: "The problem",
      built: "What I built",
      result: "What came out of it",
      open: "Visit",
    },
  },

  approach: {
    eyebrow: "How I work",
    h: "Fast, without being sloppy.",
    items: [
      {
        title: "I work from the design, not around it",
        body: "The Figma file is the spec. I match spacing, type and alignment to it, and when a mockup doesn't cover a screen size or an edge case, I make the call and say which call I made.",
      },
      {
        title: "Every page leaves something behind",
        body: "At Wisecare, the filters, bottom sheets, date pickers and data tables I built became shared patterns across several product teams. I build pages the same way: the second one should take half the time of the first.",
      },
      {
        title: "AI in the loop, fundamentals in charge",
        body: "Claude Code and Cursor are part of my daily workflow. They make me faster; they don't decide for me. I read, understand and own every line I ship.",
      },
      {
        title: "I stay after launch",
        body: "I've been woken up by a failing Stripe webhook at two in the morning and rewritten a print queue because a restaurant lost an order on a Saturday night. Shipping is the start of the job, not the end of it.",
      },
    ],
  },

  experience: {
    eyebrow: "Experience",
    h: "Where I've done it.",
    caption: "João Pessoa · Brazil · UTC−3",
    roles: [
      {
        when: "2020 → now",
        role: "Frontend Engineer",
        org: "Wisecare",
        desc: "Telehealth. Customer-facing screens across several teleconsultation products, built from Figma in Next.js, React and TypeScript. Reusable UI patterns adopted across product teams and components for the internal design system, working daily with designers and backend engineers.",
      },
      {
        when: "2022 → now",
        role: "Founder & Engineer",
        org: "Tableflow · Servin · Vapti",
        desc: "My own products, from first commit to paying customers: product, UI, billing, deploys and support, solo.",
      },
      {
        when: "2021 → 2023",
        role: "Frontend Developer",
        org: "Netfans",
        desc: "Audio streaming. React features, authentication flows, reusable components and the 8D audio player UI.",
      },
    ],
    also: {
      label: "Also built",
      items: [
        {
          name: "Servin",
          what: "Hotel and guesthouse management: guests request service from a QR code in the room.",
        },
        {
          name: "LITH1UM",
          what: "Electric mobility: a public catalogue up front, orders and stock behind it.",
        },
        {
          name: "MEI Rendeu",
          what: "A bookkeeping assistant for Brazilian sole traders that lives inside WhatsApp.",
        },
      ],
    },
  },

  contact: {
    eyebrow: "Contact",
    h: "Let's talk.",
    lede: "The fastest way to reach me is email. I reply within one business day.",
    or: "Or find me on",
  },

  footer: "Matheus Oliveira · João Pessoa, Brazil",
  backHome: "← Main site",
};

/* ── estudos de caso ─────────────────────────────────────────────────── */

export interface HireCase {
  id: string;
  kind: string;
  when?: string;
  name: string;
  line: string;
  problem: string;
  built: string[];
  result: string;
  stack: string;
  url?: { href: string; label: string };
  /**
   * Print em `public/shots/`. Sem print, o caso vira texto em largura
   * cheia — nunca uma caixa vazia no lugar da imagem.
   */
  shot?: { file: string; alt: string; domain?: string; w: number; h: number };
}

export const HIRE_CASES: HireCase[] = [
  {
    id: "tableflow",
    kind: "My own SaaS",
    when: "2022 → now",
    name: "Tableflow",
    line: "Restaurant ordering, from the guest's phone to the kitchen printer.",
    problem:
      "A restaurant's orders come from three places — the table, the counter and delivery — and every one of them has to reach the kitchen without getting lost on a Saturday night.",
    built: [
      "A mobile-first menu that guests open from the QR code on the table and order from directly",
      "Orders that print in the kitchen on thermal paper, with floor, counter and delivery in one queue",
      "Subscription billing on Stripe and the marketing site that sells the product",
    ],
    result:
      "Paying restaurants run their service on it. I own it end to end — product, UI, deploys and support.",
    stack: "Next.js · TypeScript · Tailwind · Stripe · AWS",
    url: { href: "https://tableflow.software", label: "tableflow.software" },
    shot: {
      file: "tableflow-home-1440.png",
      alt: "Tableflow's home page",
      domain: "tableflow.software",
      w: 1186,
      h: 932,
    },
  },
  {
    id: "vapti",
    kind: "My own product · invite-only beta",
    when: "2026 → now",
    name: "Vapti",
    line: "A storefront where browsing, booking and paying happen inside the chat.",
    problem:
      "Small businesses sell through chat, but their catalogue, stock, quotes and payments live in other tools. Every sale meant switching between them by hand.",
    built: [
      "A mobile-first storefront catalogue with real-time chat beside it",
      "Booking, quotes with an approval flow and in-browser PDF export, and payment without leaving the conversation",
      "Subscriptions for merchants' own products, from weekly to yearly cycles",
    ],
    result:
      "I chose a rule-based auto-reply over an LLM call per message: it answers from live store data — stock, prices, installments — and keeps the cost per message near zero.",
    stack: "Next.js · TypeScript · Tailwind · Node.js · MongoDB · Redis",
    url: { href: "https://vapti.chat", label: "vapti.chat" },
  },
  {
    id: "checkout",
    kind: "Client contract",
    when: "2026",
    name: "High-value checkout",
    line: "A hosted checkout for a real-estate firm paid from the US and Mexico.",
    problem:
      "Legitimate high-value payments were being blocked as fraud at checkout, and every blocked payment was revenue the client lost.",
    built: [
      "The hosted checkout and the admin panel for creating payment links",
      "Stripe in multiple currencies and GetNet for domestic cards, in a single flow",
      "Mandatory 3-D Secure and better fraud signals sent to Stripe Radar",
    ],
    result:
      "Fewer false fraud blocks on legitimate payments. I also caught and mitigated a card-testing attack while payments were due the same day.",
    stack: "Next.js · TypeScript · Stripe Elements · Vercel",
  },
  {
    id: "livia",
    kind: "Client site",
    name: "Lívia Lacerda Advocacia",
    line: "A law firm's site, built from the client's own brand.",
    problem:
      "A law practice in João Pessoa needed a site that looked like her firm, not like a template every other firm had already bought.",
    built: [
      "An identity built from her existing brand — type, palette and tone — with no purchased theme",
      "Services, articles and contact pages, responsive and mobile-first",
      "WhatsApp contact one tap away on every page",
    ],
    result:
      "A site that reads as her firm and nobody else's, with contact one tap away on a phone.",
    stack: "Next.js · TypeScript · Tailwind",
    shot: {
      file: "livialacerdaadvocacia.png",
      alt: "Home page of lawyer Lívia Lacerda's website",
      w: 1357,
      h: 936,
    },
  },
];
