"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, X } from "lucide-react";

interface SearchResult {
  title: string;
  description: string;
  tag: string;
  url: string;
}

const tagColors: Record<string, string> = {
  Careers: "bg-zinc-900 text-white",
  Skills: "bg-zinc-100 text-zinc-600",
  Exams: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Scholarships: "bg-amber-50 text-amber-700 border border-amber-200",
  Blog: "bg-violet-50 text-violet-700 border border-violet-200",
};

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setActiveIndex(0);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const navigate = useCallback(
    (url: string) => {
      router.push(url);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      navigate(results[activeIndex].url);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-zinc-200 w-full max-w-lg mx-4 overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-100">
          <Search className="h-5 w-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search careers, exams, scholarships..."
            className="flex-1 text-[15px] text-zinc-900 placeholder:text-zinc-400 outline-none bg-transparent"
          />
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query.length < 2 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-[13px] text-zinc-400">Type at least 2 characters to search</p>
              <p className="text-[12px] text-zinc-300 mt-1">Careers, exams, scholarships, blog posts</p>
            </div>
          ) : loading ? (
            <div className="px-5 py-8 text-center">
              <p className="text-[13px] text-zinc-400">Searching...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-[13px] text-zinc-400">No results for &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((result, i) => (
                <button
                  key={`${result.title}-${result.tag}`}
                  onClick={() => navigate(result.url)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                    i === activeIndex ? "bg-zinc-50" : "hover:bg-zinc-50"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-zinc-900 truncate">
                        {result.title}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${tagColors[result.tag] || "bg-zinc-100 text-zinc-500"}`}>
                        {result.tag}
                      </span>
                    </div>
                    <p className="text-[12px] text-zinc-400 truncate mt-0.5">{result.description}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-300 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-zinc-100 flex items-center gap-4 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-zinc-100 rounded text-[10px]">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-zinc-100 rounded text-[10px]">↵</kbd> select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-zinc-100 rounded text-[10px]">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
