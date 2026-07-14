"use client";

import { useEffect, useRef } from "react";

// A small clean white circle that trails the pointer (replaces the old beam).
export const CursorDot = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }
    };

    const loop = () => {
      // Tight easing so the dot tracks closely — it *is* the cursor now.
      x += (targetX - x) * 0.5;
      y += (targetY - y) * 0.5;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full bg-white opacity-0"
    />
  );
};

export default CursorDot;
