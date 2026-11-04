"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RollingText from "./RollingText";
import { menuLinks } from "@/data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

// Bottom-centre menu (brief §Fixed UI 2). A yellow pill morphs (width, height,
// radius) into a dark panel that grows upward with the nav links.
export default function MenuPill() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-8 z-50 flex justify-center md:bottom-10">
      <motion.div
        layout
        transition={{ duration: 0.5, ease: EASE }}
        className="overflow-hidden"
        style={{ transformOrigin: "bottom center" }}
        animate={{
          width: open ? 280 : 156,
          height: open ? 260 : 50,
          borderRadius: open ? 24 : 999,
          backgroundColor: open ? "#242424" : "#ffe862",
          border: open ? "1px solid #3a3a3a" : "1px solid #e4cf4a",
        }}
        initial={false}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="panel"
              className="flex h-full flex-col px-6 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-1 flex-col items-center justify-center gap-3">
                {menuLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.target}
                    onClick={() => setOpen(false)}
                    className="roll font-display text-2xl text-cream"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.4, ease: EASE }}
                  >
                    <RollingText text={link.label} />
                  </motion.a>
                ))}
              </nav>
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-cream/70">
                <span>Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-base leading-none text-cream"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="pill"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-full w-full items-center justify-between px-5 text-ink"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="roll text-sm font-medium">
                <RollingText text="Menu" />
              </span>
              <span className="flex flex-col gap-[5px]" aria-hidden>
                <span className="block h-px w-5 bg-ink" />
                <span className="block h-px w-5 bg-ink" />
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
