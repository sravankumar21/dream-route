import { NextResponse } from "next/server";
import { careers } from "@/data/careers";
import { exams } from "@/data/exams";
import { scholarships } from "@/data/scholarships";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";

interface SearchResult {
  title: string;
  description: string;
  tag: string;
  url: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim().toLowerCase() || "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results: SearchResult[] = [];

  // Search careers
  for (const c of careers) {
    const text = `${c.title} ${c.shortDescription} ${c.category}`.toLowerCase();
    if (text.includes(q)) {
      results.push({
        title: c.title,
        description: c.shortDescription,
        tag: "Careers",
        url: `/careers/${c.slug}`,
      });
    }
    // Also search skills within careers
    for (const skill of c.skills) {
      const skillText = `${skill.name} ${c.title}`.toLowerCase();
      if (skillText.includes(q)) {
        results.push({
          title: skill.name,
          description: `Skill for ${c.title}`,
          tag: "Skills",
          url: `/careers/${c.slug}/${skill.id}`,
        });
      }
    }
  }

  // Search exams
  for (const e of exams) {
    const text = `${e.name} ${e.fullName} ${e.conductedBy}`.toLowerCase();
    if (text.includes(q)) {
      results.push({
        title: e.name,
        description: e.fullName,
        tag: "Exams",
        url: `/exams/${e.id}`,
      });
    }
  }

  // Search scholarships
  for (const s of scholarships) {
    const text = `${s.name} ${s.provider} ${s.description} ${s.category}`.toLowerCase();
    if (text.includes(q)) {
      results.push({
        title: s.name,
        description: `${s.provider} — ${s.amount}`,
        tag: "Scholarships",
        url: "/scholarships",
      });
    }
  }

  // Search blog posts (from MongoDB)
  try {
    await connectDB();
    const blogPosts = await BlogPost.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { summary: { $regex: q, $options: "i" } },
        { aiSummary: { $regex: q, $options: "i" } },
      ],
    })
      .limit(5)
      .select("title summary sourceName")
      .lean();

    for (const post of blogPosts) {
      results.push({
        title: post.title,
        description: `${post.sourceName} — ${(post.summary || "").slice(0, 80)}`,
        tag: "Blog",
        url: `/blog`,
      });
    }
  } catch {
    // blog search fails silently
  }

  // Deduplicate by title+tag
  const seen = new Set<string>();
  const unique = results.filter((r) => {
    const key = `${r.title}-${r.tag}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return NextResponse.json({ results: unique.slice(0, 15) });
}
