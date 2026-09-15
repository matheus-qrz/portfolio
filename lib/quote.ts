import { z } from "zod";

/**
 * Um schema só, usado no cliente (feedback imediato) e no servidor
 * (a validação que realmente vale). O cliente é conveniência; a rota
 * nunca confia no que chega.
 */
export const quoteSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  need: z.string().trim().min(20).max(4000),
  /** Honeypot: humano nunca preenche, bot preenche quase sempre. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export type FieldName = "name" | "company" | "email" | "need";

/** Erros por campo, no formato que o formulário consome. */
export function fieldErrors(
  data: unknown,
): Partial<Record<FieldName, "required" | "badEmail" | "tooShort">> | null {
  const parsed = quoteSchema.safeParse(data);
  if (parsed.success) return null;

  const out: Partial<Record<FieldName, "required" | "badEmail" | "tooShort">> =
    {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0];
    if (key === "email") out.email = "badEmail";
    else if (key === "need") out.need = "tooShort";
    else if (key === "name") out.name = "required";
  }
  return Object.keys(out).length ? out : { name: "required" };
}
