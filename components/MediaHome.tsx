"use client";

import React, { useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ToastProvider, useToast } from "@/components/Toast";
import { DownloadManagerProvider, useDownloadManager } from "@/components/DownloadManager";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import VideoCard from "@/components/VideoCard";
import FormatTable from "@/components/FormatTable";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorCard from "@/components/ErrorCard";
import { getVideoInfo } from "@/services/downloader";
import { MediaInfo, Format } from "@/types";
import { motion, AnimatePresence } from "motion/react";
import { Facebook, Instagram, Music2, Youtube, Sparkles, ArrowRight, ShieldCheck, Link2 } from "lucide-react";
import Link from "next/link";
import { seoPages, SeoPageKey } from "@/lib/seo";

type SectionId = "overview" | "formatNotes" | "steps" | "tips" | "troubleshooting" | "crossLinks" | "faqs";

type PageConfig = {
  title: React.ReactNode;
  badge: string;
  howTitle: string;
  icon: React.ReactNode;
  seoKey: SeoPageKey;
  overviewHeading: string;
  overview: string[];
  formatNotesHeading: string;
  formatNotes: { title: string; text: string }[];
  stepsHeading: string;
  steps: string[];
  tipsHeading: string;
  tips: string[];
  troubleshootingHeading: string;
  troubleshooting: string[];
  crossLinksHeading: string;
  crossLinks: { href: string; label: string }[];
  sectionOrder: SectionId[];
};

