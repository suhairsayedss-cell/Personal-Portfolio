"use client";

import DotGridCanvas from "../DotGridCanvas";
import PixelAvatar from "../PixelAvatar";
import { footer, contact } from "@/data/content";

// Footer (brief §Section 7): reveals the yellow dot grid, a huge faded name
// behind a pixel-art avatar, then a two-column bar and the credits row.
export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative -mt-[44px] overflow-hidden bg-yellow px-[6%] pb-10 pt-24"
    >
      <DotGridCanvas variant="yellow" className="absolute inset-0 h-full w-full" />

      {/* Huge faded name + pixel avatar in front */}
      <div className="relative flex min-h-[46vh] items-end justify-center">
        <h2
          aria-hidden
          className="font-display pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-[clamp(64px,18vw,220px)] leading-[0.9] text-ink/20"
        >
          {footer.bigName.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </h2>
        <PixelAvatar className="relative z-10 h-[30vh] w-auto" />
      </div>

      {/* Divider */}
      <div className="relative mt-10 border-t border-ink/30 pt-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {/* Left */}
          <div>
            <p className="font-body text-[18px] text-ink">{footer.line1}</p>
            <p className="font-display mt-2 text-[clamp(26px,5vw,40px)] text-ink">
              {footer.line2.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </div>

          {/* Right: reach out */}
          <div className="md:text-right">
            <p className="font-body mb-3 text-[18px] text-ink">{footer.reachOut}</p>
            <div className="flex gap-4 md:justify-end">
              <SocialIcon href={contact.instagram} label="Instagram">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </SocialIcon>
              <SocialIcon href={contact.linkedin} label="LinkedIn">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4" />
              </SocialIcon>
              <SocialIcon href={`mailto:${contact.email}`} label="Email">
                <circle cx="12" cy="12" r="9" />
                <path d="M16 8.5a4 4 0 1 0 1 5.5c.6 1 2.5 1 2.5-1.5a7.5 7.5 0 1 0-3 6" />
              </SocialIcon>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="font-body mt-14 flex flex-col gap-1 text-xs text-ink/70 md:flex-row md:justify-between">
          <span>{footer.credits.left}</span>
          <span>{footer.credits.right}</span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="text-ink transition-opacity duration-[400ms] ease-brief hover:opacity-70"
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </a>
  );
}
