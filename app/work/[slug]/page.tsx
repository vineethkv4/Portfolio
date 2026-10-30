import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { ProjectShowcase } from "@/components/showcase/ProjectShowcase";
import { getSignalTracks } from "@/lib/auth/vault";
import { canViewWork } from "@/lib/signal/work-access";
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
  const tracks = await getSignalTracks();
  const privateMeta: Metadata = {
    title: "Signal",
    robots: { index: false, follow: false },
  };
  if (!tracks || !canViewWork(slug, tracks)) return privateMeta;

  const showcase = getShowcaseBySlug(slug);
  if (!showcase) return privateMeta;

  return {
    title: showcase.shortTitle,
    description: showcase.lede,
    robots: { index: false, follow: false },
  };
}

export default async function WorkShowcasePage({ params }: PageProps) {
  const { slug } = await params;
  const tracks = await getSignalTracks();
  if (!tracks || !canViewWork(slug, tracks)) {
    redirect(`/signal?next=${encodeURIComponent(`/work/${slug}`)}`);
  }

  const showcase = getShowcaseBySlug(slug);
  if (!showcase) notFound();

  return <ProjectShowcase showcase={showcase} />;
}
