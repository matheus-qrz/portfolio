import About from "@/components/About";
import Contact from "@/components/Contact";
import Fall from "@/components/fall/Fall";
import Footer from "@/components/Footer";
import Proof from "@/components/Proof";
import SiteHeader from "@/components/SiteHeader";
import Sites from "@/components/Sites";
import SmoothScroll from "@/components/SmoothScroll";
import Software from "@/components/Software";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LocaleProvider } from "@/lib/i18n";
import { QuoteKindProvider } from "@/lib/quoteKind";

export default function Home() {
  return (
    <LocaleProvider>
      <QuoteKindProvider>
        <SmoothScroll />
        <SiteHeader />
        {/* A ordem canônica da página vive em SECTIONS, em lib/content.ts:
            a queda (hero + os quatro projetos), sites, sistemas, prova,
            orçamento e sobre. */}
        <main id="top">
          <Fall />
          <Sites />
          <Software />
          <Proof />
          <Contact />
          <About />
        </main>
        <Footer />
        <WhatsAppButton />
      </QuoteKindProvider>
    </LocaleProvider>
  );
}
