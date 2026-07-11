"use client";

import React, { useEffect, useState } from "react";

// The typewriter cycles a few on-brand phrases, leading with the requested one.
const TYPE_PHRASES = [
  "story, data, and tech",
  "art and analytics",
  "words and numbers",
  "instinct and data",
];

// A small corner "+" marker used on the four corners of the box.
const CornerPlus = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={4}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 4v16M4 12h16" />
  </svg>
);

// Isolated so only this small piece re-renders on each keystroke.
const Typewriter = () => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let idx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = TYPE_PHRASES[idx];
      if (!deleting) {
        charIdx++;
        setTyped(current.slice(0, charIdx));
        if (charIdx === current.length) {
          deleting = true;
          timer = setTimeout(tick, 1400);
          return;
        }
        timer = setTimeout(tick, 80);
      } else {
        charIdx--;
        setTyped(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          idx = (idx + 1) % TYPE_PHRASES.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 30);
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <span className="typed-accent" aria-hidden="true">
        {typed}
        <span className="type-cursor" />
      </span>
      {/* Canonical text for screen readers, since the visible copy animates. */}
      <span className="sr-only">story, data, and tech</span>
    </>
  );
};

export const QuoteSection = () => {
  return (
    <section className="relative z-20 w-full bg-background text-foreground">
      {/* ambient glow that bleeds up to blend into the section above */}
      <div className="quote-glow-top" />

      {/* faint grid toward the lower half */}
      <div className="quote-grid-bg absolute left-0 top-[400px] h-[400px] w-full max-md:hidden" />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mx-auto w-full max-w-4xl">
          <div className="quote-box-mask relative mx-auto rounded-sm border border-white/10 bg-background/60 px-6 py-14 backdrop-blur-sm sm:px-10 sm:py-16">
            <CornerPlus className="absolute -left-5 -top-5 h-10 w-10 text-white/20" />
            <CornerPlus className="absolute -bottom-5 -left-5 h-10 w-10 text-white/20" />
            <CornerPlus className="absolute -right-5 -top-5 h-10 w-10 text-white/20" />
            <CornerPlus className="absolute -bottom-5 -right-5 h-10 w-10 text-white/20" />

            <h2 className="flex flex-col items-center text-center text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span>People don&apos;t just know</span>
              <span className="mt-2">
                me as a <span className="text-[#ff4b42]">Marketer</span>
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/60 sm:text-xl md:text-2xl">
              They know me as the one who connects the dots between <Typewriter /> to build things
              that actually move the numbers.
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default QuoteSection;
