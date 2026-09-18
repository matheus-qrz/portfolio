export type Locale = "pt" | "en";

/* ─────────────────────────────────────────────────────────────────────
   Dados independentes de idioma
   ──────────────────────────────────────────────────────────────────── */

/**
 * A ordem real da página, de cima para baixo. `hero` e `work` vivem os
 * dois dentro da queda: `work` é a âncora do primeiro projeto, não uma
 * seção própria.
 */
export const SECTIONS = [
  "hero",
  "work",
  "sites",
  "software",
  "proof",
  "orcamento",
  "about",
] as const;

export type SectionId = (typeof SECTIONS)[number];

export const LINKS = {
  email: "mthsqrz97@gmail.com",
  linkedin: "https://www.linkedin.com/in/matheus-oliveira-a35618322",
  github: "https://github.com/matheus-qrz",
};

/* ── a queda ───────────────────────────────────────────────────────────
   Todo item da cena — bloco de texto ou print — carrega os mesmos
   parâmetros. O loop do `Fall` não sabe o que está movendo: lê estes
   números e escreve transform e opacity.
   ──────────────────────────────────────────────────────────────────── */

export interface FallParams {
  /** Momento, de 0 a 1, em que o item cruza o centro da tela. */
  t: number;
  /**
   * Velocidade relativa ao texto. 1 anda junto com a leitura; acima de 1
   * é um objeto perto, que passa voando; abaixo de 1 é um objeto longe,
   * que demora a atravessar. É daqui que vem a profundidade.
   */
  s: number;
  /** Deslocamento a partir do centro, em vw e vh, no desktop. */
  x: number;
  y: number;
  /** O mesmo, abaixo de 900px, onde não cabe o mesmo espalhamento. */
  xm: number;
  ym: number;
  /** Rotação em repouso e rotação acumulada por tela percorrida, em graus. */
  r: number;
  rr: number;
  /** Amplitude do balanço lateral, em px. */
  sway: number;
  /** Item de fundo: escala 0,78 e opacidade multiplicada por 0,82. */
  far?: boolean;
  /** Esmaece ao se afastar do centro. Texto sempre; print, quase sempre. */
  fade?: boolean;
}

export interface FallShot extends FallParams {
  /** Nome do arquivo em `public/shots/`. */
  file: string;
  kind: "desk" | "phone";
  /**
   * O arquivo existe de verdade. Sem a flag o print não entra na cena —
   * e não entra caixa vazia no lugar dele.
   */
  shot?: boolean;
  alt: Record<Locale, string>;
}

export interface FallProject {
  id: string;
  url?: string;
  /** Movimento do bloco de texto. Sempre `s: 1`: é o ritmo da leitura. */
  text: FallParams;
  shots: FallShot[];
}

/** Movimento do título de abertura, no topo da queda. */
export const FALL_HERO: FallParams = {
  /* Zero: no topo da página o título tem de estar centrado, não já em
     movimento. Ele sobe assim que a rolagem começa. */
  t: 0,
  s: 1,
  x: 0,
  y: 0,
  xm: 0,
  ym: 0,
  r: 0,
  rr: 0,
  sway: 0,
  fade: true,
};

/**
 * Os quatro projetos, na ordem em que o visitante passa por eles. Os
 * `t` estão espaçados para que o último termine antes das nuvens
 * começarem a sair (P = 0,74) e a cidade subir (P = 0,78).
 */
