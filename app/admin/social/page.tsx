"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Loader2,
  Share2,
  Trash2,
  ArrowLeft,
  Save,
  Calendar,
  ThumbsUp,
  MessageCircle,
  Repeat2,
  ExternalLink,
} from "lucide-react";

interface SocialPost {
  _id: string;
  platform: string;
  content: string;
  scheduledDate: string | null;
  status: string;
  mediaUrl: string;
  engagement: { likes: number; comments: number; shares: number };
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const platforms = [
  { key: "twitter", label: "Twitter", color: "text-zinc-300 bg-white/[0.06] border-white/[0.1]" },
  { key: "linkedin", label: "LinkedIn", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { key: "facebook", label: "Facebook", color: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
  { key: "youtube-community", label: "YouTube", color: "text-red-400 bg-red-500/10 border-red-500/20" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  draft: { label: "Draft", color: "text-zinc-400 bg-zinc-800/50" },
  scheduled: { label: "Scheduled", color: "text-amber-400 bg-amber-500/10" },
  published: { label: "Published", color: "text-emerald-400 bg-emerald-500/10" },
  failed: { label: "Failed", color: "text-red-400 bg-red-500/10" },
};

export default function SocialPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("twitter");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    platform: "twitter",
    content: "",
    scheduledDate: "",
    mediaUrl: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("platform", activeTab);
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (search) params.set("search", search);
    const res = await fetch(`/api/social?${params}`);
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }, [activeTab, filterStatus, search]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const openForm = (post?: SocialPost) => {
    if (post) {
      setEditingId(post._id);
      setForm({
        platform: post.platform,
        content: post.content,
        scheduledDate: post.scheduledDate
          ? new Date(post.scheduledDate).toISOString().slice(0, 16)
          : "",
        mediaUrl: post.mediaUrl,
        notes: post.notes,
      });
    } else {
      setEditingId(null);
      setForm({
        platform: activeTab,
        content: "",
        scheduledDate: "",
        mediaUrl: "",
        notes: "",
      });
    }
    setShowForm(true);
  };

  const savePost = async () => {
    if (!form.content.trim()) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        scheduledDate: form.scheduledDate ? new Date(form.scheduledDate) : null,
      };
      if (editingId) {
        const res = await fetch("/api/social", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        const updated = await res.json();
        setPosts((prev) => prev.map((p) => (p._id === editingId ? updated : p)));
      } else {
        const res = await fetch("/api/social", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setPosts((prev) => [created, ...prev]);
      }
      setShowForm(false);
    } catch {
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/social?id=${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  const cycleStatus = async (post: SocialPost) => {
    const order = ["draft", "scheduled", "published", "failed"];
    const idx = order.indexOf(post.status);
    const next = order[(idx + 1) % order.length];
    const res = await fetch("/api/social", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post._id, status: next }),
    });
    const updated = await res.json();
    setPosts((prev) => prev.map((p) => (p._id === post._id ? updated : p)));
  };

  const totalEngagement = (post: SocialPost) =>
    post.engagement.likes + post.engagement.comments + post.engagement.shares;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">
            {showForm ? (editingId ? "Edit Post" : "New Post") : "Social Media Manager"}
          </h2>
          <p className="text-[14px] text-zinc-500 mt-1">Manage all social channels from one view.</p>
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
                onClick={savePost}
                disabled={saving || !form.content.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
              >
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                {editingId ? "Update" : "Save"}
              </button>
            </>
          ) : (
            <button
              onClick={() => openForm()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Post
            </button>
          )}
        </div>
      </div>

      {showForm ? (
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Platform
            </label>
            <select
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
            >
              {platforms.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Content
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Write your post..."
              rows={8}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
            />
            <p className="text-[11px] text-zinc-600 mt-1 text-right">
              {form.content.length} characters
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                Schedule Date
              </label>
              <input
                type="datetime-local"
                value={form.scheduledDate}
                onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-white/[0.12]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
                Media URL
              </label>
              <input
                value={form.mediaUrl}
                onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Internal notes..."
              rows={3}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[13px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1 mb-5 border-b border-white/[0.06]">
            {platforms.map((p) => (
              <button
                key={p.key}
                onClick={() => setActiveTab(p.key)}
                className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors ${
                  activeTab === p.key
                    ? "border-white text-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
            >
              <option value="all">All Status</option>
              {Object.entries(statusConfig).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 text-zinc-600 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-16 text-center">
              <Share2 className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-[14px] text-zinc-500">No posts yet.</p>
              <p className="text-[12px] text-zinc-600 mt-1">
                Click &quot;New Post&quot; to create your first post.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {posts.map((post) => {
                const sc = statusConfig[post.status] || statusConfig.draft;
                const platformInfo = platforms.find((p) => p.key === post.platform);
                return (
                  <div
                    key={post._id}
                    className="bg-[#111113] border border-white/[0.06] rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border ${platformInfo?.color || platforms[0].color}`}
                          >
                            {platformInfo?.label || post.platform}
                          </span>
                          <button
                            onClick={() => cycleStatus(post)}
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium cursor-pointer hover:opacity-80 transition-opacity ${sc.color}`}
                          >
                            {sc.label}
                          </button>
                          {post.scheduledDate && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.scheduledDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        <p className="text-[13px] text-zinc-300 leading-relaxed whitespace-pre-wrap">
                          {post.content}
                        </p>

                        {post.status === "published" && totalEngagement(post) > 0 && (
                          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.04]">
                            <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                              <ThumbsUp className="h-3 w-3" />
                              {post.engagement.likes.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                              <MessageCircle className="h-3 w-3" />
                              {post.engagement.comments.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                              <Repeat2 className="h-3 w-3" />
                              {post.engagement.shares.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {post.notes && (
                          <p className="text-[11px] text-zinc-600 mt-2 italic">
                            {post.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openForm(post)}
                          className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deletePost(post._id)}
                          className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
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
