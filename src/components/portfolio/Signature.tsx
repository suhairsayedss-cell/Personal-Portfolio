"use client";

import { motion } from "framer-motion";

// Placeholder handwritten "Suhair" signature as a single flowing stroke so it
// can draw itself (brief §Load intro 4). Swap for a real signature.svg later.
// `draw` triggers the stroke-draw animation; otherwise it renders fully drawn.
export default function Signature({
  draw = false,
  className,
  delay = 0,
}: {
  draw?: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      viewBox="0 0 320 110"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Suhair"
    >
      <motion.path
        d="M18 70 C 30 40, 54 36, 52 56 C 50 74, 34 78, 40 60 C 46 44, 66 40, 70 64 C 72 80, 64 86, 70 70 C 78 48, 92 46, 92 66 L 92 66 C 92 50, 104 44, 116 50 C 126 55, 120 74, 118 64 C 116 50, 128 44, 138 52 C 146 58, 140 76, 140 66 L 140 44 M 140 56 C 148 46, 160 46, 162 60 C 163 72, 156 78, 160 64 C 166 48, 180 46, 182 62 M 182 44 L 182 70 M 182 52 C 190 44, 202 46, 206 56 M 210 66 C 222 44, 244 40, 246 60 C 247 74, 232 80, 236 62 C 240 46, 262 42, 272 58 C 282 74, 274 84, 280 70 C 288 52, 300 50, 302 64"
        stroke="var(--signature)"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={draw ? { pathLength: 0, opacity: 0 } : false}
        animate={draw ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
        transition={
          draw
            ? { pathLength: { duration: 1.2, delay, ease: "easeInOut" }, opacity: { duration: 0.2, delay } }
            : undefined
        }
      />
    </svg>
  );
}
