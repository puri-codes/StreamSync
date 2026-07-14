import { Music2, Image, ListVideo, GalleryVertical, Film, Waves, ArrowDownToLine, FileAudio2, EyeOff, type LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
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
  icon: LucideIcon;
  comparisonPoints: string[];
  faqs: { question: string; answer: string }[];
};

export const featurePages: FeaturePage[] = [
  { slug: "download-mp3", title: "Download MP3 - Convert Media to Audio", description: "Extract audio in MP3-friendly workflows with clear steps and fast downloads.", h1: "Download MP3", intro: "Save audio from supported links with the same downloader and a few simple steps.", icon: Music2, benefits: ["Fast audio extraction", "Simple workflow", "Useful for music, podcasts and clips"], steps: ["Copy a supported media link.", "Paste it into StreamSync.", "Choose an audio format and download it."], faqs: [{ question: "Can I get only the audio?", answer: "Yes, select an audio format in the downloader and save the file." }] },
  { slug: "download-thumbnail", title: "Download Thumbnail - Save Video Cover Images", description: "Capture thumbnails from supported media links for previews, covers and reference use.", h1: "Download Thumbnail", intro: "Grab the thumbnail image associated with a supported video or post.", icon: Image, benefits: ["Quick preview saving", "Great for content planning", "Works with supported links"], steps: ["Paste a supported link.", "Fetch the media information.", "Download the thumbnail where available."], faqs: [{ question: "Does every video have a thumbnail?", answer: "Most supported videos expose a thumbnail, but availability depends on the source link." }] },
  { slug: "download-playlist", title: "Download Playlist - Save Multiple Items Efficiently", description: "Guide users through downloading items one by one from a supported playlist flow.", h1: "Download Playlist", intro: "Use StreamSync as the starting point for saving a sequence of supported items.", icon: ListVideo, benefits: ["Helpful batch workflow", "Keeps downloads organized", "Pairs with the queue UI"], steps: ["Open the supported playlist link.", "Fetch the media items.", "Add each item you want to the queue."], faqs: [{ question: "Is playlist downloading automatic?", answer: "The downloader is optimized for single links, but you can process items sequentially from a playlist." }] },
  { slug: "download-shorts", title: "Download Shorts - Save Short-Form Video", description: "Learn how to download short-form videos from supported platforms with minimal friction.", h1: "Download Shorts", intro: "Save short-form videos using the existing downloader and a clean format picker.", icon: GalleryVertical, benefits: ["Short-form optimized", "Simple steps", "Same downloader UI"], steps: ["Copy the short-form video link.", "Paste it into the search bar.", "Choose the quality you want and download."], faqs: [{ question: "Can I download short videos in HD?", answer: "When the source provides it, you can select the higher quality available format." }] },
  { slug: "download-reels", title: "Download Reels - Save Reels in Available Formats", description: "Save reels from supported platforms while preserving the existing download flow.", h1: "Download Reels", intro: "Use StreamSync to fetch reels and download the available media formats.", icon: Film, benefits: ["Built for reels", "Fast format lookup", "Maintains your workflow"], steps: ["Copy the reel link.", "Paste it here and fetch the media.", "Download the format that fits your needs."], faqs: [{ question: "Are reels supported?", answer: "Yes, supported reel links can be processed through the downloader." }] },
  { slug: "download-1080p", title: "Download 1080p Videos - Save Full HD", description: "Choose 1080p when available and keep the page structure lightweight.", h1: "Download 1080p", intro: "Pick the 1080p option when the source offers a full HD stream.", icon: Waves, benefits: ["Full HD option", "Simple quality selection", "No UI changes"], steps: ["Paste the media link.", "Wait for the format list.", "Select 1080p if available and start the download."], faqs: [{ question: "Do all videos have 1080p?", answer: "No, availability depends on the source file and platform limits." }] },
  { slug: "download-4k", title: "Download 4K Videos - Save Ultra HD", description: "Explain how to choose 4K downloads when supported by the source media.", h1: "Download 4K", intro: "When the source supports ultra HD, StreamSync can surface those formats.", icon: ArrowDownToLine, benefits: ["Ultra HD guidance", "Best quality first", "Maintains performance"], steps: ["Paste the supported video link.", "Inspect the available formats.", "Choose 4K when it is listed."], faqs: [{ question: "Can I always get 4K?", answer: "Only if the original source provides a 4K stream." }] },
  { slug: "download-audio", title: "Download Audio - Save Sound Only", description: "Focus on audio-only downloads for tracks, speeches and podcasts.", h1: "Download Audio", intro: "Use StreamSync to save the audio track without downloading the full video.", icon: FileAudio2, benefits: ["Audio-only workflow", "Good for podcasts", "Smaller files"], steps: ["Paste a supported link.", "Select an audio format.", "Download the audio file."], faqs: [{ question: "Is audio extraction available for every link?", answer: "Audio availability depends on the media source and the formats it exposes." }] },
  { slug: "download-video-no-watermark", title: "Download Video No Watermark - Clean Saved Clips", description: "Explain how users can save supported videos without a watermark where the source allows it.", h1: "Download Video No Watermark", intro: "For supported sources, choose the cleanest available stream from the format list.", icon: EyeOff, benefits: ["Cleaner clips", "Source-driven formats", "No extra UI complexity"], steps: ["Paste the supported link.", "Review the available formats.", "Choose the cleanest option if available."], faqs: [{ question: "Does StreamSync remove watermarks?", answer: "It lets you choose available source formats; watermark behavior depends on the original media." }] },
];

export const comparisonPages: ComparisonPage[] = [
  { slug: "y2mate-alternative", title: "Y2Mate Alternative - Faster Media Downloader", description: "Compare StreamSync as an alternative with a cleaner interface and simpler workflow.", h1: "Y2Mate Alternative", intro: "StreamSync provides a focused downloader flow without extra distractions.", icon: ArrowDownToLine, comparisonPoints: ["Cleaner interface", "Direct format selection", "Shared queue and history"], faqs: [{ question: "Why use this alternative?", answer: "It keeps the existing workflow minimal and focused on the download task." }] },
  { slug: "savefrom-alternative", title: "SaveFrom Alternative - Modern Downloader Workflow", description: "Position StreamSync as a lightweight SaveFrom alternative for supported links.", h1: "SaveFrom Alternative", intro: "Use the same downloader UI while keeping SEO entry points specific.", icon: ListVideo, comparisonPoints: ["Simple input flow", "Focused pages", "Easy platform navigation"], faqs: [{ question: "Is it a replacement?", answer: "It offers a similar purpose with a cleaner, more focused experience." }] },
  { slug: "snaptik-alternative", title: "Snaptik Alternative - TikTok Video Downloader", description: "Show StreamSync as a TikTok-focused alternative with the same downloader flow.", h1: "Snaptik Alternative", intro: "The TikTok page and downloader experience stay the same while improving discoverability.", icon: Music2, comparisonPoints: ["TikTok-specific entry point", "Format list stays intact", "Keeps the same UI"], faqs: [{ question: "Does it work for TikTok?", answer: "Yes, use the TikTok page or the alternative landing page to access the same downloader." }] },
];

export const comparePageSlugs = comparisonPages.map((page) => page.slug);

export function getFeaturePage(slug: FeatureKey) {
  return featurePages.find((page) => page.slug === slug)!;
}

export function getComparisonPage(slug: CompareKey) {
  return comparisonPages.find((page) => page.slug === slug)!;
}
