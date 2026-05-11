"use client";

import { useCallback, useRef, useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Portfolio from "@/components/landing/Portfolio";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import LoadingScreen from "@/components/landing/LoadingScreen";

export type Section = "home" | "about" | "services" | "portfolio" | "contact";

type CurtainState = "idle" | "enter" | "exit";

const SECTION_LABEL: Record<Section, string> = {
  home: "",
  about: "About",
  services: "Services",
  portfolio: "Portfolio",
  contact: "Contact",
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [loaded, setLoaded] = useState(false);
  const [curtain, setCurtain] = useState<CurtainState>("idle");
  const [curtainLabel, setCurtainLabel] = useState("");
  const pendingSection = useRef<Section | null>(null);

  const navigate = useCallback(
    (section: Section) => {
      if (section === activeSection || curtain !== "idle") return;

      pendingSection.current = section;
      setCurtainLabel(SECTION_LABEL[section]);
      setCurtain("enter");

      // Curtain fully in → swap section
      setTimeout(() => {
        if (pendingSection.current) setActiveSection(pendingSection.current);
        setCurtain("exit");
      }, 450);

      // Curtain fully out → idle
      setTimeout(() => {
        setCurtain("idle");
      }, 900);
    },
    [activeSection, curtain]
  );

  // Curtain translateY values
  const curtainTranslate =
    curtain === "idle"
      ? "translateY(100%)"
      : curtain === "enter"
      ? "translateY(0%)"
      : "translateY(-100%)";

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div
        className={`h-screen overflow-hidden transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar activeSection={activeSection} onNavigate={navigate} />

        <div className="h-full">
          {activeSection === "home" && <Hero onNavigate={navigate} />}
          {activeSection === "about" && <About onNavigate={navigate} />}
          {activeSection === "services" && <Services onNavigate={navigate} />}
          {activeSection === "portfolio" && <Portfolio />}
          {activeSection === "contact" && <Contact />}
        </div>

        {activeSection === "contact" && <Footer onNavigate={navigate} />}
      </div>

      {/* Transition curtain */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 8000,
          background: "#1a1a1a",
          transform: curtainTranslate,
          transition:
            curtain === "enter"
              ? "transform 0.42s cubic-bezier(0.76, 0, 0.24, 1)"
              : curtain === "exit"
              ? "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)"
              : "none",
          pointerEvents: curtain === "idle" ? "none" : "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Architectural grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Section label */}
        {curtainLabel && (
          <span
            style={{
              fontFamily: "var(--font-jakarta, serif)",
              fontSize: "clamp(1rem, 4vw, 2rem)",
              color: "rgba(255,255,255,0.08)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontWeight: 700,
              userSelect: "none",
            }}
          >
            {curtainLabel}
          </span>
        )}
        {/* Gold bottom line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(to right, transparent, #c8a96e, transparent)",
            opacity: curtain === "enter" ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
    </>
  );
}
