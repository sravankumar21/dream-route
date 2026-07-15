import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";
import type { Career } from "@/data/careers";
import { CareerIcon } from "./CareerIcon";
import { useSavedCareers } from "@/components/SavedCareersProvider";
import { useSession } from "next-auth/react";

export default function CareerCard({ career }: { career: Career }) {
  const { toggle, isSaved } = useSavedCareers();
  const { data: session } = useSession();
  const saved = isSaved(career.slug);

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-zinc-200 p-6 hover:shadow-lg transition-all group relative">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-3">
          <CareerIcon name={career.icon} className="h-5 w-5 text-zinc-600" />
        </div>
        {session && (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(career.slug);
            }}
            className="text-zinc-300 hover:text-zinc-600 transition-colors"
            aria-label={saved ? "Remove bookmark" : "Bookmark career"}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-zinc-900 text-zinc-900" : ""}`} />
          </button>
        )}
      </div>
      <Link href={`/careers/${career.slug}`} className="flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-zinc-900">
          {career.title}
        </h3>
        <p className="text-zinc-500 text-sm mt-2 line-clamp-2 flex-1">
          {career.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded capitalize">
            {career.category}
          </span>
          <span className="text-zinc-900 text-sm font-medium flex items-center gap-1">
            {career.skills.length} skills
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}
