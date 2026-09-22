"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionTopBar } from "@/components/sections/SectionTopBar";
import { SectionNav } from "@/components/sections/SectionNav";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { companies, type Company } from "@/content/experience";
import { cn } from "@/lib/utils";

const IMAGE_FALLBACK = "/images/ascent_img.jpg";

function companyImageSrc(company: Company) {
  return company.image || IMAGE_FALLBACK;
}

export function Ascent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const entryRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const nodes = entryRefs.current.filter(
      (node): node is HTMLElement => node != null,
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number(
          (visible.target as HTMLElement).dataset.index ?? "-1",
        );
        if (index >= 0) setActiveIndex(index);
      },
      { threshold: 0.5 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="signal-grid-bg relative w-full text-white">
      <SectionTopBar theme="dark" />
      <SectionNav />

      <section className="relative mx-auto w-full max-w-[1500px] px-6 sm:px-8 lg:px-12">
        <div className="relative lg:flex lg:items-start">
          {/* Desktop: sticky left pane. Mobile: hidden — each entry carries its own image. */}
          <div className="relative z-[5] hidden lg:sticky lg:top-0 lg:block lg:h-screen lg:w-[58%] lg:pr-8">
            <p
              className="pointer-events-none absolute top-6 left-0 z-[6] select-none font-[family-name:var(--font-pixel)] text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.9] tracking-[0.04em]"
              aria-hidden
            >
              <span className="block text-white/[0.20]">MY</span>
              <span className="block text-white/[0.20]">JOURNEY</span>
            </p>

            <div className="relative mt-[8.8rem] h-full w-full overflow-hidden border border-white/10">
              {companies.map((company, index) => (
                <motion.img
                  key={company.id}
                  src={companyImageSrc(company)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={false}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                    scale: index === activeIndex ? 1 : 1.04,
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  draggable={false}
                  onError={(event) => {
                    event.currentTarget.src = IMAGE_FALLBACK;
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 w-full font-[family-name:var(--font-display-serif)] lg:w-[42%] lg:pl-4">
            {companies.map((company, index) => (
              <AscentEntry
                key={company.id}
                company={company}
                index={index}
                activeIndex={activeIndex}
                onRef={(node) => {
                  entryRefs.current[index] = node;
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AscentEntry({
  company,
  index,
  activeIndex,
  onRef,
}: {
  company: Company;
  index: number;
  activeIndex: number;
  onRef: (node: HTMLElement | null) => void;
}) {
  const localRef = useRef<HTMLElement | null>(null);
  const inView = useInView(localRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });
  const isActive = index === activeIndex;

  return (
    <article
      ref={(node) => {
        localRef.current = node;
        onRef(node);
      }}
      data-index={index}
      className="mt-[8.8rem] flex min-h-[50svh] flex-col justify-center py-8 lg:py-0"
    >
      <div className="mb-4 overflow-hidden border border-white/10 lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={companyImageSrc(company)}
          alt=""
          className="aspect-[4/5] w-full object-cover"
          draggable={false}
          onError={(event) => {
            event.currentTarget.src = IMAGE_FALLBACK;
          }}
        />
      </div>

      <div className="relative pl-5">
        {isActive && (
          <span
            className="absolute top-1.5 bottom-1.5 left-0 w-[3px] rounded-full bg-signal-green"
            aria-hidden
          />
        )}
        <TextGenerateEffect
          words={company.name}
          start={inView}
          staggerDelay={0.06}
          className={cn(
            "text-3xl leading-none md:text-4xl",
            isActive ? "font-bold text-white" : "font-normal text-white/35",
          )}
        />
      </div>

      <div className="mt-4">
        <CompanyDetails company={company} start={inView} />
      </div>
    </article>
  );
}

function CompanyDetails({
  company,
  start,
}: {
  company: Company;
  start: boolean;
}) {
  const hasBody =
    company.description.trim().length > 0 || company.achievements.length > 0;
  const roleLine = `${company.role} @ ${company.name}`;

  return (
    <>
      <TextGenerateEffect
        words={roleLine}
        start={start}
        staggerDelay={0.05}
        className="text-lg font-bold text-white md:text-xl"
      />

      {hasBody ? (
        <>
          {company.description ? (
            <TextGenerateEffect
              words={company.description}
              start={start}
              staggerDelay={0.04}
              className="mt-2 max-w-xl text-base font-normal leading-relaxed text-white/45 text-[1.4rem]"
            />
          ) : null}

          {company.achievements.length > 0 ? (
            <ul className="mt-2.5 max-w-xl list-disc space-y-1.5 pl-5 text-base leading-relaxed text-white/45 marker:text-white/30">
              {company.achievements.map((item) => (
                <li key={item}>
                  <TextGenerateEffect
                    words={item}
                    start={start}
                    staggerDelay={0.04}
                    className="font-normal text-white/45"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : (
        <p className="mt-2 max-w-xl text-sm text-white/35">
          [— role details pending: description and achievements for{" "}
          {company.name} —]
        </p>
      )}
    </>
  );
}
