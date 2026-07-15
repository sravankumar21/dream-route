import type { Career } from "@/data/careers";
import SkillCard from "./SkillCard";

export default function SkillTree({ career }: { career: Career }) {
  return (
    <div className="space-y-4">
      {career.skills.map((skill, index) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          careerSlug={career.slug}
          index={index}
        />
      ))}
    </div>
  );
}
