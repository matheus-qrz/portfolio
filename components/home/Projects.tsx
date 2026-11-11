"use client";

import { useEffect, useRef, useState } from "react";
import { thud } from "./sound";

type Res = "live" | "stop" | "pivot";

interface Project {
  name: string;
  opp: string;
  kind: string;
  res: Res;
  stamp: string;
  status: string;
  line: string;
  stack: string;
  url?: string;
  urlTxt?: string;
  logo?: string;
}

const PROJECTS: Project[] = [
  { name: "Vapti", opp: "O direct lotado", kind: "Produto próprio", res: "live", stamp: "No ar", status: "No ar",
    line: "Chat próprio, vitrine com estoque e robô de atendimento para loja que vende pelo Instagram. Pagamento por Pix e cartão direto na conta da loja.",
    stack: "Next.js 15 · Express 5 · MongoDB · Socket.io", url: "https://vapti.chat", urlTxt: "vapti.chat" },
  { name: "Tableflow", opp: "A comanda de papel", kind: "Produto próprio", res: "live", stamp: "No ar", status: "Em produção",
    line: "Gestão para restaurantes com cardápio por QR, PDV que funciona offline, tela de cozinha, impressão térmica e nota fiscal. Mensalidade fixa, sem comissão por pedido.",
    stack: "Next.js · Node · MongoDB · Electron · Focus NFe", url: "https://tableflow.software", urlTxt: "tableflow.software" },
  { name: "Copa AI", opp: "O editor de foto", kind: "Produto próprio · IA", res: "live", stamp: "Concluído", status: "MVP concluído",
    line: "Sua foto vira arte da Copa, com geração por IA (InstantID e Flux) numa fila de processamento. A versão em alta é liberada por Pix.",
    stack: "Next.js · Supabase · Replicate · BullMQ · Sharp" },
  { name: "Lívia Lacerda Advocacia", opp: "O tema comprado", kind: "Cliente · site", res: "live", stamp: "Entregue", status: "Entregue",
    line: "Site institucional de escritório de advocacia: áreas de atuação, artigos, depoimentos, perguntas frequentes e contato, com identidade feita a partir da marca da cliente.",
    stack: "Next.js · TypeScript" },
  { name: "Checkout internacional", opp: "O checkout engessado", kind: "Cliente · sistema", res: "live", stamp: "No ar", status: "Em produção",
    line: "Checkout sob medida com conversão de moeda em tempo real (real, dólar e euro) e links de pagamento gerados num painel.",
    stack: "Next.js · Stripe" },
  { name: "MEI Rendeu", opp: "O caderninho de contas", kind: "Produto próprio · IA", res: "stop", stamp: "Pausado", status: "Pausado",
    line: "Agente financeiro no WhatsApp com Claude. O agente e os webhooks ficaram prontos; o painel web ficou pra depois. Dá pra testar o fluxo na seção de IA.",
    stack: "Next.js · Supabase · Claude · Evolution API" },
  { name: "Servin", opp: "O interfone da recepção", kind: "Produto próprio", res: "stop", stamp: "Pausado", status: "Pausado",
    line: "Gestão para hotéis e pousadas, nascido do Tableflow. O hóspede pede pelo QR do quarto e o pedido chega ao setor certo, em tempo real.",
    stack: "Next.js · Express · MongoDB · S3" },
  { name: "Vale o Tijolo?", opp: "A conta de cabeça", kind: "Produto próprio", res: "pivot", stamp: "Pivotado", status: "Pivotado", logo: "/img/tijolo-marca.webp",
    line: "Simulador de investimento imobiliário com ITBI por cidade, cartório, financiamento, séries do Banco Central e relatório em PDF para corretor. Pivotei pela complexidade dos dados: era informação demais para um produto simples.",
    stack: "React · Vite · Firebase · Recharts" },
];

const FILTERS: [Res | "all", string][] = [
  ["all", "Todos"],
  ["live", "No ar e entregues"],
  ["stop", "Pausados"],
  ["pivot", "Pivotados"],
];

export default function Projects() {
  const [filter, setFilter] = useState<Res | "all">("all");
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const list = useRef<HTMLUListElement>(null);

  // Carimbo bate quando o cartão entra na tela, uma vez por cartão.
  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (ents) =>
        ents.forEach((en) => {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          const s = en.target.querySelector(".stamp");
          setTimeout(() => {
            s?.classList.add("in");
            thud(70);
          }, 200 + Math.random() * 300);
        }),
      { threshold: 0.6 },
    );
    root.querySelectorAll(".bout").forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  return (
    <section className="wrap sec" id="projetos" aria-labelledby="projH">
      <div className="sec-head">
        <span className="eyebrow mono">Projetos</span>
        <h2 id="projH">Todos os projetos, com o status real</h2>
        <p>
          Produtos meus e trabalho para clientes. Uns estão no ar, uns pausados, um foi pivotado.
          Toque em “Ver detalhes” pra saber o que foi feito.
        </p>
      </div>
      <div className="filters" role="group" aria-label="Filtrar projetos">
        {FILTERS.map(([k, label]) => (
          <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}>
            {label}
            <span>{k === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.res === k).length}</span>
          </button>
        ))}
      </div>
      <ul className="bouts" ref={list}>
        {PROJECTS.map((p, i) => (
          <li key={p.name} className="bout paper" hidden={filter !== "all" && p.res !== filter}>
            <div className="top">
              <span className="mono">{p.kind}</span>
              <span className="mono">{p.status}</span>
            </div>
            <div className="body">
              {p.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="logo" src={p.logo} alt="" width={30} height={30} loading="lazy" />
              )}
              <h3>{p.name}</h3>
              <div className="opp">
                <span>vs.</span> {p.opp}
              </div>
              <div className="row">
                <button
                  type="button"
                  className="toggle"
                  aria-expanded={open.has(i)}
                  aria-controls={`proj-${i}`}
                  onClick={() => toggle(i)}
                >
                  {open.has(i) ? "Fechar" : "Ver detalhes"}
                </button>
                <span className={`stamp ${p.res}`} aria-hidden="true">
                  {p.stamp}
                </span>
              </div>
              <div className="more" id={`proj-${i}`} hidden={!open.has(i)}>
                <p>{p.line}</p>
                <span className="mono">{p.stack}</span>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.urlTxt}
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
