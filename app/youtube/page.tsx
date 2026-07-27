import MediaHome from "@/components/MediaHome";
import SeoPageScripts from "@/components/SeoPageScripts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("youtube");

export default function Page() {
  return (
    <>
      <SeoPageScripts page="youtube" />
      <MediaHome />
    </>
  );
}
