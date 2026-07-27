import LegalPage from "@/components/LegalPage";
import { featureMetadata, genericBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = featureMetadata(
  "Support & Help Center | Pullify",
  "Troubleshooting for common Pullify issues — failed fetches, stuck downloads, and where to get help.",
  "support"
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericBreadcrumbJsonLd("Support", "/support")) }}
      />
      <LegalPage
        h1="Support & Help Center"
        lastUpdated="July 27, 2026"
        intro={[
          "This page collects the most common issues people run into with Pullify and what to do about each one. For a first-time walkthrough of the basic workflow, see the How-To guide instead — this page is specifically for when something isn't working as expected.",
        ]}
        sections={[
          {
            heading: "A link won't fetch any formats",
            body: [
              "The most common cause is that the content isn't public — a private account, an expired Story, a friends-only Facebook post, or content inside a restricted Group will all fail to return formats, since Pullify only reads what the source platform serves publicly. Double-check the link opens correctly and is public in a private/incognito browser window as a quick test.",
              "The second most common cause is copying the wrong kind of link — a profile page or search results URL instead of a specific video or post link. Copy the link from the platform's own share button on the individual item.",
            ],
          },
          {
            heading: "A download is stuck or stays at 0%",
            body: [
              "This usually means the backend is still preparing the file — give it a short wait before assuming it's failed. If a download stays stuck for longer than a minute or moves to a failed state, use the retry button in the download queue widget (bottom-left of the screen) rather than re-pasting the link from scratch.",
            ],
          },
          {
            heading: "The file didn't save, or my browser blocked it",
            body: [
              "Some browsers block automatic file downloads or pop-ups by default. If a download completes in the queue widget but nothing appears on your device, check your browser's download-blocking or pop-up settings for the Pullify site.",
            ],
          },
          {
            heading: "Fewer formats than expected showed up",
            body: [
              "This reflects what the source platform actually published for that specific item, not a limitation in Pullify. See the relevant platform guide (YouTube, Instagram, Facebook, TikTok) for notes on what typically affects format availability there.",
            ],
          },
          {
            heading: "Still stuck?",
            body: [
              "Email support@pullify.algoralabs.site with the link you were trying to download and a short description of what happened — that's usually enough to diagnose the issue.",
            ],
          },
        ]}
        relatedLinks={[
          { href: "/how-to", label: "How Pullify Works" },
          { href: "/contact", label: "Contact" },
          { href: "/youtube", label: "YouTube Guide" },
          { href: "/instagram", label: "Instagram Guide" },
          { href: "/facebook", label: "Facebook Guide" },
          { href: "/tiktok", label: "TikTok Guide" },
        ]}
      />
    </>
  );
}
