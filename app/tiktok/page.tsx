import MediaHome from "@/components/MediaHome";
import SeoPageScripts from "@/components/SeoPageScripts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("tiktok");

export default function Page() {
  return (
    <>
      <SeoPageScripts page="tiktok" />
      <MediaHome />
    </>
  );
}
