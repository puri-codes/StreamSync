import MediaHome from "@/components/MediaHome";
import SeoPageScripts from "@/components/SeoPageScripts";
import SeoSections from "@/components/SeoSections";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata = buildMetadata("tiktok");

export default function Page() {
  return (
    <>
      <SeoPageScripts page="tiktok" />
      <SeoSections
        eyebrow="TikTok guide"
        title={seoPages.tiktok.h1}
        intro={seoPages.tiktok.description}
        paragraphs={[
          "This page is written as a separate TikTok landing page so it can stand on its own in search results instead of being treated as a duplicate of the homepage.",
          "The server-rendered sections add context, while the interactive downloader remains available below for actual use.",
        ]}
        highlights={[
          { title: "Topic-specific", text: "Built around TikTok search intent and short-form video use cases." },
          { title: "Indexable text", text: "Adds static copy that Google can read without waiting for client hydration." },
          { title: "Site structure", text: "Links back into the rest of the download guides." },
        ]}
        links={[
          { href: "/", label: "Home" },
          { href: "/youtube", label: "YouTube Downloader" },
          { href: "/instagram", label: "Instagram Downloader" },
          { href: "/facebook", label: "Facebook Downloader" },
          { href: "/how-to", label: "How To Guide" },
        ]}
      />
      <MediaHome />
    </>
  );
}
