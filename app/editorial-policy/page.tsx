import LegalPage from "@/components/LegalPage";
import { featureMetadata, genericBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = featureMetadata(
  "Editorial Policy | Pullify",
  "How the guides and platform pages on Pullify are written and kept accurate.",
  "editorial-policy"
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericBreadcrumbJsonLd("Editorial Policy", "/editorial-policy")) }}
      />
      <LegalPage
        h1="Editorial Policy"
        lastUpdated="July 27, 2026"
        intro={[
          "This page explains how the guides on Pullify (platform pages, feature pages, comparison pages) are written and what standards they're held to.",
        ]}
        sections={[
          {
            heading: "Written to match the product",
            body: [
              "Every claim about what Pullify can and can't do — supported formats, resolution availability, watermark behavior, playlist support — is written to reflect the tool's actual current behavior, not aspirational features. Where a limitation exists (for example, that downloads are processed one link at a time, or that a burned-in platform watermark can't be removed), the guides say so directly rather than glossing over it.",
            ],
          },
          {
            heading: "No fabricated specifics",
            body: [
              "We don't state exact resolution guarantees, file-size numbers, or platform behavior we haven't verified against the product. Where availability genuinely varies (most quality and format questions), the guides say it depends on the source rather than asserting a fixed number.",
            ],
          },
          {
            heading: "Corrections",
            body: [
              "If you notice a guide describing behavior that doesn't match what Pullify actually does, let us know at support@pullify.algoralabs.site — we'd rather fix an inaccurate page than leave it live.",
            ],
          },
          {
            heading: "No paid placement",
            body: [
              "Comparison pages on this site (for example, alternatives to other downloader tools) are not paid placements. They describe how Pullify's workflow differs from the named tool, based on publicly observable behavior, not a sponsored relationship.",
            ],
          },
        ]}
        relatedLinks={[
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
          { href: "/how-to", label: "How Pullify Works" },
          { href: "/", label: "Home" },
        ]}
      />
    </>
  );
}
