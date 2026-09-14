export type Locale = "pt" | "en";

/* ─────────────────────────────────────────────────────────────────────
   Dados independentes de idioma
   ──────────────────────────────────────────────────────────────────── */

/** Comanda de 32 colunas — o mesmo layout que sai em papel de 58 mm. */
export const RECEIPT_LINES: { text: string; kind?: "hi" | "tot" }[] = [
  { text: "================================" },
  { text: "      TABLEFLOW  ·  PEDIDO      ", kind: "hi" },
  { text: "================================" },
  { text: "MESA 07          14/09/26 20:41" },
  { text: "--------------------------------" },
  { text: "2x Pizza Margherita     R$ 89,80" },
  { text: "1x Coca-Cola 350ml       R$ 7,00" },
  { text: "1x Pudim de leite       R$ 14,50" },
  { text: "--------------------------------" },
  { text: "SUBTOTAL               R$ 111,30" },
  { text: "TAXA SERVICO 10%        R$ 11,13" },
  { text: "================================" },
  { text: "TOTAL                  R$ 122,43", kind: "tot" },
  { text: "================================" },
  { text: " " },
  { text: "  PEDIDO VIA QR CODE · MESA 07  ", kind: "hi" },
  { text: "       tableflow.software       " },
];

/** Comandos ESC/POS reais, na ordem em que a comanda é montada. */
export const BYTES: { hex: string; cmd: string }[] = [
  { hex: "1B 40", cmd: "ESC @" },
  { hex: "1B 61 01", cmd: "ESC a 1" },
  { hex: "1D 21 11", cmd: "GS ! 17" },
  { hex: "1B 45 01", cmd: "ESC E 1" },
  { hex: "1B 61 00", cmd: "ESC a 0" },
  { hex: "1D 21 00", cmd: "GS ! 0" },
  { hex: "1B 64 04", cmd: "ESC d 4" },
  { hex: "1D 56 41 10", cmd: "GS V A 16" },
];

export const PROJECTS: {
  id: string;
  url?: string;
  tags: string[];
  live: boolean;
}[] = [
  {
    id: "tableflow",
    url: "https://tableflow.software",
    tags: ["Next.js", "TypeScript", "Stripe", "AWS", "ESC/POS"],
    live: true,
  },
  {
    id: "servin",
    tags: ["Next.js", "Node.js", "MongoDB", "AWS"],
    live: false,
  },
  {
    id: "tijolo",
    url: "https://valeotijolo.com.br",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    live: true,
  },
  {
    id: "gateway",
    tags: ["Next.js", "Stripe", "Radar", "Webhooks"],
    live: true,
  },
  { id: "lith1um", tags: ["Next.js", "TypeScript", "ERP"], live: false },
  { id: "copa", tags: ["Next.js", "IA", "Stripe"], live: true },
];

export const SECTIONS = [
  "hero",
  "build",
  "print",
  "work",
  "about",
  "path",
  "contact",
] as const;

export type SectionId = (typeof SECTIONS)[number];

export const LINKS = {
  email: "mthsqrz97@gmail.com",
  linkedin: "https://www.linkedin.com/in/matheus-oliveira-a35618322",
  github: "https://github.com/matheus-qrz",
};

/* ─────────────────────────────────────────────────────────────────────
   Conteúdo por idioma
   ──────────────────────────────────────────────────────────────────── */

export interface Content {
  nav: Record<Exclude<SectionId, "hero">, string>;
  navLabel: Record<SectionId, string>;
  status: string;
  hero: {
    meta: string[];
    headline: string;
    sub: string;
    ctaTalk: string;
    ctaWork: string;
    shotCaption: string;
    railLabel: string;
    rail: Record<string, string>;
  };
  build: {
    eyebrow: string;
    h: string;
    lede: string;
    rows: { layer: string; tool: string; role: string }[];
  };
  print: {
    eyebrow: string;
    h: string;
    lede: string;
    paper: string;
    note: string;
    bytes: string[];
  };
  work: {
    eyebrow: string;
    h: string;
    items: Record<
      string,
      { name: string; host: string; desc: string; state: string }
    >;
  };
  about: { eyebrow: string; caption: string; paras: string[] };
  path: {
    eyebrow: string;
    h: string;
    roles: { when: string; role: string; org: string; desc: string }[];
  };
  contact: { eyebrow: string; h: string; lede: string };
  footerMid: string;
}

