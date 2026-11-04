"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Signature from "../Signature";
import { hero } from "@/data/content";
import { INTRO_MS, shouldPlayIntro } from "../intro";

const EASE = [0.22, 1, 0.36, 1] as const;

// Hero (brief §Section 1): cream, full screen, graph paper, signature pinned
// at top centre, two-line name sitting low, side labels revealing from behind
// a mask, stepped pixel edge at the bottom revealing the yellow beneath.
export default function Hero() {
  // Start the entrance just as the intro overlay lifts (or immediately if the
  // intro isn't playing this load).
  const [begin, setBegin] = useState(false);
  useEffect(() => {
    const delay = shouldPlayIntro() ? INTRO_MS : 150;
    const t = setTimeout(() => setBegin(true), delay);
    return () => clearTimeout(t);
  }, []);

  const letters = hero.nameLines;

  return (
    <section
      id="home"
      className="graph-paper graph-paper-fade stepped-edge-bottom relative z-10 flex min-h-screen flex-col bg-cream"
    >
      {/* Signature at top centre (7.5vh) */}
      <motion.div
        className="absolute left-1/2 top-[7.5vh] w-[135px] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: begin ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <Signature className="h-auto w-full" />
      </motion.div>

      {/* Name + side labels, centred, sitting low with ~40vh below */}
      <div className="relative mt-auto flex w-full flex-1 flex-col items-center justify-end pb-[40vh]">
        {/* Side labels */}
        <div className="mb-10 hidden w-full max-w-[90%] items-center justify-between md:flex">
          <SideLabel lines={hero.leftLabel} align="left" begin={begin} />
          <SideLabel lines={hero.rightLabel} align="right" begin={begin} />
        </div>

        <h1 className="flex flex-col items-center text-center text-ink">
          {letters.map((line, li) => (
            <span key={li} className="roll-mask overflow-hidden py-[0.02em]">
              <motion.span
                className="font-display block text-[clamp(56px,11vw,160px)]"
                initial={{ y: "110%" }}
                animate={{ y: begin ? "0%" : "110%" }}
                transition={{ duration: 0.9, ease: EASE, delay: li * 0.08 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Mobile: labels merge into one centred line under the name */}
        <motion.div
          className="mt-6 flex gap-6 text-sm text-muted md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: begin ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span>{hero.leftLabel.join(" ")}</span>
          <span>·</span>
          <span>{hero.rightLabel.join(" ")}</span>
        </motion.div>
      </div>
    </section>
  );
}

function SideLabel({
  lines,
  align,
  begin,
}: {
  lines: string[];
  align: "left" | "right";
  begin: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 ${align === "right" ? "flex-row-reverse" : ""}`}
    >
      <motion.span
        className="block h-px w-12 bg-frame"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: begin ? 1 : 0 }}
        style={{ transformOrigin: align === "left" ? "left" : "right" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
      />
      <span className="overflow-hidden">
        <motion.span
          className={`block text-base leading-tight text-ink ${align === "right" ? "text-right" : ""}`}
          initial={{ y: "110%" }}
          animate={{ y: begin ? "0%" : "110%" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        >
          {lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </motion.span>
      </span>
    </div>
  );
}
