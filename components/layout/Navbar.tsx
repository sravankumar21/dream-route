"use client";

import Link from "next/link";
import { GraduationCap, Menu, X, Bookmark, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import GlobalSearch from "@/components/GlobalSearch";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/education", label: "Education" },
  { href: "/exams", label: "Exams" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/careers", label: "Careers" },
  { href: "/workplace", label: "Workplace" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between h-[60px]">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2.5 group">
                <GraduationCap className="h-[22px] w-[22px] text-zinc-900 transition-colors duration-200" />
                <span className="text-[17px] font-bold text-zinc-900 tracking-[-0.02em]">
                  DreamRoute
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-zinc-500 hover:text-zinc-900 font-medium px-3 py-2 rounded-lg hover:bg-zinc-50 transition-all duration-150"
                >
                  {link.label}
                </Link>
              ))}
              <div className="ml-2 flex items-center gap-1">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
                <div className="ml-1 pl-2 border-l border-zinc-200 flex items-center gap-1">
                  {isLoading ? (
                    <div className="w-[70px] h-[30px] bg-zinc-100 rounded-lg" />
                  ) : session ? (
                    <>
                      <Link
                        href="/saved"
                        className="text-[14px] text-zinc-500 hover:text-zinc-900 font-medium px-2.5 py-2 rounded-lg hover:bg-zinc-50 transition-all duration-150 flex items-center gap-1.5"
                      >
                        <Bookmark className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="text-[13px] text-zinc-500 hover:text-zinc-900 font-medium px-3 py-2 rounded-lg hover:bg-zinc-50 transition-colors duration-150"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/signin"
                      className="bg-zinc-900 text-white text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors duration-150"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center md:hidden gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              {!isLoading && !session && (
                <Link
                  href="/auth/signin"
                  className="bg-zinc-900 text-white text-[13px] font-semibold px-3 py-1.5 rounded-lg"
                >
                  Sign In
                </Link>
              )}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden pb-4 border-t border-zinc-100 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 px-3 text-[15px] text-zinc-600 hover:text-zinc-900 font-medium rounded-lg hover:bg-zinc-50 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              {session && (
                <Link
                  href="/saved"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 px-3 text-[15px] text-zinc-600 hover:text-zinc-900 font-medium rounded-lg hover:bg-zinc-50 transition-all"
                >
                  Saved
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
