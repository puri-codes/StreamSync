import LegalPage from "@/components/LegalPage";
import { featureMetadata, genericBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = featureMetadata(
  "Terms of Service | Pullify",
  "The terms for using Pullify, operated by Algora Labs.",
  "terms-of-service"
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericBreadcrumbJsonLd("Terms of Service", "/terms-of-service")) }}
      />
      <LegalPage
        h1="Terms of Service"
        lastUpdated="July 27, 2026"
        intro={[
          "These terms govern your use of Pullify, operated by Algora Labs. By using the site, you agree to them. Algora Labs does not currently operate under a specific stated jurisdiction for these terms; if that changes, this page will be updated to reflect it.",
        ]}
        sections={[
          {
            heading: "The service",
            body: [
              "Pullify lets you fetch and download publicly available media formats from supported platforms by submitting a link. The service is provided as-is, without a guarantee that any specific link, format, or resolution will be available — availability depends entirely on what the source platform publishes.",
            ],
          },
          {
            heading: "Acceptable use",
            body: [
              "You agree to use Pullify only for content you own or have permission to download, and in a way that complies with the terms of service of the platform the content comes from. See the Responsible Use Policy for a fuller explanation of what this means in practice.",
              "You agree not to use Pullify to attempt to access private, login-gated, or otherwise non-public content, or to abuse the service in a way that degrades it for other users (for example, automated bulk scraping of the tool itself).",
            ],
          },
          {
            heading: "No warranty",
            body: [
              "Pullify is provided without warranties of any kind, express or implied. We don't guarantee uninterrupted availability, that every link will resolve successfully, or that a specific format or resolution will exist for a given piece of content — that depends on the source platform, not on Pullify.",
            ],
          },
          {
            heading: "Limitation of liability",
            body: [
              "To the extent permitted by law, Algora Labs is not liable for damages arising from your use of Pullify, including issues caused by content you download, interruptions to the service, or reliance on information provided on this site.",
            ],
          },
          {
            heading: "Changes to the service or these terms",
            body: [
              "Pullify may change, limit, or discontinue any part of the service at any time. These terms may also be updated; continued use of the site after an update means you accept the revised terms.",
            ],
          },
          {
            heading: "Copyright and takedowns",
            body: [
              "See the Copyright & DMCA Policy for how copyright concerns and takedown requests are handled.",
            ],
          },
          {
            heading: "Contact",
            body: [
              "Questions about these terms can be sent to support@pullify.algoralabs.site.",
            ],
          },
        ]}
        relatedLinks={[
          { href: "/responsible-use", label: "Responsible Use Policy" },
          { href: "/privacy-policy", label: "Privacy Policy" },
          { href: "/copyright-dmca", label: "Copyright & DMCA Policy" },
          { href: "/", label: "Home" },
        ]}
      />
    </>
  );
}
