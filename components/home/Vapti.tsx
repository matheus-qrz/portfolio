"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { useHome } from "./secrets";
import { brl, pop, prefersReducedMotion, sleep } from "./sound";
import { GREETING, STORE, VaptiBot, productCard, type BotReply, type Product } from "./vaptiBot";

type Item = { id: number } & (
  | { t: "me"; text: string }
  | { t: "bot"; text: string; btns?: string[] }
  | { t: "card"; product: Product; stock: number }
  | { t: "note"; text: string }
  | { t: "typing" }
);

const CHIPS = [
  "A canga tá disponível?",
  "Quanto custa o chapéu de palha?",
  "Vcs entregam no Bessa?",
  "Que horas vocês abrem amanhã?",
  "Tem biqini no M?",
  "Quero falar com atendente",
];

let seq = 0;
const nid = () => ++seq;

function initial(): Item[] {
  const c = productCard(STORE.products[1]);
  return [
    { id: nid(), t: "bot", text: GREETING },
    { id: nid(), t: "me", text: "Quanto custa o chapéu de palha?" },
    { id: nid(), t: "bot", text: "R$ 59,90, ou 3× de R$ 19,97 sem juros." },
    ...(c.kind === "card" ? [{ id: nid(), t: "card" as const, product: c.product, stock: c.stock }] : []),
  ];
}

