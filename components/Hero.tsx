"use client";

import React from "react";
import { motion } from "motion/react";

type HeroProps = {
  title: React.ReactNode;
  badge?: string;
  description?: string;
};

export default function Hero({
  title = (
    <>
      Download Videos <br className="hidden sm:inline" /> From Anywhere
    </>
  ),
  badge = "Cloud Downloader",
  description = "Download high quality videos, audio and images from popular platforms.",
}: HeroProps) {
  return (
    <div className="text-center pt-12 pb-6 sm:pt-16 sm:pb-8 max-w-2xl mx-auto px-4" id="app-hero">
      {badge ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#d9f3ef] text-[#0f766e] text-[10px] font-bold uppercase tracking-wider mb-4 border border-[#b8e6dc]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0f766e]"></span>
          {badge}
        </motion.div>
      ) : null}

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-[#0f172a] leading-[1.1] mb-2"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-sm text-[#5f6b7a] font-medium max-w-lg mx-auto leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
}
