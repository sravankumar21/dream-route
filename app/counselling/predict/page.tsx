"use client";

import { useState } from "react";
import Link from "next/link";
import { PredictionWizard } from "@/components/counselling/PredictionWizard";
import { CollegeProbabilityCard } from "@/components/counselling/CollegeProbabilityCard";
import { TransparencyBadge } from "@/components/counselling/TransparencyBadge";
import {
  getEligibleColleges,
  type StudentProfile,
  type CollegeProbability,
} from "@/lib/counselling/probability";
import { ArrowLeft, Filter, SortAsc, SortDesc } from "lucide-react";

export default function PredictPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [results, setResults] = useState<CollegeProbability[]>([]);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [sortBy, setSortBy] = useState<"score" | "rank">("score");

  const handleComplete = (p: StudentProfile) => {
    setProfile(p);
    const eligible = getEligibleColleges(p);
    setResults(eligible);
  };

  const filtered = results
    .filter((r) => filter === "all" || r.level === filter)
    .sort((a, b) => (sortBy === "score" ? b.score - a.score : a.rankGap - b.rankGap));

  const highCount = results.filter((r) => r.level === "high").length;
  const mediumCount = results.filter((r) => r.level === "medium").length;
  const lowCount = results.filter((r) => r.level === "low").length;

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <Link
          href="/counselling"
          className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-zinc-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Counselling
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-[-0.03em] text-zinc-900">
              Predict My College
            </h1>
            <TransparencyBadge source="estimated" />
          </div>
          <p className="text-[14px] text-zinc-500">
            Enter your details and get instant predictions for every medical college.
          </p>
        </div>

        {!profile ? (
          <div className="max-w-2xl mx-auto">
            <PredictionWizard onComplete={handleComplete} />
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-2xl border border-zinc-200 p-5 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[12px] bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md font-medium">
                    Rank: {profile.rank.toLocaleString()}
                  </span>
                  <span className="text-[12px] bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md font-medium">
                    {profile.category}
                  </span>
                  <span className="text-[12px] bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md font-medium">
                    {profile.state}
                  </span>
                  <span className="text-[12px] bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md font-medium">
                    {profile.preferredCourse}
                  </span>
                </div>
                <button
                  onClick={() => { setProfile(null); setResults([]); }}
                  className="text-[12px] text-zinc-500 hover:text-zinc-900 font-medium transition-colors"
                >
                  Change Details
                </button>
              </div>

              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-100">
                <button
                  onClick={() => setFilter("all")}
                  className={`text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                    filter === "all" ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  All ({results.length})
                </button>
                <button
                  onClick={() => setFilter("high")}
                  className={`text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                    filter === "high" ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                  }`}
                >
                  High ({highCount})
                </button>
                <button
                  onClick={() => setFilter("medium")}
                  className={`text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                    filter === "medium" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                  }`}
                >
                  Possible ({mediumCount})
                </button>
                <button
                  onClick={() => setFilter("low")}
                  className={`text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                    filter === "low" ? "bg-red-500 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"
                  }`}
                >
                  Low ({lowCount})
                </button>

                <div className="ml-auto flex items-center gap-1">
                  <button
                    onClick={() => setSortBy("score")}
                    className={`text-[11px] px-2 py-1 rounded transition-colors ${
                      sortBy === "score" ? "bg-zinc-200 text-zinc-900 font-semibold" : "text-zinc-400"
                    }`}
                  >
                    By Score
                  </button>
                  <button
                    onClick={() => setSortBy("rank")}
                    className={`text-[11px] px-2 py-1 rounded transition-colors ${
                      sortBy === "rank" ? "bg-zinc-200 text-zinc-900 font-semibold" : "text-zinc-400"
                    }`}
                  >
                    By Rank Gap
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-[14px] text-zinc-500">No colleges match this filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((prediction) => (
                  <CollegeProbabilityCard key={prediction.college.id} prediction={prediction} />
                ))}
              </div>
            )}

            <div className="mt-8 p-4 bg-zinc-100 rounded-xl text-center">
              <p className="text-[11px] text-zinc-500">
                <TransparencyBadge source="estimated" className="mr-2" />
                All predictions are estimates based on historical data. Actual allotment depends on the counselling algorithm, choice filling order, and real-time seat availability. Verify at{" "}
                <a href="https://mcc.nic.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-700">mcc.nic.in</a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
