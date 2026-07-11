"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";

interface ResultBullet {
  lead: string; // bold leading stat/word
  rest: string; // muted remainder
}

interface CaseStudy {
  eyebrow: string;
  headline: string;
  tagline: string;
  results: [ResultBullet, ResultBullet, ResultBullet];
  cta: string;
}

// Ranked by strongest headline stat first (see section data file).
const CASE_STUDIES: CaseStudy[] = [
  {
    eyebrow: "Scott Eyewear · Video & Social",
    headline: "10 Million Video Views",
    tagline: "The freshest international styles in fashion eyewear.",
    results: [
      { lead: "67% increase", rest: " in followers" },
      { lead: "40,000", rest: " total followers" },
      { lead: "Increased", rest: " brand engagement" },
    ],
    cta: "View full breakdown",
  },
  {
    eyebrow: "The Health Factory · Google Ads",
    headline: "2X Growth on Google Ads",
    tagline: "High-protein breads, health food scaled on Google Ads.",
    results: [
      { lead: "36% boost", rest: " in conversion rate" },
      { lead: "576", rest: " average monthly orders" },
      { lead: "$1.42", rest: " cost per acquisition" },
    ],
    cta: "View full breakdown",
  },
  {
    eyebrow: "Chit Chat Chai · Paid Social",
    headline: "400,000 Impressions in 15 Days",
    tagline: "Chai reborn in blends and brews.",
    results: [
      { lead: "5,000", rest: " clicks" },
      { lead: "650", rest: " add-to-cart actions" },
      { lead: "5.8%", rest: " click-through rate" },
    ],
    cta: "View full breakdown",
  },
];

// Small up-right arrow (inline SVG, matching the site's custom-icon approach).
const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const CaseStudiesSection = () => {
  return (
    <section className="relative z-20 w-full overflow-hidden bg-background text-foreground">
      {/* No section title — flows straight on from "Brands I've worked with". */}
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3"
        >
          {CASE_STUDIES.map((cs) => (
            <motion.div key={cs.headline} variants={itemVariants} className="h-full">
              <GlowCard glowColor="brand" customSize className="h-full w-full !p-6">
                {/* Top block (fills the flexible row) */}
                <div className="flex flex-col gap-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-foreground/40">
                    {cs.eyebrow}
                  </p>

                  <h3 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                    {cs.headline}
                  </h3>

                  <p className="text-sm italic leading-relaxed text-foreground/50">{cs.tagline}</p>

                  <div className="mt-2">
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#c084fc]">
                      The result
                    </p>
                    <ul className="flex flex-col gap-2">
                      {cs.results.map((r) => (
                        <li key={r.lead} className="flex items-baseline gap-2 text-sm leading-snug">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ff4b42]" />
                          <span>
                            <span className="font-semibold text-foreground">{r.lead}</span>
                            <span className="text-foreground/50">{r.rest}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom row: CTA, aligned across all three cards */}
                <button
                  type="button"
                  className="group/cta mt-2 inline-flex items-center gap-1.5 self-start text-sm font-medium text-foreground/70 transition-colors hover:text-[#ff4b42]"
                >
                  {cs.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </button>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
