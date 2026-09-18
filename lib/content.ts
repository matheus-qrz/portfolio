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

export interface Project {
  id: string;
  url?: string;
  repo?: string;
  tags: string[];
  live: boolean;
  /**
   * Existe uma captura em `public/shots/<id>.png`. Ligar esta flag é a
   * única coisa a fazer quando o print chega: nenhum componente muda.
   */
  shot?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "tableflow",
    url: "https://tableflow.software",
    tags: ["Next.js", "TypeScript", "Stripe", "AWS", "ESC/POS"],
    live: true,
    shot: true,
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
];

const OWN_PRODUCTS = new Set(["tableflow", "meirendeu", "servin", "tijolo"]);

/**
 * Os cinco produtos próprios, na ordem em que aparecem em PROJECTS.
 * Filtrar em vez de procurar id a id mantém uma lista só como fonte:
 * um id errado some do carrossel em vez de derrubar a página.
 */
export const SHOWCASE: Project[] = PROJECTS.filter((p) =>
  OWN_PRODUCTS.has(p.id),
);

/**
 * A ordem real da página, de cima para baixo. Lógica de página de venda:
 * gancho, prova, pedido, e só depois o detalhe para quem quiser mais.
 * Tudo que numera ou navega seção deriva daqui.
 */
export const SECTIONS = [
  "hero",
  "showcase",
  "contact",
  "work",
  "print",
  "about",
  "path",
] as const;

export type SectionId = (typeof SECTIONS)[number];
export type NavId = Exclude<SectionId, "hero">;

/** Seções navegáveis: a página inteira menos o topo. */
export const NAV_ITEMS: NavId[] = SECTIONS.filter(
  (id): id is NavId => id !== "hero",
);

/**
 * O "03 / 06" dos cabeçalhos. Derivado da ordem acima em vez de escrito
 * à mão em cada componente — reordenar a página não deixa mais a
 * numeração mentindo.
 */
export function sectionIndex(id: NavId): string {
  const total = String(NAV_ITEMS.length).padStart(2, "0");
  return `${String(NAV_ITEMS.indexOf(id) + 1).padStart(2, "0")} / ${total}`;
}

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
  /** Os quatro itens do menu novo. Independente de SECTIONS. */
  menu: { sites: string; software: string; work: string; about: string };
  /** Botão sempre visível no header. */
  quoteCta: string;
  whatsapp: { label: string; aria: string; message: string };
  status: string;
  hero: {
    meta: string[];
    /** Título em linhas já quebradas à mão: cada uma é uma máscara. */
    lines: string[];
    /** Chamada logo abaixo; o trecho entre ** ** é o hiperquadro. */
    kicker: string;
    sub: string;
    ctaTalk: string;
    ctaWork: string;
    domainsLabel: string;
    domains: { sector: string; what: string }[];
    railLabel: string;
    rail: Record<string, string>;
  };
  showcase: {
    eyebrow: string;
    h: string;
    lede: string;
    sectors: Record<string, string>;
    blurbs: Record<string, string>;
    visit: string;
    repo: string;
    prev: string;
    next: string;
    pick: string;
    noShot: string;
    counter: string;
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
  footer: { line: string; cta: string };
}

