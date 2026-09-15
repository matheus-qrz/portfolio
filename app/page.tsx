import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import PrintDemo from "@/components/PrintDemo";
import Projects from "@/components/Projects";
import Rails from "@/components/Rails";
import Showcase from "@/components/Showcase";
import SmoothScroll from "@/components/SmoothScroll";
import { LocaleProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LocaleProvider>
      <SmoothScroll />
      <Rails />
      <Nav />
      {/* Ordem de página de venda: gancho, prova, pedido — e só então o
          detalhe, para quem quiser mais. A ordem canônica vive em
          SECTIONS, em lib/content.ts, de onde saem a numeração e o menu. */}
      <main>
        <Hero />
        <div className="shell">
          <div className="rule" />
        </div>
        <Showcase />
        <Contact />
        <Projects />
        <PrintDemo />
        <About />
        <Experience />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
