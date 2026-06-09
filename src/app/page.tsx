import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import AITeaser from "@/components/AITeaser";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <Nav />
      <main className="pt-32">
        <Hero />
        <div className="asymmetric-divider" />
        <Services />
        <div className="asymmetric-divider" />
        <Stats />
        <div className="asymmetric-divider" />
        <Process />
        <div className="asymmetric-divider" />
        <AITeaser />
        <Pricing />
        <FAQ />
        <ContactForm />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
