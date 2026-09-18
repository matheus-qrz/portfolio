import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

/**
 * Uma família só, com o eixo de largura carregado: a display larga
 * (wdth 118–125) e a linha de contraste estreita (wdth 64) são a mesma
 * fonte em duas instâncias, não duas famílias.
 *
 * `--font-sans` sai daqui via `--font-archivo`, resolvido em globals.css
 * com o fallback dentro do var(). Componentes do shadcn que dependem de
 * `--font-sans` passam a usar a Archivo sem mudança nenhuma.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://matheusoliveira.dev"),
  title: "Matheus Oliveira — Engenheiro de software",
  description:
    "Sites rápidos para negócios e sistemas sob medida. Engenheiro de software em João Pessoa.",
  openGraph: {
    title: "Matheus Oliveira — Engenheiro de software",
    description:
      "Sites rápidos para negócios e sistemas sob medida. Engenheiro de software em João Pessoa.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
