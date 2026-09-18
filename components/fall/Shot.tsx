"use client";

import Image from "next/image";
import type { FallShot } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import styles from "./Shot.module.css";

/**
 * Um print solto na queda. A caixa tem proporção declarada — 16:10 para
 * desktop, 390×844 para celular — e a imagem entra por `fill`: é a mesma
 * solução que já resolveu o carrossel, e é ela que impede a cena de
 * saltar enquanto o arquivo não chegou.
 */
export default function Shot({
  shot,
  ready,
}: {
  shot: FallShot;
  /**
   * A caixa existe desde o HTML servido — é ela que segura a proporção.
   * A imagem só é montada depois que a página está de pé: um print de
   * 1440px a três mil pixels do primeiro quadro não tem o que fazer
   * disputando banda com a primeira pintura.
   */
  ready: boolean;
}) {
  const { locale } = useI18n();
  const phone = shot.kind === "phone";

  return (
    <figure className={`${styles.frame} ${phone ? styles.phone : styles.desk}`}>
      {ready && (
      <Image
        className={styles.img}
        src={`/shots/${shot.file}`}
        alt={shot.alt[locale]}
        fill
        sizes={
          phone
            ? "(max-width: 900px) 40vw, 210px"
            : "(max-width: 900px) 76vw, 620px"
        }
      />
      )}
    </figure>
  );
}
