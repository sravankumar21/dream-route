import { DollarSign } from "lucide-react";

interface SalaryData {
  entry: string;
  mid: string;
  senior: string;
  source: string;
}

export default function SalaryInsights({ salary }: { salary: SalaryData }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-5 w-5 text-green-600" />
        <h2 className="text-xl font-bold text-gray-900">Salary Range</h2>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Entry Level</span>
          <span className="font-semibold text-gray-900">{salary.entry}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Mid Level</span>
          <span className="font-semibold text-gray-900">{salary.mid}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Senior Level</span>
          <span className="font-semibold text-gray-900">{salary.senior}</span>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4">Source: {salary.source}</p>
    </div>
  );
}
