"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import DotGridCanvas from "../DotGridCanvas";
import { rolePills } from "@/data/content";

// Yellow portrait reveal (brief §Section 2). A pinned yellow panel with the
// interactive dot grid, a cut-out portrait rising from the bottom, a white
// brush stroke wiping in on scroll, and three dark role pills pinned over the
// portrait. Tucks under the hero's stepped edge so the notches read as yellow.
export default function PortraitReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Portrait rises as the section scrolls through.
  const portraitY = useTransform(scrollYProgress, [0.1, 0.6], ["30%", "-4%"]);
  // Brush stroke wipes left → right.
  const brushClip = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  return (
    <section
      ref={ref}
      className="relative -mt-[44px] h-[200vh] bg-yellow"
    >
      <div className="sticky top-0 flex h-screen items-end justify-center overflow-hidden">
        {/* Interactive dot grid */}
        <DotGridCanvas variant="yellow" className="absolute inset-0 h-full w-full" />

        {/* White brush stroke behind the portrait */}
        <motion.div
          className="absolute bottom-0 left-1/2 h-[62%] w-[78%] -translate-x-1/2"
          style={{ clipPath: brushClip }}
        >
          <div className="brush-stroke h-full w-full" />
        </motion.div>

        {/* Portrait (cut-out placeholder uses the existing profile photo) */}
        <motion.div
          className="relative z-10 h-[78vh] w-auto"
          style={{ y: portraitY }}
        >
          <div className="relative h-full w-[min(70vw,480px)]">
            <Image
              src="/profile.jpg"
              alt="Suhair Sayed"
              fill
              priority
              sizes="(max-width: 768px) 70vw, 480px"
              className="object-contain object-bottom"
            />
          </div>
        </motion.div>

        {/* Three dark role pills, pinned over the portrait */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-wrap justify-center">
          {rolePills.map((label, i) => (
            <motion.span
              key={label}
              className="font-body rounded-full bg-ink px-6 py-3 text-[clamp(16px,3.2vw,32px)] leading-none text-cream"
              style={{ marginLeft: i === 0 ? 0 : -1 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
