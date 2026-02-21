import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Servicios from "./components/Servicios";
import Stats from "./components/Stats";
import Portafolio from "./components/Portafolio";
import Testimonios from "./components/Testimonios";
import CTAFinal from "./components/CTAFinal";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Stats />
        <Portafolio />
        <Testimonios />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
