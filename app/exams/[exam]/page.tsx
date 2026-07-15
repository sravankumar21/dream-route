import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Target, BookOpen, Calendar, Clock, Monitor, CheckCircle } from "lucide-react";
import { exams, getExamById } from "@/data/exams";

export function generateStaticParams() {
  return exams.map((exam) => ({ exam: exam.id }));
}

export function generateMetadata({ params }: { params: Promise<{ exam: string }> }) {
  return params.then(({ exam }) => {
    const data = getExamById(exam);
    if (!data) return { title: "Exam Not Found" };
    return {
      title: `${data.name} Score Targets | DreamRoute`,
      description: `Score vs rank breakdown for ${data.name}. Know what score gets you what seat.`,
    };
  });
}

export default async function ExamDetailPage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam: examId } = await params;
  const exam = getExamById(examId);
  if (!exam) notFound();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        {/* Back */}
        <Link
          href="/exams"
          className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-zinc-900 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All exams
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em] mb-2">
            {exam.name}
          </h1>
          <p className="text-[15px] text-zinc-500">{exam.fullName}</p>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Target, label: "Total marks", value: exam.totalMarks },
            { icon: Clock, label: "Duration", value: exam.duration },
            { icon: Monitor, label: "Mode", value: exam.mode },
            { icon: BookOpen, label: "Conducted by", value: exam.conductedBy },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-zinc-200 p-4">
              <item.icon className="h-4 w-4 text-zinc-400 mb-2" />
              <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">{item.label}</p>
              <p className="text-[14px] font-bold text-zinc-900 mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Pattern & Eligibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-[15px] font-bold text-zinc-900 mb-2">Exam pattern</h2>
            <p className="text-[14px] text-zinc-500">{exam.pattern}</p>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-6">
            <h2 className="text-[15px] font-bold text-zinc-900 mb-2">Eligibility</h2>
            <p className="text-[14px] text-zinc-500">{exam.eligibility}</p>
          </div>
        </div>

        {/* Score Targets */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-4 w-4 text-zinc-400" />
            <h2 className="text-[15px] font-bold text-zinc-900">Score vs Rank — What you need</h2>
          </div>

          <div className="space-y-4">
            {exam.rankTargets.map((target) => (
              <div key={target.rankRange} className="border border-zinc-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[14px] font-bold text-zinc-900">Rank {target.rankRange}</span>
                    <span className="text-[13px] text-zinc-400 mx-2">|</span>
                    <span className="text-[14px] font-semibold text-blue-600">Score {target.scoreRange}</span>
                  </div>
                </div>

                <p className="text-[13px] text-zinc-600 mb-3 bg-zinc-50 rounded-lg px-3 py-2">
                  {target.seatType}
                </p>

                <div>
                  <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Focus areas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {target.whatToFocus.map((tip) => (
                      <span key={tip} className="text-[12px] bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-md font-medium">
                        {tip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Dates */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-4 w-4 text-zinc-400" />
            <h2 className="text-[15px] font-bold text-zinc-900">Important dates (tentative)</h2>
          </div>
          <div className="space-y-2.5">
            {exam.importantDates.map((d) => (
              <div key={d.event} className="flex items-center justify-between text-[14px]">
                <span className="text-zinc-600">{d.event}</span>
                <span className="font-semibold text-zinc-900">{d.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Tips */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-4 w-4 text-zinc-400" />
            <h2 className="text-[15px] font-bold text-zinc-900">Preparation tips</h2>
          </div>
          <ul className="space-y-2.5">
            {exam.preparationTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-[14px] text-zinc-600">
                <span className="text-emerald-500 mt-0.5 text-[13px]">&#10003;</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Official Links */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7">
          <h2 className="text-[15px] font-bold text-zinc-900 mb-4">Official links</h2>
          <div className="space-y-2">
            <a
              href={exam.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[14px] text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Official website — {exam.name}
            </a>
            <a
              href={exam.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[14px] text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Apply / Registration portal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
