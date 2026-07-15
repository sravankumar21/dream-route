"use client";

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#71717a" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Gradient orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-violet-500/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/[0.02] rounded-full blur-[120px]" />
    </div>
  );
}
