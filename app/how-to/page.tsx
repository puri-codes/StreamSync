import MediaHome from "@/components/MediaHome";
import SeoPageScripts from "@/components/SeoPageScripts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("how-to");

export default function Page() {
  return (
    <>
      <SeoPageScripts page="how-to" />
      <MediaHome />
    </>
  );
}
