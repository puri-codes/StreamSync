import MediaHome from "@/components/MediaHome";
import SeoPageScripts from "@/components/SeoPageScripts";
import SeoSections from "@/components/SeoSections";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata = buildMetadata("facebook");

export default function Page() {
  return (
    <>
      <SeoPageScripts page="facebook" />
      <SeoSections
        eyebrow="Facebook guide"
        title={seoPages.facebook.h1}
        intro={seoPages.facebook.description}
        paragraphs={[
          "This Facebook page gives Google a distinct, server-rendered route for Facebook video searches instead of relying on the same app shell everywhere.",
          "It also helps visitors move into the broader downloader flow while keeping the page’s purpose clear and specific.",
        ]}
        highlights={[
          { title: "Clear intent", text: "Focused on Facebook video downloads rather than general media extraction." },
          { title: "Unique copy", text: "Adds a separate topical layer beyond the interactive form." },
          { title: "Useful links", text: "Connects to the other platform-specific routes." },
        ]}
        links={[
          { href: "/", label: "Home" },
          { href: "/youtube", label: "YouTube Downloader" },
          { href: "/instagram", label: "Instagram Downloader" },
          { href: "/tiktok", label: "TikTok Downloader" },
          { href: "/how-to", label: "How To Guide" },
        ]}
      />
      <MediaHome />
    </>
  );
}
