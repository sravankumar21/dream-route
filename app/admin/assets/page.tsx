"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Save,
  Trash2,
  ArrowLeft,
  Loader2,
  FolderOpen,
  Image,
  Type,
  Palette,
  Layout,
  Diamond,
  FileImage,
  Tag,
} from "lucide-react";

interface AssetItem {
  _id: string;
  name: string;
  type: string;
  fileUrl: string;
  tags: string[];
  category: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const typeConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  logo: { label: "Logo", color: "text-violet-400 bg-violet-500/10", icon: Diamond },
  font: { label: "Font", color: "text-amber-400 bg-amber-500/10", icon: Type },
  color: { label: "Color", color: "text-rose-400 bg-rose-500/10", icon: Palette },
  template: { label: "Template", color: "text-emerald-400 bg-emerald-500/10", icon: Layout },
  icon: { label: "Icon", color: "text-sky-400 bg-sky-500/10", icon: FileImage },
  image: { label: "Image", color: "text-zinc-400 bg-zinc-800/50", icon: Image },
};

const categoryConfig: Record<string, { label: string; color: string }> = {
  brand: { label: "Brand", color: "text-violet-400 bg-violet-500/10" },
  social: { label: "Social", color: "text-sky-400 bg-sky-500/10" },
  youtube: { label: "YouTube", color: "text-red-400 bg-red-500/10" },
  instagram: { label: "Instagram", color: "text-pink-400 bg-pink-500/10" },
  blog: { label: "Blog", color: "text-emerald-400 bg-emerald-500/10" },
};

export default function AssetsPage() {
  const [items, setItems] = useState<AssetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<AssetItem> | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const fetchItems = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterType !== "all") params.set("type", filterType);
    if (filterCategory !== "all") params.set("category", filterCategory);
    if (search) params.set("search", search);
    const res = await fetch(`/api/assets?${params}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, [filterType, filterCategory, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createNew = () => {
    setEditing({
      name: "",
      type: "image",
      fileUrl: "",
      tags: [],
      category: "brand",
      notes: "",
    });
    setTagInput("");
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing._id) {
        const res = await fetch("/api/assets", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        });
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
        setEditing(updated);
      } else {
        const res = await fetch("/api/assets", {
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
    if (!confirm("Delete this asset?")) return;
    await fetch(`/api/assets?id=${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i._id !== id));
    if (editing?._id === id) setEditing(null);
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
            {isEditing ? (editing.name || "Untitled Asset") : "Assets Library"}
          </h2>
          <p className="text-[14px] text-zinc-500 mt-1">
            {isEditing
              ? `${typeConfig[editing.type || "image"]?.label} / ${categoryConfig[editing.category || "brand"]?.label}`
              : "Logos, fonts, colors, templates, and more."}
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
                disabled={saving || !editing.name}
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
              Upload Asset
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <input
            value={editing.name || ""}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            placeholder="Asset name..."
            className="w-full bg-transparent text-[24px] font-bold text-white placeholder-zinc-700 focus:outline-none tracking-[-0.02em]"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Type</label>
              <select
                value={editing.type || "image"}
                onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                {Object.entries(typeConfig).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Category</label>
              <select
                value={editing.category || "brand"}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              >
                {Object.entries(categoryConfig).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">File URL</label>
            <input
              value={editing.fileUrl || ""}
              onChange={(e) => setEditing({ ...editing, fileUrl: e.target.value })}
              placeholder="https://..."
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
            />
          </div>

          {editing.fileUrl && (editing.type === "image" || editing.type === "logo") && (
            <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-4 flex items-center justify-center">
              <img
                src={editing.fileUrl}
                alt={editing.name || "Asset preview"}
                className="max-h-40 object-contain"
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
              placeholder="Usage notes, version info, source details..."
              rows={4}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
            />
          </div>

          {editing._id && (
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
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
                placeholder="Search assets..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
            >
              <option value="all">All Types</option>
              {Object.entries(typeConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
            >
              <option value="all">All Categories</option>
              {Object.entries(categoryConfig).map(([k, v]) => (
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
              <FolderOpen className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-[14px] text-zinc-500">No assets yet.</p>
              <p className="text-[12px] text-zinc-600 mt-1">Click &quot;Upload Asset&quot; to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map((item) => {
                const tc = typeConfig[item.type] || typeConfig.image;
                const cc = categoryConfig[item.category] || categoryConfig.brand;
                const TypeIcon = tc.icon;
                return (
                  <button
                    key={item._id}
                    onClick={() => { setEditing(item); setTagInput(""); }}
                    className="bg-[#111113] border border-white/[0.04] hover:border-white/[0.1] rounded-xl overflow-hidden transition-all group text-left"
                  >
                    <div className="h-32 bg-white/[0.02] flex items-center justify-center overflow-hidden">
                      {item.fileUrl && (item.type === "image" || item.type === "logo") ? (
                        <img
                          src={item.fileUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            target.parentElement?.classList.add("flex", "items-center", "justify-center");
                          }}
                        />
                      ) : (
                        <TypeIcon className="h-8 w-8 text-zinc-800" />
                      )}
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${tc.color}`}>
                          <TypeIcon className="h-2.5 w-2.5" />
                          {tc.label}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium ${cc.color}`}>
                          {cc.label}
                        </span>
                      </div>
                      <p className="text-[13px] font-semibold text-white truncate group-hover:text-zinc-200 transition-colors">
                        {item.name || "Untitled"}
                      </p>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] text-zinc-600 bg-white/[0.03] px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="text-[10px] text-zinc-600">+{item.tags.length - 3}</span>
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
