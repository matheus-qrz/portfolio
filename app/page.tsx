import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LocaleProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <LocaleProvider>
      <SmoothScroll />
      <SiteHeader />
      <main id="top">
        <Contact />
        <About />
        <Experience />
      </main>
      <Footer />
      <WhatsAppButton />
    </LocaleProvider>
  );
}
