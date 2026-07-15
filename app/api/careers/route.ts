import { NextResponse } from "next/server";
import { careers, careerCategories } from "@/data/careers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q");

  let filtered = careers;

  if (category) {
    filtered = filtered.filter((c) => c.category === category);
  }

  if (query) {
    const lower = query.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(lower) ||
        c.shortDescription.toLowerCase().includes(lower) ||
        c.category.toLowerCase().includes(lower)
    );
  }

  return NextResponse.json({
    careers: filtered,
    categories: careerCategories,
    total: filtered.length,
  });
}
