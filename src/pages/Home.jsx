import Hero from "../components/Hero";
import Servicios from "../components/Servicios";
import Stats from "../components/Stats";
import Portafolio from "../components/Portafolio";
import Testimonios from "../components/Testimonios";
import CTAFinal from "../components/CTAFinal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Servicios />
      <Stats />
      <Portafolio />
      <Testimonios />
      <CTAFinal />
    </main>
  );
}
