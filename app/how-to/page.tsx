import MediaHome from "@/components/MediaHome";
import SeoPageScripts from "@/components/SeoPageScripts";
import SeoSections from "@/components/SeoSections";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata = buildMetadata("how-to");

export default function Page() {
  return (
    <>
      <SeoPageScripts page="how-to" />
      <SeoSections
        eyebrow="How-to guide"
        title={seoPages["how-to"].h1}
        intro={seoPages["how-to"].description}
        paragraphs={[
          "This page works as a general help article and a search landing page. It gives crawlers a concrete explanation of the product without making them depend entirely on client-side behavior.",
          "Because it is server-rendered and internally linked, it strengthens the rest of the site instead of duplicating the same homepage wording.",
        ]}
        highlights={[
          { title: "General guide", text: "Explains the core workflow in plain language." },
          { title: "Connected routes", text: "Points to the platform pages and feature pages." },
          { title: "Crawlable support", text: "Adds static context that Search Console can pick up." },
        ]}
        links={[
          { href: "/", label: "Home" },
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