const pageConfigs: Record<string, PageConfig> = {
  "/": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From Anywhere
      </>
    ),
    badge: "Media Downloader",
    howTitle: "What Pullify does",
    icon: <Sparkles className="w-9 h-9 text-[#0f766e]" />,
    seoKey: "home",
    overviewHeading: "What Pullify does",
    overview: [
      "Pullify is a browser-based downloader for public media on YouTube, Instagram, Facebook, and TikTok. Paste a link, and Pullify asks the source platform what video, audio, and image formats exist for that specific upload — it doesn't guess or upscale, it shows the real format list and lets you pick.",
      "Every download runs through a visible queue with live progress, transfer speed, and an ETA, so you can track a file from request to finished download instead of watching a blank tab. Finished downloads also stay in a local history list in your browser so you can find them again without re-pasting the link.",
      "Pullify only works with links the source platform serves publicly. It can't access private accounts, login-gated posts, or paywalled content, and it never asks for your social media credentials — the workflow is entirely link-in, file-out.",
    ],
    formatNotesHeading: "What you can download",
    formatNotes: [
      { title: "Video", text: "The source's native container at whatever resolutions the platform exposes for that upload — commonly anywhere from 360p up to 4K depending on the source. Pullify shows resolution, approximate file size, and codec for each option so you can judge the tradeoff before starting a transfer." },
      { title: "Audio", text: "An audio-only stream when the source provides one, useful for saving a track, podcast, or spoken clip without the video attached. Audio formats are usually smaller and faster to download than the equivalent video." },
      { title: "Thumbnail", text: "The preview image tied to the link, where the source exposes one — handy for content planning, reference frames, or a quick cover image without downloading the full video." },
    ],
    stepsHeading: "How it works",
    steps: [
      "Copy a public link from YouTube, Instagram, Facebook, or TikTok.",
      "Paste it into the search bar above and click Fetch Media.",
      "Review the formats Pullify found for that specific link.",
      "Choose one and download — track progress in the queue widget.",
    ],
    tipsHeading: "Tips for a smoother download",
    tips: [
      "Copy links from the platform's own share button rather than a browser address bar — share links resolve more reliably than embedded-player URLs.",
      "If you're not sure which resolution to pick, check the approximate file size next to each option before committing to a large download on a slow connection.",
      "The download queue keeps working in the background, so you can start a fetch, switch tabs, and come back once it's finished.",
    ],
    troubleshootingHeading: "If something doesn't work",
    troubleshooting: [
      "If a link returns no formats, confirm the post or video is public and still live.",
      "If a download stays queued, give it a few seconds — the backend needs to prepare the file before the transfer starts.",
      "If a file fails to save, retry from the queue widget rather than re-fetching the link from scratch.",
      "If only one or two formats appear, that's what the source platform published for that item — Pullify can't add resolutions that were never encoded.",
    ],
    crossLinksHeading: "Platform guides",
    crossLinks: [
      { href: "/youtube", label: "YouTube Downloader" },
      { href: "/instagram", label: "Instagram Downloader" },
      { href: "/facebook", label: "Facebook Downloader" },
      { href: "/tiktok", label: "TikTok Downloader" },
      { href: "/how-to", label: "How Pullify Works" },
    ],
    sectionOrder: ["overview", "steps", "formatNotes", "tips", "crossLinks", "troubleshooting", "faqs"],
  },
  "/youtube": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From YouTube
      </>
    ),
    badge: "YouTube Downloader",
    howTitle: "How to download from YouTube",
    icon: <Youtube className="w-10 h-10 text-[#ea580c]" />,
    seoKey: "youtube",
    overviewHeading: "Downloading from YouTube",
    overview: [
      "YouTube exposes a different format list for nearly every video, since it depends on the resolution the uploader published in, whether the video has separate video and audio tracks, and regional restrictions. Pullify reads that list directly from YouTube rather than assuming a fixed set of resolutions is always available.",
      "Shorts and standard long-form videos use the same link structure, so both work through the same search bar. For playlists, Pullify still needs the individual video link — open the video you want from the playlist and copy that link rather than the playlist URL itself.",
      "Audio-only extraction, 1080p, and 4K each have their own dedicated guide, since the specifics — bitrate, when 4K is actually available, MP3 conversion notes — are different enough to deserve separate treatment rather than being crammed into this page.",
    ],
    formatNotesHeading: "Format notes for YouTube",
    formatNotes: [
      { title: "Resolution", text: "Ranges from 144p up to 4K depending on what the uploader published; most videos top out at 1080p. Higher resolutions mean larger files, so weigh quality against download time on a slow connection." },
      { title: "Audio-only", text: "Available when YouTube exposes a separate audio stream, which is true for most standard uploads. This is the fastest option when you only need the sound — see the Convert to MP3 guide for codec-specific detail." },
      { title: "Shorts", text: "Use the same link format as regular videos; formats are typically limited to the vertical resolution the Short was recorded in, usually 1080x1920 or lower." },
    ],
    stepsHeading: "How to download from YouTube",
    steps: [
      "Copy the YouTube video link from your browser or the share button.",
      "Paste the link into the search bar and click Fetch Media.",
      "Wait for the format list to load, then choose the quality you want.",
      "Click download and let the queue finish the file for you.",
    ],
    tipsHeading: "Tips for YouTube downloads",
    tips: [
      "Use the share button's link (youtu.be or youtube.com/watch) rather than a URL copied from an embedded video player, which sometimes points at a different endpoint.",
      "If you specifically need 4K, check the Download 4K guide first — not every video is uploaded at that resolution, so it's worth confirming before you start.",
      "For long videos where you only need the audio, extracting audio-only is noticeably faster than downloading the full video track.",
    ],
    troubleshootingHeading: "If a YouTube link fails",
    troubleshooting: [
      "Age-restricted videos that require a signed-in YouTube account can't be fetched.",
      "Region-locked uploads will fail outside the regions YouTube allows.",
      "A playlist URL by itself won't work — copy the specific video's link instead.",
      "Live streams that are still broadcasting may not expose a complete format list until the stream ends.",
    ],
    crossLinksHeading: "Related YouTube guides",
    crossLinks: [
      { href: "/download-shorts", label: "Download YouTube Shorts" },
      { href: "/download-playlist", label: "Download a Playlist" },
      { href: "/download-mp3", label: "Convert to MP3" },
      { href: "/download-4k", label: "Download in 4K" },
      { href: "/download-1080p", label: "Download in 1080p" },
    ],
    sectionOrder: ["overview", "formatNotes", "steps", "tips", "crossLinks", "troubleshooting", "faqs"],
  },
  "/instagram": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From Instagram
      </>
    ),
    badge: "Instagram Downloader",
    howTitle: "How to download from Instagram",
    icon: <Instagram className="w-10 h-10 text-[#db2777]" />,
    seoKey: "instagram",
    overviewHeading: "Downloading from Instagram",
    overview: [
      "Instagram search intent splits across a few distinct content types: Reels, single posts, multi-image carousels, and Stories. Pullify treats the link the same way regardless of type — it asks Instagram what that specific post exposes and shows you the result.",
      "The most important constraint on Instagram is visibility. Public posts and public Reels can be fetched; anything from a private account, or a Story after it expires 24 hours after posting, is no longer served publicly by Instagram and will fail to load no matter how the link is formatted.",
      "For Reels specifically — including saving just the audio track, or notes on Instagram's own watermark behavior — see the dedicated Download Reels guide, which covers that sub-case in more depth than fits here.",
    ],
    formatNotesHeading: "Format notes for Instagram",
    formatNotes: [
      { title: "Reels & videos", text: "Video formats Instagram exposes for that specific post, typically MP4 at the resolution the creator uploaded — usually vertical, up to 1080p." },
      { title: "Carousels", text: "Each frame in a multi-image post is tied to the same post link; availability of every frame depends on how Instagram serves that post, so check the format list rather than assuming every image is included." },
      { title: "Stories", text: "Only fetchable while still live and public — expired (past 24 hours) or private stories return no formats, since Instagram itself no longer serves them." },
    ],
    stepsHeading: "How to download from Instagram",
    steps: [
      "Open the Instagram post or reel you want to save and copy its link.",
      "Paste the link into the search bar and fetch the media details.",
      "Review the available streams and pick the best one for your device.",
      "Download the file and save it to your gallery or computer.",
    ],
    tipsHeading: "Tips for Instagram downloads",
    tips: [
      "Copy the link from the post's own share menu (\"Copy Link\") rather than sharing to another app first, which can shorten or wrap the URL.",
      "For carousels, fetch the post once and check the full format list before assuming only the first image or video is available.",
      "If you regularly save Reel audio, bookmark the Download Reels guide — it covers the audio-only case in more detail than this page.",
    ],
    troubleshootingHeading: "If an Instagram link fails",
    troubleshooting: [
      "Private accounts return no formats — this is an Instagram restriction, not a Pullify error.",
      "An expired Story (past 24 hours) is no longer public and can't be fetched.",
      "Profile links, rather than a specific post or reel link, won't return any media.",
      "Some posts restrict downloads at the platform level for the original poster's account settings, which no downloader can override.",
    ],
    crossLinksHeading: "Related Instagram guides",
    crossLinks: [
      { href: "/download-reels", label: "Download Instagram Reels" },
      { href: "/download-mp3", label: "Save Reel Audio as MP3" },
      { href: "/download-thumbnail", label: "Download a Post Thumbnail" },
    ],
    sectionOrder: ["overview", "troubleshooting", "formatNotes", "steps", "tips", "crossLinks", "faqs"],
  },
  "/facebook": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From Facebook
      </>
    ),
    badge: "Facebook Downloader",
    howTitle: "How to download from Facebook",
    icon: <Facebook className="w-10 h-10 text-[#2563eb]" />,
    seoKey: "facebook",
    overviewHeading: "Downloading from Facebook",
    overview: [
      "Facebook video links generally fall into three categories: public page posts, personal profile posts marked public, and live-stream replays after the broadcast ends. Pullify can fetch any of these as long as Facebook serves the post publicly to a logged-out request.",
      "Group content is the main exception. Groups on Facebook are almost always restricted to members, even when a group is listed as \"public\" in search, and Facebook does not expose that video data to an unauthenticated request — so links from inside groups will typically fail.",
      "Quality is set entirely by how the original page or profile uploaded the video. Some pages consistently publish in HD; others, especially reposts from mobile, are only ever available in a single lower-resolution encode. There's no way to request a higher resolution than Facebook itself generated.",
    ],
    formatNotesHeading: "Format notes for Facebook",
    formatNotes: [
      { title: "Public videos", text: "Standard video formats at whatever resolution the page or profile published — quality varies more on Facebook than on YouTube because so many uploads come from mobile devices." },
      { title: "Live replays", text: "Available once the broadcast ends and the replay is posted to the page's public timeline; replays typically inherit whatever resolution the live stream itself was broadcast in." },
      { title: "Audio-only", text: "Less consistently available than YouTube or Instagram; check the format list after fetching rather than assuming an audio track will be there." },
    ],
    stepsHeading: "How to download from Facebook",
    steps: [
      "Find the Facebook video post and copy its public link.",
      "Paste the URL into the search bar on this page.",
      "Let the downloader inspect the media and show the available formats.",
      "Choose the format you prefer and start the download.",
    ],
    tipsHeading: "Tips for Facebook downloads",
    tips: [
      "Open the video in its own post first (not the feed preview) and copy the link from there for the most reliable fetch.",
      "If a video is from a Page rather than a personal profile, it's more likely to be consistently public and fetchable.",
      "For live replays, wait a few minutes after the broadcast ends — Facebook needs time to process and publish the replay file.",
    ],
    troubleshootingHeading: "If a Facebook link fails",
    troubleshooting: [
      "Links from inside Facebook Groups usually fail, even public-facing groups, because Facebook restricts that content to members.",
      "A friends-only profile post won't return formats — only fully public posts work.",
      "If the video is still live and not yet a replay, wait until the broadcast ends before fetching the link.",
      "Watch Party and cross-posted videos sometimes point at a different underlying video ID — copy the link from the original post if one is available.",
    ],
    crossLinksHeading: "Related guides",
    crossLinks: [
      { href: "/download-mp3", label: "Extract Audio as MP3" },
      { href: "/download-1080p", label: "Download in 1080p" },
      { href: "/how-to", label: "General How-To Guide" },
    ],
    sectionOrder: ["overview", "steps", "formatNotes", "tips", "troubleshooting", "crossLinks", "faqs"],
  },
  "/tiktok": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From TikTok
      </>
    ),
    badge: "TikTok Downloader",
    howTitle: "How to download from TikTok",
    icon: <Music2 className="w-10 h-10 text-[#0f172a]" />,
    seoKey: "tiktok",
    overviewHeading: "Downloading from TikTok",
    overview: [
      "TikTok links are single-purpose — each one points at exactly one video, so the fetch step is simpler than on platforms with playlists or carousels. Paste the link from TikTok's own Share button, not a browser address bar, for the most reliable result.",
      "Whether the saved file shows TikTok's on-screen watermark depends entirely on what TikTok's servers expose for that video, not on anything Pullify does. Pullify does not edit, crop, or process the downloaded file — it saves the format TikTok provides as-is.",
      "TikTok's own audio library is a common reason people use this page — a trending sound can be extracted from any public video that uses it, without needing the original creator's separate upload.",
    ],
    formatNotesHeading: "Format notes for TikTok",
    formatNotes: [
      { title: "Video", text: "Typically up to 1080p depending on the uploader's device and TikTok's own compression for that clip — TikTok re-encodes heavily, so quality can vary noticeably between videos." },
      { title: "Watermark", text: "Determined by TikTok's servers, not by Pullify — see the dedicated no-watermark guide for a breakdown of when a clean source file is and isn't available." },
      { title: "Audio-only", text: "Useful for saving a trending sound separately from the video itself, without needing to find the original audio's own upload." },
    ],
    stepsHeading: "How to download from TikTok",
    steps: [
      "Copy the TikTok video link from the share menu.",
      "Paste it into the search field and click Fetch Media.",
      "Wait for the formats to appear and choose the best quality.",
      "Tap download to save the video locally.",
    ],
    tipsHeading: "Tips for TikTok downloads",
    tips: [
      "Use the Share icon on the video itself and choose \"Copy Link\" — this is more reliable than copying from a browser tab if you're using TikTok's website.",
      "If watermark presence matters to you, check the Download Video Without Watermark guide before assuming every clip behaves the same way.",
      "Saving just the audio is usually faster and produces a much smaller file than the full video, if sound is all you need.",
    ],
    troubleshootingHeading: "If a TikTok link fails",
    troubleshooting: [
      "Private accounts return no formats.",
      "Links copied from a browser tab instead of TikTok's in-app Share button sometimes fail to resolve.",
      "A removed or region-blocked video will return an error rather than a format list.",
      "Extremely recently posted videos can occasionally take a few minutes to become fully available through TikTok's own servers.",
    ],
    crossLinksHeading: "Related guides",
    crossLinks: [
      { href: "/download-video-no-watermark", label: "Download Without Watermark" },
      { href: "/compare/snaptik-alternative", label: "Pullify vs Snaptik" },
      { href: "/download-mp3", label: "Extract TikTok Audio" },
    ],
    sectionOrder: ["overview", "formatNotes", "troubleshooting", "steps", "tips", "crossLinks", "faqs"],
  },
  "/how-to": {
    title: (
      <>
        How To Download <br className="hidden sm:inline" /> Media With Pullify
      </>
    ),
    badge: "How-To Guide",
    howTitle: "How it works",
    icon: <Sparkles className="w-10 h-10 text-[#0f766e]" />,
    seoKey: "how-to",
    overviewHeading: "The Pullify workflow, step by step",
    overview: [
      "Every supported platform uses the same four-step workflow: copy a public link, paste it into Pullify, review the formats it finds, and choose one to download. What differs between platforms is what's actually available in that format list, which is why each platform has its own guide covering source-specific quirks.",
      "Video, audio, and thumbnail are the three kinds of files you can end up with. A video format saves the clip itself; an audio-only format saves just the sound, useful for music, lectures, or podcasts; a thumbnail saves the preview image tied to the link, where the source provides one.",
      "Pullify runs entirely in a standard web browser on desktop or mobile — there's no app to install. Downloads are handled by your browser's normal download mechanism, and Pullify keeps a local history of your recent downloads in that browser so you don't have to re-paste a link you already used.",
    ],
    formatNotesHeading: "Video, audio, or thumbnail?",
    formatNotes: [
      { title: "Video", text: "Pick this when you want the clip itself, at whatever resolution the source exposes — resolution and file size are both shown before you download." },
      { title: "Audio only", text: "Pick this for music, interviews, lectures, or any case where you don't need the picture; it's smaller and faster than the equivalent video." },
      { title: "Thumbnail", text: "Pick this for a quick preview image, cover art, or reference frame, where the source exposes one — see the Download Thumbnail guide." },
    ],
    stepsHeading: "How it works",
    steps: [
      "Copy a supported media link from YouTube, Instagram, Facebook or TikTok.",
      "Paste the link in the search bar and fetch the media information.",
      "Review the available video and audio formats shown below.",
      "Choose the format you want and start the download.",
    ],
    tipsHeading: "General tips",
    tips: [
      "Copy links from each platform's own share button rather than a browser address bar — it's the most reliable way to get a link Pullify can resolve.",
      "Check the format list before downloading rather than assuming a specific resolution will be there; availability always depends on the source, not on Pullify.",
      "If you use Pullify often, the download queue widget keeps a running history in your browser so you don't have to re-fetch a link you've already used.",
    ],
    troubleshootingHeading: "Common issues",
    troubleshooting: [
      "Nothing loads after pasting a link: confirm it's a direct link to a public post or video, not a profile or search page.",
      "Download stuck at 0%: the backend is still preparing the file — wait briefly before retrying.",
      "Fewer formats than expected: this reflects what the source platform published, not a Pullify limitation.",
      "File won't open after downloading: confirm your device supports the format's codec — most modern players handle MP4/MP3 without issue, but older software sometimes doesn't.",
    ],
    crossLinksHeading: "Platform-specific guides",
    crossLinks: [
      { href: "/youtube", label: "YouTube Guide" },
      { href: "/instagram", label: "Instagram Guide" },
      { href: "/facebook", label: "Facebook Guide" },
      { href: "/tiktok", label: "TikTok Guide" },
    ],
    sectionOrder: ["overview", "steps", "tips", "formatNotes", "troubleshooting", "crossLinks", "faqs"],
  },
};

