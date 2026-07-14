"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Copy, 
  Check, 
  Clock, 
  User, 
  Youtube, 
  Instagram, 
  Music, 
  Facebook, 
  Twitter, 
  Smile, 
  Tv, 
  Twitch, 
  Globe, 
  ExternalLink 
} from "lucide-react";
import { MediaInfo } from "@/types";
import { formatDuration, detectPlatform } from "@/utils/helpers";
import { useToast } from "./Toast";
import { motion } from "motion/react";

interface VideoCardProps {
  info: MediaInfo;
  url: string;
}

export default function VideoCard({ info, url }: VideoCardProps) {
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const { showToast } = useToast();

  const platform = detectPlatform(url);

  const getPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case "youtube": return <Youtube className="w-4 h-4 text-red-600 dark:text-red-500" />;
      case "instagram": return <Instagram className="w-4 h-4 text-pink-600 dark:text-pink-500" />;
      case "music": return <Music className="w-4 h-4 text-teal-600 dark:text-teal-500" />;
      case "facebook": return <Facebook className="w-4 h-4 text-blue-600 dark:text-blue-500" />;
      case "twitter": return <Twitter className="w-4 h-4 text-sky-600 dark:text-sky-500" />;
      case "smile": return <Smile className="w-4 h-4 text-orange-600 dark:text-orange-500" />;
      case "tv": return <Tv className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
      case "twitch": return <Twitch className="w-4 h-4 text-purple-600 dark:text-purple-500" />;
      default: return <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
    }
  };

  const handleCopyTitle = async () => {
    try {
      await navigator.clipboard.writeText(info.title);
      setCopiedTitle(true);
      showToast("Video title copied to clipboard", "success");
      setTimeout(() => setCopiedTitle(false), 2000);
    } catch {
      showToast("Failed to copy text", "error");
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      showToast("Media URL copied to clipboard", "success");
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      showToast("Failed to copy link", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto px-4 mt-8"
      id="video-card-container"
    >
      <div className="bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row gap-6 p-5 transition-colors duration-200">
        
        {/* Left: Thumbnail with fallback */}
        <div className="relative w-full md:w-56 h-36 md:h-32 rounded-xl overflow-hidden bg-[#F9FAFB] dark:bg-gray-800 shrink-0 select-none border border-[#E5E7EB] dark:border-gray-800">
          {info.thumbnail ? (
            <Image
              src={info.thumbnail}
              alt={info.title || "Media Thumbnail"}
              fill
              sizes="(max-width: 768px) 100vw, 224px"
              className="object-cover"
              referrerPolicy="no-referrer"
              priority
              id="video-thumbnail-img"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
              <Globe className="w-10 h-10 stroke-[1.5]" />
            </div>
          )}

          {/* Floating duration badge */}
          {info.duration > 0 && (
            <div className="absolute bottom-2 right-2 bg-black/80 dark:bg-black/90 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm select-none uppercase tracking-wide">
              <Clock className="w-3 h-3" />
              <span>{formatDuration(info.duration)}</span>
            </div>
          )}
        </div>

        {/* Right: Metadata details */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Header tags */}
            <div className="flex flex-wrap items-center gap-2 mb-2 select-none">
              <span className="px-2.5 py-1 bg-[#F3F4F6] dark:bg-gray-800 text-[#374151] dark:text-gray-300 rounded-md text-[10px] font-bold uppercase tracking-wider border border-[#E5E7EB] dark:border-gray-700 flex items-center gap-1">
                {getPlatformIcon(platform.icon)}
                {platform.name}
              </span>
              <span className="px-2.5 py-1 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30 rounded-md text-[10px] font-bold uppercase tracking-wider">
                {info.formats && info.formats.length > 0 ? `${info.formats.length} Quality options` : "Format Info Ready"}
              </span>
            </div>

            {/* Video Title */}
            <h2 className="text-base sm:text-lg font-sans font-semibold tracking-tight text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug mb-1.5" title={info.title}>
              {info.title || "Untitled Media"}
            </h2>

            {/* Uploader / Author */}
            {info.uploader && (
              <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium select-none mb-4">
                <User className="w-3.5 h-3.5 text-gray-400" />
                <span>{info.uploader}</span>
              </p>
            )}
          </div>

          {/* Quick UI Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F3F4F6] dark:border-gray-800/50">
            <button
              onClick={handleCopyTitle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] dark:border-gray-800 bg-[#F3F4F6] hover:bg-[#E5E7EB] dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-semibold text-[#374151] dark:text-gray-300 transition-colors cursor-pointer select-none"
              id="copy-title-btn"
            >
              {copiedTitle ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Title</span>
            </button>

            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] dark:border-gray-800 bg-[#F3F4F6] hover:bg-[#E5E7EB] dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-semibold text-[#374151] dark:text-gray-300 transition-colors cursor-pointer select-none"
              id="copy-url-btn"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Link</span>
            </button>

            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] dark:border-[#E5E7EB] bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 text-xs font-semibold text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-gray-100 transition-colors cursor-pointer select-none ml-auto"
                id="original-url-link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit Site</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
