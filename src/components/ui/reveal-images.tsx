"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { BGPattern } from "@/components/ui/bg-pattern";

interface ImageSource {
  src: string;
  alt: string;
}

interface RevealImageListItemProps {
  text: string;
  images: [ImageSource, ImageSource];
}

// Shared fallback so a missing Unsplash image degrades to an on-brand tile
// instead of a broken-image icon.
const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.currentTarget;
  target.onerror = null;
  target.src = "https://placehold.co/400x400/0a0a0a/ff4b42?text=%20";
};

function RevealImageListItem({ text, images }: RevealImageListItemProps) {
  const container = "absolute right-8 -top-1 z-40 h-20 w-16";
  const effect =
    "relative duration-500 delay-100 shadow-none group-hover:shadow-xl scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full w-16 h-16 overflow-hidden transition-all rounded-md";

  return (
    <div className="group relative h-fit w-fit overflow-visible py-6">
      <h3 className="text-5xl font-black text-foreground transition-all duration-500 group-hover:opacity-40 md:text-7xl">
        {text}
      </h3>
      <div className={container}>
        <div className={effect}>
          <img
            alt={images[1].alt}
            src={images[1].src}
            onError={handleImgError}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div
        className={cn(
          container,
          "translate-x-0 translate-y-0 rotate-0 transition-all delay-150 duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:rotate-12",
        )}
      >
        <div className={cn(effect, "duration-200")}>
          <img
            alt={images[0].alt}
            src={images[0].src}
            onError={handleImgError}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

// The five services, each with a pair of images revealed on hover.
const SERVICES: RevealImageListItemProps[] = [
  {
    text: "Content strategy",
    images: [
      { src: "/work/content-strategy/1.jpg", alt: "Content strategy work sample" },
      { src: "/work/content-strategy/2.jpg", alt: "Content strategy work sample" },
    ],
  },
  {
    text: "Web development",
    images: [
      {
        src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&auto=format&fit=crop&q=60",
        alt: "Code on a screen",
      },
      {
        src: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&auto=format&fit=crop&q=60",
        alt: "Website design mockup",
      },
    ],
  },
  {
    text: "Social media marketing",
    images: [
      { src: "/work/social-media-marketing/1.jpg", alt: "Social media marketing work sample" },
      { src: "/work/social-media-marketing/2.jpg", alt: "Social media marketing work sample" },
    ],
  },
  {
    text: "Branding",
    images: [
      { src: "/work/branding/1.jpg", alt: "Branding work sample" },
      { src: "/work/branding/2.jpg", alt: "Branding work sample" },
    ],
  },
  {
    text: "Performance marketing",
    images: [
      { src: "/work/performance-marketing/1.jpg", alt: "Performance marketing work sample" },
      { src: "/work/performance-marketing/2.jpg", alt: "Performance marketing work sample" },
    ],
  },
];

// Gentle staggered fade-in as the section scrolls into view (matches the
// Clients section).
const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function RevealImageList() {
  return (
    <section className="relative z-20 w-full overflow-hidden bg-background text-foreground">
      {/* Subtle patterned backdrop behind the services. Swap `variant` to any of:
          dots | diagonal-stripes | grid | horizontal-lines | vertical-lines | checkerboard */}
      <BGPattern variant="grid" mask="fade-edges" size={40} fill="rgba(255,255,255,0.06)" />

      <div className="relative mx-auto max-w-5xl px-6 py-28 md:py-36">
        {/* Section label — same style as the Clients section */}
        <p className="mb-16 text-center text-lg uppercase tracking-[0.35em] text-foreground/40">
          What I do
        </p>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto flex w-fit flex-col items-start"
        >
          {SERVICES.map((item) => (
            <motion.div key={item.text} variants={itemVariants}>
              <RevealImageListItem text={item.text} images={item.images} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { RevealImageList, RevealImageListItem };
