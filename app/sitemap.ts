import { MetadataRoute } from "next";
import { seoPages, joinSiteUrl } from "@/lib/seo";
import { comparePageSlugs, featurePages } from "@/lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const basePages = Object.values(seoPages).map((page, index) => {
    const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = index === 0 ? "daily" : "weekly";
    return {
      url: joinSiteUrl(page.canonical),
      lastModified: now,
      changeFrequency,
      priority: index === 0 ? 1 : 0.9,
    };
  });

  const featureEntries = featurePages.map((page) => ({
    url: joinSiteUrl(`/${page.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const comparisonEntries = comparePageSlugs.map((slug) => ({
    url: joinSiteUrl(`/compare/${slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...basePages, ...featureEntries, ...comparisonEntries];
}
