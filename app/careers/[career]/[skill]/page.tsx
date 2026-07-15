import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Video,
  FileText,
  Wrench,
  Code,
  Clock,
  AlertTriangle,
  Target,
  BarChart3,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { careers, getCareerBySlug, getSkillBySlug } from "@/data/careers";

export function generateStaticParams() {
  const params: { career: string; skill: string }[] = [];
  careers.forEach((career) => {
    career.skills.forEach((skill) => {
      params.push({ career: career.slug, skill: skill.id });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ career: string; skill: string }>;
}) {
  const { career: careerSlug, skill: skillId } = await params;
  const skill = getSkillBySlug(careerSlug, skillId);
  if (!skill) return { title: "Skill Not Found" };
  const career = getCareerBySlug(careerSlug);
  return {
    title: `${skill.name} — ${career?.title || ""} | DreamRoute`,
    description: skill.whyItMatters,
  };
}

const resourceTypeIcons = {
  course: BookOpen,
  video: Video,
  article: FileText,
  tool: Wrench,
  book: BookOpen,
  practice: Code,
};

const difficultyColors = {
  easy: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  medium: "bg-amber-50 text-amber-700 border border-amber-200/60",
  hard: "bg-rose-50 text-rose-700 border border-rose-200/60",
};

const marketDemandColors = {
  high: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  medium: "bg-amber-50 text-amber-700 border border-amber-200/60",
  low: "bg-zinc-100 text-zinc-600 border border-zinc-200/60",
};

const levelColors = {
  beginner: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  intermediate: "bg-amber-50 text-amber-700 border border-amber-200/60",
  advanced: "bg-rose-50 text-rose-700 border border-rose-200/60",
};

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ career: string; skill: string }>;
}) {
  const { career: careerSlug, skill: skillId } = await params;
  const career = getCareerBySlug(careerSlug);
  const skill = getSkillBySlug(careerSlug, skillId);

  if (!career || !skill) {
    notFound();
  }

  const uniqueResources = skill.resources.filter((r, i, arr) => {
    if (arr.findIndex((x) => x.url === r.url) !== i) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-zinc-400 mb-10">
          <Link href="/careers" className="hover:text-zinc-900 transition-colors">Careers</Link>
          <span>/</span>
          <Link href={`/careers/${career.slug}`} className="hover:text-zinc-900 transition-colors">{career.title}</Link>
          <span>/</span>
          <span className="text-zinc-700 font-medium">{skill.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em]">
                {skill.name}
              </h1>
              <p className="text-[16px] text-zinc-500 mt-2 leading-relaxed">{skill.whyItMatters}</p>
            </div>
            <span className={`text-[11px] px-2.5 py-1 rounded-md font-semibold ${levelColors[skill.level]}`}>
              {skill.level}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {skill.estimatedTime && (
            <div className="bg-white rounded-xl border border-zinc-200 p-4">
              <Clock className="h-4 w-4 text-zinc-400 mb-2" />
              <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Time</p>
              <p className="text-[14px] font-bold text-zinc-900 mt-0.5">{skill.estimatedTime}</p>
            </div>
          )}
          {skill.difficulty && (
            <div className="bg-white rounded-xl border border-zinc-200 p-4">
              <BarChart3 className="h-4 w-4 text-zinc-400 mb-2" />
              <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Difficulty</p>
              <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold mt-0.5 inline-block ${difficultyColors[skill.difficulty]}`}>
                {skill.difficulty}
              </span>
            </div>
          )}
          {skill.marketDemand && (
            <div className="bg-white rounded-xl border border-zinc-200 p-4">
              <TrendingUp className="h-4 w-4 text-zinc-400 mb-2" />
              <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Demand</p>
              <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold mt-0.5 inline-block ${marketDemandColors[skill.marketDemand]}`}>
                {skill.marketDemand}
              </span>
            </div>
          )}
          {skill.prerequisites && skill.prerequisites.length > 0 && (
            <div className="bg-white rounded-xl border border-zinc-200 p-4">
              <AlertTriangle className="h-4 w-4 text-zinc-400 mb-2" />
              <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Prereqs</p>
              <p className="text-[14px] font-bold text-zinc-900 mt-0.5">{skill.prerequisites.length}</p>
            </div>
          )}
        </div>

        {/* Prerequisites */}
        {skill.prerequisites && skill.prerequisites.length > 0 && (
          <div className="bg-white rounded-2xl border border-zinc-200 p-7 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h2 className="text-[15px] font-bold text-zinc-900">Prerequisites</h2>
            </div>
            <p className="text-[13px] text-zinc-400 mb-3">Learn these first:</p>
            <div className="flex flex-wrap gap-2">
              {skill.prerequisites.map((preId) => {
                for (const c of careers) {
                  const preSkill = c.skills.find((s) => s.id === preId);
                  if (preSkill) {
                    return (
                      <Link
                        key={preId}
                        href={`/careers/${c.slug}/${preId}`}
                        className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 text-zinc-700 px-3 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-white hover:border-zinc-300 transition-all duration-150"
                      >
                        {preSkill.name}
                        <ExternalLink className="h-3 w-3 text-zinc-400" />
                      </Link>
                    );
                  }
                }
                return (
                  <span key={preId} className="bg-zinc-50 border border-zinc-200 text-zinc-500 px-3 py-1.5 rounded-lg text-[13px] font-medium">
                    {preId}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Success Criteria */}
        {skill.successCriteria && (
          <div className="bg-white rounded-2xl border border-zinc-200 p-7 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <h2 className="text-[15px] font-bold text-zinc-900">Mastery criteria</h2>
            </div>
            <p className="text-[14px] text-zinc-500 leading-relaxed">{skill.successCriteria}</p>
          </div>
        )}

        {/* Projects */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-7 mb-4">
          <h2 className="text-[15px] font-bold text-zinc-900 mb-1">Projects to build</h2>
          <p className="text-[13px] text-zinc-400 mb-5">Learn by doing. These prove you understand the skill.</p>
          <div className="space-y-2">
            {skill.projects.map((project, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                <span className="bg-zinc-200 text-zinc-600 w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-[14px] text-zinc-600">{project}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-7">
          <h2 className="text-[15px] font-bold text-zinc-900 mb-6">Free learning resources</h2>
          <div className="space-y-2">
            {uniqueResources.map((resource, index) => {
              const Icon = resourceTypeIcons[resource.type] || BookOpen;
              return (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-150 group"
                >
                  <div className="bg-zinc-100 w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-200 transition-colors">
                    <Icon className="h-4 w-4 text-zinc-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-semibold text-zinc-900 group-hover:text-zinc-900 transition-colors duration-150">
                        {resource.title}
                      </h3>
                      <ExternalLink className="h-3 w-3 text-zinc-300 flex-shrink-0" />
                    </div>
                    {"description" in resource && typeof resource.description === "string" && (
                      <p className="text-[13px] text-zinc-400 mt-0.5 leading-relaxed">{resource.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[12px] text-zinc-400">{resource.platform}</span>
                      <span className="text-[11px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-md font-medium capitalize">
                        {resource.type}
                      </span>
                      {resource.free && (
                        <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-md font-semibold">
                          Free
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Back */}
        <div className="mt-8 text-center">
          <Link
            href={`/careers/${career.slug}`}
            className="text-[14px] text-zinc-400 hover:text-zinc-900 font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to {career.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
