"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Loader2,
  Columns3,
  Plus,
  Filter,
} from "lucide-react";
import KanbanBoard from "@/components/admin/KanbanBoard";

interface PipelineItem {
  _id: string;
  title: string;
  type: string;
  category: string;
  platform: string;
  status: string;
  wordCount: number;
  aiAssisted: boolean;
  updatedAt: string;
}

const types = [
  { value: "all", label: "All Types" },
  { value: "blog", label: "Blog" },
  { value: "reel-script", label: "Reel Script" },
  { value: "short-script", label: "Short Script" },
  { value: "long-form-script", label: "Long-form Script" },
  { value: "instagram-caption", label: "IG Caption" },
];

export default function PipelinePage() {
  const [items, setItems] = useState<PipelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const fetchItems = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterType !== "all") params.set("type", filterType);
    if (search) params.set("search", search);
    const res = await fetch(`/api/content?${params}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, [filterType, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, status: newStatus } : i))
    );
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">Content Pipeline</h2>
          <p className="text-[14px] text-zinc-500 mt-1">
            Drag content between stages. {items.length} total items.
          </p>
        </div>
        <a
          href="/admin/blog-studio"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Content
        </a>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pipeline..."
            className="bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
        >
          {types.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Kanban */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 text-zinc-600 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-16 text-center">
          <Columns3 className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-[14px] text-zinc-500">No content in the pipeline.</p>
          <p className="text-[12px] text-zinc-600 mt-1">Create content in Blog &amp; Script Studio first.</p>
        </div>
      ) : (
        <KanbanBoard items={items} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
}
