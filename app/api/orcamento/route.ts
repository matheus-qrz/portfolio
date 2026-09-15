import { NextResponse } from "next/server";
import { Resend } from "resend";
import { quoteSchema } from "@/lib/quote";

export const runtime = "nodejs";

const TO = process.env.QUOTE_TO_EMAIL ?? "mthsqrz97@gmail.com";
/**
 * O Resend só entrega a partir de um domínio verificado. Enquanto não
 * houver um, `onboarding@resend.dev` funciona e entrega no e-mail dono
 * da conta — que é exatamente para onde isso vai.
 */
const FROM = process.env.QUOTE_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

/**
 * Limite por IP em memória. Segura rajada de um mesmo cliente; NÃO é
 * proteção séria em serverless, onde cada instância tem o próprio mapa
 * e um cold start zera tudo. Se virar problema de verdade, trocar por
 * Upstash/Redis.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // teto de memória
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "desconhecido";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid" },
      { status: 422 },
    );
  }

  const { name, company, email, need, website } = parsed.data;

  // Honeypot preenchido: responde 200 para o bot não aprender nada,
  // e não envia nada.
  if (website) return NextResponse.json({ ok: true });

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[orcamento] RESEND_API_KEY ausente — e-mail não enviado");
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 500 },
    );
  }

  const linhas = [
    ["Nome", name],
    ["Empresa", company || "—"],
    ["E-mail", email],
  ] as const;

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email, // responder direto do cliente de e-mail
      subject: `Orçamento — ${name}${company ? ` · ${company}` : ""}`,
      text: [
        ...linhas.map(([k, v]) => `${k}: ${v}`),
        "",
        "O que precisa:",
        need,
      ].join("\n"),
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#13100E">
          <h2 style="margin:0 0 16px;font-size:18px">Pedido de orçamento</h2>
          <table style="border-collapse:collapse;margin-bottom:18px">
            ${linhas
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:3px 16px 3px 0;color:#6B6157">${k}</td><td style="padding:3px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
              )
              .join("")}
          </table>
          <p style="margin:0 0 6px;color:#6B6157">O que precisa:</p>
          <p style="margin:0;white-space:pre-wrap">${escapeHtml(need)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[orcamento] Resend recusou:", error);
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[orcamento] falha inesperada:", err);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 },
    );
  }
}
