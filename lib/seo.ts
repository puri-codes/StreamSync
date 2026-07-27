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
  directAnswer: string;
  faqs: { question: string; answer: string }[];
};

export const siteName = "Pullify";
function normalizeSiteUrl(value: string) {
  return value.replace(/\/+$/, "");
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://pullify.algoralabs.site"
);
export const siteDescription =
  "Pullify is a fast media downloader for YouTube, Instagram, Facebook, TikTok and more.";

export function joinSiteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const seoPages: Record<SeoPageKey, SeoPageConfig> = {
  home: {
    slug: "/",
    title: "Pullify | Video, Audio, and Social Media Downloader",
    description: "Download high quality videos, audio and images from popular platforms with Pullify, a fast and simple media downloader.",
    keywords: ["Pullify", "media downloader", "video downloader", "audio downloader", "social media downloader"],
    h1: "Download Videos From Anywhere",
    canonical: "/",
    howToName: "how it works",
    directAnswer:
      "Pullify downloads video, audio, and thumbnail files from public YouTube, Instagram, Facebook, and TikTok links. Paste a URL, Pullify reads the formats the source actually provides for that specific upload, and you choose a resolution or audio-only option to save the file to your device.",
    faqs: [
      { question: "Do I need an account to use Pullify?", answer: "No. Paste a link and download — nothing is tied to a server-side account. Your download history is saved only in your own browser's local storage, and you can clear it at any time." },
      { question: "Why do some videos show fewer quality options than others?", answer: "The format list you see is exactly what the source platform encoded and exposed for that specific upload. Pullify can't add resolutions a video was never published in — availability depends entirely on the source, not on Pullify." },
      { question: "Can I download just the audio from a video?", answer: "Yes, when the source exposes an audio-only stream it appears in the same format list as the video options. See the dedicated Download Audio and Download MP3 guides for format-specific notes." },
      { question: "What happens if a download fails partway through?", answer: "Failed items stay visible in the download queue widget with a retry button. Retrying starts a fresh job with the same link and format instead of resuming a broken transfer." },
      { question: "Can I download from a private account or restricted post?", answer: "No. Pullify can only fetch media the source platform serves publicly. Private accounts, expired stories, and login-gated posts will fail to load." },
    ],
  },
  youtube: {
    slug: "/youtube",
    title: "Pullify YouTube Downloader - Download Videos and Audio",
    description: "Download YouTube videos and audio in available formats with Pullify.",
    keywords: ["Pullify YouTube downloader", "youtube downloader", "download youtube video", "youtube to mp3", "youtube to mp4"],
    h1: "Download Videos From YouTube",
    canonical: "/youtube",
    howToName: "how to download from YouTube",
    directAnswer:
      "Paste a public YouTube video, Shorts, or single playlist-item link into Pullify to see the video and audio formats YouTube exposes for that upload. Pick a resolution, an audio-only track, or the thumbnail, then download — quality options depend on what that specific video was published in.",
    faqs: [
      { question: "Can Pullify download age-restricted or private YouTube videos?", answer: "No. Age-restricted videos that require a signed-in account, unlisted links you don't have direct access to, and private videos cannot be fetched — Pullify only reads what YouTube serves to a public, unauthenticated request." },
      { question: "What's the highest resolution I can get from YouTube?", answer: "Whatever the uploader published, up to and including 4K where YouTube offers it for that video. Older or lower-effort uploads may only expose 720p or 480p — check the format list after fetching rather than assuming a resolution is available." },
      { question: "Does Pullify download full YouTube playlists at once?", answer: "Pullify fetches one link at a time. For a playlist, open each video individually and repeat the fetch-and-download step — see the Download Playlist guide for the full workflow." },
      { question: "Can I get just the audio from a YouTube video?", answer: "Yes. When YouTube exposes an audio-only stream for the video, it shows up in the same format table. For MP3-specific conversion notes, see the Download MP3 guide." },
      { question: "Why did my YouTube link fail to load?", answer: "The most common causes are a private or deleted video, a region-locked upload, or a malformed URL (missing the video ID). Copy the link directly from YouTube's share button rather than the address bar of an embedded player." },
    ],
  },
  instagram: {
    slug: "/instagram",
    title: "Pullify Instagram Downloader - Download Reels and Posts",
    description: "Download Instagram reels, posts and videos in available formats with Pullify.",
    keywords: ["Pullify Instagram downloader", "instagram downloader", "download instagram reel", "instagram video downloader"],
    h1: "Download Videos From Instagram",
    canonical: "/instagram",
    howToName: "how to download from Instagram",
    directAnswer:
      "Paste a public Instagram Reel, post, or carousel link into Pullify to fetch the video or image formats Instagram exposes for it. Stories and content from private accounts can't be fetched — Instagram only serves public post data to an unauthenticated request, which is what Pullify sends.",
    faqs: [
      { question: "Can Pullify download Instagram Stories?", answer: "Only while a story is still live and the account is public — once a story expires (24 hours) or the account is private, Instagram no longer serves it publicly and the link will fail." },
      { question: "Does Pullify work on private Instagram accounts?", answer: "No. Instagram does not expose media from private accounts to unauthenticated requests, and Pullify does not log in on your behalf, so private posts and reels cannot be fetched." },
      { question: "Can I download a whole carousel post?", answer: "Pullify fetches the media Instagram returns for the post link. For multi-image carousels, check the format list after fetching — availability of each frame depends on how Instagram exposes the post." },
      { question: "How do I save just the audio from a Reel?", answer: "If the Reel exposes an audio-only stream, it appears in the format list alongside the video options. See the Download Reels guide for reel-specific format notes." },
      { question: "Why does my Instagram link show no formats?", answer: "This usually means the account is private, the post was deleted, or the link points to a profile page instead of a specific post or reel. Copy the link from the post's own share menu." },
    ],
  },
  facebook: {
    slug: "/facebook",
    title: "Pullify Facebook Video Downloader - Save Facebook Videos",
    description: "Download public Facebook videos quickly and choose from the available formats with Pullify.",
    keywords: ["Pullify Facebook downloader", "facebook video downloader", "download facebook video", "facebook downloader"],
    h1: "Download Videos From Facebook",
    canonical: "/facebook",
    howToName: "how to download from Facebook",
    directAnswer:
      "Paste a public Facebook video, page post, or live-replay link into Pullify to fetch the formats Facebook exposes for it. Only content from public pages and posts can be fetched — videos inside private groups or friends-only posts are not accessible without logging in, which Pullify does not do.",
    faqs: [
      { question: "Can Pullify download videos from private Facebook groups?", answer: "No. Facebook restricts group content to logged-in members, and Pullify only sends unauthenticated, public requests — it cannot access anything behind a login wall." },
      { question: "Does Pullify support Facebook Live replays?", answer: "Yes, once a live broadcast has ended and the replay is posted publicly on the page, its link can be fetched the same way as any other public Facebook video." },
      { question: "Why does a Facebook video only show one quality option?", answer: "Some Facebook uploads, particularly from mobile pages, are only encoded in a single resolution by the platform itself. Pullify can only offer what Facebook's own servers expose for that video." },
      { question: "Can I download audio only from a Facebook video?", answer: "When Facebook exposes an audio-only stream for the video it appears in the format list, but Facebook audio-only formats are less consistently available than on YouTube or Instagram." },
      { question: "Why did my Facebook link fail?", answer: "Check that the post is public (not friends-only or inside a private group) and that you copied the link from the post itself rather than a shortened share link from another app." },
    ],
  },
  tiktok: {
    slug: "/tiktok",
    title: "Pullify TikTok Downloader - Download TikTok Videos",
    description: "Download TikTok videos in the available formats using Pullify.",
    keywords: ["Pullify TikTok downloader", "tiktok downloader", "download tiktok video", "tiktok video downloader"],
    h1: "Download Videos From TikTok",
    canonical: "/tiktok",
    howToName: "how to download from TikTok",
    directAnswer:
      "Paste a public TikTok video link into Pullify to fetch the formats TikTok exposes for it, then choose a video or audio-only option to download. Whether the saved file carries TikTok's on-video watermark depends on what TikTok's own servers publish for that clip, not on Pullify.",
    faqs: [
      { question: "Does Pullify remove the TikTok watermark?", answer: "No. Pullify downloads whatever format TikTok's servers expose for the video — it does not edit, crop, or process the file to remove a watermark. See the Download Video Without Watermark guide for which sources are and aren't watermark-free at the source." },
      { question: "Can I download a private TikTok account's videos?", answer: "No. TikTok only serves public video data to unauthenticated requests, so private-account content cannot be fetched." },
      { question: "Can I extract just the audio (sound) from a TikTok?", answer: "Yes, when TikTok exposes an audio-only stream for the clip it appears in the format list. This is useful for saving trending sounds separately from the video." },
      { question: "Why does my TikTok link show an error?", answer: "The most common causes are a private account, a removed video, or a link copied from a browser tab instead of the in-app Share button — use TikTok's own share link for the most reliable result." },
      { question: "What video quality does TikTok provide?", answer: "TikTok typically encodes at up to 1080p depending on the uploader's device and settings; Pullify shows whatever resolutions TikTok's servers actually expose for that specific video." },
    ],
  },
  "how-to": {
    slug: "/how-to",
    title: "How To Download Media With Pullify - Step by Step Guide",
    description: "Learn how to use Pullify to download media from supported platforms.",
    keywords: ["how to download video", "download guide", "media downloader guide", "Pullify guide"],
    h1: "How To Download Media",
    canonical: "/how-to",
    howToName: "how it works",
    directAnswer:
      "To download with Pullify: copy a public link from YouTube, Instagram, Facebook, or TikTok, paste it into the search bar, and click Fetch Media. Pullify reads the formats the source exposes for that link, you choose a resolution or audio-only option, and the file downloads through your browser once it's ready.",
    faqs: [
      { question: "Do I need to install an app to use Pullify?", answer: "No. Pullify runs entirely in your browser on desktop or mobile — there's nothing to install, and downloaded files save through your browser's normal download behavior." },
      { question: "Which browsers does Pullify work in?", answer: "Any modern browser that supports standard downloads (Chrome, Firefox, Safari, Edge) on desktop or mobile. If a download doesn't start, check that your browser isn't blocking pop-ups or automatic downloads for the site." },
      { question: "What's the difference between the platform pages and this guide?", answer: "The platform pages (YouTube, Instagram, Facebook, TikTok) cover source-specific quirks — what's public, what formats to expect. This page covers the workflow itself, which is identical across every supported platform." },
      { question: "My download shows 0% and doesn't move — what's wrong?", answer: "This usually means the job is still being prepared on the backend. Give it a few seconds; if it stays at 0% for longer than a minute or moves to a failed state, use the retry button in the download queue widget." },
      { question: "Can I download more than one file at a time?", answer: "Yes. Each download you start is added to the queue widget and processed with its own progress tracking, so you can queue several links without waiting for each one to finish first." },
    ],
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
      url: joinSiteUrl(config.canonical),
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
        item: joinSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.h1,
        item: joinSiteUrl(config.canonical),
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
    url: joinSiteUrl(config.canonical),
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
    url: joinSiteUrl(config.canonical),
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Algora Labs",
    url: siteUrl,
    logo: joinSiteUrl("/logo.png"),
    brand: {
      "@type": "Brand",
      name: siteName,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@pullify.algoralabs.site",
      contactType: "customer support",
    },
  };
}

export function softwareApplicationJsonLd(page: SeoPageKey) {
  const config = seoPages[page];
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteName,
    url: joinSiteUrl(config.canonical),
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (browser-based)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "Algora Labs",
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
    url: joinSiteUrl(`/${slug}`),
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

export function genericBreadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: joinSiteUrl("/") },
      { "@type": "ListItem", position: 2, name, item: joinSiteUrl(path) },
    ],
  };
}
