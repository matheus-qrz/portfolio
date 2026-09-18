import { z } from "zod";

export const QUOTE_KINDS = ["site", "sistema", "indefinido"] as const;

/**
 * Um schema só, usado no cliente (feedback imediato) e no servidor
 * (a validação que realmente vale). O cliente é conveniência; a rota
 * nunca confia no que chega.
 */
export const quoteSchema = z.object({
  /** Vem pré-marcado pelas portas do hero e pelos CTAs das seções. */
  kind: z.enum(QUOTE_KINDS).default("indefinido"),
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  /**
   * WhatsApp. Sem validação de formato: número de telefone escrito por
   * gente real vem com DDI, parênteses, traço, espaço e ponto, e recusar
   * um contato válido custa mais caro do que aceitar um torto.
   */
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  need: z.string().trim().min(20).max(4000),
  /** Honeypot: humano nunca preenche, bot preenche quase sempre. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const FIELDS = ["name", "company", "email", "phone", "need"] as const;
export type FieldName = (typeof FIELDS)[number];
export type FieldError = "required" | "badEmail" | "tooShort" | "tooLong";

/** Erros por campo, no formato que o formulário consome. */
export function fieldErrors(
  data: unknown,
): Partial<Record<FieldName, FieldError>> | null {
  const parsed = quoteSchema.safeParse(data);
  if (parsed.success) return null;

  const out: Partial<Record<FieldName, FieldError>> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0];
    if (typeof key !== "string") continue;
    if (!(FIELDS as readonly string[]).includes(key)) continue;

    const field = key as FieldName;
    if (out[field]) continue;

    if (field === "email") out[field] = "badEmail";
    else if (issue.code === "too_big") out[field] = "tooLong";
    else if (field === "need") out[field] = "tooShort";
    else out[field] = "required";
  }

  /**
   * Se o único problema foi o honeypot, o cliente não reclama: deixa
   * enviar, e a rota responde 200 sem mandar nada. O bot não aprende
   * onde errou.
   */
  return Object.keys(out).length ? out : null;
}
