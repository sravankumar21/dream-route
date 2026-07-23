import { Metadata } from "next";
import Link from "next/link";
import { RoundTimeline } from "@/components/counselling/RoundTimeline";
import { TransparencyBadge } from "@/components/counselling/TransparencyBadge";
import { howSeatAllocationWorks, mccCounselling } from "@/data/counselling/counselling-process";
import { ArrowLeft, ExternalLink, BookOpen, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How Counselling Works | DreamRoute",
  description: "Step-by-step walkthrough of NEET-UG medical counselling process. Understand MCC AIQ counselling, state counselling, seat allocation, and how rounds work.",
};

export default function ProcessPage() {
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
              How Counselling Works
            </h1>
            <TransparencyBadge source="official" />
          </div>
          <p className="text-[14px] text-zinc-500">
            A complete step-by-step guide to NEET-UG medical counselling. Every step, every rule, explained in simple language.
          </p>
        </div>

        <div className="mb-8 bg-white rounded-2xl border border-zinc-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-5 w-5 text-zinc-400" />
            <div>
              <h2 className="text-[16px] font-bold text-zinc-900">{mccCounselling.fullName}</h2>
              <p className="text-[12px] text-zinc-500">Conducted by: {mccCounselling.authority}</p>
            </div>
          </div>
          <p className="text-[13px] text-zinc-600 leading-relaxed">{mccCounselling.description}</p>
          <div className="mt-4 p-3 bg-zinc-50 rounded-xl">
            <p className="text-[12px] text-zinc-500">
              <strong>Quota:</strong> {mccCounselling.quota}
            </p>
            <a
              href={mccCounselling.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[12px] text-blue-600 hover:text-blue-800 mt-1"
            >
              Official Website <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mb-8">
          <RoundTimeline currentStep={-1} />
        </div>

        <div className="mb-8 bg-white rounded-2xl border border-zinc-200 p-6">
          <h2 className="text-[16px] font-bold text-zinc-900 mb-4">
            {howSeatAllocationWorks.title}
          </h2>
          <div className="space-y-4">
            {howSeatAllocationWorks.sections.map((section) => (
              <div key={section.title} className="bg-zinc-50 rounded-xl p-4">
                <h3 className="text-[14px] font-bold text-zinc-900 mb-2">{section.title}</h3>
                <p className="text-[13px] text-zinc-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 bg-white rounded-2xl border border-zinc-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-zinc-400" />
            <h2 className="text-[16px] font-bold text-zinc-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {mccCounselling.faqs.map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between cursor-pointer text-[13px] font-semibold text-zinc-900 p-3 rounded-xl hover:bg-zinc-50 transition-colors list-none">
                  <span>{faq.question}</span>
                  <span className="text-zinc-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-3 pb-3">
                  <p className="text-[12px] text-zinc-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 text-center">
          <p className="text-[13px] text-zinc-400 mb-4">
            Ready to see how this applies to your rank?
          </p>
          <Link
            href="/counselling/predict"
            className="inline-flex items-center gap-2 bg-white text-zinc-900 text-[13px] font-semibold px-5 py-2.5 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            Predict My College
          </Link>
        </div>
      </div>
    </div>
  );
}
