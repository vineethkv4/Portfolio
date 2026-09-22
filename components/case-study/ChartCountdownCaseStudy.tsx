import { MDXRemote } from "next-mdx-remote/rsc";
import type { CaseStudyFrontmatter } from "@/lib/mdx";
import { BarChartRace } from "./BarChartRace";
import { PlaceholderFrame } from "./PlaceholderFrame";
import { ScrollTracker, type TrackerSection } from "./ScrollTracker";
import { TldrStrip } from "./TldrStrip";

type ChartCountdownCaseStudyProps = {
  frontmatter: CaseStudyFrontmatter;
  content: string;
  tldr?: string[];
  sections?: TrackerSection[];
};

const DEFAULT_SECTIONS: TrackerSection[] = [
  { id: "section-07", number: "#07", label: "Context" },
  { id: "section-06", number: "#06", label: "Research" },
  { id: "section-05", number: "#05", label: "Insight" },
  { id: "section-04", number: "#04", label: "Direction" },
  { id: "section-03", number: "#03", label: "Craft" },
  { id: "section-02", number: "#02", label: "System" },
  { id: "section-01", number: "#01", label: "Impact" },
];

const DEFAULT_TLDR = [
  "[— outcome highlight 1 —]",
  "[— outcome highlight 2 —]",
  "[— outcome highlight 3 —]",
];

const PLACEHOLDER_BARS = [
  { label: "Track A", value: 92 },
  { label: "Track B", value: 78 },
  { label: "Track C", value: 64 },
  { label: "Track D", value: 51 },
  { label: "Track E", value: 37 },
];

const mdxComponents = {
  PlaceholderFrame,
};

export function ChartCountdownCaseStudy({
  frontmatter,
  content,
  tldr = DEFAULT_TLDR,
  sections = DEFAULT_SECTIONS,
}: ChartCountdownCaseStudyProps) {
  return (
    <article className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <header className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">
            Chart Countdown Template
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-pixel)] text-4xl md:text-5xl">
            {frontmatter.title}
          </h1>
          <p className="mt-4 max-w-2xl text-white/65">{frontmatter.summary}</p>
        </header>

        <div className="mb-8">
          <BarChartRace bars={PLACEHOLDER_BARS} />
        </div>

        <div className="mb-12">
          <TldrStrip items={tldr} />
        </div>

        <div className="flex gap-10">
          <ScrollTracker sections={sections} />

          <div className="min-w-0 flex-1 space-y-16">
            {/* Structured countdown shells — MDX fills the narrative body */}
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <p className="font-[family-name:var(--font-pixel)] text-sm text-white/45">
                  {section.number}
                </p>
                <h2 className="mt-2 text-2xl uppercase tracking-wide">
                  {section.label}
                </h2>
                <p className="mt-3 text-sm text-white/50">
                  [— {section.label.toLowerCase()} section body for{" "}
                  {frontmatter.title} —]
                </p>
              </section>
            ))}

            <div className="prose-case-study space-y-6 border-t border-white/10 pt-12 text-base leading-relaxed text-white/75">
              <MDXRemote source={content} components={mdxComponents} />
            </div>

            <PlaceholderFrame
              label="product / charts UI screenshot"
              className="border-white/20 bg-white/[0.03] text-white/45"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
