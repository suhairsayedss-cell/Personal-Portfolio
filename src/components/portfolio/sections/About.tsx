"use client";

import { motion } from "framer-motion";
import { about } from "@/data/content";

// About & credentials (brief §Section 6): a short two-line intro and the
// credentials list shown with 1px grey dividers, within the frame style.
export default function About() {
  return (
    <section
      id="about"
      className="stepped-edge-bottom relative z-10 bg-cream px-[6%] py-24 pb-32 md:py-28 md:pb-36"
    >
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="font-body max-w-2xl text-[clamp(20px,3vw,30px)] leading-snug text-ink"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {about.intro.join(" ")}
        </motion.p>

        <ul className="mt-14 border-t border-frame">
          {about.credentials.map((c, i) => (
            <motion.li
              key={c}
              className="font-body flex items-start gap-4 border-b border-frame py-4 text-[clamp(14px,2vw,18px)] text-ink"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <span className="mt-1 text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span>{c}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
