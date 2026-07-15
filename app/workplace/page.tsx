"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { workplaceArticles, workplaceCategories } from "@/data/workplace";

export default function FinancePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? workplaceArticles
    : workplaceArticles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        <div className="mb-10">
          <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.12em] mb-3">Workplace</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em] mb-3">
            Workplace basics
          </h1>
          <p className="text-[15px] text-zinc-500 max-w-lg">
            PF, ESI, ITR, tax savings, insurance, credit score, salary negotiation — everything you need to know once you start working.
          </p>
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
          {workplaceCategories.map((cat) => (
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

        {/* Articles */}
        <div className="space-y-4">
          {filtered.map((article) => {
            const isExpanded = expandedArticle === article.id;

            return (
              <div
                key={article.id}
                className="bg-white rounded-2xl border border-zinc-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedArticle(isExpanded ? null : article.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-zinc-50/50 transition-colors"
                >
                  <div className="min-w-0 mr-4">
                    <h3 className="text-[16px] font-bold text-zinc-900 tracking-[-0.01em]">
                      {article.title}
                    </h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5 line-clamp-1">{article.description}</p>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 border-t border-zinc-100">
                    <div className="space-y-5 mt-4">
                      {article.sections.map((section) => (
                        <div key={section.heading}>
                          <h4 className="text-[14px] font-bold text-zinc-900 mb-2">{section.heading}</h4>
                          <ul className="space-y-1.5">
                            {section.content.map((item, i) => (
                              <li key={i} className="text-[13px] text-zinc-600 flex items-start gap-2">
                                <span className="text-zinc-300 mt-0.5 text-[11px]">&#9679;</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {article.links.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-zinc-100">
                        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Useful links</p>
                        <div className="space-y-1.5">
                          {article.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-[13px] text-zinc-600 hover:text-zinc-900 font-medium transition-colors"
                            >
                              <ExternalLink className="h-3 w-3 shrink-0" />
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
