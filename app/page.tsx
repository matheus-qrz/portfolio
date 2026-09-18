import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Fall from "@/components/fall/Fall";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LocaleProvider } from "@/lib/i18n";
import { QuoteKindProvider } from "@/lib/quoteKind";

export default function Home() {
  return (
    <LocaleProvider>
      <QuoteKindProvider>
        <SmoothScroll />
        <SiteHeader />
        {/* A ordem da página: a queda (hero + os quatro projetos), sites,
            sistemas, prova, orçamento e sobre. A ordem canônica vive em
            SECTIONS, em lib/content.ts. */}
        <main id="top">
          <Fall />
          <Contact />
          <About />
          <Experience />
        </main>
        <Footer />
        <WhatsAppButton />
      </QuoteKindProvider>
    </LocaleProvider>
  );
}
