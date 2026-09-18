"use client";

import { useI18n } from "@/lib/i18n";
import { whatsappHref } from "@/lib/whatsapp";
import styles from "./WhatsAppButton.module.css";

export function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.83c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.72c0 4.46-3.63 8.08-8.09 8.08a8.1 8.1 0 0 1-4.12-1.13l-.3-.17-3.06.8.82-2.99-.19-.31a8.02 8.02 0 0 1-1.24-4.29c0-4.46 3.63-8.08 8.09-8.08Zm-2.6 4.3c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.08 3.6.57.25 1.01.39 1.36.5.57.18 1.09.16 1.5.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46Z" />
    </svg>
  );
}

/**
 * Botão fixo no canto inferior direito. Sem `NEXT_PUBLIC_WHATSAPP` ele
 * não renderiza — melhor não existir do que abrir uma conversa vazia.
 */
export default function WhatsAppButton() {
  const { t } = useI18n();
  const href = whatsappHref(t.whatsapp.message);
  if (!href) return null;

  return (
    <a
      className={styles.fab}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.aria}
    >
      <WhatsAppGlyph />
      <span className={styles.label}>{t.whatsapp.label}</span>
    </a>
  );
}
