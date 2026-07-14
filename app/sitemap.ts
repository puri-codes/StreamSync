import { MetadataRoute } from "next";
import { seoPages, siteUrl } from "@/lib/seo";
import { comparePageSlugs, featurePages } from "@/lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages = Object.values(seoPages).map((page, index) => ({
    url: `${siteUrl}${page.canonical}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "daily" : "weekly",
    priority: index === 0 ? 1 : 0.9,
  }));

  const featureEntries = featurePages.map((page) => ({
    url: `${siteUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const comparisonEntries = comparePageSlugs.map((slug) => ({
    url: `${siteUrl}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...basePages, ...featureEntries, ...comparisonEntries];
}
