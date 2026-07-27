import LegalPage from "@/components/LegalPage";
import { featureMetadata, genericBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = featureMetadata(
  "Security Policy | Pullify",
  "How Pullify handles requests securely, and how to report a security issue.",
  "security-policy"
);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericBreadcrumbJsonLd("Security Policy", "/security-policy")) }}
      />
      <LegalPage
        h1="Security Policy"
        lastUpdated="July 27, 2026"
        intro={[
          "This page covers how Pullify is built with security in mind, and how to report a vulnerability if you find one.",
        ]}
        sections={[
          {
            heading: "No credentials requested",
            body: [
              "Pullify never asks for your login credentials on YouTube, Instagram, Facebook, TikTok, or any other platform. It only processes links to publicly available content, so there's no account password or session token for the service to handle or expose in the first place.",
            ],
          },
          {
            heading: "Request handling",
            body: [
              "Pullify's website acts as a proxy in front of a separate backend service that performs the actual media lookups and downloads. Requests to fetch media info or start a download pass through this proxy layer rather than exposing the backend directly, and file downloads are streamed through rather than stored longer than necessary to complete the transfer.",
            ],
          },
          {
            heading: "Browser-level protections",
            body: [
              "The site sends standard security headers on every page — including a Content Security Policy, X-Frame-Options, X-Content-Type-Options, and a Referrer-Policy — aimed at reducing risks like clickjacking and content-type sniffing attacks.",
            ],
          },
          {
            heading: "Reporting a vulnerability",
            body: [
              "If you believe you've found a security issue with Pullify, email support@pullify.algoralabs.site with details and, if possible, steps to reproduce it. Please report vulnerabilities privately rather than publicly before we've had a chance to address them.",
            ],
          },
        ]}
        relatedLinks={[
          { href: "/privacy-policy", label: "Privacy Policy" },
          { href: "/contact", label: "Contact" },
          { href: "/", label: "Home" },
        ]}
      />
    </>
  );
}
