"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from "framer-motion";
import DotGridCanvas from "../DotGridCanvas";
import ClayLayer from "../ClayLayer";
import { statement } from "@/data/content";

const words = statement.lines.flat();

// Dark statement (brief §Section 3): pinned, subtle dot grid, a 3-line
// statement whose words turn from grey to cream one by one on scroll, soft
// clay-like placeholder objects that rotate with scroll, a cream wavy line
// that draws across, and a torn bottom edge.
export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rot = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const rot2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const wavy = useTransform(scrollYProgress, [0.3, 0.9], [0, 1]);

  // progress → number of revealed words
  const litCount = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    litCount.set(Math.round(v * (words.length + 2)));
  });

  return (
    <section ref={ref} className="relative h-[240vh] bg-ink">
      <div className="torn-edge-bottom sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-ink">
        <DotGridCanvas variant="dark" className="absolute inset-0 h-full w-full opacity-60" />

        {/* Real 3D clay objects (motion-allowed). */}
        <ClayLayer kind="statement" className="pointer-events-none absolute inset-0 z-[5]" />

        {/* Static CSS clay shapes — reduced-motion fallback only. */}
        <div className="hidden motion-reduce:block">
          <motion.div style={{ rotate: rot }} className="absolute left-[12%] top-[22%]">
            <div className="h-20 w-20 rounded-[28px] bg-gradient-to-br from-yellow to-yellow-deep shadow-[0_18px_40px_rgba(0,0,0,0.45)]" />
          </motion.div>
          <motion.div style={{ rotate: rot2 }} className="absolute right-[14%] top-[28%]">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-signature to-[#c85a25] shadow-[0_18px_40px_rgba(0,0,0,0.45)]" />
          </motion.div>
          <motion.div style={{ rotate: rot }} className="absolute bottom-[18%] right-[22%]">
            <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-gradient-to-br from-[#3a3a3a] to-[#1c1c1c] shadow-[0_18px_40px_rgba(0,0,0,0.45)] ring-2 ring-yellow/70">
              <span className="text-2xl">✎</span>
            </div>
          </motion.div>
        </div>

        {/* Statement text */}
        <h2 className="font-body relative z-10 max-w-[90%] text-center text-[clamp(32px,6vw,80px)] font-light leading-[1.05]">
          {statement.lines.map((line, li) => {
            const before = statement.lines.slice(0, li).flat().length;
            return (
              <span key={li} className="block">
                {line.map((word, wi) => {
                  const idx = before + wi;
                  return (
                    <Word key={idx} index={idx} lit={litCount} bold={word.bold}>
                      {word.text}
                    </Word>
                  );
                })}
              </span>
            );
          })}
        </h2>

        {/* Cream wavy line drawing across the lower part */}
        <svg
          className="wavy-line absolute bottom-[16%] left-0 w-full"
          height="40"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d="M0 20 C 100 0, 200 40, 300 20 S 500 0, 600 20 S 800 40, 900 20 S 1100 0, 1200 20"
            style={{ pathLength: wavy }}
          />
        </svg>
      </div>
    </section>
  );
}

function Word({
  children,
  index,
  lit,
  bold,
}: {
  children: string;
  index: number;
  lit: ReturnType<typeof useMotionValue<number>>;
  bold?: boolean;
}) {
  const color = useTransform(lit, (c) =>
    c > index ? "rgba(247,241,237,1)" : "rgba(247,241,237,0.28)"
  );
  return (
    <>
      <motion.span style={{ color }} className={bold ? "font-semibold" : undefined}>
        {children}
      </motion.span>{" "}
    </>
  );
}
