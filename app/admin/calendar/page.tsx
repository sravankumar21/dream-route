"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  Trash2,
  Save,
} from "lucide-react";

interface CalendarEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  endDate: string | null;
  type: string;
  status: string;
  relatedContentId: string;
  color: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const typeConfig: Record<string, { label: string; color: string; dot: string }> = {
  blog: { label: "Blog", color: "text-violet-400 bg-violet-500/10 border-violet-500/20", dot: "bg-violet-400" },
  youtube: { label: "YouTube", color: "text-red-400 bg-red-500/10 border-red-500/20", dot: "bg-red-400" },
  instagram: { label: "Instagram", color: "text-pink-400 bg-pink-500/10 border-pink-500/20", dot: "bg-pink-400" },
  other: { label: "Other", color: "text-zinc-400 bg-zinc-800/50 border-zinc-700/50", dot: "bg-zinc-400" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  planned: { label: "Planned", color: "text-zinc-400 bg-zinc-800/50" },
  "in-progress": { label: "In Progress", color: "text-amber-400 bg-amber-500/10" },
  done: { label: "Done", color: "text-emerald-400 bg-emerald-500/10" },
  cancelled: { label: "Cancelled", color: "text-red-400 bg-red-500/10" },
};

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    type: "blog",
    status: "planned",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      month: String(month + 1),
      year: String(year),
    });
    const res = await fetch(`/api/calendar?${params}`);
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  }, [month, year]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const getDaysInMonth = () => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = () => new Date(year, month, 1).getDay();

  const eventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date.startsWith(dateStr));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const openModal = (day?: number) => {
    const d = day ?? new Date().getDate();
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    setForm({ title: "", description: "", date: dateStr, type: "blog", status: "planned", notes: "" });
    setShowModal(true);
  };

  const saveEvent = async () => {
    if (!form.title.trim() || !form.date) return;
    setSaving(true);
    try {
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: new Date(form.date),
          color: typeConfig[form.type]?.dot === "bg-violet-400" ? "#7c3aed" : "#ef4444",
        }),
      });
      const created = await res.json();
      setEvents((prev) => [...prev, created]);
      setShowModal(false);
    } catch {
    } finally {
      setSaving(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/calendar?id=${id}`, { method: "DELETE" });
    setEvents((prev) => prev.filter((e) => e._id !== id));
  };

  const daysInMonth = getDaysInMonth();
  const firstDay = getFirstDayOfMonth();
  const selectedEvents = selectedDay ? eventsForDay(selectedDay) : [];

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">Content Calendar</h2>
          <p className="text-[14px] text-zinc-500 mt-1">Plan and schedule content.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Event
        </button>
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-4">
        <div className="bg-[#111113] rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h3 className="text-[15px] font-semibold text-white">
              {MONTHS[month]} {year}
            </h3>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-center text-[11px] font-medium text-zinc-500 uppercase tracking-wider py-2 border-b border-white/[0.04]"
              >
                {day}
              </div>
            ))}

            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-24 border-b border-r border-white/[0.03]" />
            ))}

            {loading
              ? Array.from({ length: daysInMonth }).map((_, i) => (
                  <div
                    key={`skeleton-${i}`}
                    className="h-24 border-b border-r border-white/[0.03] flex items-center justify-center"
                  >
                    <Loader2 className="h-4 w-4 text-zinc-700 animate-spin" />
                  </div>
                ))
              : Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = eventsForDay(day);
                  const todayCheck = isToday(day);
                  const selected = selectedDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(selected ? null : day)}
                      className={`h-24 border-b border-r border-white/[0.03] p-1.5 text-left hover:bg-white/[0.02] transition-colors ${
                        selected ? "bg-white/[0.04]" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[12px] font-medium ${
                          todayCheck
                            ? "bg-white text-zinc-900 font-bold"
                            : "text-zinc-400"
                        }`}
                      >
                        {day}
                      </span>
                      <div className="mt-1 space-y-0.5">
                        {dayEvents.slice(0, 3).map((event) => {
                          const tc = typeConfig[event.type] || typeConfig.other;
                          return (
                            <div
                              key={event._id}
                              className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] truncate border ${tc.color}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tc.dot}`} />
                              <span className="truncate">{event.title}</span>
                            </div>
                          );
                        })}
                        {dayEvents.length > 3 && (
                          <p className="text-[10px] text-zinc-600 px-1">
                            +{dayEvents.length - 3} more
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[13px] font-semibold text-white">
                {selectedDay
                  ? `${MONTHS[month]} ${selectedDay}`
                  : "Select a day"}
              </h4>
              {selectedDay && (
                <button
                  onClick={() => openModal(selectedDay)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              )}
            </div>
            {selectedDay ? (
              selectedEvents.length === 0 ? (
                <p className="text-[12px] text-zinc-600">No events.</p>
              ) : (
                <div className="space-y-2">
                  {selectedEvents.map((event) => {
                    const tc = typeConfig[event.type] || typeConfig.other;
                    const sc = statusConfig[event.status] || statusConfig.planned;
                    return (
                      <div
                        key={event._id}
                        className="bg-white/[0.02] rounded-lg p-3 border border-white/[0.04]"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[13px] font-medium text-white truncate">
                            {event.title}
                          </p>
                          <button
                            onClick={() => deleteEvent(event._id)}
                            className="p-1 rounded text-zinc-600 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${tc.color}`}
                          >
                            {tc.label}
                          </span>
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${sc.color}`}
                          >
                            {sc.label}
                          </span>
                        </div>
                        {event.description && (
                          <p className="text-[11px] text-zinc-500 mt-1.5 line-clamp-2">
                            {event.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <p className="text-[12px] text-zinc-600">Click a day to view events.</p>
            )}
          </div>

          <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-4">
            <h4 className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
              Event Types
            </h4>
            <div className="space-y-1.5">
              {Object.entries(typeConfig).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${v.dot}`} />
                  <span className="text-[12px] text-zinc-400">{v.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-4">
            <h4 className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">
              Status
            </h4>
            <div className="space-y-1.5">
              {Object.entries(statusConfig).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${v.color}`}
                  >
                    {v.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111113] border border-white/[0.06] rounded-xl w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-white">New Event</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Event title..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />

              <div>
                <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                    Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
                  >
                    {Object.entries(typeConfig).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
                  >
                    {Object.entries(statusConfig).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Event details..."
                  rows={3}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                  Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Additional notes..."
                  rows={2}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-white/[0.04]">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEvent}
                disabled={saving || !form.title.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
              >
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
