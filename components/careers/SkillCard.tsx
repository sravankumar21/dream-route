import Link from "next/link";
import type { Skill } from "@/data/careers";

const levelColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
};

export default function SkillCard({
  skill,
  careerSlug,
  index,
}: {
  skill: Skill;
  careerSlug: string;
  index: number;
}) {
  return (
    <Link
      href={`/careers/${careerSlug}/${skill.id}`}
      className="block p-4 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-zinc-100 text-zinc-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            {index + 1}
          </span>
          <div>
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-900">
              {skill.name}
            </h3>
            <p className="text-sm text-zinc-500">{skill.whyItMatters}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${levelColors[skill.level]}`}>
            {skill.level}
          </span>
          <span className="text-zinc-400 group-hover:text-zinc-600">&rarr;</span>
        </div>
      </div>
    </Link>
  );
}
