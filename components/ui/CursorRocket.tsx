"use client";

import { useEffect, useRef, useState } from "react";
import { Rocket } from "lucide-react";

const TRAIL_LENGTH = 30;
const LERP_FACTOR = 0.15;
const SCROLL_ZONE = 0.2;
const SCROLL_SPEED = 14;

export default function CursorRocket() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });
  const prevPosRef = useRef({ x: -100, y: -100 });
  const angleRef = useRef(0);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rocket = rocketRef.current;
    if (!canvas || !rocket) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isClickable = (el: Element | null): boolean => {
      if (!el || el === document.body) return false;
      const tag = el.tagName.toLowerCase();
      if (tag === "a" || tag === "button" || tag === "input" || tag === "select" || tag === "textarea") return true;
      if ((el as HTMLElement).role === "button" || (el as HTMLElement).tabIndex === 0) return true;
      if (el.closest("a, button, [role='button'], [tabindex='0']")) return true;
      return false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) {
        setVisible(true);
        document.body.style.cursor = "none";
      }

      const target = document.elementFromPoint(e.clientX, e.clientY);
      setIsHoveringClickable(isClickable(target));

      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - vh;
      const cursorYRatio = e.clientY / vh;

      if (cursorYRatio > 1 - SCROLL_ZONE && scrollY < maxScroll) {
        const strength = (cursorYRatio - (1 - SCROLL_ZONE)) / SCROLL_ZONE;
        window.scrollBy(0, strength * SCROLL_SPEED);
      } else if (cursorYRatio < SCROLL_ZONE && scrollY > 0) {
        const strength = (SCROLL_ZONE - cursorYRatio) / SCROLL_ZONE;
        window.scrollBy(0, -strength * SCROLL_SPEED);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -100, y: -100 };
      setVisible(false);
      document.body.style.cursor = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      const pos = posRef.current;
      const prevPos = prevPosRef.current;
      const mouse = mouseRef.current;

      pos.x = lerp(pos.x, mouse.x, LERP_FACTOR);
      pos.y = lerp(pos.y, mouse.y, LERP_FACTOR);

      const dx = pos.x - prevPos.x;
      const dy = pos.y - prevPos.y;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        let diff = targetAngle - angleRef.current;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        angleRef.current += diff * 0.1;
      }

      prevPosRef.current = { x: pos.x, y: pos.y };

      const scale = isHoveringClickable ? 1.4 : 1;
      rocket.style.transform = `translate(${pos.x - 14}px, ${pos.y - 14}px) rotate(${angleRef.current}deg) scale(${scale})`;

      trailRef.current.push({ x: pos.x, y: pos.y });
      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.shift();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trail = trailRef.current;
      if (trail.length > 2) {
        ctx.setLineDash([4, 6]);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(161, 161, 170, 0.3)";
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          ctx.lineTo(trail[i].x, trail[i].y);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        for (let i = 1; i < trail.length; i++) {
          const progress = i / trail.length;
          const alpha = progress * 0.5;
          const radius = progress * 2.5;

          ctx.beginPath();
          ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(113, 113, 122, ${alpha})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "";
    };
  }, [visible, isHoveringClickable]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[100]"
      />
      <div
        ref={rocketRef}
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
          willChange: "transform",
        }}
      >
        <Rocket
          className={`h-7 w-7 transition-colors duration-150 ${
            isHoveringClickable ? "text-indigo-500" : "text-zinc-700"
          }`}
          fill={isHoveringClickable ? "#e0e7ff" : "white"}
          strokeWidth={1.5}
        />
      </div>
    </>
  );
}
