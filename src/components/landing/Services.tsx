"use client";

import { useEffect, useState } from "react";
import type { Section } from "@/app/page";
import {
  PenTool,
  Palette,
  Share2,
  Layout,
  Printer,
  ImageIcon,
  Globe,
  Code2,
  Cpu,
  Smartphone,
  Server,
  X,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import type { Service } from "@/lib/types";

type Tab = "design" | "technology";

const iconMap: Record<string, React.ElementType> = {
  "pen-tool": PenTool,
  palette: Palette,
  "share-2": Share2,
  layout: Layout,
  printer: Printer,
  image: ImageIcon,
  globe: Globe,
  code2: Code2,
  cpu: Cpu,
  smartphone: Smartphone,
  server: Server,
};

type LocalService = Service & {
  category: Tab;
  tags?: string[];
  image: string;
  longDescription: string;
  includes: string[];
  process: { step: string; desc: string }[];
};

const designServices: LocalService[] = [
  {
    id: "d1",
    title: "Logo & Brand Identity",
    description:
      "A strong brand starts with a great logo. We craft identities that are memorable, versatile, and true to your business.",
    icon: "pen-tool",
    price: "From Rp 750.000",
    is_active: true,
    sort_order: 1,
    created_at: "",
    category: "design",
    tags: ["Logo", "Brand Guide", "Typography"],
    image: "/asset/Logo Wana Digital.png",
    longDescription:
      "Your logo is the face of your business it's the first thing people see and the last thing they forget. At Wana Digital, we go beyond just making things look good. We dive deep into your brand's values, audience, and market positioning to craft a visual identity that truly represents who you are. From concept sketches to final vector files, every detail is meticulously designed to ensure your brand stands out in any medium.",
    includes: [
      "Primary logo + variations (horizontal, stacked, icon-only)",
      "Full color palette (primary, secondary, neutral)",
      "Typography system (heading + body fonts)",
      "Brand guideline document (PDF)",
      "All source files (AI, EPS, SVG, PNG, PDF)",
      "Unlimited revisions until satisfied",
    ],
    process: [
      { step: "Discovery", desc: "Brief, competitor analysis, mood board" },
      { step: "Concept", desc: "2–3 initial design directions presented" },
      {
        step: "Refinement",
        desc: "Chosen direction refined with your feedback",
      },
      { step: "Delivery", desc: "Final files + brand guideline handed over" },
    ],
  },
  {
    id: "d3",
    title: "Social Media Design",
    description:
      "Consistent, scroll-stopping content designed to grow your audience and strengthen your online presence.",
    icon: "share-2",
    price: "From Rp 500.000",
    is_active: true,
    sort_order: 3,
    created_at: "",
    category: "design",
    tags: ["Feed Design", "Stories", "Reels Cover"],
    image: "/asset/Instagram Social  Media Design Ninggrat.png",
    longDescription:
      "In a world of endless scrolling, your content has less than 2 seconds to make an impression. We create social media visuals that stop thumbs in their tracks. Whether you need a monthly content package, a product launch campaign, or a full feed redesign, our designs are crafted to be visually cohesive, on-brand, and optimized for each platform's best practices.",
    includes: [
      "Custom feed post templates (Instagram, Facebook, LinkedIn)",
      "Stories & Reels cover templates",
      "Highlight cover icons",
      "Caption copywriting (optional add-on)",
      "Editable Canva/Figma templates for your team",
      "Platform-specific sizing for all assets",
    ],
    process: [
      { step: "Brand Audit", desc: "Review your current social presence" },
      { step: "Style Direction", desc: "Define visual tone & content pillars" },
      { step: "Template Design", desc: "Create reusable design templates" },
      { step: "Handoff", desc: "Editable files + usage guide" },
    ],
  },
  {
    id: "d4",
    title: "Print & Packaging",
    description:
      "From business cards to packaging design every physical touchpoint crafted with care and precision.",
    icon: "printer",
    price: "From Rp 350.000",
    is_active: true,
    sort_order: 4,
    created_at: "",
    category: "design",
    tags: ["Brochure", "Packaging", "Banner"],
    image: "/asset/Print & Packaging Koji Kopi.png",
    longDescription:
      "Physical touchpoints are powerful brand moments. A beautifully designed business card, brochure, or product packaging creates a lasting impression that digital media simply cannot replicate. We design print-ready materials with full attention to bleed, margins, color profiles (CMYK), and printing specifications so your files go to print without issues.",
    includes: [
      "Print-ready files (PDF/AI with bleed & crop marks)",
      "CMYK color-corrected artwork",
      "Business cards, letterheads, envelopes",
      "Brochures, flyers, catalogs",
      "Packaging dieline + mockup",
      "Banner & signage design",
    ],
    process: [
      {
        step: "Brief",
        desc: "Print specs, quantities, preferred printer info",
      },
      { step: "Design", desc: "Layout & visual design creation" },
      { step: "Review", desc: "Soft-proof review before finalizing" },
      { step: "Print-Ready", desc: "Export with full print specs included" },
    ],
  },
  {
    id: "d5",
    title: "2D",
    description:
      "Custom 2D illustrations for editorial, merchandise, or storytelling unique artworks that set your brand apart.",
    icon: "image",
    price: "From Rp 1.000.000",
    is_active: true,
    sort_order: 5,
    created_at: "",
    category: "design",
    tags: ["Digital Art", "Character", "Editorial"],
    image: "/asset/2D Ilustration Wawa Youtuber.png",
    longDescription:
      "When stock imagery just won't do, custom 2D illustration gives your brand a truly unique visual voice. From flat vector illustrations for websites, to detailed character designs for apps, to editorial art for publications we create illustrations that tell your story in a way no photograph can. Every illustration is hand-crafted to match your brand's personality and aesthetic.",
    includes: [
      "Custom character or scene illustration",
      "Flat, isometric, or painterly styles available",
      "Multiple format exports (SVG, PNG, PDF)",
      "Usage rights fully transferred",
      "Up to 3 revision rounds",
      "Animated version available (add-on)",
    ],
    process: [
      {
        step: "Style Brief",
        desc: "Reference collection & style confirmation",
      },
      { step: "Sketch", desc: "Rough sketch for composition approval" },
      { step: "Illustration", desc: "Full color & detail rendering" },
      { step: "Delivery", desc: "Final files in all requested formats" },
    ],
  },
  {
    id: "d6",
    title: "Presentation Design",
    description:
      "Pitch decks and presentations that communicate your story clearly and leave a lasting impression on investors.",
    icon: "palette",
    price: "From Rp 1.200.000",
    is_active: true,
    sort_order: 6,
    created_at: "",
    category: "design",
    tags: ["Pitch Deck", "Slides", "Infographic"],
    image: "/asset/Presentation Design Koji Coffee.png",
    longDescription:
      "A great pitch can change everything. Whether you're presenting to investors, pitching to enterprise clients, or delivering a keynote, your slides need to be as compelling as your words. We design presentations that balance visual impact with clarity using data visualization, custom icons, and strategic layouts to keep your audience engaged from the first slide to the last.",
    includes: [
      "Up to 30 custom slide designs",
      "Data visualization & infographics",
      "Custom icon set",
      "Editable PowerPoint/Keynote/Google Slides",
      "Slide notes template",
      "Print-ready PDF version",
    ],
    process: [
      { step: "Content Review", desc: "Understand your message & audience" },
      { step: "Structure", desc: "Story flow and slide outline" },
      { step: "Design", desc: "Visual design with your brand system" },
      { step: "Delivery", desc: "Editable file + PDF export" },
    ],
  },
];

const techServices: LocalService[] = [
  {
    id: "t1",
    title: "Web Development",
    description:
      "Fast, responsive, and SEO-optimized websites built with modern frameworks. From landing pages to complex web portals.",
    icon: "globe",
    price: "From Rp 2.000.000",
    is_active: true,
    sort_order: 1,
    created_at: "",
    category: "technology",
    tags: ["Next.js", "React", "Tailwind CSS"],
    image: "/asset/Web Development Design Ninggratt Coffee.png",
    longDescription:
      "We build websites that don't just look great they perform. Using Next.js and modern web technologies, every site we deliver is fast-loading, fully responsive, SEO-optimized, and accessible. Whether you need a marketing landing page, a company profile, or a content-heavy portal, we architect it for performance, scalability, and ease of maintenance.",
    includes: [
      "Fully responsive design (mobile, tablet, desktop)",
      "SEO-optimized structure & meta tags",
      "CMS integration (Sanity, Contentful, or headless Supabase)",
      "Contact forms with email notifications",
      "Google Analytics / Tag Manager setup",
      "3 months post-launch support",
    ],
    process: [
      { step: "Discovery", desc: "Goals, sitemap, tech stack decision" },
      { step: "Design", desc: "UI/UX design & client approval" },
      { step: "Development", desc: "Frontend build + CMS integration" },
      { step: "Launch", desc: "Testing, deployment & handover" },
    ],
  },
  {
    id: "t2",
    title: "Fullstack Application",
    description:
      "End-to-end application development robust backend APIs, real-time features, database design, and beautiful frontends.",
    icon: "code2",
    price: "From Rp 6.000.000",
    is_active: true,
    sort_order: 2,
    created_at: "",
    category: "technology",
    tags: ["Node.js", "PostgreSQL", "REST API"],
    image:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=900&h=500&fit=crop",
    longDescription:
      "From idea to production-ready product, we handle the full technology stack. Our fullstack development covers database design and optimization, RESTful or GraphQL API development, authentication systems, real-time features, admin dashboards, and cloud deployment. We follow industry best practices: clean code, proper testing, CI/CD pipelines, and thorough documentation so your team can maintain and scale with confidence.",
    includes: [
      "System architecture & database design",
      "RESTful API or GraphQL backend",
      "Authentication (JWT / OAuth / SSO)",
      "Admin dashboard with role management",
      "Real-time features (WebSocket/Supabase Realtime)",
      "Cloud deployment (Vercel, Railway, AWS)",
      "API documentation & code handoff",
    ],
    process: [
      { step: "Planning", desc: "ERD, API spec, tech stack selection" },
      { step: "Backend", desc: "API, database, authentication" },
      { step: "Frontend", desc: "UI implementation & integration" },
      { step: "Deploy", desc: "Testing, CI/CD setup, go live" },
    ],
  },
  {
    id: "t3",
    title: "Mobile App Design & Dev",
    description:
      "Cross-platform mobile applications for iOS and Android designed for performance, usability, and engagement.",
    icon: "smartphone",
    price: "From Rp 5.000.000",
    is_active: true,
    sort_order: 3,
    created_at: "",
    category: "technology",
    tags: ["React Native", "iOS", "Android"],
    image: "/asset/Mobile App Design Koji Coffee.png",
    longDescription:
      "We build cross-platform mobile apps with React Native that run natively on both iOS and Android giving you one codebase, two platforms, and significant cost savings. Our mobile development process starts with UX research and wireframing, ensuring the app is not only functional but delightful to use. We handle App Store and Google Play submission, push notifications, offline support, and ongoing updates.",
    includes: [
      "Cross-platform iOS & Android app",
      "Native device feature integration (camera, GPS, notifications)",
      "Offline-first capability",
      "App Store & Google Play submission",
      "Push notification system",
      "In-app analytics integration",
      "3 months post-launch support",
    ],
    process: [
      { step: "UX Research", desc: "User flows & wireframe design" },
      { step: "UI Design", desc: "High-fidelity screens for all platforms" },
      { step: "Development", desc: "React Native build + API integration" },
      { step: "Publish", desc: "Store submission & launch support" },
    ],
  },
  {
    id: "t4",
    title: "API & Integrations",
    description:
      "Connect your systems with third-party services, payment gateways, CRMs, and automation tools seamlessly.",
    icon: "server",
    price: "From Rp 1.500.000",
    is_active: true,
    sort_order: 4,
    created_at: "",
    category: "technology",
    tags: ["REST", "Webhook", "OAuth"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=500&fit=crop",
    longDescription:
      "Modern businesses run on interconnected systems. We specialize in building robust API integrations that make your tools work in harmony from payment gateways (Stripe, Midtrans) to communication platforms (WhatsApp Business, Twilio), CRMs (HubSpot, Salesforce), ERPs, and custom webhooks. We also build internal APIs for your own systems to communicate efficiently and securely.",
    includes: [
      "Third-party API integration (payment, SMS, email, maps)",
      "Webhook setup & event handling",
      "OAuth 2.0 / SSO implementation",
      "Data sync between platforms",
      "API rate limiting & error handling",
      "Full integration documentation",
    ],
    process: [
      { step: "Audit", desc: "Map existing systems & integration points" },
      { step: "Design", desc: "Data flow & error handling architecture" },
      { step: "Build", desc: "Integration development & testing" },
      { step: "Monitor", desc: "Logging, alerts & ongoing support" },
    ],
  },
  {
    id: "t5",
    title: "AI Research",
    description:
      "Applied AI research and development from machine learning models to intelligent automation tailored for your business.",
    icon: "cpu",
    price: "From Rp 3.000.000",
    is_active: true,
    sort_order: 5,
    created_at: "",
    category: "technology",
    tags: ["Machine Learning", "LLM", "Automation"],
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=900&h=500&fit=crop",
    longDescription:
      "AI is no longer a future concept it's a competitive advantage available today. We research, prototype, and deploy applied AI solutions tailored to your specific business problems. From fine-tuning large language models (LLMs) for domain-specific tasks, to building computer vision pipelines, recommendation systems, and intelligent process automation, we translate cutting-edge AI research into practical products that deliver measurable impact.",
    includes: [
      "Problem scoping & feasibility analysis",
      "Dataset preparation & preprocessing",
      "Model selection, fine-tuning & evaluation",
      "LLM integration (OpenAI, Mistral, local models)",
      "AI-powered feature integration into your product",
      "Research report & model documentation",
      "Ongoing model monitoring & retraining support",
    ],
    process: [
      {
        step: "Discovery",
        desc: "Define problem, data availability & success metrics",
      },
      { step: "Research", desc: "Prototype models & evaluate approaches" },
      { step: "Development", desc: "Build, fine-tune & integrate solution" },
      { step: "Deploy", desc: "Production rollout + monitoring setup" },
    ],
  },
];

const tabConfig: { key: Tab; label: string; count: number }[] = [
  { key: "design", label: "Design & Creative", count: designServices.length },
  { key: "technology", label: "Technology & IT", count: techServices.length },
];

function ServiceDrawer({
  service,
  onClose,
  onNavigate,
}: {
  service: LocalService;
  onClose: () => void;
  onNavigate: (section: Section) => void;
}) {
  const Icon = iconMap[service.icon] ?? PenTool;
  const isTech = service.category === "technology";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-xl bg-white z-50 shadow-2xl overflow-y-auto flex flex-col animate-[slideInRight_0.3s_ease-out]">
        {/* Hero image */}
        <div className="relative h-56 shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          >
            <X size={18} />
          </button>
          {/* Icon + title overlay */}
          <div className="absolute bottom-5 left-6 flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isTech ? "bg-white text-[#1a1a1a]" : "bg-[#c8a96e] text-white"
              }`}
            >
              <Icon size={18} />
            </div>
            <div>
              <p className="text-white/70 text-[10px] tracking-widest uppercase mb-0.5">
                {isTech ? "Technology & IT" : "Design & Creative"}
              </p>
              <h3 className="text-white font-bold text-xl leading-tight">
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-7">
          {/* Price badge */}
          <div className="flex items-center justify-between">
            <span
              className={`text-lg font-bold ${
                isTech ? "text-[#1a1a1a]" : "text-[#c8a96e]"
              }`}
            >
              {service.price}
            </span>
            <div className="flex gap-1.5 flex-wrap justify-end">
              {service.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                    isTech
                      ? "bg-[#1a1a1a]/8 text-[#6b6560]"
                      : "bg-[#c8a96e]/10 text-[#8a7a6a]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Long description */}
          <div>
            <h4 className="font-semibold text-[#1a1a1a] text-sm uppercase tracking-widest mb-3">
              Overview
            </h4>
            <p className="text-[#6b6560] text-sm leading-relaxed">
              {service.longDescription}
            </p>
          </div>

          {/* What's included */}
          <div>
            <h4 className="font-semibold text-[#1a1a1a] text-sm uppercase tracking-widest mb-3">
              What&apos;s Included
            </h4>
            <ul className="space-y-2.5">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className={`shrink-0 mt-0.5 ${
                      isTech ? "text-[#1a1a1a]" : "text-[#c8a96e]"
                    }`}
                  />
                  <span className="text-[#6b6560] text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div>
            <h4 className="font-semibold text-[#1a1a1a] text-sm uppercase tracking-widest mb-4">
              Our Process
            </h4>
            <div className="relative">
              {service.process.map((p, i) => (
                <div key={p.step} className="flex gap-4 mb-4 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isTech
                          ? "bg-[#1a1a1a] text-white"
                          : "bg-[#c8a96e] text-white"
                      }`}
                    >
                      {i + 1}
                    </div>
                    {i < service.process.length - 1 && (
                      <div className="w-px flex-1 bg-[#e0dbd3] mt-1 mb-1" />
                    )}
                  </div>
                  <div className="pb-4 last:pb-0">
                    <p className="font-semibold text-[#1a1a1a] text-sm">
                      {p.step}
                    </p>
                    <p className="text-[#8a8578] text-xs mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-[#e0dbd3] bg-[#f8f6f2]">
          <button
            onClick={() => {
              onClose();
              onNavigate("contact");
            }}
            className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              isTech
                ? "bg-[#1a1a1a] text-white hover:bg-[#333]"
                : "bg-[#c8a96e] text-white hover:bg-[#b8996e]"
            }`}
          >
            Start This Project
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

interface ServicesProps {
  onNavigate: (section: Section) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<Tab>("design");
  const [selectedService, setSelectedService] = useState<LocalService | null>(
    null
  );

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .catch(() => {});
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedService]);

  const displayed = activeTab === "design" ? designServices : techServices;

  return (
    <>
      <section className="h-dvh overflow-y-auto bg-[#f3f0ea]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-16 section-enter">
          {/* Section header line */}
          <div className="flex items-center gap-4 mb-8 sm:mb-14">
            <span className="text-[#c8a96e] font-serif text-sm">02</span>
            <div className="h-px flex-1 bg-[#e0dbd3]" />
            <span className="text-[#b5a898] text-[11px] tracking-[0.2em] uppercase">
              Services
            </span>
          </div>

          {/* Heading */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground font-bold leading-[1.2] mb-3 max-w-2xl">
                Everything Your Business Needs to Grow Digitally
              </h2>
              <p className="text-[#8a8578] text-base max-w-xl">
                From stunning visuals to scalable tech we cover both sides of
                the digital spectrum.
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex items-center bg-white border border-[#e0dbd3] p-1 rounded-xl shrink-0 self-start lg:self-auto">
              {tabConfig.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.key
                      ? "bg-[#1a1a1a] text-white shadow-sm"
                      : "text-[#8a8578] hover:text-[#1a1a1a]"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-semibold transition-colors duration-300 ${
                      activeTab === tab.key
                        ? "bg-white/20 text-white"
                        : "bg-[#f3f0ea] text-[#b5a898]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((service, index) => {
              const Icon = iconMap[service.icon] ?? PenTool;
              const isTech = activeTab === "technology";
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`group relative bg-white border rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left cursor-pointer ${
                    isTech
                      ? "border-[#e0dbd3] hover:border-[#1a1a1a]"
                      : "border-[#e0dbd3] hover:border-[#c8a96e]"
                  }`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Top: number + icon */}
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-mono text-[#c8a96e] tracking-widest">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isTech
                          ? "bg-[#1a1a1a]/5 group-hover:bg-[#1a1a1a]"
                          : "bg-[#c8a96e]/10 group-hover:bg-[#c8a96e]"
                      }`}
                    >
                      <Icon
                        size={19}
                        className={`transition-colors duration-300 ${
                          isTech
                            ? "text-[#1a1a1a] group-hover:text-white"
                            : "text-[#c8a96e] group-hover:text-white"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-serif text-xl font-semibold leading-snug transition-colors duration-300 ${
                      isTech
                        ? "text-[#1a1a1a]"
                        : "text-[#1a1a1a] group-hover:text-[#c8a96e]"
                    }`}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#6b6560] text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Tags */}
                  {service.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] px-2.5 py-1 rounded-full font-medium tracking-wide ${
                            isTech
                              ? "bg-[#1a1a1a]/5 text-[#6b6560]"
                              : "bg-[#c8a96e]/8 text-[#8a7a6a]"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price + CTA */}
                  <div className="pt-4 border-t border-[#f0ede8] flex items-center justify-between">
                    <span
                      className={`text-sm font-semibold ${
                        isTech ? "text-[#1a1a1a]" : "text-[#c8a96e]"
                      }`}
                    >
                      {service.price}
                    </span>
                    <span
                      className={`text-[10px] tracking-[0.1em] uppercase font-medium transition-colors duration-300 opacity-0 group-hover:opacity-100 ${
                        isTech ? "text-[#1a1a1a]" : "text-[#c8a96e]"
                      }`}
                    >
                      View detail →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-[#b5a898] text-sm mb-4">
              Not sure what you need?
            </p>
            <button
              onClick={() => onNavigate("contact")}
              className="inline-block text-[11px] tracking-[0.2em] uppercase font-semibold px-8 py-3.5 bg-[#1a1a1a] text-white hover:bg-[#c8a96e] transition-all duration-500 rounded-lg"
            >
              Let's discuss your project
            </button>
          </div>
        </div>
      </section>

      {/* Service Detail Drawer */}
      {selectedService && (
        <ServiceDrawer
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onNavigate={onNavigate}
        />
      )}
    </>
  );
}
