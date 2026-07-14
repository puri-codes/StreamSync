"use client";

import React from "react";
import { ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E5E7EB] dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors duration-200 mt-20" id="app-footer">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-between gap-6 sm:flex-row text-center sm:text-left">
        <div>
          <p className="text-xs sm:text-sm text-[#111827] dark:text-gray-400 font-semibold">
            &copy; {new Date().getFullYear()} StreamSync. All rights reserved.
          </p>
          <p className="text-[11px] text-[#6B7280] dark:text-gray-500 mt-1 max-w-md">
            For personal and educational use. All media is fetched directly from social platforms.
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-2 text-xs text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-1.5 justify-center sm:justify-end">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-medium text-gray-600 dark:text-gray-400">100% Secure & Ad-Free</span>
          </div>
          <p className="flex items-center gap-1 justify-center sm:justify-end">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for creators
          </p>
        </div>
      </div>
    </footer>
  );
}
