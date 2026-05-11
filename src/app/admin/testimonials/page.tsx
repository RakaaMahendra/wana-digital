"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

const emptyForm = {
  client_name: "",
  client_role: "",
  message: "",
  rating: 5,
  is_active: true,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadData = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (Array.isArray(data)) setTestimonials(data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      client_name: t.client_name,
      client_role: t.client_role,
      message: t.message,
      rating: t.rating,
      is_active: t.is_active,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetch(`/api/testimonials/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      loadData();
    } catch {
      alert("Failed to save data");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      loadData();
    } catch {
      alert("Failed to delete data");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-[#1a1a1a]">
            Manage Testimonials
          </h1>
          <p className="text-[#8a8578] text-sm mt-1">
            Add, edit, or remove client testimonials
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#c8a96e] text-white px-4 py-2.5 font-medium transition-colors text-sm"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#b5a898]">Loading data...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 text-[#b5a898]">
          No testimonials yet. Click Add to create one.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white border border-[#e0dbd3] p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < t.rating
                        ? "text-[#c8a96e] fill-[#c8a96e]"
                        : "text-[#e0dbd3]"
                    }
                  />
                ))}
              </div>
              <p className="text-[#6b6560] mb-4 italic font-serif">
                &ldquo;{t.message}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-[#1a1a1a]">
                    {t.client_name}
                  </div>
                  <div className="text-[#8a8578] text-sm">{t.client_role}</div>
                </div>
                <span
                  className={`px-2.5 py-0.5 text-xs font-medium ${
                    t.is_active
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-[#f3f0ea] text-[#8a8578] border border-[#e0dbd3]"
                  }`}
                >
                  {t.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-[#e0dbd3]">
                <button
                  onClick={() => openEdit(t)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-[#6b6560] bg-[#f3f0ea] hover:bg-[#e0dbd3] transition-colors"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e0dbd3] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#e0dbd3]">
              <h2 className="font-serif text-lg text-[#1a1a1a]">
                {editing ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-[#f3f0ea] transition-colors"
              >
                <X size={18} className="text-[#8a8578]" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-1.5">
                  Client Name
                </label>
                <input
                  type="text"
                  required
                  value={form.client_name}
                  onChange={(e) =>
                    setForm({ ...form, client_name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none transition-colors text-[#1a1a1a]"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-1.5">
                  Role / Company
                </label>
                <input
                  type="text"
                  value={form.client_role}
                  onChange={(e) =>
                    setForm({ ...form, client_role: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none text-[#1a1a1a]"
                  placeholder="CEO, Company Name"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-1.5">
                  Testimonial
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none resize-none text-[#1a1a1a]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-1.5">
                    Rating
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) =>
                      setForm({ ...form, rating: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none text-[#1a1a1a]"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Star{r > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) =>
                        setForm({ ...form, is_active: e.target.checked })
                      }
                      className="w-4 h-4 accent-[#1a1a1a]"
                    />
                    <span className="text-sm text-[#6b6560]">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border border-[#e0dbd3] font-medium hover:bg-[#f3f0ea] text-[#6b6560] transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#1a1a1a] hover:bg-[#c8a96e] text-white px-4 py-2.5 font-medium transition-colors text-sm"
                >
                  {editing ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
