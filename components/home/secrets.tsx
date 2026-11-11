"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { listenForFirstGesture } from "./sound";

export type SecretId =
  | "escolha"
  | "planilha"
  | "prajied"
  | "chute"
  | "typo"
  | "equipe"
  | "agente"
  | "pedido";

export const SECRETS: { id: SecretId; name: string; how: string }[] = [
  { id: "escolha", name: "Escolha", how: "Disse do que precisa no pôster" },
  { id: "planilha", name: "Planilha", how: "Acertou a planilha" },
  { id: "prajied", name: "Prajied preto", how: "Segurou o prajied no topo do pôster" },
  { id: "chute", name: "Chute", how: "Repetiu o chute três vezes" },
  { id: "typo", name: "Erro de digitação", how: "O robô entendeu mesmo assim" },
  { id: "equipe", name: "Atendente", how: "Pediu pra falar com a equipe" },
  { id: "agente", name: "Agente", how: "Fez três lançamentos no MEI Rendeu" },
  { id: "pedido", name: "Orçamento", how: "Mandou o pedido" },
];

export type Kind = "site" | "sistema" | "ia";

interface HomeApi {
  found: ReadonlySet<SecretId>;
  unlock: (id: SecretId) => void;
  reset: () => void;
  kind: Kind;
  setKind: (k: Kind) => void;
}

const HomeContext = createContext<HomeApi>({
  found: new Set(),
  unlock: () => {},
  reset: () => {},
  kind: "site",
  setKind: () => {},
});

const KEY = "mo-detalhes";

/**
 * Estado compartilhado da home: os oito detalhes escondidos (guardados no
 * navegador do visitante) e o tipo de trabalho escolhido no pôster, que
 * chega pré-marcado no formulário.
 */
export function HomeProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<Set<SecretId>>(() => new Set());
  const [toast, setToast] = useState<{ name: string; n: number } | null>(null);
  const [kind, setKind] = useState<Kind>("site");
  const foundRef = useRef(found);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    listenForFirstGesture();
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]") as SecretId[];
      const next = new Set(saved.filter((id) => SECRETS.some((s) => s.id === id)));
      foundRef.current = next;
      setFound(next);
    } catch {
      /* sem armazenamento, sem problema */
    }
  }, []);

  const unlock = useCallback((id: SecretId) => {
    if (foundRef.current.has(id)) return;
    const next = new Set(foundRef.current).add(id);
    foundRef.current = next;
    setFound(next);
    try {
      localStorage.setItem(KEY, JSON.stringify([...next]));
    } catch {
      /* ignora */
    }
    const s = SECRETS.find((x) => x.id === id);
    if (s) {
      setToast({ name: s.name, n: next.size });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(null), 3000);
    }
  }, []);

  const reset = useCallback(() => {
    foundRef.current = new Set();
    setFound(new Set());
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignora */
    }
  }, []);

  const value = useMemo(
    () => ({ found, unlock, reset, kind, setKind }),
    [found, unlock, reset, kind],
  );

  return (
    <HomeContext.Provider value={value}>
      {children}
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        <span className="medal" aria-hidden="true">
          {toast?.n ?? 1}
        </span>
        <span>
          <span className="mono">Detalhe encontrado</span>
          <b>{toast ? `${toast.name} (${toast.n}/8)` : ""}</b>
        </span>
      </div>
    </HomeContext.Provider>
  );
}

export const useHome = () => useContext(HomeContext);
