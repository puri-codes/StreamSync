"use client";

import React from "react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <div className="text-center pt-12 pb-6 sm:pt-16 sm:pb-8 max-w-2xl mx-auto px-4" id="app-hero">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F3F4F6] dark:bg-gray-800 text-[#374151] dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider mb-4 border border-[#E5E7EB] dark:border-gray-700"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#111827] dark:bg-white"></span>
        Cloud Downloader
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-[#111827] dark:text-gray-100 leading-[1.1] mb-2"
      >
        Download Videos <br className="hidden sm:inline" /> From Anywhere
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-sm text-[#6B7280] dark:text-gray-400 font-medium max-w-lg mx-auto leading-relaxed"
      >
        Download high quality videos, audio and images from popular platforms.
      </motion.p>
    </div>
  );
}
