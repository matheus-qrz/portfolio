import { Big_Shoulders_Display, Inter, Martian_Mono } from "next/font/google";
import About from "@/components/home/About";
import AiSection from "@/components/home/AiSection";
import Contact from "@/components/home/Contact";
import End from "@/components/home/End";
import Nav from "@/components/home/Nav";
import Poster from "@/components/home/Poster";
import Projects from "@/components/home/Projects";
import Services from "@/components/home/Services";
import Vapti from "@/components/home/Vapti";
import { HomeProvider } from "@/components/home/secrets";
import "@/components/home/home.css";

/**
 * Fontes da home. A Archivo (texto corrido) já vem do layout; aqui entram
 * a display condensada dos títulos, a mono das etiquetas e a Inter, que
 * imita a interface do Vapti dentro do celular de demonstração.
 */
const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});
const mono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});
const app = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-app",
  display: "swap",
});

export default function Home() {
  return (
    <div className={`mo ${display.variable} ${mono.variable} ${app.variable}`}>
      <HomeProvider>
        <Nav />
        <main id="top">
          <Poster />
          <Services />
          <Vapti />
          <AiSection />
          <Projects />
          <About />
          <Contact />
          <End />
        </main>
      </HomeProvider>
    </div>
  );
}
