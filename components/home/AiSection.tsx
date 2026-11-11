"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { agentReply, type Entry } from "./meiAgent";
import { useHome } from "./secrets";
import { brl, pop, prefersReducedMotion, sleep } from "./sound";

const CHIPS = [
  "vendi 150 no pix pro joão",
  "paguei 89,90 de internet",
  "recebi 300 da cliente ana em dinheiro",
  "gastei 45 de gasolina",
  "quanto entrou esse mês?",
];

const FLOW = [
  ["Foto do usuário", "Upload direto do celular"],
  ["InstantID + Flux", "Geração no Replicate, mantendo o rosto"],
  ["Fila com BullMQ", "Pedidos processados em ordem, sem derrubar o servidor"],
  ["Marca d’água com Sharp", "Prévia grátis, protegida"],
  ["Pix libera o HD", "R$ 4,90 por arte, ou pacotes"],
];

type Msg = { id: number; who: "me" | "ag"; text: string };
let seq = 0;

export default function AiSection() {
  const { unlock } = useHome();
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: ++seq, who: "ag", text: "Oi! Sou seu agente financeiro. Me manda suas vendas e despesas do jeito que você fala, que eu organizo tudo." },
  ]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [draft, setDraft] = useState("");
  const entriesRef = useRef<Entry[]>([]);
  const chain = useRef<Promise<void>>(Promise.resolve());
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = body.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    chain.current = chain.current.then(async () => {
      setMsgs((m) => [...m, { id: ++seq, who: "me", text: t }]);
      await sleep(prefersReducedMotion() ? 0 : 500);
      const r = agentReply(t, entriesRef.current);
      setMsgs((m) => [...m, { id: ++seq, who: "ag", text: r.text }]);
      pop();
      if (r.entry) {
        entriesRef.current = [...entriesRef.current, r.entry];
        setEntries(entriesRef.current);
        if (entriesRef.current.length === 3) unlock("agente");
      }
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(draft);
    setDraft("");
  };

  const saldo = entries.reduce((a, x) => a + (x.tipo === "entrada" ? x.valor : -x.valor), 0);
  const recent = [...entries].reverse().slice(0, 4);

  return (
    <section className="wrap sec" id="ia" aria-labelledby="iaH">
      <div className="sec-head">
        <span className="eyebrow mono">IA na prática</span>
        <h2 id="iaH">IA onde ela resolve</h2>
        <p>
          Dois produtos meus com modelo de IA no centro. Teste o primeiro: escreva um lançamento do
          jeito que um MEI escreveria no WhatsApp.
        </p>
      </div>
      <div className="ai">
        <div className="panel">
          <span className="status mono">
            MEI Rendeu · <b>agente pronto, painel em pausa</b>
          </span>
          <h3>Agente financeiro no WhatsApp</h3>
          <p>
            O MEI manda uma mensagem solta e o agente transforma em lançamento organizado no banco. No
            produto, quem interpreta é o Claude; aqui é uma simulação do mesmo fluxo.
          </p>
          <div className="agent">
            <div className="wa">
              <div className="wa-head">
                <i aria-hidden="true">MR</i>
                <div>
                  <b>MEI Rendeu</b>
                  <br />
                  <small>agente financeiro</small>
                </div>
              </div>
              <div className="wa-body" ref={body} aria-live="polite">
                {msgs.map((m) => (
                  <div key={m.id} className={`wm ${m.who}`}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="wa-chips" aria-label="Exemplos de mensagem">
                {CHIPS.map((q) => (
                  <button key={q} type="button" onClick={() => send(q)}>
                    {q}
                  </button>
                ))}
              </div>
              <form onSubmit={onSubmit}>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  aria-label="Mensagem para o agente"
                  placeholder="Ex.: vendi 150 no pix"
                  autoComplete="off"
                  maxLength={140}
                />
                <button type="submit" aria-label="Enviar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
                  </svg>
                </button>
              </form>
            </div>
            <div className="ledger paper" aria-live="polite">
              <span className="mono">
                <span>Banco de dados</span>
                <span>Supabase</span>
              </span>
              <div>
                {recent.length === 0 ? (
                  <pre>aguardando o primeiro lançamento…</pre>
                ) : (
                  recent.map((e, i) => (
                    <pre key={entries.length - i}>
                      {`insert into lancamentos\n${JSON.stringify(e, null, 1).replace(/\n\s*/g, " ")}`}
                    </pre>
                  ))
                )}
              </div>
              <div className="tot">
                <span>Saldo do mês</span>
                <span>{(saldo < 0 ? "−" : "") + brl(Math.abs(saldo))}</span>
              </div>
            </div>
          </div>
          <p className="disclaimer">
            Stack real: Next.js · Supabase · Claude Haiku · Evolution API (WhatsApp) · Stripe e Pix.
          </p>
        </div>

        <div className="panel">
          <span className="status mono">
            Copa AI · <b>MVP concluído</b>
          </span>
          <h3>Sua foto vira arte da Copa</h3>
          <p>
            Geração de imagem com o rosto da pessoa preservado, numa fila que aguenta pico de pedidos,
            com a versão em alta liberada por Pix.
          </p>
          <ol className="flow">
            {FLOW.map(([b, s]) => (
              <li key={b}>
                <div>
                  <b>{b}</b>
                  <span>{s}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
