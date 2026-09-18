"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import type { FallParams } from "@/lib/content";
import { useFallRegistry } from "./FallContext";

/**
 * Um item solto na cena: bloco de texto ou print, tanto faz. O wrapper
 * só se posiciona e se registra — quem o move é o loop do `Fall`.
 */
export default function FallItem({
  id,
  params,
  className,
  children,
}: {
  id?: string;
  params: FallParams;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const registry = useFallRegistry();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !registry) return;
    return registry.register(el, params);
  }, [registry, params]);

  return (
    <div id={id} ref={ref} className={className}>
      {children}
    </div>
  );
}
