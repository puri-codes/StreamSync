import LandingPage from "@/components/LandingPage";
import { featureMetadata } from "@/lib/seo";
import { getFeaturePage, getFeatureRelatedLinks } from "@/lib/seo-pages";

const page = getFeaturePage("download-4k");

export const metadata = featureMetadata(page.title, page.description, page.slug);

export default function Page() {
  return <LandingPage {...page} relatedLinks={getFeatureRelatedLinks(page.slug)} />;
}
