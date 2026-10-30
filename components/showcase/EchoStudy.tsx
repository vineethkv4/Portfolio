"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { ScrollTracker } from "@/components/case-study/ScrollTracker";
import { ShowcaseBackButton } from "@/components/showcase/ShowcaseBackButton";
import { ScrollToTop } from "@/components/showcase/ScrollToTop";
import { ShowcaseLightbox } from "@/components/showcase/ShowcaseLightbox";
import {
  type Showcase,
  type ShowcaseBullet,
  type ShowcaseStat,
} from "@/data/showcases";
import "./echo-study.css";

function BulletText({ item }: { item: ShowcaseBullet }) {
  if (typeof item === "string") return item;
  return (
    <>
      <strong>{item.lead}</strong>
      {item.rest}
    </>
  );
}

function CountStat({ stat }: { stat: ShowcaseStat }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [shown, setShown] = useState("0");

  useEffect(() => {
    if (stat.countTo == null || reduce !== false || !inView) return;
    const controls = animate(0, stat.countTo, {
      duration: 1.1,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (latest) => setShown(String(Math.round(latest))),
    });
    return () => controls.stop();
  }, [inView, reduce, stat.countTo, stat.value]);

  const figure = stat.countTo == null || reduce ? stat.value : shown;

  return (
    <div ref={ref}>
      <span className="stat-num">{figure}</span>
      <span className="lbl">{stat.label}</span>
    </div>
  );
}

export function EchoStudy({ showcase }: { showcase: Showcase }) {
  const mockRef = useRef<HTMLDivElement>(null);
  const hero = showcase.screens?.[0];
  const titles = showcase.sectionTitles;
  const heroLines =
    {
      "L'Oréal ECHO Dashboard": ["L'Oréal", "ECHO"],
      "Official Charts": ["Official", "Charts"],
      "Google Civics": ["Google", "Civics"],
    }[showcase.title] ?? [showcase.title];

  const railSections = useMemo(
    () =>
      (showcase.rail ?? []).map((item) => ({
        ...item,
        number: "",
      })),
    [showcase.rail],
  );

  useEffect(() => {
    const mock = mockRef.current;
    if (!mock) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!reduce.matches && window.innerWidth > 960 && window.scrollY < 900) {
          mock.style.transform = `translate3d(0, ${(window.scrollY * 0.12).toFixed(1)}px, 0)`;
        } else {
          mock.style.transform = "";
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <article className="echo-study">
      <header className="hero">
        <ShowcaseBackButton className="close" label="Close case study">
          ×
        </ShowcaseBackButton>
        <h1 aria-label={showcase.title}>
          {heroLines.map((line) => (
            <span className="ln" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        {hero ? (
          <div className="hero-mock" ref={mockRef}>
            <Image src={hero.src} alt={hero.alt} fill sizes="48vw" priority />
          </div>
        ) : null}
        <p className="hero-sub">{showcase.lede}</p>
      </header>

      <div className="layout">
        <ScrollTracker variant="echo" sections={railSections} />

        <main className="content">
          <section id="overview">
            <h2>{showcase.overviewTitle ?? "Overview"}</h2>
            {showcase.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {showcase.meta ? (
              <div className="meta">
                {showcase.meta.map((row) => (
                  <div key={row.label}>
                    <strong>{row.label}</strong>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
            ) : null}
            {showcase.chips ? (
              <ul className="chips" aria-label="Skills">
                {showcase.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            ) : null}
          </section>

          <section id="role">
            <h2>{titles?.role ?? "Role"}</h2>
            {showcase.myRole.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section id="challenge">
            <h2>{titles?.challenge ?? "Challenge"}</h2>
            {showcase.challenge.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section id="built">
            <h2>{titles?.built ?? "What I Built"}</h2>
            {showcase.built.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="list">
              {showcase.built.bullets.map((item) => (
                <li key={typeof item === "string" ? item : item.lead}>
                  <BulletText item={item} />
                </li>
              ))}
            </ul>
          </section>

          <section id="impact">
            <h2>{titles?.impact ?? "Impact"}</h2>
            {showcase.stats ? (
              <div className="stats">
                {showcase.stats.map((stat) => (
                  <CountStat key={stat.label} stat={stat} />
                ))}
              </div>
            ) : null}
            {showcase.impactBullets?.length ? (
              <ul className="list">
                {showcase.impactBullets.map((item) => (
                  <li key={typeof item === "string" ? item : item.lead}>
                    <BulletText item={item} />
                  </li>
                ))}
              </ul>
            ) : (
              showcase.impact.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))
            )}
            {showcase.quote ? (
              <blockquote className="quote">
                <p>“{showcase.quote.text}”</p>
                <cite>— {showcase.quote.attribution}</cite>
              </blockquote>
            ) : null}
          </section>
        </main>

        <section className="gallery" id="screens">
          <h2>Screens</h2>
          <div className="grid2">
            {showcase.screens?.map((screen) => (
              <ShowcaseLightbox
                key={screen.src}
                src={screen.src}
                alt={screen.alt}
                caption={screen.caption}
              />
            ))}
          </div>
        </section>

        <ScrollToTop />
        <footer className="cta">
          {/* TODO: point this CTA at the contact destination. */}
          <a href={showcase.ctaHref ?? "#"}>
            {showcase.ctaStatement} {showcase.ctaAccent}
          </a>
        </footer>
      </div>
    </article>
  );
}
