"use client";

import { useEffect, useRef, useState } from "react";
import { Rocket } from "lucide-react";

export default function ScrollRocket() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    const rocket = rocketRef.current;
    if (!svg || !rocket) return;

    const path = svg.querySelector("path");
    if (!path) return;

    const totalLength = path.getTotalLength();
    const point = path.getPointAtLength(scrollProgress * totalLength);

    // Calculate angle from current to next point
    const nextProgress = Math.min(scrollProgress + 0.01, 1);
    const nextPoint = path.getPointAtLength(nextProgress * totalLength);
    const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

    rocket.style.transform = `translate(${point.x - 14}px, ${point.y - 14}px) rotate(${angle - 90}deg)`;
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[50]">
      {/* SVG Path */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M 50 0 
             C 50 50, 15 80, 15 120 
             C 15 160, 85 180, 85 220 
             C 85 260, 15 280, 15 320 
             C 15 360, 85 380, 85 420 
             C 85 460, 15 480, 15 520 
             C 15 560, 85 580, 85 620 
             C 85 660, 15 680, 15 720 
             C 15 760, 85 780, 85 820 
             C 85 860, 50 900, 50 1000"
          stroke="rgba(161, 161, 170, 0.2)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>

      {/* Rocket */}
      <div
        ref={rocketRef}
        className="absolute top-0 left-0"
        style={{ willChange: "transform" }}
      >
        <Rocket
          className="h-6 w-6 text-zinc-700"
          fill="white"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
