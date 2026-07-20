type IconKey = "music" | "image" | "list" | "gallery" | "film" | "waves" | "arrow" | "audio" | "eye";

export type FeatureKey =
  | "download-mp3"
  | "download-thumbnail"
  | "download-playlist"
  | "download-shorts"
  | "download-reels"
  | "download-1080p"
  | "download-4k"
  | "download-audio"
  | "download-video-no-watermark";

export type CompareKey =
  | "y2mate-alternative"
  | "savefrom-alternative"
  | "snaptik-alternative";

type FeaturePage = {
  slug: FeatureKey;
  title: string;
  description: string;
  h1: string;
  intro: string;
  body: string[];
  iconKey: IconKey;
  benefits: string[];
  steps: string[];
  faqs: { question: string; answer: string }[];
};

type ComparisonPage = {
  slug: CompareKey;
  title: string;
  description: string;
  h1: string;
  intro: string;
  body: string[];
  iconKey: IconKey;
  comparisonPoints: string[];
  faqs: { question: string; answer: string }[];
};

export const featurePages: FeaturePage[] = [
  { slug: "download-mp3", title: "Download MP3 - Convert Media to Audio", description: "Extract audio in MP3-friendly workflows with clear steps and fast downloads.", h1: "Download MP3", intro: "Save audio from supported links with the same downloader and a few simple steps.", body: ["Pullify is useful when you only need the sound from a video, interview, lecture, or clip. Instead of forcing you to navigate a complicated conversion tool, the page keeps the process direct: paste the link, fetch the media details, and pick an audio format if one is available. That makes it easier to save spoken-word content, background music, or quick reference audio without having to download the full video first.", "This page is also designed for users who want a clean, repeatable workflow. If you frequently collect podcasts, voice notes, or tutorial audio, the same layout works every time, and the queue keeps everything organized in one place. The page includes related links, FAQs, and supported platform references so visitors can move between guides without getting lost."], iconKey: "music", benefits: ["Fast audio extraction", "Simple workflow", "Useful for music, podcasts and clips"], steps: ["Copy a supported media link.", "Paste it into Pullify.", "Choose an audio format and download it."], faqs: [{ question: "Can I get only the audio?", answer: "Yes, select an audio format in the downloader and save the file." }] },
  { slug: "download-thumbnail", title: "Download Thumbnail - Save Video Cover Images", description: "Capture thumbnails from supported media links for previews, covers and reference use.", h1: "Download Thumbnail", intro: "Grab the thumbnail image associated with a supported video or post.", body: ["Thumbnails are useful when you want a preview image for a project, a reference frame for editing, or a cover asset for a saved clip. Pullify keeps that process simple by exposing the media preview right inside the same workflow you already use for video or audio downloads. You do not need a separate image grabber or a complicated export process.", "Because thumbnail use cases vary, the page is written to support both casual and practical needs. Creators may want to collect preview images for planning, while researchers or editors may simply need a quick visual reference. The page gives enough context to explain when thumbnails are available, how the download flow works, and what to do if a source does not expose one."], iconKey: "image", benefits: ["Quick preview saving", "Great for content planning", "Works with supported links"], steps: ["Paste a supported link.", "Fetch the media information.", "Download the thumbnail where available."], faqs: [{ question: "Does every video have a thumbnail?", answer: "Most supported videos expose a thumbnail, but availability depends on the source link." }] },
  { slug: "download-playlist", title: "Download Playlist - Save Multiple Items Efficiently", description: "Guide users through downloading items one by one from a supported playlist flow.", h1: "Download Playlist", intro: "Use Pullify as the starting point for saving a sequence of supported items.", body: ["Playlist-style downloading is helpful when you are collecting several related clips and want a repeatable way to work through them. Pullify keeps the experience lightweight by focusing on the most important part: opening a supported link, inspecting the available media, and moving items into the queue. This makes the page practical for batch work without turning the interface into a crowded control panel.", "For SEO, the playlist page also serves as a helpful landing spot for people searching for a simple way to organize multiple downloads. The copy explains the process in plain language, the page links to related guides, and the FAQ gives a concise answer about how playlist-style work fits into the current downloader. That keeps the page informative while staying aligned with the actual product behavior."], iconKey: "list", benefits: ["Helpful batch workflow", "Keeps downloads organized", "Pairs with the queue UI"], steps: ["Open the supported playlist link.", "Fetch the media items.", "Add each item you want to the queue."], faqs: [{ question: "Is playlist downloading automatic?", answer: "The downloader is optimized for single links, but you can process items sequentially from a playlist." }] },
  { slug: "download-shorts", title: "Download Shorts - Save Short-Form Video", description: "Learn how to download short-form videos from supported platforms with minimal friction.", h1: "Download Shorts", intro: "Save short-form videos using the existing downloader and a clean format picker.", body: ["Short-form video pages work best when they explain the exact use case clearly. Pullify keeps the route focused on quick access, fast format discovery, and a smooth handoff into the queue. That matters for short clips because users usually want a simple answer: can I save this, what quality is available, and how quickly can I get it?", "This page is especially useful for people who browse a lot of reels, shorts, and snackable clips and want a consistent way to save them. The supporting copy helps explain how the process differs from longer videos, why the same downloader still applies, and how to choose the best available format without adding extra steps or changing the UI."], iconKey: "gallery", benefits: ["Short-form optimized", "Simple steps", "Same downloader UI"], steps: ["Copy the short-form video link.", "Paste it into the search bar.", "Choose the quality you want and download."], faqs: [{ question: "Can I download short videos in HD?", answer: "When the source provides it, you can select the higher quality available format." }] },
  { slug: "download-reels", title: "Download Reels - Save Reels in Available Formats", description: "Save reels from supported platforms while preserving the existing download flow.", h1: "Download Reels", intro: "Use Pullify to fetch reels and download the available media formats.", body: ["Reels are one of the most common content formats people search for, so this page should answer the core question immediately: can I save it, and what format can I use? Pullify gives that answer through a plain, structured workflow that keeps the experience focused. The same downloader form works here, but the surrounding text helps users understand the reels use case specifically.", "The page also doubles as a strong SEO landing page because it includes descriptive copy, platform context, and useful FAQs without pretending to be something the product is not. People visiting this page get a practical explanation of the process, a direct path into the downloader, and links to related platform pages so they can keep exploring the site when needed."], iconKey: "film", benefits: ["Built for reels", "Fast format lookup", "Maintains your workflow"], steps: ["Copy the reel link.", "Paste it here and fetch the media.", "Download the format that fits your needs."], faqs: [{ question: "Are reels supported?", answer: "Yes, supported reel links can be processed through the downloader." }] },
  { slug: "download-1080p", title: "Download 1080p Videos - Save Full HD", description: "Choose 1080p when available and keep the page structure lightweight.", h1: "Download 1080p", intro: "Pick the 1080p option when the source offers a full HD stream.", body: ["The 1080p page is for users who care about balance: high enough quality to look good, but not so large that the file becomes inconvenient. Pullify explains that tradeoff clearly and keeps the workflow minimal. You paste the link, inspect the available formats, and choose 1080p if the source exposes it. That makes the page useful for everyday downloading and more search-friendly than a generic landing page.", "Because not every source provides the same resolutions, the page also helps manage expectations. It explains that quality depends on the original media, which is important for both user trust and SEO accuracy. The page is designed to be practical, easy to understand, and aligned with the downloader UI already on the site."], iconKey: "waves", benefits: ["Full HD option", "Simple quality selection", "No UI changes"], steps: ["Paste the media link.", "Wait for the format list.", "Select 1080p if available and start the download."], faqs: [{ question: "Do all videos have 1080p?", answer: "No, availability depends on the source file and platform limits." }] },
  { slug: "download-4k", title: "Download 4K Videos - Save Ultra HD", description: "Explain how to choose 4K downloads when supported by the source media.", h1: "Download 4K", intro: "When the source supports ultra HD, Pullify can surface those formats.", body: ["The 4K page should be clear about one thing: higher resolution is only available when the source actually provides it. Pullify explains that upfront and keeps the process simple, so users know they are choosing from real source formats rather than expecting a magic upscaler. That honesty helps both usability and SEO quality.", "This page is useful for creators, editors, and viewers who want the best possible quality for archival or editing work. The copy gives practical context around when 4K makes sense, how the format list works, and how the queue fits into the process. It stays short enough to scan but rich enough to be useful."], iconKey: "arrow", benefits: ["Ultra HD guidance", "Best quality first", "Maintains performance"], steps: ["Paste the supported video link.", "Inspect the available formats.", "Choose 4K when it is listed."], faqs: [{ question: "Can I always get 4K?", answer: "Only if the original source provides a 4K stream." }] },
  { slug: "download-audio", title: "Download Audio - Save Sound Only", description: "Focus on audio-only downloads for tracks, speeches and podcasts.", h1: "Download Audio", intro: "Use Pullify to save the audio track without downloading the full video.", body: ["Audio-only downloading is a strong fit for lectures, interviews, spoken-word content, and music clips where the visual track is not needed. Pullify keeps that use case simple: paste a supported link, fetch the media, and choose an audio format. The page explains the process in a way that feels useful to a real visitor, not just search engines.", "The page also helps users understand the value of audio extraction as a workflow. Smaller files are easier to store, transfer, and revisit later. By keeping the UI stable while providing detailed guidance, the page makes audio downloads feel like a first-class part of the product instead of a side feature."], iconKey: "audio", benefits: ["Audio-only workflow", "Good for podcasts", "Smaller files"], steps: ["Paste a supported link.", "Select an audio format.", "Download the audio file."], faqs: [{ question: "Is audio extraction available for every link?", answer: "Audio availability depends on the media source and the formats it exposes." }] },
  { slug: "download-video-no-watermark", title: "Download Video No Watermark - Clean Saved Clips", description: "Explain how users can save supported videos without a watermark where the source allows it.", h1: "Download Video No Watermark", intro: "For supported sources, choose the cleanest available stream from the format list.", body: ["Many people search for no-watermark downloads because they want a cleaner clip for personal archiving, editing, or presentation use. Pullify helps by showing the available source formats and letting the user decide what to save. The page is careful to explain that results depend on the original media, which keeps the copy accurate and trustworthy.", "This landing page is also a good internal hub for related guides because it points users toward platform-specific pages and other download format pages. That means the content is useful both for people looking for a direct answer and for search engines trying to understand the site’s structure and topical coverage."], iconKey: "eye", benefits: ["Cleaner clips", "Source-driven formats", "No extra UI complexity"], steps: ["Paste the supported link.", "Review the available formats.", "Choose the cleanest option if available."], faqs: [{ question: "Does Pullify remove watermarks?", answer: "It lets you choose available source formats; watermark behavior depends on the original media." }] },
];

