import LandingPage from "@/components/LandingPage";
import { comparisonMetadata } from "@/lib/seo";
import { comparePageSlugs, comparisonPages, getComparisonPage } from "@/lib/seo-pages";
import type { CompareKey } from "@/lib/seo-pages";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return comparePageSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug as CompareKey;
  const page = comparisonPages.find((item) => item.slug === slug);
  if (!page) return {};
  return comparisonMetadata(page.title, page.description, page.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  const page = getComparisonPage(params.slug as CompareKey);
  if (!page) notFound();
  return (
    <LandingPage
      {...page}
      relatedLinks={[
        { href: "/youtube", label: "YouTube Downloader" },
        { href: "/instagram", label: "Instagram Downloader" },
        { href: "/facebook", label: "Facebook Downloader" },
        { href: "/tiktok", label: "TikTok Downloader" },
      ]}
      kind="comparison"
    />
  );
}
