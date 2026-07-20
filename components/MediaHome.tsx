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
import { Facebook, Instagram, Music2, Youtube, Sparkles, ArrowRight, Video, ShieldCheck, Search, Link2 } from "lucide-react";
import Link from "next/link";

type PageConfig = {
  title: React.ReactNode;
  description: string;
  howTitle: string;
  icon: React.ReactNode;
  steps: string[];
  overview: string[];
};

const pageConfigs: Record<string, PageConfig> = {
  "/": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From Anywhere
      </>
    ),
    description: "Download high quality videos, audio and images from popular platforms.",
    howTitle: "How it works",
    icon: <Sparkles className="w-9 h-9 text-[#0f766e]" />,
    steps: [],
    overview: [
      "Pullify is designed to feel simple the first time you use it and still stay useful after repeated visits. You can paste a supported link, fetch the media, and choose a format without needing to learn a new workflow for every platform. That consistency matters for people who download video or audio often, because it reduces friction and keeps the page easy to scan.",
      "The site also supports practical navigation patterns for search engines and users alike. The platform pages, feature pages, and comparison pages all point back to the same core downloader, which gives the site a clear structure. If you are exploring the service for the first time, the homepage explains the basics, supported platforms, and common use cases in one place.",
    ],
  },
  "/youtube": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From YouTube
      </>
    ),
    description: "Paste a YouTube link to fetch formats, audio options and downloadable streams.",
    howTitle: "How to download from YouTube",
    icon: <Youtube className="w-10 h-10 text-[#ea580c]" />,
    steps: [
      "Copy the YouTube video link from your browser or the share button.",
      "Paste the link into the search bar and click Fetch Media.",
      "Wait for the format list to load, then choose the quality you want.",
      "Click download and let the queue finish the file for you.",
    ],
    overview: [
      "The YouTube page is built for people who want a direct route into the downloader without extra clutter. It explains how the workflow works, what kind of formats may appear, and why the available options depend on the original source. That makes the page useful for both casual visitors and users who care about quality and speed.",
      "Because the page stays visually consistent with the rest of the site, visitors can move from reading to acting almost immediately. The supporting copy gives search engines enough context to understand the page’s purpose while still keeping the actual download process front and center.",
    ],
  },
  "/instagram": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From Instagram
      </>
    ),
    description: "Paste an Instagram post, reel, or story link to view the available media options.",
    howTitle: "How to download from Instagram",
    icon: <Instagram className="w-10 h-10 text-[#db2777]" />,
    steps: [
      "Open the Instagram post or reel you want to save and copy its link.",
      "Paste the link into the search bar and fetch the media details.",
      "Review the available streams and pick the best one for your device.",
      "Download the file and save it to your gallery or computer.",
    ],
    overview: [
      "The Instagram guide is meant to answer practical questions quickly. Users often arrive looking for a way to save a reel, post, or story link, and this page gives them a straightforward explanation of what happens next. Pullify keeps the process familiar: paste the link, fetch the media, and choose a format if one is available.",
      "This page is also written to fit a broader SEO strategy by including useful context around supported content types, the limits of the source media, and the relationship between the Instagram page and the rest of the site. That helps the page serve users while still being discoverable in search.",
    ],
  },
  "/facebook": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From Facebook
      </>
    ),
    description: "Paste a Facebook video link and load the available downloadable versions.",
    howTitle: "How to download from Facebook",
    icon: <Facebook className="w-10 h-10 text-[#2563eb]" />,
    steps: [
      "Find the Facebook video post and copy its public link.",
      "Paste the URL into the search bar on this page.",
      "Let the downloader inspect the media and show the available formats.",
      "Choose the format you prefer and start the download.",
    ],
    overview: [
      "The Facebook page is intentionally practical. It helps visitors understand that the downloader is based on the availability of the original media and that the tool simply exposes the formats that already exist. That keeps the page honest, useful, and aligned with the actual experience inside Pullify.",
      "For SEO, this page adds a distinct platform-specific entry point without changing the product’s core behavior. It gives search engines context about Facebook video downloading, while visitors get a simple explanation of the steps they need to follow to use the site successfully.",
    ],
  },
  "/tiktok": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From TikTok
      </>
    ),
    description: "Paste a TikTok link to fetch the video and available download options.",
    howTitle: "How to download from TikTok",
    icon: <Music2 className="w-10 h-10 text-[#0f172a]" />,
    steps: [
      "Copy the TikTok video link from the share menu.",
      "Paste it into the search field and click Fetch Media.",
      "Wait for the formats to appear and choose the best quality.",
      "Tap download to save the video locally.",
    ],
    overview: [
      "TikTok visitors usually want a fast answer, and this page gives them a direct path to the downloader with clear instructions. The page explains what to do with the share link, how the format list works, and how to finish the download once the available options appear. That keeps the experience consistent and easy to trust.",
      "The wording is intentionally natural rather than promotional, because that tends to read better for users and search engines. It frames the page as a simple utility with a specific purpose, which is exactly what the route needs to communicate.",
    ],
  },
  "/how-to": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From Anywhere
      </>
    ),
    description: "Use the search box to inspect supported links and download the formats you need.",
    howTitle: "How it works",
    icon: <Sparkles className="w-10 h-10 text-[#0f766e]" />,
    steps: [
      "Copy a supported media link from YouTube, Instagram, Facebook or TikTok.",
      "Paste the link in the search bar and fetch the media information.",
      "Review the available video and audio formats shown below.",
      "Choose the format you want and start the download.",
    ],
    overview: [
      "The how-to page acts as a general guide for users who want a simple explanation of how Pullify works. It introduces the process in plain language, then points visitors toward supported platform pages if they want a more specific walkthrough. That makes it helpful as a catch-all reference without duplicating the product pages.",
      "It also plays an important SEO role by connecting the main homepage to the platform pages in a way that feels natural. Search engines can see that the site has a clear set of support pages, and users can understand how to move from one page to the next without having to guess where to go.",
    ],
  },
};

