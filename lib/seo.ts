import type { Metadata } from "next";

export type SeoPageKey = "home" | "youtube" | "instagram" | "facebook" | "tiktok" | "how-to";

type SeoPageConfig = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  canonical: string;
  howToName: string;
};

export const siteName = "Pullify";
export const siteUrl = process.env.APP_URL || "https://media-downloader.example.com";
export const siteDescription =
  "Pullify is a fast media downloader for YouTube, Instagram, Facebook, TikTok and more.";

export const seoPages: Record<SeoPageKey, SeoPageConfig> = {
  home: {
    slug: "/",
    title: "Pullify | Video, Audio, and Social Media Downloader",
    description: "Download high quality videos, audio and images from popular platforms with Pullify, a fast and simple media downloader.",
    keywords: ["Pullify", "media downloader", "video downloader", "audio downloader", "social media downloader"],
    h1: "Download Videos From Anywhere",
    canonical: "/",
    howToName: "how it works",
  },
  youtube: {
    slug: "/youtube",
    title: "Pullify YouTube Downloader - Download Videos and Audio",
    description: "Download YouTube videos and audio in available formats with Pullify.",
    keywords: ["Pullify YouTube downloader", "youtube downloader", "download youtube video", "youtube to mp3", "youtube to mp4"],
    h1: "Download Videos From YouTube",
    canonical: "/youtube",
    howToName: "how to download from YouTube",
  },
  instagram: {
    slug: "/instagram",
    title: "Pullify Instagram Downloader - Download Reels and Posts",
    description: "Download Instagram reels, posts and videos in available formats with Pullify.",
    keywords: ["Pullify Instagram downloader", "instagram downloader", "download instagram reel", "instagram video downloader"],
    h1: "Download Videos From Instagram",
    canonical: "/instagram",
    howToName: "how to download from Instagram",
  },
  facebook: {
    slug: "/facebook",
    title: "Pullify Facebook Video Downloader - Save Facebook Videos",
    description: "Download public Facebook videos quickly and choose from the available formats with Pullify.",
    keywords: ["Pullify Facebook downloader", "facebook video downloader", "download facebook video", "facebook downloader"],
    h1: "Download Videos From Facebook",
    canonical: "/facebook",
    howToName: "how to download from Facebook",
  },
  tiktok: {
    slug: "/tiktok",
    title: "Pullify TikTok Downloader - Download TikTok Videos",
    description: "Download TikTok videos in the available formats using Pullify.",
    keywords: ["Pullify TikTok downloader", "tiktok downloader", "download tiktok video", "tiktok video downloader"],
    h1: "Download Videos From TikTok",
    canonical: "/tiktok",
    howToName: "how to download from TikTok",
  },
  "how-to": {
    slug: "/how-to",
    title: "How To Download Media With Pullify - Step by Step Guide",
    description: "Learn how to use Pullify to download media from supported platforms.",
    keywords: ["how to download video", "download guide", "media downloader guide", "Pullify guide"],
    h1: "How To Download Media",
    canonical: "/how-to",
    howToName: "how it works",
  },
};

export function buildMetadata(page: SeoPageKey): Metadata {
  const config = seoPages[page];

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: config.canonical,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `${siteUrl}${config.canonical}`,
      siteName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export function breadcrumbJsonLd(page: SeoPageKey) {
  const config = seoPages[page];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.h1,
        item: `${siteUrl}${config.canonical}`,
      },
    ],
  };
}

export function webpageJsonLd(page: SeoPageKey) {
  const config = seoPages[page];
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.title,
    description: config.description,
    url: `${siteUrl}${config.canonical}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function howToJsonLd(page: SeoPageKey) {
  const config = seoPages[page];
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: config.howToName,
    description: config.description,
    url: `${siteUrl}${config.canonical}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function featureMetadata(title: string, description: string, slug: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${slug}`,
      siteName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export function comparisonMetadata(title: string, description: string, slug: string): Metadata {
  return featureMetadata(title, description, `compare/${slug}`);
}
