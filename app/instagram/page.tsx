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
          "Instagram search intent is very different from YouTube. People usually arrive here looking for Reels, Stories, carousel posts, photos, profile videos, or a way to save a public post for later reference. This page should speak to those content types directly instead of treating Instagram like a generic media source.",
          "The most useful Instagram guide explains what is and is not available. A public Reel may expose a clean video file, a carousel may contain several image frames, and a story or profile video can behave differently depending on availability. That specificity gives users a better experience and gives Google a clearer understanding of the page.",
          "It also helps to be honest about constraints. Private posts, unavailable stories, or restricted content cannot be treated the same as public media. Pages that explain that difference tend to build more trust and look more authoritative in search results.",
        ]}
        highlights={[
          { title: "Reels and Stories", text: "Explains the two biggest Instagram intents separately." },
          { title: "Carousel posts", text: "Covers multi-image content and how users should think about it." },
          { title: "Public vs private", text: "Sets expectations for what can actually be processed." },
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
