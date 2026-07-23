"use client";

import { useState } from "react";
import Link from "next/link";
import { ExplanationPanel } from "@/components/counselling/ExplanationPanel";
import { TransparencyBadge } from "@/components/counselling/TransparencyBadge";
import { medicalColleges, getAllStates } from "@/data/counselling/colleges";
import { allIndiaCategories } from "@/data/counselling/categories";
import { explainAllocation, type AllocationExplanation } from "@/lib/counselling/probability";
import { ArrowLeft, Search, AlertCircle } from "lucide-react";

export default function ExplainPage() {
  const [rank, setRank] = useState<number>(0);
  const [collegeId, setCollegeId] = useState("");
  const [category, setCategory] = useState("General");
  const [quota, setQuota] = useState<"aiq" | "state">("aiq");
  const [round, setRound] = useState("round1");
  const [result, setResult] = useState<AllocationExplanation | null>(null);

  const states = getAllStates();
  const filteredColleges = collegeId
    ? medicalColleges
    : medicalColleges.slice(0, 20);

  const handleExplain = () => {
    if (!collegeId || rank <= 0) return;
    const explanation = explainAllocation(rank, collegeId, category, quota, round);
    setResult(explanation);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
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
              Why Didn&apos;t I Get This Seat?
            </h1>
            <TransparencyBadge source="estimated" />
          </div>
          <p className="text-[14px] text-zinc-500">
            Enter your rank and a college to get a detailed explanation of why you did or didn&apos;t get a seat.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">Your NEET Rank</label>
              <input
                type="number"
                value={rank || ""}
                onChange={(e) => setRank(parseInt(e.target.value) || 0)}
                placeholder="e.g. 12450"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">College</label>
              <select
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors"
              >
                <option value="">Select a college</option>
                {filteredColleges.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.city}, {c.state})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors"
              >
                {allIndiaCategories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">Quota</label>
              <div className="flex gap-2">
                {(["aiq", "state"] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuota(q)}
                    className={`flex-1 py-3 rounded-xl border text-[13px] font-medium transition-all ${
                      quota === q
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    {q === "aiq" ? "All India Quota (15%)" : "State Quota (85%)"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-zinc-700 block mb-1.5">Counselling Round</label>
              <select
                value={round}
                onChange={(e) => setRound(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors"
              >
                <option value="round1">Round 1</option>
                <option value="round2">Round 2</option>
                <option value="mopUp">Mop-Up Round</option>
                <option value="stray">Stray Vacancy</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleExplain}
            disabled={!collegeId || rank <= 0}
            className="mt-5 w-full flex items-center justify-center gap-2 bg-zinc-900 text-white text-[13px] font-semibold px-5 py-3 rounded-xl hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Search className="h-4 w-4" />
            Explain Allocation
          </button>
        </div>

        {result && <ExplanationPanel explanation={result} />}

        {!result && (
          <div className="text-center py-12">
            <AlertCircle className="h-10 w-10 text-zinc-200 mx-auto mb-3" />
            <p className="text-[13px] text-zinc-400">
              Enter your rank and select a college to see a detailed explanation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
