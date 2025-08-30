import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import About from "@/components/About";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main className="bg-gray-50">
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <CTA />
      <About />
      <Gallery />
    </main>
  );
}
