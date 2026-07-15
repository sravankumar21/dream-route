"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchResult {
  title: string;
  description: string;
  tag: string;
  url: string;
}

const tagColors: Record<string, string> = {
  Careers: "text-zinc-400",
  Skills: "text-zinc-500",
  Exams: "text-emerald-500",
  Scholarships: "text-amber-500",
  Blog: "text-violet-500",
};

const quickLinks = [
  { label: "Software Engineer", tag: "Careers", url: "/careers/software-engineer" },
  { label: "Data Scientist", tag: "Careers", url: "/careers/data-scientist" },
  { label: "UI/UX Designer", tag: "Careers", url: "/careers/ui-ux-designer" },
  { label: "NEET", tag: "Exams", url: "/exams/neet" },
  { label: "JEE Main", tag: "Exams", url: "/exams/jee-main" },
  { label: "TS EAMCET", tag: "Exams", url: "/exams/ts-eamcet" },
  { label: "GATE", tag: "Exams", url: "/exams/gate" },
  { label: "CAT", tag: "Exams", url: "/exams/cat" },
  { label: "Scholarships", tag: "Scholarships", url: "/scholarships" },
  { label: "Education Paths", tag: "Explore", url: "/education" },
  { label: "AI News", tag: "Blog", url: "/blog" },
  { label: "Workplace", tag: "Explore", url: "/workplace" },
];

export default function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
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
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const navigate = (url: string) => {
    router.push(url);
    onClose();
  };

  if (!open) return null;

  const displayItems = query.length >= 2 ? results : quickLinks;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={onClose}
      />

      {/* Search panel — slides down from top */}
      <div
        className="absolute top-0 left-0 right-0 bg-white shadow-2xl"
        style={{
          height: "55vh",
          animation: "searchSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        <div className="max-w-3xl mx-auto h-full flex flex-col">
          {/* Search input */}
          <div className="flex items-center gap-4 px-8 pt-8 pb-5 border-b border-zinc-100">
            <Search className="h-5 w-5 text-zinc-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search careers, colleges, exams, scholarships..."
              className="flex-1 text-[20px] sm:text-[24px] text-zinc-900 placeholder:text-zinc-300 outline-none bg-transparent font-light"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-zinc-300 hover:text-zinc-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-[13px] text-zinc-400 hover:text-zinc-600 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {query.length < 2 ? (
              <div>
                <p className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                  Quick Links
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-1">
                  {quickLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => navigate(link.url)}
                      className="flex items-center gap-3 py-3 text-left group"
                    >
                      <div className="min-w-0">
                        <p className="text-[15px] text-zinc-700 group-hover:text-zinc-900 font-medium truncate transition-colors">
                          {link.label}
                        </p>
                        <p className={`text-[12px] ${tagColors[link.tag] || "text-zinc-400"}`}>
                          {link.tag}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : loading ? (
              <div className="py-16 text-center">
                <p className="text-[14px] text-zinc-300">Searching...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[14px] text-zinc-300">No results for &ldquo;{query}&rdquo;</p>
              </div>
            ) : (
              <div>
                <p className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-4">
                  Results
                </p>
                <div className="space-y-1">
                  {results.map((result, i) => (
                    <button
                      key={`${result.title}-${result.tag}-${i}`}
                      onClick={() => navigate(result.url)}
                      className="w-full flex items-center justify-between gap-4 py-3.5 px-3 -mx-3 rounded-xl text-left hover:bg-zinc-50 transition-colors group"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[15px] text-zinc-700 group-hover:text-zinc-900 font-medium truncate transition-colors">
                            {result.title}
                          </span>
                          <span className={`text-[11px] font-medium ${tagColors[result.tag] || "text-zinc-400"}`}>
                            {result.tag}
                          </span>
                        </div>
                        <p className="text-[13px] text-zinc-400 truncate mt-0.5">{result.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes searchSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
