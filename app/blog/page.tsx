import Link from "next/link";
import { ExternalLink, ArrowUpRight, MessageSquare, TrendingUp } from "lucide-react";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";

export const metadata = {
  title: "AI & Career News | DreamRoute",
  description: "Latest AI news that affects your career. Curated from Reddit, Hacker News, and top tech blogs.",
};

const categories = [
  { id: "all", label: "All" },
  { id: "ai-tools", label: "AI Tools" },
  { id: "job-market", label: "Job Market" },
  { id: "learn", label: "Learn" },
  { id: "industry", label: "Industry" },
];

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function sourceColor(source: string): string {
  switch (source) {
    case "reddit": return "bg-orange-50 text-orange-700 border-orange-200";
    case "hn": return "bg-amber-50 text-amber-700 border-amber-200";
    case "rss": return "bg-blue-50 text-blue-700 border-blue-200";
    default: return "bg-zinc-50 text-zinc-700 border-zinc-200";
  }
}

function categoryColor(cat: string): string {
  switch (cat) {
    case "ai-tools": return "bg-violet-50 text-violet-700 border-violet-200";
    case "job-market": return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "learn": return "bg-sky-50 text-sky-700 border-sky-200";
    case "industry": return "bg-zinc-100 text-zinc-600 border-zinc-200";
    default: return "bg-zinc-100 text-zinc-600 border-zinc-200";
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  await connectDB();

  const filter: Record<string, unknown> = {};
  if (category && category !== "all") {
    filter.category = category;
  }

  const posts = await BlogPost.find(filter)
    .sort({ publishedAt: -1 })
    .limit(50)
    .lean();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        <div className="mb-10">
          <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.12em] mb-3">Live Feed</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em] mb-3">
            AI & career news
          </h1>
          <p className="text-[15px] text-zinc-500 max-w-lg">
            Curated from Reddit, Hacker News, and top tech blogs. Updated daily.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.id === "all" ? "/blog" : `/blog?category=${cat.id}`}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors border ${
                (category || "all") === cat.id
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[15px] text-zinc-400 mb-2">No posts yet.</p>
            <p className="text-[13px] text-zinc-400">Posts will appear after the first sync runs.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <a
                key={post._id?.toString()}
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 hover:border-zinc-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${sourceColor(post.source)}`}>
                        {post.sourceName}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${categoryColor(post.category)}`}>
                        {post.category.replace("-", " ")}
                      </span>
                      <span className="text-[12px] text-zinc-400">{timeAgo(new Date(post.publishedAt))}</span>
                    </div>

                    <h3 className="text-[16px] font-bold text-zinc-900 tracking-[-0.01em] group-hover:text-zinc-900 transition-colors mb-1.5">
                      {post.title}
                    </h3>

                    {post.summary && post.summary !== post.title && (
                      <p className="text-[13px] text-zinc-500 line-clamp-2 mb-3">
                        {post.summary}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-[12px] text-zinc-400">
                      {post.score > 0 && (
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {post.score}
                        </span>
                      )}
                      {post.comments > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {post.comments}
                        </span>
                      )}
                      <span className="text-zinc-400">by {post.author}</span>
                    </div>
                  </div>

                  <ArrowUpRight className="h-4 w-4 text-zinc-300 group-hover:text-zinc-500 shrink-0 mt-1 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