export const comparisonPages: ComparisonPage[] = [
  { slug: "y2mate-alternative", title: "Y2Mate Alternative - Faster Media Downloader", description: "Compare Pullify as an alternative with a cleaner interface and simpler workflow.", h1: "Y2Mate Alternative", intro: "Pullify provides a focused downloader flow without extra distractions.", body: ["If someone is comparing download tools, they usually care about speed, clarity, and how many steps it takes to get from link to file. Pullify positions itself as a straightforward alternative by keeping the interface simple and the process direct. That makes this page useful both for search visitors and for people who just want a clear explanation of why the product exists.", "The page also helps with internal navigation by pointing users to platform-specific downloads and feature-specific guides. Instead of pushing blog-style content, it gives a concise comparison that still provides enough depth to answer the intent behind the search term. That balance is important for SEO because it reads naturally and supports topical relevance."], iconKey: "arrow", comparisonPoints: ["Cleaner interface", "Direct format selection", "Shared queue and history"], faqs: [{ question: "Why use this alternative?", answer: "It keeps the existing workflow minimal and focused on the download task." }] },
  { slug: "savefrom-alternative", title: "SaveFrom Alternative - Modern Downloader Workflow", description: "Position Pullify as a lightweight SaveFrom alternative for supported links.", h1: "SaveFrom Alternative", intro: "Use the same downloader UI while keeping SEO entry points specific.", body: ["People looking for a SaveFrom alternative usually want a tool that feels familiar but less cluttered. Pullify fits that search intent by focusing on a clean link-based workflow, clear format selection, and a visible queue that shows what is happening. The page explains that in practical terms so visitors can quickly decide whether it matches what they need.", "This landing page also helps search engines understand the relationship between the homepage, platform pages, and the feature pages. That internal structure matters because it shows that the site covers not just one downloader page, but a broader set of useful entry points for common download tasks.",], iconKey: "list", comparisonPoints: ["Simple input flow", "Focused pages", "Easy platform navigation"], faqs: [{ question: "Is it a replacement?", answer: "It offers a similar purpose with a cleaner, more focused experience." }] },
  { slug: "snaptik-alternative", title: "Snaptik Alternative - TikTok Video Downloader", description: "Show Pullify as a TikTok-focused alternative with the same downloader flow.", h1: "Snaptik Alternative", intro: "The TikTok page and downloader experience stay the same while improving discoverability.", body: ["A Snaptik alternative page should be specific, useful, and honest about what the tool does. Pullify serves that purpose by keeping the same downloader workflow while presenting it in a more general, site-wide way. This is good for users who want a TikTok-focused entry point but also want access to the rest of the supported platforms.", "The page gives search engines clear context around TikTok downloads without duplicating the exact same text as the main TikTok page. It also helps visitors move into the regular downloader, the main platform pages, or the feature pages depending on what they want next."], iconKey: "music", comparisonPoints: ["TikTok-specific entry point", "Format list stays intact", "Keeps the same UI"], faqs: [{ question: "Does it work for TikTok?", answer: "Yes, use the TikTok page or the alternative landing page to access the same downloader." }] },
];

