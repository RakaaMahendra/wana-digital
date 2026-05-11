"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, Clock, User } from "lucide-react";
import type { ContactMessage } from "@/lib/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const loadData = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const markAsRead = async (msg: ContactMessage) => {
    if (msg.is_read) return;
    try {
      await fetch(`/api/contact/${msg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: true }),
      });
      loadData();
    } catch {
      //
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (selected?.id === id) setSelected(null);
      loadData();
    } catch {
      alert("Failed to delete message");
    }
  };

  const openMessage = (msg: ContactMessage) => {
    setSelected(msg);
    markAsRead(msg);
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-[#1a1a1a]">Messages</h1>
        <p className="text-[#8a8578] text-sm mt-1">
          {messages.length} total messages
          {unreadCount > 0 && (
            <span className="text-red-500 ml-2">({unreadCount} unread)</span>
          )}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#b5a898]">Loading data...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-[#b5a898]">No messages yet.</div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-5">
          {/* Message List */}
          <div className="lg:col-span-2 space-y-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`w-full text-left p-4 border transition-colors ${
                  selected?.id === msg.id
                    ? "bg-[#f3f0ea] border-[#c8a96e]"
                    : msg.is_read
                    ? "bg-white border-[#e0dbd3] hover:bg-[#f3f0ea]"
                    : "bg-[#c8a96e]/5 border-[#c8a96e]/30 hover:bg-[#c8a96e]/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.is_read ? (
                    <MailOpen size={15} className="text-[#b5a898] shrink-0" />
                  ) : (
                    <Mail size={15} className="text-[#c8a96e] shrink-0" />
                  )}
                  <span
                    className={`font-medium text-sm truncate ${
                      !msg.is_read ? "text-[#1a1a1a]" : "text-[#6b6560]"
                    }`}
                  >
                    {msg.name}
                  </span>
                </div>
                <div className="text-sm font-medium text-[#1a1a1a] truncate">
                  {msg.subject}
                </div>
                <div className="text-xs text-[#b5a898] mt-1">
                  {new Date(msg.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </button>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-white border border-[#e0dbd3] p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-xl text-[#1a1a1a]">
                      {selected.subject}
                    </h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[#8a8578]">
                      <span className="flex items-center gap-1">
                        <User size={14} /> {selected.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={14} /> {selected.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />{" "}
                        {new Date(selected.created_at).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    {selected.phone && (
                      <div className="text-sm text-[#8a8578] mt-1">
                        Tel: {selected.phone}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-2 text-[#b5a898] hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="border-t border-[#e0dbd3] pt-4">
                  <p className="text-[#6b6560] whitespace-pre-wrap leading-relaxed">
                    {selected.message}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#e0dbd3]">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#c8a96e] text-white px-5 py-2.5 font-medium transition-colors text-sm"
                  >
                    <Mail size={15} /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#e0dbd3] p-12 text-center text-[#b5a898]">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
