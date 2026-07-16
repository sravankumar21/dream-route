"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Save,
  Trash2,
  ArrowLeft,
  Loader2,
  Play,
  Film,
  PenTool,
  Edit3,
  CheckCircle,
  Circle,
  ExternalLink,
} from "lucide-react";

interface VideoProject {
  _id: string;
  title: string;
  platform: string;
  type: string;
  script: string;
  thumbnailUrl: string;
  thumbnailNotes: string;
  seoTitle: string;
  seoDescription: string;
  seoTags: string[];
  status: string;
  publishDate?: string;
  publishedUrl: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  idea: { label: "Idea", color: "text-zinc-400 bg-zinc-800/50", icon: Circle },
  scripting: { label: "Scripting", color: "text-amber-400 bg-amber-500/10", icon: PenTool },
  editing: { label: "Editing", color: "text-sky-400 bg-sky-500/10", icon: Edit3 },
  ready: { label: "Ready", color: "text-emerald-400 bg-emerald-500/10", icon: CheckCircle },
  published: { label: "Published", color: "text-violet-400 bg-violet-500/10", icon: Play },
};

const typeConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  short: { label: "Short", color: "text-rose-400 bg-rose-500/10", icon: Film },
  reel: { label: "Reel", color: "text-pink-400 bg-pink-500/10", icon: Film },
  "long-form": { label: "Long-form", color: "text-blue-400 bg-indigo-500/10", icon: Play },
};

const platformConfig: Record<string, { label: string; color: string }> = {
  youtube: { label: "YouTube", color: "text-red-400 bg-red-500/10" },
  instagram: { label: "Instagram", color: "text-pink-400 bg-pink-500/10" },
};

export default function YouTubePage() {
  const [items, setItems] = useState<VideoProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<VideoProject> | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterType !== "all") params.set("type", filterType);
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (search) params.set("search", search);
    const res = await fetch(`/api/videos?${params}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, [filterType, filterStatus, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createNew = () => {
    setEditing({
      title: "",
      platform: "youtube",
      type: "short",
      script: "",
      thumbnailUrl: "",
      thumbnailNotes: "",
      seoTitle: "",
      seoDescription: "",
      seoTags: [],
      status: "idea",
      publishedUrl: "",
      notes: "",
    });
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing._id) {
        const res = await fetch("/api/videos", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
        setEditing(updated);
      } else {
        const res = await fetch("/api/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const created = await res.json();
        setItems((prev) => [created, ...prev]);
        setEditing(created);
      }
    } catch {
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i._id !== id));
    if (editing?._id === id) setEditing(null);
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/videos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const updated = await res.json();
    setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
    if (editing?._id === id) setEditing(updated);
  };

  const isEditing = editing !== null;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">
            {isEditing ? (editing.title || "Untitled Project") : "YouTube Management"}
          </h2>
          <p className="text-[14px] text-zinc-500 mt-1">
            {isEditing
              ? `${editing.platform} / ${editing.type} / ${editing.status}`
              : "Track video scripts, thumbnails, SEO metadata, and publishing status."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => setEditing(null)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
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
              onClick={createNew}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Project
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Platform</label>
              <select
                value={editing.platform || "youtube"}
                onChange={(e) => setEditing({ ...editing, platform: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Type</label>
              <select
                value={editing.type || "short"}
                onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                <option value="short">Short</option>
                <option value="reel">Reel</option>
                <option value="long-form">Long-form</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Status</label>
              <select
                value={editing.status || "idea"}
                onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                {Object.entries(statusConfig).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>

          <input
            value={editing.title || ""}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            placeholder="Project title..."
            className="w-full bg-transparent text-[24px] font-bold text-white placeholder-zinc-700 focus:outline-none tracking-[-0.02em]"
          />

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Script</label>
            <textarea
              value={editing.script || ""}
              onChange={(e) => setEditing({ ...editing, script: e.target.value })}
              placeholder="Write the video script here..."
              rows={12}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-3 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none font-mono leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Thumbnail URL</label>
              <input
                value={editing.thumbnailUrl || ""}
                onChange={(e) => setEditing({ ...editing, thumbnailUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Thumbnail Notes</label>
              <input
                value={editing.thumbnailNotes || ""}
                onChange={(e) => setEditing({ ...editing, thumbnailNotes: e.target.value })}
                placeholder="Design notes..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
          </div>

          <div className="border-t border-white/[0.04] pt-4">
            <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-3">SEO Metadata</p>
            <div className="space-y-3">
              <div>
                <label className="text-[12px] text-zinc-500 block mb-1">SEO Title</label>
                <input
                  value={editing.seoTitle || ""}
                  onChange={(e) => setEditing({ ...editing, seoTitle: e.target.value })}
                  placeholder="Optimized title for search..."
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
                />
              </div>
              <div>
                <label className="text-[12px] text-zinc-500 block mb-1">SEO Description</label>
                <textarea
                  value={editing.seoDescription || ""}
                  onChange={(e) => setEditing({ ...editing, seoDescription: e.target.value })}
                  placeholder="Meta description for search results..."
                  rows={3}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
                />
              </div>
              <div>
                <label className="text-[12px] text-zinc-500 block mb-1">SEO Tags (comma-separated)</label>
                <input
                  value={(editing.seoTags || []).join(", ")}
                  onChange={(e) =>
                    setEditing({ ...editing, seoTags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
                  }
                  placeholder="ai, career, students..."
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Published URL</label>
              <input
                value={editing.publishedUrl || ""}
                onChange={(e) => setEditing({ ...editing, publishedUrl: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Publish Date</label>
              <input
                type="date"
                value={editing.publishDate ? new Date(editing.publishDate).toISOString().split("T")[0] : ""}
                onChange={(e) => setEditing({ ...editing, publishDate: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Notes</label>
            <textarea
              value={editing.notes || ""}
              onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
              placeholder="Internal notes..."
              rows={3}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
            />
          </div>

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
        <>
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="short">Short</option>
              <option value="reel">Reel</option>
              <option value="long-form">Long-form</option>
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
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 text-zinc-600 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-16 text-center">
              <Play className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-[14px] text-zinc-500">No video projects yet.</p>
              <p className="text-[12px] text-zinc-600 mt-1">Click &quot;New Project&quot; to get started.</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {items.map((item) => {
                const sc = statusConfig[item.status] || statusConfig.idea;
                const tc = typeConfig[item.type] || typeConfig.short;
                const pc = platformConfig[item.platform] || platformConfig.youtube;
                const StatusIcon = sc.icon;
                const TypeIcon = tc.icon;
                return (
                  <button
                    key={item._id}
                    onClick={() => setEditing(item)}
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
                        {item.publishedUrl && (
                          <ExternalLink className="h-3 w-3 text-zinc-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-[12px] text-zinc-600 mt-0.5 truncate">
                        {item.seoTitle || item.script?.substring(0, 80) || "No script yet"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium ${pc.color}`}>
                        {pc.label}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium ${tc.color}`}>
                        <TypeIcon className="h-3 w-3" />
                        {tc.label}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium ${sc.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {sc.label}
                      </span>
                      <span className="text-[11px] text-zinc-700 w-12 text-right">
                        {new Date(item.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
