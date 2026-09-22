"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionTopBar } from "@/components/sections/SectionTopBar";
import { SectionNav } from "@/components/sections/SectionNav";
import { IdentityPortrait } from "@/components/sections/IdentityPortrait";
import type { ScrollImage } from "@/components/identity/ScrollImageSwap";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { cn } from "@/lib/utils";

// TODO: swap these placeholder image paths for real photos per section
const identityImages: ScrollImage[] = [
  {
    index: 0,
    src: "/images/about_image.png",
    alt: "Vineeth Vijayan portrait",
  },
  {
    index: 1,
    src: "/images/placeholders/analytics-quotient.jpg",
    alt: "Vineeth Vijayan — placeholder, TODO replace",
  },
  {
    index: 2,
    src: "/images/placeholders/ivista.jpg",
    alt: "Vineeth Vijayan — placeholder, TODO replace",
  },
  {
    index: 3,
    src: "/images/placeholders/ibizsoft.jpg",
    alt: "Vineeth Vijayan — placeholder, TODO replace",
  },
];

const SECTION_EYEBROW_CLASS =
  "text-xs uppercase tracking-[0.18em] text-gray-500";
const SECTION_BODY_CLASS = "text-sm text-white text-[1.8rem]";
const SECTION_STATEMENT_CLASS =
  "break-words font-[family-name:var(--font-display-serif)] text-3xl font-bold leading-[1.05] tracking-tight text-white md:text-4xl lg:text-5xl";

/** Soft ceiling for the designed overlap composition — beyond this, review layout. */
export const IDENTITY_HEADLINE_SOFT_LIMIT = 140;
/** Drop display size when the string is long enough to risk overflowing the photo band. */
const HEADLINE_SCALE_THRESHOLD = 120;

const DEFINITIONS = [
  { key: "Based in", value: "Bangalore, India" },
  { key: "Working style", value: "Introverted, deep-focus" },
  { key: "Draws to", value: "Premium web aesthetics & interactive animation" },
  { key: "Currently", value: "Building this portfolio, exploring new roles" },
] as const;

const STATS = [
  { label: "Experience", value: "13+ years" },
  {
    label: "Certifications",
    value: "Google UX Design, IBM Enterprise Design Thinking",
  },
  {
    label: "Recognition",
    value: "Kantar ACE Strategic Collaborator Award",
  },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 + i * 0.08,
      duration: 0.65,
      ease: [0.2, 0.7, 0.2, 1] as const,
    },
  }),
};

export type IdentityProps = {
  /** Dynamic hero statement — from MDX/CMS. Prefer ≤ ~140 characters. */
  headline: string;
};

function headlineClassName(length: number) {
  if (length > HEADLINE_SCALE_THRESHOLD) {
    return "text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.12]";
  }
  return "text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.08]";
}

