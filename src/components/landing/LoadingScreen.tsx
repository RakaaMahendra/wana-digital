"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [linesVisible, setLinesVisible] = useState(false);
  const calledRef = useRef(false);

  // Trigger line / content reveal shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setLinesVisible(true), 250);
    return () => clearTimeout(t);
  }, []);

  // Progress counter
  useEffect(() => {
    const steps = 60;
    const intervalMs = 2800 / steps;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const eased = 1 - Math.pow(1 - current / steps, 2);
      setProgress(Math.round(eased * 100));
      if (current >= steps) clearInterval(timer);
    }, intervalMs);
    return () => clearInterval(timer);
  }, []);

  // Exit timing
  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    const t1 = setTimeout(() => setExiting(true), 3200);
    const t2 = setTimeout(() => onComplete(), 3900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 9999,
        background: "#0d0d0d",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Architectural corner brackets */}
      <div
        className="absolute top-8 left-8"
        style={{
          width: 28,
          height: 28,
          borderTop: "1px solid rgba(200,169,110,0.5)",
          borderLeft: "1px solid rgba(200,169,110,0.5)",
        }}
      />
      <div
        className="absolute top-8 right-8"
        style={{
          width: 28,
          height: 28,
          borderTop: "1px solid rgba(200,169,110,0.5)",
          borderRight: "1px solid rgba(200,169,110,0.5)",
        }}
      />
      <div
        className="absolute bottom-8 left-8"
        style={{
          width: 28,
          height: 28,
          borderBottom: "1px solid rgba(200,169,110,0.5)",
          borderLeft: "1px solid rgba(200,169,110,0.5)",
        }}
      />
      <div
        className="absolute bottom-8 right-8"
        style={{
          width: 28,
          height: 28,
          borderBottom: "1px solid rgba(200,169,110,0.5)",
          borderRight: "1px solid rgba(200,169,110,0.5)",
        }}
      />

      {/* Studio label — top center */}
      <div className="absolute top-10 inset-x-0 flex justify-center">
        <p
          style={{
            color: "rgba(255,255,255,0.18)",
            fontSize: 9,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            opacity: linesVisible ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        >
          Bali-Based Design &amp; Technology Studio
        </p>
      </div>

      {/* Center content */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ gap: 0 }}
      >
        {/* Top drawing line */}
        <div
          style={{
            height: 1,
            width: linesVisible ? 240 : 0,
            background: "rgba(255,255,255,0.09)",
            transition: "width 1.3s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: 36,
          }}
        />

        {/* Logo + brand */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            opacity: linesVisible ? 1 : 0,
            transform: linesVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.9s ease 0.55s, transform 0.9s ease 0.55s",
          }}
        >
          <Image
            src="/asset/26.png"
            alt="Wana Digital"
            width={52}
            height={52}
            style={{
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
              opacity: 0.88,
            }}
            priority
          />

          <div style={{ textAlign: "center" }}>
            <p
              style={{
                color: "#ffffff",
                fontFamily: "serif",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Wana Digital
            </p>
            {/* Gold rule below brand name */}
            <div
              style={{
                width: "100%",
                height: 1,
                background: "rgba(200,169,110,0.38)",
              }}
            />
          </div>
        </div>

        {/* Bottom drawing line */}
        <div
          style={{
            height: 1,
            width: linesVisible ? 240 : 0,
            background: "rgba(255,255,255,0.09)",
            transition: "width 1.3s cubic-bezier(0.16,1,0.3,1) 0.12s",
            marginTop: 36,
          }}
        />
      </div>

      {/* Progress bar + labels */}
      <div
        className="absolute bottom-12 inset-x-0 flex flex-col items-center"
        style={{ gap: 8 }}
      >
        <div
          style={{
            width: "min(220px, 52vw)",
            height: 1,
            background: "rgba(255,255,255,0.07)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${progress}%`,
              background: "#c8a96e",
              transition: "width 0.12s ease",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "min(220px, 52vw)",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: 9,
              letterSpacing: "0.3em",
              fontFamily: "monospace",
            }}
          >
            LOADING
          </span>
          <span
            style={{
              color: "rgba(200,169,110,0.6)",
              fontSize: 9,
              letterSpacing: "0.2em",
              fontFamily: "monospace",
            }}
          >
            {String(progress).padStart(3, "0")}%
          </span>
        </div>
      </div>

      {/* Bottom domain */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center">
        <span
          style={{
            color: "rgba(255,255,255,0.08)",
            fontSize: 9,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
          }}
        >
          wanadigital.id
        </span>
      </div>
    </div>
  );
}
