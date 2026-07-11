"use client";

import React from "react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

// lucide-react removed its brand icons, so we define the two we need inline.
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MinimalistHeroDemo = () => {
  const socialLinks = [
    { icon: InstagramIcon, href: "https://www.instagram.com/suhair.sayed/" },
    { icon: LinkedinIcon, href: "https://www.linkedin.com/in/suhair-sayed-a76759197/" },
  ];

  return (
    <MinimalistHero
      // z-30 lifts this above the hero's fixed canvas/overlays AND above the
      // quote section below, so the circle's glow can bleed past the section
      // edge and fade over the seam instead of being clipped.
      className="relative z-30"
      mainText={
        <>
          I&apos;m <span className="kw-name">Mohamed Gous Sayed</span>, though most people just call
          me Suhair. Content <span className="kw">strategist</span> by profession, storyteller by
          instinct. I turn scattered ideas into sharp narratives and brands into voices people
          actually listen to, running the whole thing on good <span className="kw">coffee</span> and
          an even better <span className="kw">playlist</span>.
        </>
      }
      supportingText={
        <>
          People don&apos;t just know me as a{" "}
          <strong className="font-semibold text-foreground/80">strategist</strong>. They know me as
          the one who finds the story hiding in the data and makes it impossible to scroll past.
        </>
      }
      imageSrc="/profile.jpg"
      imageAlt="Mohamed Gous Sayed"
      overlayText={{ part1: "make it", part2: "matter." }}
      socialLinks={socialLinks}
      locationText="Based in Exeter, UK."
    />
  );
};

export default MinimalistHeroDemo;
