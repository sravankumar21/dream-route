import { Metadata } from "next";
import Link from "next/link";
import { StatsOverview } from "@/components/counselling/StatsOverview";
import { TransparencyBadge } from "@/components/counselling/TransparencyBadge";
import { ArrowRight, Brain, BarChart3, BookOpen, Sparkles, Shield, Users, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Seat Allocation & Counselling Simulator | DreamRoute",
  description: "Transparent, student-first seat allocation predictor and counselling simulator for NEET-UG medical admissions. Understand how counselling works, predict your college, and see seat movement in real-time.",
};

const features = [
  {
    icon: Brain,
    title: "Predict My College",
    description: "Enter your NEET rank, category, and preferences. Get instant probability predictions for every medical college with detailed explanations.",
    href: "/counselling/predict",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: TrendingUp,
    title: "Seat Movement Simulator",
    description: "Watch how one student's upgrade decision creates a chain reaction. Understand the ripple effect of counselling rounds visually.",
    href: "/counselling/simulator",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Transparency Dashboard",
    description: "See aggregated data: seat availability, closing rank trends, seat movement between rounds, and college-wise allocation patterns.",
    href: "/counselling/dashboard",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: BookOpen,
    title: "How Counselling Works",
    description: "Step-by-step walkthrough of MCC AIQ and state counselling. Decision points, rules, and FAQs explained in simple language.",
    href: "/counselling/process",
    color: "bg-amber-50 text-amber-600",
  },
];

const principles = [
  {
    icon: Shield,
    title: "Data Transparency",
    description: "Every piece of data is labeled: Official, Historical, Estimated, or AI-Generated. You always know where data comes from.",
  },
  {
    icon: Users,
    title: "Student-First",
    description: "Built for students, not institutions. We explain why you didn't get a seat, not just that you didn't.",
  },
  {
    icon: Sparkles,
    title: "Explainability",
    description: "Every prediction comes with reasoning. We don't just say 'high probability' — we explain why, using closing ranks, trends, and seat data.",
  },
];

export default function CounsellingPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TransparencyBadge source="official" />
            <TransparencyBadge source="historical" />
            <TransparencyBadge source="estimated" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-zinc-900 mb-3">
            Seat Allocation &amp; Counselling Simulator
          </h1>
          <p className="text-[15px] text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            A transparent, student-first platform to understand medical college seat allocation.
            Predict your chances, see how counselling works, and understand every step of the process.
          </p>
        </div>

        <div className="mb-12">
          <StatsOverview />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="bg-white rounded-2xl border border-zinc-200 p-6 hover:border-zinc-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-[16px] font-bold text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed mb-4">{feature.description}</p>
                <span className="text-[13px] font-semibold text-zinc-900 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-8 mb-12">
          <h2 className="text-[18px] font-extrabold text-zinc-900 tracking-[-0.02em] mb-2">
            Why This Platform Exists
          </h2>
          <p className="text-[13px] text-zinc-500 leading-relaxed mb-6 max-w-3xl">
            Every year, lakhs of students go through NEET counselling without fully understanding how seat allocation works.
            Closing ranks are published, but nobody explains why they change. Seats become vacant, but the movement is invisible.
            This platform exists to make the entire process transparent, data-driven, and student-friendly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-zinc-50 rounded-xl p-4">
                  <Icon className="h-5 w-5 text-zinc-400 mb-2" />
                  <h4 className="text-[13px] font-bold text-zinc-900 mb-1">{p.title}</h4>
                  <p className="text-[12px] text-zinc-500 leading-relaxed">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-8 text-center">
          <h2 className="text-[18px] font-extrabold text-white tracking-[-0.02em] mb-2">
            Start With Your Predictions
          </h2>
          <p className="text-[13px] text-zinc-400 max-w-lg mx-auto mb-6">
            Enter your NEET rank and see your chances at every medical college in India. Free, transparent, and explained.
          </p>
          <Link
            href="/counselling/predict"
            className="inline-flex items-center gap-2 bg-white text-zinc-900 text-[13px] font-semibold px-6 py-3 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            <Brain className="h-4 w-4" />
            Predict My College
          </Link>
        </div>
      </div>
    </div>
  );
}
