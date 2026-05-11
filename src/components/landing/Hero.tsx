"use client";

import { useEffect, useRef, useState } from "react";
import type { Section } from "@/app/page";

const TITLE = "Wana Digital";
const LETTERS = TITLE.split("");
const STAGGER_MS = 75; // gap between each letter revealing
const HOLD_MS = 2200; // how long all letters stay visible
const EXIT_MS = 500; // fade-out duration
const GAP_MS = 350; // pause before next cycle

type LetterState = "hidden" | "visible" | "exiting";

function useLetterReveal() {
  const [states, setStates] = useState<LetterState[]>(() =>
    Array(LETTERS.length).fill("hidden")
  );
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;

    const runCycle = () => {
      if (cancelled.current) return;

      const timers: ReturnType<typeof setTimeout>[] = [];

      // Reveal each letter with stagger
      LETTERS.forEach((_, i) => {
        timers.push(
          setTimeout(() => {
            if (cancelled.current) return;
            setStates((prev) => {
              const next = [...prev];
              next[i] = "visible";
              return next;
            });
          }, i * STAGGER_MS)
        );
      });

      const totalEnter = LETTERS.length * STAGGER_MS;

      // Exit all at once after hold
      timers.push(
        setTimeout(() => {
          if (cancelled.current) return;
          setStates(Array(LETTERS.length).fill("exiting"));
        }, totalEnter + HOLD_MS)
      );

      // Reset and loop
      timers.push(
        setTimeout(() => {
          if (cancelled.current) return;
          setStates(Array(LETTERS.length).fill("hidden"));
          setTimeout(() => {
            if (!cancelled.current) runCycle();
          }, GAP_MS);
        }, totalEnter + HOLD_MS + EXIT_MS)
      );

      return timers;
    };

    const timers = runCycle();

    return () => {
      cancelled.current = true;
      timers?.forEach(clearTimeout);
    };
  }, []);

  return states;
}

interface HeroProps {
  onNavigate: (section: Section) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const letterStates = useLetterReveal();
  const [ready, setReady] = useState(false);

  // Show subtitle/buttons after first reveal finishes entering
  useEffect(() => {
    const t = setTimeout(
      () => setReady(true),
      LETTERS.length * STAGGER_MS + 400
    );
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
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
      <div className="absolute top-0 left-1/2 w-px h-28 bg-gradient-to-b from-transparent to-white/10" />
      <div className="absolute bottom-0 left-1/2 w-px h-28 bg-gradient-to-t from-transparent to-white/10" />

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

        {/* Main heading — letter reveal loop */}
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
          {LETTERS.map((char, i) => {
            const state = letterStates[i];
            const isSpace = char === " ";

            const transform =
              state === "hidden"
                ? "translateY(110%)"
                : state === "visible"
                ? "translateY(0%)"
                : "translateY(-30%)";

            const opacity = state === "exiting" ? 0 : 1;

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: isSpace ? "0.35em" : undefined,
                  overflow: "clip",
                  paddingBottom: "0.4em",
                  marginBottom: "-0.4em",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    color: "#ffffff",
                    transform,
                    opacity,
                    transition:
                      state === "exiting"
                        ? `transform ${EXIT_MS}ms cubic-bezier(0.4,0,1,1), opacity ${EXIT_MS}ms ease`
                        : `transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease`,
                    willChange: "transform",
                  }}
                >
                  {isSpace ? "\u00A0" : char}
                </span>
              </span>
            );
          })}
        </h1>

        {/* Gold accent line */}
        <div className="overflow-hidden mx-auto mb-8 w-16 h-px">
          <div
            style={{
              height: "100%",
              background: "#c8a96e",
              transform: ready ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>

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
            className="text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 bg-white text-[#1a1a1a] hover:bg-[#c8a96e] hover:text-white transition-all duration-500"
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
