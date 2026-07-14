"use client";

import React from "react";
import { useTheme } from "./ThemeContext";
import { Download, Sun, Moon, Link } from "lucide-react";
import { motion } from "motion/react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] dark:border-gray-800 bg-white dark:bg-gray-950/90 transition-colors duration-200" id="app-header">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#111827] dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-[#111827] shadow-sm">
            <Download className="w-4.5 h-4.5" />
          </div>
          <span className="text-sm sm:text-base font-semibold tracking-tight text-[#111827] dark:text-gray-100">
            Pullify
          </span>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 shadow-sm transition-all"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
