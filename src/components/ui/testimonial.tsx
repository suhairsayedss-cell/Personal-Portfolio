"use client";

import React, { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

// 7 testimonials mapped to the template's 7 card slots (see section data file).
const T: Testimonial[] = [
  {
    quote:
      "Our Google Ads spend finally started paying for itself. Conversion rate up, cost per acquisition down, that's the only report card that matters, and it's been consistently green.",
    name: "Aditi Rao",
    role: "Founder, The Health Factory",
  },
  {
    quote:
      "The video content didn't just look good, it performed. 10 million views was not on our bingo card for this year.",
    name: "Marcus Lin",
    role: "Marketing Head, Scott Eyewear",
  },
  {
    quote:
      "We came in with zero content strategy and a lot of good intentions. Left with a brand voice, a content calendar, and actual engagement.",
    name: "Priya Menon",
    role: "Founder, Self Love Soaps",
  },
  {
    quote:
      "As a design studio ourselves, we're picky about who touches our own brand. The website rebuild was fast, sharp, and exactly on-brief.",
    name: "Devansh Kapoor",
    role: "Creative Director, Holi Design",
  },
  {
    quote:
      "The AI-powered automation alone saved us hours a week we didn't know we were losing. Our socials finally feel like they're running themselves, in a good way.",
    name: "Naomi Fields",
    role: "Operations Lead, Bodycafe",
  },
  {
    quote: "400K impressions in 15 days on a brand-new paid social account. We didn't have to wait months for it.",
    name: "Rohan Desai",
    role: "Co-founder, Chit Chat Chai",
  },
  {
    quote:
      "Working with someone who can move between performance marketing and web development in the same week is rare. We didn't need three vendors, just one person who understood the full picture.",
    name: "Elena Cruz",
    role: "Founder, Your Happy Life",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Avatar = ({ name, className }: { name: string; className?: string }) => (
  <div
    className={cn(
      "grid shrink-0 place-items-center rounded-xl border border-white/15 bg-white/10 font-semibold text-white",
      className
    )}
  >
    {getInitials(name)}
  </div>
);

// Faint purple quote glyph — the one minimal touch of purple, on the two
// featured (grid) cards.
const QuoteMark = () => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute left-4 top-2 select-none font-serif text-6xl leading-none text-[#a855f7]/25"
  >
    &ldquo;
  </span>
);

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
  hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
};

function TestimonialsSection() {
  const testimonialRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={testimonialRef}
      className="relative z-20 w-full overflow-hidden bg-background text-foreground"
    >
      <div className="container mx-auto px-6 py-24 md:py-28">
        <article className="mx-auto max-w-screen-md space-y-4 text-center">
          <TimelineContent
            as="h2"
            className="text-3xl font-semibold uppercase leading-tight tracking-tight xl:text-4xl"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            The people behind the <span className="text-[#ff4b42]">praise.</span>
          </TimelineContent>
          <TimelineContent
            as="p"
            className="mx-auto max-w-2xl text-foreground/50"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            These are the voices of clients who&apos;ve watched me chase the right numbers, build the
            right creative, and ship the right systems, on time and under pressure. Their words say
            what the results alone can&apos;t.
          </TimelineContent>
        </article>

        <div className="flex w-full flex-col gap-3 pb-4 pt-10 lg:grid lg:grid-cols-3 lg:gap-3 lg:px-2 lg:py-10">
          {/* Column 1 */}
          <div className="flex h-full flex-col gap-3 md:flex lg:flex-col">
            <TimelineContent
              animationNum={0}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="relative flex flex-[6] flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-5 lg:flex-[7]"
            >
              <QuoteMark />
              <article className="mt-auto">
                <p className="text-white/90">&ldquo;{T[0].quote}&rdquo;</p>
                <div className="flex items-end justify-between pt-5">
                  <div>
                    <h3 className="text-sm font-semibold text-[#c084fc] lg:text-xl">{T[0].name}</h3>
                    <p className="text-white/50">{T[0].role}</p>
                  </div>
                  <Avatar name={T[0].name} className="h-16 w-16 text-lg" />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="relative flex flex-[4] shrink-0 flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-[#ff4b42] p-5 text-white lg:h-fit lg:flex-[3]"
            >
              <article className="mt-auto">
                <p>&ldquo;{T[1].quote}&rdquo;</p>
                <div className="flex items-end justify-between pt-5">
                  <div>
                    <h3 className="text-xl font-semibold">{T[1].name}</h3>
                    <p className="text-white/70">{T[1].role}</p>
                  </div>
                  <Avatar name={T[1].name} className="h-16 w-16 text-lg !bg-white/15" />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 2 */}
          <div className="flex h-fit flex-col gap-3 md:flex lg:h-full lg:flex-col">
            {[2, 3, 4].map((idx) => (
              <TimelineContent
                key={idx}
                animationNum={idx}
                customVariants={revealVariants}
                timelineRef={testimonialRef}
                className="flex flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-[#111111] p-5 text-white"
              >
                <article className="mt-auto">
                  <p className="text-sm 2xl:text-base">&ldquo;{T[idx].quote}&rdquo;</p>
                  <div className="flex items-end justify-between pt-5">
                    <div>
                      <h3 className="text-lg font-semibold text-[#c084fc] lg:text-xl">{T[idx].name}</h3>
                      <p className="text-sm text-white/50 lg:text-base">{T[idx].role}</p>
                    </div>
                    <Avatar name={T[idx].name} className="h-12 w-12 lg:h-16 lg:w-16" />
                  </div>
                </article>
              </TimelineContent>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex h-full flex-col gap-3 md:flex lg:flex-col">
            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="relative flex flex-[4] flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-[#ff4b42] p-5 text-white lg:flex-[3]"
            >
              <article className="mt-auto">
                <p>&ldquo;{T[5].quote}&rdquo;</p>
                <div className="flex items-end justify-between pt-5">
                  <div>
                    <h3 className="text-xl font-semibold">{T[5].name}</h3>
                    <p className="text-white/70">{T[5].role}</p>
                  </div>
                  <Avatar name={T[5].name} className="h-16 w-16 text-lg !bg-white/15" />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="relative flex flex-[6] flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-5 lg:flex-[7]"
            >
              <QuoteMark />
              <article className="mt-auto">
                <p className="text-white/90">&ldquo;{T[6].quote}&rdquo;</p>
                <div className="flex items-end justify-between pt-5">
                  <div>
                    <h3 className="text-xl font-semibold text-[#c084fc]">{T[6].name}</h3>
                    <p className="text-white/50">{T[6].role}</p>
                  </div>
                  <Avatar name={T[6].name} className="h-16 w-16 text-lg" />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
