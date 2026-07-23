import { medicalColleges, getTotalSeats } from "@/data/counselling/colleges";
import { closingRanks } from "@/data/counselling/historical";
import { getAllStates } from "@/data/counselling/colleges";

export function StatsOverview() {
  const totalColleges = medicalColleges.length;
  const totalSeats = getTotalSeats();
  const totalStates = getAllStates().length;
  const dataYears = [2023, 2024, 2025];
  const totalDataPoints = closingRanks.length;

  const stats = [
    { label: "Medical Colleges", value: totalColleges.toLocaleString(), sub: "across India" },
    { label: "Total MBBS Seats", value: totalSeats.toLocaleString(), sub: "tracked" },
    { label: "States Covered", value: totalStates.toLocaleString(), sub: "with state data" },
    { label: "Data Points", value: totalDataPoints.toLocaleString(), sub: "closing ranks tracked" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-2xl border border-zinc-200 p-5 text-center">
          <div className="text-[24px] font-extrabold text-zinc-900 tracking-[-0.02em]">
            {stat.value}
          </div>
          <div className="text-[13px] font-semibold text-zinc-700 mt-1">{stat.label}</div>
          <div className="text-[11px] text-zinc-400 mt-0.5">{stat.sub}</div>
        </div>
      ))}
    </div>
  );
}
