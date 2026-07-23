"use client";

import Link from "next/link";
import { SeatMovementFlow } from "@/components/counselling/SeatMovementFlow";
import { TransparencyBadge } from "@/components/counselling/TransparencyBadge";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        <Link
          href="/counselling"
          className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500 hover:text-zinc-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Counselling
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-[-0.03em] text-zinc-900">
              Seat Movement Simulator
            </h1>
            <TransparencyBadge source="estimated" />
          </div>
          <p className="text-[14px] text-zinc-500 max-w-2xl">
            Watch how one student&apos;s decision to upgrade creates a chain reaction, affecting multiple other students.
            This is how counselling rounds actually work.
          </p>
        </div>

        <SeatMovementFlow />

        <div className="mt-8 bg-white rounded-2xl border border-zinc-200 p-6">
          <h3 className="text-[15px] font-bold text-zinc-900 mb-4">How This Works in Real Counselling</h3>
          <div className="space-y-4 text-[13px] text-zinc-600 leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[11px] font-bold text-zinc-500 shrink-0">1</span>
              <p>In <strong>Round 1</strong>, seats are allotted based on rank, choices, and category. Students can Accept (Freeze), Accept &amp; Upgrade (Float), or Exit.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[11px] font-bold text-zinc-500 shrink-0">2</span>
              <p>Students who choose <strong>Float</strong> keep their current seat but are considered for better choices in Round 2. If upgraded, their old seat becomes vacant.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[11px] font-bold text-zinc-500 shrink-0">3</span>
              <p>In <strong>Round 2</strong>, these vacant seats are filled by the next eligible candidates in rank order. This creates a cascade effect.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[11px] font-bold text-zinc-500 shrink-0">4</span>
              <p>In <strong>Mop-Up</strong>, any remaining vacant seats are filled. This is the final round for most counselling processes.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 rounded-2xl border border-amber-100 p-5 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[13px] font-bold text-amber-800 mb-1">Note</h4>
            <p className="text-[12px] text-amber-700 leading-relaxed">
              This simulation uses simplified data to illustrate the concept. Real counselling involves thousands of students,
              complex category reservations, and multiple state-level processes running simultaneously. The chain reaction effect
              is real, but the scale is much larger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
