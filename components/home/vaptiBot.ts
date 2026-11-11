/**
 * Versão de demonstração do robô do Vapti. Segue a mesma ideia do motor
 * real (regras fixas em português, sem IA): normaliza o texto, expande
 * abreviação, tolera erro de digitação em palavra de 6+ letras com a
 * mesma inicial e responde com os dados da loja.
 */
import { brl } from "./sound";

export interface Product {
  name: string;
  keys: string[];
  price: number;
  stock?: number;
  sizes?: Record<"P" | "M" | "G", number>;
  color: string;
  avail?: string;
}

export type BotReply =
  | { kind: "text"; text: string; btns?: string[]; handoff?: boolean }
  | { kind: "card"; product: Product; stock: number }
  | { kind: "note"; text: string };

export const STORE = {
  name: "Ateliê Maré",
  addr: "Av. Cabo Branco, 2100",
  open: 9,
  close: 18,
  freeOver: 150,
  fees: {
    bessa: ["Bessa", 8],
    manaira: ["Manaíra", 8],
    tambau: ["Tambaú", 6],
    "cabo branco": ["Cabo Branco", 6],
    altiplano: ["Altiplano", 10],
    "jardim oceania": ["Jardim Oceania", 8],
    intermares: ["Intermares", 12],
    centro: ["Centro", 10],
  } as Record<string, [string, number]>,
  products: [
    { name: "Canga estampada", keys: ["canga", "cangas"], price: 49.9, stock: 7, color: "#0F766E", avail: "Tá sim! Temos 3 estampas. Quer ver as fotos?" },
    { name: "Chapéu de palha", keys: ["chapeu", "chapeus"], price: 59.9, stock: 4, color: "#B7791F" },
    { name: "Biquíni Maré", keys: ["biquini", "biquinis"], price: 129.9, sizes: { P: 2, M: 0, G: 3 }, color: "#DB2777" },
    { name: "Saída de praia", keys: ["saida", "saidas"], price: 89.9, stock: 5, color: "#4F46E5" },
    { name: "Bolsa de palha", keys: ["bolsa", "bolsas"], price: 79.9, stock: 0, color: "#92400E" },
  ] as Product[],
};

const ABBR: Record<string, string> = {
  vc: "voce", vcs: "voces", qto: "quanto", qnt: "quanto", qt: "quanto", tb: "tambem", hj: "hoje",
  amn: "amanha", pfv: "por favor", pf: "por favor", q: "que", oq: "o que", tah: "ta", blz: "beleza",
  obg: "obrigado", vlw: "valeu", td: "tudo", dps: "depois", msm: "mesmo",
};

const INT = {
  handoff: ["atendente", "humano", "pessoa", "alguem", "vendedora", "vendedor", "equipe"],
  greet: ["oi", "ola", "opa", "eae", "eai", "bom dia", "boa tarde", "boa noite"],
  price: ["quanto", "preco", "valor", "custa", "custo"],
  parcel: ["parcela", "parcelas", "parcelado", "parcelar", "vezes", "juros", "cartao"],
  pay: ["pix", "pagamento", "pagar"],
  avail: ["tem", "disponivel", "estoque", "ainda", "chegou", "sobrou", "acabou", "esgotou"],
  deliv: ["entrega", "entregam", "entregar", "frete", "taxa", "delivery", "manda", "mandam", "envia", "enviam"],
  hours: ["horario", "abre", "abrem", "fecha", "fecham", "funciona", "funcionam", "aberto", "aberta", "que horas"],
  addr: ["onde", "endereco", "localizacao", "fica", "ficam"],
  catalog: ["catalogo", "produtos", "vitrine", "novidades", "o que tem", "o que voces tem"],
  thanks: ["obrigado", "obrigada", "valeu", "brigado"],
  complaint: ["demorou", "errado", "errada", "reclamacao", "pessimo", "horrivel", "defeito"],
  yes: ["sim", "quero", "pode", "claro", "bora", "isso"],
};
type Intent = keyof typeof INT;

export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s,.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Distância de Damerau-Levenshtein (com transposição). */
function dl(a: string, b: string): number {
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array<number>(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1])
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  return d[a.length][b.length];
}

