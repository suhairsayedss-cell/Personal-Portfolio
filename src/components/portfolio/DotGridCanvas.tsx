"use client";

import { useEffect, useRef } from "react";

// Interactive dot grid on a 2D canvas (brief §1.6.4). Dots within ~150px of
// the cursor grow larger and darker with a smooth, eased falloff; they ease
// back when the cursor leaves. Under reduced motion it renders a static grid.
export default function DotGridCanvas({
  variant = "yellow",
  className,
}: {
  variant?: "yellow" | "dark";
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Darker yellow dots on yellow; subtle light-grey dots on dark.
    const base = variant === "yellow" ? [214, 190, 70] : [120, 120, 120];
    const hot = variant === "yellow" ? [90, 75, 20] : [247, 241, 237];

    const GAP = 20;
    const BASE_R = variant === "yellow" ? 1.6 : 1.3;
    const MAX_R = variant === "yellow" ? 4.2 : 3.4;
    const RADIUS = 150;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const mouse = { x: -9999, y: -9999 };
    type Dot = { x: number; y: number; r: number; t: number };
    let dots: Dot[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP; y < h; y += GAP) {
        for (let x = GAP; x < w; x += GAP) {
          dots.push({ x, y, r: BASE_R, t: 0 });
        }
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const paintStatic = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`;
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, BASE_R, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const target = dist < RADIUS ? 1 - dist / RADIUS : 0;
        // ease current intensity toward target every frame
        d.t = lerp(d.t, target, 0.12);
        const eased = d.t * d.t * (3 - 2 * d.t); // smoothstep
        d.r = lerp(BASE_R, MAX_R, eased);
        const r = Math.round(lerp(base[0], hot[0], eased));
        const g = Math.round(lerp(base[1], hot[1], eased));
        const b = Math.round(lerp(base[2], hot[2], eased));
        const a = lerp(0.55, 1, eased);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    const ro = new ResizeObserver(() => {
      build();
      if (reduce) paintStatic();
    });
    ro.observe(canvas);

    if (reduce) {
      paintStatic();
    } else {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerout", onLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, [variant]);

  return <canvas ref={ref} className={className} />;
}
