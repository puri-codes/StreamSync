import LegalPage from "@/components/LegalPage";
import { featureMetadata, genericBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = featureMetadata(
  "Copyright & DMCA Policy | Pullify",
  "How Pullify (Algora Labs) handles copyright concerns and how to submit a takedown request for content accessed through the site.",
  "copyright-dmca"
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericBreadcrumbJsonLd("Copyright & DMCA Policy", "/copyright-dmca")) }}
      />
      <LegalPage
        h1="Copyright & DMCA Policy"
        lastUpdated="July 27, 2026"
        intro={[
          "Pullify is operated by Algora Labs. Pullify does not host, store, or index copyrighted media on its own servers — it acts as a live pass-through between a public link you provide and the source platform that already hosts the content, and it only fetches formats that platform serves publicly.",
          "We take copyright seriously. If you believe content accessed through Pullify infringes your copyright, you can submit a notice using the process below, consistent with the notice-and-takedown approach of the U.S. Digital Millennium Copyright Act (DMCA) and equivalent frameworks in other jurisdictions.",
        ]}
        sections={[
          {
            heading: "Before you file a notice",
            body: [
              "Pullify does not control what any source platform (YouTube, Instagram, Facebook, TikTok) makes publicly available. In most cases, the fastest way to remove infringing content is to report it directly to the platform hosting it, since removing it there also removes Pullify's ability to fetch it. Use this policy when your concern is specifically about how Pullify processes a link to your content.",
            ],
          },
          {
            heading: "How to submit a takedown request",
            body: [
              `Email support@pullify.algoralabs.site with the subject line "Copyright Notice" and include:`,
              "1. Identification of the copyrighted work you claim has been infringed. 2. The specific link(s) processed through Pullify that you're reporting. 3. Your contact information (name and email). 4. A statement that you have a good-faith belief the use is not authorized by the copyright owner, its agent, or the law. 5. A statement, under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner or authorized to act on their behalf. 6. Your physical or electronic signature.",
            ],
          },
          {
            heading: "What happens after a valid notice",
            body: [
              "We will review the request and, where applicable, take reasonable steps to prevent Pullify from processing the reported link going forward. Because Pullify does not store files, there is typically nothing hosted on our side to remove — action is limited to blocking the specific source link from being fetched through the tool.",
            ],
          },
          {
            heading: "Counter-notification",
            body: [
              "If you believe a link was blocked in error or as a result of misidentification, you can contact support@pullify.algoralabs.site with an explanation and any supporting information. We will review counter-notifications in good faith.",
            ],
          },
          {
            heading: "Repeat use",
            body: [
              "Accounts or usage patterns associated with repeated, substantiated copyright complaints may be restricted from using Pullify at our discretion.",
            ],
          },
        ]}
        relatedLinks={[
          { href: "/responsible-use", label: "Responsible Use Policy" },
          { href: "/contact", label: "Contact" },
          { href: "/how-to", label: "How Pullify Works" },
          { href: "/", label: "Home" },
        ]}
      />
    </>
  );
}
