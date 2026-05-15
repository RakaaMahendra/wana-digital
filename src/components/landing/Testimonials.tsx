"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    client_name: "Alex Morgan",
    client_role: "CEO, Heritage Coffee",
    client_avatar: "",
    message:
      "Wana Digital truly understood our brand vision. The logo and brand identity they delivered far exceeded our expectations!",
    rating: 5,
    is_active: true,
    created_at: "",
  },
  {
    id: "2",
    client_name: "Rivan Hartono",
    client_role: "CTO, TechStartup ID",
    client_avatar: "",
    message:
      "They built our entire SaaS platform from scratch clean architecture, fast delivery, and the UI looks stunning. Highly recommended!",
    rating: 5,
    is_active: true,
    created_at: "",
  },
  {
    id: "3",
    client_name: "James Wilson",
    client_role: "Owner, Urban Bistro",
    client_avatar: "",
    message:
      "Our app’s UI/UX is incredibly user-friendly. Customers love the new look and our conversion rate improved significantly.",
    rating: 4,
    is_active: true,
    created_at: "",
  },
  {
    id: "4",
    client_name: "Maya Lee",
    client_role: "Founder, EcoFashion",
    client_avatar: "",
    message:
      "The website they developed is fast, beautiful, and easy to manage. A team that truly delivers on both design and technology.",
    rating: 5,
    is_active: true,
    created_at: "",
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      })
      .catch(() => setTestimonials(fallbackTestimonials));
  }, []);

  if (testimonials === null) return <section className="h-dvh bg-[#1a1a1a]" />;

  const displayed = showAll ? testimonials : testimonials.slice(0, 2);

  return (
    <section className="h-dvh overflow-y-auto bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-16 section-enter">
        {/* Section header line */}
        <div className="flex items-center gap-4 mb-10 sm:mb-20">
          <span className="text-[#c8a96e] font-serif text-sm">04</span>
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-white/30 text-[11px] tracking-[0.2em] uppercase">
            Testimonials
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-[1.2] mb-4 max-w-2xl">
          What Our Clients Say
        </h2>
        <p className="text-white/40 text-lg max-w-xl mb-16">
          Real feedback from clients who trusted us with their projects.
        </p>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {displayed.map((t) => (
            <div
              key={t.id}
              className="border border-white/10 p-8 sm:p-10 hover:border-white/20 transition-colors duration-500"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < t.rating
                        ? "text-[#c8a96e] fill-[#c8a96e]"
                        : "text-white/15"
                    }
                  />
                ))}
              </div>
              <p className="text-white leading-relaxed text-base mb-8">
                &ldquo;{t.message}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-6">
                <div className="w-10 h-10 bg-[#c8a96e]/15 text-[#c8a96e] flex items-center justify-center font-serif text-sm">
                  {t.client_name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">
                    {t.client_name}
                  </div>
                  <div className="text-white/35 text-xs">{t.client_role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more button */}
        {!showAll && testimonials.length > 2 && (
          <div className="text-center mt-14">
            <button
              onClick={() => setShowAll(true)}
              className="text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 border border-white/25 text-white hover:bg-white hover:text-[#1a1a1a] transition-all duration-500"
            >
              View All Testimonials
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
