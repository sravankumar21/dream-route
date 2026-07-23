"use client";

import { getClosingRankTrend } from "@/data/counselling/historical";

interface Props {
  collegeId: string;
  category: string;
  quota: "aiq" | "state";
  width?: number;
  height?: number;
}

export function ClosingRankChart({ collegeId, category, quota, width = 400, height = 200 }: Props) {
  const data = getClosingRankTrend(collegeId, category, quota);

  if (data.length === 0) {
    return (
      <div className="bg-zinc-50 rounded-xl p-6 text-center text-[13px] text-zinc-500">
        No historical closing rank data available for this combination.
      </div>
    );
  }

  const maxRank = Math.max(...data.map((d) => d.closingRank));
  const minRank = Math.min(...data.map((d) => d.closingRank));
  const range = maxRank - minRank || 1;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1 || 1)) * chartWidth,
    y: padding + ((maxRank - d.closingRank) / range) * chartHeight,
    year: d.year,
    rank: d.closingRank,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding + chartHeight} L ${points[0].x} ${padding + chartHeight} Z`;

  const trendDirection = data.length >= 2
    ? data[data.length - 1].closingRank > data[0].closingRank ? "increasing" : data[data.length - 1].closingRank < data[0].closingRank ? "decreasing" : "stable"
    : "stable";

  return (
    <div className="bg-zinc-50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[13px] font-bold text-zinc-900">Closing Rank Trend</h4>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
          trendDirection === "increasing"
            ? "text-emerald-600 bg-emerald-50"
            : trendDirection === "decreasing"
            ? "text-red-500 bg-red-50"
            : "text-zinc-600 bg-zinc-100"
        }`}>
          {trendDirection === "increasing" ? "↗ Easing" : trendDirection === "decreasing" ? "↘ Tightening" : "→ Stable"}
        </span>
      </div>

      <svg width={width} height={height} className="w-full h-auto">
        <defs>
          <linearGradient id={`gradient-${collegeId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding + ratio * chartHeight;
          const rank = Math.round(maxRank - ratio * range);
          return (
            <g key={i}>
              <line x1={padding} y1={y} x2={padding + chartWidth} y2={y} stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4,4" />
              <text x={padding - 8} y={y + 4} textAnchor="end" fill="#a1a1aa" fontSize="10">
                {rank.toLocaleString()}
              </text>
            </g>
          );
        })}

        <path d={areaD} fill={`url(#gradient-${collegeId})`} />
        <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="white" stroke="#6366f1" strokeWidth="2.5" />
            <text x={p.x} y={padding + chartHeight + 18} textAnchor="middle" fill="#71717a" fontSize="11" fontWeight="600">
              {p.year}
            </text>
            <text x={p.x} y={p.y - 10} textAnchor="middle" fill="#3f3f46" fontSize="10" fontWeight="600">
              {p.rank.toLocaleString()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