/** Como no motor real: parecido só a partir de 6 letras e com a mesma inicial. */
function close(w: string, k: string): "exact" | "fuzzy" | null {
  if (w === k) return "exact";
  if (w.length >= 6 && k.length >= 6 && w[0] === k[0] && dl(w, k) === 1) return "fuzzy";
  return null;
}

const stockOf = (p: Product) =>
  p.sizes ? Object.values(p.sizes).reduce((a, b) => a + b, 0) : (p.stock ?? 0);
const card = (p: Product): BotReply => ({ kind: "card", product: p, stock: stockOf(p) });

function understand(raw: string) {
  const t = norm(raw)
    .replace(/[,.]/g, " ")
    .split(" ")
    .map((w) => ABBR[w] ?? w)
    .join(" ");
  const words = t.split(" ");
  const has = (list: string[]) =>
    list.some((k) => (k.includes(" ") ? ` ${t} `.includes(` ${k} `) : words.includes(k)));
  const hit = Object.fromEntries(
    (Object.keys(INT) as Intent[]).map((k) => [k, has(INT[k])]),
  ) as Record<Intent, boolean>;
  if (/\bfalar com\b/.test(t)) hit.handoff = true;

  let product: Product | null = null;
  let fuzzy: [string, string] | null = null;
  for (const w of words)
    for (const p of STORE.products)
      for (const k of p.keys) {
        const c = close(w, k);
        if (c && !product) {
          product = p;
          if (c === "fuzzy") fuzzy = [w, p.name.split(" ")[0]];
        }
      }

  let hood: string | null = null;
  for (const key of Object.keys(STORE.fees)) {
    if (` ${t} `.includes(` ${key} `)) hood = key;
    else if (!key.includes(" "))
      for (const w of words)
        if (close(w, key) === "fuzzy") {
          hood = key;
          fuzzy = fuzzy ?? [w, STORE.fees[key][0]];
        }
  }
  const s = words.find((w) => ["p", "m", "g"].includes(w));
  const size = s ? (s.toUpperCase() as "P" | "M" | "G") : null;
  return { t, words, hit, product, fuzzy, hood, size, tomorrow: words.includes("amanha") };
}
type Understood = ReturnType<typeof understand>;

function hoursLine(tomorrow: boolean) {
  const d = new Date();
  if (tomorrow) d.setDate(d.getDate() + 1);
  const label = tomorrow ? "Amanhã" : "Hoje";
  if (d.getDay() === 0) return `${label} é domingo e a loja não abre. Segunda, das 9h às 18h.`;
  return `${label} das ${STORE.open}h às ${STORE.close}h. Estamos na ${STORE.addr}.`;
}

function delivLine(u: Understood) {
  if (!u.hood) {
    const other = u.words.find(
      (w, i) =>
        ["no", "na", "em", "pro", "pra"].includes(u.words[i - 1]) &&
        w.length > 3 &&
        !STORE.products.some((p) => p.keys.includes(w)),
    );
    if (other)
      return `Sobre entrega em ${other[0].toUpperCase() + other.slice(1)}, quem confirma é a equipe da ${STORE.name} 😉 Já passei sua pergunta para eles, que te respondem aqui mesmo.`;
    return "Entregamos em João Pessoa! Me diz o bairro que eu confiro a taxa.";
  }
  const [nome, fee] = STORE.fees[u.hood];
  const prep = ["Centro", "Bessa", "Altiplano"].includes(nome) ? "no" : "em";
  return `Entregamos ${prep} ${nome}! Taxa de ${brl(fee).replace(",00", "")}, grátis acima de ${brl(STORE.freeOver).replace(",00", "")}.`;
}

export const GREETING = `Oi! Aqui é a ${STORE.name} 👋\nPode perguntar o que quiser por aqui. A gente responde assim que possível.`;
const HANDOFF = `Certo! Já chamei a equipe da ${STORE.name}. Em instantes alguém te responde por aqui.`;
const CATALOG = `Olha o que encontrei no catálogo da ${STORE.name} 👇\nSe quiser saber mais, é só perguntar por aqui.`;

