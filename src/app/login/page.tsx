"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error || "Login failed. Please check your email and password."
        );
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f6f2] px-4">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Top accent line */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-[#e0dbd3]" />
          <span className="text-[#c8a96e] text-[10px] tracking-[0.25em] uppercase font-medium">
            Admin Access
          </span>
          <div className="h-px flex-1 bg-[#e0dbd3]" />
        </div>

        <div className="bg-white border border-[#e0dbd3] p-10">
          {/* Logo area */}
          <div className="text-center mb-10">
            <span className="font-serif text-2xl tracking-[0.15em] uppercase text-[#1a1a1a]">
              Wana Digital
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#e0dbd3] bg-transparent focus:border-[#1a1a1a] outline-none transition-colors text-[#1a1a1a] placeholder:text-[#c5c0b8]"
                placeholder="admin@wanadigital.com"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#e0dbd3] bg-transparent focus:border-[#1a1a1a] outline-none transition-colors pr-12 text-[#1a1a1a] placeholder:text-[#c5c0b8]"
                  placeholder="••••••••"
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b5a898] hover:text-[#1a1a1a] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="border border-red-300 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-[11px] tracking-[0.2em] uppercase font-medium py-4 bg-[#1a1a1a] text-white hover:bg-[#c8a96e] disabled:opacity-50 transition-all duration-500"
            >
              {loading ? "Processing..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-8">
            <a
              href="/"
              className="text-[#b5a898] text-xs tracking-[0.1em] uppercase hover:text-[#1a1a1a] transition-colors"
            >
              &larr; Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
