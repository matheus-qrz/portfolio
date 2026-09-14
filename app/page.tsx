import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Manifest from "@/components/Manifest";
import Nav from "@/components/Nav";
import PrintDemo from "@/components/PrintDemo";
import Projects from "@/components/Projects";
import Rails from "@/components/Rails";
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
        <Manifest />
        <PrintDemo />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
    </LocaleProvider>
  );
}
