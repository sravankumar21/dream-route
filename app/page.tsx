"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, MapPin, GraduationCap, Target, Award, Briefcase, Wallet } from "lucide-react";
import { careers, searchCareers } from "@/data/careers";
import { CareerIcon } from "@/components/careers/CareerIcon";
import CareerCard from "@/components/careers/CareerCard";
import { exams } from "@/data/exams";
import { scholarships } from "@/data/scholarships";
import CursorRocket from "@/components/ui/ScrollRocket";

const howItWorks = [
  {
    step: "1",
    title: "Find Your Path",
    description: "Explore education routes from Class 5. See every branch, every option.",
    href: "/education",
  },
  {
    step: "2",
    title: "Know Your Target",
    description: "Exact scores, ranks, and what to focus on for each exam.",
    href: "/exams",
  },
  {
    step: "3",
    title: "Fund Your Dream",
    description: "Scholarships you're eligible for. Apply before deadlines.",
    href: "/scholarships",
  },
  {
    step: "4",
    title: "Build Your Career",
    description: "See what skills each career needs. Learn them for free.",
    href: "/careers",
  },
];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof careers>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length > 0) {
      const results = searchCareers(value).slice(0, 5);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/careers?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSelectCareer = (slug: string) => {
    router.push(`/careers/${slug}`);
    setShowSuggestions(false);
    setQuery("");
  };

  return (
    <div className="min-h-screen">
      <CursorRocket />
      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/50 via-zinc-900 to-zinc-900" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-28 md:py-36">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-5">
              Career Guidance Platform
            </p>
            <h1 className="text-4xl md:text-[56px] font-extrabold mb-6 tracking-[-0.03em] leading-[1.1]">
              From school to career
              <br />
              <span className="text-zinc-400">every path mapped</span>
            </h1>
            <p className="text-[17px] text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Explore education paths from Class 5. Know exactly what to study,
              where, and how much it costs. Then learn the skills for free.
            </p>

            {/* Search */}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-10 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-zinc-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Search careers — Software Engineer, Doctor, Designer..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-zinc-900 text-[15px] bg-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-shadow"
                />
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 top-full mt-2 w-full bg-white border border-zinc-200 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] py-2 overflow-hidden">
                  {suggestions.map((career) => (
                    <button
                      key={career.id}
                      type="button"
                      onClick={() => handleSelectCareer(career.slug)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                        <CareerIcon name={career.icon} className="h-4 w-4 text-zinc-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-zinc-900 truncate">{career.title}</p>
                        <p className="text-[12px] text-zinc-500 truncate">{career.shortDescription}</p>
                      </div>
                    </button>
                  ))}
                  <div className="border-t border-zinc-100 px-4 py-2.5">
                    <button
                      type="submit"
                      className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      Search all careers &rarr;
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/education"
                className="bg-white text-zinc-900 px-7 py-3 rounded-xl text-[15px] font-semibold hover:bg-zinc-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                Education Paths
              </Link>
              <Link
                href="/careers"
                className="border border-zinc-700 text-zinc-300 px-7 py-3 rounded-xl text-[15px] font-semibold hover:bg-zinc-800 hover:border-zinc-600 transition-all inline-flex items-center justify-center gap-2"
              >
                Browse Careers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.12em] mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em]">
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((item) => (
              <Link key={item.step} href={item.href} className="group">
                <div className="text-[13px] font-bold text-zinc-300 mb-3">{item.step}</div>
                <h3 className="text-[16px] font-bold text-zinc-900 mb-2 tracking-[-0.01em] group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-[14px] text-zinc-500 leading-relaxed">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Education Paths Preview */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.12em] mb-3">Start Here</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em]">
                Education paths
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Class 5", desc: "Full school to career path", icon: GraduationCap, href: "/education" },
              { label: "After Class 10", desc: "Intermediate streams & options", icon: MapPin, href: "/education" },
              { label: "After Intermediate", desc: "Degree programs & entrance exams", icon: Target, href: "/education" },
              { label: "After Bachelor's", desc: "PG options — M.Tech, MBA, MS", icon: Award, href: "/education" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="h-full flex flex-col bg-white p-6 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-3">
                  <item.icon className="h-5 w-5 text-zinc-600" />
                </div>
                <h3 className="text-[16px] font-bold text-zinc-900 tracking-[-0.01em] group-hover:text-blue-600 transition-colors">
                  {item.label}
                </h3>
                <p className="text-[14px] text-zinc-500 mt-1 flex-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Targets Preview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.12em] mb-3">Score Targets</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em]">
                Know your exam targets
              </h2>
            </div>
            <Link
              href="/exams"
              className="text-[14px] text-zinc-500 hover:text-zinc-900 font-medium hidden sm:inline-flex items-center gap-1.5 transition-colors"
            >
              All exams
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exams.slice(0, 3).map((exam) => (
              <Link
                key={exam.id}
                href={`/exams/${exam.id}`}
                className="h-full flex flex-col bg-white p-6 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-zinc-400" />
                  <span className="text-[12px] text-zinc-400 font-medium">{exam.totalMarks} marks</span>
                </div>
                <h3 className="text-[16px] font-bold text-zinc-900 tracking-[-0.01em] group-hover:text-blue-600 transition-colors">
                  {exam.name}
                </h3>
                <p className="text-[13px] text-zinc-500 mt-1 mb-3 flex-1 line-clamp-2">{exam.conductedBy}</p>
                <div className="border-t border-zinc-100 pt-3">
                  <p className="text-[11px] text-zinc-400 mb-1">Top target</p>
                  <p className="text-[13px] font-semibold text-zinc-900">Rank {exam.rankTargets[0].rankRange}</p>
                  <p className="text-[12px] text-blue-600">Score {exam.rankTargets[0].scoreRange}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships Preview */}
      <section className="py-16 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.12em] mb-3">Fund Your Education</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em]">
                Scholarships you&apos;re eligible for
              </h2>
            </div>
            <Link
              href="/scholarships"
              className="text-[14px] text-zinc-500 hover:text-zinc-900 font-medium hidden sm:inline-flex items-center gap-1.5 transition-colors"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scholarships.slice(0, 3).map((s) => (
              <Link
                key={s.id}
                href="/scholarships"
                className="h-full flex flex-col bg-white p-6 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-zinc-400" />
                  <span className="text-[12px] text-zinc-400 font-medium">{s.provider}</span>
                </div>
                <h3 className="text-[16px] font-bold text-zinc-900 tracking-[-0.01em] group-hover:text-blue-600 transition-colors line-clamp-1">
                  {s.name}
                </h3>
                <p className="text-[13px] text-zinc-500 mt-1 mb-3 flex-1 line-clamp-2">{s.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                  <span className="text-[13px] font-bold text-emerald-700">{s.amount}</span>
                  <span className="text-[12px] text-zinc-400">Apply &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Preview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.12em] mb-3">Explore</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-[-0.03em]">
                Career paths
              </h2>
            </div>
            <Link
              href="/careers"
              className="text-[14px] text-zinc-500 hover:text-zinc-900 font-medium hidden sm:inline-flex items-center gap-1.5 transition-colors"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careers.slice(0, 6).map((career) => (
              <CareerCard key={career.id} career={career} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/careers"
              className="text-[14px] text-zinc-500 hover:text-zinc-900 font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              View all careers
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-zinc-900">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-[-0.03em]">
            Start your journey
          </h2>
          <p className="text-zinc-400 mb-10 text-[16px] max-w-md mx-auto">
            Education paths, exam targets, scholarships, careers — all in one place.
          </p>
          <Link
            href="/education"
            className="bg-white text-zinc-900 px-8 py-3.5 rounded-xl text-[15px] font-semibold hover:bg-zinc-100 transition-colors inline-flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Start with Education Paths
          </Link>
        </div>
      </section>
    </div>
  );
}
