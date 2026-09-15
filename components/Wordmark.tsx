/**
 * Wordmark dos produtos. O Tableflow tem o acento laranja da própria
 * marca; o resto é tipografia pura. Fica num componente só para a faixa
 * do hero e o carrossel nunca divergirem.
 */
export default function Wordmark({
  id,
  accentClass,
}: {
  id: string;
  accentClass?: string;
}) {
  if (id === "tableflow") {
    return (
      <>
        table<span className={accentClass}>flow</span>
      </>
    );
  }
  const names: Record<string, string> = {
    meirendeu: "MEI Rendeu",
    servin: "Servin",
    tijolo: "Vale o Tijolo?",
    copa: "Copa AI",
  };
  return <>{names[id] ?? id}</>;
}
