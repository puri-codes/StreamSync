import LegalPage from "@/components/LegalPage";
import { featureMetadata, genericBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = featureMetadata(
  "Cookie Policy | Pullify",
  "What Pullify stores in your browser and why — there are no tracking or advertising cookies.",
  "cookie-policy"
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericBreadcrumbJsonLd("Cookie Policy", "/cookie-policy")) }}
      />
      <LegalPage
        h1="Cookie Policy"
        lastUpdated="July 27, 2026"
        intro={[
          "Pullify does not use tracking or advertising cookies. This page explains, briefly, what is and isn't stored in your browser when you use the site.",
        ]}
        sections={[
          {
            heading: "No tracking cookies",
            body: [
              "Pullify does not set cookies to track you across visits, does not use third-party advertising or analytics cookies, and does not sell or share browsing data with ad networks.",
            ],
          },
          {
            heading: "Local storage, not cookies",
            body: [
              "The one piece of data Pullify keeps in your browser is your recent download history, stored using your browser's local storage (not a cookie) under the key download_history. This stays on your device, is used only to show you your own recent downloads, and is never transmitted to Algora Labs' servers as tracking data. You can clear it any time from the download queue widget or your browser's site data settings.",
            ],
          },
          {
            heading: "If this changes",
            body: [
              "If Pullify ever introduces cookies for functionality (for example, remembering a UI preference), this page will be updated to describe exactly what's stored and why before that change ships.",
            ],
          },
        ]}
        relatedLinks={[
          { href: "/privacy-policy", label: "Privacy Policy" },
          { href: "/terms-of-service", label: "Terms of Service" },
          { href: "/contact", label: "Contact" },
          { href: "/", label: "Home" },
        ]}
      />
    </>
  );
}
