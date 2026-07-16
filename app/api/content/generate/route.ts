import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function generateWithGemini(prompt: string): Promise<string | null> {
  if (!GEMINI_API_KEY) return null;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
    }
  );
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

export async function POST(req: NextRequest) {
  const { type, topic, tone, length } = await req.json();

  const prompts: Record<string, string> = {
    blog: `Write a blog post about "${topic}". Tone: ${tone || "professional yet conversational"}. Length: ${length || "800-1000 words"}. Use markdown formatting with headers, short paragraphs, and bullet points where appropriate. Start with a hook that makes the reader want to continue.`,
    "reel-script": `Write an Instagram Reel / YouTube Short script about "${topic}". Tone: ${tone || "energetic, punchy"}. Keep it under 60 seconds of spoken word. Include: HOOK (first 3 seconds), BODY (main point), CTA (follow/save/share). Use natural spoken language, not formal writing. Include on-screen text suggestions.`,
    "short-script": `Write a YouTube Shorts script about "${topic}". Tone: ${tone || "energetic, punchy"}. Under 60 seconds spoken. Include: HOOK, BODY, CTA. Spoken language only.`,
    "long-form-script": `Write a YouTube long-form video script about "${topic}". Tone: ${tone || "educational, engaging"}. Length: ${length || "8-10 minutes spoken"}. Include: INTRO HOOK, CHAPTERS with timestamps, KEY POINTS, OUTRO with CTA. Use spoken language, add [B-ROLL] suggestions where relevant.`,
    "instagram-caption": `Write an Instagram caption about "${topic}". Tone: ${tone || "casual, engaging"}. Include: Hook line, body text, 5-10 relevant hashtags. Keep it under 2200 characters. Start with something that stops the scroll.`,
  };

  const prompt = prompts[type] || prompts.blog;
  const result = await generateWithGemini(prompt);

  if (!result) {
    return NextResponse.json({ error: "Gemini API not configured" }, { status: 503 });
  }

  return NextResponse.json({ content: result });
}
