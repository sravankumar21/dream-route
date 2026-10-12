"use client";

import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";
import Image from "next/image";
import type { Career } from "@/data/careers";
import { CareerIcon } from "./CareerIcon";
import { useSavedCareers } from "@/components/SavedCareersProvider";
import { useSession } from "next-auth/react";
import { careerImages } from "@/lib/pexels";

export default function CareerCard({ career }: { career: Career }) {
  const { toggle, isSaved } = useSavedCareers();
  const { data: session } = useSession();
  const saved = isSaved(career.slug);
  const img = careerImages[career.slug] || careerImages["software-engineer"];

  return (
    <Link href={`/careers/${career.slug}`} className="h-full flex flex-col bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-[0_4px_40px_rgba(0,0,0,0.08)] transition-all group relative">
      <div className="relative h-40 sm:h-48 bg-zinc-100 overflow-hidden">
        <Image
          src={img}
          alt={career.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-sm border border-white/60">
            <CareerIcon name={career.icon} className="h-3.5 w-3.5 text-zinc-700" />
            <span className="text-xs font-medium text-zinc-800 capitalize">{career.category}</span>
          </div>
        </div>
        {session && (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(career.slug);
            }}
            className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-white/60 hover:bg-white transition-colors"
            aria-label={saved ? "Remove bookmark" : "Bookmark career"}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-zinc-900 text-zinc-900" : "text-zinc-600"}`} />
          </button>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-[-0.01em]">
          {career.title}
        </h3>
        <p className="text-zinc-500 text-[14px] sm:text-[15px] mt-2 line-clamp-2 flex-1 leading-relaxed">
          {career.shortDescription}
        </p>
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-zinc-100">
          <span className="text-xs sm:text-[13px] text-zinc-600 bg-zinc-50 px-2.5 py-1 rounded-lg">
            {career.skills.length} skills
          </span>
          <span className="text-zinc-900 text-[14px] sm:text-[15px] font-semibold flex items-center gap-1.5 group-hover:gap-2 transition-all">
            Explore
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