export const FALL: FallProject[] = [
  {
    id: "livia",
    text: {
      t: 0.19,
      s: 1,
      x: -26,
      y: 0,
      xm: 0,
      ym: 16,
      r: 0,
      rr: 0,
      sway: 0,
      fade: true,
    },
    shots: [
      {
        file: "livia-home-1440.png",
        kind: "desk",
        t: 0.19,
        s: 1.32,
        x: 20,
        y: -6,
        xm: 0,
        ym: -22,
        r: -4,
        rr: 3,
        sway: 26,
        fade: true,
        alt: {
          pt: "Página inicial do site da advogada Lívia Lacerda",
          en: "Home page of lawyer Lívia Lacerda's website",
        },
      },
      {
        file: "livia-servicos-390.png",
        kind: "phone",
        t: 0.225,
        s: 0.78,
        x: 40,
        y: 16,
        xm: 30,
        ym: 26,
        r: 7,
        rr: -5,
        sway: 18,
        far: true,
        fade: true,
        alt: {
          pt: "Página de serviços do site, vista no celular",
          en: "The site's services page, seen on a phone",
        },
      },
    ],
  },
  {
    id: "tableflow",
    url: "https://tableflow.software",
    text: {
      t: 0.36,
      s: 1,
      x: 24,
      y: 0,
      xm: 0,
      ym: 15,
      r: 0,
      rr: 0,
      sway: 0,
      fade: true,
    },
    shots: [
      {
        file: "tableflow-home-1440.png",
        kind: "desk",
        shot: true,
        t: 0.355,
        s: 1.28,
        x: -22,
        y: -8,
        xm: 0,
        ym: -22,
        r: 4,
        rr: -3,
        sway: 24,
        fade: true,
        alt: {
          pt: "Página inicial do Tableflow, o SaaS de gestão para restaurantes",
          en: "Tableflow's home page, the restaurant management SaaS",
        },
      },
      {
        file: "tableflow-cardapio-390.png",
        kind: "phone",
        t: 0.395,
        s: 0.8,
        x: -40,
        y: 14,
        xm: -30,
        ym: 26,
        r: -8,
        rr: 5,
        sway: 20,
        far: true,
        fade: true,
        alt: {
          pt: "Cardápio do Tableflow aberto pelo QR code da mesa",
          en: "Tableflow's menu opened from the QR code on the table",
        },
      },
    ],
  },
  {
    id: "lith1um",
    text: {
      t: 0.52,
      s: 1,
      x: -25,
      y: 0,
      xm: 0,
      ym: 16,
      r: 0,
      rr: 0,
      sway: 0,
      fade: true,
    },
    shots: [
      {
        file: "lith1um-home-1440.png",
        kind: "desk",
        t: 0.515,
        s: 1.3,
        x: 21,
        y: -7,
        xm: 0,
        ym: -23,
        r: -3,
        rr: 3,
        sway: 25,
        fade: true,
        alt: {
          pt: "Página inicial da LITH1UM, com o catálogo de veículos",
          en: "LITH1UM's home page, with the vehicle catalogue",
        },
      },
      {
        file: "lith1um-erp-1440.png",
        kind: "desk",
        t: 0.555,
        s: 0.76,
        x: 38,
        y: 15,
        xm: 28,
        ym: 25,
        r: 6,
        rr: -4,
        sway: 16,
        far: true,
        fade: true,
        alt: {
          pt: "ERP interno da LITH1UM, na tela de pedidos",
          en: "LITH1UM's internal ERP, on the orders screen",
        },
      },
    ],
  },
  {
    id: "meirendeu",
    url: "https://mei-rendeu.com.br",
    text: {
      t: 0.68,
      s: 1,
      x: 22,
      y: 0,
      xm: 0,
      ym: 14,
      r: 0,
      rr: 0,
      sway: 0,
      fade: true,
    },
    shots: [
      {
        file: "meirendeu-home-1440.png",
        kind: "desk",
        shot: true,
        t: 0.675,
        s: 1.24,
        x: -24,
        y: -4,
        xm: 0,
        ym: -21,
        r: 5,
        rr: -4,
        sway: 22,
        fade: true,
        alt: {
          pt: "Página inicial do MEI Rendeu, com a conversa do assistente no WhatsApp",
          en: "MEI Rendeu's home page, with the assistant's WhatsApp conversation",
        },
      },
      {
        file: "meirendeu-chat-390.png",
        kind: "phone",
        t: 0.715,
        s: 0.8,
        x: 40,
        y: 14,
        xm: 30,
        ym: 26,
        r: -7,
        rr: 5,
        sway: 18,
        far: true,
        fade: true,
        alt: {
          pt: "Conversa do MEI Rendeu no WhatsApp, lançando uma venda",
          en: "A MEI Rendeu WhatsApp conversation logging a sale",
        },
      },
    ],
  },
];

/* ── prova ─────────────────────────────────────────────────────────── */

export interface Testimonial {
  id: string;
  author: string;
  role: Record<Locale, string>;
  quote: Record<Locale, string>;
}

