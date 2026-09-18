import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Martian_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const martian = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://matheusoliveira.dev"),
  title: "Matheus Oliveira — Engenheiro de software",
  description:
    "Construo os sistemas que os negócios usam para funcionar: pedido por QR code, impressão térmica ESC/POS, cobrança recorrente e os painéis que sustentam a operação.",
  openGraph: {
    title: "Matheus Oliveira — Engenheiro de software",
    description:
      "SaaS de gestão para restaurantes e hotelaria, checkout sob medida e ferramentas web. React 19, Next.js 15, Node e AWS.",
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
    <html
      lang="pt-BR"
      className={cn(archivo.variable, martian.variable, plex.variable, "font-sans", inter.variable)}
    >
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
