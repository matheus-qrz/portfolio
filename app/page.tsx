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
      <main>
        <Hero />
        <div className="shell">
          <div className="rule" />
        </div>
        {/* Prova primeiro, pedido logo depois, detalhe para quem quiser mais. */}
        <Showcase />
        <Contact />
        <Projects />
        <PrintDemo />
        <About />
        <Experience />
        <Footer />
      </main>
    </LocaleProvider>
  );
}
