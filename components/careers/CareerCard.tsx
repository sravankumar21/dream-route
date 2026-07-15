import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Career } from "@/data/careers";
import { CareerIcon } from "./CareerIcon";

export default function CareerCard({ career }: { career: Career }) {
  return (
    <Link
      href={`/careers/${career.slug}`}
      className="h-full flex flex-col bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-3">
        <CareerIcon name={career.icon} className="h-5 w-5 text-zinc-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
        {career.title}
      </h3>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2 flex-1">
        {career.shortDescription}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded capitalize">
          {career.category}
        </span>
        <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
          {career.skills.length} skills
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
