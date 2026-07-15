import { NextResponse } from "next/server";

const COURSERA_API = "https://api.coursera.org/api/courses.v1";

interface SyncResult {
  source: string;
  itemsFound: number;
  itemsStored: number;
  status: string;
  timestamp: string;
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, status(401));
  }

  try {
    const results = await syncCourseraCourses();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (error) {
    console.error("Coursera sync failed:", error);
    return NextResponse.json(
      { error: "Sync failed" },
      { status: 500 }
    );
  }
}

async function syncCourseraCourses(): Promise<SyncResult[]> {
  const results: SyncResult[] = [];

  // Search for free courses in key skill areas
  const searchTerms = [
    "programming",
    "data science",
    "machine learning",
    "web development",
    "python",
    "javascript",
    "statistics",
    "cybersecurity",
    "cloud computing",
    "design thinking",
    "digital marketing",
  ];

  for (const term of searchTerms) {
    try {
      const response = await fetch(
        `${COURSERA_API}?q=search&query=${encodeURIComponent(term)}&limit=10&fields=name,slug,description,url`
      );

      if (!response.ok) {
        results.push({
          source: `coursera-${term}`,
          itemsFound: 0,
          itemsStored: 0,
          status: "api_error",
          timestamp: new Date().toISOString(),
        });
        continue;
      }

      const data = await response.json();
      const courses = data.elements || [];

      // Filter for free courses (Coursera API doesn't directly indicate free,
      // but we can check for "Free" in the description or course type)
      const freeCourses = courses.filter(
        (course: { description?: string; name?: string }) =>
          course.description?.toLowerCase().includes("free") ||
          course.name?.toLowerCase().includes("free")
      );

      results.push({
        source: `coursera-${term}`,
        itemsFound: courses.length,
        itemsStored: freeCourses.length,
        status: "success",
        timestamp: new Date().toISOString(),
      });

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      results.push({
        source: `coursera-${term}`,
        itemsFound: 0,
        itemsStored: 0,
        status: "fetch_error",
        timestamp: new Date().toISOString(),
      });
    }
  }

  return results;
}

function status(code: number) {
  return { status: code };
}
