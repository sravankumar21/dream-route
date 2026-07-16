import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const COURSERA_API = "https://api.coursera.org/api/courses.v1";
const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";

interface SyncResult {
  source: string;
  itemsFound: number;
  itemsStored: number;
  status: string;
  timestamp: string;
}

// ── Gemini ──

async function summarizeWithGemini(title: string, text: string): Promise<string | null> {
  if (!GEMINI_API_KEY) return null;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a skilled content writer for an AI & career news blog. Write a structured, engaging summary of this article that reads like a short story — not a dry report.

Structure your response in exactly these sections, separated by blank lines:

**Hook** — Start with a compelling 1-sentence hook that makes the reader want to know more. Use context, surprise, or a bold claim.

**What Happened** — Explain the news in 2-3 sentences. What was announced, released, or discovered? Who is involved?

**Why It Matters** — Explain the real-world impact in 2-2 sentences. How does this affect students, developers, or the AI industry? Give context the reader wouldn't get from the headline alone.

**What's Next** — End with 1-2 sentences about what this means going forward, what to watch for, or what students/developers should do.

Rules:
- Write in a conversational, confident tone — like explaining to a smart friend
- Use plain English, no jargon without explanation
- Be specific — mention real companies, tools, numbers when available
- No bullet points — this is prose
- Total length: 100-180 words
- If the article lacks details, use what's available and note what's uncertain

Title: ${title}
Content: ${text.slice(0, 1500)}`,
                },
              ],
            },
          ],
          generationConfig: { maxOutputTokens: 300, temperature: 0.4 },
        }),
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  } catch {
    return null;
  }
}

// ── Blog helpers ──

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

// ── Blog fetchers ──

type Post = {
  title: string;
  summary: string;
  url: string;
  author: string;
  score: number;
  comments: number;
  publishedAt: Date;
  sourceName: string;
};

async function fetchReddit(): Promise<Post[]> {
  const subreddits = ["artificial", "MachineLearning", "singularity", "LocalLLaMA", "ChatGPT"];
  const posts: Post[] = [];

  for (const sub of subreddits) {
    try {
      const res = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=25&t=day`, {
        headers: { "User-Agent": "DreamRoute-Bot/1.0" },
      });
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
          summary: d.selftext ? d.selftext.slice(0, 300).replace(/\n+/g, " ").trim() : d.title,
          url: `https://reddit.com${d.permalink}`,
          author: d.author || "unknown",
          score: d.score || 0,
          comments: d.num_comments || 0,
          publishedAt: new Date((d.created_utc || 0) * 1000),
          sourceName: `r/${sub}`,
        });
      }
    } catch {
      // skip
    }
  }

  return posts;
}

async function fetchRSS(): Promise<Post[]> {
  const feeds = [
    { url: "https://techcrunch.com/category/artificial-intelligence/feed/", name: "TechCrunch" },
    { url: "https://www.technologyreview.com/feed/", name: "MIT Tech Review" },
    { url: "https://openai.com/blog/rss.xml", name: "OpenAI Blog" },
  ];

  const posts: Post[] = [];

  for (const feed of feeds) {
    try {
      const res = await fetch(feed.url, { headers: { "User-Agent": "DreamRoute-Bot/1.0" } });
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
      // skip
    }
  }

  return posts;
}

