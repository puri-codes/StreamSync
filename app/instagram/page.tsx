import MediaHome from "@/components/MediaHome";
import SeoPageScripts from "@/components/SeoPageScripts";
import SeoSections from "@/components/SeoSections";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata = buildMetadata("instagram");

export default function Page() {
  return (
    <>
      <SeoPageScripts page="instagram" />
      <SeoSections
        eyebrow="Instagram guide"
        title={seoPages.instagram.h1}
        intro={seoPages.instagram.description}
        paragraphs={[
          "The Instagram page is a dedicated search landing page, not just a duplicate of the homepage. That gives search engines a clearer topical signal and gives users a faster answer to the query they typed.",
          "The layout keeps the downloader experience consistent while still adding unique copy and navigation that point to closely related pages.",
        ]}
        highlights={[
          { title: "Reel-focused", text: "Targets the kinds of Instagram URLs people commonly want to save." },
          { title: "Server-rendered copy", text: "Adds crawlable content before the interactive tool loads." },
          { title: "Supporting links", text: "Helps search engines understand the relationship between routes." },
        ]}
        links={[
          { href: "/", label: "Home" },
          { href: "/youtube", label: "YouTube Downloader" },
          { href: "/facebook", label: "Facebook Downloader" },
          { href: "/tiktok", label: "TikTok Downloader" },
          { href: "/how-to", label: "How To Guide" },
        ]}
      />
      <MediaHome />
    </>
  );
}
