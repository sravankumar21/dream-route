import type { Metadata } from "next";
import Image from "next/image";
import EducationTimeline from "@/components/education/EducationTimeline";

export const metadata: Metadata = {
  title: "Education Path Explorer | DreamRoute",
  description:
    "Explore education pathways from Class 5 to career. See clear, mobile-friendly routes by state.",
};

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="relative h-[220px] sm:h-[280px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Education paths"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 h-full flex items-center">
          <div>
            <p className="text-[12px] font-semibold text-zinc-300 uppercase tracking-[0.1em] mb-3">
              Explore
            </p>
            <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-white tracking-[-0.03em] leading-[1.1] mb-3">
              Education Path Explorer
            </h1>
            <p className="text-[15px] sm:text-[16px] text-zinc-300 max-w-2xl leading-relaxed">
              Clear, mobile-friendly roadmap from school to career
            </p>
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <EducationTimeline />
      </div>
    </main>
  );
}
