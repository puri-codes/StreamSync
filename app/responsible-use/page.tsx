import LegalPage from "@/components/LegalPage";
import { featureMetadata, genericBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = featureMetadata(
  "Responsible Use Policy | Pullify",
  "Pullify's Responsible Use Policy: the tool is for content you own or have permission to download. Read what that means before you use it.",
  "responsible-use"
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericBreadcrumbJsonLd("Responsible Use Policy", "/responsible-use")) }}
      />
      <LegalPage
        h1="Responsible Use Policy"
        lastUpdated="July 27, 2026"
        intro={[
          "Pullify is a tool for downloading media you already have the right to download — content you created, content you have explicit permission to save, or content a platform's own public sharing features make available to you personally (for example, saving your own Instagram Reel, or a public interview you have permission to archive).",
          "Pullify does not review, moderate, or take a position on any specific link a visitor submits. It fetches whatever format the source platform serves publicly for that link. Responsibility for what you do with that file, and whether you had the right to download it, sits with you as the user — not with Pullify or Algora Labs.",
        ]}
        sections={[
          {
            heading: "What Pullify is for",
            body: [
              "Saving your own content as a personal backup. Archiving public content you have the rights holder's permission to keep. Downloading audio or video for personal, non-commercial reference where the source platform and the content owner allow it.",
            ],
          },
          {
            heading: "What Pullify is not for",
            body: [
              "Redistributing, reselling, or re-uploading someone else's copyrighted work without permission. Circumventing a platform's privacy controls to access private accounts, private groups, or login-gated content — Pullify only works with links a platform already serves publicly, and it will not fetch anything else. Any use that violates the terms of service of the platform you're downloading from.",
            ],
          },
          {
            heading: "Platform terms of service",
            body: [
              "YouTube, Instagram, Facebook, and TikTok each have their own terms of service governing downloading and reuse of content on their platforms. Using Pullify does not exempt you from those terms. If you're unsure whether downloading a specific piece of content is allowed, check the platform's terms and the original creator's stated permissions before proceeding.",
            ],
          },
          {
            heading: "Copyright and permission",
            body: [
              "Copyright law varies by country, and what counts as fair use or personal-use exception is not the same everywhere. Pullify does not provide legal advice, and nothing on this site should be read as a guarantee that downloading a specific file is lawful in your jurisdiction. When in doubt, don't download it, or get permission from the rights holder first.",
              "If you believe your copyrighted work has been downloaded or shared through Pullify without permission, see our Copyright & DMCA Policy for how to file a takedown request.",
            ],
          },
          {
            heading: "Enforcement",
            body: [
              "Pullify does not host, store, or index any downloaded media on its own servers beyond the time needed to complete a requested transfer — files are streamed from the source platform's own servers through to your device. Because of that, there is no Pullify-hosted library to take down; takedown requests are handled per our Copyright & DMCA Policy on a case-by-case basis, including blocking specific source links from being processed where appropriate.",
            ],
          },
        ]}
        relatedLinks={[
          { href: "/copyright-dmca", label: "Copyright & DMCA Policy" },
          { href: "/terms-of-service", label: "Terms of Service" },
          { href: "/contact", label: "Contact" },
          { href: "/how-to", label: "How Pullify Works" },
        ]}
      />
    </>
  );
}
