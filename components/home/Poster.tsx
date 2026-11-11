"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useHome, type Kind } from "./secrets";
import { bell, replay, thud } from "./sound";

const ANSWERS: Record<Kind, { text: string; links: { href: string; label: string }[] }> = {
  site: {
    text: "Site rápido, achado no Google e com WhatsApp a um toque.",
    links: [{ href: "#contato", label: "Pedir orçamento de site" }],
  },
  sistema: {
    text: "Sistema sob medida, como o Vapti e o Tableflow.",
    links: [
      { href: "#vapti", label: "Ver o Vapti" },
      { href: "#contato", label: "Pedir orçamento de sistema" },
    ],
  },
  ia: {
    text: "Agente no WhatsApp, geração de imagem ou automação.",
    links: [
      { href: "#ia", label: "Testar o agente" },
      { href: "#contato", label: "Pedir orçamento" },
    ],
  },
};

const PICKS: { k: Kind; label: string }[] = [
  { k: "site", label: "Um site" },
  { k: "sistema", label: "Um sistema" },
  { k: "ia", label: "IA no meu negócio" },
];

/** Cada letra vira um span com o índice, que a CSS usa para escalonar a entrada. */
function Letters({ text, start }: { text: string; start: number }) {
  return (
    <span className={`ln ${start === 0 ? "ln1" : "ln2"}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          className="ch"
          aria-hidden="true"
          style={{ "--i": start + i } as CSSProperties}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function Poster() {
  const { unlock, setKind } = useHome();
  const [picked, setPicked] = useState<Kind | null>(null);
  const [held, setHeld] = useState(false);
  const poster = useRef<HTMLDivElement>(null);
  const vs = useRef<HTMLDivElement>(null);
  const kick = useRef<HTMLImageElement>(null);
  const blue = useRef<HTMLHeadingElement>(null);
  const kicks = useRef(0);

  const impact = () => {
    replay(poster.current, "shake", "intro");
    replay(vs.current, "land", "intro");
    setTimeout(() => poster.current?.classList.remove("shake"), 320);
  };

  const onKick = () => {
    replay(kick.current, "again", "intro");
    impact();
    thud(70);
    kicks.current += 1;
    if (kicks.current === 3) unlock("chute");
  };

  const onPick = (k: Kind) => {
    setPicked(k);
    setKind(k);
    replay(vs.current, "land", "intro");
    bell();
    unlock("escolha");
  };

  const hitPlanilha = () => {
    replay(blue.current, "glitch");
    thud(55);
    unlock("planilha");
  };

  const onBlueKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hitPlanilha();
    }
  };

  const answer = picked ? ANSWERS[picked] : null;

  return (
    <div className="wrap hero">
      <div className="poster paper intro" ref={poster}>
        <button
          type="button"
          className={`ticker${held ? " held" : ""}`}
          aria-label="Prajied preto do pôster, com letreiro correndo. Toque para segurar."
          onClick={() => {
            setHeld(!held);
            if (!held) unlock("prajied");
          }}
        >
          <span>
            ENGENHARIA DE SOFTWARE &nbsp;★&nbsp; AGENTES DE IA &nbsp;★&nbsp; SISTEMAS SOB MEDIDA
            &nbsp;★&nbsp; SITES RÁPIDOS &nbsp;★&nbsp; JOÃO PESSOA · PB &nbsp;★&nbsp; PROJETOS REMOTOS
            &nbsp;★&nbsp;
          </span>
        </button>

        <div className="card">
          <div className="red-c">
            <span className="tag mono">Engenheiro de software · João Pessoa</span>
            <h1 className="fname">
              <Letters text="Matheus" start={0} />
              <Letters text="Oliveira" start={7} />
            </h1>
            <p className="tagline">
              Sistemas, sites e <em>produtos com IA</em> para negócios que não podem parar.
            </p>
            <div className="ctas">
              <a className="btn-r" href="#contato">
                Pedir orçamento
              </a>
              <a className="btn-o" href="#projetos">
                Ver projetos
              </a>
            </div>
            <ul className="record" aria-label="No ar agora">
              <li>
                <b>NO AR AGORA</b>
              </li>
              <li>Vapti · vapti.chat</li>
              <li>Tableflow · tableflow.software</li>
            </ul>
            <div className="photo">
              <button
                type="button"
                onClick={onKick}
                aria-label="Foto de Matheus dando um chute. Toque para repetir."
              >
                <Image
                  ref={kick}
                  className="intro"
                  src="/img/chute.webp"
                  alt="Matheus dando um chute alto na praia, de luvas e calção preto"
                  width={791}
                  height={900}
                  priority
                  sizes="(max-width: 820px) 88vw, 420px"
                />
              </button>
              <span className="hint mono" aria-hidden="true">
                toque
              </span>
            </div>
          </div>

          <div className="vs intro" ref={vs} aria-hidden="true">
            <span>VS</span>
          </div>

          <div className="blue-c">
            <div className="sheetpic" aria-hidden="true">
              <span className="hd" />
              <span className="hd">A</span>
              <span className="hd">B</span>
              <span className="hd">C</span>
              <span className="hd">1</span>
              <span>Vendas</span>
              <span>Custo</span>
              <span>Saldo</span>
              <span className="hd">2</span>
              <span>1.240</span>
              <span>980</span>
              <span>260</span>
              <span className="hd">3</span>
              <span>???</span>
              <span>1.105</span>
              <span className="bad">#REF!</span>
              <span className="hd">4</span>
              <span>FINAL_v3</span>
              <span />
              <span className="bad">#DIV/0!</span>
              <span className="hd">5</span>
              <span />
              <span>=SOMA(</span>
              <span />
            </div>
            <span className="tag mono">O adversário</span>
            <h2
              ref={blue}
              className="fname planilha"
              role="button"
              tabIndex={0}
              aria-label="A planilha do seu negócio"
              onClick={hitPlanilha}
              onKeyDown={onBlueKey}
            >
              <span className="ln">A planilha</span>
              <small>do seu negócio</small>
            </h2>
            <ul className="record" aria-label="Ficha do adversário">
              <li>Invicta desde 2014</li>
              <li>47 abas · 0 backups</li>
              <li>Golpe favorito: #REF!</li>
            </ul>
          </div>
        </div>

        <div className="foot">
          <span className="mono">Do que você precisa?</span>
          <div className="pick">
            {PICKS.map(({ k, label }) => (
              <button
                key={k}
                type="button"
                data-k={k}
                aria-pressed={picked === k}
                onClick={() => onPick(k)}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="answer" aria-live="polite">
            {answer ? (
              <>
                {answer.text}{" "}
                {answer.links.map((l, i) => (
                  <span key={l.href}>
                    {i > 0 ? " ou " : ""}
                    <a href={l.href}>{l.label}</a>
                  </span>
                ))}
              </>
            ) : (
              "Escolha uma opção e eu te mostro por onde começar."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
