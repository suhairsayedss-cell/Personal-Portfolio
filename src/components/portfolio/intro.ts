// Shared timing/guard for the first-load intro so the Hero can sequence its
// own entrance to start just as the intro overlay lifts.

export const INTRO_MS = 2600;
const KEY = "suhair-intro-seen";

export function prefersReduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Whether the full intro should play now: first visit this session and motion
// is allowed. Used by both LoadIntro and Hero.
export function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  if (prefersReduced()) return false;
  try {
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
}