export default function Vapti() {
  const { unlock } = useHome();
  const [items, setItems] = useState<Item[]>(initial);
  const [reserved, setReserved] = useState<Set<number>>(() => new Set());
  const [draft, setDraft] = useState("");
  const bot = useRef(new VaptiBot());
  const chain = useRef<Promise<void>>(Promise.resolve());
  const body = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = body.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items]);

  const push = (it: Item) => setItems((xs) => [...xs, it]);

  const enqueue = (replies: BotReply[]) => {
    chain.current = chain.current.then(async () => {
      const reduce = prefersReducedMotion();
      const typingId = nid();
      push({ id: typingId, t: "typing" });
      await sleep(reduce ? 0 : 420);
      setItems((xs) => xs.filter((x) => x.id !== typingId));
      for (const r of replies) {
        if (r.kind === "note") push({ id: nid(), t: "note", text: r.text });
        else if (r.kind === "card") push({ id: nid(), t: "card", product: r.product, stock: r.stock });
        else {
          push({ id: nid(), t: "bot", text: r.text, btns: r.btns });
          pop();
          if (r.handoff) unlock("equipe");
        }
        await sleep(reduce ? 0 : 160);
      }
    });
  };

  const send = (text: string, shown?: string) => {
    const t = text.trim();
    if (!t) return;
    push({ id: nid(), t: "me", text: shown ?? t });
    const { replies, fuzzy } = bot.current.reply(t);
    if (fuzzy) unlock("typo");
    enqueue(replies);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(draft);
    setDraft("");
  };

  const reserve = (id: number, p: Product) => {
    setReserved((s) => new Set(s).add(id));
    push({ id: nid(), t: "me", text: `Separa pra mim: ${p.name}` });
    enqueue([
      {
        kind: "text",
        text: `Pronto! A equipe da ${STORE.name} vai separar 1 ${p.name.toLowerCase()} pra você. Dá pra pagar o sinal no Pix aqui mesmo.\n(Demonstração: nenhum Pix é gerado.)`,
      },
    ]);
  };

  return (
    <section className="wrap sec" id="vapti" aria-labelledby="vaptiH">
      <div className="sec-head">
        <span className="eyebrow mono">Produto próprio · no ar</span>
        <h2 id="vaptiH">Vapti</h2>
      </div>
      <div className="main-event">
        <div className="me-copy">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="me-logo" src="/img/vapti-branco.svg" alt="Vapti" width={132} height={46} />
          <h3>
            Sua loja num link. Resposta na <em>velocidade de um raio</em>.
          </h3>
          <p>
            Chat próprio, vitrine com estoque e robô que responde na hora, para loja que vive do
            Instagram. O cliente abre o link da bio, vê o que tem, pergunta, pede pra separar e paga no
            Pix sem sair da conversa. O dinheiro cai direto na conta da loja.
          </p>
          <dl className="facts">
            <dt className="mono">Status</dt>
            <dd>
              <span className="live">No ar em vapti.chat</span>, com lojas entrando por convite
            </dd>
            <dt className="mono">Robô</dt>
            <dd>
              Regras em português, <b>sem IA de propósito</b>: previsível e sem custo por mensagem.
              Entende erro de digitação, abreviação e pergunta dupla, e responde com o estoque de
              verdade.
            </dd>
            <dt className="mono">Piloto</dt>
            <dd>lith1um, loja de baterias para moto elétrica, que puxou o recurso “Serve para”</dd>
            <dt className="mono">Stack</dt>
            <dd>Next.js 15 · Express 5 · MongoDB · Socket.io · Railway · Vercel</dd>
          </dl>
          <a className="btn-v" href="https://vapti.chat" target="_blank" rel="noopener noreferrer">
            Abrir vapti.chat
          </a>
        </div>

        <div className="phone-wrap">
          <span className="mono">Converse com o robô · tente escrever errado</span>
          <div className="phone">
            <div className="ph-head">
              <div className="av" aria-hidden="true">
                AM
              </div>
              <div>
                <b>{STORE.name}</b>
                <span>Moda praia · João Pessoa</span>
              </div>
              <span className="demo">Loja demonstração</span>
            </div>
            <div className="ph-body" ref={body} aria-live="polite">
              {items.map((it) => {
                switch (it.t) {
                  case "me":
                    return (
                      <div key={it.id} className="msg me">
                        {it.text}
                      </div>
                    );
                  case "bot":
                    return (
                      <div key={it.id} className="msg bot">
                        <span className="auto">Resposta automática</span>
                        {it.text}
                        {it.btns && (
                          <div className="btns">
                            {it.btns.map((b) => (
                              <button
                                key={b}
                                type="button"
                                onClick={() =>
                                  b === "Falar com a equipe"
                                    ? send("quero falar com a equipe", b)
                                    : input.current?.focus()
                                }
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  case "note":
                    return (
                      <div key={it.id} className="note">
                        {it.text}
                      </div>
                    );
                  case "typing":
                    return (
                      <div key={it.id} className="typing" aria-label="digitando">
                        <i />
                        <i />
                        <i />
                      </div>
                    );
                  case "card":
                    return (
                      <div key={it.id} className="pcard">
                        <div className="pimg" style={{ "--pc": it.product.color } as CSSProperties} />
                        <div className="pinfo">
                          <b>{it.product.name}</b>
                          <span>{brl(it.product.price)}</span>
                          <small className={it.stock ? "" : "out"}>
                            {it.stock ? `${it.stock} em estoque` : "Esgotado"}
                          </small>
                          <button
                            type="button"
                            className="sep"
                            disabled={!it.stock || reserved.has(it.id)}
                            onClick={() => reserve(it.id, it.product)}
                          >
                            {reserved.has(it.id) ? "Separado" : "Separa pra mim"}
                          </button>
                        </div>
                      </div>
                    );
                }
              })}
            </div>
            <div className="chips" aria-label="Sugestões de pergunta">
              {CHIPS.map((q) => (
                <button key={q} type="button" onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
            <form className="ph-input" onSubmit={onSubmit}>
              <input
                ref={input}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                aria-label="Mensagem para a loja"
                placeholder="Pergunte algo à loja"
                autoComplete="off"
                maxLength={160}
              />
              <button type="submit" aria-label="Enviar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="shots">
        <figure>
          <Image src="/img/vapti-chat.webp" alt="Chat da loja lith1um no Vapti, com o robô perguntando se a moto é elétrica ou a combustão" width={390} height={900} sizes="(max-width: 960px) 50vw, 200px" />
          <figcaption>O robô pergunta só o que muda a resposta.</figcaption>
        </figure>
        <figure>
          <Image src="/img/vapti-vitrine.webp" alt="Vitrine da lith1um filtrada por moto elétrica VX 72V" width={390} height={900} sizes="(max-width: 960px) 50vw, 200px" />
          <figcaption>A vitrine se filtra pela resposta.</figcaption>
        </figure>
        <figure>
          <Image src="/img/vapti-painel.webp" alt="Painel da loja no Vapti, tela de ajustes do Serve para" width={1280} height={900} sizes="(max-width: 960px) 100vw, 640px" />
          <figcaption>No painel, a loja monta as perguntas sem programar.</figcaption>
        </figure>
      </div>
    </section>
  );
}
