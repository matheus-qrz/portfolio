import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import PrintDemo from "@/components/PrintDemo";
import Projects from "@/components/Projects";
import Showcase from "@/components/Showcase";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LocaleProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LocaleProvider>
      <SmoothScroll />
      <SiteHeader />
      {/* Ordem de página de venda: gancho, prova, pedido — e só então o
          detalhe, para quem quiser mais. A ordem canônica vive em
          SECTIONS, em lib/content.ts, de onde saem a numeração e o menu. */}
      <main>
        <Hero />
        <Showcase />
        <Contact />
        <Projects />
        <PrintDemo />
        <About />
        <Experience />
      </main>
      <Footer />
      <WhatsAppButton />
    </LocaleProvider>
  );
}
