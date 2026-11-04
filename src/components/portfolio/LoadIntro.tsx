"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Signature from "./Signature";
import { shouldPlayIntro, markIntroSeen } from "./intro";

const EASE = [0.22, 1, 0.36, 1] as const;

// First-load reveal (brief §Load intro): cream + grid → frame lines draw down
// → grey mid lines slide in → signature draws → signature shrinks to top →
// overlay lifts to reveal the Hero (which runs its own entrance). Plays once
// per session; skipped entirely under reduced motion.
export default function LoadIntro() {
  const [play, setPlay] = useState(false);
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (shouldPlayIntro()) {
      setPlay(true);
      setDone(false);
    }
    markIntroSeen();
  }, []);

  if (done || !play) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="graph-paper fixed inset-0 z-[60] overflow-hidden bg-cream"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Frame lines draw down */}
        <motion.span
          className="absolute top-0 w-px origin-top"
          style={{ left: "var(--frame-inset)", height: "100%", background: "var(--frame)" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
        <motion.span
          className="absolute top-0 w-px origin-top"
          style={{ right: "var(--frame-inset)", height: "100%", background: "var(--frame)" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        />

        {/* Grey mid lines slide in from both sides */}
        <motion.span
          className="absolute top-1/2 left-[12%] h-px w-[26%] origin-left"
          style={{ background: "var(--frame)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
        />
        <motion.span
          className="absolute top-1/2 right-[12%] h-px w-[26%] origin-right"
          style={{ background: "var(--frame)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
        />

        {/* Signature: draws in the centre, then shrinks and moves to top */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[260px] -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 1, top: "50%", opacity: 1 }}
          animate={{ scale: 0.52, top: "7.5vh", opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6, ease: EASE }}
          onAnimationComplete={() => {
            // lift the overlay just after the signature settles at the top
            setTimeout(() => setDone(true), 120);
          }}
        >
          <Signature draw delay={0.8} className="h-auto w-full" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