export function Identity({ headline }: IdentityProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const section0Ref = useRef<HTMLElement>(null);
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);

  const inViewOptions = {
    root: scrollRef,
    once: true,
    margin: "-20% 0px -20% 0px",
  } as const;
  const section0InView = useInView(section0Ref, inViewOptions);
  const section1InView = useInView(section1Ref, inViewOptions);
  const section2InView = useInView(section2Ref, inViewOptions);
  const section3InView = useInView(section3Ref, inViewOptions);

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "";
    document.body.style.overflow = "";
  }, []);

  if (
    process.env.NODE_ENV === "development" &&
    headline.length > IDENTITY_HEADLINE_SOFT_LIMIT
  ) {
    console.warn(
      `[Identity] headline is ${headline.length} chars (soft limit ${IDENTITY_HEADLINE_SOFT_LIMIT}). Overlap composition may need a design review.`,
    );
  }

  return (
    <div
      className="relative h-dvh w-full overflow-hidden bg-[#050505] text-white"
      style={{
        backgroundImage: "url('/images/black_bg.jpg')",
        backgroundSize: "100% auto",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto overflow-x-hidden"
      >
        <SectionTopBar theme="dark" />
        <SectionNav />

        {/* Shared left/right gutters for the content area */}
        <div className="relative mx-auto w-full max-w-[1500px] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid grid-cols-1 items-start gap-0 lg:grid-cols-2">
          {/* LEFT */}
          <div className="relative z-10 w-full max-w-[620px] pb-32 lg:pb-48">
            <section
              ref={section0Ref}
              data-section-index={0}
              className="flex min-h-screen flex-col justify-center"
            >
              <TextGenerateEffect
                words={headline}
                start={section0InView}
                staggerDelay={0.06}
                className={cn(
                  "min-h-[4lh] font-[family-name:var(--font-display-serif)] text-white font-normal",
                  headlineClassName(headline.length),
                )}
              />

              <div className="mt-10 flex w-full flex-col gap-2.5 lg:mt-14">
                <motion.div
                  className="rounded-md"
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={1}
                >
                  <dl>
                    {DEFINITIONS.map((row, i) => (
                      <div
                        key={row.key}
                        className={
                          i === DEFINITIONS.length - 1
                            ? "flex items-start justify-between gap-6 px-5 py-4"
                            : "flex items-start justify-between gap-6 border-b border-white/5 px-5 py-4"
                        }
                      >
                        <dt className="shrink-0 text-sm font-semibold text-white">
                          {row.key}
                        </dt>
                        <dd className="text-right text-sm text-gray-400">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>

                <motion.div
                  className="rounded-md"
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={2}
                >
                  <div className="flex flex-col divide-y divide-white/5">
                    {STATS.map((stat) => (
                      <div key={stat.label} className="px-5 py-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-base font-semibold text-white md:text-lg">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            <div className="flex flex-col gap-4 md:gap-6">
              {/* TEMP-COPY: replace before launch — placeholder from reference layout */}
              <section
                ref={section1Ref}
                data-section-index={1}
                className="py-16 md:py-20"
              >
                <TextGenerateEffect
                  words="IT'S NOT JUST A PROFESSION — IT'S A WAY OF THINKING."
                  start={section1InView}
                  staggerDelay={0.06}
                  className={SECTION_STATEMENT_CLASS}
                />
                <TextGenerateEffect
                  words="MY WORK IS PART OF MY LIFESTYLE. AS A UX/UI DESIGNER, I AM CONSTANTLY OBSERVING THE WORLD: I NOTICE HOW PEOPLE INTERACT WITH SPACE, TECHNOLOGY, OBJECTS."
                  start={section1InView}
                  staggerDelay={0.05}
                  className={cn(SECTION_BODY_CLASS, "mt-8 font-normal")}
                />
              </section>

              {/* TEMP-COPY: replace before launch — placeholder from reference layout */}
              <section
                ref={section2Ref}
                data-section-index={2}
                className="py-16 md:py-20"
              >
                <p className={SECTION_EYEBROW_CLASS}>MY PHILOSOPHY ↘</p>
                <TextGenerateEffect
                  words="I VALUE CLARITY, MEANING, AND FUNCTIONALITY — BOTH IN DESIGN AND IN LIFE. I AM CLOSE TO THE IDEA OF CONSCIOUS MINIMALISM: LEAVING ONLY WHAT MAKES SENSE AND WORKS FOR RESULTS. I LOVE SIMPLE INTERFACES WITH DEEP MEANING — AS WELL AS SIMPLE THINGS THAT BRING TRUE PLEASURE."
                  start={section2InView}
                  staggerDelay={0.05}
                  className={cn(SECTION_BODY_CLASS, "mt-6 font-normal")}
                />
              </section>

              {/* TEMP-COPY: replace before launch — placeholder from reference layout */}
              <section
                ref={section3Ref}
                data-section-index={3}
                className="py-16 md:py-20"
              >
                <p className={SECTION_EYEBROW_CLASS}>MY LIFESTYLE ↘</p>
                <TextGenerateEffect
                  words="I LOOK FOR AESTHETICS EVERYWHERE: IN THE FORMS OF NATURE, IN THE DETAILS OF ARCHITECTURE, IN THE COLORS OF CITY STREETS, AND EVEN IN THE SIMPLE THINGS OF EVERYDAY LIFE. IT'S NOT JUST A HOBBY — IT'S A WAY OF SEEING THE WORLD."
                  start={section3InView}
                  staggerDelay={0.05}
                  className={cn(SECTION_BODY_CLASS, "mt-6 font-normal")}
                />
                <TextGenerateEffect
                  words="EVERY PROJECT FOR ME IS MORE THAN A TASK. IT'S A STORY THAT I HELP TELL THROUGH DESIGN. I BELIEVE THAT A GOOD INTERFACE IS NOT JUST ABOUT COLORS AND FONTS, BUT ABOUT THE FEELINGS IT EVOKES."
                  start={section3InView}
                  staggerDelay={0.05}
                  className={cn(SECTION_BODY_CLASS, "mt-6 font-normal")}
                />
              </section>
            </div>
          </div>

          {/* RIGHT — WHO I AM + boxed image */}
          <div className="overflow-hidden lg:sticky lg:top-0 lg:h-screen">
            <motion.div
              className="relative z-[5] w-full"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
            >
              <h1 className="mb-4 font-[family-name:var(--font-pixel-circle)] text-[clamp(30px,7vw,130px)] text-center leading-none tracking-[0.04em] text-white/20">
                WHO I AM
              </h1>

              <div className="relative aspect-[4/5] w-full overflow-hidden border-x border-t border-white/10 bg-[#121018] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <IdentityPortrait images={identityImages} />

                <div
                  className="pointer-events-none absolute inset-0 bg-black/35 mix-blend-multiply"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
