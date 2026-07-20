import MediaHome from "@/components/MediaHome";
import SeoPageScripts from "@/components/SeoPageScripts";
import SeoSections from "@/components/SeoSections";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata = buildMetadata("youtube");

export default function Page() {
  return (
    <>
      <SeoPageScripts page="youtube" />
      <SeoSections
        eyebrow="YouTube guide"
        title={seoPages.youtube.h1}
        intro={seoPages.youtube.description}
        paragraphs={[
          "This route exists as a focused landing page for YouTube searches. The text is rendered on the server so Google can understand the topic even before any client-side downloader UI loads.",
          "It also reinforces the site structure with direct links to the other platform pages and the general how-to guide.",
        ]}
        highlights={[
          { title: "Direct intent", text: "Matches users looking specifically for YouTube video or audio downloads." },
          { title: "Clear context", text: "Explains what the page does without repeating the homepage copy." },
          { title: "Internal paths", text: "Connects to the rest of the platform pages for stronger topical relevance." },
        ]}
        links={[
          { href: "/", label: "Home" },
          { href: "/instagram", label: "Instagram Downloader" },
          { href: "/facebook", label: "Facebook Downloader" },
          { href: "/tiktok", label: "TikTok Downloader" },
          { href: "/how-to", label: "How To Guide" },
        ]}
      />
      <MediaHome />
    </>
  );
}
