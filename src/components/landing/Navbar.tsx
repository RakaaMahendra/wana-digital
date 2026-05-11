"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import type { Section } from "@/app/page";

const navLinks: { section: Section; label: string }[] = [
  { section: "about", label: "About" },
  { section: "services", label: "Services" },
  { section: "portfolio", label: "Portfolio" },
  { section: "contact", label: "Contact" },
];

interface NavbarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isHome = activeSection === "home";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHome
          ? "bg-transparent"
          : "bg-[#f8f6f2]/95 backdrop-blur-md border-b border-[#e0dbd3]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3"
          >
            <Image
              src={isHome ? "/asset/26.png" : "/asset/27.png"}
              alt="Wana Digital Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span
              className={`text-lg font-serif tracking-[0.2em] uppercase transition-colors duration-500 ${
                isHome ? "text-white" : "text-[#1a1a1a]"
              }`}
            >
              Wana Digital
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => onNavigate(link.section)}
                className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 ${
                  activeSection === link.section
                    ? isHome
                      ? "text-white"
                      : "text-[#1a1a1a]"
                    : isHome
                    ? "text-white/50 hover:text-white"
                    : "text-[#8a8578] hover:text-[#1a1a1a]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate("contact")}
              className={`text-[11px] tracking-[0.15em] uppercase font-medium px-5 py-2.5 border transition-all duration-300 ${
                isHome
                  ? "border-white/30 text-white hover:bg-white hover:text-[#1a1a1a]"
                  : "border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
              }`}
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${
              isHome ? "text-white" : "text-[#1a1a1a]"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#f8f6f2] border-t border-[#e0dbd3]">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => {
                  onNavigate(link.section);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-[11px] tracking-[0.15em] uppercase font-medium transition-colors ${
                  activeSection === link.section
                    ? "text-[#1a1a1a]"
                    : "text-[#8a8578] hover:text-[#1a1a1a]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate("contact");
                setIsOpen(false);
              }}
              className="block w-full text-center border border-[#1a1a1a] text-[#1a1a1a] px-4 py-3 text-[11px] tracking-[0.15em] uppercase font-medium mt-4 hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
