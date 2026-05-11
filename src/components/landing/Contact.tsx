"use client";

import { MapPin, MessageCircle, Mail, Clock } from "lucide-react";

const WHATSAPP_NUMBER = "6281338059744";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Wana Digital! I'd like to discuss a project."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const EMAIL_URL = "mailto:hello@wanadigital.com";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Nusa Dua, Bali" },
  { icon: MessageCircle, label: "WhatsApp", value: "+62 813 3805 9744" },
  { icon: Mail, label: "Email", value: "hello@wanadigital.com" },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon \u2013 Fri, 09:00 \u2013 18:00",
  },
];

const perks = [
  "Average reply under 10 minutes",
  "Free project consultation",
  "Trusted modern digital partner",
];

export default function Contact() {
  return (
    <section className="h-screen overflow-y-auto bg-[#f8f6f2]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-16 section-enter">
        {/* Section header line */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[#c8a96e] font-serif text-sm">04</span>
          <div className="h-px flex-1 bg-[#e0dbd3]" />
          <span className="text-[#b5a898] text-[11px] tracking-[0.2em] uppercase">
            Contact
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-bold leading-[1.2] mb-4 max-w-2xl">
          Let&apos;s Start Your Project
        </h2>
        <p className="text-[#8a8578] text-lg max-w-xl mb-16">
          Need a website, branding, or custom system? Tell us your idea &mdash;
          we&apos;ll help make it real.
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-full border border-[#e0dbd3] bg-white flex items-center justify-center shrink-0 group-hover:border-[#c8a96e] transition-colors duration-300">
                  <Icon
                    size={17}
                    className="text-[#b5a898] group-hover:text-[#c8a96e] transition-colors duration-300"
                  />
                </div>
                <div className="pt-1.5">
                  <div className="text-[#1a1a1a] text-sm font-semibold mb-0.5">
                    {label}
                  </div>
                  <div className="text-[#8a8578] text-base">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: CTA Card */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-[#e0dbd3]">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1a1a1a] font-bold mb-3">
              Ready to Grow Your Business?
            </h3>
            <p className="text-[#8a8578] text-sm leading-relaxed mb-6">
              Fast response, free consultation, and premium execution for brands
              that want{" "}
              <span className="text-[#c8a96e] font-medium">results</span>.
            </p>

            <ul className="space-y-3 mb-8">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-2.5 text-[#6b6560] text-sm"
                >
                  <span className="text-[#6b6560] font-medium">✓</span>
                  {perk}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe59] transition-colors duration-300"
              >
                <MessageCircle size={18} />
                Chat WhatsApp
              </a>
              <a
                href={EMAIL_URL}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-[#e0dbd3] text-[#1a1a1a] font-semibold text-sm hover:border-[#1a1a1a] transition-colors duration-300 bg-white"
              >
                <Mail size={18} />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
