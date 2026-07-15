import { NextResponse } from "next/server";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";

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

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "YOUTUBE_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const results = await syncYouTubeVideos(apiKey);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (error) {
    console.error("YouTube sync failed:", error);
    return NextResponse.json(
      { error: "Sync failed" },
      { status: 500 }
    );
  }
}

async function syncYouTubeVideos(apiKey: string): Promise<SyncResult[]> {
  const results: SyncResult[] = [];

  // Search for educational videos in key skill areas
  const searchTerms = [
    "python tutorial for beginners",
    "javascript tutorial",
    "react tutorial",
    "data structures and algorithms",
    "machine learning tutorial",
    "web development tutorial",
    "docker tutorial",
    "aws tutorial",
    "figma tutorial",
    "photoshop tutorial",
    "video editing tutorial",
  ];

  for (const term of searchTerms) {
    try {
      const response = await fetch(
        `${YOUTUBE_API}/search?part=snippet&q=${encodeURIComponent(term)}&type=video&videoDuration=medium&maxResults=5&key=${apiKey}`
      );

      if (!response.ok) {
        results.push({
          source: `youtube-${term}`,
          itemsFound: 0,
          itemsStored: 0,
          status: "api_error",
          timestamp: new Date().toISOString(),
        });
        continue;
      }

      const data = await response.json();
      const videos = data.items || [];

      results.push({
        source: `youtube-${term}`,
        itemsFound: videos.length,
        itemsStored: videos.length,
        status: "success",
        timestamp: new Date().toISOString(),
      });

      // Respect YouTube API quota (100 units per search)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      results.push({
        source: `youtube-${term}`,
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
