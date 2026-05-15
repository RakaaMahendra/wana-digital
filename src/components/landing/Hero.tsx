"use client";

import { useEffect, useState } from "react";
import type { Section } from "@/app/page";

const TITLE = "Wana Digital";
const LETTERS = TITLE.split("");

// ms before first letter appears
const REVEAL_START = 120;
// ms between each letter appearing
const LETTER_STAGGER = 65;

interface HeroProps {
  onNavigate: (section: Section) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    LETTERS.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleCount((prev) => Math.max(prev, i + 1));
      }, REVEAL_START + i * LETTER_STAGGER);
      timers.push(t);
    });

    // Show supporting content once all letters are visible
    const readyT = setTimeout(
      () => setReady(true),
      REVEAL_START + LETTERS.length * LETTER_STAGGER + 280
    );
    timers.push(readyT);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative h-dvh flex items-center justify-center overflow-hidden bg-foreground">
      {/* Architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Thin decorative vertical lines */}
      <div className="absolute top-0 left-1/2 w-px h-28 bg-linear-to-b from-transparent to-white/10" />
      <div className="absolute bottom-0 left-1/2 w-px h-28 bg-linear-to-t from-transparent to-white/10" />

      <div className="relative z-10 text-center px-6">
        {/* Label */}
        <p
          className="text-[#b5a898] text-[11px] tracking-[0.35em] uppercase mb-10"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          Bali-Based Design &amp; Technology Studio
        </p>

        {/* Main heading — left-to-right letter reveal */}
        <h1
          className="font-serif text-6xl sm:text-8xl md:text-[10rem] font-bold leading-[0.9] mb-6"
          aria-label={TITLE}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 0,
          }}
        >
          {LETTERS.map((letter, i) => {
            const isSpace = letter === " ";
            const isDigital = i >= 5;
            const isVisible = i < visibleCount;

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: isSpace ? "0.3em" : undefined,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    color: isDigital ? "#c8a96e" : "#ffffff",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(18px)",
                    transition: isVisible
                      ? "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)"
                      : "none",
                  }}
                >
                  {isSpace ? "\u00A0" : letter}
                </span>
              </span>
            );
          })}
        </h1>

        {/* Gold accent line — spacing placeholder only, intentionally unfilled */}
        <div className="mb-8 h-px" />

        {/* Tagline */}
        <p
          className="text-white/40 text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-14 tracking-wide"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}
        >
          Your brand deserves more than a template. We build digital experiences
          from the ground up.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          <button
            onClick={() => onNavigate("portfolio")}
            className="text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 bg-white text-foreground hover:bg-[#c8a96e] hover:text-white transition-all duration-500"
          >
            View Portfolio
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 border border-white/25 text-white hover:border-white/60 transition-all duration-500"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
