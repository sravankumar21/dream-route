"use client";

import { useState } from "react";
import { X, Sparkles, Loader2 } from "lucide-react";

interface GenerateModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (content: string) => void;
}

const contentTypes = [
  { value: "blog", label: "Blog Post" },
  { value: "reel-script", label: "Reel / Short Script" },
  { value: "short-script", label: "YouTube Short Script" },
  { value: "long-form-script", label: "Long-form Video Script" },
  { value: "instagram-caption", label: "Instagram Caption" },
];

const tones = [
  "Professional yet conversational",
  "Energetic and punchy",
  "Educational and engaging",
  "Casual and fun",
  "Thought leadership",
  "Beginner-friendly",
];

const lengths = [
  "Short (300-500 words)",
  "Medium (800-1000 words)",
  "Long (1500-2000 words)",
  "Extra long (2500+ words)",
];

export default function GenerateModal({ open, onClose, onGenerate }: GenerateModalProps) {
  const [type, setType] = useState("blog");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional yet conversational");
  const [length, setLength] = useState("Medium (800-1000 words)");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, topic, tone, length }),
      });
      const data = await res.json();
      if (data.content) {
        onGenerate(data.content);
        onClose();
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111113] border border-white/[0.06] rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-violet-400" />
            </div>
            <h3 className="text-[16px] font-bold text-white">AI Generate</h3>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Type */}
          <div>
            <label className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider block mb-1.5">
              Content Type
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {contentTypes.map((ct) => (
                <button
                  key={ct.value}
                  onClick={() => setType(ct.value)}
                  className={`px-3 py-2 rounded-lg text-[13px] font-medium border transition-colors ${
                    type === ct.value
                      ? "bg-white/[0.08] border-white/[0.12] text-white"
                      : "border-white/[0.04] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                  }`}
                >
                  {ct.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider block mb-1.5">
              Topic / Idea
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Top 5 AI tools every student should know in 2025"
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-[14px] text-white placeholder-zinc-600 focus:outline-none focus:border-white/[0.12] transition-colors"
            />
          </div>

          {/* Tone */}
          <div>
            <label className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider block mb-1.5">
              Tone
            </label>
            <div className="flex flex-wrap gap-1.5">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors ${
                    tone === t
                      ? "bg-white/[0.08] border-white/[0.12] text-white"
                      : "border-white/[0.04] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div>
            <label className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider block mb-1.5">
              Length
            </label>
            <div className="flex flex-wrap gap-1.5">
              {lengths.map((l) => (
                <button
                  key={l}
                  onClick={() => setLength(l)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors ${
                    length === l
                      ? "bg-white/[0.08] border-white/[0.12] text-white"
                      : "border-white/[0.04] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={!topic.trim() || loading}
            className="px-5 py-2 rounded-lg text-[13px] font-semibold bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
