import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudyBySlug, getVaultSlugs } from "@/lib/mdx";
import { StandardCaseStudy } from "@/components/case-study/StandardCaseStudy";
import { ChartCountdownCaseStudy } from "@/components/case-study/ChartCountdownCaseStudy";
import { NavBand } from "@/components/sections/NavBand";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getVaultSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug, true);
  if (!study) return { robots: { index: false, follow: false } };

  return {
    title: study.frontmatter.title,
    description: study.frontmatter.summary,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function VaultCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug, true);
  if (!study) notFound();

  const template = study.frontmatter.template ?? "standard";

  return (
    <>
      <NavBand />
      {template === "chart-countdown" ? (
        <ChartCountdownCaseStudy
          frontmatter={study.frontmatter}
          content={study.content}
        />
      ) : (
        <StandardCaseStudy
          frontmatter={study.frontmatter}
          content={study.content}
        />
      )}
    </>
  );
}
