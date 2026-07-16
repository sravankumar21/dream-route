"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Save,
  Trash2,
  ArrowLeft,
  Loader2,
  Video,
  Circle,
  Scissors,
  Eye,
  Film,
  CheckCircle,
  ExternalLink,
  Clock,
  Tag,
  Play,
  Camera,
  HardDrive,
} from "lucide-react";

interface VideoItem {
  _id: string;
  title: string;
  source: string;
  fileUrl: string;
  duration: string;
  thumbnailUrl: string;
  tags: string[];
  status: string;
  publishedAt: string | null;
  platformUrl: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  raw: { label: "Raw", color: "text-zinc-400 bg-zinc-800/50", icon: Circle },
  editing: { label: "Editing", color: "text-amber-400 bg-amber-500/10", icon: Scissors },
  review: { label: "Review", color: "text-sky-400 bg-sky-500/10", icon: Eye },
  final: { label: "Final", color: "text-violet-400 bg-violet-500/10", icon: Film },
  published: { label: "Published", color: "text-emerald-400 bg-emerald-500/10", icon: CheckCircle },
};

const sourceConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  local: { label: "Local", color: "text-zinc-400 bg-zinc-800/50", icon: HardDrive },
  youtube: { label: "YouTube", color: "text-red-400 bg-red-500/10", icon: Play },
  instagram: { label: "Instagram", color: "text-pink-400 bg-pink-500/10", icon: Camera },
};

export default function VideoStudioPage() {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<VideoItem> | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const fetchItems = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (filterSource !== "all") params.set("source", filterSource);
    if (search) params.set("search", search);
    const res = await fetch(`/api/studio?${params}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, [filterStatus, filterSource, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createNew = () => {
    setEditing({
      title: "",
      source: "local",
      fileUrl: "",
      duration: "",
      thumbnailUrl: "",
      tags: [],
      status: "raw",
      publishedAt: null,
      platformUrl: "",
      notes: "",
    });
    setTagInput("");
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing._id) {
        const res = await fetch("/api/studio", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
        setEditing(updated);
      } else {
        const res = await fetch("/api/studio", {
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
    if (!confirm("Delete this video?")) return;
    await fetch(`/api/studio?id=${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i._id !== id));
    if (editing?._id === id) setEditing(null);
  };

  const updateStatus = async (id: string, status: string) => {
    const update: Record<string, unknown> = { id, status };
    if (status === "published") update.publishedAt = new Date().toISOString();
    const res = await fetch("/api/studio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });
    const updated = await res.json();
    setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
    if (editing?._id === id) setEditing(updated);
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (!tag || !editing) return;
    if (!editing.tags?.includes(tag)) {
      setEditing({ ...editing, tags: [...(editing.tags || []), tag] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    if (!editing) return;
    setEditing({ ...editing, tags: editing.tags?.filter((t) => t !== tag) });
  };

  const isEditing = editing !== null;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">
            {isEditing ? (editing.title || "Untitled Video") : "Video Studio"}
          </h2>
          <p className="text-[14px] text-zinc-500 mt-1">
            {isEditing
              ? `${sourceConfig[editing.source || "local"]?.label} / ${statusConfig[editing.status || "raw"]?.label}`
              : "Quick access to editing tools and publishing workflow."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => { setEditing(null); setTagInput(""); }}
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
              Add Video
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Source</label>
              <select
                value={editing.source || "local"}
                onChange={(e) => setEditing({ ...editing, source: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                {Object.entries(sourceConfig).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Status</label>
              <select
                value={editing.status || "raw"}
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
            placeholder="Video title..."
            className="w-full bg-transparent text-[24px] font-bold text-white placeholder-zinc-700 focus:outline-none tracking-[-0.02em]"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">File URL</label>
              <input
                value={editing.fileUrl || ""}
                onChange={(e) => setEditing({ ...editing, fileUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Duration</label>
              <input
                value={editing.duration || ""}
                onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                placeholder="12:34"
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
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
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Platform URL</label>
              <input
                value={editing.platformUrl || ""}
                onChange={(e) => setEditing({ ...editing, platformUrl: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
          </div>

          {editing.thumbnailUrl && (
            <div className="bg-[#111113] rounded-xl border border-white/[0.06] overflow-hidden">
              <img
                src={editing.thumbnailUrl}
                alt={editing.title || "Thumbnail preview"}
                className="w-full h-48 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-2">Tags</label>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {editing.tags?.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-zinc-300 bg-white/[0.06] border border-white/[0.06]">
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-0.5 text-zinc-600 hover:text-zinc-400">×</button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add tag..."
                className="flex-1 max-w-[200px] bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
              <button
                onClick={addTag}
                className="px-3 py-2 rounded-lg text-[12px] font-medium text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Notes</label>
            <textarea
              value={editing.notes || ""}
              onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
              placeholder="Editing notes, script reference, revision notes..."
              rows={4}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
            />
          </div>

          {editing._id && (
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
              <span className="text-[12px] text-zinc-600 mr-1">Move to:</span>
              {Object.entries(statusConfig).map(([k, v]) => {
                const StatusIcon = v.icon;
                return (
                  <button
                    key={k}
                    onClick={() => updateStatus(editing._id!, k)}
                    disabled={editing.status === k}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors ${
                      editing.status === k
                        ? "border-white/[0.12] text-white bg-white/[0.08]"
                        : "border-white/[0.04] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                    }`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {v.label}
                  </button>
                );
              })}
              <div className="flex-1" />
              {editing.platformUrl && (
                <a
                  href={editing.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-zinc-600 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
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
                placeholder="Search videos..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
            >
              <option value="all">All Sources</option>
              {Object.entries(sourceConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
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
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 text-zinc-600 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-16 text-center">
              <Video className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-[14px] text-zinc-500">No videos yet.</p>
              <p className="text-[12px] text-zinc-600 mt-1">Click &quot;Add Video&quot; to get started.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item) => {
                const sc = statusConfig[item.status] || statusConfig.raw;
                const src = sourceConfig[item.source] || sourceConfig.local;
                const StatusIcon = sc.icon;
                const SourceIcon = src.icon;
                return (
                  <button
                    key={item._id}
                    onClick={() => { setEditing(item); setTagInput(""); }}
                    className="w-full bg-[#111113] border border-white/[0.04] hover:border-white/[0.1] rounded-xl p-4 flex items-center gap-4 transition-all group text-left"
                  >
                    <div className="w-28 h-16 bg-white/[0.03] rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                      {item.thumbnailUrl ? (
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      ) : (
                        <Video className="h-6 w-6 text-zinc-800" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${sc.color}`}>
                          <StatusIcon className="h-2.5 w-2.5" />
                          {sc.label}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${src.color}`}>
                          <SourceIcon className="h-2.5 w-2.5" />
                          {src.label}
                        </span>
                      </div>
                      <p className="text-[13px] font-semibold text-white truncate group-hover:text-zinc-200 transition-colors">
                        {item.title || "Untitled"}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        {item.duration && (
                          <span className="flex items-center gap-1 text-[11px] text-zinc-600">
                            <Clock className="h-3 w-3" />
                            {item.duration}
                          </span>
                        )}
                        {item.tags.length > 0 && (
                          <span className="flex items-center gap-1 text-[11px] text-zinc-600">
                            <Tag className="h-3 w-3" />
                            {item.tags.slice(0, 3).join(", ")}{item.tags.length > 3 ? ` +${item.tags.length - 3}` : ""}
                          </span>
                        )}
                      </div>
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
