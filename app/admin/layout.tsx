"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  PenTool,
  Newspaper,
  Columns3,
  Play,
  Camera,
  Image,
  Video,
  Palette,
  FolderOpen,
  BookOpen,
  Calendar,
  Share2,
  Workflow,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { divider: true, label: "Content" },
  { href: "/admin/blog-studio", label: "Blog & Script Studio", icon: PenTool },
  { href: "/admin/ai-news", label: "AI News Workspace", icon: Newspaper },
  { href: "/admin/pipeline", label: "Content Pipeline", icon: Columns3 },
  { href: "/admin/dreamroute-blog", label: "DreamRoute Blog", icon: FileText },
  { divider: true, label: "Studio" },
  { href: "/admin/thumbnails", label: "Thumbnail Studio", icon: Image },
  { href: "/admin/video-studio", label: "Video Studio", icon: Video },
  { divider: true, label: "Channels" },
  { href: "/admin/youtube", label: "YouTube", icon: Play },
  { href: "/admin/instagram", label: "Instagram", icon: Camera },
  { href: "/admin/social", label: "Social Media", icon: Share2 },
  { divider: true, label: "Organize" },
  { href: "/admin/calendar", label: "Content Calendar", icon: Calendar },
  { href: "/admin/workflow", label: "Daily Workflow", icon: Workflow },
  { divider: true, label: "Brand" },
  { href: "/admin/brand", label: "Brand Center", icon: Palette },
  { href: "/admin/assets", label: "Assets Library", icon: FolderOpen },
  { href: "/admin/prompts", label: "Prompt Library", icon: BookOpen },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/admin/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#111113] border-r border-white/[0.06] flex flex-col z-50 transition-all duration-200 ${
          collapsed ? "w-[60px]" : "w-[240px]"
        }`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-white/[0.06]">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shrink-0">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            {!collapsed && (
              <span className="text-[14px] font-bold text-white tracking-[-0.02em] truncate">
                Content OS
              </span>
            )}
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {navItems.map((item, i) => {
            if ("divider" in item && item.divider) {
              return collapsed ? (
                <div key={i} className="my-2 mx-2 h-px bg-white/[0.06]" />
              ) : (
                <p key={i} className="text-[10px] font-semibold text-zinc-600 uppercase tracking-[0.1em] px-2.5 mt-4 mb-1.5">
                  {item.label}
                </p>
              );
            }
            if (!item.href) return null;
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13px] font-medium transition-colors mb-0.5 ${
                  active
                    ? "bg-white/[0.08] text-white"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13px] font-medium text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] w-full transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13px] font-medium text-zinc-500 hover:text-red-400 hover:bg-white/[0.04] w-full transition-colors"
            title={collapsed ? "Sign Out" : undefined}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 transition-all duration-200 ${collapsed ? "ml-[60px]" : "ml-[240px]"}`}>
        {/* Top bar */}
        <header className="h-14 border-b border-white/[0.06] bg-[#0a0a0b]/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-6">
          <div>
            <h1 className="text-[14px] font-semibold text-white">
              {navItems.find((n) => "href" in n && n.href === pathname)?.label ||
                navItems.find((n) => "href" in n && pathname.startsWith(n.href + "/"))?.label ||
                "Admin"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-[12px] font-bold text-zinc-400">
              {session.user?.name?.[0]?.toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
