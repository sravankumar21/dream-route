"use client";

import { useState } from "react";
import { ExternalLink, Search, Filter } from "lucide-react";
import { scholarships, scholarshipCategories } from "@/data/scholarships";

export default function ScholarshipsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = scholarships.filter((s) => {
    const matchCategory = activeCategory === "all" || s.category === activeCategory;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="mb-10">
          <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.12em] mb-3">Opportunities</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em] mb-3">
            Scholarships
          </h1>
          <p className="text-[15px] text-zinc-500 max-w-lg">
            Every scholarship you&apos;re eligible for — central, state, merit, need-based. Apply before deadlines.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scholarships..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-[14px] bg-white border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-shadow"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors border ${
              activeCategory === "all"
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            All
          </button>
          {scholarshipCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors border ${
                activeCategory === cat.id
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results */}
        <p className="text-[13px] text-zinc-400 mb-4">{filtered.length} scholarship{filtered.length !== 1 ? "s" : ""}</p>

        <div className="space-y-3">
          {filtered.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 hover:border-zinc-300 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <h3 className="text-[16px] font-bold text-zinc-900 tracking-[-0.01em]">
                    {scholarship.name}
                  </h3>
                  <p className="text-[13px] text-zinc-400 mt-0.5">{scholarship.provider}</p>
                </div>
                <span className="shrink-0 text-[14px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg">
                  {scholarship.amount}
                </span>
              </div>

              <p className="text-[13px] text-zinc-500 mb-4">{scholarship.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Eligibility</p>
                  <ul className="space-y-1">
                    {scholarship.eligibility.map((item, i) => (
                      <li key={i} className="text-[12px] text-zinc-600 flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Benefits</p>
                  <ul className="space-y-1">
                    {scholarship.benefits.map((item, i) => (
                      <li key={i} className="text-[12px] text-zinc-600 flex items-start gap-1.5">
                        <span className="text-zinc-400 mt-0.5">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                <span className="text-[12px] text-zinc-400">
                  Deadline: <span className="font-medium text-zinc-600">{scholarship.deadline}</span>
                </span>
                <a
                  href={scholarship.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  Apply now
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[15px] text-zinc-400">No scholarships found. Try a different filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
