"use client";

import { useEffect, useState } from "react";
import { Briefcase, FolderOpen, MessageSquare, Star } from "lucide-react";
import Link from "next/link";

interface Stats {
  services: number;
  portfolio: number;
  testimonials: number;
  messages: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    portfolio: 0,
    testimonials: 0,
    messages: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [servicesRes, portfolioRes, testimonialsRes, messagesRes] =
          await Promise.all([
            fetch("/api/services"),
            fetch("/api/portfolio"),
            fetch("/api/testimonials"),
            fetch("/api/contact"),
          ]);

        const services = await servicesRes.json();
        const portfolio = await portfolioRes.json();
        const testimonials = await testimonialsRes.json();
        const messages = await messagesRes.json();

        setStats({
          services: Array.isArray(services) ? services.length : 0,
          portfolio: Array.isArray(portfolio) ? portfolio.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          messages: Array.isArray(messages) ? messages.length : 0,
          unreadMessages: Array.isArray(messages)
            ? messages.filter((m: { is_read: boolean }) => !m.is_read).length
            : 0,
        });
      } catch {
        // Stats will remain at 0
      }
    }
    loadStats();
  }, []);

  const cards = [
    {
      title: "Services",
      value: stats.services,
      icon: Briefcase,
      href: "/admin/services",
    },
    {
      title: "Portfolio",
      value: stats.portfolio,
      icon: FolderOpen,
      href: "/admin/portfolio",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: Star,
      href: "/admin/testimonials",
    },
    {
      title: "Messages",
      value: stats.messages,
      subtitle:
        stats.unreadMessages > 0 ? `${stats.unreadMessages} unread` : undefined,
      icon: MessageSquare,
      href: "/admin/messages",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-[#1a1a1a]">Dashboard</h1>
        <p className="text-[#8a8578] text-sm mt-1">
          Welcome to Wana Digital Admin Panel
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white border border-[#e0dbd3] p-6 hover:border-[#c8a96e] transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#f3f0ea] flex items-center justify-center">
                <card.icon size={18} className="text-[#c8a96e]" />
              </div>
            </div>
            <div className="text-3xl font-serif text-[#1a1a1a]">
              {card.value}
            </div>
            <div className="text-[#8a8578] text-sm mt-1">{card.title}</div>
            {card.subtitle && (
              <div className="text-red-500 text-xs font-medium mt-1">
                {card.subtitle}
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white border border-[#e0dbd3] p-6">
        <h2 className="font-serif text-lg text-[#1a1a1a] mb-4">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/admin/services"
            className="flex items-center gap-3 px-4 py-3 bg-[#f3f0ea] text-[#1a1a1a] hover:bg-[#e0dbd3] transition-colors font-medium text-sm"
          >
            <Briefcase size={16} />
            Manage Services
          </Link>
          <Link
            href="/admin/portfolio"
            className="flex items-center gap-3 px-4 py-3 bg-[#f3f0ea] text-[#1a1a1a] hover:bg-[#e0dbd3] transition-colors font-medium text-sm"
          >
            <FolderOpen size={16} />
            Manage Portfolio
          </Link>
          <Link
            href="/admin/testimonials"
            className="flex items-center gap-3 px-4 py-3 bg-[#f3f0ea] text-[#1a1a1a] hover:bg-[#e0dbd3] transition-colors font-medium text-sm"
          >
            <Star size={16} />
            Manage Testimonials
          </Link>
          <Link
            href="/admin/messages"
            className="flex items-center gap-3 px-4 py-3 bg-[#f3f0ea] text-[#1a1a1a] hover:bg-[#e0dbd3] transition-colors font-medium text-sm"
          >
            <MessageSquare size={16} />
            View Messages
          </Link>
        </div>
      </div>
    </div>
  );
}
