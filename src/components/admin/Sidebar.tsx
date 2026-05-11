"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FolderOpen,
  MessageSquare,
  Star,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderOpen },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-[#e0dbd3]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 flex items-center justify-center">
            <Image
              src="/asset/27.png"
              alt="Wana Digital Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          {!collapsed && (
            <span className="font-serif text-lg tracking-[0.05em] text-[#1a1a1a] truncate">
              Wana Digital
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-[#1a1a1a] text-white"
                  : "text-[#6b6560] hover:bg-[#f3f0ea] hover:text-[#1a1a1a]"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && (
                <span className="text-sm tracking-wide">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#e0dbd3]">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 font-medium transition-colors w-full text-sm ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-[#e0dbd3] shadow-sm"
      >
        <Menu size={20} className="text-[#1a1a1a]" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-[#f8f6f2] border-r border-[#e0dbd3] z-50 transform transition-transform
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:block h-screen sticky top-0 bg-[#f8f6f2] border-r border-[#e0dbd3] transition-all duration-300
          ${collapsed ? "w-[72px]" : "w-60"}`}
      >
        {sidebarContent}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-[#e0dbd3] flex items-center justify-center shadow-sm hover:shadow"
        >
          <ChevronLeft
            size={14}
            className={`text-[#8a8578] transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </aside>
    </>
  );
}
