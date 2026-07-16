"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Save,
  Trash2,
  ArrowLeft,
  Loader2,
  Image,
  Circle,
  PenTool,
  CheckCircle,
  Paintbrush,
} from "lucide-react";

interface Thumbnail {
  _id: string;
  title: string;
  projectId: string;
  imageUrl: string;
  altText: string;
  style: string;
  colors: string[];
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  concept: { label: "Concept", color: "text-zinc-400 bg-zinc-800/50", icon: Circle },
  designed: { label: "Designed", color: "text-sky-400 bg-sky-500/10", icon: PenTool },
  approved: { label: "Approved", color: "text-emerald-400 bg-emerald-500/10", icon: CheckCircle },
  used: { label: "Used", color: "text-violet-400 bg-violet-500/10", icon: Paintbrush },
};

const styleConfig: Record<string, { label: string; color: string }> = {
  "bold-text": { label: "Bold Text", color: "text-rose-400 bg-rose-500/10" },
  "photo-heavy": { label: "Photo Heavy", color: "text-amber-400 bg-amber-500/10" },
  minimal: { label: "Minimal", color: "text-emerald-400 bg-emerald-500/10" },
  mixed: { label: "Mixed", color: "text-sky-400 bg-sky-500/10" },
};

export default function ThumbnailsPage() {
  const [items, setItems] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Thumbnail> | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterStyle, setFilterStyle] = useState("all");
  const [saving, setSaving] = useState(false);
  const [colorInput, setColorInput] = useState("");

  const fetchItems = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (filterStyle !== "all") params.set("style", filterStyle);
    if (search) params.set("search", search);
    const res = await fetch(`/api/thumbnails?${params}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, [filterStatus, filterStyle, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createNew = () => {
    setEditing({
      title: "",
      projectId: "",
      imageUrl: "",
      altText: "",
      style: "bold-text",
      colors: [],
      notes: "",
      status: "concept",
    });
    setColorInput("");
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing._id) {
        const res = await fetch("/api/thumbnails", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
        setEditing(updated);
      } else {
        const res = await fetch("/api/thumbnails", {
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
    if (!confirm("Delete this thumbnail?")) return;
    await fetch(`/api/thumbnails?id=${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i._id !== id));
    if (editing?._id === id) setEditing(null);
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/thumbnails", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const updated = await res.json();
    setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
    if (editing?._id === id) setEditing(updated);
  };

  const addColor = () => {
    const hex = colorInput.trim();
    if (!hex) return;
    const clean = hex.startsWith("#") ? hex : `#${hex}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(clean) && editing) {
      setEditing({ ...editing, colors: [...(editing.colors || []), clean] });
      setColorInput("");
    }
  };

  const removeColor = (index: number) => {
    if (!editing) return;
    setEditing({ ...editing, colors: editing.colors?.filter((_, i) => i !== index) });
  };

  const isEditing = editing !== null;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">
            {isEditing ? (editing.title || "Untitled Thumbnail") : "Thumbnail Studio"}
          </h2>
          <p className="text-[14px] text-zinc-500 mt-1">
            {isEditing
              ? `${editing.style} / ${editing.status}`
              : "Design and manage thumbnails."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => { setEditing(null); setColorInput(""); }}
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
              New Thumbnail
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Style</label>
              <select
                value={editing.style || "bold-text"}
                onChange={(e) => setEditing({ ...editing, style: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                <option value="bold-text">Bold Text</option>
                <option value="photo-heavy">Photo Heavy</option>
                <option value="minimal">Minimal</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Status</label>
              <select
                value={editing.status || "concept"}
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
            placeholder="Thumbnail title..."
            className="w-full bg-transparent text-[24px] font-bold text-white placeholder-zinc-700 focus:outline-none tracking-[-0.02em]"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Image URL</label>
              <input
                value={editing.imageUrl || ""}
                onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Project ID</label>
              <input
                value={editing.projectId || ""}
                onChange={(e) => setEditing({ ...editing, projectId: e.target.value })}
                placeholder="Link to video project..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
          </div>

          {editing.imageUrl && (
            <div className="bg-[#111113] rounded-xl border border-white/[0.06] overflow-hidden">
              <img
                src={editing.imageUrl}
                alt={editing.altText || "Thumbnail preview"}
                className="w-full h-48 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Alt Text</label>
            <input
              value={editing.altText || ""}
              onChange={(e) => setEditing({ ...editing, altText: e.target.value })}
              placeholder="Describe the thumbnail for accessibility..."
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-2">Color Palette</label>
            <div className="flex items-center gap-2 mb-2">
              {editing.colors?.map((color, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className="w-7 h-7 rounded-lg border border-white/[0.1] cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                    onClick={() => removeColor(i)}
                  />
                  <span className="text-[11px] text-zinc-600">{color}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
                placeholder="#ff5733 or ff5733"
                className="flex-1 max-w-[200px] bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
              <button
                onClick={addColor}
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
              placeholder="Design notes, feedback, requirements..."
              rows={4}
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
                placeholder="Search thumbnails..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
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
              value={filterStyle}
              onChange={(e) => setFilterStyle(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
            >
              <option value="all">All Styles</option>
              {Object.entries(styleConfig).map(([k, v]) => (
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
              <Image className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-[14px] text-zinc-500">No thumbnails yet.</p>
              <p className="text-[12px] text-zinc-600 mt-1">Click &quot;New Thumbnail&quot; to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {items.map((item) => {
                const sc = statusConfig[item.status] || statusConfig.concept;
                const stc = styleConfig[item.style] || styleConfig.mixed;
                const StatusIcon = sc.icon;
                return (
                  <button
                    key={item._id}
                    onClick={() => { setEditing(item); setColorInput(""); }}
                    className="bg-[#111113] border border-white/[0.04] hover:border-white/[0.1] rounded-xl overflow-hidden transition-all group text-left"
                  >
                    <div className="h-40 bg-white/[0.02] flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.altText || item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                      ) : (
                        <Image className="h-10 w-10 text-zinc-800" />
                      )}
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${sc.color}`}>
                          <StatusIcon className="h-2.5 w-2.5" />
                          {sc.label}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium ${stc.color}`}>
                          {stc.label}
                        </span>
                      </div>
                      <p className="text-[13px] font-semibold text-white truncate group-hover:text-zinc-200 transition-colors">
                        {item.title || "Untitled"}
                      </p>
                      {item.colors.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          {item.colors.slice(0, 5).map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full border border-white/[0.1]"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                          {item.colors.length > 5 && (
                            <span className="text-[10px] text-zinc-600">+{item.colors.length - 5}</span>
                          )}
                        </div>
                      )}
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
