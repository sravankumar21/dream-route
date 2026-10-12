"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { states, type EducationNode } from "@/data/education";

function NodeCard({ node, level = 0 }: { node: EducationNode; level?: number }) {
  const [open, setOpen] = useState(level < 2); // auto-expand first levels
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-2 sm:ml-4 border-l border-zinc-200 pl-3 sm:pl-6 mb-4">
      <div className="bg-white rounded-xl border border-zinc-200 p-4 sm:p-5 hover:shadow-sm transition-all">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {hasChildren && (
                <button
                  onClick={() => setOpen(!open)}
                  className="p-0.5 rounded hover:bg-zinc-50"
                  aria-label={open ? "Collapse" : "Expand"}
                >
                  {open ? <ChevronDown className="h-4 w-4 text-zinc-500" /> : <ChevronRight className="h-4 w-4 text-zinc-500" />}
                </button>
              )}
              <h3 className="text-[15px] sm:text-[17px] font-bold text-zinc-900 tracking-[-0.01em]">
                {node.label}
              </h3>
            </div>
            {node.subtitle && (
              <p className="text-zinc-500 text-[14px] sm:text-[15px] leading-relaxed">
                {node.subtitle}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {node.duration && (
                <span className="text-xs bg-zinc-50 text-zinc-700 px-2 py-0.5 rounded-md border border-zinc-200">
                  {node.duration}
                </span>
              )}
              {node.fees?.govt && (
                <span className="text-xs bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                  Govt: {node.fees.govt}
                </span>
              )}
              {node.fees?.private && (
                <span className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200">
                  Pvt: {node.fees.private}
                </span>
              )}
              {node.entranceExam && (
                <span className="text-xs bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md border border-blue-200">
                  {node.entranceExam}
                </span>
              )}
            </div>
            {node.careers && node.careers.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {node.careers.slice(0, 4).map((c) => (
                  <span key={c} className="text-xs text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            )}
            {node.careerSlug && (
              <Link
                href={`/careers/${node.careerSlug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-zinc-900 hover:underline"
              >
                View Career
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            {node.links && node.links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {node.links.slice(0, 2).map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-700 hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {hasChildren && open && (
        <div className="mt-3">
          {node.children!.map((c) => (
            <NodeCard key={c.id} node={c} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function EducationTimeline() {
  const [selectedState, setSelectedState] = useState("telangana");
  const state = states.find((s) => s.id === selectedState);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1">
        {states.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedState(s.id)}
            className={`px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold whitespace-nowrap transition-all ${
              selectedState === s.id
                ? "bg-zinc-900 text-white"
                : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {state?.tree.map((root) => (
        <NodeCard key={root.id} node={root} />
      ))}
    </div>
  );
}
