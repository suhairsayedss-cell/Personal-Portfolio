"use client";

import React from "react";
import { motion, useInView, type Variants } from "framer-motion";

type TimelineTag = "div" | "h1" | "h2" | "h3" | "p" | "span" | "article";

interface TimelineContentProps {
  children: React.ReactNode;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement>;
  customVariants?: Variants;
  className?: string;
  as?: TimelineTag;
  once?: boolean;
  [key: string]: unknown;
}

// Reveals its children (blur + slide up) once `timelineRef` scrolls into view.
// `animationNum` feeds framer's `custom`, so each item can stagger its delay.
export const TimelineContent = ({
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  as = "div",
  once = true,
  ...props
}: TimelineContentProps) => {
  const defaultVariants: Variants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  };

  const variants = customVariants || defaultVariants;
  const isInView = useInView(timelineRef, { once });
  const MotionComponent = motion[as] as React.ComponentType<Record<string, unknown>>;

  return (
    <MotionComponent
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default TimelineContent;
