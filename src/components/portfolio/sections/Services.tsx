"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { services } from "@/data/content";

// Services (brief §Section 4): cream, pinned. An intro line, three large
// right-aligned uppercase display lines; as you scroll, one line at a time
// becomes active (ink, ~15% larger) while the rest stay soft grey. A small
// spinning placeholder object floats to the right.
export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(services.list.length - 1, Math.floor(v * services.list.length));
    setActive(i);
  });

  const spin = useTransform(scrollYProgress, [0, 1], [0, 540]);

  return (
    <section ref={ref} className="relative h-[220vh] bg-cream">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[90%]">
          <p className="font-body mb-10 text-center text-[clamp(16px,2vw,24px)] text-muted">
            {services.intro}
          </p>

          <div className="relative">
            <ul className="flex flex-col items-end gap-2 pr-[6%]">
              {services.list.map((line, i) => {
                const on = i === active;
                return (
                  <li key={line} className="origin-right">
                    <motion.span
                      className="font-display block text-right text-[clamp(34px,8vw,64px)]"
                      animate={{
                        scale: on ? 1.15 : 1,
                        color: on ? "#242424" : "#c8c3bf",
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {line}
                    </motion.span>
                  </li>
                );
              })}
            </ul>

            {/* Spinning placeholder object */}
            <motion.div
              style={{ rotate: spin }}
              className="absolute left-[6%] top-1/2 hidden -translate-y-1/2 md:block"
            >
              <div className="h-16 w-16 rounded-[22px] bg-gradient-to-br from-yellow to-yellow-deep shadow-[0_14px_34px_rgba(0,0,0,0.18)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
