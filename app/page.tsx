import MediaHome from "@/components/MediaHome";
import SeoPageScripts from "@/components/SeoPageScripts";
import SeoSections from "@/components/SeoSections";
import { buildMetadata } from "@/lib/seo";
import { seoPages } from "@/lib/seo";

export const metadata = buildMetadata("home");

export default function Page() {
  return (
    <>
      <SeoPageScripts page="home" />
      <SeoSections
        eyebrow="Media downloader"
        title={seoPages.home.h1}
        intro={seoPages.home.description}
        paragraphs={[
          "Pullify gives search engines a real, server-rendered explanation of what the site does before the interactive downloader loads. That makes the homepage easier to understand for crawlers and clearer for people arriving from search.",
          "Use this page to jump into platform-specific guides, compare formats, or learn how the downloader works without having to depend on client-side interaction alone.",
        ]}
        highlights={[
          { title: "Fast workflow", text: "Paste a link, fetch the media, and choose a format with minimal friction." },
          { title: "Platform hubs", text: "Dedicated pages for YouTube, Instagram, Facebook, and TikTok keep the structure clear." },
          { title: "Search-friendly", text: "The page includes crawlable copy, internal links, and structured data." },
        ]}
        links={[
          { href: "/youtube", label: "YouTube Downloader" },
          { href: "/instagram", label: "Instagram Downloader" },
          { href: "/facebook", label: "Facebook Downloader" },
          { href: "/tiktok", label: "TikTok Downloader" },
        ]}
      />
      <MediaHome />
    </>
  );
}
