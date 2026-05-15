import type { Section } from "@/app/page";

const features = [
  {
    title: "Design + Tech",
    description:
      "We don't choose between beautiful and functional. Our work is both. Every pixel has a purpose, every line of code has intention.",
  },
  {
    title: "On-Time Delivery",
    description:
      "Deadlines are a promise, not a suggestion. We plan carefully and communicate clearly so your project lands on time, every time.",
  },
  {
    title: "Scalable Solutions",
    description:
      "Whether you're a local brand or scaling globally, we build digital products that grow with you, from MVP to full enterprise.",
  },
  {
    title: "Transparent Pricing",
    description:
      "No hidden fees, no surprises. You'll always know exactly what you're getting and what you're paying for, upfront.",
  },
];

interface AboutProps {
  onNavigate: (section: Section) => void;
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <section className="h-dvh overflow-y-auto bg-[#f8f6f2]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-16 section-enter">
        {/* Section header line */}
        <div className="flex items-center gap-4 mb-10 sm:mb-20">
          <span className="text-[#c8a96e] font-serif text-sm">01</span>
          <div className="h-px flex-1 bg-[#e0dbd3]" />
          <span className="text-[#b5a898] text-[11px] tracking-[0.2em] uppercase">
            About Us
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Left Content */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-bold leading-[1.2] mb-8">
              Where Balinese Artistry Meets Solid Technology
            </h2>
            <div className="space-y-5 text-[#6b6560] leading-relaxed text-base">
              <p>
                <strong className="text-[#1a1a1a]">Wana Digital</strong> is a
                Bali-based creative and technology studio on a mission to bridge
                the gap between art and the digital world. We believe great
                digital products are not just functional. They should be
                beautiful, intentional, and deeply human.
              </p>
              <p>
                From brand identity and logo design to UI/UX, web development,
                AI research, and API integration, we offer end-to-end digital
                solutions under one roof. Though our studio is newly founded,
                our team brings over 5 years of hands-on experience delivering
                projects across design and technology, so you get the energy of
                a fresh perspective with the confidence of a seasoned team.
              </p>
            </div>
            <button
              onClick={() => onNavigate("services")}
              className="inline-block mt-10 text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-500"
            >
              Start Your Project
            </button>
          </div>

          {/* Right - Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="border-t border-[#e0dbd3] pt-6"
              >
                <h3 className="font-semibold text-base text-[#1a1a1a] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#8a8578] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
