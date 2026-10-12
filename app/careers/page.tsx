import Link from "next/link";
import Image from "next/image";
import { careers, careerCategories, searchCareers } from "@/data/careers";
import CareerCard from "@/components/careers/CareerCard";
import { CareerIcon } from "@/components/careers/CareerIcon";
import { categoryImages } from "@/lib/pexels";

export const metadata = {
  title: "Career Paths | DreamRoute",
  description: "Explore career paths with clear skills, education routes, and opportunities.",
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
    <div className="min-h-screen bg-zinc-50">
      {/* Hero with image */}
      <section className="relative h-[260px] sm:h-[320px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Careers opportunities"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 h-full flex items-center">
          <div>
            <p className="text-[12px] font-semibold text-zinc-300 uppercase tracking-[0.12em] mb-3">Browse</p>
            <h1 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold text-white tracking-[-0.03em] mb-3">
              {searchQuery ? `Results for "${searchQuery}"` : "Career Paths"}
            </h1>
            <p className="text-zinc-300 max-w-xl text-[15px] leading-relaxed">
              {searchQuery
                ? `${filteredCareers.length} career${filteredCareers.length !== 1 ? "s" : ""} found`
                : "Find the right career with skills, education routes, and growth insights."}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">

        {/* Category tabs - mobile scrollable */}
        <div className="flex flex-wrap gap-2 mb-10 -mx-1 overflow-x-auto pb-1">
          <Link
            href="/careers"
            className={`px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold whitespace-nowrap transition-all duration-150 ${
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
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-semibold whitespace-nowrap transition-all duration-150 ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
