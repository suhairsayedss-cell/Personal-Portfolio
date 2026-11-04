"use client";

// Two thin fixed vertical lines at 5% from each edge (16px on mobile), full
// height, staying in place while the page scrolls (brief §1.4). A key part of
// the look.
export default function FrameLines() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
      <span
        className="absolute top-0 bottom-0 w-px"
        style={{ left: "var(--frame-inset)", background: "var(--frame)" }}
      />
      <span
        className="absolute top-0 bottom-0 w-px"
        style={{ right: "var(--frame-inset)", background: "var(--frame)" }}
      />
    </div>
  );
}
