import { MDXRemote } from "next-mdx-remote/rsc";
import type { CaseStudyFrontmatter } from "@/lib/mdx";
import { PrintMasthead } from "./PrintMasthead";
import { TractorFeedFrame } from "./TractorFeedFrame";
import { PlaceholderFrame } from "./PlaceholderFrame";

type StandardCaseStudyProps = {
  frontmatter: CaseStudyFrontmatter;
  content: string;
};

const mdxComponents = {
  PlaceholderFrame,
};

export function StandardCaseStudy({
  frontmatter,
  content,
}: StandardCaseStudyProps) {
  return (
    <article className="dot-grid-bg min-h-screen py-16 text-foreground">
      <TractorFeedFrame>
        <PrintMasthead
          title={frontmatter.title}
          summary={frontmatter.summary}
          publishDate={frontmatter.publishDate}
          tags={frontmatter.tags}
        />

        <div className="prose-case-study mt-10 space-y-6 text-base leading-relaxed text-foreground/80">
          <MDXRemote source={content} components={mdxComponents} />
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <PlaceholderFrame label="primary product screenshot" />
          <PlaceholderFrame label="secondary UI detail" />
        </div>
      </TractorFeedFrame>
    </article>
  );
}
