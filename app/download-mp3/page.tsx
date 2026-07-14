import LandingPage from "@/components/LandingPage";
import { featureMetadata } from "@/lib/seo";
import { getFeaturePage, featurePages } from "@/lib/seo-pages";

const page = getFeaturePage("download-mp3");

export const metadata = featureMetadata(page.title, page.description, page.slug);

export default function Page() {
  return (
    <LandingPage
      {...page}
      relatedLinks={featurePages.filter((item) => item.slug !== page.slug).slice(0, 4).map((item) => ({ href: `/${item.slug}`, label: item.h1 }))}
    />
  );
}
