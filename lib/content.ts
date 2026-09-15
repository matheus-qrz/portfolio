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
  repo?: string;
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
    id: "meirendeu",
    url: "https://mei-rendeu.com.br",
    repo: "https://github.com/matheus-qrz/mei-rendeu",
    tags: ["Next.js", "WhatsApp", "IA", "Stripe", "Workers"],
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
    tags: ["Next.js", "TypeScript", "Tailwind", "PDF"],
    live: true,
  },
  {
    id: "gateway",
    tags: ["Next.js", "Stripe", "Radar", "Webhooks"],
    live: true,
  },
  {
    id: "livia",
    tags: ["Next.js 14", "TypeScript", "Tailwind", "Zustand"],
    live: true,
  },
  {
    id: "freelas",
    tags: ["Next.js", "TypeScript", "Monorepo"],
    live: false,
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
    domainsLabel: string;
    domains: { sector: string; what: string }[];
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
    lede: string;
    repo: string;
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
  contact: {
    eyebrow: string;
    h: string;
    lede: string;
    direct: string;
    form: {
      title: string;
      name: string;
      company: string;
      companyHint: string;
      email: string;
      need: string;
      needHint: string;
      submit: string;
      sending: string;
      okTitle: string;
      okBody: string;
      errTitle: string;
      errBody: string;
      privacy: string;
      required: string;
      badEmail: string;
      tooShort: string;
    };
  };
  footerMid: string;
}

