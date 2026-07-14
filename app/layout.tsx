import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const appUrl = process.env.APP_URL || "https://media-downloader.example.com";

export const metadata: Metadata = {
  title: "Media Downloader — Download Videos From Anywhere",
  description: "Download high quality videos, audio and images from popular platforms. Clean, fast, and completely free of spam or ads.",
  metadataBase: new URL(appUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Media Downloader — Download Videos From Anywhere",
    description: "Download high quality videos, audio and images from popular platforms. Clean, fast, and completely free of spam or ads.",
    url: appUrl,
    siteName: "Media Downloader",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Media Downloader — Download Videos From Anywhere",
    description: "Download high quality videos, audio and images from popular platforms. Clean, fast, and completely free of spam or ads.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased text-gray-900 bg-gray-50/50 transition-colors duration-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

