"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Clock,
  IndianRupee,
  Briefcase,
  GraduationCap,
  AlertCircle,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import type { EducationNode } from "@/data/education";

const depthStyles = [
  "border-l-zinc-900",
  "border-l-zinc-400",
  "border-l-zinc-300",
  "border-l-zinc-200",
];

const typeBadge: Record<string, { label: string; color: string }> = {
  govt: { label: "Govt", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  private: { label: "Private", color: "bg-amber-50 text-amber-700 border-amber-200" },
  residential: { label: "Residential", color: "bg-sky-50 text-sky-700 border-sky-200" },
  "semi-govt": { label: "Semi-Govt", color: "bg-violet-50 text-violet-700 border-violet-200" },
};

export default function TreeNode({
  node,
  depth = 0,
  expandAll,
  collapseAll,
}: {
  node: EducationNode;
  depth?: number;
  expandAll?: boolean;
  collapseAll?: boolean;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const badge = typeBadge[node.type] || typeBadge.govt;
  const borderColor = depthStyles[Math.min(depth, depthStyles.length - 1)];

  const toggle = useCallback(() => {
    if (hasChildren) setExpanded((prev) => !prev);
  }, [hasChildren]);

  if (expandAll !== undefined) {
    if (expandAll && !expanded) setExpanded(true);
    if (collapseAll !== undefined && collapseAll && expanded) setExpanded(false);
  }

  const childCount = hasChildren
    ? node.children!.reduce((acc, c) => acc + 1 + (c.children?.length || 0), 0)
    : 0;

  return (
    <div className={depth > 0 ? "pl-5 sm:pl-8" : ""}>
      <div
        className={`
          group relative border-l-2 ${borderColor}
          ${depth > 0 ? "ml-0" : ""}
        `}
      >
        <div
          className={`
            relative rounded-xl p-4 sm:p-5 mb-2 transition-all duration-200
            ${hasChildren
              ? "bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-[0_2px_16px_rgba(0,0,0,0.05)] cursor-pointer"
              : "bg-zinc-50/60 border border-zinc-100"
            }
            ${node.careerSlug ? "hover:border-indigo-200 hover:bg-indigo-50/20" : ""}
          `}
          onClick={toggle}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-[15px] font-semibold text-zinc-900 tracking-[-0.01em]">
                  {node.label}
                </h3>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badge.color}`}>
                  {badge.label}
                </span>
                {hasChildren && !expanded && (
                  <span className="text-[11px] text-zinc-400 font-medium">
                    {childCount} paths
                  </span>
                )}
              </div>

              {node.subtitle && (
                <p className="text-[13px] text-zinc-500 mb-2 leading-relaxed">{node.subtitle}</p>
              )}

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-zinc-500">
                {node.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-zinc-400" />
                    {node.duration}
                  </span>
                )}
                {node.eligibility && (
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-zinc-400" />
                    {node.eligibility}
                  </span>
                )}
                {node.entranceExam && (
                  <span className="flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 text-zinc-400" />
                    {node.entranceExam}
                  </span>
                )}
              </div>

              {node.fees && (node.fees.govt || node.fees.private) && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {node.fees.govt && node.fees.govt !== "—" && (
                    <div className="flex items-center gap-1.5 bg-emerald-50/80 border border-emerald-100 rounded-lg px-2.5 py-1">
                      <IndianRupee className="h-3 w-3 text-emerald-600" />
                      <span className="text-[12px] font-medium text-emerald-700">
                        Govt: {node.fees.govt}
                      </span>
                    </div>
                  )}
                  {node.fees.private && node.fees.private !== "—" && (
                    <div className="flex items-center gap-1.5 bg-amber-50/80 border border-amber-100 rounded-lg px-2.5 py-1">
                      <IndianRupee className="h-3 w-3 text-amber-600" />
                      <span className="text-[12px] font-medium text-amber-700">
                        Private: {node.fees.private}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {node.careers && node.careers.length > 0 && !node.careerSlug && (
                <div className="flex items-start gap-1.5 mt-3">
                  <Briefcase className="h-3.5 w-3.5 text-zinc-400 mt-0.5 shrink-0" />
                  <div className="flex flex-wrap gap-1.5">
                    {node.careers.map((c) => (
                      <span
                        key={c}
                        className="text-[11px] font-medium bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {node.note && (
                <p className="text-[12px] text-zinc-400 italic mt-2">{node.note}</p>
              )}
            </div>

            {hasChildren && (
              <div className="shrink-0 mt-1">
                <ChevronDown
                  className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </div>
            )}

            {node.careerSlug && (
              <Link
                href={`/careers/${node.careerSlug}`}
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 mt-1 flex items-center gap-1 text-[12px] font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5 transition-colors"
              >
                View Career
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        {hasChildren && expanded && (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-3 w-px bg-zinc-200 ml-0" />
            {node.children!.map((child, i) => (
              <TreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
                expandAll={expandAll}
                collapseAll={collapseAll}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
