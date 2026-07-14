"use client";

import React from "react";
import { AlertCircle, RotateCcw, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface ErrorCardProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorCard({ message, onRetry }: ErrorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl mx-auto px-4 mt-8"
      id="error-card"
    >
      <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-6 text-center shadow-sm flex flex-col items-center justify-center transition-colors">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6 stroke-[2]" />
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight mb-2">
          Unable to Fetch Media Information
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md leading-relaxed mb-6">
          {message || "The server could not extract media info from this link. Please check if the URL is valid, public, and supported by the downloader."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {onRetry && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onRetry}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer shadow-sm transition-all"
              id="error-retry-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try Again
            </motion.button>
          )}

          <a
            href="https://github.com/yt-dlp/yt-dlp#supported-sites"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer shadow-sm transition-all bg-white dark:bg-gray-900/20"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Check Supported Sites
          </a>
        </div>
      </div>
    </motion.div>
  );
}