export const comparePageSlugs = comparisonPages.map((page) => page.slug);

export function getFeatureRelatedLinks(currentSlug: FeatureKey) {
  return [
    { href: "/youtube", label: "YouTube Downloader" },
    { href: "/instagram", label: "Instagram Downloader" },
    { href: "/facebook", label: "Facebook Downloader" },
    { href: "/tiktok", label: "TikTok Downloader" },
    { href: "/how-to", label: "How To Guide" },
    ...featurePages
      .filter((page) => page.slug !== currentSlug)
      .slice(0, 4)
      .map((page) => ({ href: `/${page.slug}`, label: page.h1 })),
  ];
}

export function getComparisonRelatedLinks(currentSlug: CompareKey) {
  return [
    { href: "/", label: "Home" },
    { href: "/youtube", label: "YouTube Downloader" },
    { href: "/instagram", label: "Instagram Downloader" },
    { href: "/facebook", label: "Facebook Downloader" },
    { href: "/tiktok", label: "TikTok Downloader" },
    ...comparisonPages
      .filter((page) => page.slug !== currentSlug)
      .map((page) => ({ href: `/compare/${page.slug}`, label: page.h1 })),
  ];
}

export function getFeaturePage(slug: FeatureKey) {
  return featurePages.find((page) => page.slug === slug)!;
}

export function getComparisonPage(slug: CompareKey) {
  return comparisonPages.find((page) => page.slug === slug)!;
}
