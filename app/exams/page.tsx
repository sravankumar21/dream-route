import Link from "next/link";
import { FileText, Target, Calendar, ChevronRight } from "lucide-react";
import { exams } from "@/data/exams";

export const metadata = {
  title: "Exam Targets | DreamRoute",
  description: "Know exactly what score you need. Blind targets for EAMCET, NEET, JEE Main, GATE, CAT — rank, seat type, and what to focus on.",
};

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="mb-12">
          <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.12em] mb-3">Targets</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em] mb-3">
            Exam score targets
          </h1>
          <p className="text-[15px] text-zinc-500 max-w-lg">
            Know exactly what score gets you what seat. Rank-wise breakdown with preparation focus areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams.map((exam) => (
            <Link
              key={exam.id}
              href={`/exams/${exam.id}`}
              className="h-full flex flex-col bg-white rounded-2xl border border-zinc-200 p-6 hover:border-zinc-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-[18px] font-bold text-zinc-900 tracking-[-0.01em] group-hover:text-zinc-900 transition-colors">
                    {exam.name}
                  </h2>
                  <p className="text-[13px] text-zinc-400 mt-0.5">{exam.conductedBy}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-300 group-hover:text-zinc-500 mt-1 transition-colors" />
              </div>

              <p className="text-[13px] text-zinc-500 mb-4 line-clamp-2 flex-1">
                {exam.fullName}
              </p>

              <div className="flex flex-wrap gap-3 text-[12px] text-zinc-500 mb-4">
                <span className="flex items-center gap-1">
                  <Target className="h-3 w-3 text-zinc-400" />
                  {exam.totalMarks} marks
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-zinc-400" />
                  {exam.duration}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3 text-zinc-400" />
                  {exam.mode}
                </span>
              </div>

              <div className="border-t border-zinc-100 pt-3">
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Top targets</p>
                <div className="space-y-1.5">
                  {exam.rankTargets.slice(0, 3).map((target) => (
                    <div key={target.rankRange} className="flex items-center justify-between text-[12px]">
                      <span className="text-zinc-600 font-medium">Rank {target.rankRange}</span>
                      <span className="text-zinc-400">Score {target.scoreRange}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
