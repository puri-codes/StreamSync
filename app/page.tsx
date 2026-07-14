"use client";

import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "@/components/ThemeContext";
import { ToastProvider, useToast } from "@/components/Toast";
import { DownloadManagerProvider, useDownloadManager } from "@/components/DownloadManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import VideoCard from "@/components/VideoCard";
import FormatTable from "@/components/FormatTable";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorCard from "@/components/ErrorCard";
import { getVideoInfo } from "@/services/downloader";
import { MediaInfo, Format } from "@/types";
import { HelpCircle, Sparkles, Youtube, Instagram, Music, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Page() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DownloadManagerProvider>
          <PageContent />
        </DownloadManagerProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

function PageContent() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<MediaInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formatsRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const { addDownload, queue } = useDownloadManager();

  // Find the currently active download format ID if any
  const activeJobFormatId = queue.find(
    (item) => item.status !== "completed" && item.status !== "failed"
  )?.format_id;

  const handleFetch = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;

    setLoading(true);
    setError(null);
    setInfo(null);

    try {
      const data = await getVideoInfo(targetUrl);
      setInfo(data);
      showToast("Media information fetched successfully!", "success");

      // Smooth scroll to formats table after visual transition completes
      setTimeout(() => {
        formatsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    } catch (err: any) {
      console.error("Fetch media metadata error:", err);
      setError(
        err.message ||
          "Unable to extract media from this URL. Ensure the link is public and valid."
      );
      showToast("Failed to fetch media details", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInitiate = async (format: Format, mode: 'video' | 'audio') => {
    if (!info) return;
    await addDownload(info, format, url, mode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-gray-950 transition-colors duration-200">
      <Header />

      <main className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto pb-12">
        <Hero />

        <SearchBar
          url={url}
          setUrl={setUrl}
          onSubmit={handleFetch}
          loading={loading}
        />

        {/* Dynamic Display Board */}
        <div className="min-h-[100px] transition-all">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingSkeleton />
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ErrorCard message={error} onRetry={() => handleFetch(url)} />
              </motion.div>
            )}

            {info && !loading && !error && (
              <motion.div
                key="media-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <VideoCard info={info} url={url} />
                
                {/* Scroll Target */}
                <div ref={formatsRef} className="scroll-mt-6">
                  <FormatTable
                    info={info}
                    onDownload={handleDownloadInitiate}
                    activeJobFormatId={activeJobFormatId}
                  />
                </div>
              </motion.div>
            )}

            {!loading && !error && !info && (
              <motion.div
                key="welcome-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-3xl mx-auto px-4 mt-12 text-center"
              >
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <HelpCircle className="w-8 h-8 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 tracking-tight mb-1.5 select-none">
                    How it works
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed select-none mb-6">
                    Paste a link from your browser or drag-and-drop a video URL anywhere onto the search box. We&apos;ll automatically identify the video and show all available high-definition streams, audio tracks, and container extensions.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-400 select-none">
                    <span className="flex items-center gap-1">
                      <Youtube className="w-4 h-4 text-red-500" /> YouTube
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Instagram className="w-4 h-4 text-pink-500" /> Instagram
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Music className="w-4 h-4 text-teal-500" /> TikTok
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

      <Footer />
    </div>
  );
}
