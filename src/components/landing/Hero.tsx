import type { Section } from "@/app/page";

interface HeroProps {
  onNavigate: (section: Section) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
      {/* Subtle architectural grid pattern */}
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

      <div className="relative z-10 text-center px-6 section-enter">
        {/* Small label */}
        <p className="text-[#b5a898] text-[11px] tracking-[0.35em] uppercase mb-10">
          Bali-Based Design & Technology Studio
        </p>

        {/* Main heading */}
        <h1 className="font-serif text-6xl sm:text-8xl md:text-[10rem] text-white font-bold tracking-normal leading-[0.9] mb-6">
          Wana Digital
        </h1>

        {/* Thin accent line */}
        <div className="w-16 h-px bg-[#c8a96e] mx-auto mb-8" />

        {/* Tagline */}
        <p className="text-white/40 text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-14 tracking-wide">
          Your brand deserves more than a template. We build digital experiences
          from the ground up.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