/**
 * Vazio de propósito. A seção de prova começa direto em "Outros
 * projetos" enquanto não houver depoimento real: placeholder de
 * depoimento é pior do que depoimento nenhum.
 */
export const TESTIMONIALS: Testimonial[] = [];

export interface OtherProject {
  id: string;
  url?: string;
}

export const OTHERS: OtherProject[] = [
  { id: "servin" },
  { id: "tijolo", url: "https://valeotijolo.com.br" },
  { id: "gateway" },
  { id: "freelas" },
];

/* ─────────────────────────────────────────────────────────────────────
   Conteúdo por idioma
   ──────────────────────────────────────────────────────────────────── */

export type QuoteKind = "site" | "sistema" | "indefinido";

/** A ordem em que as pílulas de tipo aparecem no formulário. */
export const QUOTE_KINDS_ORDER: QuoteKind[] = ["site", "sistema", "indefinido"];

export interface Content {
  menu: { sites: string; software: string; work: string; about: string };
  quoteCta: string;
  whatsapp: { label: string; aria: string; message: string };
  meta: { title: string; description: string };

  hero: {
    /** Título em linhas já quebradas à mão: cada uma é uma máscara. */
    lines: string[];
    sub: string;
    doors: {
      site: { label: string; hint: string };
      software: { label: string; hint: string };
    };
    scroll: string;
  };

  fall: {
    eyebrow: string;
    visit: string;
    projects: Record<
      string,
      { name: string; kind: string; line: string; stack: string }
    >;
  };

  sites: {
    eyebrow: string;
    h: string;
    lede: string;
    price: { value: string; note: string };
    includesLabel: string;
    includes: { title: string; items: string[] }[];
    stepsLabel: string;
    steps: { n: string; title: string; body: string }[];
    cta: string;
  };

  software: {
    eyebrow: string;
    h: string;
    lede: string;
    fronts: { title: string; body: string }[];
    scopeLine: string;
    cta: string;
  };

  proof: {
    eyebrow: string;
    h: string;
    lede: string;
    testimonialsLabel: string;
    othersLabel: string;
    visit: string;
    others: Record<string, { name: string; what: string; state: string }>;
  };

  quote: {
    eyebrow: string;
    h: string;
    lede: string;
    direct: string;
    form: {
      kindLabel: string;
      kinds: Record<QuoteKind, string>;
      name: string;
      company: string;
      email: string;
      phone: string;
      phoneHint: string;
      optional: string;
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
      tooLong: string;
    };
  };

  about: {
    eyebrow: string;
    h: string;
    caption: string;
    paras: string[];
    pathLabel: string;
    roles: { when: string; role: string; org: string; desc: string }[];
  };

  footer: { city: string };
}

