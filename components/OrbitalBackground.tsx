"use client";

import { useEffect, useRef } from "react";

interface Ring {
  rx: number;
  ry: number;
  tilt: number;
  strokeWidth: number;
  opacity: number;
  dashArray?: string;
}

interface Node {
  ringIndex: number;
  duration: number;
  clockwise: boolean;
  startOffset: number;
}

const rings: Ring[] = [
  { rx: 700, ry: 260, tilt: 28, strokeWidth: 1.0, opacity: 0.20 },
  { rx: 620, ry: 230, tilt: 32, strokeWidth: 0.8, opacity: 0.16, dashArray: "120 30" },
  { rx: 780, ry: 290, tilt: 26, strokeWidth: 0.9, opacity: 0.22 },
  { rx: 540, ry: 200, tilt: 34, strokeWidth: 1.1, opacity: 0.18, dashArray: "200 40" },
  { rx: 850, ry: 310, tilt: 30, strokeWidth: 0.8, opacity: 0.20 },
  { rx: 480, ry: 180, tilt: 27, strokeWidth: 1.2, opacity: 0.15, dashArray: "80 25" },
  { rx: 920, ry: 340, tilt: 33, strokeWidth: 0.9, opacity: 0.24 },
  { rx: 660, ry: 245, tilt: 29, strokeWidth: 0.8, opacity: 0.18, dashArray: "160 35" },
  { rx: 1000, ry: 370, tilt: 31, strokeWidth: 1.0, opacity: 0.16 },
  { rx: 580, ry: 215, tilt: 35, strokeWidth: 0.9, opacity: 0.22, dashArray: "100 20" },
];

const nodes: Node[] = [
  { ringIndex: 0, duration: 60, clockwise: true, startOffset: 0.15 },
  { ringIndex: 1, duration: 80, clockwise: false, startOffset: 0.6 },
  { ringIndex: 2, duration: 100, clockwise: true, startOffset: 0.35 },
  { ringIndex: 3, duration: 40, clockwise: false, startOffset: 0.8 },
  { ringIndex: 4, duration: 140, clockwise: true, startOffset: 0.5 },
  { ringIndex: 5, duration: 60, clockwise: true, startOffset: 0.2 },
  { ringIndex: 6, duration: 100, clockwise: false, startOffset: 0.7 },
  { ringIndex: 7, duration: 80, clockwise: true, startOffset: 0.4 },
  { ringIndex: 8, duration: 140, clockwise: false, startOffset: 0.1 },
  { ringIndex: 9, duration: 40, clockwise: true, startOffset: 0.9 },
];

function generateEllipsePath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  tiltDeg: number
): string {
  const points: string[] = [];
  const segments = 120;
  const tiltRad = (tiltDeg * Math.PI) / 180;
  const cos = Math.cos(tiltRad);
  const sin = Math.sin(tiltRad);

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * 2 * Math.PI;
    const x = rx * Math.cos(theta);
    const y = ry * Math.sin(theta);
    const rx2 = x * cos - y * sin;
    const ry2 = x * sin + y * cos;
    points.push(`${i === 0 ? "M" : "L"} ${(cx + rx2).toFixed(2)} ${(cy + ry2).toFixed(2)}`);
  }
  return points.join(" ") + " Z";
}

export default function OrbitalBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const rotateAnim = group.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      { duration: 210000, iterations: Infinity, easing: "linear" }
    );

    return () => rotateAnim.cancel();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const animations: Animation[] = [];

    nodes.forEach((node, i) => {
      const ellipse = svg.querySelector(`#orbit-${node.ringIndex}`) as SVGPathElement;
      if (!ellipse) return;

      const dot = svg.querySelector(`#node-${i}`) as SVGCircleElement;
      if (!dot) return;

      const dotAnim = dot.animate(
        [
          { offsetDistance: `${node.startOffset * 100}%`, opacity: 0.4 },
          { offsetDistance: `${(node.startOffset + 0.05) % 1 * 100}%`, opacity: 1 },
          { offsetDistance: `${(node.startOffset + 0.5) % 1 * 100}%`, opacity: 0.6 },
          { offsetDistance: `${(node.startOffset + 0.95) % 1 * 100}%`, opacity: 1 },
          { offsetDistance: `${node.startOffset * 100}%`, opacity: 0.4 },
        ],
        {
          duration: node.duration * 1000,
          iterations: Infinity,
          easing: "linear",
        }
      );

      animations.push(dotAnim);
    });

    return () => {
      animations.forEach((a) => a.cancel());
    };
  }, []);

  // Center the orbital system in the viewport
  const centerX = 600;
  const centerY = 450;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    >
      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, #141416 85%)",
        }}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <filter id="ring-blur">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="orbital-vignette" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="60%" stopColor="white" stopOpacity="1" />
            <stop offset="85%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="orbital-mask">
            <rect width="1200" height="900" fill="url(#orbital-vignette)" />
          </mask>
        </defs>

        <g ref={groupRef} mask="url(#orbital-mask)">
          {rings.map((ring, i) => (
            <path
              key={i}
              id={`orbit-${i}`}
              d={generateEllipsePath(centerX, centerY, ring.rx, ring.ry, ring.tilt)}
              fill="none"
              stroke="white"
              strokeWidth={ring.strokeWidth}
              strokeDasharray={ring.dashArray}
              strokeLinecap="round"
              opacity={ring.opacity}
              filter="url(#ring-blur)"
            />
          ))}

          {nodes.map((node, i) => (
            <circle
              key={i}
              id={`node-${i}`}
              cx={centerX}
              cy={centerY}
              r={2.5}
              fill="white"
              opacity="0.8"
              filter="url(#node-glow)"
              style={{
                offsetPath: `path("${generateEllipsePath(centerX, centerY, rings[node.ringIndex].rx, rings[node.ringIndex].ry, rings[node.ringIndex].tilt)}")`,
                offsetRotate: "0deg",
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
