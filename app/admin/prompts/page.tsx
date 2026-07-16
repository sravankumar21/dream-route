"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Star,
  Copy,
  Check,
  Trash2,
  ArrowLeft,
  Loader2,
  Sparkles,
  Tag,
  Zap,
  ChevronDown,
} from "lucide-react";

interface Prompt {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  useCount: number;
  favorite: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const categories: Record<string, { label: string; color: string }> = {
  writing: { label: "Writing", color: "text-violet-400 bg-violet-500/10" },
  summarize: { label: "Summarize", color: "text-amber-400 bg-amber-500/10" },
  brainstorm: { label: "Brainstorm", color: "text-emerald-400 bg-emerald-500/10" },
  social: { label: "Social", color: "text-rose-400 bg-rose-500/10" },
  seo: { label: "SEO", color: "text-orange-400 bg-orange-500/10" },
  other: { label: "Other", color: "text-zinc-400 bg-zinc-800/50" },
};

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "other",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchPrompts = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterCategory !== "all") params.set("category", filterCategory);
    if (filterFavorites) params.set("favorite", "true");
    if (search) params.set("search", search);
    const res = await fetch(`/api/prompts?${params}`);
    const data = await res.json();
    setPrompts(data);
    setLoading(false);
  }, [filterCategory, filterFavorites, search]);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUsePrompt = async (id: string) => {
    const res = await fetch(`/api/prompts?use=${id}`);
    const updated = await res.json();
    setPrompts((prev) => prev.map((p) => (p._id === id ? updated : p)));
  };

  const toggleFavorite = async (prompt: Prompt) => {
    const res = await fetch("/api/prompts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: prompt._id, favorite: !prompt.favorite }),
    });
    const updated = await res.json();
    setPrompts((prev) => prev.map((p) => (p._id === prompt._id ? updated : p)));
  };

  const openForm = (prompt?: Prompt) => {
    if (prompt) {
      setEditingId(prompt._id);
      setForm({
        title: prompt.title,
        content: prompt.content,
        category: prompt.category,
        tags: [...prompt.tags],
      });
    } else {
      setEditingId(null);
      setForm({ title: "", content: "", category: "other", tags: [] });
    }
    setTagInput("");
    setShowForm(true);
  };

  const savePrompt = async () => {
    if (!form.title.trim() || !form.content.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        const res = await fetch("/api/prompts", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
        const updated = await res.json();
        setPrompts((prev) => prev.map((p) => (p._id === editingId ? updated : p)));
      } else {
        const res = await fetch("/api/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const created = await res.json();
        setPrompts((prev) => [created, ...prev]);
      }
      setShowForm(false);
    } catch {
    } finally {
      setSaving(false);
    }
  };

  const deletePrompt = async (id: string) => {
    if (!confirm("Delete this prompt?")) return;
    await fetch(`/api/prompts?id=${id}`, { method: "DELETE" });
    setPrompts((prev) => prev.filter((p) => p._id !== id));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (!tag || form.tags.includes(tag)) return;
    setForm({ ...form, tags: [...form.tags, tag] });
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">
            {showForm ? (editingId ? "Edit Prompt" : "New Prompt") : "Prompt Library"}
          </h2>
          <p className="text-[14px] text-zinc-500 mt-1">
            {showForm ? "Save and organize your AI prompts." : "Save and organize AI prompts."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {showForm ? (
            <>
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                onClick={savePrompt}
                disabled={saving || !form.title.trim() || !form.content.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
              >
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                {editingId ? "Update" : "Save"}
              </button>
            </>
          ) : (
            <button
              onClick={() => openForm()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Prompt
            </button>
          )}
        </div>
      </div>

      {showForm ? (
        <div className="space-y-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Prompt title..."
            className="w-full bg-transparent text-[24px] font-bold text-white placeholder-zinc-700 focus:outline-none tracking-[-0.02em]"
          />
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
            >
              {Object.entries(categories).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Prompt Content
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Write your prompt here..."
              rows={10}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-2">
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-zinc-300 bg-white/[0.06] border border-white/[0.06]"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-0.5 text-zinc-600 hover:text-zinc-400"
                  >
                    x
                  </button>
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
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search prompts..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
            >
              <option value="all">All Categories</option>
              {Object.entries(categories).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setFilterFavorites(!filterFavorites)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                filterFavorites
                  ? "text-amber-400 bg-amber-500/10"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Star className={`h-4 w-4 ${filterFavorites ? "fill-amber-400" : ""}`} />
              Favorites
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 text-zinc-600 animate-spin" />
            </div>
          ) : prompts.length === 0 ? (
            <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-16 text-center">
              <Sparkles className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-[14px] text-zinc-500">No prompts yet.</p>
              <p className="text-[12px] text-zinc-600 mt-1">
                Click &quot;New Prompt&quot; to create your first prompt.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {prompts.map((prompt) => {
                const cat = categories[prompt.category] || categories.other;
                const isExpanded = expandedId === prompt._id;
                return (
                  <div
                    key={prompt._id}
                    className="bg-[#111113] border border-white/[0.06] rounded-xl overflow-hidden"
                  >
                    <div className="flex items-center gap-3 p-4">
                      <button
                        onClick={() => toggleFavorite(prompt)}
                        className="shrink-0 p-1 rounded-md hover:bg-white/[0.06] transition-colors"
                      >
                        <Star
                          className={`h-4 w-4 transition-colors ${
                            prompt.favorite
                              ? "text-amber-400 fill-amber-400"
                              : "text-zinc-600 hover:text-zinc-400"
                          }`}
                        />
                      </button>

                      <div
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => setExpandedId(isExpanded ? null : prompt._id)}
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-semibold text-white truncate">
                            {prompt.title}
                          </p>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium ${cat.color}`}
                          >
                            {cat.label}
                          </span>
                          {prompt.useCount > 0 && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                              <Zap className="h-3 w-3" />
                              {prompt.useCount}
                            </span>
                          )}
                        </div>
                        {prompt.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {prompt.tags.slice(0, 5).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] text-zinc-600 bg-white/[0.03] px-1.5 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {prompt.tags.length > 5 && (
                              <span className="text-[10px] text-zinc-600">
                                +{prompt.tags.length - 5}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => copyToClipboard(prompt.content, prompt._id)}
                          className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedId === prompt._id ? (
                            <Check className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleUsePrompt(prompt._id)}
                          className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                        >
                          Use
                        </button>
                        <button
                          onClick={() => openForm(prompt)}
                          className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deletePrompt(prompt._id)}
                          className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-white/[0.04]">
                        <pre className="mt-3 p-4 bg-white/[0.02] rounded-lg text-[13px] text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">
                          {prompt.content}
                        </pre>
                        {prompt.lastUsedAt && (
                          <p className="text-[11px] text-zinc-600 mt-2">
                            Last used: {new Date(prompt.lastUsedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
