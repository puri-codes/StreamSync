import MediaHome from "@/components/MediaHome";
import SeoPageScripts from "@/components/SeoPageScripts";
import SeoSections from "@/components/SeoSections";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata = buildMetadata("youtube");

export default function Page() {
  return (
    <>
      <SeoPageScripts page="youtube" />
      <MediaHome />
      <SeoSections
        eyebrow="YouTube guide"
        title={seoPages.youtube.h1}
        intro={seoPages.youtube.description}
        paragraphs={[
          "YouTube deserves its own guide because the intent is broader than a single download button. People search for video downloads, audio extraction, Shorts handling, playlist workflows, thumbnail access, and format questions like 1080p or 4K. This page is written to answer those real search intents instead of just repeating a generic downloader pitch.",
          "Pullify treats YouTube as a complete workflow. Some visitors want to save a single public video, others want audio for a lecture or music track, and some are trying to understand why a particular link exposes certain formats. The page explains those differences in plain language so the route can stand on its own in Google Search.",
          "It also helps users understand the limits. Availability depends on the source media, the original upload, and the formats that the platform exposes. That honesty matters for trust and for SEO because it keeps the page aligned with what the app actually does.",
        ]}
        highlights={[
          { title: "Shorts workflow", text: "Explains how short-form YouTube content fits the same downloader flow." },
          { title: "Playlist use", text: "Covers the common case where users want to process multiple videos one by one." },
          { title: "Audio and thumbnails", text: "Covers MP3-style extraction and preview image use cases." },
        ]}
        links={[
          { href: "/", label: "Home" },
          { href: "/instagram", label: "Instagram Downloader" },
          { href: "/facebook", label: "Facebook Downloader" },
          { href: "/tiktok", label: "TikTok Downloader" },
          { href: "/how-to", label: "How To Guide" },
        ]}
      />
    </>
  );
}
