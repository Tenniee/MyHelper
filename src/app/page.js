import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CTASection from "./components/CTASection";
import HowItWorks from "./components/Howitworks";
import Testimmonials from "./components/Testimmonials";
import Pricing from "./components/Pricing";
import FinalCTA from "./components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <CTASection />
      <HowItWorks />
      <Testimmonials />
      <Pricing />
      <FinalCTA />
    </main>
  );
}
