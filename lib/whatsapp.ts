/**
 * O número vive em `NEXT_PUBLIC_WHATSAPP`, só dígitos e com DDI
 * (ex.: 5583999999999). Sem a variável não existe link: o botão fixo e o
 * atalho do contato simplesmente não renderizam, em vez de levar a uma
 * conversa com número vazio.
 *
 * `process.env.NEXT_PUBLIC_WHATSAPP` precisa aparecer escrito por
 * extenso — é assim que o Next substitui o valor no bundle do cliente.
 */
export function whatsappHref(message: string): string | null {
  const digits = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
