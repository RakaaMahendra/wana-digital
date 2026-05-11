"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Portfolio from "@/components/landing/Portfolio";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

export type Section = "home" | "about" | "services" | "portfolio" | "contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("home");

  return (
    <div className="h-screen overflow-hidden">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />

      <div className="h-full">
        {activeSection === "home" && <Hero onNavigate={setActiveSection} />}
        {activeSection === "about" && <About onNavigate={setActiveSection} />}
        {activeSection === "services" && (
          <Services onNavigate={setActiveSection} />
        )}
        {activeSection === "portfolio" && <Portfolio />}
        {activeSection === "contact" && <Contact />}
      </div>

      {activeSection === "contact" && <Footer onNavigate={setActiveSection} />}
    </div>
  );
}
