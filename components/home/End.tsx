"use client";

import { SECRETS, useHome } from "./secrets";

export default function End() {
  const { found, reset } = useHome();
  return (
    <section className="wrap end" id="fim" aria-labelledby="fimH">
      <h2 id="fimH">Oito detalhes escondidos</h2>
      <p>Tem oito interações escondidas pela página. As que você achou aparecem aqui.</p>
      <ol className="secrets">
        {SECRETS.map((s, i) =>
          found.has(s.id) ? (
            <li key={s.id} className="got">
              <span className="mono">Detalhe {i + 1}</span>
              <b>{s.name}</b>
              <small>{s.how}</small>
            </li>
          ) : (
            <li key={s.id}>
              <span className="mono">Detalhe {i + 1}</span>
              <b>???</b>
              <small>Ainda escondido</small>
            </li>
          ),
        )}
      </ol>
      <div className="foot-links">
        <span>Matheus Oliveira · João Pessoa, PB</span>
        <a href="https://vapti.chat" target="_blank" rel="noopener noreferrer">vapti.chat</a>
        <a href="https://tableflow.software" target="_blank" rel="noopener noreferrer">tableflow.software</a>
        <a href="https://www.instagram.com/matheusqrzkmt/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="/hire">English · hire me</a>
        <button type="button" className="reset" onClick={reset}>
          Zerar detalhes
        </button>
      </div>
    </section>
  );
}
