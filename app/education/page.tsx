import type { Metadata } from "next";
import PathExplorer from "@/components/education/PathExplorer";

export const metadata: Metadata = {
  title: "Education Path Explorer — From School to Career | DreamRoute",
  description:
    "Explore the complete education pathway from Class 5 to career. Compare government vs private school options, intermediate streams, degree programs, and fee structures for Indian states.",
  keywords: [
    "education path India",
    "career after 10th",
    "career after 12th",
    "intermediate streams India",
    "B.Tech admission",
    "NEET preparation",
    "government school vs private school",
    "Telangana education",
    "Andhra Pradesh education",
  ],
};

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="mb-10">
          <p className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.1em] mb-3">
            Explore
          </p>
          <h1 className="text-[32px] sm:text-[40px] font-bold text-zinc-900 tracking-[-0.03em] leading-[1.1] mb-3">
            Education Path Explorer
          </h1>
          <p className="text-[16px] text-zinc-500 max-w-2xl leading-relaxed">
            From Class 5 to career — every school type, intermediate stream, degree program, and fee
            structure. Choose your state and starting point.
          </p>
        </div>

        <PathExplorer />
      </div>
    </main>
  );
}
