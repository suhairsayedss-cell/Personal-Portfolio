"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Smooth-scroll to an in-page section by id.
const smoothTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const NavBar = () => {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    // Full bar on the first part of the hero; collapse to the initials after
    // scrolling roughly half a viewport in.
    const onScroll = () => setShrunk(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="nav-root">
      <nav className={cn("nav-pill", shrunk && "is-shrunk")}>
        <div className="nav-group nav-left">
          <a href="#work" onClick={smoothTo("work")} className="nav-link">
            Work
          </a>
          <a href="#about" onClick={smoothTo("about")} className="nav-link">
            About
          </a>
        </div>

        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="nav-brand"
        >
          {shrunk ? "MGS" : "Mohamed Gous Sayed"}
        </a>

        <div className="nav-group nav-right">
          <a href="#contact" onClick={smoothTo("contact")} className="nav-link">
            Contact
          </a>
          {/* TODO: point this at the real résumé PDF (e.g. /resume.pdf or an external link) */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link nav-resume"
          >
            Resume
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
