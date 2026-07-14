"use client";

import { useEffect, useState } from "react";

// Site-wide scroll indicator: a "SCROLL" label + a gradient bar that fills
// based on how far down the whole page you are. Fixed at the bottom, above all
// sections. (Replaces the hero-only version, which was hidden once the opaque
// sections scrolled over it.)
export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-text">SCROLL</div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
};

export default ScrollProgress;
