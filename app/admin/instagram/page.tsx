"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Save,
  Trash2,
  ArrowLeft,
  Loader2,
  Camera,
  Film,
  LayoutGrid,
  BookOpen,
  Circle,
  PenTool,
  CheckCircle,
  Play,
  ExternalLink,
  Hash,
  Music,
} from "lucide-react";

interface InstagramPost {
  _id: string;
  type: string;
  caption: string;
  hook: string;
  hashtags: string[];
  audioNote: string;
  thumbnailUrl: string;
  status: string;
  scheduledDate?: string;
  publishedUrl: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  idea: { label: "Idea", color: "text-zinc-400 bg-zinc-800/50", icon: Circle },
  creating: { label: "Creating", color: "text-amber-400 bg-amber-500/10", icon: PenTool },
  ready: { label: "Ready", color: "text-emerald-400 bg-emerald-500/10", icon: CheckCircle },
  published: { label: "Published", color: "text-violet-400 bg-violet-500/10", icon: Play },
};

const typeConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  reel: { label: "Reel", color: "text-pink-400 bg-pink-500/10", icon: Film },
  carousel: { label: "Carousel", color: "text-sky-400 bg-sky-500/10", icon: LayoutGrid },
  story: { label: "Story", color: "text-amber-400 bg-amber-500/10", icon: BookOpen },
};

export default function InstagramPage() {
  const [items, setItems] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<InstagramPost> | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterType !== "all") params.set("type", filterType);
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (search) params.set("search", search);
    const res = await fetch(`/api/instagram?${params}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, [filterType, filterStatus, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createNew = () => {
    setEditing({
      type: "reel",
      caption: "",
      hook: "",
      hashtags: [],
      audioNote: "",
      thumbnailUrl: "",
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
        const res = await fetch("/api/instagram", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
        setEditing(updated);
      } else {
        const res = await fetch("/api/instagram", {
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
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/instagram?id=${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i._id !== id));
    if (editing?._id === id) setEditing(null);
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/instagram", {
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
            {isEditing ? (editing.hook || "Untitled Post") : "Instagram Management"}
          </h2>
          <p className="text-[14px] text-zinc-500 mt-1">
            {isEditing
              ? `${editing.type} / ${editing.status}`
              : "Manage reels, captions, hooks, and hashtags."}
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
                disabled={saving}
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
              New Post
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Type</label>
              <select
                value={editing.type || "reel"}
                onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                <option value="reel">Reel</option>
                <option value="carousel">Carousel</option>
                <option value="story">Story</option>
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

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Hook <span className="text-zinc-600 normal-case">(first line that stops the scroll)</span>
            </label>
            <input
              value={editing.hook || ""}
              onChange={(e) => setEditing({ ...editing, hook: e.target.value })}
              placeholder="Write a hook that stops the scroll..."
              className="w-full bg-transparent text-[18px] font-semibold text-white placeholder-zinc-700 focus:outline-none tracking-[-0.01em]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Caption</label>
            <textarea
              value={editing.caption || ""}
              onChange={(e) => setEditing({ ...editing, caption: e.target.value })}
              placeholder="Write the full caption..."
              rows={8}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-3 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              <span className="inline-flex items-center gap-1">
                <Hash className="h-3 w-3" />
                Hashtags (comma-separated)
              </span>
            </label>
            <input
              value={(editing.hashtags || []).join(", ")}
              onChange={(e) =>
                setEditing({ ...editing, hashtags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
              }
              placeholder="aicareer, aidriven, tech..."
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                <span className="inline-flex items-center gap-1">
                  <Music className="h-3 w-3" />
                  Audio Notes
                </span>
              </label>
              <input
                value={editing.audioNote || ""}
                onChange={(e) => setEditing({ ...editing, audioNote: e.target.value })}
                placeholder="Trending sound, original audio..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Thumbnail URL</label>
              <input
                value={editing.thumbnailUrl || ""}
                onChange={(e) => setEditing({ ...editing, thumbnailUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Published URL</label>
              <input
                value={editing.publishedUrl || ""}
                onChange={(e) => setEditing({ ...editing, publishedUrl: e.target.value })}
                placeholder="https://instagram.com/reel/..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Scheduled Date</label>
              <input
                type="date"
                value={editing.scheduledDate ? new Date(editing.scheduledDate).toISOString().split("T")[0] : ""}
                onChange={(e) => setEditing({ ...editing, scheduledDate: e.target.value })}
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
                placeholder="Search posts..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="reel">Reel</option>
              <option value="carousel">Carousel</option>
              <option value="story">Story</option>
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
              <Camera className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-[14px] text-zinc-500">No Instagram posts yet.</p>
              <p className="text-[12px] text-zinc-600 mt-1">Click &quot;New Post&quot; to get started.</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {items.map((item) => {
                const sc = statusConfig[item.status] || statusConfig.idea;
                const tc = typeConfig[item.type] || typeConfig.reel;
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
                          {item.hook || "No hook yet"}
                        </p>
                        {item.publishedUrl && (
                          <ExternalLink className="h-3 w-3 text-zinc-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-[12px] text-zinc-600 mt-0.5 truncate">
                        {item.caption?.substring(0, 80) || "No caption yet"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium ${tc.color}`}>
                        <TypeIcon className="h-3 w-3" />
                        {tc.label}
                      </span>
                      {item.hashtags.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-zinc-400 bg-zinc-800/30">
                          <Hash className="h-3 w-3" />
                          {item.hashtags.length}
                        </span>
                      )}
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
