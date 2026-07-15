import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  Building2,
  CheckCircle2,
  XCircle,
  Briefcase,
  Users,
  Star,
} from "lucide-react";
import { careers, getCareerBySlug } from "@/data/careers";
import { CareerIcon } from "@/components/careers/CareerIcon";

export function generateStaticParams() {
  return careers.map((career) => ({
    career: career.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ career: string }>;
}) {
  const { career: slug } = await params;
  const career = getCareerBySlug(slug);
  if (!career) return { title: "Career Not Found" };
  return {
    title: `${career.title} | DreamRoute`,
    description: career.shortDescription,
  };
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-zinc-500">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-5 h-[6px] rounded-full transition-colors ${
              i <= value ? "bg-zinc-900" : "bg-zinc-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ career: string }>;
}) {
  const { career: slug } = await params;
  const career = getCareerBySlug(slug);

  if (!career) {
    notFound();
  }

  const levelColors = {
    beginner: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    intermediate: "bg-amber-50 text-amber-700 border border-amber-200/60",
    advanced: "bg-rose-50 text-rose-700 border border-rose-200/60",
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Back */}
        <Link
          href="/careers"
          className="text-zinc-400 hover:text-zinc-900 text-[13px] font-medium inline-flex items-center gap-1.5 mb-10 transition-colors duration-150"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Careers
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
              <CareerIcon name={career.icon} className="h-6 w-6 text-zinc-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em]">
                {career.title}
              </h1>
              <p className="text-[16px] text-zinc-500 mt-2 leading-relaxed">
                {career.shortDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-[12px] bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full font-semibold">
                  {career.category.charAt(0).toUpperCase() + career.category.slice(1)}
                </span>
                {career.educationRequired && (
                  <span className="text-[12px] bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full font-semibold">
                    {career.educationRequired.split(" + ")[0]}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {career.salaryRange.entry && (
            <div className="bg-white rounded-xl border border-zinc-200 p-4">
              <DollarSign className="h-4 w-4 text-zinc-400 mb-2" />
              <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Entry</p>
              <p className="text-[14px] font-bold text-zinc-900 mt-0.5">{career.salaryRange.entry}</p>
            </div>
          )}
          {career.educationRequired && (
            <div className="bg-white rounded-xl border border-zinc-200 p-4">
              <Briefcase className="h-4 w-4 text-zinc-400 mb-2" />
              <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Education</p>
              <p className="text-[14px] font-bold text-zinc-900 mt-0.5 truncate">{career.educationRequired.split(" + ")[0]}</p>
            </div>
          )}
          {career.skills && (
            <div className="bg-white rounded-xl border border-zinc-200 p-4">
              <Target className="h-4 w-4 text-zinc-400 mb-2" />
              <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Skills</p>
              <p className="text-[14px] font-bold text-zinc-900 mt-0.5">{career.skills.length}</p>
            </div>
          )}
          {career.workLifeBalance !== undefined && (
            <div className="bg-white rounded-xl border border-zinc-200 p-4">
              <Star className="h-4 w-4 text-zinc-400 mb-2" />
              <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Balance</p>
              <p className="text-[14px] font-bold text-zinc-900 mt-0.5">{career.workLifeBalance}/5</p>
            </div>
          )}
        </div>

        {/* Day in Life */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-7 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-zinc-400" />
            <h2 className="text-[15px] font-bold text-zinc-900">A day in the life</h2>
          </div>
          <p className="text-[14px] text-zinc-500 leading-relaxed">{career.dayInLife}</p>
        </div>

        {/* Salary & Growth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-2xl border border-zinc-200 p-7">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-4 w-4 text-zinc-400" />
              <h2 className="text-[15px] font-bold text-zinc-900">Salary range</h2>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Entry", value: career.salaryRange.entry },
                { label: "Mid", value: career.salaryRange.mid },
                { label: "Senior", value: career.salaryRange.senior },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-[13px] text-zinc-500">{item.label}</span>
                  <span className="text-[13px] font-semibold text-zinc-900">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 mt-4">{career.salaryRange.source}</p>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-7">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-zinc-400" />
              <h2 className="text-[15px] font-bold text-zinc-900">Growth outlook</h2>
            </div>
            <p className="text-[14px] text-zinc-500 leading-relaxed">{career.growthOutlook}</p>
          </div>
        </div>

        {/* Work Ratings */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-7 mb-4">
          <h2 className="text-[15px] font-bold text-zinc-900 mb-5">Work ratings</h2>
          <div className="space-y-3">
            <RatingBar label="Work-Life Balance" value={career.workLifeBalance} />
            <RatingBar label="Stress Level" value={career.stressLevel} />
            <RatingBar label="Creative Freedom" value={career.creativeFreedom} />
            <RatingBar label="Job Security" value={career.jobSecurity} />
            <RatingBar label="Remote Work" value={career.remoteWork} />
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-2xl border border-zinc-200 p-7">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <h2 className="text-[15px] font-bold text-zinc-900">Pros</h2>
            </div>
            <ul className="space-y-2">
              {career.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] text-zinc-600">
                  <span className="text-emerald-500 mt-0.5 text-[13px]">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-zinc-200 p-7">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-4 w-4 text-rose-400" />
              <h2 className="text-[15px] font-bold text-zinc-900">Cons</h2>
            </div>
            <ul className="space-y-2">
              {career.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] text-zinc-600">
                  <span className="text-rose-400 mt-0.5 text-[13px]">&minus;</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interview Process */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-7 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-zinc-400" />
            <h2 className="text-[15px] font-bold text-zinc-900">Interview process</h2>
          </div>
          <p className="text-[14px] text-zinc-500 leading-relaxed">{career.interviewProcess}</p>
        </div>

        {/* Key Companies */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-7 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-4 w-4 text-zinc-400" />
            <h2 className="text-[15px] font-bold text-zinc-900">Key companies</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {career.keyCompanies.map((company, i) => (
              <span
                key={i}
                className="bg-zinc-50 text-zinc-600 border border-zinc-200 px-3 py-1.5 rounded-lg text-[13px] font-medium"
              >
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-7 mb-4">
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-4 w-4 text-zinc-400" />
            <h2 className="text-[15px] font-bold text-zinc-900">Skills to learn</h2>
          </div>
          <div className="space-y-2">
            {career.skills.map((skill, index) => (
              <Link
                key={skill.id}
                href={`/careers/${career.slug}/${skill.id}`}
                className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-150 group"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-zinc-100 text-zinc-500 w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[14px] font-semibold text-zinc-900 group-hover:text-zinc-900 transition-colors duration-150">
                      {skill.name}
                    </h3>
                    <p className="text-[13px] text-zinc-400 mt-0.5">{skill.whyItMatters}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-zinc-400 hidden sm:inline">{skill.estimatedTime}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${levelColors[skill.level]}`}>
                    {skill.level}
                  </span>
                  <ArrowLeft className="h-3 w-3 text-zinc-300 rotate-180 group-hover:text-zinc-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Careers */}
        {career.relatedCareers && career.relatedCareers.length > 0 && (
          <div className="bg-white rounded-2xl border border-zinc-200 p-7 mb-4">
            <h2 className="text-[15px] font-bold text-zinc-900 mb-4">Related careers</h2>
            <div className="flex flex-wrap gap-2">
              {career.relatedCareers.map((relatedId) => {
                const related = getCareerBySlug(relatedId);
                if (!related) return null;
                return (
                  <Link
                    key={relatedId}
                    href={`/careers/${related.slug}`}
                    className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 hover:border-zinc-300 hover:bg-white transition-all duration-150 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                      <CareerIcon name={related.icon} className="h-4 w-4 text-zinc-600" />
                    </div>
                    <span className="text-[13px] font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors">
                      {related.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* About */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-7">
          <h2 className="text-[15px] font-bold text-zinc-900 mb-3">About this career</h2>
          <p className="text-[14px] text-zinc-500 leading-relaxed">{career.description}</p>
        </div>
      </div>
    </div>
  );
}
