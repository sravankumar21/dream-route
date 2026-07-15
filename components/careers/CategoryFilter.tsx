import Link from "next/link";
import { careerCategories } from "@/data/careers";
import { careers } from "@/data/careers";

export default function CategoryFilter({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <Link
        href="/careers"
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          !active
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
        }`}
      >
        All Careers ({careers.length})
      </Link>
      {careerCategories.map((cat) => {
        const count = careers.filter((c) => c.category === cat.id).length;
        return (
          <Link
            key={cat.id}
            href={`/careers?category=${cat.id}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              active === cat.id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
            }`}
          >
            {cat.icon} {cat.name} ({count})
          </Link>
        );
      })}
    </div>
  );
}
