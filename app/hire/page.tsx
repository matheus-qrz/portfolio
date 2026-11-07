import type { Metadata } from "next";
import Hire from "@/components/hire/Hire";
import { hire } from "@/lib/hire";

/**
 * A página para quem contrata. Fica fora do menu da home de propósito:
 * o link vai direto em candidatura, LinkedIn e currículo.
 */
export const metadata: Metadata = {
  title: hire.meta.title,
  description: hire.meta.description,
  alternates: { canonical: "/hire" },
  openGraph: {
    title: hire.meta.title,
    description: hire.meta.description,
    siteName: "Matheus Oliveira",
    locale: "en_US",
    type: "profile",
    url: "/hire",
  },
};

export default function HirePage() {
  return <Hire />;
}
