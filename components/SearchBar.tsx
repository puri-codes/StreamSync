"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link2, Clipboard, X, ArrowRight, FileDown } from "lucide-react";
import { useToast } from "./Toast";
import { motion } from "motion/react";

interface SearchBarProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function SearchBar({ url, setUrl, onSubmit, loading }: SearchBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  // Auto-focus the input on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const text = e.dataTransfer.getData("text");
    if (text && text.trim().startsWith("http")) {
      setUrl(text.trim());
      showToast("URL dropped successfully", "success");
      onSubmit(text.trim());
    } else {
      showToast("Please drop a valid HTTP link", "error");
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim().startsWith("http")) {
        setUrl(text.trim());
        showToast("Link pasted from clipboard", "success");
        if (inputRef.current) {
          inputRef.current.focus();
        }
      } else if (text) {
        setUrl(text.trim());
        showToast("Text pasted, but it doesn't look like a link", "info");
      } else {
        showToast("Clipboard is empty", "info");
      }
    } catch (err) {
      // Fallback if browser blocks automatic clipboard reads
      showToast("Use Ctrl+V or Cmd+V to paste the link", "info");
    }
  };

  const handleClear = () => {
    setUrl("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      showToast("Please enter a video URL first", "error");
      return;
    }
    onSubmit(url.trim());
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4" id="search-container">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-2xl border transition-all duration-200 p-1 bg-white dark:bg-gray-900 shadow-sm ${
          isDragging
            ? "border-[#111827] dark:border-gray-100 ring-4 ring-gray-100 dark:ring-gray-800 bg-gray-50/50 dark:bg-gray-900/50"
            : "border-[#E5E7EB] dark:border-gray-800/80 hover:border-gray-300 dark:hover:border-gray-700"
        }`}
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-1">
          <div className="flex-1 flex items-center gap-2 pl-3 min-w-0">
            <Link2 className="w-5 h-5 text-[#9CA3AF] dark:text-gray-500 shrink-0" />
            <input
              ref={inputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste video, audio or image URL here..."
              className="w-full py-3 text-sm sm:text-base font-medium bg-transparent border-0 outline-none focus:ring-0 text-[#111827] dark:text-gray-100 placeholder-[#9CA3AF] dark:placeholder-gray-500"
              disabled={loading}
              autoComplete="off"
              id="search-input"
            />
            {url && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors mr-1 shrink-0"
                aria-label="Clear input"
                id="search-clear-btn"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0 pr-1">
            <button
              type="button"
              onClick={handlePaste}
              className="hidden sm:flex items-center gap-1 px-3 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-gray-800 hover:bg-[#F3F4F6] dark:hover:bg-gray-800 text-xs font-semibold text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-gray-200 transition-all cursor-pointer shadow-sm bg-white dark:bg-gray-900"
              title="Paste from clipboard"
              id="search-paste-btn"
            >
              <Clipboard className="w-3.5 h-3.5" />
              Paste
            </button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#111827] dark:bg-gray-100 text-white dark:text-[#111827] text-xs sm:text-sm font-semibold hover:bg-[#374151] dark:hover:bg-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-all shadow-sm cursor-pointer shrink-0"
              id="search-submit-btn"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin mr-0.5" />
                  Fetching
                </>
              ) : (
                <>
                  <span>Fetch Media</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </form>

        {isDragging && (
          <div className="absolute inset-0 rounded-2xl bg-gray-900/5 dark:bg-white/5 border-2 border-dashed border-gray-400 dark:border-gray-600 flex items-center justify-center gap-2 pointer-events-none">
            <FileDown className="w-5 h-5 text-gray-600 dark:text-gray-300 animate-bounce" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Drop URL to fetch automatically</span>
          </div>
        )}
      </div>
    </div>
  );
}
