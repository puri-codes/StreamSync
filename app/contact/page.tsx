import LegalPage from "@/components/LegalPage";
import { featureMetadata, genericBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = featureMetadata(
  "Contact Pullify | Algora Labs",
  "How to reach Algora Labs about Pullify — support questions, copyright notices, and general inquiries.",
  "contact"
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericBreadcrumbJsonLd("Contact", "/contact")) }}
      />
      <LegalPage
        h1="Contact"
        lastUpdated="July 27, 2026"
        intro={[
          "Pullify is built and operated by Algora Labs. The fastest way to reach us for any reason — a question about how the tool works, a bug report, or a copyright concern — is email.",
        ]}
        sections={[
          {
            heading: "General & support questions",
            body: [
              "Email support@pullify.algoralabs.site for help with a failed download, a question about supported platforms or formats, or general feedback about the site. Include the link you were trying to download and a short description of what happened — that's usually enough for us to diagnose the issue.",
            ],
          },
          {
            heading: "Copyright notices",
            body: [
              "For copyright takedown requests, use the process described in our Copyright & DMCA Policy rather than a general email — it tells us exactly what information to include so your request can be handled without back-and-forth.",
            ],
          },
          {
            heading: "Response time",
            body: [
              "We aim to respond to support and copyright emails within a few business days. Pullify is a small, focused tool rather than a large support operation, so please allow some time for a reply.",
            ],
          },
        ]}
        relatedLinks={[
          { href: "/copyright-dmca", label: "Copyright & DMCA Policy" },
          { href: "/responsible-use", label: "Responsible Use Policy" },
          { href: "/how-to", label: "How Pullify Works" },
          { href: "/", label: "Home" },
        ]}
      />
    </>
  );
}
