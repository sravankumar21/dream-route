"use client";

import { useSession } from "next-auth/react";
import { useSavedCareers } from "@/components/SavedCareersProvider";
import { careers } from "@/data/careers";
import Link from "next/link";
import { ArrowRight, Bookmark, ArrowLeft } from "lucide-react";
import { CareerIcon } from "@/components/careers/CareerIcon";

export default function SavedCareersPage() {
  const { data: session, status } = useSession();
  const { saved } = useSavedCareers();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-zinc-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <Bookmark className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Sign in to view saved careers</h1>
          <p className="text-zinc-500 mb-6">Bookmark careers you&apos;re interested in and access them here.</p>
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const savedCareers = careers.filter((c) => saved.includes(c.slug));

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Link href="/careers" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          All Careers
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-zinc-900">Saved Careers</h1>
          <p className="text-zinc-500 mt-2">{savedCareers.length} career{savedCareers.length !== 1 ? "s" : ""} bookmarked</p>
        </div>

        {savedCareers.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-zinc-900 mb-2">No saved careers yet</h2>
            <p className="text-zinc-500 mb-6">Browse careers and click the bookmark icon to save them here.</p>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
            >
              Browse Careers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedCareers.map((career) => (
              <Link
                key={career.slug}
                href={`/careers/${career.slug}`}
                className="bg-white rounded-xl border border-zinc-200 p-6 hover:shadow-lg transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center mb-3">
                  <CareerIcon name={career.icon} className="h-5 w-5 text-zinc-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">{career.title}</h3>
                <p className="text-zinc-500 text-sm mt-2 line-clamp-2">{career.shortDescription}</p>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
