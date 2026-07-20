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
          "Facebook search intent usually centers on public videos, live replays, and clips shared inside pages or groups. A useful guide should explain that the page is about public media first, because that is the context most people actually search for and the one Google can understand clearly.",
          "Users often want to know whether HD versions are available, whether a live recording can be saved after the event ends, and whether a video can be opened directly from a public post. Those are the kinds of questions this page should answer in its own words instead of borrowing generic downloader copy.",
          "The page should also distinguish Facebook from the other platform guides. That separation matters because the intent is different: Facebook users generally care more about post visibility, public access, and replay availability than the reel or short-form patterns seen elsewhere.",
        ]}
        highlights={[
          { title: "Public videos", text: "Focuses on posts that are actually accessible to visitors." },
          { title: "HD availability", text: "Explains that quality depends on what the source provides." },
          { title: "Live replays", text: "Covers one of the most common Facebook-specific intents." },
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
