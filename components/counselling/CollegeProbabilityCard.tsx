"use client";

import {
  getProbabilityColor,
  getProbabilityLabel,
  getTrendIcon,
  type CollegeProbability,
} from "@/lib/counselling/probability";
import { TransparencyBadge } from "./TransparencyBadge";
import { ChevronDown, ChevronUp, MapPin, GraduationCap, IndianRupee, TrendingUp } from "lucide-react";
import { useState } from "react";

interface Props {
  prediction: CollegeProbability;
}

export function CollegeProbabilityCard({ prediction }: Props) {
  const [expanded, setExpanded] = useState(false);
  const {
    college,
    level,
    score,
    closingRank2025,
    rankGap,
    trend,
    trendDescription,
    reasons,
    availableSeats,
    category,
    quota,
  } = prediction;

  const levelColor = getProbabilityColor(level);
  const levelLabel = getProbabilityLabel(level);
  const trendIcon = getTrendIcon(trend);

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:border-zinc-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold text-zinc-900 truncate">
              {college.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-[12px] text-zinc-500">
              <MapPin className="h-3 w-3" />
              <span>{college.city}, {college.state}</span>
            </div>
          </div>
          <div className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${levelColor} whitespace-nowrap`}>
            {levelLabel}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[12px] text-zinc-600 mb-3">
          <span className="flex items-center gap-1">
            <GraduationCap className="h-3 w-3 text-zinc-400" />
            {college.type === "government" ? "Govt" : college.type === "private" ? "Private" : "Deemed"}
          </span>
          <span>{college.totalSeats} seats</span>
          <span className="text-zinc-400">|</span>
          <span>{category} • {quota.toUpperCase()}</span>
          {availableSeats > 0 && (
            <>
              <span className="text-zinc-400">|</span>
              <span className="text-emerald-600 font-medium">{availableSeats} vacant</span>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-zinc-50 rounded-xl p-3 text-center">
            <div className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Score</div>
            <div className="text-[18px] font-extrabold text-zinc-900">{score}</div>
          </div>
          <div className="bg-zinc-50 rounded-xl p-3 text-center">
            <div className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Closing Rank</div>
            <div className="text-[18px] font-extrabold text-zinc-900">
              {closingRank2025 === Infinity ? "N/A" : closingRank2025.toLocaleString()}
            </div>
          </div>
          <div className="bg-zinc-50 rounded-xl p-3 text-center">
            <div className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Rank Gap</div>
            <div className={`text-[18px] font-extrabold ${rankGap > 0 ? "text-emerald-600" : "text-red-500"}`}>
              {rankGap === Infinity ? "N/A" : rankGap > 0 ? `+${rankGap.toLocaleString()}` : rankGap.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-zinc-500 mb-3">
          <TrendingUp className="h-3 w-3" />
          <span className={`font-medium ${trend === "increasing" ? "text-emerald-600" : trend === "decreasing" ? "text-red-500" : "text-zinc-600"}`}>
            {trendIcon} {trend.charAt(0).toUpperCase() + trend.slice(1)} trend
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[12px] text-zinc-400">
            {college.feesRange.min === 0 ? "—" : `₹${(college.feesRange.min / 100000).toFixed(1)}L — ₹${(college.feesRange.max / 100000).toFixed(1)}L/yr`}
          </span>
          <TransparencyBadge source="official" />
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 sm:px-6 py-3 border-t border-zinc-100 flex items-center justify-between text-[13px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
      >
        <span>{expanded ? "Hide explanation" : "Why this probability?"}</span>
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {expanded && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-zinc-100 pt-4">
          <p className="text-[13px] text-zinc-600 mb-3 leading-relaxed">{trendDescription}</p>
          <ul className="space-y-2">
            {reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-zinc-600">
                <span className="text-zinc-300 mt-0.5">•</span>
                <span className="leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
