"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PortfolioItem } from "@/lib/types";

type CategoryGroup = "All" | "Design & Creative" | "Technology & IT";

const DESIGN_CATEGORIES = [
  "Logo & Brand Identity",
  "Social Media Design",
  "Print & Packaging",
  "2D",
  "Presentation Design",
];
const TECH_CATEGORIES = [
  "Web Development",
  "Fullstack Application",
  "Mobile App",
];

// These local tech items are always shown regardless of API data
const staticTechPortfolio: PortfolioItem[] = [
  {
    id: "static-1",
    title: "Koji Kost",
    description:
      "Property rental fullstack app with real-time room availability and booking system",
    category: "Fullstack Application",
    image_url: "/asset/Photo Project Kost.jpg",
    is_featured: true,
    created_at: "",
  },
  {
    id: "static-2",
    title: "Ninggratt Coffee Website",
    description:
      "E-commerce website for Ninggratt Coffee with product showcase, online ordering, and brand-aligned design",
    category: "Web Development",
    image_url: "/asset/Web Development Design Ninggratt Coffee.png",
    is_featured: true,
    created_at: "",
  },
  {
    id: "static-3",
    title: "Koji Coffee App",
    description:
      "Mobile app for Koji Coffee featuring product browsing, cart, checkout, order tracking, and loyalty rewards",
    category: "Mobile App",
    image_url: "/asset/Mobile App Design Koji Coffee.png",
    is_featured: true,
    created_at: "",
  },
];

const fallbackDesignPortfolio: PortfolioItem[] = [
  {
    id: "1",
    title: "Wana Digital Brand Identity",
    description:
      "Logo and brand identity design for Wana Digital, a Bali-based digital studio",
    category: "Logo & Brand Identity",
    image_url: "/asset/Logo Wana Digital.png",
    is_featured: true,
    created_at: "",
  },
  {
    id: "2",
    title: "Ninggrat Social Media",
    description: "Instagram feed and content design for Ninggrat brand",
    category: "Social Media Design",
    image_url: "/asset/Instagram Social  Media Design Ninggrat.png",
    is_featured: true,
    created_at: "",
  },
  {
    id: "3",
    title: "Koji Kopi Packaging",
    description:
      "Coffee packaging design for Koji Kopi with premium bag mockup and brand elements",
    category: "Print & Packaging",
    image_url: "/asset/Print & Packaging Koji Kopi.png",
    is_featured: true,
    created_at: "",
  },
  {
    id: "4",
    title: "Wawa Youtuber Illustration",
    description:
      "Custom 2D character illustration for Wawa, a content creator and YouTuber",
    category: "2D",
    image_url: "/asset/2D Ilustration Wawa Youtuber.png",
    is_featured: true,
    created_at: "",
  },
  {
    id: "5",
    title: "Koji Coffee Brand Page",
    description:
      "Brand one-pager design for Koji Coffee showcasing logo, packaging, and brand identity",
    category: "Presentation Design",
    image_url: "/asset/Presentation Design Koji Coffee.png",
    is_featured: true,
    created_at: "",
  },
  {
    id: "6",
    title: "Jiwa Branding 1",
    description:
      "Brand identity design for Jiwa showcasing logo and visual identity elements",
    category: "Logo & Brand Identity",
    image_url: "/asset/Jiwa Branding 1.png",
    is_featured: true,
    created_at: "",
  },
  {
    id: "7",
    title: "Jiwa Branding 2",
    description:
      "Extended brand identity design for Jiwa with comprehensive visual system",
    category: "Logo & Brand Identity",
    image_url: "/asset/Jiwa Branding 2.png",
    is_featured: true,
    created_at: "",
  },
  {
    id: "8",
    title: "Jiwa Social Media 1",
    description:
      "Social media content design for Jiwa with on-brand visual storytelling",
    category: "Social Media Design",
    image_url: "/asset/Jiwa Socmed 1.png",
    is_featured: true,
    created_at: "",
  },
  {
    id: "9",
    title: "Jiwa Social Media 2",
    description:
      "Social media feed and content design for Jiwa brand across platforms",
    category: "Social Media Design",
    image_url: "/asset/Jiwa Socmed 2.png",
    is_featured: true,
    created_at: "",
  },
];

