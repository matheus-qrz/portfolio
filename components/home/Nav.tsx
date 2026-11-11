"use client";

import { useState } from "react";
import { SECRETS, useHome } from "./secrets";
import { setSoundEnabled } from "./sound";

export default function Nav() {
  const { found } = useHome();
  const [sound, setSound] = useState(true);

  return (
    <header className="nav">
      <div className="wrap">
        <a className="mark" href="#top" aria-label="Matheus Oliveira, início">
          M<b>O</b>
        </a>
        <nav aria-label="Seções">
          <a href="#servicos">Serviços</a>
          <a href="#vapti">Vapti</a>
          <a href="#ia">IA</a>
          <a href="#projetos">Projetos</a>
          <a href="#sobre">Sobre</a>
        </nav>
        <a className="pips" href="#fim" aria-label="Detalhes escondidos encontrados">
          <span className="mono">{found.size}/8</span>
          <span aria-hidden="true">
            {SECRETS.map((s) => (
              <i key={s.id} className={found.has(s.id) ? "on" : ""} />
            ))}
          </span>
        </a>
        <button
          type="button"
          className="sound mono"
          aria-pressed={sound}
          onClick={() => {
            setSound(!sound);
            setSoundEnabled(!sound);
          }}
        >
          {sound ? "Som" : "Mudo"}
        </button>
        <a className="navcta" href="#contato">
          Orçamento
        </a>
      </div>
    </header>
  );
}
