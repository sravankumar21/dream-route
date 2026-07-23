"use client";

import type { AllocationExplanation } from "@/lib/counselling/probability";
import { TransparencyBadge } from "./TransparencyBadge";
import { AlertCircle, CheckCircle, ArrowRight, TrendingDown } from "lucide-react";

interface Props {
  explanation: AllocationExplanation;
}

export function ExplanationPanel({ explanation }: Props) {
  const {
    studentRank,
    collegeName,
    closingRank,
    rankGap,
    totalSeats,
    categorySeats,
    category,
    round,
    explanation: text,
    details,
    possibleInLaterRounds,
    laterRoundAnalysis,
  } = explanation;

  const gotSeat = rankGap > 0;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
      <div className={`px-6 py-4 ${gotSeat ? "bg-emerald-50 border-b border-emerald-100" : "bg-red-50 border-b border-red-100"}`}>
        <div className="flex items-center gap-3">
          {gotSeat ? (
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          <div>
            <h3 className="text-[15px] font-bold text-zinc-900">
              {gotSeat ? "You would likely get this seat" : "You would not get this seat in this round"}
            </h3>
            <p className="text-[12px] text-zinc-500 mt-0.5">
              {collegeName} — {category} category, {round.toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-zinc-50 rounded-xl p-4 mb-5">
          <p className="text-[14px] text-zinc-700 leading-relaxed">{text}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="text-center p-3 bg-zinc-50 rounded-xl">
            <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Your Rank</div>
            <div className="text-[16px] font-extrabold text-zinc-900 mt-1">{studentRank.toLocaleString()}</div>
          </div>
          <div className="text-center p-3 bg-zinc-50 rounded-xl">
            <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Closing Rank</div>
            <div className="text-[16px] font-extrabold text-zinc-900 mt-1">{closingRank === Infinity ? "N/A" : closingRank.toLocaleString()}</div>
          </div>
          <div className="text-center p-3 bg-zinc-50 rounded-xl">
            <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Rank Gap</div>
            <div className={`text-[16px] font-extrabold mt-1 ${rankGap > 0 ? "text-emerald-600" : "text-red-500"}`}>
              {closingRank === Infinity ? "N/A" : rankGap.toLocaleString()}
            </div>
          </div>
          <div className="text-center p-3 bg-zinc-50 rounded-xl">
            <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Total Seats</div>
            <div className="text-[16px] font-extrabold text-zinc-900 mt-1">{totalSeats}</div>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          <h4 className="text-[13px] font-bold text-zinc-900">Details</h4>
          {details.map((detail, i) => (
            <div key={i} className="flex items-start gap-2 text-[12px] text-zinc-600">
              <ArrowRight className="h-3 w-3 text-zinc-400 mt-0.5 shrink-0" />
              <span className="leading-relaxed">{detail}</span>
            </div>
          ))}
        </div>

        {possibleInLaterRounds && (
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-amber-600" />
              <h4 className="text-[13px] font-bold text-amber-800">What About Later Rounds?</h4>
            </div>
            <p className="text-[12px] text-amber-700 leading-relaxed">{laterRoundAnalysis}</p>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-zinc-100">
          <TransparencyBadge source="estimated" />
          <p className="text-[11px] text-zinc-400 mt-2">
            This analysis is based on historical closing rank data and available seat matrices. Actual allotment depends on the counselling algorithm, choice filling order, and real-time seat availability. Official data should be verified at{" "}
            <a href="https://mcc.nic.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-600">mcc.nic.in</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
