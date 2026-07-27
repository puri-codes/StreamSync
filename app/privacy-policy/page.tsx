import LegalPage from "@/components/LegalPage";
import { featureMetadata, genericBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = featureMetadata(
  "Privacy Policy | Pullify",
  "What Pullify (Algora Labs) does and doesn't collect when you use the site.",
  "privacy-policy"
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericBreadcrumbJsonLd("Privacy Policy", "/privacy-policy")) }}
      />
      <LegalPage
        h1="Privacy Policy"
        lastUpdated="July 27, 2026"
        intro={[
          "Pullify is operated by Algora Labs. This policy explains what happens to your data when you use the site — there's no user account system, so most of what typically appears in a privacy policy simply doesn't apply here.",
        ]}
        sections={[
          {
            heading: "What Pullify does not do",
            body: [
              "Pullify does not require an account, does not ask for your name, email, or payment details to use the downloader, and does not use analytics or advertising tracking scripts. There is no server-side tracking cookie set for identifying you across visits.",
            ],
          },
          {
            heading: "What's processed when you use the tool",
            body: [
              "The link you paste is sent to Pullify's backend to look up and fetch the media formats a source platform publishes for that link, and again if you start a download. This is necessary for the tool to function — Pullify cannot fetch a video or audio format without knowing which link you want. These requests are not linked to a persistent identity, since there's no account system to attach them to.",
              "Like any web service, requests to Pullify pass through standard server-level logs (e.g. IP address, timestamp, requested path) used for operating and securing the service — this is typical infrastructure logging, not a tracking or profiling system.",
            ],
          },
          {
            heading: "What's stored in your browser",
            body: [
              "Your recent download history is saved in your browser's local storage under a key named download_history, so you can see what you've downloaded recently without Pullify storing that list on a server. You can clear it at any time from the download queue widget, or by clearing your browser's site data for Pullify.",
            ],
          },
          {
            heading: "Third parties",
            body: [
              "Fetching and downloading media necessarily involves requests to the platform the link points to (YouTube, Instagram, Facebook, or TikTok) — those platforms' own privacy practices govern data they receive as part of serving that public content, independent of Pullify.",
            ],
          },
          {
            heading: "Changes to this policy",
            body: [
              "If what Pullify collects or how it processes requests changes, this page will be updated and the \"last updated\" date above will reflect that.",
            ],
          },
          {
            heading: "Contact",
            body: [
              "Questions about this policy can be sent to support@pullify.algoralabs.site.",
            ],
          },
        ]}
        relatedLinks={[
          { href: "/cookie-policy", label: "Cookie Policy" },
          { href: "/terms-of-service", label: "Terms of Service" },
          { href: "/contact", label: "Contact" },
          { href: "/", label: "Home" },
        ]}
      />
    </>
  );
}
