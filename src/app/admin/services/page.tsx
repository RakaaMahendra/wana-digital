"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { Service } from "@/lib/types";

const iconOptions = [
  "pen-tool",
  "palette",
  "share-2",
  "layout",
  "printer",
  "image",
];

const emptyForm = {
  title: "",
  description: "",
  icon: "palette",
  price: "",
  is_active: true,
  sort_order: 0,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadData = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (Array.isArray(data)) setServices(data);
    } catch {
      // handle error
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

  const openEdit = (service: Service) => {
    setEditing(service);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      price: service.price,
      is_active: service.is_active,
      sort_order: service.sort_order,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetch(`/api/services/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/services", {
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
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
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
            Manage Services
          </h1>
          <p className="text-[#8a8578] text-sm mt-1">
            Add, edit, or remove design services
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
      ) : services.length === 0 ? (
        <div className="text-center py-12 text-[#b5a898]">
          No services yet. Click Add to create one.
        </div>
      ) : (
        <div className="bg-white border border-[#e0dbd3] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e0dbd3] bg-[#f3f0ea]">
                  <th className="text-left px-6 py-3 text-[10px] font-medium text-[#8a8578] uppercase tracking-wider">
                    Service
                  </th>
                  <th className="text-left px-6 py-3 text-[10px] font-medium text-[#8a8578] uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-6 py-3 text-[10px] font-medium text-[#8a8578] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-[10px] font-medium text-[#8a8578] uppercase tracking-wider">
                    Order
                  </th>
                  <th className="text-right px-6 py-3 text-[10px] font-medium text-[#8a8578] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-[#e0dbd3] last:border-0 hover:bg-[#f3f0ea]/50"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#1a1a1a]">
                        {service.title}
                      </div>
                      <div className="text-[#8a8578] text-sm truncate max-w-xs">
                        {service.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#6b6560] text-sm">
                      {service.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium ${
                          service.is_active
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-[#f3f0ea] text-[#8a8578] border border-[#e0dbd3]"
                        }`}
                      >
                        {service.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#8a8578] text-sm">
                      {service.sort_order}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(service)}
                          className="p-2 text-[#b5a898] hover:text-[#c8a96e] hover:bg-[#f3f0ea] transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="p-2 text-[#b5a898] hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e0dbd3] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#e0dbd3]">
              <h2 className="font-serif text-lg text-[#1a1a1a]">
                {editing ? "Edit Service" : "Add Service"}
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
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none resize-none text-[#1a1a1a]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-1.5">
                    Icon
                  </label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none text-[#1a1a1a]"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-1.5">
                    Price
                  </label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none text-[#1a1a1a]"
                    placeholder="From $XX"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-[0.1em] uppercase text-[#8a8578] mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                      setForm({ ...form, sort_order: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 border border-[#e0dbd3] focus:border-[#1a1a1a] outline-none text-[#1a1a1a]"
                  />
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
