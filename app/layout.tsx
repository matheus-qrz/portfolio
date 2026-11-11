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

/**
 * Estático, em português: é o que serve o primeiro HTML e o que os
 * robôs leem. Depois da hidratação, quem troca título e descrição junto
 * com o idioma é o `LocaleProvider`.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://matheusoliveira.dev"),
  title: "Matheus Oliveira — Engenheiro de software · sistemas, sites e IA",
  description:
    "Sistemas sob medida, sites e produtos com IA para negócios que não podem parar. Engenheiro de software em João Pessoa, criador do Vapti e do Tableflow.",
  openGraph: {
    title: "Matheus Oliveira — Engenheiro de software · sistemas, sites e IA",
    description:
      "Sistemas sob medida, sites e produtos com IA, com escopo, prazo e valor por escrito. Engenheiro de software em João Pessoa.",
    images: [{ url: "/img/templo.webp", width: 1536, height: 1024 }],
    siteName: "Matheus Oliveira",
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
