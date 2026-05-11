import type { Section } from "@/app/page";

interface FooterProps {
  onNavigate: (section: Section) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const menuLinks: { label: string; section: Section }[] = [
    { label: "About", section: "about" },
    { label: "Services", section: "services" },
    { label: "Portfolio", section: "portfolio" },
    { label: "Contact", section: "contact" },
  ];

  const serviceLinks = [
    "Logo & Brand Identity",
    "UI/UX Design",
    "Web Development",
    "Fullstack Application",
    "IT Consulting",
  ];

  return (
    <footer className="bg-[#141414] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <span className="font-serif text-xl tracking-[0.15em] uppercase block mb-4">
              Wana Digital
            </span>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Your single partner for design and technology from visual
              identities to fullstack web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-6">
              Menu
            </h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => onNavigate(link.section)}
                    className="text-white/40 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => onNavigate("services")}
                    className="text-white/40 text-sm hover:text-white transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/8 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Wana Digital
          </p>
          <div className="flex gap-6 text-xs text-white/25">
            <button className="hover:text-white transition-colors tracking-wider">
              Privacy Policy
            </button>
            <button className="hover:text-white transition-colors tracking-wider">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
