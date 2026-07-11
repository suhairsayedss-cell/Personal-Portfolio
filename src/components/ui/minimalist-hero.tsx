"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Accepts any icon rendered as a component taking a className (lucide icons
// or plain inline SVGs).
type IconComponent = React.ComponentType<{ className?: string }>;

// Props interface for type safety and reusability
interface MinimalistHeroProps {
  mainText: React.ReactNode;
  supportingText?: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: IconComponent; href: string }[];
  locationText: string;
  className?: string;
}

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: IconComponent }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground/60 transition-colors hover:text-foreground"
  >
    <Icon className="h-7 w-7" />
  </a>
);

// The main reusable About / Hero section component
export const MinimalistHero = ({
  mainText,
  supportingText,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-between p-8 pt-[34vh] font-sans md:p-12 md:pt-[38vh]",
        className
      )}
      // Fade the top into black so it blends seamlessly with the hero above,
      // then stay fully opaque below to keep covering the hero's fixed overlays.
      style={{
        background:
          "linear-gradient(to bottom, transparent 0, rgb(5 6 10) 32vh, rgb(5 6 10) 100%)",
      }}
    >
      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 md:order-1 text-center md:text-left md:-translate-x-6 lg:-translate-x-12"
        >
          <p className="mx-auto max-w-xs text-base leading-relaxed text-foreground/80 md:mx-0">
            {mainText}
          </p>
          {supportingText && (
            <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-foreground/50 md:mx-0">
              {supportingText}
            </p>
          )}
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-0 h-[360px] w-[360px] rounded-full bg-[#dd3f32] md:h-[460px] md:w-[460px] lg:h-[560px] lg:w-[560px]"
            style={{ boxShadow: "0 0 110px 18px rgba(221, 63, 50, 0.5)" }}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="absolute z-10 h-[360px] w-[360px] overflow-hidden rounded-full md:h-[460px] md:w-[460px] lg:h-[560px] lg:w-[560px]"
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover object-[50%_20%]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/400x600/ff4b42/ffffff?text=Image+Not+Found`;
              }}
            />
          </motion.div>
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="overlay-title text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-base font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