function getPageConfig(pathname: string): PageConfig {
  return pageConfigs[pathname] ?? pageConfigs["/"];
}

function Sections({ config }: { config: PageConfig }) {
  const faqs = seoPages[config.seoKey].faqs;

  const renderers: Partial<Record<SectionId, React.ReactNode>> = {
    overview: (
      <section key="overview" aria-labelledby="overview-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="overview-title" className="text-lg sm:text-xl font-semibold text-[#0f172a] mb-4">{config.overviewHeading}</h2>
        <div className="space-y-4 text-sm sm:text-base text-[#4b5563] leading-7">
          {config.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
    ),
    formatNotes: (
      <section key="formatNotes" aria-labelledby="format-notes-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="format-notes-title" className="text-lg font-semibold text-[#0f172a] mb-4">{config.formatNotesHeading}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {config.formatNotes.map((item) => (
            <div key={item.title}>
              <h3 className="text-sm font-semibold text-[#0f172a] mb-1.5">{item.title}</h3>
              <p className="text-sm text-[#5f6b7a] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    ),
    steps: (
      <section key="steps" aria-labelledby="steps-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="steps-title" className="text-lg font-semibold text-[#0f172a] mb-4">{config.stepsHeading}</h2>
        <div className="space-y-3">
          {config.steps.map((step, index) => (
            <div key={step} className="flex gap-3 text-sm text-[#5f6b7a] leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-xs font-semibold shrink-0">{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>
    ),
    tips: (
      <section key="tips" aria-labelledby="tips-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="tips-title" className="text-lg font-semibold text-[#0f172a] mb-4">{config.tipsHeading}</h2>
        <ul className="space-y-2.5 text-sm text-[#4b5563] leading-relaxed list-disc pl-5">
          {config.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>
    ),
    troubleshooting: (
      <section key="troubleshooting" aria-labelledby="troubleshooting-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="troubleshooting-title" className="text-lg font-semibold text-[#0f172a] mb-4">{config.troubleshootingHeading}</h2>
        <div className="space-y-3 text-sm text-[#4b5563] leading-7">
          {config.troubleshooting.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </section>
    ),
    crossLinks: (
      <section key="crossLinks" aria-labelledby="cross-links-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="cross-links-title" className="text-lg font-semibold text-[#0f172a] mb-4">{config.crossLinksHeading}</h2>
        <div className="flex flex-wrap gap-3">
          {config.crossLinks.map((link) => (
            <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 rounded-full border border-[#d8ded2] px-4 py-2 text-sm text-[#4b5563] hover:bg-[#f3f5ef]">
              {link.label}
              <Link2 className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      </section>
    ),
    faqs: (
      <section key="faqs" aria-labelledby="faq-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="faq-title" className="text-lg font-semibold text-[#0f172a] mb-4">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="cursor-pointer list-none text-sm font-medium text-[#0f172a]">{faq.question}</summary>
              <p className="mt-2 text-sm text-[#5f6b7a] leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    ),
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-12 space-y-6">
      {config.sectionOrder.map((id) => renderers[id])}

      <section className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-[#0f172a] mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#0f766e]" /> Legal & safe use
        </h2>
        <p className="text-sm text-[#4b5563] leading-relaxed">
          Only download media you own or have permission to use — whether that&apos;s allowed depends on your jurisdiction and the rights holder&apos;s terms, not on Pullify. Read our{" "}
          <Link href="/responsible-use" className="text-[#0f766e] underline underline-offset-2">Responsible Use Policy</Link>{" "}
          and{" "}
          <Link href="/copyright-dmca" className="text-[#0f766e] underline underline-offset-2">Copyright &amp; DMCA Policy</Link>{" "}
          before downloading content you don&apos;t own.
        </p>
      </section>
    </div>
  );
}

function MediaHomeContent() {
  const pathname = usePathname();
  const config = useMemo(() => getPageConfig(pathname), [pathname]);
  const directAnswer = seoPages[config.seoKey].directAnswer;
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<MediaInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formatsRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const { addDownload, queue } = useDownloadManager();

  const activeJobFormatId = queue.find((item) => item.status !== "completed" && item.status !== "failed")?.format_id;

  const handleFetch = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;

    setLoading(true);
    setError(null);
    setInfo(null);

    try {
      const data = await getVideoInfo(targetUrl);
      setInfo(data);
      showToast("Media information fetched successfully!", "success");

      setTimeout(() => {
        formatsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    } catch (err: any) {
      console.error("Fetch media metadata error:", err);
      setError(err.message || "Unable to extract media from this URL. Ensure the link is public and valid.");
      showToast("Failed to fetch media details", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInitiate = async (format: Format, mode: "video" | "audio") => {
    if (!info) return;
    await addDownload(info, format, url, mode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent transition-colors duration-200">
      <main className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto pb-12">
        <Hero title={config.title} badge={config.badge} description={seoPages[config.seoKey].description} />

        <SearchBar url={url} setUrl={setUrl} onSubmit={handleFetch} loading={loading} />

        <div className="min-h-[100px] transition-all">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading-skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <LoadingSkeleton />
              </motion.div>
            )}

            {error && (
              <motion.div key="error-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <ErrorCard message={error} onRetry={() => handleFetch(url)} />
              </motion.div>
            )}

            {info && !loading && !error && (
              <motion.div key="media-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <VideoCard info={info} url={url} />
                <div ref={formatsRef} className="scroll-mt-6">
                  <FormatTable info={info} onDownload={handleDownloadInitiate} activeJobFormatId={activeJobFormatId} />
                </div>
              </motion.div>
            )}

            {!loading && !error && !info && (
              <motion.div key="welcome-prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-3xl mx-auto px-4 mt-12 text-center">
                <div className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8 shadow-sm text-left">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center">{config.icon}</div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">{config.howTitle}</p>
                        <h2 className="text-lg sm:text-xl font-semibold text-[#0f172a] tracking-tight">{config.title}</h2>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#0f172a] leading-7 font-medium mb-4">{directAnswer}</p>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#6b7280] select-none mt-6">
                    <span className="flex items-center gap-1">
                      <Youtube className="w-4 h-4 text-[#ea580c]" /> YouTube
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Instagram className="w-4 h-4 text-[#db2777]" /> Instagram
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Music2 className="w-4 h-4 text-[#0f172a]" /> TikTok
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ArrowRight className="w-4 h-4 text-[#2563eb]" /> and Facebook
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Sections config={config} />
      </main>
    </div>
  );
}

export default function MediaHome() {
  return (
    <ToastProvider>
      <DownloadManagerProvider>
        <MediaHomeContent />
      </DownloadManagerProvider>
    </ToastProvider>
  );
}
