import ProfileCard from "@/components/ui/profile-card";
import { DottedSurface } from "@/components/ui/dotted-surface";

// lucide-react removed its brand icons, so we reuse the same inline SVGs as the
// About section (matching the Instagram / LinkedIn marks used there).
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socialLinks = [
  { icon: InstagramIcon, href: "https://www.instagram.com/suhair.sayed/", label: "Instagram" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/suhair-sayed-a76759197/", label: "LinkedIn" },
];

// Closing CTA: a closing line, the profile / contact card, then social links.
export const CtaSection = () => (
  <section className="relative z-20 w-full overflow-hidden bg-background px-6 pb-28 pt-28 md:pt-32">
    <DottedSurface />
    <div className="relative z-10 mx-auto max-w-4xl">
      <h2 className="mx-auto mb-16 max-w-3xl text-center text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        If you&apos;ve made it this far, we&apos;re either meant to work together, or you&apos;re just
        really into footers!
      </h2>

      <ProfileCard />

      <div className="mt-28 flex items-center justify-center gap-6">
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            <s.icon className="h-7 w-7" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default CtaSection;
