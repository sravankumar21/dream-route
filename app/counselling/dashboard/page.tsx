"use client";

import { useState } from "react";
import Link from "next/link";
import { SeatHeatmap } from "@/components/counselling/SeatHeatmap";
import { ClosingRankChart } from "@/components/counselling/ClosingRankChart";
import { TransparencyBadge } from "@/components/counselling/TransparencyBadge";
import { getAllStates, medicalColleges } from "@/data/counselling/colleges";
import { closingRanks, seatMovements } from "@/data/counselling/historical";
import { ArrowLeft, TrendingUp, ArrowUpRight, ArrowDownRight, Minus, BarChart3 } from "lucide-react";

export default function DashboardPage() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCollege, setSelectedCollege] = useState<string>("dl-govt-medical-001");

  const states = getAllStates();
  const governmentColleges = medicalColleges.filter((c) => c.type === "government");

  const totalSeats = governmentColleges.reduce((sum, c) => sum + c.totalSeats, 0);
  const totalDataPoints = closingRanks.length;
  const totalMovements = seatMovements.length;

  const recentTrends = governmentColleges.slice(0, 6).map((college) => {
    const data2025 = closingRanks.find(
      (r) => r.collegeId === college.id && r.year === 2025 && r.category === "General" && r.quota === "aiq" && r.round === "round1"
    );
    const data2024 = closingRanks.find(
      (r) => r.collegeId === college.id && r.year === 2024 && r.category === "General" && r.quota === "aiq" && r.round === "round1"
    );

    const trend = data2025 && data2024
      ? data2025.closingRank > data2024.closingRank
        ? "up"
        : data2025.closingRank < data2024.closingRank
        ? "down"
        : "stable"
      : "stable";

    return {
      college,
      closingRank2025: data2025?.closingRank,
      closingRank2024: data2024?.closingRank,
      trend,
    };
  });

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
              Transparency Dashboard
            </h1>
            <TransparencyBadge source="official" />
            <TransparencyBadge source="historical" />
          </div>
          <p className="text-[14px] text-zinc-500">
            Aggregated data on seat availability, closing rank trends, and allocation patterns. All data labeled by source type.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 text-center">
            <div className="text-[22px] font-extrabold text-zinc-900">{governmentColleges.length}</div>
            <div className="text-[12px] text-zinc-500 mt-1">Govt Medical Colleges</div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 text-center">
            <div className="text-[22px] font-extrabold text-zinc-900">{totalSeats.toLocaleString()}</div>
            <div className="text-[12px] text-zinc-500 mt-1">Total MBBS Seats</div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 text-center">
            <div className="text-[22px] font-extrabold text-zinc-900">{totalDataPoints}</div>
            <div className="text-[12px] text-zinc-500 mt-1">Closing Rank Data Points</div>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-5 text-center">
            <div className="text-[22px] font-extrabold text-zinc-900">{totalMovements}</div>
            <div className="text-[12px] text-zinc-500 mt-1">Seat Movements Tracked</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6">
            <h3 className="text-[15px] font-bold text-zinc-900 mb-4">Closing Rank Trends — Top Colleges</h3>
            <div className="space-y-3">
              {recentTrends.map(({ college, closingRank2025, closingRank2024, trend }) => (
                <div key={college.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl">
                  <div>
                    <div className="text-[13px] font-semibold text-zinc-900">{college.shortName}</div>
                    <div className="text-[11px] text-zinc-500">{college.city}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[12px] font-bold text-zinc-900">
                        {closingRank2025?.toLocaleString() || "—"}
                      </div>
                      <div className="text-[10px] text-zinc-400">2025</div>
                    </div>
                    {closingRank2024 && (
                      <div className="text-right">
                        <div className="text-[11px] text-zinc-500">
                          {closingRank2024.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-zinc-400">2024</div>
                      </div>
                    )}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      trend === "up"
                        ? "bg-emerald-50 text-emerald-600"
                        : trend === "down"
                        ? "bg-red-50 text-red-500"
                        : "bg-zinc-100 text-zinc-400"
                    }`}>
                      {trend === "up" ? (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      ) : trend === "down" ? (
                        <ArrowDownRight className="h-3.5 w-3.5" />
                      ) : (
                        <Minus className="h-3.5 w-3.5" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-6">
            <h3 className="text-[15px] font-bold text-zinc-900 mb-4">Closing Rank Trend Chart</h3>
            <div className="mb-4">
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-[13px] text-zinc-900 focus:outline-none focus:border-zinc-400 transition-colors"
              >
                {governmentColleges.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <ClosingRankChart
              collegeId={selectedCollege}
              category="General"
              quota="aiq"
            />
          </div>
        </div>

        <div className="mb-8">
          <SeatHeatmap selectedState={selectedState || undefined} />
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-[12px] text-zinc-500">Filter by state:</span>
            <button
              onClick={() => setSelectedState("")}
              className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${
                !selectedState ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              All India
            </button>
            {states.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedState(s)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${
                  selectedState === s ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-zinc-400" />
            <h3 className="text-[15px] font-bold text-zinc-900">Seat Movement Between Rounds</h3>
          </div>
          <p className="text-[12px] text-zinc-500 mb-4">Tracked seat movements from Round 1 to Round 2 and Mop-Up for 2025 counselling.</p>
          <div className="space-y-3">
            {seatMovements.map((movement, i) => {
              const college = medicalColleges.find((c) => c.id === movement.collegeId);
              return (
                <div key={i} className="flex items-center gap-4 p-3 bg-zinc-50 rounded-xl">
                  <div className="flex-1">
                    <div className="text-[12px] font-semibold text-zinc-900">{college?.shortName || movement.collegeId}</div>
                    <div className="text-[11px] text-zinc-500">
                      {movement.fromRound} → {movement.toRound} • {movement.category}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] font-bold text-red-500">-{movement.seatsVacated} vacated</div>
                    <div className="text-[12px] font-bold text-emerald-600">+{movement.seatsFilled} filled</div>
                  </div>
                  <div className="text-[10px] text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-md">
                    {movement.reason}
                  </div>
                  <TransparencyBadge source={movement.source} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-6">
          <h3 className="text-[15px] font-bold text-zinc-900 mb-3">Data Source Disclaimer</h3>
          <div className="space-y-2 text-[12px] text-zinc-600 leading-relaxed">
            <p>
              <TransparencyBadge source="official" className="mr-2" />
              Data sourced from official counselling authority websites (MCC, state counselling boards). This is verified and up-to-date.
            </p>
            <p>
              <TransparencyBadge source="historical" className="mr-2" />
              Historical data from previous counselling years. Based on publicly available records and may not reflect current year exactly.
            </p>
            <p>
              <TransparencyBadge source="estimated" className="mr-2" />
              Estimates based on historical trends and available data. May not reflect exact current values. For reference only.
            </p>
            <p>
              <TransparencyBadge source="ai-generated" className="mr-2" />
              AI-generated estimates based on data patterns. For informational purposes only.
            </p>
            <p className="mt-3 text-[11px] text-zinc-400">
              For official and verified data, always refer to{" "}
              <a href="https://mcc.nic.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-600">
                mcc.nic.in
              </a>{" "}
              and your state counselling authority website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
