"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { work, type Project } from "@/data/content";

// Selected work (brief §Section 5): heading + subtext, a 2-column grid (1 on
// mobile) inside the frame lines with 1px borders and "+" crossmarks. Card
// hover: a preview image fades in with cream fades top/bottom, the logo nudges
// down, and a cream "View project »" pill follows the cursor.
export default function SelectedWork() {
  return (
    <section id="work" className="relative bg-cream px-[6%] py-24 md:py-32">
      <header className="mb-14 text-center">
        <h2 className="font-display text-[clamp(28px,5vw,40px)] text-ink">
          {work.heading}
        </h2>
        <p className="font-body mx-auto mt-4 max-w-xl text-[clamp(15px,2vw,18px)] text-muted">
          {work.subtext}
        </p>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 border-l border-t border-frame md:grid-cols-2">
        {work.projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <a
      ref={ref}
      href={project.href || "#"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
      className="group relative flex h-[350px] flex-col overflow-hidden border-b border-r border-frame px-6 py-4"
    >
      {/* "+" crossmark at the top-left corner */}
      <span className="pointer-events-none absolute -left-[7px] -top-[9px] text-sm text-frame">
        +
      </span>

      {/* Preview image fades in behind the logo */}
      {project.preview && (
        <div
          className={`absolute inset-0 transition-opacity duration-[400ms] ease-brief ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={project.preview}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {/* cream fades top and bottom */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cream to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent" />
        </div>
      )}

      {/* Year */}
      <span className="font-body relative z-10 text-[18px] text-muted">
        {project.year}
      </span>

      {/* Logo / mark, centred, nudges down on hover */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div
          className={`relative h-20 w-[52%] transition-transform duration-[400ms] ease-brief ${
            hover ? "translate-y-2" : ""
          }`}
        >
          {project.logo ? (
            <Image
              src={project.logo}
              alt={project.title}
              fill
              sizes="200px"
              className="object-contain"
            />
          ) : (
            <span className="font-display flex h-full items-center justify-center text-xl text-ink">
              {project.category}
            </span>
          )}
        </div>
      </div>

      {/* Category */}
      <span className="font-display relative z-10 text-[18px] text-ink">
        {project.category}
      </span>

      {/* "View project »" pill follows the cursor */}
      <motion.span
        className="pointer-events-none absolute z-20 whitespace-nowrap rounded-full bg-cream px-4 py-2 text-sm text-ink shadow-md"
        animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        style={{ left: pos.x + 16, top: pos.y + 16 }}
      >
        View project »
      </motion.span>
    </a>
  );
}
