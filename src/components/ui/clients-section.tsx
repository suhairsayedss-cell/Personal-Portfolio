"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

// Client logos, pre-processed into flat white-on-transparent PNGs
// (see /public/logos). Arranged 4 per row → 2 rows of 4.
const CLIENTS = [
  { name: "Esmagico", src: "/logos/esmagico.png" },
  { name: "Hilo Design", src: "/logos/hilo.png" },
  { name: "The Health Factory", src: "/logos/thf.png" },
  { name: "Chit Chat Chai", src: "/logos/ccc.png" },
  { name: "Body Café", src: "/logos/bodycafe.png" },
  { name: "Scott Eyewear", src: "/logos/scott.png" },
  { name: "Self Love Soaps", src: "/logos/sls.png" },
  { name: "The Wandering Bean", src: "/logos/twb.png" },
];

// Parent orchestrates a gentle staggered fade-in as the grid scrolls into view.
const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// Each logo fades up softly (same easing curve used elsewhere on the site).
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const ClientsSection = () => {
  return (
    <section className="relative z-20 w-full bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        {/* Eyebrow-style label — the original uppercase/tracked style, nudged
            up a size. Change this copy to whatever you prefer. */}
        <p className="mb-16 text-center text-lg uppercase tracking-[0.35em] text-foreground/40">
          Brands I&apos;ve worked with
        </p>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4 md:gap-x-12 md:gap-y-20"
        >
          {CLIENTS.map((client) => (
            <motion.div
              key={client.name}
              variants={itemVariants}
              className="flex items-center justify-center"
            >
              <img
                src={client.src}
                alt={client.name}
                className="client-logo"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
