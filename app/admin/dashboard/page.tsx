"use client";

import { useSession } from "next-auth/react";
import {
  FileText,
  Video,
  Camera,
  Lightbulb,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  { label: "Blogs Published", value: "0", icon: FileText, change: "+0 this week" },
  { label: "Videos Published", value: "0", icon: Video, change: "+0 this week" },
  { label: "Reels Published", value: "0", icon: Camera, change: "+0 this week" },
  { label: "Pending Drafts", value: "0", icon: Clock, change: "0 overdue" },
  { label: "AI Ideas Generated", value: "0", icon: Lightbulb, change: "+0 today" },
  { label: "Upcoming Uploads", value: "0", icon: TrendingUp, change: "This week" },
];

const quickActions = [
  { label: "New Blog Post", href: "/admin/blog-studio", color: "from-violet-500/20 to-violet-500/5" },
  { label: "AI News Research", href: "/admin/ai-news", color: "from-blue-500/20 to-blue-500/5" },
  { label: "Content Pipeline", href: "/admin/pipeline", color: "from-emerald-500/20 to-emerald-500/5" },
  { label: "Prompt Library", href: "/admin/prompts", color: "from-amber-500/20 to-amber-500/5" },
];

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="max-w-6xl">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-[22px] font-bold text-white tracking-[-0.02em]">
          Welcome back, {session?.user?.name?.split(" ")[0] || "Admin"}
        </h2>
        <p className="text-[14px] text-zinc-500 mt-1">
          Here&apos;s your content overview for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#111113] rounded-xl border border-white/[0.06] p-5 hover:border-white/[0.1] transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="h-4 w-4 text-zinc-600" />
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-700" />
              </div>
              <p className="text-[24px] font-bold text-white tracking-[-0.02em]">{stat.value}</p>
              <p className="text-[12px] text-zinc-500 mt-0.5">{stat.label}</p>
              <p className="text-[11px] text-zinc-600 mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`bg-gradient-to-b ${action.color} rounded-xl border border-white/[0.06] p-4 hover:border-white/[0.12] transition-all group`}
            >
              <p className="text-[13px] font-semibold text-white group-hover:text-zinc-200 transition-colors">
                {action.label}
              </p>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600 mt-2 group-hover:text-zinc-400 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Weekly Schedule Placeholder */}
      <div>
        <h3 className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          This Week
        </h3>
        <div className="bg-[#111113] rounded-xl border border-white/[0.06] p-8 text-center">
          <Clock className="h-8 w-8 text-zinc-700 mx-auto mb-3" />
          <p className="text-[14px] text-zinc-500">No content scheduled yet.</p>
          <p className="text-[12px] text-zinc-600 mt-1">
            Start by creating content in the Blog & Script Studio.
          </p>
        </div>
      </div>
    </div>
  );
}
