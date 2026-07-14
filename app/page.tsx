import MediaHome from "@/components/MediaHome";
import SeoPageScripts from "@/components/SeoPageScripts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("home");

export default function Page() {
  return (
    <>
      <SeoPageScripts page="home" />
      <MediaHome />
    </>
  );
}
