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
  label?: string;
  duration: number;
  clockwise: boolean;
  startOffset: number;
}

const rings: Ring[] = [
  { rx: 700, ry: 260, tilt: 28, strokeWidth: 0.8, opacity: 0.10 },
  { rx: 620, ry: 230, tilt: 32, strokeWidth: 0.6, opacity: 0.08, dashArray: "120 30" },
  { rx: 780, ry: 290, tilt: 26, strokeWidth: 0.7, opacity: 0.12 },
  { rx: 540, ry: 200, tilt: 34, strokeWidth: 0.9, opacity: 0.09, dashArray: "200 40" },
  { rx: 850, ry: 310, tilt: 30, strokeWidth: 0.6, opacity: 0.11 },
  { rx: 480, ry: 180, tilt: 27, strokeWidth: 1.0, opacity: 0.08, dashArray: "80 25" },
  { rx: 920, ry: 340, tilt: 33, strokeWidth: 0.7, opacity: 0.13 },
  { rx: 660, ry: 245, tilt: 29, strokeWidth: 0.6, opacity: 0.10, dashArray: "160 35" },
  { rx: 1000, ry: 370, tilt: 31, strokeWidth: 0.8, opacity: 0.09 },
  { rx: 580, ry: 215, tilt: 35, strokeWidth: 0.7, opacity: 0.14, dashArray: "100 20" },
];

const nodes: Node[] = [
  { ringIndex: 0, label: "CLASS 5", duration: 60, clockwise: true, startOffset: 0.15 },
  { ringIndex: 1, duration: 80, clockwise: false, startOffset: 0.6 },
  { ringIndex: 2, label: "INTERMEDIATE", duration: 100, clockwise: true, startOffset: 0.35 },
  { ringIndex: 3, label: "ENTRANCE EXAM", duration: 40, clockwise: false, startOffset: 0.8 },
  { ringIndex: 4, label: "COLLEGE", duration: 140, clockwise: true, startOffset: 0.5 },
  { ringIndex: 5, duration: 60, clockwise: true, startOffset: 0.2 },
  { ringIndex: 6, label: "SKILLS", duration: 100, clockwise: false, startOffset: 0.7 },
  { ringIndex: 7, label: "SCHOLARSHIPS", duration: 80, clockwise: true, startOffset: 0.4 },
  { ringIndex: 8, label: "JOB", duration: 140, clockwise: false, startOffset: 0.1 },
  { ringIndex: 9, label: "CAREER", duration: 40, clockwise: true, startOffset: 0.9 },
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
    // Rotate around center
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

    // Single rotation for the entire system
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

      const totalLength = ellipse.getTotalLength();
      const dot = svg.querySelector(`#node-${i}`) as SVGCircleElement;
      const label = svg.querySelector(`#label-${i}`) as SVGTextElement;
      if (!dot) return;

      // Calculate start position
      const startLen = node.startOffset * totalLength;
      const startPos = ellipse.getPointAtLength(startLen);
      dot.setAttribute("cx", String(startPos.x));
      dot.setAttribute("cy", String(startPos.y));
      if (label) {
        label.setAttribute("x", String(startPos.x + 8));
        label.setAttribute("y", String(startPos.y + 3));
      }

      // Animate along path using offset-path
      const dotAnim = dot.animate(
        [
          { offsetDistance: `${node.startOffset * 100}%`, opacity: 0.3 },
          { offsetDistance: `${(node.startOffset + 0.05) % 1 * 100}%`, opacity: 0.8 },
          { offsetDistance: `${(node.startOffset + 0.5) % 1 * 100}%`, opacity: 0.5 },
          { offsetDistance: `${(node.startOffset + 0.95) % 1 * 100}%`, opacity: 0.8 },
          { offsetDistance: `${node.startOffset * 100}%`, opacity: 0.3 },
        ],
        {
          duration: node.duration * 1000,
          iterations: Infinity,
          easing: "linear",
        }
      );

      // Label follows the dot
      if (label) {
        const labelAnim = label.animate(
          [
            { offsetDistance: `${node.startOffset * 100}%` },
            { offsetDistance: `${node.startOffset * 100}%` },
          ],
          {
            duration: node.duration * 1000,
            iterations: Infinity,
            easing: "linear",
          }
        );
        animations.push(labelAnim);
      }

      animations.push(dotAnim);
    });

    return () => {
      animations.forEach((a) => a.cancel());
    };
  }, []);

  // Offset center toward lower-left
  const centerX = 420;
  const centerY = 580;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ mixBlendMode: "soft-light" }}
    >
      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 75% 75% at 45% 55%, transparent 20%, #141416 85%)",
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
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="orbital-vignette" cx="45%" cy="55%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="50%" stopColor="white" stopOpacity="0.9" />
            <stop offset="75%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="orbital-mask">
            <rect width="1200" height="900" fill="url(#orbital-vignette)" />
          </mask>
        </defs>

        <g ref={groupRef} mask="url(#orbital-mask)">
          {/* Orbital rings */}
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

          {/* Orbital nodes */}
          {nodes.map((node, i) => (
            <g key={i}>
              <circle
                id={`node-${i}`}
                cx={centerX}
                cy={centerY}
                r={2}
                fill="white"
                opacity="0.6"
                filter="url(#node-glow)"
                style={{
                  offsetPath: `path("${generateEllipsePath(centerX, centerY, rings[node.ringIndex].rx, rings[node.ringIndex].ry, rings[node.ringIndex].tilt)}")`,
                  offsetRotate: "0deg",
                }}
              />
              {node.label && (
                <text
                  id={`label-${i}`}
                  x={centerX}
                  y={centerY}
                  fill="white"
                  opacity="0.3"
                  fontSize="8"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="600"
                  letterSpacing="0.1em"
                  style={{
                    offsetPath: `path("${generateEllipsePath(centerX, centerY, rings[node.ringIndex].rx, rings[node.ringIndex].ry, rings[node.ringIndex].tilt)}")`,
                    offsetRotate: "0deg",
                  }}
                >
                  {node.label}
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
