import LegalPage from "@/components/LegalPage";
import { featureMetadata, genericBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = featureMetadata(
  "About Pullify | Algora Labs",
  "What Pullify is, why it exists, and who builds it.",
  "about"
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericBreadcrumbJsonLd("About", "/about")) }}
      />
      <LegalPage
        h1="About Pullify"
        lastUpdated="July 27, 2026"
        intro={[
          "Pullify is built and operated by Algora Labs. It's a browser-based tool for downloading public media — video, audio, and thumbnails — from YouTube, Instagram, Facebook, and TikTok, without requiring an app install or account.",
        ]}
        sections={[
          {
            heading: "Why Pullify exists",
            body: [
              "Saving a public video or audio clip you have the right to download shouldn't require installing unfamiliar software or granting broad permissions to a browser extension. Pullify's goal is a straightforward, link-in-file-out workflow: paste a public link, see the formats the source actually provides, and download the one you want.",
            ],
          },
          {
            heading: "How it works, briefly",
            body: [
              "Pullify's website is the interface — it doesn't run the actual media extraction itself. When you fetch a link, the request is proxied to a backend service that reads the format list a platform publishes for that specific upload and returns it. Downloads stream through the same proxy. Nothing about your account credentials on any platform is ever requested or used, because Pullify only accesses what platforms already serve publicly.",
            ],
          },
          {
            heading: "What we won't claim",
            body: [
              "We'd rather a page tell you a feature isn't available than overstate what Pullify does. You'll see that reflected across the platform and feature guides on this site — including being upfront that download quality depends entirely on the source, that private content can't be accessed, and that Pullify doesn't remove or edit anything in a downloaded file, including watermarks a source platform embeds itself.",
            ],
          },
          {
            heading: "Questions or feedback",
            body: [
              "Reach out through the Contact page for support questions, or see the Copyright & DMCA Policy if you believe content accessed through Pullify infringes your rights.",
            ],
          },
        ]}
        relatedLinks={[
          { href: "/contact", label: "Contact" },
          { href: "/responsible-use", label: "Responsible Use Policy" },
          { href: "/how-to", label: "How Pullify Works" },
          { href: "/", label: "Home" },
        ]}
      />
    </>
  );
}
