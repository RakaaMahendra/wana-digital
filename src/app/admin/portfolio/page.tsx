"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { PortfolioItem } from "@/lib/types";

const categoryOptions = [
  "Logo Design",
  "Brand Identity",
  "Social Media",
  "UI/UX Design",
  "Print Design",
  "Illustration",
];

const emptyForm = {
  title: "",
  description: "",
  category: "Logo Design",
  image_url: "",
  is_featured: false,
};

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadData = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
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

  const openEdit = (item: PortfolioItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      image_url: item.image_url,
      is_featured: item.is_featured,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetch(`/api/portfolio/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/portfolio", {
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
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
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
            Manage Portfolio
          </h1>
          <p className="text-[#8a8578] text-sm mt-1">
            Add, edit, or remove portfolio items
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
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-[#b5a898]">
          No portfolio items yet. Click Add to create one.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e0dbd3] overflow-hidden"
            >
              <div className="aspect-video bg-[#f3f0ea] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.is_featured && (
                  <span className="absolute top-3 right-3 bg-[#1a1a1a] text-white text-[10px] tracking-wider uppercase font-medium px-2.5 py-1">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <span className="text-[#c8a96e] text-[10px] tracking-wider uppercase font-medium">
                  {item.category}
                </span>
                <h3 className="font-medium text-[#1a1a1a] mt-1">
                  {item.title}
                </h3>
                <p className="text-[#8a8578] text-sm mt-1 truncate">
                  {item.description}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-[#6b6560] bg-[#f3f0ea] hover:bg-[#e0dbd3] transition-colors"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
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
                {editing ? "Edit Portfolio" : "Add Portfolio"}
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
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none transition-colors text-[#1a1a1a]"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none resize-none text-[#1a1a1a]"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-1.5">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none text-[#1a1a1a]"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-1.5">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={form.image_url}
                  onChange={(e) =>
                    setForm({ ...form, image_url: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none text-[#1a1a1a]"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) =>
                      setForm({ ...form, is_featured: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#1a1a1a]"
                  />
                  <span className="text-sm text-[#6b6560]">Featured</span>
                </label>
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
