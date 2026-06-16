import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatYouGet from "@/components/WhatYouGet";
import Scenarios from "@/components/Scenarios";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import AITeaser from "@/components/AITeaser";
import Marquee from "@/components/Marquee";
import Reviews from "@/components/Reviews";
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
        <Marquee />
        <p className="max-w-[1280px] mx-auto px-5 md:px-20 mt-8 text-center text-ink-muted text-[15px] leading-[1.6]">
          A studio that actually answers — and is still here after launch.{" "}
          <span className="text-ink">We reply within 24 hours,</span>{" "}
          in English &amp; Spanish.
        </p>
        <div className="asymmetric-divider" />
        <WhatYouGet />
        <Scenarios />
        <div className="asymmetric-divider" />
        <Services />
        <div className="asymmetric-divider" />
        <Stats />
        <div className="asymmetric-divider" />
        <Process />
        <div className="asymmetric-divider" />
        <AITeaser />
        <Reviews />
        <Pricing />
        <FAQ />
        <ContactForm />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