const pt: Content = {
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
    message: "Oi, Matheus! Vim pelo seu site e queria falar sobre um projeto.",
  },
  meta: {
    title: "Matheus Oliveira — Sites e sistemas para o seu negócio",
    description:
      "Sites rápidos para negócios, a partir de R$ 800, e sistemas sob medida. Engenheiro de software em João Pessoa.",
  },

  hero: {
    lines: ["Do primeiro clique", "ao sistema que", "segura a operação."],
    sub: "Sou Matheus Oliveira, engenheiro de software em João Pessoa. Faço site para quem precisa ser encontrado e sistema sob medida para quem já não cabe mais na planilha.",
    doors: {
      site: {
        label: "Site para o seu negócio",
        hint: "A partir de R$ 800",
      },
      software: {
        label: "Sistema sob medida",
        hint: "Orçamento por projeto",
      },
    },
    scroll: "Role para descer",
  },

  fall: {
    eyebrow: "Trabalho",
    visit: "Abrir o site",
    projects: {
      livia: {
        name: "Lívia Lacerda Advocacia",
        kind: "Site institucional",
        line: "Escritório de advocacia em João Pessoa. Serviços, artigos e contato numa identidade construída a partir da marca da própria cliente — nada de tema comprado.",
        stack: "Next.js · TypeScript · Tailwind",
      },
      tableflow: {
        name: "Tableflow",
        kind: "SaaS próprio",
        line: "Gestão para restaurantes. O cliente pede pelo QR da mesa, a cozinha recebe impresso em papel térmico e o salão acompanha tudo num painel só. Balcão e delivery entram na mesma fila.",
        stack: "Next.js · Stripe · AWS",
      },
      lith1um: {
        name: "LITH1UM",
        kind: "Site e ERP",
        line: "Mobilidade elétrica: catálogo público na frente, pedidos, estoque e fluxo comercial atrás. Um sistema só, em vez de um site bonito e uma planilha escondida.",
        stack: "Next.js · TypeScript · Postgres",
      },
      meirendeu: {
        name: "MEI Rendeu",
        kind: "SaaS próprio",
        line: "Assistente fiscal que vive dentro do WhatsApp. O microempreendedor manda “vendi 300 hoje” e acabou: a IA lança, lembra do DAS e avisa antes do teto virar problema.",
        stack: "Next.js · WhatsApp · IA",
      },
    },
  },

  sites: {
    eyebrow: "Sites",
    h: "Um site que o seu cliente acha, entende e usa.",
    lede: "Site de negócio costuma falhar nas mesmas três coisas: demora para abrir, não aparece no Google e ninguém sabe atualizar depois que a agência some. Eu resolvo as três de uma vez.",
    price: {
      value: "A partir de R$ 800",
      note: "O valor final depende de quantas páginas são, do que precisa ser integrado e de quem escreve os textos. Não existe plano nem mensalidade obrigatória — manutenção mensal é opcional e contratada à parte.",
    },
    includesLabel: "O que costuma entrar",
    includes: [
      {
        title: "Estrutura",
        items: [
          "Até cinco páginas",
          "Domínio e hospedagem configurados",
          "Formulário que chega no seu e-mail",
          "WhatsApp a um toque",
        ],
      },
      {
        title: "Velocidade e busca",
        items: [
          "Abre em menos de dois segundos no celular",
          "Título, descrição e imagem de compartilhamento",
          "Sitemap e dados estruturados para o Google",
          "Analytics, se você quiser — ou nada",
        ],
      },
      {
        title: "Depois de publicar",
        items: [
          "Treinamento para você mesmo atualizar",
          "Trinta dias de ajuste incluídos",
          "O código é seu, sem amarra de plataforma",
          "Manutenção mensal opcional",
        ],
      },
    ],
    stepsLabel: "Como funciona",
    steps: [
      {
        n: "01",
        title: "Conversa",
        body: "Trinta minutos para entender o negócio, quem é o cliente e o que o site precisa resolver. Não custa nada e não vira compromisso.",
      },
      {
        n: "02",
        title: "Escopo e preço",
        body: "Você recebe por escrito o que entra, o que fica de fora, o prazo e o valor. Só começo depois do seu aceite.",
      },
      {
        n: "03",
        title: "Construção",
        body: "Você acompanha num link de prévia desde o primeiro dia e responde a cada entrega, em vez de esperar o final para ver.",
      },
      {
        n: "04",
        title: "No ar",
        body: "Publico no seu domínio, te mostro como atualizar e fico trinta dias por perto para os ajustes que só aparecem com o site rodando.",
      },
    ],
    cta: "Pedir orçamento de site",
  },

  software: {
    eyebrow: "Sistemas",
    h: "Quando a planilha já não dá conta.",
    lede: "Sistema sob medida é para quando o processo existe, funciona e não cabe mais em ferramenta de prateleira. Eu entro na operação, acho a regra que ninguém escreveu e devolvo software que aguenta o dia a dia.",
    fronts: [
      {
        title: "Operação interna",
        body: "Painéis, filas, estoque, pedidos. O que hoje é planilha compartilhada, grupo de WhatsApp e a memória de quem está há mais tempo na casa.",
      },
      {
        title: "Integração",
        body: "Pagamento, emissão fiscal, impressora, ERP, WhatsApp. Duas coisas que precisam conversar e nunca conversaram.",
      },
      {
        title: "Produto do zero",
        body: "Da ideia ao primeiro cliente pagando: arquitetura, cobrança recorrente, infraestrutura e o suporte que vem junto.",
      },
      {
        title: "Resgate de sistema",
        body: "Código herdado que ninguém entende e ninguém quer tocar. Leitura, testes em volta e mudanças que não derrubam o que já funciona.",
      },
    ],
    scopeLine:
      "Sistema não tem tabela de preço. Cada um começa por um **escopo escrito** — o que entra, o que fica de fora, prazo e valor — e o código só começa depois que nós dois concordamos com ele.",
    cta: "Conversar sobre um sistema",
  },

  proof: {
    eyebrow: "Prova",
    h: "Sistemas em produção, com cliente pagando.",
    lede: "Produtos meus e projetos de cliente. A lista é a resposta para “você já fez alguma coisa parecida com o que eu preciso?”.",
    testimonialsLabel: "O que dizem",
    othersLabel: "Outros projetos",
    visit: "Abrir",
    others: {
      servin: {
        name: "Servin",
        what: "Gestão para hotéis e pousadas: o hóspede pede pelo QR do quarto e o chamado sai impresso no setor responsável, em vez de passar pela recepção.",
        state: "Em implantação",
      },
      tijolo: {
        name: "Vale o Tijolo?",
        what: "Calculadora de comprar ou alugar, com juros, ITBI, custo de oportunidade da entrada e relatório em PDF. Estática, sem servidor para cair.",
        state: "Em produção",
      },
      gateway: {
        name: "Gateway de pagamentos",
        what: "Checkout sob medida sobre o Stripe, com sinais de antifraude, conversão de moeda e conciliação. Dinheiro de verdade passando, então nada de improviso.",
        state: "Em produção",
      },
      freelas: {
        name: "Freelas",
        what: "Monorepo de ferramentas para freelancer brasileiro: precificação por hora, gerador de contrato e utilitários de rotina.",
        state: "Em desenvolvimento",
      },
    },
  },

  quote: {
    eyebrow: "Orçamento",
    h: "Me conta o que você precisa.",
    lede: "Respondo em até um dia útil. A primeira conversa não custa nada e não vira compromisso.",
    direct: "Ou fale direto",
    form: {
      kindLabel: "O que você precisa",
      kinds: {
        site: "Um site",
        sistema: "Um sistema",
        indefinido: "Ainda não sei",
      },
      name: "Seu nome",
      company: "Empresa",
      email: "E-mail",
      phone: "WhatsApp",
      phoneHint: "para eu te responder mais rápido",
      optional: "opcional",
      need: "Conte o que precisa",
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
      tooLong: "Texto longo demais",
    },
  },

  about: {
    eyebrow: "Sobre",
    h: "Quem faz.",
    caption: "João Pessoa · PB · UTC−3",
    paras: [
      "Sou **engenheiro de software autônomo**. Toco meus próprios SaaS e projetos de cliente do primeiro commit ao faturamento — arquitetura, deploy, cobrança e suporte, tudo meu. Em paralelo trabalho como desenvolvedor frontend na Wisecare, uma plataforma de telessaúde, no produto principal em React 19 e Next.js sobre um design system interno.",
      "Isso significa que eu já fui acordado por webhook do Stripe falhando às duas da manhã, já reescrevi fila de impressão porque um restaurante perdeu pedido num sábado à noite, e já expliquei para dono de pousada por que o sistema estava certo e o processo dele não. **Eu não entrego o código e sumo** — eu fico com a operação.",
      "O que eu faço de melhor não é escrever código: é **entender um negócio que não é meu**. Cada setor tem uma regra que ninguém documentou — a taxa de serviço que muda no fim de semana, o teto do MEI que ninguém acompanha, o ITBI que entra na conta do financiamento. Achar essa regra e modelar direito é metade do trabalho.",
    ],
    pathLabel: "Trajetória",
    roles: [
      {
        when: "2022 → hoje",
        role: "Engenheiro de software autônomo",
        org: "Independente",
        desc: "SaaS próprios e projetos de cliente, do primeiro commit ao faturamento. Frontend, backend, infraestrutura, pagamento e a conversa difícil com o cliente.",
      },
      {
        when: "2021 → hoje",
        role: "Desenvolvedor frontend",
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

  footer: { city: "João Pessoa, Brasil" },
};

const en: Content = {
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
    message:
      "Hi Matheus! I found your site and I'd like to talk about a project.",
  },
  meta: {
    title: "Matheus Oliveira — Websites and software for your business",
    description:
      "Fast websites for businesses, starting at US$500, and custom software. Software engineer in João Pessoa, Brazil.",
  },

  hero: {
    lines: ["From the first click", "to the system that", "runs the floor."],
    sub: "I'm Matheus Oliveira, a software engineer in João Pessoa, Brazil. I build websites for businesses that need to be found, and custom software for the ones that have outgrown the spreadsheet.",
    doors: {
      site: {
        label: "A website for your business",
        hint: "Starting at US$500",
      },
      software: {
        label: "Custom software",
        hint: "Quoted per project",
      },
    },
    scroll: "Scroll to fall",
  },

  fall: {
    eyebrow: "Work",
    visit: "Open the site",
    projects: {
      livia: {
        name: "Lívia Lacerda Advocacia",
        kind: "Marketing site",
        line: "A law firm in João Pessoa. Services, articles and contact, in an identity built from the client's own brand — no bought theme.",
        stack: "Next.js · TypeScript · Tailwind",
      },
      tableflow: {
        name: "Tableflow",
        kind: "My own SaaS",
        line: "Restaurant management. Guests order from the QR code on the table, the kitchen gets it printed on thermal paper, and the floor follows everything on one board. Counter and delivery join the same queue.",
        stack: "Next.js · Stripe · AWS",
      },
      lith1um: {
        name: "LITH1UM",
        kind: "Site and ERP",
        line: "Electric mobility: a public catalogue up front, orders, stock and the sales flow behind it. One system, instead of a pretty site and a spreadsheet nobody mentions.",
        stack: "Next.js · TypeScript · Postgres",
      },
      meirendeu: {
        name: "MEI Rendeu",
        kind: "My own SaaS",
        line: "A tax assistant that lives inside WhatsApp. A sole trader texts “sold 300 today” and that's it: the AI books it, chases the monthly tax and warns before the revenue ceiling becomes a problem.",
        stack: "Next.js · WhatsApp · AI",
      },
    },
  },

  sites: {
    eyebrow: "Websites",
    h: "A site your customer finds, understands and uses.",
    lede: "Business sites tend to fail at the same three things: they're slow to open, they don't show up on Google, and nobody knows how to update them once the agency disappears. I fix all three at once.",
    price: {
      value: "Starting at US$500",
      note: "The final number depends on how many pages there are, what has to be integrated and who writes the copy. There are no plans and no mandatory monthly fee — maintenance is optional and quoted separately.",
    },
    includesLabel: "What usually goes in",
    includes: [
      {
        title: "Structure",
        items: [
          "Up to five pages",
          "Domain and hosting set up",
          "A contact form that reaches your inbox",
          "WhatsApp one tap away",
        ],
      },
      {
        title: "Speed and search",
        items: [
          "Opens in under two seconds on a phone",
          "Title, description and sharing image",
          "Sitemap and structured data for Google",
          "Analytics if you want it — or none at all",
        ],
      },
      {
        title: "After launch",
        items: [
          "A walkthrough so you can update it yourself",
          "Thirty days of adjustments included",
          "The code is yours, with no platform lock-in",
          "Optional monthly maintenance",
        ],
      },
    ],
    stepsLabel: "How it works",
    steps: [
      {
        n: "01",
        title: "A conversation",
        body: "Thirty minutes to understand the business, who the customer is and what the site has to solve. It costs nothing and commits you to nothing.",
      },
      {
        n: "02",
        title: "Scope and price",
        body: "You get it in writing: what's in, what's out, the timeline and the number. I start only once you've agreed to it.",
      },
      {
        n: "03",
        title: "Building",
        body: "You follow along on a preview link from day one and respond to each delivery, instead of waiting until the end to see it.",
      },
      {
        n: "04",
        title: "Live",
        body: "I publish on your domain, show you how to update it, and stay around for thirty days for the adjustments that only surface once the site is running.",
      },
    ],
    cta: "Get a website quote",
  },

  software: {
    eyebrow: "Software",
    h: "When the spreadsheet stops coping.",
    lede: "Custom software is for when the process exists, works, and no longer fits an off-the-shelf tool. I get inside the operation, find the rule nobody ever wrote down, and ship software that survives daily use.",
    fronts: [
      {
        title: "Internal operations",
        body: "Dashboards, queues, stock, orders. What is currently a shared spreadsheet, a WhatsApp group and the memory of whoever has been there longest.",
      },
      {
        title: "Integration",
        body: "Payments, tax invoicing, printers, ERP, WhatsApp. Two things that need to talk to each other and never have.",
      },
      {
        title: "A product from scratch",
        body: "From the idea to the first paying customer: architecture, recurring billing, infrastructure and the support that comes with it.",
      },
      {
        title: "Rescuing a system",
        body: "Inherited code nobody understands and nobody wants to touch. Reading it, putting tests around it, and making changes that don't break what already works.",
      },
    ],
    scopeLine:
      "Software has no price list. Each project starts from a **written scope** — what's in, what's out, the timeline and the number — and the code starts only once we both agree to it.",
    cta: "Talk about a system",
  },

  proof: {
    eyebrow: "Proof",
    h: "Systems in production, with customers paying.",
    lede: "My own products and client projects. The list is the answer to “have you built anything like what I need?”.",
    testimonialsLabel: "What clients say",
    othersLabel: "Other projects",
    visit: "Open",
    others: {
      servin: {
        name: "Servin",
        what: "Management for hotels and guesthouses: the guest orders from the room's QR code and the request prints in the right department, instead of going through the front desk.",
        state: "Rolling out",
      },
      tijolo: {
        name: "Vale o Tijolo?",
        what: "A buy-versus-rent calculator with interest, transfer tax, the opportunity cost of the deposit and a PDF report. Fully static, with no server to fall over.",
        state: "In production",
      },
      gateway: {
        name: "Payment gateway",
        what: "A bespoke checkout on top of Stripe, with fraud signals, currency conversion and reconciliation. Real money moving, so nothing improvised.",
        state: "In production",
      },
      freelas: {
        name: "Freelas",
        what: "A monorepo of tools for Brazilian freelancers: hourly pricing, a contract generator and everyday utilities.",
        state: "In development",
      },
    },
  },

  quote: {
    eyebrow: "Get a quote",
    h: "Tell me what you need.",
    lede: "I reply within one business day. The first conversation costs nothing and commits you to nothing.",
    direct: "Or reach me directly",
    form: {
      kindLabel: "What do you need",
      kinds: {
        site: "A website",
        sistema: "Custom software",
        indefinido: "Not sure yet",
      },
      name: "Your name",
      company: "Company",
      email: "Email",
      phone: "WhatsApp",
      phoneHint: "so I can get back to you faster",
      optional: "optional",
      need: "Tell me what you need",
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
      tooLong: "That's too long",
    },
  },

  about: {
    eyebrow: "About",
    h: "Who builds it.",
    caption: "João Pessoa · Brazil · UTC−3",
    paras: [
      "I'm an **independent software engineer**. I run my own SaaS products and client projects from first commit to revenue — architecture, deploys, billing and support, all mine. Alongside that I work as a frontend developer at Wisecare, a telehealth platform, on the core product in React 19 and Next.js over an internal design system.",
      "Which means I've been woken up by a failing Stripe webhook at two in the morning, rewritten a print queue because a restaurant lost an order on a Saturday night, and explained to a guesthouse owner why the system was right and his process wasn't. **I don't hand over the code and disappear** — I stay with the operation.",
      "What I'm best at isn't writing code: it's **understanding a business that isn't mine**. Every sector has a rule nobody wrote down — the service charge that changes at weekends, the tax ceiling nobody tracks, the transfer tax that belongs in the mortgage maths. Finding that rule and modelling it properly is half the job.",
    ],
    pathLabel: "Track record",
    roles: [
      {
        when: "2022 → now",
        role: "Independent software engineer",
        org: "Self-employed",
        desc: "Own SaaS products and client projects, from first commit to revenue. Frontend, backend, infrastructure, payments and the hard conversation with the client.",
      },
      {
        when: "2021 → now",
        role: "Frontend developer",
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

  footer: { city: "João Pessoa, Brazil" },
};

export const content: Record<Locale, Content> = { pt, en };
