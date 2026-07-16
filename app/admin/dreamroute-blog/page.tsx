"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Star,
  Trash2,
  ExternalLink,
  Loader2,
  FileText,
  Eye,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import MarkdownEditor from "@/components/admin/MarkdownEditor";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  aiSummary?: string;
  aiAnalysis?: {
    hook: string;
    whatHappened: string;
    whyItMatters: string;
    whatsNext: string;
  };
  content: string;
  source: string;
  sourceUrl: string;
  sourceName: string;
  author: string;
  category: string;
  tags: string[];
  score: number;
  comments: number;
  publishedAt: string;
  status: string;
  adminNotes?: string;
  imageUrl?: string;
  featured?: boolean;
}

const categories = [
  { value: "ai-tools", label: "AI Tools" },
  { value: "job-market", label: "Job Market" },
  { value: "learn", label: "Learn" },
  { value: "industry", label: "Industry" },
];

export default function DreamRouteBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<BlogPost>>({});

  const fetchPosts = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (search) params.set("search", search);
    const res = await fetch(`/api/blog?${params}`);
    const data = await res.json();
    setPosts(data.items || []);
    setLoading(false);
  }, [filterStatus, search]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const startCreate = () => {
    setCreating(true);
    setSelected(null);
    setEditForm({
      title: "",
      content: "",
      summary: "",
      category: "ai-tools",
      tags: [],
      source: "admin",
      sourceUrl: "",
      sourceName: "DreamRoute",
      author: "DreamRoute Team",
      status: "draft",
      publishedAt: new Date().toISOString(),
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const slug =
        editForm.slug ||
        (editForm.title || "untitled")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") +
          "-" +
          Date.now().toString(36);

      if (editForm._id) {
        const res = await fetch("/api/blog", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editForm, slug }),
        });
        const updated = await res.json();
        setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
        setSelected(updated);
        setEditForm(updated);
      } else {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editForm, slug }),
        });
        const created = await res.json();
        setPosts((prev) => [created, ...prev]);
        setSelected(created);
        setEditForm(created);
      }
      setCreating(false);
    } catch {
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const updated = await res.json();
    setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    if (selected?._id === id) {
      setSelected(updated);
      setEditForm(updated);
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    const res = await fetch("/api/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, featured }),
    });
    const updated = await res.json();
    setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    if (selected?._id === id) setSelected(updated);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p._id !== id));
    if (selected?._id === id) { setSelected(null); setCreating(false); setEditForm({}); }
  };

  const isEditing = creating || editForm._id !== undefined;

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">DreamRoute Blog</h2>
          <p className="text-[14px] text-zinc-500 mt-1">
            Publish blog posts with auto-generated SEO.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={startCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Post
          </button>
        )}
      </div>

      {isEditing ? (
        /* Editor */
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setCreating(false); setEditForm({}); setSelected(null); }}
              className="text-[13px] text-zinc-500 hover:text-white transition-colors"
            >
              ← Back to list
            </button>
            <div className="flex-1" />
            <button
              onClick={() => editForm._id && deletePost(editForm._id)}
              className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={save}
              disabled={saving || !editForm.title}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
              Save
            </button>
          </div>

          <input
            value={editForm.title || ""}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            placeholder="Post title..."
            className="w-full bg-transparent text-[24px] font-bold text-white placeholder-zinc-700 focus:outline-none tracking-[-0.02em]"
          />

          <input
            value={editForm.summary || ""}
            onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })}
            placeholder="Summary / meta description..."
            className="w-full bg-white/[0.03] border border-white/[0.04] rounded-lg px-4 py-2.5 text-[14px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.1]"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Category</label>
              <select
                value={editForm.category || "ai-tools"}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Status</label>
              <select
                value={editForm.status || "draft"}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
              >
                <option value="draft">Draft</option>
                <option value="reviewed">Reviewed</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Tags</label>
            <input
              value={(editForm.tags || []).join(", ")}
              onChange={(e) =>
                setEditForm({ ...editForm, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
              }
              placeholder="ai-tools, career, students..."
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none"
            />
          </div>

          <MarkdownEditor
            value={editForm.content || ""}
            onChange={(content) => setEditForm({ ...editForm, content })}
            placeholder="Write your blog post content here..."
            minHeight="500px"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Image URL</label>
              <input
                value={editForm.imageUrl || ""}
                onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">Source URL</label>
              <input
                value={editForm.sourceUrl || ""}
                onChange={(e) => setEditForm({ ...editForm, sourceUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      ) : (
        /* List */
        <>
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="reviewed">Reviewed</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 text-zinc-600 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-16 text-center">
              <FileText className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-[14px] text-zinc-500">No posts yet.</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {posts.map((post) => (
                <button
                  key={post._id}
                  onClick={() => { setSelected(post); setEditForm(post); }}
                  className={`w-full bg-[#111113] border rounded-xl px-5 py-4 flex items-center gap-4 transition-all group text-left ${
                    selected?._id === post._id
                      ? "border-white/[0.15] bg-white/[0.04]"
                      : "border-white/[0.04] hover:border-white/[0.1]"
                  }`}
                >
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt="" className="w-14 h-10 object-cover rounded-lg shrink-0 bg-zinc-800" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-white truncate group-hover:text-zinc-200">
                      {post.title}
                    </p>
                    <p className="text-[11px] text-zinc-600 mt-0.5 truncate">
                      {post.summary?.substring(0, 80) || "No summary"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFeatured(post._id, !(post as any).featured); }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        (post as any).featured
                          ? "text-amber-400 bg-amber-500/10"
                          : "text-zinc-600 hover:text-amber-400 hover:bg-amber-500/10"
                      }`}
                    >
                      <Star className="h-3.5 w-3.5" fill={(post as any).featured ? "currentColor" : "none"} />
                    </button>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                      post.status === "published"
                        ? "text-emerald-400 bg-emerald-500/10"
                        : post.status === "reviewed"
                        ? "text-amber-400 bg-amber-500/10"
                        : "text-zinc-500 bg-zinc-800/50"
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
