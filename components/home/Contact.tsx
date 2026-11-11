"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { fieldErrors, type FieldError, type FieldName } from "@/lib/quote";
import { whatsappHref } from "@/lib/whatsapp";
import { useHome, type Kind } from "./secrets";
import { bell } from "./sound";

const MSG: Record<FieldName, Partial<Record<FieldError, string>>> = {
  name: { required: "Escreva seu nome pra eu saber com quem falo.", tooLong: "Nome longo demais." },
  company: { tooLong: "Nome da empresa longo demais." },
  email: { badEmail: "Confere o e-mail: é por ele que eu te respondo." },
  phone: { tooLong: "Esse número ficou longo demais." },
  need: {
    tooShort: "Conte um pouco mais: o que o negócio faz e o que está travando.",
    tooLong: "Ficou longo demais. Resume os pontos principais que a gente detalha depois.",
  },
};

const KINDS: { k: Kind; label: string }[] = [
  { k: "site", label: "Site" },
  { k: "sistema", label: "Sistema" },
  { k: "ia", label: "IA" },
];

type Status = "idle" | "sending" | "ok" | "error";

export default function Contact() {
  const { kind, setKind, unlock } = useHome();
  const [errors, setErrors] = useState<Partial<Record<FieldName, FieldError>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [first, setFirst] = useState("");
  const wa = whatsappHref("Oi, Matheus! Vim pelo seu portfolio.");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      kind,
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      need: String(fd.get("need") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    const errs = fieldErrors(data);
    setErrors(errs ?? {});
    if (errs) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setFirst(data.name.trim().split(/\s+/)[0]);
      setStatus("ok");
      form.reset();
      bell();
      unlock("pedido");
    } catch {
      setStatus("error");
    }
  };

  const err = (f: FieldName) => (errors[f] ? MSG[f][errors[f]!] ?? "Confere esse campo." : "");

  return (
    <section className="wrap sec" id="contato" aria-labelledby="contH">
      <div className="sec-head">
        <span className="eyebrow mono">Contato</span>
        <h2 id="contH">Me conta o que o seu negócio precisa</h2>
        <p>Respondo com escopo, prazo e valor por escrito.</p>
      </div>
      <div className="contact paper">
        <div className="cleft">
          <Image src="/img/retrato.webp" alt="Retrato de Matheus Oliveira" width={531} height={700} sizes="280px" />
          <h3>Quem responde é quem escreve o código</h3>
          <p>Sem intermediário e sem repasse. Se não for a hora de construir, eu também digo.</p>
          {wa && (
            <p>
              Prefere conversar?{" "}
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <b>Me chama no WhatsApp</b>
              </a>
            </p>
          )}
          {status === "ok" && (
            <div className="approved" role="status">
              <b>Pedido recebido</b>
              <p>Valeu{first ? `, ${first}` : ""}. Te respondo com escopo, prazo e valor por escrito.</p>
            </div>
          )}
          {status === "error" && (
            <div className="approved" role="alert" style={{ borderColor: "#B3141B", background: "rgba(179,20,27,.06)" }}>
              <b style={{ color: "#B3141B" }}>Não foi dessa vez</b>
              <p>O envio falhou do meu lado. Tenta de novo em instantes{wa ? " ou me chama no WhatsApp" : ""}.</p>
            </div>
          )}
        </div>
        <form onSubmit={onSubmit} noValidate>
          <fieldset>
            <legend className="mono">O que você precisa</legend>
            {KINDS.map(({ k, label }) => (
              <label key={k} className="radio">
                <input type="radio" name="kind" value={k} checked={kind === k} onChange={() => setKind(k)} />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <div className="field">
            <label htmlFor="fNome">Seu nome</label>
            <input id="fNome" name="name" autoComplete="name" aria-invalid={!!errors.name} />
            <span className="err">{err("name")}</span>
          </div>
          <div className="field">
            <label htmlFor="fEmail">E-mail</label>
            <input id="fEmail" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />
            <span className="err">{err("email")}</span>
          </div>
          <div className="field">
            <label htmlFor="fFone">WhatsApp (opcional)</label>
            <input id="fFone" name="phone" type="tel" autoComplete="tel" />
            <span className="err">{err("phone")}</span>
          </div>
          <div className="field">
            <label htmlFor="fMsg">O que o seu negócio precisa</label>
            <textarea
              id="fMsg"
              name="need"
              placeholder="Ex.: tenho uma loja de moda praia e respondo “tá disponível?” o dia inteiro no direct."
              aria-invalid={!!errors.need}
            />
            <span className="err">{err("need")}</span>
          </div>
          {/* Honeypot: humano não vê, bot preenche. */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
            <label htmlFor="fSite">Site</label>
            <input id="fSite" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <button className="submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Enviando…" : "Enviar pedido"}
          </button>
        </form>
      </div>
    </section>
  );
}