const pt: Content = {
  nav: {
    showcase: "Produtos",
    contact: "Orçamento",
    work: "Projetos",
    print: "Demo",
    about: "Sobre",
    path: "Trajetória",
  },
  navLabel: {
    hero: "INÍCIO",
    showcase: "PRODUTOS",
    contact: "ORÇAMENTO",
    work: "PROJETOS",
    print: "COMANDA",
    about: "SOBRE",
    path: "TRAJETÓRIA",
  },
  menu: {
    sites: "Sites",
    software: "Sistemas",
    work: "Trabalho",
    about: "Sobre",
  },
  quoteCta: "Pedir orçamento",
  whatsapp: {
    label: "WhatsApp",
    aria: "Falar no WhatsApp",
    message:
      "Oi, Matheus! Vim pelo seu site e queria falar sobre um projeto.",
  },
  status: "Aceitando projetos",
  hero: {
    meta: [
      "Matheus Oliveira",
      "Engenheiro de software autônomo",
      "João Pessoa, PB",
    ],
    lines: ["Todo negócio roda", "sobre uma regra que", "ninguém escreveu."],
    kicker: "Meu trabalho é transformar isso em **software**.",
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
  showcase: {
    eyebrow: "Produtos próprios",
    h: "Cinco sistemas que eu construí e mantenho",
    lede: "Não são estudos de caso de agência. São produtos meus, com cliente pagando, servidor de pé e o suporte comigo. Cada um começou numa regra que o setor nunca escreveu em lugar nenhum.",
    sectors: {
      tableflow: "Restaurante e bar",
      meirendeu: "Fiscal · MEI",
      servin: "Hotelaria",
      tijolo: "Imobiliário",
      copa: "Geração por IA",
    },
    blurbs: {
      tableflow:
        "O cliente senta, lê o QR da mesa e pede sozinho. O pedido cai impresso na cozinha em papel térmico de 58 mm, na comanda de 32 colunas, e aparece no painel do salão no mesmo instante. Balcão e delivery entram na mesma fila. No fim do mês o restaurante recebe o relatório de venda por item e a assinatura é cobrada no cartão sem eu tocar em nada. É onde tudo que eu aprendi sobre operação de restaurante está escrito em código.",
      meirendeu:
        "O microempreendedor manda “vendi 300 hoje” no WhatsApp e acabou: a IA entende, categoriza, lança no caixa e guarda. No dia 15 ela lembra do DAS. Quando o faturamento do ano encosta no teto de R$ 81 mil, ela avisa antes de virar problema com a Receita. Sem instalar app, sem planilha, sem aprender a usar nada — a interface é a conversa que ele já tem no bolso.",
      servin:
        "Pousada e hotel têm o mesmo gargalo: o hóspede liga para a recepção e a recepção vira telefonista. Aqui ele lê o QR do quarto e pede direto. O chamado vai para o setor certo — cozinha, governança, manutenção — e sai impresso lá dentro. A recepção acompanha tudo num painel só e para de ser intermediária de cada pedido de toalha.",
      tijolo:
        "Comprar ou alugar é a maior decisão financeira da vida da maioria das pessoas, e quase todo mundo decide no achismo. A calculadora compara os dois cenários com juros, ITBI, custo de oportunidade da entrada e valorização do imóvel, e devolve um relatório em PDF que dá para levar ao banco. Ferramenta paga, estática, sem backend: carrega em segundos e não tem servidor para cair.",
    },
    visit: "Abrir o site",
    repo: "Ver o código",
    prev: "Produto anterior",
    next: "Próximo produto",
    pick: "Escolher produto",
    noShot: "Captura a caminho",
    counter: "Produto",
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
        when: "2022 → hoje",
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
  footer: {
    line: "Se alguma coisa aqui se parece com o seu problema, o formulário está logo acima.",
    cta: "Pedir um orçamento",
  },
};

const en: Content = {
  nav: {
    showcase: "Products",
    contact: "Get a quote",
    work: "Work",
    print: "Demo",
    about: "About",
    path: "Track record",
  },
  navLabel: {
    hero: "INDEX",
    showcase: "PRODUCTS",
    contact: "QUOTE",
    work: "WORK",
    print: "PRINT",
    about: "ABOUT",
    path: "PATH",
  },
  menu: {
    sites: "Websites",
    software: "Software",
    work: "Work",
    about: "About",
  },
  quoteCta: "Get a quote",
  whatsapp: {
    label: "WhatsApp",
    aria: "Message me on WhatsApp",
    message: "Hi Matheus! I found your site and I'd like to talk about a project.",
  },
  status: "Taking on projects",
  hero: {
    meta: [
      "Matheus Oliveira",
      "Independent software engineer",
      "João Pessoa, Brazil",
    ],
    lines: ["Every business runs", "on a rule nobody", "ever wrote down."],
    kicker: "I turn that into **software**.",
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
  showcase: {
    eyebrow: "My own products",
    h: "Five systems I built and still run",
    lede: "These aren't agency case studies. They're my products, with paying customers, servers I keep up and support that comes to me. Each one started from a rule its sector had never written down.",
    sectors: {
      tableflow: "Restaurants & bars",
      meirendeu: "Tax · sole traders",
      servin: "Hospitality",
      tijolo: "Real estate",
      copa: "AI generation",
    },
    blurbs: {
      tableflow:
        "A guest sits down, scans the QR code on the table and orders without waiting for anyone. The order prints in the kitchen on 58 mm thermal paper, in the 32-column ticket layout, and lands on the floor dashboard at the same moment. Counter and delivery join the same queue. At month end the restaurant gets per-item sales reporting and the subscription charges itself. It's where everything I've learned about running a restaurant is written down as code.",
      meirendeu:
        "A sole trader texts “sold 300 today” on WhatsApp and that's it: the AI parses it, categorises it, books it and keeps it. On the 15th it chases the monthly tax. When the year's revenue approaches the R$81k legal ceiling, it says so before that becomes a problem with the tax office. No app to install, no spreadsheet, nothing new to learn — the interface is the conversation already in their pocket.",
      servin:
        "Guesthouses and hotels share one bottleneck: the guest calls the front desk, and the front desk becomes a switchboard. Here the guest scans the room's QR code and asks directly. The request routes to the right department — kitchen, housekeeping, maintenance — and prints there. The front desk watches everything on one board instead of relaying every towel request.",
      tijolo:
        "Buying versus renting is the biggest financial decision most people ever make, and almost everyone makes it on a hunch. The calculator compares both scenarios with interest, transfer tax, the opportunity cost of the deposit and property appreciation, then returns a PDF report you can take to the bank. Paid tool, fully static, no backend: it loads in seconds and has no server to fall over.",
      copa:
        "A short-cycle micro-SaaS: the user uploads a photo, pays once and gets their own World Cup 2026 sticker back in seconds. All the value is in the pipeline — the AI generation queue, image handling, delivery and one-off billing — running fast enough that nobody abandons halfway.",
    },
    visit: "Open the site",
    repo: "See the code",
    prev: "Previous product",
    next: "Next product",
    pick: "Pick a product",
    noShot: "Screenshot on the way",
    counter: "Product",
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
        when: "2022 → now",
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
  footer: {
    line: "If any of this looks like your problem, the form is just above.",
    cta: "Get a quote",
  },
};

export const content: Record<Locale, Content> = { pt, en };
