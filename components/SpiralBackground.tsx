"use client";

import { useEffect, useRef } from "react";

export default function SpiralBackground() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Generate dots that move along the spiral path
    const svg = svgRef.current;
    if (!svg) return;

    const path = svg.querySelector("#spiral-path") as SVGPathElement;
    if (!path) return;

    const totalLength = path.getTotalLength();
    const dots = svg.querySelectorAll(".spiral-dot");

    const animations: Animation[] = [];

    dots.forEach((dot, i) => {
      const duration = 15000 + Math.random() * 15000; // 15-30s
      const delay = Math.random() * -duration; // random start offset

      const animate = dot.animate(
        [
          { offsetDistance: "0%", opacity: 0 },
          { offsetDistance: "10%", opacity: 0.6 + Math.random() * 0.4 },
          { offsetDistance: "50%", opacity: 0.3 + Math.random() * 0.3 },
          { offsetDistance: "90%", opacity: 0.6 + Math.random() * 0.4 },
          { offsetDistance: "100%", opacity: 0 },
        ],
        {
          duration,
          iterations: Infinity,
          easing: "linear",
          delay,
        }
      );

      animations.push(animate);
    });

    return () => {
      animations.forEach((a) => a.cancel());
    };
  }, []);

  // Generate spiral path points (Archimedean spiral)
  const spiralPoints: string[] = [];
  const turns = 8;
  const points = 600;
  const viewBoxSize = 1000;
  const cx = viewBoxSize / 2;
  const cy = viewBoxSize / 2;
  const maxRadius = 460;

  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const angle = t * turns * 2 * Math.PI;
    const r = t * maxRadius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    spiralPoints.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  const spiralPath = spiralPoints.join(" ");

  // Dot positions along the spiral (parametric positions)
  const dotPositions = Array.from({ length: 8 }, (_, i) => {
    const t = (i + 1) / 9;
    const angle = t * turns * 2 * Math.PI;
    const r = t * maxRadius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      size: 1.5 + Math.random() * 1.5,
      opacity: 0.15 + Math.random() * 0.2,
    };
  });

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    >
      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #141416 100%)",
        }}
      />

      {/* Spiral SVG */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="absolute inset-0 w-full h-full"
        style={{
          animation: "spiralRotate 40s linear infinite",
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Edge fade mask */}
          <radialGradient id="fade-mask" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="55%" stopColor="white" stopOpacity="0.8" />
            <stop offset="80%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="edge-fade">
            <rect
              width={viewBoxSize}
              height={viewBoxSize}
              fill="url(#fade-mask)"
            />
          </mask>

          {/* Blur filter */}
          <filter id="spiral-blur">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>

          {/* Dot glow */}
          <filter id="dot-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g mask="url(#edge-fade)">
          {/* Main spiral */}
          <path
            id="spiral-path"
            d={spiralPath}
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.08"
            filter="url(#spiral-blur)"
          />

          {/* Second spiral layer for depth */}
          <path
            d={spiralPath}
            fill="none"
            stroke="white"
            strokeWidth="0.4"
            strokeLinecap="round"
            opacity="0.04"
            filter="url(#spiral-blur)"
            transform={`translate(${cx}, ${cy}) scale(1.01) translate(${-cx}, ${-cy})`}
          />

          {/* Glowing dots */}
          {dotPositions.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={dot.size}
              fill="white"
              opacity={dot.opacity}
              filter="url(#dot-glow)"
              className="spiral-dot"
              style={{
                offsetPath: `path("${spiralPath}")`,
                offsetRotate: "0deg",
              }}
            />
          ))}
        </g>
      </svg>

      <style>{`
        @keyframes spiralRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
