import Link from "next/link";
import { careers, careerCategories, searchCareers } from "@/data/careers";
import CareerCard from "@/components/careers/CareerCard";
import { CareerIcon } from "@/components/careers/CareerIcon";

export const metadata = {
  title: "Career Paths | DreamRoute",
  description: "Explore 18+ career paths. See exactly what skills you need to learn.",
};

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const categoryFilter = params.category || "all";
  const searchQuery = params.search || "";

  let filteredCareers =
    categoryFilter === "all"
      ? careers
      : careers.filter((c) => c.category === categoryFilter);

  if (searchQuery) {
    filteredCareers = searchCareers(searchQuery);
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.12em] mb-3">Browse</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em] mb-3">
            {searchQuery ? `Results for "${searchQuery}"` : "Career Paths"}
          </h1>
          <p className="text-zinc-500 max-w-lg mx-auto text-[15px]">
            {searchQuery
              ? `${filteredCareers.length} career${filteredCareers.length !== 1 ? "s" : ""} found`
              : "Pick a career. We'll show you exactly what skills to learn."}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          <Link
            href="/careers"
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-150 ${
              categoryFilter === "all"
                ? "bg-zinc-900 text-white"
                : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900"
            }`}
          >
            All ({careers.length})
          </Link>
          {careerCategories.map((cat) => {
            const count = careers.filter((c) => c.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/careers?category=${cat.id}`}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-150 ${
                  categoryFilter === cat.id
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900"
                }`}
              >
                <CareerIcon name={cat.icon} className="h-3.5 w-3.5" />
                {cat.name} ({count})
              </Link>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCareers.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>

        {filteredCareers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-[15px]">No careers in this category.</p>
            <Link href="/careers" className="text-zinc-900 font-semibold text-[14px] mt-3 inline-block hover:underline">
              View all careers
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
