"use client";

import { useState } from "react";
import {
  MapPin,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const WHATSAPP_NUMBER = "6281338059744";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Wana Digital! I'd like to discuss a project."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Nusa Dua, Bali" },
  { icon: MessageCircle, label: "WhatsApp", value: "+62 813 3805 9744" },
  { icon: Mail, label: "Email", value: "projectwanadigital@gmail.com" },
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
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }
  return (
    <section className="h-dvh overflow-y-auto bg-[#f8f6f2]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-16 section-enter">
        {/* Section header line */}
        <div className="flex items-center gap-4 mb-10 sm:mb-20">
          <span className="text-[#c8a96e] font-serif text-sm">04</span>
          <div className="h-px flex-1 bg-[#e0dbd3]" />
          <span className="text-[#b5a898] text-[11px] tracking-[0.2em] uppercase">
            Contact
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-bold leading-[1.2] mb-4 max-w-2xl">
          Let&apos;s Start Your Project
        </h2>
        <p className="text-[#8a8578] text-lg max-w-xl mb-8 sm:mb-16">
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

            <div className="pt-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe59] transition-colors duration-300"
              >
                <MessageCircle size={18} />
                Chat WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-[#e0dbd3]">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1a1a1a] font-bold mb-2">
              Send Us a Message
            </h3>
            <p className="text-[#8a8578] text-sm leading-relaxed mb-6">
              Fill in the form and we&apos;ll get back to you as soon as
              possible.
            </p>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                <CheckCircle size={48} className="text-green-500" />
                <p className="text-[#1a1a1a] font-semibold text-lg">
                  Message Sent!
                </p>
                <p className="text-[#8a8578] text-sm">
                  Thank you for reaching out. We&apos;ll reply shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-[#c8a96e] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-[#e0dbd3] bg-[#faf9f7] text-[#1a1a1a] text-sm placeholder-[#b5a898] focus:outline-none focus:border-[#c8a96e] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#e0dbd3] bg-[#faf9f7] text-[#1a1a1a] text-sm placeholder-[#b5a898] focus:outline-none focus:border-[#c8a96e] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+62 ..."
                      className="w-full px-4 py-3 rounded-xl border border-[#e0dbd3] bg-[#faf9f7] text-[#1a1a1a] text-sm placeholder-[#b5a898] focus:outline-none focus:border-[#c8a96e] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-xl border border-[#e0dbd3] bg-[#faf9f7] text-[#1a1a1a] text-sm placeholder-[#b5a898] focus:outline-none focus:border-[#c8a96e] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e0dbd3] bg-[#faf9f7] text-[#1a1a1a] text-sm placeholder-[#b5a898] focus:outline-none focus:border-[#c8a96e] transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <AlertCircle size={16} className="shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#1a1a1a] text-white font-semibold text-sm hover:bg-[#333] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