function getCategoryGroup(category: string): CategoryGroup {
  if (DESIGN_CATEGORIES.includes(category)) return "Design & Creative";
  if (TECH_CATEGORIES.includes(category)) return "Technology & IT";
  return "All";
}

export default function Portfolio() {
  const [designPortfolio, setDesignPortfolio] = useState<PortfolioItem[]>(
    fallbackDesignPortfolio
  );
  const [activeTab, setActiveTab] = useState<CategoryGroup>("All");
  const [showAll, setShowAll] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Only keep items that are explicitly Design & Creative from API
          const designOnlyFromApi = (data as PortfolioItem[]).filter(
            (p) => getCategoryGroup(p.category) === "Design & Creative"
          );
          if (designOnlyFromApi.length > 0)
            setDesignPortfolio(designOnlyFromApi);
        }
      })
      .catch(() => {});
  }, []);

  // Always combine API design items + local static tech items
  const portfolio = [...designPortfolio, ...staticTechPortfolio];

  const designCount = portfolio.filter(
    (p) => getCategoryGroup(p.category) === "Design & Creative"
  ).length;
  const techCount = portfolio.filter(
    (p) => getCategoryGroup(p.category) === "Technology & IT"
  ).length;

  // Only show items that belong to a known category (avoids phantom "All" count)
  const knownItems = portfolio.filter(
    (p) => getCategoryGroup(p.category) !== "All"
  );

  const filtered =
    activeTab === "All"
      ? knownItems
      : knownItems.filter((p) => getCategoryGroup(p.category) === activeTab);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  const tabs: { label: CategoryGroup; count: number }[] = [
    { label: "All", count: designCount + techCount },
    { label: "Design & Creative", count: designCount },
    { label: "Technology & IT", count: techCount },
  ];

  return (
    <section className="h-dvh overflow-y-auto bg-[#f8f6f2]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-16 section-enter">
        {/* Section header line */}
        <div className="flex items-center gap-4 mb-10 sm:mb-20">
          <span className="text-[#c8a96e] font-serif text-sm">03</span>
          <div className="h-px flex-1 bg-[#e0dbd3]" />
          <span className="text-[#b5a898] text-[11px] tracking-[0.2em] uppercase">
            Portfolio
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-bold leading-[1.2] mb-4 max-w-2xl">
          Our Best Work
        </h2>
        <p className="text-[#8a8578] text-lg max-w-xl mb-10">
          A curated selection of our design and technology projects.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => {
                  setActiveTab(tab.label);
                  setShowAll(false);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#1a1a1a] text-white"
                    : "bg-white text-[#1a1a1a] border border-[#e0dbd3] hover:border-[#1a1a1a]"
                }`}
              >
                {tab.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#f0ede8] text-[#8a8578]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((item) => {
            const isTech =
              getCategoryGroup(item.category) === "Technology & IT";
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                className="group relative aspect-[4/3] overflow-hidden bg-[#e0dbd3] cursor-pointer"
                onClick={() => setActiveId(isActive ? null : item.id)}
              >
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  quality={90}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover group-hover:scale-105 transition-transform duration-700 ${
                    isTech ? "object-top" : "object-center"
                  }`}
                />
                {/* Overlay — visible on hover (desktop) or tap (mobile) */}
                <div
                  className={`absolute inset-0 bg-[#1a1a1a]/70 transition-opacity duration-500 flex flex-col justify-end p-6 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <span className="text-[#c8a96e] text-[10px] tracking-[0.2em] uppercase mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-white font-serif text-xl mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-base">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show more button */}
        {!showAll && filtered.length > 6 && (
          <div className="text-center mt-14">
            <button
              onClick={() => setShowAll(true)}
              className="text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-4 border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-500"
            >
              View All Work
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
