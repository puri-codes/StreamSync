import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { siteDescription, siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Media Downloader - Download Videos From Anywhere",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Media Downloader - Download Videos From Anywhere",
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Media Downloader - Download Videos From Anywhere",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#111827",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased text-gray-900 bg-gray-50/50 transition-colors duration-200"
        suppressHydrationWarning
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
