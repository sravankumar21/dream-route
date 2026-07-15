"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, X, GraduationCap, BookOpen, Target, Award, Briefcase } from "lucide-react";

interface SearchResult {
  title: string;
  description: string;
  tag: string;
  url: string;
}

const tagColors: Record<string, string> = {
  Careers: "bg-zinc-800 text-zinc-300",
  Skills: "bg-zinc-800 text-zinc-400",
  Exams: "bg-emerald-900/50 text-emerald-400",
  Scholarships: "bg-amber-900/50 text-amber-400",
  Blog: "bg-violet-900/50 text-violet-400",
};

const tagIcons: Record<string, React.ReactNode> = {
  Careers: <Briefcase className="h-3 w-3" />,
  Skills: <BookOpen className="h-3 w-3" />,
  Exams: <Target className="h-3 w-3" />,
  Scholarships: <Award className="h-3 w-3" />,
  Blog: <BookOpen className="h-3 w-3" />,
};

const quickLinks = [
  { label: "Software Engineer", tag: "Careers", url: "/careers/software-engineer", icon: <GraduationCap className="h-3.5 w-3.5" /> },
  { label: "NEET", tag: "Exams", url: "/exams/neet", icon: <Target className="h-3.5 w-3.5" /> },
  { label: "JEE Main", tag: "Exams", url: "/exams/jee-main", icon: <Target className="h-3.5 w-3.5" /> },
  { label: "Scholarships", tag: "Scholarships", url: "/scholarships", icon: <Award className="h-3.5 w-3.5" /> },
  { label: "Education Paths", tag: "Explore", url: "/education", icon: <BookOpen className="h-3.5 w-3.5" /> },
  { label: "Data Scientist", tag: "Careers", url: "/careers/data-scientist", icon: <GraduationCap className="h-3.5 w-3.5" /> },
  { label: "GATE", tag: "Exams", url: "/exams/gate", icon: <Target className="h-3.5 w-3.5" /> },
  { label: "AI News", tag: "Blog", url: "/blog", icon: <BookOpen className="h-3.5 w-3.5" /> },
];

export default function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Auto-focus
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Disable scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Search API
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
    const items = query.length >= 2 ? results : quickLinks;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && items[activeIndex]) {
      const item = items[activeIndex];
      navigate("url" in item ? item.url : "/");
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  const displayItems = query.length >= 2 ? results : quickLinks;

  return (
    <div className="fixed inset-0 z-[100]" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(0, 0, 0, 0.55)",
        }}
        onClick={onClose}
      />

      {/* Search panel */}
      <div className="relative flex justify-center pt-[12vh] px-4">
        <div className="w-full max-w-2xl">
          {/* Input */}
          <div className="bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4">
              <Search className="h-5 w-5 text-zinc-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search careers, colleges, exams, scholarships..."
                className="flex-1 text-[16px] text-white placeholder:text-zinc-500 outline-none bg-transparent"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-[11px] text-zinc-500 border border-zinc-700 rounded px-1.5 py-0.5 hover:text-zinc-300 hover:border-zinc-500 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-700/50" />

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {query.length < 2 ? (
                <div className="p-4">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-3 px-1">
                    Quick access
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {quickLinks.map((link, i) => (
                      <button
                        key={link.label}
                        onClick={() => navigate(link.url)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                          i === activeIndex ? "bg-zinc-800" : "hover:bg-zinc-800/50"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                          {link.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-zinc-200 truncate">{link.label}</p>
                          <p className="text-[11px] text-zinc-500">{link.tag}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : loading ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-[13px] text-zinc-500">Searching...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-[13px] text-zinc-500">No results for &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                <div className="p-2">
                  {results.map((result, i) => (
                    <button
                      key={`${result.title}-${result.tag}-${i}`}
                      onClick={() => navigate(result.url)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                        i === activeIndex ? "bg-zinc-800" : "hover:bg-zinc-800/50"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                        {tagIcons[result.tag] || <Search className="h-3 w-3" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-medium text-zinc-200 truncate">
                            {result.title}
                          </span>
                          <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${tagColors[result.tag] || "bg-zinc-800 text-zinc-400"}`}>
                            {result.tag}
                          </span>
                        </div>
                        <p className="text-[12px] text-zinc-500 truncate mt-0.5">{result.description}</p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="h-px bg-zinc-700/50" />
            <div className="px-5 py-2.5 flex items-center gap-4 text-[11px] text-zinc-500">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-[10px] text-zinc-400">↑↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-[10px] text-zinc-400">↵</kbd> select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-[10px] text-zinc-400">esc</kbd> close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
