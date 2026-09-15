import type { ReactNode } from "react";

/**
 * Wordmark de um produto. Só o Tableflow tem tratamento próprio — o
 * acento da marca cai sobre "flow". Os outros são o nome em texto, para
 * a lista ler como um conjunto e não como cinco logotipos brigando.
 *
 * `accent` é a classe do módulo CSS de quem renderiza: a cor do acento
 * muda conforme o fundo da seção.
 */
export default function Wordmark({
  id,
  name,
  accent,
}: {
  id: string;
  name: string;
  accent?: string;
}): ReactNode {
  if (id === "tableflow") {
    return (
      <>
        table<span className={accent}>flow</span>
      </>
    );
  }
  return <>{name}</>;
}