const pt: Content = {
  nav: {
    build: "Stack",
    print: "Demo",
    work: "Projetos",
    about: "Sobre",
    path: "Trajetória",
    contact: "Contato",
  },
  navLabel: {
    hero: "INÍCIO",
    build: "STACK",
    print: "COMANDA",
    work: "PROJETOS",
    about: "SOBRE",
    path: "TRAJETÓRIA",
    contact: "CONTATO",
  },
  status: "Disponível · remoto",
  hero: {
    meta: [
      "Matheus Oliveira",
      "Engenheiro de software",
      "João Pessoa, PB",
      "UTC−3",
    ],
    headline: "Construo os sistemas que os negócios **usam para funcionar**.",
    sub: "Não as páginas que eles usam para se apresentar. Pedido por QR code na mesa, comanda saindo na impressora térmica da cozinha, cobrança recorrente no Stripe.",
    ctaTalk: "Falar comigo",
    ctaWork: "Ver os projetos",
    shotCaption: "Tableflow · KDS — a tela que a cozinha olha durante o serviço",
    railLabel: "Produtos que eu construí e mantenho",
    rail: {
      tableflow: "restaurantes",
      servin: "hotelaria",
      tijolo: "imobiliário",
      copa: "geração por IA",
    },
  },
  build: {
    eyebrow: "Manifesto de build",
    h: "O que entra em cada camada",
    lede: "Uma stack pequena, escolhida para durar. Nada aqui está na lista porque eu li sobre — está porque tem algo meu em produção usando.",
    rows: [
      {
        layer: "Interface",
        tool: "React 19 · Next.js 15",
        role: "App Router, server components, streaming",
      },
      {
        layer: "Estilo",
        tool: "Tailwind CSS v4",
        role: "Tokens e design system próprio por produto",
      },
      {
        layer: "Contratos",
        tool: "TypeScript · Zod",
        role: "Validação da borda até o banco",
      },
      {
        layer: "Estado",
        tool: "React Query · Zustand",
        role: "Cache de servidor separado do estado de tela",
      },
      {
        layer: "Servidor",
        tool: "Node.js · Express · MongoDB",
        role: "APIs, workers e filas de impressão",
      },
      {
        layer: "Infra",
        tool: "AWS S3 · CloudFront · SES",
        role: "Mídia, entrega e e-mail transacional",
      },
      {
        layer: "Deploy",
        tool: "Vercel · Railway",
        role: "Preview por PR, worker sempre de pé",
      },
      {
        layer: "Dinheiro",
        tool: "Stripe",
        role: "Assinaturas, webhooks, faturas e inadimplência",
      },
      {
        layer: "Hardware",
        tool: "ESC/POS · 58 / 80 mm",
        role: "Impressora térmica falando direto com o backend",
      },
      {
        layer: "Fluxo",
        tool: "Claude Code",
        role: "Spec escrita antes, PR revisado depois",
      },
    ],
  },
  print: {
    eyebrow: "Demonstração ao vivo",
    h: "Role para imprimir a comanda",
    lede: "Todo pedido feito pelo QR code da mesa termina aqui: uma sequência de bytes ESC/POS saindo em papel de 58 mm na cozinha. Este é o mesmo layout de 32 colunas que roda no Tableflow.",
    paper: "Papel 58 mm · 32 colunas",
    note: "Quando a impressora cai no meio do serviço, o pedido não pode sumir. A fila fica no worker, com retry e confirmação — o garçom nunca descobre que houve falha.",
    bytes: [
      "Inicializa a impressora",
      "Centraliza o cabeçalho",
      "Dobra largura e altura da fonte",
      "Liga o negrito",
      "Volta a alinhar à esquerda",
      "Fonte normal para os itens",
      "Avança quatro linhas",
      "Corta o papel",
    ],
  },
  work: {
    eyebrow: "Projetos",
    h: "Coisas que outras pessoas usam",
    items: {
      tableflow: {
        name: "Tableflow",
        host: "tableflow.software ↗",
        desc: "SaaS de gestão para restaurantes. Pedido por QR code na mesa, delivery e balcão, impressão térmica na cozinha, relatórios e cobrança recorrente.",
        state: "Em produção",
      },
      servin: {
        name: "Servin",
        host: "SaaS próprio",
        desc: "Gestão para hotéis e pousadas. O hóspede pede serviço pelo QR do quarto, a recepção acompanha tudo num painel só, o setor responsável recebe impresso.",
        state: "Em implantação",
      },
      tijolo: {
        name: "Vale o Tijolo?",
        host: "valeotijolo.com.br ↗",
        desc: "Calculadora para quem está decidindo entre comprar e alugar no Brasil. Ferramenta paga, estática, sem backend — carrega instantâneo e não tem o que quebrar.",
        state: "Em produção",
      },
      gateway: {
        name: "Gateway de pagamentos personalizados",
        host: "checkout sob medida",
        desc: "Checkout próprio em Next.js sobre Stripe, com sinais de antifraude do Radar, conversão de moeda e conciliação. Dinheiro de verdade passando, então zero improviso.",
        state: "Em produção",
      },
      lith1um: {
        name: "LITH1UM",
        host: "projeto de cliente",
        desc: "Landing page e ERP interno para uma empresa de mobilidade elétrica: catálogo, pedidos, estoque e o fluxo comercial no mesmo lugar.",
        state: "Em desenvolvimento",
      },
      copa: {
        name: "Copa AI",
        host: "micro-SaaS",
        desc: "Micro-SaaS que transforma a foto do usuário em figurinha da Copa 2026. Pipeline de geração por IA, pagamento avulso e entrega em segundos.",
        state: "Concluído",
      },
    },
  },
  about: {
    eyebrow: "Sobre",
    caption: "João Pessoa · PB · UTC−3",
    paras: [
      "Sou **engenheiro frontend na Wisecare**, uma plataforma de telessaúde, onde trabalho no produto principal com React 19, Next.js e um design system interno. Fora do expediente, toco meus próprios SaaS e alguns projetos de cliente — arquitetura, deploy, cobrança e suporte, tudo meu.",
      "Isso significa que eu já fui acordado por webhook do Stripe falhando às duas da manhã, já reescrevi fila de impressão porque o restaurante perdeu pedido no sábado à noite, e já expliquei para dono de pousada por que o sistema estava certo e o processo dele não. **Eu não entrego o código e sumo** — eu fico com a operação.",
      "Uso **Claude Code** todo dia, com uma regra: especificação escrita antes, PR revisado linha por linha depois. Modelo é acelerador, não é dono da decisão.",
    ],
  },
  path: {
    eyebrow: "Trajetória",
    h: "Cinco anos entregando",
    roles: [
      {
        when: "2021 → hoje",
        role: "Desenvolvedor frontend",
        org: "Wisecare",
        desc: "Frontend do produto principal de telessaúde em React 19 e Next.js, sobre um design system interno. Trabalho diário com design e backend em várias linhas de produto.",
      },
      {
        when: "2023 → hoje",
        role: "Fundador e desenvolvedor",
        org: "Independente",
        desc: "SaaS próprios e projetos de cliente, do primeiro commit ao faturamento. Frontend, backend, infraestrutura, pagamento e a conversa difícil com o cliente.",
      },
      {
        when: "2021 → 2024",
        role: "Desenvolvedor frontend",
        org: "Netfans",
        desc: "Frontend do produto em React 18 e salas virtuais com áudio 8D para experiências de entretenimento ao vivo.",
      },
    ],
  },
  contact: {
    eyebrow: "Contato",
    h: "Se você tem uma operação que precisa de software, e não um site que precisa de enfeite — me chama.",
    lede: "Aberto a vagas remotas e a um número pequeno de projetos por vez. Respondo em até um dia útil.",
  },
  footerMid: "Next.js · GSAP · Lenis",
};

