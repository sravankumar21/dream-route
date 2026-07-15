import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <GraduationCap className="h-[22px] w-[22px] text-zinc-900" />
              <span className="text-[17px] font-bold text-zinc-900 tracking-[-0.02em]">DreamRoute</span>
            </div>
            <p className="text-zinc-500 text-[14px] max-w-sm leading-relaxed">
              Free career guidance. Pick a career, see the skills,
              and learn them for free.
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.08em] mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/careers", label: "Career Paths" },
                { href: "/education", label: "Education Explorer" },
                { href: "/exams", label: "Exam Targets" },
                { href: "/scholarships", label: "Scholarships" },
                { href: "/workplace", label: "Workplace" },
                { href: "/blog", label: "AI & Career News" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-[0.08em] mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/careers?category=technology", label: "Technology" },
                { href: "/careers?category=medical", label: "Medical" },
                { href: "/careers?category=business", label: "Business" },
                { href: "/careers?category=creative", label: "Creative" },
                { href: "/careers?category=government", label: "Government" },
                { href: "/careers?category=engineering", label: "Engineering" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-zinc-400">&copy; {new Date().getFullYear()} DreamRoute</p>
          <p className="text-[13px] text-zinc-400">Free career guidance for every student</p>
        </div>
      </div>
    </footer>
  );
}
