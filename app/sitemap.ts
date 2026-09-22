import type { MetadataRoute } from "next";
import { getShowcaseSlugs } from "@/data/showcases";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const workEntries = getShowcaseSlugs().map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...workEntries,
  ];
}