const en: Content = {
  nav: {
    build: "Stack",
    print: "Demo",
    work: "Work",
    about: "About",
    path: "Track record",
    contact: "Contact",
  },
  navLabel: {
    hero: "INDEX",
    build: "STACK",
    print: "PRINT",
    work: "WORK",
    about: "ABOUT",
    path: "PATH",
    contact: "CONTACT",
  },
  status: "Available · remote",
  hero: {
    meta: [
      "Matheus Oliveira",
      "Software engineer",
      "João Pessoa, Brazil",
      "UTC−3",
    ],
    headline: "I build the systems businesses **actually run on**.",
    sub: "Not the pages they introduce themselves with. Orders placed by QR code at the table, tickets printing on the kitchen's thermal printer, recurring billing on Stripe.",
    ctaTalk: "Get in touch",
    ctaWork: "See the work",
    shotCaption: "Tableflow · KDS — the screen the kitchen watches through service",
    railLabel: "Products I built and maintain",
    rail: {
      tableflow: "restaurants",
      servin: "hospitality",
      tijolo: "real estate",
      copa: "AI generation",
    },
  },
  build: {
    eyebrow: "Build manifest",
    h: "What goes into each layer",
    lede: "A small stack, chosen to last. Nothing here is on the list because I read about it — it's here because something of mine runs on it in production.",
    rows: [
      {
        layer: "Interface",
        tool: "React 19 · Next.js 15",
        role: "App Router, server components, streaming",
      },
      {
        layer: "Styling",
        tool: "Tailwind CSS v4",
        role: "Tokens and a per-product design system",
      },
      {
        layer: "Contracts",
        tool: "TypeScript · Zod",
        role: "Validation from the edge down to the database",
      },
      {
        layer: "State",
        tool: "React Query · Zustand",
        role: "Server cache kept apart from screen state",
      },
      {
        layer: "Server",
        tool: "Node.js · Express · MongoDB",
        role: "APIs, workers and print queues",
      },
      {
        layer: "Infra",
        tool: "AWS S3 · CloudFront · SES",
        role: "Media, delivery and transactional email",
      },
      {
        layer: "Deploy",
        tool: "Vercel · Railway",
        role: "Preview per PR, worker always up",
      },
      {
        layer: "Money",
        tool: "Stripe",
        role: "Subscriptions, webhooks, invoices and dunning",
      },
      {
        layer: "Hardware",
        tool: "ESC/POS · 58 / 80 mm",
        role: "Thermal printer talking straight to the backend",
      },
      {
        layer: "Workflow",
        tool: "Claude Code",
        role: "Spec written first, PR reviewed after",
      },
    ],
  },
  print: {
    eyebrow: "Live demo",
    h: "Scroll to print the ticket",
    lede: "Every order placed from the table's QR code ends up here: a sequence of ESC/POS bytes coming out on 58 mm paper in the kitchen. This is the same 32-column layout running in Tableflow.",
    paper: "58 mm paper · 32 columns",
    note: "When the printer dies mid-service, the order cannot vanish. The queue lives in the worker, with retries and confirmation — the waiter never finds out anything failed.",
    bytes: [
      "Initialise the printer",
      "Centre the header",
      "Double the font width and height",
      "Turn bold on",
      "Back to left alignment",
      "Normal font for the line items",
      "Feed four lines",
      "Cut the paper",
    ],
  },
  work: {
    eyebrow: "Work",
    h: "Things other people use",
    items: {
      tableflow: {
        name: "Tableflow",
        host: "tableflow.software ↗",
        desc: "Restaurant management SaaS. QR code ordering at the table, delivery and counter, thermal printing in the kitchen, reporting and recurring billing.",
        state: "In production",
      },
      servin: {
        name: "Servin",
        host: "own SaaS",
        desc: "Management for hotels and guesthouses. Guests request service from the room's QR code, the front desk follows everything on one board, the right department gets it printed.",
        state: "Rolling out",
      },
      tijolo: {
        name: "Vale o Tijolo?",
        host: "valeotijolo.com.br ↗",
        desc: "A calculator for Brazilians deciding between buying and renting. Paid tool, fully static, no backend — loads instantly and has nothing to break.",
        state: "In production",
      },
      gateway: {
        name: "Custom payment gateway",
        host: "bespoke checkout",
        desc: "A custom Next.js checkout on top of Stripe, with Radar fraud signals, currency conversion and reconciliation. Real money moving, so nothing improvised.",
        state: "In production",
      },
      lith1um: {
        name: "LITH1UM",
        host: "client project",
        desc: "Landing page and internal ERP for an electric mobility company: catalogue, orders, stock and the sales flow in one place.",
        state: "In development",
      },
      copa: {
        name: "Copa AI",
        host: "micro-SaaS",
        desc: "Micro-SaaS turning a user's photo into a World Cup 2026 sticker. AI generation pipeline, one-off payment, delivery in seconds.",
        state: "Shipped",
      },
    },
  },
  about: {
    eyebrow: "About",
    caption: "João Pessoa · PB · UTC−3",
    paras: [
      "I'm a **frontend engineer at Wisecare**, a telehealth platform, where I work on the core product with React 19, Next.js and an internal design system. Outside those hours I run my own SaaS and a few client projects — architecture, deploys, billing and support, all mine.",
      "Which means I've been woken up by a failing Stripe webhook at two in the morning, rewritten a print queue because a restaurant lost an order on a Saturday night, and explained to a guesthouse owner why the system was right and his process wasn't. **I don't hand over the code and disappear** — I stay with the operation.",
      "I use **Claude Code** every day, with one rule: spec written first, PR reviewed line by line after. The model is an accelerator, not the one making the call.",
    ],
  },
  path: {
    eyebrow: "Track record",
    h: "Five years shipping",
    roles: [
      {
        when: "2021 → now",
        role: "Frontend developer",
        org: "Wisecare",
        desc: "Frontend of the core telehealth product in React 19 and Next.js, on an internal design system. Daily work with design and backend across several product lines.",
      },
      {
        when: "2023 → now",
        role: "Founder and developer",
        org: "Independent",
        desc: "Own SaaS products and client projects, from first commit to revenue. Frontend, backend, infrastructure, payments and the hard conversation with the client.",
      },
      {
        when: "2021 → 2024",
        role: "Frontend developer",
        org: "Netfans",
        desc: "Product frontend in React 18 and virtual rooms with 8D audio for live entertainment experiences.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    h: "If you have an operation that needs software, not a site that needs decoration — get in touch.",
    lede: "Open to remote roles and to a small number of projects at a time. I reply within one business day.",
  },
  footerMid: "Next.js · GSAP · Lenis",
};

export const content: Record<Locale, Content> = { pt, en };
