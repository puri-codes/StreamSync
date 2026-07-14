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
import { Facebook, Instagram, Music2, Youtube, Sparkles, ArrowRight } from "lucide-react";

type PageConfig = {
  title: React.ReactNode;
  description: string;
  howTitle: string;
  icon: React.ReactNode;
  steps: string[];
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
    icon: <Sparkles className="w-9 h-9 text-gray-800" />,
    steps: [],
  },
  "/youtube": {
    title: (
      <>
        Download Videos <br className="hidden sm:inline" /> From YouTube
      </>
    ),
    description: "Paste a YouTube link to fetch formats, audio options and downloadable streams.",
    howTitle: "How to download from YouTube",
    icon: <Youtube className="w-10 h-10 text-red-500" />,
    steps: [
      "Copy the YouTube video link from your browser or the share button.",
      "Paste the link into the search bar and click Fetch Media.",
      "Wait for the format list to load, then choose the quality you want.",
      "Click download and let the queue finish the file for you.",
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
    icon: <Instagram className="w-10 h-10 text-pink-500" />,
    steps: [
      "Open the Instagram post or reel you want to save and copy its link.",
      "Paste the link into the search bar and fetch the media details.",
      "Review the available streams and pick the best one for your device.",
      "Download the file and save it to your gallery or computer.",
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
    icon: <Facebook className="w-10 h-10 text-blue-600" />,
    steps: [
      "Find the Facebook video post and copy its public link.",
      "Paste the URL into the search bar on this page.",
      "Let the downloader inspect the media and show the available formats.",
      "Choose the format you prefer and start the download.",
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
    icon: <Music2 className="w-10 h-10 text-black" />,
    steps: [
      "Copy the TikTok video link from the share menu.",
      "Paste it into the search field and click Fetch Media.",
      "Wait for the formats to appear and choose the best quality.",
      "Tap download to save the video locally.",
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
    icon: <Sparkles className="w-10 h-10 text-gray-800" />,
    steps: [
      "Copy a supported media link from YouTube, Instagram, Facebook or TikTok.",
      "Paste the link in the search bar and fetch the media information.",
      "Review the available video and audio formats shown below.",
      "Choose the format you want and start the download.",
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
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] transition-colors duration-200">
      <main className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto pb-12">
        <Hero title={config.title} badge="" description={config.description} />

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
                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="flex justify-center mb-4">{config.icon}</div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 tracking-tight mb-1.5 select-none">
                    {config.howTitle}
                  </h3>
                  {config.steps.length > 0 ? (
                    <div className="text-left max-w-xl mx-auto space-y-3">
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
                    <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed select-none mb-6">
                      Paste a link from your browser or drag-and-drop a video URL anywhere onto the search box. We&apos;ll automatically identify the video and show all available high-definition streams, audio tracks, and container extensions.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-400 select-none mt-6">
                    <span className="flex items-center gap-1">
                      <Youtube className="w-4 h-4 text-red-500" /> YouTube
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Instagram className="w-4 h-4 text-pink-500" /> Instagram
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Music2 className="w-4 h-4 text-teal-500" /> TikTok
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ArrowRight className="w-4 h-4 text-blue-500" /> and many more
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
