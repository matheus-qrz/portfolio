const SERVICES = [
  {
    cls: "s1",
    title: "Sistemas sob medida",
    text: "Do jeito que o seu negócio já trabalha, sem você se adaptar a um software genérico.",
    items: ["Painel, PDV, agenda e estoque", "Pagamento por Pix e cartão", "Nota fiscal e impressão térmica"],
    proof: [
      { href: "#vapti", label: "Vapti" },
      { href: "#projetos", label: "Tableflow" },
    ],
  },
  {
    cls: "s2",
    title: "IA aplicada",
    text: "Modelo de linguagem onde ele paga a conta, e regra fixa onde ela resolve melhor e mais barato.",
    items: ["Agentes no WhatsApp", "Geração de imagem com IA", "Automação do que hoje é feito à mão"],
    proof: [
      { href: "#ia", label: "MEI Rendeu" },
      { href: "#ia", label: "Copa AI" },
    ],
  },
  {
    cls: "s3",
    title: "Sites",
    text: "Rápidos no celular, achados no Google e com o WhatsApp a um toque.",
    items: ["Institucional e página de venda", "SEO local e Google Meu Negócio", "Formulário que chega no seu e-mail"],
    proof: [{ href: "#projetos", label: "Lívia Lacerda Advocacia" }],
  },
];

export default function Services() {
  return (
    <section className="wrap sec" id="servicos" aria-labelledby="svcH">
      <div className="sec-head">
        <span className="eyebrow mono">Serviços</span>
        <h2 id="svcH">O que eu construo</h2>
        <p>
          Três tipos de trabalho, cada um com um projeto real por trás. Escopo, prazo e valor sempre
          por escrito antes de começar.
        </p>
      </div>
      <ul className="services">
        {SERVICES.map((s) => (
          <li key={s.cls} className={`svc ${s.cls} paper`}>
            <span className="band" />
            <div className="in">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="proof">
              <span className="mono">Prova</span>
              {s.proof.map((p) => (
                <a key={p.label} href={p.href}>
                  {p.label}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
