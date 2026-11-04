import Hero from "@/components/portfolio/sections/Hero";
import PortraitReveal from "@/components/portfolio/sections/PortraitReveal";
import Statement from "@/components/portfolio/sections/Statement";
import Services from "@/components/portfolio/sections/Services";
import SelectedWork from "@/components/portfolio/sections/SelectedWork";
import About from "@/components/portfolio/sections/About";
import Footer from "@/components/portfolio/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <PortraitReveal />
      <Statement />
      <Services />
      <SelectedWork />
      <About />
      <Footer />
    </main>
  );
}
