import { MetadataRoute } from "next";
import { siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Pullify",
    description: "Fast media downloader for supported social platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#F9FAFB",
    theme_color: "#111827",
    icons: [],
  };
}
