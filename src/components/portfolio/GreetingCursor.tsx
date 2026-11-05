"use client";

import { useEffect } from "react";
import { prefersReduced } from "./intro";

// A playful speech bubble that trails the cursor for the first few seconds of
// the first visit (brief reference), cycling through short greetings, then
// fading away. Desktop fine-pointer only; skipped under reduced motion.
//
// The bubble is created imperatively and appended to <body>, outside React's
// render tree, so React reconciliation / Strict Mode's dev double-mount can
// never clobber the style we set or leave us writing to a detached node.
const MESSAGES = ["Curious?", "Hey there!"];
const START_DELAY = 1200;
const PER_MESSAGE = 1600;
const KEY = "suhair-greeting-seen";

export default function GreetingCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced() || !fine) return;
    try {
      if (sessionStorage.getItem(KEY) === "1") return;
    } catch {
      /* ignore */
    }

    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.cssText = [
      "position:fixed",
      "left:0",
      "top:0",
      "z-index:70",
      "pointer-events:none",
      "white-space:nowrap",
      "background:#2f88ff",
      "color:#fff",
      "font-weight:500",
      "font-size:18px",
      "line-height:1",
      "padding:12px 20px",
      "border-radius:18px",
      "border-bottom-left-radius:4px",
      "box-shadow:0 8px 24px rgba(47,136,255,.4)",
      "opacity:0",
      "scale:.75",
      "transform:translate(-200px,-200px)",
      "transition:opacity .3s ease, scale .3s ease, transform .15s ease-out",
    ].join(";");
    document.body.appendChild(el);

    const place = (cx: number, cy: number) => {
      el.style.transform = `translate(${cx + 20}px, ${cy + 12}px)`;
    };
    place(window.innerWidth / 2, window.innerHeight / 2);

    const move = (e: PointerEvent) => place(e.clientX, e.clientY);
    window.addEventListener("pointermove", move);

    const show = (text: string) => {
      el.textContent = text;
      el.style.opacity = "1";
      el.style.scale = "1";
    };
    const hide = () => {
      el.style.opacity = "0";
      el.style.scale = ".75";
    };

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(() => {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          /* ignore */
        }
        show(MESSAGES[0]);
      }, START_DELAY)
    );
    for (let i = 1; i < MESSAGES.length; i++) {
      timers.push(setTimeout(() => show(MESSAGES[i]), START_DELAY + i * PER_MESSAGE));
    }
    timers.push(setTimeout(hide, START_DELAY + MESSAGES.length * PER_MESSAGE));

    return () => {
      window.removeEventListener("pointermove", move);
      timers.forEach(clearTimeout);
      el.remove();
    };
  }, []);

  return null;
}
