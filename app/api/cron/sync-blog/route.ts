import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";

const AI_KEYWORDS = [
  "ai", "artificial intelligence", "machine learning", "deep learning",
  "chatgpt", "gpt", "llm", "large language model", "openai", "anthropic",
  "claude", "gemini", "midjourney", "stable diffusion", "neural network",
  "transformer", "generative ai", "gen ai", "copilot", "agent",
  "automation", "robotics", "computer vision", "nlp", "diffusion model",
];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function isAIRelated(text: string): boolean {
  const lower = text.toLowerCase();
  return AI_KEYWORDS.some((kw) => lower.includes(kw));
}

function categorize(text: string): "ai-tools" | "job-market" | "learn" | "industry" {
  const lower = text.toLowerCase();
  if (/tool|app|plugin|extension|api|platform|release|launch|version/.test(lower)) return "ai-tools";
  if (/job|hiring|layoff|salary|career|recruit|employee|work/.test(lower)) return "job-market";
  if (/tutorial|course|learn|guide|paper|research|study|explain/.test(lower)) return "learn";
  return "industry";
}

async function fetchReddit(): Promise<{
  title: string;
  summary: string;
  url: string;
  author: string;
  score: number;
  comments: number;
  publishedAt: Date;
  sourceName: string;
}[]> {
  const subreddits = ["artificial", "MachineLearning", "singularity", "LocalLLaMA", "ChatGPT"];
  const posts: Awaited<ReturnType<typeof fetchReddit>> = [];

  for (const sub of subreddits) {
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${sub}/hot.json?limit=25&t=day`,
        {
          headers: { "User-Agent": "DreamRoute-Bot/1.0" },
        }
      );
      if (!res.ok) continue;

      const data = await res.json();
      const children = data?.data?.children || [];

      for (const child of children) {
        const d = child.data;
        if (!d || d.stickied) continue;

        const text = `${d.title} ${d.selftext || ""}`;
        if (!isAIRelated(text)) continue;

        posts.push({
          title: d.title,
          summary: d.selftext
            ? d.selftext.slice(0, 300).replace(/\n+/g, " ").trim()
            : d.title,
          url: `https://reddit.com${d.permalink}`,
          author: d.author || "unknown",
          score: d.score || 0,
          comments: d.num_comments || 0,
          publishedAt: new Date((d.created_utc || 0) * 1000),
          sourceName: `r/${sub}`,
        });
      }
    } catch {
      // skip failed subreddits
    }
  }

  return posts;
}

async function fetchRSS(): Promise<{
  title: string;
  summary: string;
  url: string;
  author: string;
  score: number;
  comments: number;
  publishedAt: Date;
  sourceName: string;
}[]> {
  const feeds = [
    { url: "https://techcrunch.com/category/artificial-intelligence/feed/", name: "TechCrunch" },
    { url: "https://www.technologyreview.com/feed/", name: "MIT Tech Review" },
    { url: "https://openai.com/blog/rss.xml", name: "OpenAI Blog" },
  ];

  const posts: Awaited<ReturnType<typeof fetchRSS>> = [];

  for (const feed of feeds) {
    try {
      const res = await fetch(feed.url, {
        headers: { "User-Agent": "DreamRoute-Bot/1.0" },
      });
      if (!res.ok) continue;

      const xml = await res.text();

      const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/gi) || [];
      for (const item of itemMatches.slice(0, 15)) {
        const title = (item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) ||
          item.match(/<title>([\s\S]*?)<\/title>/i))?.[1]?.trim() || "";
        const link = (item.match(/<link>([\s\S]*?)<\/link>/i))?.[1]?.trim() || "";
        const desc = (item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) ||
          item.match(/<description>([\s\S]*?)<\/description>/i))?.[1]?.trim() || "";
        const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i))?.[1]?.trim() || "";

        if (!title || !link) continue;
        if (!isAIRelated(`${title} ${desc}`)) continue;

        const cleanDesc = desc.replace(/<[^>]*>/g, "").slice(0, 300).trim();

        posts.push({
          title,
          summary: cleanDesc || title,
          url: link,
          author: feed.name,
          score: 0,
          comments: 0,
          publishedAt: pubDate ? new Date(pubDate) : new Date(),
          sourceName: feed.name,
        });
      }
    } catch {
      // skip failed feeds
    }
  }

  return posts;
}

async function fetchHN(): Promise<{
  title: string;
  summary: string;
  url: string;
  author: string;
  score: number;
  comments: number;
  publishedAt: Date;
  sourceName: string;
}[]> {
  try {
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    if (!res.ok) return [];

    const ids: number[] = await res.json();
    const posts: Awaited<ReturnType<typeof fetchHN>> = [];

    for (const id of ids.slice(0, 30)) {
      try {
        const storyRes = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        if (!storyRes.ok) continue;

        const story = await storyRes.json();
        if (!story || !story.title) continue;

        const text = `${story.title} ${story.text || ""}`;
        if (!isAIRelated(text)) continue;

        posts.push({
          title: story.title,
          summary: story.text
            ? story.text.replace(/<[^>]*>/g, "").slice(0, 300).trim()
            : story.title,
          url: story.url || `https://news.ycombinator.com/item?id=${id}`,
          author: story.by || "unknown",
          score: story.score || 0,
          comments: story.descendants || 0,
          publishedAt: new Date((story.time || 0) * 1000),
          sourceName: "Hacker News",
        });
      } catch {
        // skip
      }
    }

    return posts;
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const [redditPosts, rssPosts, hnPosts] = await Promise.all([
      fetchReddit(),
      fetchRSS(),
      fetchHN(),
    ]);

    const allPosts = [...redditPosts, ...rssPosts, ...hnPosts];

    let stored = 0;
    let skipped = 0;

    for (const post of allPosts) {
      const slug = slugify(post.title);
      const exists = await BlogPost.findOne({ slug });
      if (exists) {
        skipped++;
        continue;
      }

      try {
        await BlogPost.create({
          title: post.title,
          slug,
          summary: post.summary,
          source: rssPosts.includes(post) ? "rss" : hnPosts.includes(post) ? "hn" : "reddit",
          sourceUrl: post.url,
          sourceName: post.sourceName,
          author: post.author,
          category: categorize(post.title),
          score: post.score,
          comments: post.comments,
          publishedAt: post.publishedAt,
          fetchedAt: new Date(),
        });
        stored++;
      } catch {
        skipped++;
      }
    }

    // Keep only last 200 posts
    const totalCount = await BlogPost.countDocuments();
    if (totalCount > 200) {
      const oldest = await BlogPost.find()
        .sort({ publishedAt: 1 })
        .limit(totalCount - 200)
        .select("_id");
      await BlogPost.deleteMany({ _id: { $in: oldest.map((p) => p._id) } });
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      reddit: redditPosts.length,
      rss: rssPosts.length,
      hn: hnPosts.length,
      stored,
      skipped,
      total: allPosts.length,
    });
  } catch (error) {
    console.error("Blog sync failed:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
