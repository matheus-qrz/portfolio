import Image from "next/image";

const PATH = [
  { org: "Independente", role: "Fundador e desenvolvedor · Vapti, Tableflow e projetos para clientes", when: "2023 → hoje" },
  { org: "Wisecare", role: "Desenvolvedor front-end júnior · telessaúde", when: "2021 → hoje" },
  { org: "Netfans", role: "Desenvolvedor front-end", when: "2021 → 2024" },
];

const VOWS = [
  ["Respeito", "Escuto antes de escrever código. Escopo, prazo e valor vão por escrito antes de começar."],
  ["Disciplina", "Toda decisão fica registrada. Só no Vapti são mais de noventa registros de arquitetura."],
  ["Humildade", "Digo quando algo não vale a pena. Já pivotei produto meu por isso."],
];

export default function About() {
  return (
    <section className="wrap sec" id="sobre" aria-labelledby="sobreH">
      <div className="shrine">
        <Image
          src="/img/templo.webp"
          alt="Estátua antiga de Buda em meditação, talhada num paredão de pedra no deserto, iluminada por lamparinas na base, sob a Via Láctea, com ruínas ao longe"
          width={1536}
          height={1024}
          sizes="(max-width: 1180px) 100vw, 1150px"
        />
        <div className="shrine-copy">
          <span className="eyebrow mono">Como eu trabalho</span>
          <h2 id="sobreH">Respeito, disciplina, humildade</h2>
          <p>Escuto antes de escrever código, registro cada decisão e digo quando algo não vale a pena.</p>
        </div>
        <span className="credit mono">Imagem gerada com IA para esta página</span>
      </div>
      <ol className="vows">
        {VOWS.map(([t, d]) => (
          <li key={t}>
            <b>{t}</b>
            <p>{d}</p>
          </li>
        ))}
      </ol>
      <div className="bio">
        <div className="pic">
          <Image
            src="/img/vitoria.webp"
            alt="Matheus comemorando, de braços erguidos, com medalha, guirlanda e flores"
            width={449}
            height={1000}
            sizes="(max-width: 900px) 260px, 340px"
          />
        </div>
        <div className="txt">
          <span className="eyebrow mono">Sobre</span>
          <h3>Quem escreve o código</h3>
          <p>
            Sou engenheiro de software em João Pessoa. Trabalho no front-end de uma plataforma de
            telessaúde desde 2021 e, desde 2023, construo meus próprios produtos e sistemas para
            clientes. Escrevo do banco de dados à tela e uso IA no dia a dia pra entregar mais rápido,
            sem abrir mão de teste e revisão.
          </p>
          <ul className="path">
            {PATH.map((p) => (
              <li key={p.org}>
                <div>
                  <b>{p.org}</b>
                  <br />
                  <span>{p.role}</span>
                </div>
                <span className="mono">{p.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
