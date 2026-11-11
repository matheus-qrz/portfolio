/**
 * Simulação do fluxo do MEI Rendeu. No produto, quem interpreta a
 * mensagem é o Claude; aqui são regras simples, só para mostrar o
 * caminho: mensagem solta → lançamento estruturado → banco.
 */
import { brl } from "./sound";
import { norm } from "./vaptiBot";

export interface Entry {
  tipo: "entrada" | "saida";
  valor: number;
  forma: string;
  categoria: string;
  cliente?: string;
  data: string;
}

const CAT: [RegExp, string][] = [
  [/internet|wi.?fi|\bnet\b/, "Internet"],
  [/\bluz\b|energia/, "Energia"],
  [/aluguel/, "Aluguel"],
  [/\bdas\b|imposto|simples/, "Impostos (DAS)"],
  [/gasolina|combustivel|uber|transporte/, "Transporte"],
  [/material|insumo|mercadoria|estoque|fornecedor/, "Insumos"],
  [/marketing|anuncio|instagram|trafego/, "Marketing"],
];

const SKIP = ["internet", "luz", "energia", "aluguel", "pix", "cartao", "dinheiro", "boleto", "gasolina", "material", "marketing", "reais", "hoje", "ontem", "mes"];

function parseMoney(t: string): number | null {
  const m = t.match(/(\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?|\d+(?:[.,]\d{1,2})?)\s*(k|mil)?/);
  if (!m) return null;
  let v = m[1];
  if (/,\d{1,2}$/.test(v)) v = v.replace(/\./g, "").replace(",", ".");
  else if (/\.\d{3}/.test(v)) v = v.replace(/\./g, "");
  else v = v.replace(",", ".");
  let n = parseFloat(v);
  if (m[2]) n *= 1000;
  return Number.isFinite(n) ? n : null;
}

export function agentReply(raw: string, entries: Entry[]): { text: string; entry?: Entry } {
  const t = norm(raw);
  if (/quanto|saldo|resumo|como (ta|esta)|entrou|sobrou/.test(t) && !/vendi|recebi|paguei|gastei/.test(t)) {
    if (!entries.length) return { text: "Ainda não tem nada lançado esse mês. Me manda a primeira venda ou despesa 🙂" };
    const inc = entries.filter((e) => e.tipo === "entrada").reduce((a, e) => a + e.valor, 0);
    const out = entries.filter((e) => e.tipo === "saida").reduce((a, e) => a + e.valor, 0);
    return { text: `Resumo do mês 📊\nEntradas: ${brl(inc)}\nSaídas: ${brl(out)}\nSaldo: ${brl(inc - out)}` };
  }
  const valor = parseMoney(t);
  const saida = /paguei|gastei|comprei|despesa|conta de|boleto/.test(t);
  const entrada = /vendi|recebi|entrou|faturei|venda|cliente pagou/.test(t);
  if (!valor || (!saida && !entrada))
    return { text: "Não consegui entender esse lançamento 😅 Tenta assim: “vendi 150 no pix” ou “paguei 89,90 de internet”." };

  const forma = /pix/.test(t) ? "pix" : /cartao|credito|debito|maquininha/.test(t) ? "cartão" : /dinheiro|especie/.test(t) ? "dinheiro" : /boleto/.test(t) ? "boleto" : "não informado";
  const cm = raw.toLowerCase().match(/(?:cliente|pro|pra|da|do)\s+(?:cliente\s+)?([a-zà-ÿ]{3,})(?:\s|$|[,.!?])/);
  const cliente = entrada && cm && !SKIP.includes(norm(cm[1])) ? cm[1][0].toUpperCase() + cm[1].slice(1) : undefined;
  const categoria = saida ? (CAT.find(([re]) => re.test(t))?.[1] ?? "Outras despesas") : "Venda";
  const entry: Entry = {
    tipo: saida ? "saida" : "entrada",
    valor: Math.round(valor * 100) / 100,
    forma,
    categoria,
    ...(cliente ? { cliente } : {}),
    data: new Date().toLocaleDateString("sv-SE"),
  };
  return {
    text: `${saida ? "Despesa" : "Venda"} registrada ✅\n${brl(entry.valor)} · ${categoria} · ${forma}${cliente ? ` · ${cliente}` : ""}`,
    entry,
  };
}
