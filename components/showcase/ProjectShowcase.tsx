"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShowcaseBackButton } from "@/components/showcase/ShowcaseBackButton";
import { ShowcaseHeading } from "@/components/showcase/ShowcaseHeading";
import { ShowcaseMedia } from "@/components/showcase/ShowcaseMedia";
import { showcaseImage, type Showcase } from "@/data/showcases";
import { connectContent } from "@/content/sections/connect";
import { cn } from "@/lib/utils";

const ease = [0.2, 0.7, 0.2, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

type ProjectShowcaseProps = {
  showcase: Showcase;
};

export function ProjectShowcase({ showcase }: ProjectShowcaseProps) {
  const frames = [0, 1, 2, 3, 4].map((index) => showcaseImage(showcase, index));
  const [leftAside, setLeftAside] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "";
    document.body.style.overflow = "";
    const refresh = () => ScrollTrigger.refresh();
    const frame = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", refresh);
    };
  }, []);

  const facts = [
    { key: "Role", value: showcase.facts.role },
    { key: "Scope", value: showcase.facts.scope },
    { key: "Tools", value: showcase.facts.tools },
    { key: "Status", value: showcase.facts.status },
  ];

  const sections = [
    { title: "Overview", paragraphs: showcase.overview },
    { title: "My Role", paragraphs: showcase.myRole },
    { title: "The Challenge", paragraphs: showcase.challenge },
    {
      title: "What I Built",
      paragraphs: showcase.built.paragraphs,
      bullets: showcase.built.bullets,
    },
    { title: "Impact", paragraphs: showcase.impact },
  ];

  const ctaLinks = [
    { label: "Email", href: `mailto:${connectContent.email}` },
    {
      label: "LinkedIn",
      href:
        connectContent.socials.find((item) => item.label === "LinkedIn")
          ?.href ?? "#",
    },
    {
      label: "Behance",
      href: "https://www.behance.net/vineethkv43218",
    },
  ];

  return (
    <article className="relative bg-[#050505] text-white">
      <ShowcaseBackButton />
      <div className="relative">
        <ShowcaseHeading title={showcase.title} endTrigger={leftAside} />

        <section className="relative z-10 grid w-full grid-cols-1 items-start gap-0 pb-16 pl-6 sm:pl-8 lg:grid-cols-[minmax(260px,32%)_1fr] lg:gap-0 lg:pb-24">
        <motion.aside
          ref={setLeftAside}
          className="lg:pr-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12%" }}
        >
          <div className="flex items-start gap-4">
            <span className="hidden size-10 shrink-0 lg:block" aria-hidden />
            <div className="min-w-0 flex-1 font-[family-name:var(--font-display-serif)]">
              <p className="text-[15px] leading-relaxed text-white/50 italic sm:text-base">
                {showcase.lede}
              </p>

              <div className="mt-10 border-t border-white/15 pt-8">
                <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {facts.map((row) => (
                    <div key={row.key}>
                      <dt className="text-[12px] text-white/40">{row.key}</dt>
                      <dd className="mt-1 text-[15px] leading-snug text-white">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 border-t border-white/15 pt-2">
                {sections.map((section) => (
                  <section key={section.title} className="mt-8">
                    <h3 className="mb-4 flex items-center gap-3 text-[13px] text-white/45">
                      <span className="shrink-0">{section.title}</span>
                      <span
                        className="h-px min-w-8 flex-1 bg-white/20"
                        aria-hidden
                      />
                    </h3>
                    <div className="space-y-4 text-[15px] leading-relaxed text-white/80">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets && section.bullets.length > 0 ? (
                      <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-white/80">
                        {section.bullets.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="shrink-0 text-white/45" aria-hidden>
                              –
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        <div className="relative z-10 flex flex-col gap-4 lg:gap-4">
          {frames.map((src, index) => (
            <ShowcaseMedia
              key={`${src}-${index}`}
              src={src}
              className="aspect-[16/9] w-full"
              parallax={36}
            />
          ))}
        </div>
      </section>
      </div>

      <footer className="px-6 pt-10 pb-24 sm:px-8 lg:pt-16 lg:pb-32">
        <motion.p
          className="mx-auto max-w-[1200px] text-center font-[family-name:var(--font-display-serif)] text-[clamp(2.4rem,7vw,3.5rem)] leading-[1.05] tracking-[-0.03em]"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {showcase.ctaStatement}{" "}
          <span
            className={cn(
              "bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400 bg-clip-text font-semibold text-transparent",
            )}
          >
            {showcase.ctaAccent}
          </span>
        </motion.p>
        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3"
          aria-label="Contact"
        >
          {ctaLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-white/55 uppercase transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </article>
  );
}
