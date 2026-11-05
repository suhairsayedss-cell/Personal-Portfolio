"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Signature from "../Signature";
import { hero } from "@/data/content";
import { INTRO_MS, shouldPlayIntro } from "../intro";

const EASE = [0.22, 1, 0.36, 1] as const;
const INSET = { left: "var(--frame-inset)", right: "var(--frame-inset)" } as const;

// Hero (brief §Section 1): cream, full screen, graph paper, signature pinned
// at top centre, the name centred on screen, and the side labels flanking the
// name at its vertical middle — each joined to its frame line by a thin grey
// rule (matching the reference). Stepped pixel edge reveals the yellow beneath.
export default function Hero() {
  // Start the entrance just as the intro overlay lifts (or immediately if the
  // intro isn't playing this load).
  const [begin, setBegin] = useState(false);
  useEffect(() => {
    const delay = shouldPlayIntro() ? INTRO_MS : 150;
    const t = setTimeout(() => setBegin(true), delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="graph-paper graph-paper-fade stepped-edge-bottom relative z-10 min-h-screen bg-cream"
    >
      {/* Signature at top centre (7.5vh) */}
      <motion.div
        className="absolute left-1/2 top-[7.5vh] w-[150px] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: begin ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <Signature className="h-auto w-full" />
      </motion.div>

      {/* Name — centred on screen */}
      <div className="absolute inset-0 flex items-center justify-center px-[27%]">
        <h1 className="flex flex-col items-center text-center text-ink">
          {hero.nameLines.map((line, li) => (
            <span key={li} className="overflow-hidden py-[0.02em]">
              <motion.span
                className="font-display block text-[clamp(52px,10.5vw,150px)]"
                initial={{ y: "110%" }}
                animate={{ y: begin ? "0%" : "110%" }}
                transition={{ duration: 0.9, ease: EASE, delay: li * 0.08 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {/* Desktop side labels, flanking the name at its vertical middle, each
          joined to its frame line by a thin grey rule. */}
      <div
        className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 items-center justify-between md:flex"
        style={INSET}
      >
        <SideLabel text={hero.leftLabel.join(" ")} align="left" begin={begin} />
        <SideLabel text={hero.rightLabel.join(" ")} align="right" begin={begin} />
      </div>

      {/* Mobile: labels merge into one centred line, below the name */}
      <motion.div
        className="absolute inset-x-0 top-[62%] flex justify-center gap-5 px-6 text-sm text-muted md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: begin ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span>{hero.leftLabel.join(" ")}</span>
        <span>·</span>
        <span>{hero.rightLabel.join(" ")}</span>
      </motion.div>
    </section>
  );
}

function SideLabel({
  text,
  align,
  begin,
}: {
  text: string;
  align: "left" | "right";
  begin: boolean;
}) {
  const line = (
    <motion.span
      className="h-px flex-1 bg-frame"
      style={{ transformOrigin: align === "left" ? "left" : "right" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: begin ? 1 : 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
    />
  );
  const label = (
    <span className="overflow-hidden">
      <motion.span
        className="block whitespace-nowrap text-[clamp(15px,1.3vw,20px)] text-ink"
        initial={{ y: "120%" }}
        animate={{ y: begin ? "0%" : "120%" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <div className="flex w-[24%] items-center gap-5">
      {align === "left" ? (
        <>
          {line}
          {label}
        </>
      ) : (
        <>
          {label}
          {line}
        </>
      )}
    </div>
  );
}
