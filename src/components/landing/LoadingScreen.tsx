"use client";

import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [exiting, setExiting] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const exitTimer = setTimeout(() => setExiting(true), 3000);
    const doneTimer = setTimeout(() => onComplete(), 3700);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#1a1a1a]"
      style={{
        zIndex: 9999,
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* Architectural grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-10 left-10 w-14 h-14 border-t border-l border-white/10 loader-bracket" />
      <div className="absolute top-10 right-10 w-14 h-14 border-t border-r border-white/10 loader-bracket" />
      <div className="absolute bottom-10 left-10 w-14 h-14 border-b border-l border-white/10 loader-bracket" />
      <div className="absolute bottom-10 right-10 w-14 h-14 border-b border-r border-white/10 loader-bracket" />

      {/* Thin vertical lines from center */}
      <div
        className="absolute top-0 left-1/2 w-px loader-vline-top"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(200,169,110,0.25))",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 w-px loader-vline-bottom"
        style={{
          background:
            "linear-gradient(to top, transparent, rgba(200,169,110,0.25))",
        }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center select-none">
        {/* Subtitle — slides up from clip */}
        <div className="overflow-hidden mb-8">
          <p className="loader-subtitle text-[#b5a898] text-[10px] tracking-[0.5em] uppercase">
            Bali-Based Design &amp; Technology Studio
          </p>
        </div>

        {/* "Wana" — slides up from clip */}
        <div className="overflow-hidden">
          <h1
            className="loader-word-1 font-serif font-bold text-white"
            style={{
              fontSize: "clamp(2.8rem, 11vw, 8rem)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            Wana
          </h1>
        </div>

        {/* Gold thin rule between words */}
        <div
          className="relative w-full h-px my-2 overflow-hidden"
          style={{ maxWidth: "clamp(2.8rem, 11vw, 8rem)" }}
        >
          <div className="loader-rule absolute inset-y-0 left-0 bg-[#c8a96e]" />
        </div>

        {/* "Digital" — slides up slightly later */}
        <div
          style={{
            overflow: "clip",
            paddingBottom: "0.25em",
            marginBottom: "-0.25em",
          }}
        >
          <h1
            className="loader-word-2 font-serif font-bold"
            style={{
              fontSize: "clamp(2.8rem, 11vw, 8rem)",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.55)",
            }}
          >
            Digital
          </h1>
        </div>

        {/* Counter */}
        <div className="overflow-hidden mt-6">
          <p className="loader-counter-wrap text-white/20 text-[10px] tracking-[0.35em] font-mono tabular-nums">
            <LoadingCounter />
          </p>
        </div>
      </div>

      {/* Bottom domain */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center overflow-hidden">
        <span className="loader-bottom text-white/15 text-[9px] tracking-[0.4em] uppercase">
          wanadigital.id
        </span>
      </div>
    </div>
  );
}

function LoadingCounter() {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const duration = 2800;
    const steps = 60;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      // Ease-out curve: slow down near the end
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 2);
      setValue(Math.round(eased * 100));
      if (current >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return <>{String(value).padStart(3, "0")}%</>;
}