const pt: Content = {
  nav: {
    build: "Stack",
    print: "Demo",
    work: "Projetos",
    about: "Sobre",
    path: "Trajetória",
    contact: "Orçamento",
  },
  navLabel: {
    hero: "INÍCIO",
    build: "STACK",
    print: "COMANDA",
    work: "PROJETOS",
    about: "SOBRE",
    path: "TRAJETÓRIA",
    contact: "ORÇAMENTO",
  },
  status: "Aceitando projetos",
  hero: {
    meta: [
      "Matheus Oliveira",
      "Engenheiro de software autônomo",
      "João Pessoa, PB",
    ],
    headline:
      "Todo negócio roda sobre uma regra que ninguém escreveu. Meu trabalho é **transformar isso em software**.",
    sub: "Restaurante, pousada, contabilidade de MEI, imobiliária, checkout de pagamento, site de escritório. Domínios diferentes, mesmo trabalho: entrar na operação, entender como ela realmente funciona e entregar um sistema que aguenta o dia a dia.",
    ctaTalk: "Pedir um orçamento",
    ctaWork: "Ver os projetos",
    domainsLabel: "Setores em que já entreguei",
    domains: [
      {
        sector: "Restaurante e bar",
        what: "Pedido por QR na mesa, comanda térmica na cozinha, assinatura mensal",
      },
      {
        sector: "Hotelaria",
        what: "Serviço de quarto por QR, operação por setor, QR impresso por quarto",
      },
      {
        sector: "Fiscal e MEI",
        what: "IA no WhatsApp que registra receita, lembra do DAS e avisa do teto",
      },
      {
        sector: "Imobiliário",
        what: "Comprar ou alugar, ITBI, cenários comparados e relatório em PDF",
      },
      {
        sector: "Pagamentos",
        what: "Checkout sob medida, antifraude, conversão de moeda, conciliação",
      },
      {
        sector: "Site institucional",
        what: "Escritório e negócio local: rápido, achável no Google, fácil de atualizar",
      },
    ],
    railLabel: "Produtos que eu construí e mantenho",
    rail: {
      tableflow: "restaurantes",
      meirendeu: "fiscal · MEI",
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
        role: "Validação da borda até o banco — inclusive no formulário aqui embaixo",
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
        layer: "Mensageria",
        tool: "WhatsApp · IA",
        role: "Conversa como interface, quando o cliente não quer mais um app",
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
    h: "Nove sistemas, seis setores",
    lede: "Produtos meus e projetos de cliente. A lista é a resposta para “você já fez algo parecido com o que eu preciso?”.",
    repo: "código",
    items: {
      tableflow: {
        name: "Tableflow",
        host: "tableflow.software ↗",
        desc: "SaaS de gestão para restaurantes. Pedido por QR code na mesa, delivery e balcão, impressão térmica na cozinha, relatórios e cobrança recorrente.",
        state: "Em produção",
      },
      meirendeu: {
        name: "MEI Rendeu",
        host: "mei-rendeu.com.br ↗",
        desc: "Assistente financeiro para microempreendedores que vive dentro do WhatsApp. A IA registra receita e despesa por mensagem de texto, categoriza sozinha, lembra do DAS e avisa quando o faturamento se aproxima do teto de R$ 81 mil. Sem app, sem planilha.",
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
        desc: "Calculadora para quem está decidindo entre comprar e alugar no Brasil. Compara cenários, considera ITBI e gera relatório em PDF. Ferramenta paga, estática, sem backend.",
        state: "Em produção",
      },
      gateway: {
        name: "Gateway de pagamentos personalizados",
        host: "checkout sob medida",
        desc: "Checkout próprio em Next.js sobre Stripe, com sinais de antifraude do Radar, conversão de moeda e conciliação. Dinheiro de verdade passando, então nada de improviso.",
        state: "Em produção",
      },
      livia: {
        name: "Lívia Lacerda Advocacia",
        host: "site institucional",
        desc: "Landing page para escritório de advocacia: serviços, depoimentos, blog, FAQ e contato. Tipografia em Cormorant Garamond e Jost, paleta em marrom e dourado definida a partir da identidade da cliente.",
        state: "Entregue",
      },
      freelas: {
        name: "Freelas",
        host: "ferramentas para autônomos",
        desc: "Monorepo de ferramentas para freelancers brasileiros: calculadora de precificação por hora, gerador de contrato e utilitários de rotina.",
        state: "Em desenvolvimento",
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
      "Sou **engenheiro de software autônomo**. Toco meus próprios SaaS e projetos de cliente do primeiro commit ao faturamento — arquitetura, deploy, cobrança e suporte, tudo meu. Em paralelo trabalho como desenvolvedor frontend júnior na Wisecare, uma plataforma de telessaúde, no produto principal em React 19 e Next.js sobre um design system interno.",
      "Isso significa que eu já fui acordado por webhook do Stripe falhando às duas da manhã, já reescrevi fila de impressão porque um restaurante perdeu pedido num sábado à noite, e já expliquei para dono de pousada por que o sistema estava certo e o processo dele não. **Eu não entrego o código e sumo** — eu fico com a operação.",
      "O que eu faço de melhor não é escrever código: é **entender um negócio que não é meu**. Cada setor tem uma regra que ninguém documentou — a taxa de serviço que muda no fim de semana, o teto do MEI que ninguém acompanha, o ITBI que entra na conta do financiamento. Achar essa regra e modelar direito é metade do trabalho.",
      "Uso **Claude Code** todo dia, com uma regra: especificação escrita antes, PR revisado linha por linha depois. Modelo é acelerador, não é dono da decisão.",
    ],
  },
  path: {
    eyebrow: "Trajetória",
    h: "Cinco anos entregando",
    roles: [
      {
        when: "2023 → hoje",
        role: "Engenheiro de software autônomo",
        org: "Independente",
        desc: "SaaS próprios e projetos de cliente, do primeiro commit ao faturamento. Frontend, backend, infraestrutura, pagamento e a conversa difícil com o cliente.",
      },
      {
        when: "2021 → hoje",
        role: "Desenvolvedor frontend júnior",
        org: "Wisecare",
        desc: "Produto principal de telessaúde em React 19 e Next.js, sobre um design system interno. Trabalho diário com design e backend em várias linhas de produto.",
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
    eyebrow: "Orçamento",
    h: "Me conta o que você precisa. Eu volto com um orçamento.",
    lede: "Sistema sob medida, produto novo do zero ou site que precisa existir direito. Respondo em até um dia útil, e a primeira conversa não custa nada.",
    direct: "Ou fale direto",
    form: {
      title: "Pedido de orçamento",
      name: "Seu nome",
      company: "Empresa",
      companyHint: "opcional",
      email: "E-mail",
      need: "O que você precisa",
      needHint:
        "Conte o problema, não a solução. Que trabalho é feito na mão hoje? O que quebra com mais frequência? Quanto mais concreto, mais útil o orçamento.",
      submit: "Pedir orçamento",
      sending: "Enviando…",
      okTitle: "Recebido.",
      okBody:
        "Sua mensagem chegou. Eu respondo em até um dia útil, no e-mail que você informou.",
      errTitle: "Não consegui enviar.",
      errBody:
        "Alguma coisa falhou no caminho. Tente de novo em instantes, ou escreva direto para mthsqrz97@gmail.com.",
      privacy:
        "Uso esses dados só para responder você. Não entram em lista, não vão para terceiros.",
      required: "Campo obrigatório",
      badEmail: "E-mail inválido",
      tooShort: "Conte um pouco mais — pelo menos 20 caracteres",
    },
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
    contact: "Get a quote",
  },
  navLabel: {
    hero: "INDEX",
    build: "STACK",
    print: "PRINT",
    work: "WORK",
    about: "ABOUT",
    path: "PATH",
    contact: "QUOTE",
  },
  status: "Taking on projects",
  hero: {
    meta: [
      "Matheus Oliveira",
      "Independent software engineer",
      "João Pessoa, Brazil",
    ],
    headline:
      "Every business runs on a rule nobody wrote down. I **turn it into software**.",
    sub: "Restaurants, guesthouses, sole-trader bookkeeping, real estate, payment checkout, law firm sites. Different domains, same job: get inside the operation, work out how it actually runs, and ship a system that survives daily use.",
    ctaTalk: "Get a quote",
    ctaWork: "See the work",
    domainsLabel: "Sectors I have shipped in",
    domains: [
      {
        sector: "Restaurants & bars",
        what: "QR ordering at the table, thermal tickets in the kitchen, monthly billing",
      },
      {
        sector: "Hospitality",
        what: "Room service by QR, operations split by department, printed room codes",
      },
      {
        sector: "Tax & sole traders",
        what: "WhatsApp AI that logs revenue, chases tax dates and watches the ceiling",
      },
      {
        sector: "Real estate",
        what: "Buy or rent, transfer tax, side-by-side scenarios and a PDF report",
      },
      {
        sector: "Payments",
        what: "Bespoke checkout, fraud signals, currency conversion, reconciliation",
      },
      {
        sector: "Marketing sites",
        what: "Firms and local businesses: fast, findable on Google, simple to update",
      },
    ],
    railLabel: "Products I built and maintain",
    rail: {
      tableflow: "restaurants",
      meirendeu: "tax · sole traders",
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
        role: "Validation from the edge down — including the form below",
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
        layer: "Messaging",
        tool: "WhatsApp · AI",
        role: "Conversation as the interface, when nobody wants another app",
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
    h: "Nine systems, six sectors",
    lede: "My own products and client projects. The list is the answer to “have you built anything like what I need?”.",
    repo: "code",
    items: {
      tableflow: {
        name: "Tableflow",
        host: "tableflow.software ↗",
        desc: "Restaurant management SaaS. QR code ordering at the table, delivery and counter, thermal printing in the kitchen, reporting and recurring billing.",
        state: "In production",
      },
      meirendeu: {
        name: "MEI Rendeu",
        host: "mei-rendeu.com.br ↗",
        desc: "A financial assistant for Brazilian sole traders that lives inside WhatsApp. The AI logs income and expenses from plain text messages, categorises them, chases the monthly tax deadline and warns when revenue approaches the legal ceiling. No app, no spreadsheet.",
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
        desc: "A calculator for Brazilians deciding between buying and renting. Compares scenarios, factors in transfer tax and generates a PDF report. Paid tool, fully static, no backend.",
        state: "In production",
      },
      gateway: {
        name: "Custom payment gateway",
        host: "bespoke checkout",
        desc: "A custom Next.js checkout on top of Stripe, with Radar fraud signals, currency conversion and reconciliation. Real money moving, so nothing improvised.",
        state: "In production",
      },
      livia: {
        name: "Lívia Lacerda Advocacia",
        host: "marketing site",
        desc: "Landing page for a law firm: services, testimonials, blog, FAQ and contact. Cormorant Garamond and Jost, with a brown and gold palette drawn from the client's own identity.",
        state: "Delivered",
      },
      freelas: {
        name: "Freelas",
        host: "tools for freelancers",
        desc: "A monorepo of tools for Brazilian freelancers: hourly pricing calculator, contract generator and everyday utilities.",
        state: "In development",
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
    caption: "João Pessoa · Brazil · UTC−3",
    paras: [
      "I'm an **independent software engineer**. I run my own SaaS products and client projects from first commit to revenue — architecture, deploys, billing and support, all mine. Alongside that I work as a junior frontend developer at Wisecare, a telehealth platform, on the core product in React 19 and Next.js over an internal design system.",
      "Which means I've been woken up by a failing Stripe webhook at two in the morning, rewritten a print queue because a restaurant lost an order on a Saturday night, and explained to a guesthouse owner why the system was right and his process wasn't. **I don't hand over the code and disappear** — I stay with the operation.",
      "What I'm best at isn't writing code: it's **understanding a business that isn't mine**. Every sector has a rule nobody wrote down — the service charge that changes at weekends, the tax ceiling nobody tracks, the transfer tax that belongs in the mortgage maths. Finding that rule and modelling it properly is half the job.",
      "I use **Claude Code** every day, with one rule: spec written first, PR reviewed line by line after. The model is an accelerator, not the one making the call.",
    ],
  },
  path: {
    eyebrow: "Track record",
    h: "Five years shipping",
    roles: [
      {
        when: "2023 → now",
        role: "Independent software engineer",
        org: "Self-employed",
        desc: "Own SaaS products and client projects, from first commit to revenue. Frontend, backend, infrastructure, payments and the hard conversation with the client.",
      },
      {
        when: "2021 → now",
        role: "Junior frontend developer",
        org: "Wisecare",
        desc: "Core telehealth product in React 19 and Next.js, on an internal design system. Daily work with design and backend across several product lines.",
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
    eyebrow: "Get a quote",
    h: "Tell me what you need. I'll come back with a quote.",
    lede: "A bespoke system, a new product from scratch, or a site that needs to exist properly. I reply within one business day, and the first conversation costs nothing.",
    direct: "Or reach me directly",
    form: {
      title: "Quote request",
      name: "Your name",
      company: "Company",
      companyHint: "optional",
      email: "Email",
      need: "What you need",
      needHint:
        "Describe the problem, not the solution. What is done by hand today? What breaks most often? The more concrete, the more useful the quote.",
      submit: "Request a quote",
      sending: "Sending…",
      okTitle: "Got it.",
      okBody:
        "Your message arrived. I'll reply within one business day, to the address you gave.",
      errTitle: "That didn't send.",
      errBody:
        "Something failed on the way. Try again in a moment, or write straight to mthsqrz97@gmail.com.",
      privacy:
        "I use these details only to reply to you. No lists, no third parties.",
      required: "Required field",
      badEmail: "Invalid email",
      tooShort: "Tell me a bit more — at least 20 characters",
    },
  },
  footerMid: "Next.js · GSAP · Lenis",
};

export const content: Record<Locale, Content> = { pt, en };
