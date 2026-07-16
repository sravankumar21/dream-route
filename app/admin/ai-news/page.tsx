"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  ExternalLink,
  Trash2,
  Check,
  Archive,
  Eye,
  Sparkles,
  Loader2,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

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
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "text-blue-400", bg: "bg-blue-500/10" },
  reviewed: { label: "Reviewed", color: "text-amber-400", bg: "bg-amber-500/10" },
  published: { label: "Published", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  archived: { label: "Archived", color: "text-zinc-500", bg: "bg-zinc-800/50" },
};

const sources = [
  { value: "all", label: "All Sources" },
  { value: "reddit", label: "Reddit" },
  { value: "rss", label: "RSS" },
  { value: "hn", label: "Hacker News" },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "ai-tools", label: "AI Tools" },
  { value: "job-market", label: "Job Market" },
  { value: "learn", label: "Learn" },
  { value: "industry", label: "Industry" },
];

export default function AiNewsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [editingNotes, setEditingNotes] = useState("");
  const [syncing, setSyncing] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterStatus !== "all") params.set("status", filterStatus);
    if (filterSource !== "all") params.set("source", filterSource);
    if (filterCategory !== "all") params.set("category", filterCategory);
    if (search) params.set("search", search);
    params.set("page", String(page));

    const res = await fetch(`/api/blog?${params}`);
    const data = await res.json();
    setPosts(data.items || []);
    setTotalPages(data.pages || 1);
    setTotal(data.total || 0);
    setLoading(false);
  }, [filterStatus, filterSource, filterCategory, search, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const updatePost = async (id: string, update: Partial<BlogPost>) => {
    const res = await fetch("/api/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...update }),
    });
    const updated = await res.json();
    setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    if (selected?._id === id) {
      setSelected({ ...selected, ...update });
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  const triggerSync = async () => {
    setSyncing(true);
    try {
      await fetch("/api/cron/sync", {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || ""}` },
      });
      await fetchPosts();
    } catch {
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">AI News Workspace</h2>
          <p className="text-[14px] text-zinc-500 mt-1">
            {total} synced articles. Review, edit summaries, and approve.
          </p>
        </div>
        <button
          onClick={triggerSync}
          disabled={syncing}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
          Sync Now
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search articles..."
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
          className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
        >
          <option value="all">All Status</option>
          {Object.entries(statusConfig).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <select
          value={filterSource}
          onChange={(e) => { setFilterSource(e.target.value); setPage(1); }}
          className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
        >
          {sources.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <select
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }}
          className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-5">
        {/* Post list */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 text-zinc-600 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-16 text-center">
              <Newspaper className="h-10 w-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-[14px] text-zinc-500">No articles found.</p>
              <p className="text-[12px] text-zinc-600 mt-1">Run a sync or adjust filters.</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {posts.map((post) => {
                const sc = statusConfig[post.status] || statusConfig.new;
                return (
                  <button
                    key={post._id}
                    onClick={() => { setSelected(post); setEditingNotes(post.adminNotes || ""); }}
                    className={`w-full bg-[#111113] border rounded-xl px-5 py-4 flex items-start gap-4 transition-all group text-left ${
                      selected?._id === post._id
                        ? "border-white/[0.15] bg-white/[0.04]"
                        : "border-white/[0.04] hover:border-white/[0.1]"
                    }`}
                  >
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt=""
                        className="w-16 h-12 object-cover rounded-lg shrink-0 bg-zinc-800"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[13px] font-semibold text-white truncate group-hover:text-zinc-200">
                          {post.title}
                        </p>
                      </div>
                      <p className="text-[11px] text-zinc-600 mb-1.5 line-clamp-1">
                        {post.aiSummary || post.summary}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${sc.bg} ${sc.color}`}>
                          {sc.label}
                        </span>
                        <span className="text-[10px] text-zinc-600 uppercase font-medium">
                          {post.source}
                        </span>
                        <span className="text-[10px] text-zinc-700">·</span>
                        <span className="text-[10px] text-zinc-600">{post.sourceName}</span>
                        {post.tags?.length > 0 && (
                          <>
                            <span className="text-[10px] text-zinc-700">·</span>
                            {post.tags.slice(0, 3).map((t) => (
                              <span key={t} className="text-[9px] text-zinc-600 bg-white/[0.04] px-1.5 py-0.5 rounded">
                                {t}
                              </span>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-[12px] text-zinc-500">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.06] disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected ? (
          <div className="w-[420px] shrink-0 bg-[#111113] border border-white/[0.06] rounded-xl p-5 sticky top-20 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[15px] font-bold text-white leading-tight pr-3">{selected.title}</h3>
              <a
                href={selected.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white shrink-0"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* AI Analysis */}
            {selected.aiAnalysis && (
              <div className="space-y-3 mb-5">
                <h4 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-violet-400" />
                  AI Analysis
                </h4>
                {[
                  { label: "Hook", value: selected.aiAnalysis.hook },
                  { label: "What Happened", value: selected.aiAnalysis.whatHappened },
                  { label: "Why It Matters", value: selected.aiAnalysis.whyItMatters },
                  { label: "What's Next", value: selected.aiAnalysis.whatsNext },
                ].map(
                  (section) =>
                    section.value && (
                      <div key={section.label}>
                        <p className="text-[10px] font-semibold text-zinc-600 uppercase mb-0.5">
                          {section.label}
                        </p>
                        <p className="text-[12px] text-zinc-400 leading-relaxed">
                          {section.value}
                        </p>
                      </div>
                    )
                )}
              </div>
            )}

            {/* Summary */}
            {!selected.aiAnalysis && selected.summary && (
              <div className="mb-5">
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">Summary</p>
                <p className="text-[12px] text-zinc-400 leading-relaxed">{selected.summary}</p>
              </div>
            )}

            {/* Tags */}
            {selected.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {selected.tags.map((t) => (
                  <span key={t} className="text-[10px] font-medium text-zinc-400 bg-white/[0.06] px-2 py-1 rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Admin Notes */}
            <div className="mb-5">
              <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                Admin Notes
              </label>
              <textarea
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                onBlur={() => updatePost(selected._id, { adminNotes: editingNotes })}
                placeholder="Add notes..."
                rows={3}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-[12px] text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] resize-none"
              />
            </div>

            {/* Status actions */}
            <div className="flex items-center gap-1.5 pt-3 border-t border-white/[0.04]">
              <button
                onClick={() => updatePost(selected._id, { status: "reviewed" })}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                  selected.status === "reviewed"
                    ? "bg-amber-500/10 text-amber-400"
                    : "text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10"
                }`}
              >
                <Eye className="h-3 w-3" />
                Review
              </button>
              <button
                onClick={() => updatePost(selected._id, { status: "published" })}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                  selected.status === "published"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                }`}
              >
                <Check className="h-3 w-3" />
                Publish
              </button>
              <button
                onClick={() => updatePost(selected._id, { status: "archived" })}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                  selected.status === "archived"
                    ? "bg-zinc-700/30 text-zinc-400"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                }`}
              >
                <Archive className="h-3 w-3" />
                Archive
              </button>
              <div className="flex-1" />
              <button
                onClick={() => deletePost(selected._id)}
                className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-[420px] shrink-0 bg-[#111113] border border-white/[0.06] rounded-xl p-12 text-center sticky top-20">
            <Newspaper className="h-8 w-8 text-zinc-700 mx-auto mb-3" />
            <p className="text-[13px] text-zinc-500">Select an article to review</p>
          </div>
        )}
      </div>
    </div>
  );
}
