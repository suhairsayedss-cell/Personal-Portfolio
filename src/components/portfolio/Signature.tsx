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
        d="M16 64 C 26 36, 50 34, 48 52 C 46 68, 30 70, 34 54 C 38 40, 58 40, 60 66 C 61 80, 54 82, 56 66 C 60 42, 80 42, 82 68 C 83 80, 90 80, 96 64 C 104 44, 118 44, 118 66 C 118 50, 130 44, 140 54 C 148 62, 140 78, 138 64 C 136 48, 150 44, 160 56 C 166 64, 160 78, 160 64 C 160 48, 176 42, 186 58 C 190 66, 184 54, 194 52 C 206 48, 214 60, 212 66 C 224 42, 252 38, 256 60 C 258 76, 240 80, 244 62 C 248 46, 276 44, 288 60 C 300 76, 292 84, 300 66 C 306 54, 316 56, 318 66"
        stroke="var(--signature)"
        strokeWidth={4.5}
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
