"use client";

import { cn } from "@/lib/utils";

// Rolling-letter hover (brief §1.6.1): each letter sits in a 1em-tall box with
// hidden overflow holding two stacked copies. On hover the column rolls up by
// 50% so a fresh copy rolls into place — 0.8s, staggered 30ms per letter.
export default function RollingText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const letters = text.split("");
  return (
    <span className={cn("roll", className)} aria-label={text}>
      {letters.map((ch, i) => (
        <span
          key={i}
          className="roll-letter"
          style={{ "--i": i } as React.CSSProperties}
          aria-hidden
        >
          <span>
            <span>{ch === " " ? " " : ch}</span>
            <span>{ch === " " ? " " : ch}</span>
          </span>
        </span>
      ))}
    </span>
  );
}