async function fetchHN(): Promise<Post[]> {
  try {
    const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
    if (!res.ok) return [];

    const ids: number[] = await res.json();
    const posts: Post[] = [];

    for (const id of ids.slice(0, 30)) {
      try {
        const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        if (!storyRes.ok) continue;

        const story = await storyRes.json();
        if (!story || !story.title) continue;

        const text = `${story.title} ${story.text || ""}`;
        if (!isAIRelated(text)) continue;

        posts.push({
          title: story.title,
          summary: story.text ? story.text.replace(/<[^>]*>/g, "").slice(0, 300).trim() : story.title,
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

// ── Coursera sync ──

async function syncCoursera(): Promise<SyncResult[]> {
  const results: SyncResult[] = [];
  const searchTerms = [
    "programming", "data science", "machine learning", "web development",
    "python", "javascript", "statistics", "cybersecurity", "cloud computing",
    "design thinking", "digital marketing",
  ];

  for (const term of searchTerms) {
    try {
      const response = await fetch(
        `${COURSERA_API}?q=search&query=${encodeURIComponent(term)}&limit=10&fields=name,slug,description,url`
      );

      if (!response.ok) {
        results.push({ source: `coursera-${term}`, itemsFound: 0, itemsStored: 0, status: "api_error", timestamp: new Date().toISOString() });
        continue;
      }

      const data = await response.json();
      const courses = data.elements || [];
      const freeCourses = courses.filter(
        (course: { description?: string; name?: string }) =>
          course.description?.toLowerCase().includes("free") ||
          course.name?.toLowerCase().includes("free")
      );

      results.push({ source: `coursera-${term}`, itemsFound: courses.length, itemsStored: freeCourses.length, status: "success", timestamp: new Date().toISOString() });
      await new Promise((r) => setTimeout(r, 200));
    } catch {
      results.push({ source: `coursera-${term}`, itemsFound: 0, itemsStored: 0, status: "fetch_error", timestamp: new Date().toISOString() });
    }
  }

  return results;
}

// ── YouTube sync ──

async function syncYouTube(): Promise<SyncResult[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [{ source: "youtube", itemsFound: 0, itemsStored: 0, status: "no_api_key", timestamp: new Date().toISOString() }];

  const results: SyncResult[] = [];
  const searchTerms = [
    "python tutorial for beginners", "javascript tutorial", "react tutorial",
    "data structures and algorithms", "machine learning tutorial", "web development tutorial",
    "docker tutorial", "aws tutorial", "figma tutorial", "photoshop tutorial", "video editing tutorial",
  ];

  for (const term of searchTerms) {
    try {
      const response = await fetch(
        `${YOUTUBE_API}/search?part=snippet&q=${encodeURIComponent(term)}&type=video&videoDuration=medium&maxResults=5&key=${apiKey}`
      );

      if (!response.ok) {
        results.push({ source: `youtube-${term}`, itemsFound: 0, itemsStored: 0, status: "api_error", timestamp: new Date().toISOString() });
        continue;
      }

      const data = await response.json();
      const videos = data.items || [];
      results.push({ source: `youtube-${term}`, itemsFound: videos.length, itemsStored: videos.length, status: "success", timestamp: new Date().toISOString() });
      await new Promise((r) => setTimeout(r, 1000));
    } catch {
      results.push({ source: `youtube-${term}`, itemsFound: 0, itemsStored: 0, status: "fetch_error", timestamp: new Date().toISOString() });
    }
  }

  return results;
}

// ── Main handler ──

function parseAiAnalysis(raw: string | undefined): { hook: string; whatHappened: string; whyItMatters: string; whatsNext: string } | undefined {
  if (!raw) return undefined;

  const sections = { hook: "", whatHappened: "", whyItMatters: "", whatsNext: "" };
  const lines = raw.split("\n");
  let currentKey: keyof typeof sections | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^\*\*hook\*\*/i.test(trimmed) || /^hook[:\s]/i.test(trimmed)) {
      currentKey = "hook";
      const after = trimmed.replace(/^\*\*.*?\*\*[:\s-]*/i, "").replace(/^.*?[:\s-]+/i, "");
      if (after) sections.hook = after;
    } else if (/^\*\*what happened\*\*/i.test(trimmed) || /^what happened[:\s]/i.test(trimmed)) {
      currentKey = "whatHappened";
      const after = trimmed.replace(/^\*\*.*?\*\*[:\s-]*/i, "").replace(/^.*?[:\s-]+/i, "");
      if (after) sections.whatHappened = after;
    } else if (/^\*\*why it matters\*\*/i.test(trimmed) || /^why it matters[:\s]/i.test(trimmed)) {
      currentKey = "whyItMatters";
      const after = trimmed.replace(/^\*\*.*?\*\*[:\s-]*/i, "").replace(/^.*?[:\s-]+/i, "");
      if (after) sections.whyItMatters = after;
    } else if (/^\*\*what'?s? next\*\*/i.test(trimmed) || /^what'?s? next[:\s]/i.test(trimmed)) {
      currentKey = "whatsNext";
      const after = trimmed.replace(/^\*\*.*?\*\*[:\s-]*/i, "").replace(/^.*?[:\s-]+/i, "");
      if (after) sections.whatsNext = after;
    } else if (currentKey && trimmed) {
      sections[currentKey] += (sections[currentKey] ? " " : "") + trimmed;
    }
  }

  // Fallback: if parsing failed, put everything in hook
  if (!sections.hook && !sections.whatHappened && !sections.whyItMatters && !sections.whatsNext) {
    sections.hook = raw.slice(0, 200);
  }

  return sections;
}

function extractTags(text: string): string[] {
  const tagPatterns = [
    /openai|chatgpt|gpt/i, /google|gemini|deepmind/i, /anthropic|claude/i,
    /meta|llama/i, /microsoft|copilot/i, /nvidia|cuda/i,
    /startup|funding|acquisition/i, /regulation|policy|law/i,
    /open.?source|github/i, /robotics|autonomous/i,
    /healthcare|medical/i, /education|learning/i,
    /coding|programming|developer/i, /design|ui|ux/i,
  ];
  const tags: string[] = [];
  for (const pat of tagPatterns) {
    if (pat.test(text)) {
      tags.push(pat.source.replace(/[\/\\^$.*+?()[\]{}|]/g, "").replace(/\?/g, "").split("|")[0].toLowerCase());
    }
  }
  return [...new Set(tags)].slice(0, 5);
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const timestamp = new Date().toISOString();
  const results: Record<string, unknown> = {};

  // 1. Coursera sync
  try {
    results.courses = await syncCoursera();
  } catch (e) {
    results.courses = { error: "Coursera sync failed" };
  }

  // 2. YouTube sync
  try {
    results.videos = await syncYouTube();
  } catch (e) {
    results.videos = { error: "YouTube sync failed" };
  }

  // 3. Blog sync
  try {
    await connectDB();

    const url = new URL(req.url);
    if (url.searchParams.get("clear") === "true") {
      await BlogPost.deleteMany({});
    } else {
      await BlogPost.deleteMany({ aiSummary: { $exists: false } });
      await BlogPost.deleteMany({ aiSummary: null });
    }

    const [redditPosts, rssPosts, hnPosts] = await Promise.all([
      fetchReddit(),
      fetchRSS(),
      fetchHN(),
    ]);

    const allPosts = [...redditPosts, ...rssPosts, ...hnPosts];

    const postsWithSummary: (Post & { aiSummary?: string; aiAnalysis?: ReturnType<typeof parseAiAnalysis> })[] = [];
    for (let i = 0; i < allPosts.length; i += 5) {
      const batch = allPosts.slice(i, i + 5);
      const summaries = await Promise.all(
        batch.map((p) => summarizeWithGemini(p.title, p.summary || p.title))
      );
      batch.forEach((p, j) => {
        const raw = summaries[j];
        postsWithSummary.push({
          ...p,
          aiSummary: raw || undefined,
          aiAnalysis: parseAiAnalysis(raw || undefined),
        });
      });
    }

    let stored = 0;
    let skipped = 0;

    for (const post of postsWithSummary) {
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
          aiSummary: post.aiSummary,
          aiAnalysis: post.aiAnalysis,
          source: rssPosts.includes(post) ? "rss" : hnPosts.includes(post) ? "hn" : "reddit",
          sourceUrl: post.url,
          sourceName: post.sourceName,
          author: post.author,
          category: categorize(post.title),
          tags: extractTags(`${post.title} ${post.summary}`),
          score: post.score,
          comments: post.comments,
          publishedAt: post.publishedAt,
          fetchedAt: new Date(),
          status: "new",
        });
        stored++;
      } catch {
        skipped++;
      }
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    await BlogPost.deleteMany({ publishedAt: { $lt: sevenDaysAgo } });

    const totalCount = await BlogPost.countDocuments();
    if (totalCount > 60) {
      const oldest = await BlogPost.find().sort({ publishedAt: 1 }).limit(totalCount - 60).select("_id");
      await BlogPost.deleteMany({ _id: { $in: oldest.map((p) => p._id) } });
    }

    results.blog = { reddit: redditPosts.length, rss: rssPosts.length, hn: hnPosts.length, stored, skipped, total: allPosts.length };
  } catch (e) {
    results.blog = { error: "Blog sync failed" };
  }

  return NextResponse.json({ success: true, timestamp, results });
}
