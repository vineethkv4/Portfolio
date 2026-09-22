import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectShowcase } from "@/components/showcase/ProjectShowcase";
import { getShowcaseBySlug, getShowcaseSlugs } from "@/data/showcases";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getShowcaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const showcase = getShowcaseBySlug(slug);
  if (!showcase) return {};

  return {
    title: showcase.shortTitle,
    description: showcase.lede,
  };
}

export default async function WorkShowcasePage({ params }: PageProps) {
  const { slug } = await params;
  const showcase = getShowcaseBySlug(slug);
  if (!showcase) notFound();

  return <ProjectShowcase showcase={showcase} />;
}