export class VaptiBot {
  private offer: "team" | "fotos" | null = null;

  reply(raw: string): { replies: BotReply[]; fuzzy: boolean } {
    const u = understand(raw);
    const out = this.answer(u);
    if (u.fuzzy) out.unshift({ kind: "note", text: `entendeu “${u.fuzzy[0]}” como “${u.fuzzy[1].toLowerCase()}”` });
    return { replies: out, fuzzy: !!u.fuzzy };
  }

  private answer(u: Understood): BotReply[] {
    const h = u.hit;
    const out: BotReply[] = [];
    const text = (t: string, extra: Partial<{ btns: string[]; handoff: boolean }> = {}): BotReply => ({ kind: "text", text: t, ...extra });

    if (this.offer && h.yes && !u.product) {
      const o = this.offer;
      this.offer = null;
      if (o === "team") return [text(HANDOFF, { handoff: true })];
      return [text(CATALOG), card(STORE.products[0])];
    }
    this.offer = null;
    if (h.handoff) return [text(HANDOFF, { handoff: true })];
    if (h.complaint) return [text(`Sinto muito por isso 😕 Já chamei a equipe da ${STORE.name}, que te responde aqui mesmo.`, { handoff: true })];

    const p = u.product;
    if (p) {
      if (p.sizes && u.size) {
        const n = p.sizes[u.size];
        const others = (Object.entries(p.sizes) as [string, number][])
          .filter(([s, q]) => q > 0 && s !== u.size)
          .map(([s, q]) => `${s} (${q})`)
          .join(" e ");
        out.push(text(n > 0 ? `Tem sim! ${p.name} no ${u.size}: ${n} ${n > 1 ? "peças" : "peça"}.` : `${p.name} no ${u.size} acabou 😕 Ainda tem ${others}.`));
      } else if (h.price || h.parcel) {
        out.push(text(`${brl(p.price)}${p.price >= 50 ? `, ou 3× de ${brl(p.price / 3)} sem juros` : ""}.`));
      } else if (!p.sizes && p.stock === 0) {
        out.push(text(`A ${p.name.toLowerCase()} esgotou 😕 Quer que eu chame a equipe pra te avisar quando chegar?`));
        this.offer = "team";
      } else if (p.avail && (h.avail || u.words.length <= 4)) {
        out.push(text(p.avail));
        this.offer = "fotos";
      } else if (p.sizes) {
        const ok = (Object.entries(p.sizes) as [string, number][]).filter(([, q]) => q > 0).map(([s]) => s);
        out.push(text(`Tem sim! ${p.name} em ${ok.join(" e ")}. Qual tamanho você usa?`));
      } else {
        out.push(text(`Tem sim! ${p.stock} em estoque.`));
      }
      if (!this.offer) out.push(card(p));
      if (h.deliv) out.push(text(delivLine(u)));
      return out;
    }

    if (h.price || h.parcel) out.push(text("De qual produto? Me diga o nome que eu confiro o preço 😉"));
    if (h.deliv) out.push(text(delivLine(u)));
    if (h.hours) out.push(text(hoursLine(u.tomorrow)));
    else if (h.addr) out.push(text(`Estamos na ${STORE.addr}, de segunda a sábado, das 9h às 18h.`));
    if (h.pay && !out.length) out.push(text("Aceitamos Pix e cartão aqui mesmo na conversa. Se quiser, dá pra pedir pra separar e pagar só o sinal no Pix."));
    if (h.catalog && !out.length) {
      out.push(text(CATALOG));
      STORE.products.slice(0, 3).forEach((x) => out.push(card(x)));
    }
    if (h.thanks && !out.length) out.push(text("Nada! Qualquer coisa é só chamar 😊"));
    if (h.greet && !out.length) out.push(text(GREETING));
    if (!out.length)
      out.push(text(`Não entendi bem 😅 Quer perguntar de outro jeito ou falar com a equipe da ${STORE.name}?`, { btns: ["Fazer outra pergunta", "Falar com a equipe"] }));
    return out;
  }
}

export const productCard = card;
