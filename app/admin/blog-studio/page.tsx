"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Sparkles,
  Save,
  Trash2,
  ArrowLeft,
  Clock,
  Eye,
  Check,
  Archive,
  Loader2,
  FileText,
  Film,
  Camera,
  PenTool,
} from "lucide-react";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import GenerateModal from "@/components/admin/GenerateModal";

interface ContentItem {
  _id: string;
  title: string;
  slug: string;
  type: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: string;
  platform: string;
  aiAssisted: boolean;
  wordCount: number;
  publishDate?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const typeIcons: Record<string, any> = {
  blog: FileText,
  "reel-script": Film,
  "short-script": Film,
  "long-form-script": PenTool,
  "instagram-caption": Camera,
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  draft: { label: "Draft", color: "text-zinc-400 bg-zinc-800/50", icon: PenTool },
  review: { label: "In Review", color: "text-amber-400 bg-amber-500/10", icon: Eye },
  ready: { label: "Ready", color: "text-sky-400 bg-sky-500/10", icon: Check },
  published: { label: "Published", color: "text-emerald-400 bg-emerald-500/10", icon: Check },
  archived: { label: "Archived", color: "text-zinc-500 bg-zinc-800/30", icon: Archive },
};

const categories = [
  { value: "all", label: "All" },
  { value: "ai-tools", label: "AI Tools" },
  { value: "job-market", label: "Job Market" },
  { value: "learn", label: "Learn" },
  { value: "industry", label: "Industry" },
  { value: "general", label: "General" },
];

const types = [
  { value: "all", label: "All Types" },
  { value: "blog", label: "Blog" },
  { value: "reel-script", label: "Reel Script" },
  { value: "short-script", label: "Short Script" },
  { value: "long-form-script", label: "Long-form Script" },
  { value: "instagram-caption", label: "IG Caption" },
];

export default function BlogStudioPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContentItem | null>(null);
  const [editing, setEditing] = useState<Partial<ContentItem>>({});
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [generating, setGenerating] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterType !== "all") params.set("type", filterType);
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (filterCategory !== "all") params.set("category", filterCategory);
    if (search) params.set("search", search);

    const res = await fetch(`/api/content?${params}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, [filterType, filterStatus, filterCategory, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createNew = (type: string = "blog") => {
    const newItem: Partial<ContentItem> = {
      title: "",
      type,
      content: "",
      excerpt: "",
      category: "general",
      tags: [],
      status: "draft",
      platform: "dreamroute",
      notes: "",
    };
    setEditing(newItem);
    setSelected(null);
  };

  const save = async () => {
    setSaving(true);
    try {
      if (editing._id) {
        const res = await fetch("/api/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
        setSelected(updated);
        setEditing(updated);
      } else {
        const res = await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const created = await res.json();
        setItems((prev) => [created, ...prev]);
        setSelected(created);
        setEditing(created);
      }
    } catch {
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this content?")) return;
    await fetch(`/api/content?id=${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i._id !== id));
    if (selected?._id === id) {
      setSelected(null);
      setEditing({});
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const updated = await res.json();
    setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
    if (selected?._id === id) {
      setSelected(updated);
      setEditing(updated);
    }
  };

  const handleGenerate = (content: string) => {
    setEditing((prev) => ({
      ...prev,
      content: (prev.content ? prev.content + "\n\n" : "") + content,
      aiAssisted: true,
    }));
  };

  const isEditing = editing.title !== undefined || editing.content !== undefined;

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">
            {isEditing ? (editing.title || "Untitled") : "Blog & Script Studio"}
          </h2>
          <p className="text-[14px] text-zinc-500 mt-1">
            {isEditing
              ? `${editing.type || "blog"} · ${editing.status || "draft"} · ${editing.wordCount || 0} words`
              : "Write scripts for Reels, Shorts, long-form videos, and blog posts."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setEditing({});
                  setSelected(null);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                onClick={() => setShowGenerate(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                AI Generate
              </button>
              <button
                onClick={save}
                disabled={saving || !editing.title}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
              >
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => createNew("blog")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Post
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        /* ─── Editor View ─── */
        <div className="space-y-4">
          {/* Meta row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Type</label>
              <select
                value={editing.type || "blog"}
                onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                {types.filter((t) => t.value !== "all").map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Category</label>
              <select
                value={editing.category || "general"}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                {categories.filter((c) => c.value !== "all").map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Platform</label>
              <select
                value={editing.platform || "dreamroute"}
                onChange={(e) => setEditing({ ...editing, platform: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                <option value="dreamroute">DreamRoute</option>
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="all">All Platforms</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Status</label>
              <select
                value={editing.status || "draft"}
                onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                {Object.entries(statusConfig).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <input
            value={editing.title || ""}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            placeholder="Post title..."
            className="w-full bg-transparent text-[24px] font-bold text-white placeholder-zinc-700 focus:outline-none tracking-[-0.02em]"
          />

          {/* Excerpt */}
          <input
            value={editing.excerpt || ""}
            onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
            placeholder="Short excerpt for previews..."
            className="w-full bg-white/[0.03] border border-white/[0.04] rounded-lg px-4 py-2.5 text-[14px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.1]"
          />

          {/* Tags */}
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Tags (comma-separated)</label>
            <input
              value={(editing.tags || []).join(", ")}
              onChange={(e) =>
                setEditing({ ...editing, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
              }
              placeholder="ai-tools, career, students..."
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
            />
          </div>

          {/* Editor */}
          <MarkdownEditor
            value={editing.content || ""}
            onChange={(content) => setEditing({ ...editing, content })}
            placeholder={`Start writing your ${(editing.type || "blog").replace("-", " ")}...`}
            minHeight="500px"
          />

          {/* Notes */}
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Admin Notes</label>
            <textarea
              value={editing.notes || ""}
              onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
              placeholder="Internal notes, ideas, links..."
              rows={3}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
            />
          </div>

          {/* Quick status buttons */}
          {editing._id && (
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
              <span className="text-[12px] text-zinc-600 mr-1">Move to:</span>
              {Object.entries(statusConfig).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => updateStatus(editing._id!, k)}
                  disabled={editing.status === k}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors ${
                    editing.status === k
                      ? "border-white/[0.12] text-white bg-white/[0.08]"
                      : "border-white/[0.04] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                  }`}
                >
                  {v.label}
                </button>
              ))}
              <div className="flex-1" />
              <button
                onClick={() => deleteItem(editing._id!)}
                className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ─── List View ─── */
        <>
          {/* Filters */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search content..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
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
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
            >
              <option value="all">All Status</option>
              {Object.entries(statusConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Content list */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 text-zinc-600 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-16 text-center">
              <FileText className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-[14px] text-zinc-500">No content yet.</p>
              <p className="text-[12px] text-zinc-600 mt-1">Click &quot;New Post&quot; to get started.</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {items.map((item) => {
                const TypeIcon = typeIcons[item.type] || FileText;
                const sc = statusConfig[item.status] || statusConfig.draft;
                const StatusIcon = sc.icon;
                return (
                  <button
                    key={item._id}
                    onClick={() => {
                      setSelected(item);
                      setEditing(item);
                    }}
                    className="w-full bg-[#111113] border border-white/[0.04] hover:border-white/[0.1] rounded-xl px-5 py-4 flex items-center gap-4 transition-all group text-left"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                      <TypeIcon className="h-4 w-4 text-zinc-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-semibold text-white truncate group-hover:text-zinc-200 transition-colors">
                          {item.title || "Untitled"}
                        </p>
                        {item.aiAssisted && (
                          <Sparkles className="h-3 w-3 text-violet-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-[12px] text-zinc-600 mt-0.5 truncate">
                        {item.excerpt || item.content?.substring(0, 80) || "No content"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] text-zinc-600">
                        {item.wordCount} words
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium ${sc.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {sc.label}
                      </span>
                      <span className="text-[11px] text-zinc-700">
                        {new Date(item.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      <GenerateModal
        open={showGenerate}
        onClose={() => setShowGenerate(false)}
        onGenerate={handleGenerate}
      />
    </div>
  );
}