function getPageConfig(pathname: string): PageConfig {
  return pageConfigs[pathname] ?? pageConfigs["/"];
}

function MediaHomeContent() {
  const pathname = usePathname();
  const config = useMemo(() => getPageConfig(pathname), [pathname]);
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
        <Hero />

        <SearchBar url={url} setUrl={setUrl} onSubmit={handleFetch} loading={loading} />

        {pathname === "/" ? (
          <section className="w-full max-w-5xl mx-auto px-4 mt-10 space-y-6">
            <div className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e] mb-3">Media downloader</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] tracking-tight">Download Videos From Anywhere</h2>
              <p className="mt-4 text-sm sm:text-base text-[#4b5563] leading-7">
                Download high quality videos, audio and images from popular platforms with Pullify, a fast and simple media downloader.
              </p>
              <div className="mt-4 space-y-4 text-sm sm:text-base text-[#4b5563] leading-7">
                <p>
                  Pullify gives search engines a real, server-rendered explanation of what the site does before the interactive downloader loads.
                  That makes the homepage easier to understand for crawlers and clearer for people arriving from search.
                </p>
                <p>
                  Use this page to jump into platform-specific guides, compare formats, or learn how the downloader works without having to depend
                  on client-side interaction alone.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "Fast workflow", text: "Paste a link, fetch the media, and choose a format with minimal friction." },
                { title: "Platform hubs", text: "Dedicated pages for YouTube, Instagram, Facebook, and TikTok keep the structure clear." },
                { title: "Search-friendly", text: "The page includes crawlable copy, internal links, and structured data." },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-[#d8ded2] rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-[#0f172a] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#5f6b7a] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-[#0f172a] mb-4">Related pages</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  ["YouTube Downloader", "/youtube"],
                  ["Instagram Downloader", "/instagram"],
                  ["Facebook Downloader", "/facebook"],
                  ["TikTok Downloader", "/tiktok"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="inline-flex items-center rounded-full border border-[#d8ded2] px-4 py-2 text-sm text-[#4b5563] hover:bg-[#f3f5ef]">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

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
                        <h3 className="text-lg sm:text-xl font-semibold text-[#0f172a] tracking-tight">{config.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm text-[#4b5563] leading-7 max-w-3xl">
                    {config.overview.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {config.steps.length > 0 ? (
                    <div className="text-left max-w-xl mx-auto space-y-3 mt-6">
                      {config.steps.map((step, index) => (
                        <div key={step} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                          <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                            {index + 1}
                          </span>
                          <p>{step}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-[#5f6b7a] max-w-md mx-auto leading-relaxed select-none mb-6 mt-6">
                      Paste a link from your browser or drag-and-drop a video URL anywhere onto the search box. We&apos;ll automatically identify the video and show all available high-definition streams, audio tracks, and container extensions.
                    </p>
                  )}

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
                      <ArrowRight className="w-4 h-4 text-[#2563eb]" /> and many more
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full max-w-5xl mx-auto px-4 mt-12 space-y-6">
          <section className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[#0f172a] mb-4">Supported Platforms</h2>
            <div className="flex flex-wrap gap-3">
              {[
                ["YouTube", "/youtube"],
                ["Instagram", "/instagram"],
                ["Facebook", "/facebook"],
                ["TikTok", "/tiktok"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="inline-flex items-center gap-2 rounded-full border border-[#d8ded2] px-4 py-2 text-sm text-[#4b5563] hover:bg-[#f3f5ef]">
                  {label}
                  <Link2 className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: <Video className="w-5 h-5 text-[#0f172a]" />, title: "Fast downloads", text: "Use the same downloader flow with minimal steps." },
              { icon: <Search className="w-5 h-5 text-[#0f172a]" />, title: "Simple search", text: "Paste a link, fetch media details, and choose a format." },
              { icon: <ShieldCheck className="w-5 h-5 text-[#0f172a]" />, title: "Safe workflow", text: "Preserve a clean interface with clear download states." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-[#d8ded2] rounded-2xl p-6">
                <div className="mb-3">{item.icon}</div>
                <h3 className="text-sm font-semibold text-[#0f172a] mb-2">{item.title}</h3>
                <p className="text-sm text-[#5f6b7a] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </section>

          <section className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-[#0f172a] mb-4">FAQs</h2>
            <div className="space-y-4">
              {[
                ["What platforms are supported?", "You can use the downloader with YouTube, Instagram, Facebook, TikTok and the guides on this site."],
                ["Do I need to change pages to download?", "No. The page layout stays consistent; the platform pages are mostly SEO entry points and guides."],
                ["Can I use the same workflow everywhere?", "Yes, every page uses the same downloader form and queue behavior."],
              ].map(([q, a]) => (
                <details key={q} className="group">
                  <summary className="cursor-pointer list-none text-sm font-medium text-[#0f172a]">{q}</summary>
                  <p className="mt-2 text-sm text-[#5f6b7a] leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
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
