"use client";

import { medicalColleges } from "@/data/counselling/colleges";
import { closingRanks } from "@/data/counselling/historical";

interface Props {
  selectedState?: string;
}

const categories = ["General", "OBC-NCL", "SC", "ST", "EWS"];
const states = [...new Set(medicalColleges.map((c) => c.state))].sort();

export function SeatHeatmap({ selectedState }: Props) {
  const filteredColleges = selectedState
    ? medicalColleges.filter((c) => c.state === selectedState)
    : medicalColleges.filter((c) => c.type === "government").slice(0, 12);

  const getSeatsForCell = (collegeId: string, category: string) => {
    const entry = closingRanks.find(
      (r) => r.collegeId === collegeId && r.category === category && r.year === 2025 && r.quota === "aiq"
    );
    return entry?.seats ?? 0;
  };

  const getIntensity = (seats: number): string => {
    if (seats === 0) return "bg-zinc-50 text-zinc-300";
    if (seats <= 5) return "bg-emerald-50 text-emerald-700";
    if (seats <= 10) return "bg-emerald-100 text-emerald-800";
    if (seats <= 20) return "bg-emerald-200 text-emerald-900";
    return "bg-emerald-300 text-emerald-900 font-bold";
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 overflow-x-auto">
      <h3 className="text-[15px] font-bold text-zinc-900 mb-4">
        Seat Availability Heatmap — {selectedState || "All India (Govt Medical Colleges)"}
      </h3>
      <p className="text-[12px] text-zinc-500 mb-4">AIQ seats per category (15% All India Quota). Darker = more seats available.</p>

      <table className="w-full text-[12px]">
        <thead>
          <tr>
            <th className="text-left p-2 font-semibold text-zinc-700 border-b border-zinc-200 min-w-[180px]">College</th>
            {categories.map((cat) => (
              <th key={cat} className="p-2 font-semibold text-zinc-700 border-b border-zinc-200 text-center min-w-[70px]">
                {cat}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredColleges.map((college) => (
            <tr key={college.id} className="hover:bg-zinc-50 transition-colors">
              <td className="p-2 border-b border-zinc-100">
                <div className="font-medium text-zinc-900 text-[12px] truncate">{college.shortName}</div>
                <div className="text-[10px] text-zinc-400">{college.city}</div>
              </td>
              {categories.map((cat) => {
                const seats = getSeatsForCell(college.id, cat);
                return (
                  <td key={cat} className={`p-2 text-center border-b border-zinc-100 rounded-md ${getIntensity(seats)}`}>
                    {seats > 0 ? seats : "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
