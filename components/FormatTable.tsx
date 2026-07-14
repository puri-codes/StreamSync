"use client";

import React, { useState, useEffect } from "react";
import { 
  Star, 
  Download, 
  ArrowUpDown, 
  Film, 
  Music, 
  FileVideo, 
  Check, 
  Sparkles 
} from "lucide-react";
import { Format, MediaInfo } from "@/types";
import { 
  formatBytes, 
  groupFormats, 
  sortFormats, 
  parseResolution, 
  parseBitrate 
} from "@/utils/helpers";
import { motion, AnimatePresence } from "motion/react";

interface FormatTableProps {
  info: MediaInfo;
  onDownload: (format: Format, mode: 'video' | 'audio') => void;
  activeJobFormatId?: string;
}

type SortKey = "resolution" | "filesize" | "extension" | "codec";

export default function FormatTable({ info, onDownload, activeJobFormatId }: FormatTableProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'videoWithAudio' | 'videoOnly' | 'audioOnly'>('all');
  const [sortBy, setSortBy] = useState<SortKey>("resolution");
  const [sortAsc, setSortAsc] = useState<boolean>(false); // default high resolution first
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("favorite_formats");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [lastSelected, setLastSelected] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("last_selected_quality");
        return saved || "";
      } catch {
        return "";
      }
    }
    return "";
  });

  const toggleFavorite = (f: Format) => {
    const res = parseResolution(f);
    const key = `${res}-${f.ext}`.toLowerCase();
    
    let newFavs: string[];
    if (favorites.includes(key)) {
      newFavs = favorites.filter((item) => item !== key);
    } else {
      newFavs = [...favorites, key];
    }
    
    setFavorites(newFavs);
    try {
      localStorage.setItem("favorite_formats", JSON.stringify(newFavs));
    } catch {
      // Ignore
    }
  };

  const isFavorite = (f: Format) => {
    const res = parseResolution(f);
    const key = `${res}-${f.ext}`.toLowerCase();
    return favorites.includes(key);
  };

  const isLastSelected = (f: Format) => {
    const res = parseResolution(f);
    const key = `${res}-${f.ext}`.toLowerCase();
    return lastSelected === key;
  };

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(key === "extension" || key === "codec"); // default ascending for strings, descending for numbers
    }
  };

  const handleDownloadClick = (f: Format) => {
    const res = parseResolution(f);
    const key = `${res}-${f.ext}`.toLowerCase();
    setLastSelected(key);
    try {
      localStorage.setItem("last_selected_quality", key);
    } catch {
      // Ignore
    }

    // Detect if this is an audio-only format or video format
    const isAudioOnly = !f.vcodec || f.vcodec === "none" || f.vcodec === "none_yet";
    onDownload(f, isAudioOnly ? 'audio' : 'video');
  };

  // Grouping
  const grouped = groupFormats(info.formats);
  
  // Decide what to show based on active tab
  let displayFormats: Format[] = [];
  if (activeTab === "all") {
    displayFormats = [...info.formats];
  } else {
    displayFormats = [...grouped[activeTab]];
  }

  // Sort formats
  const sortedFormats = sortFormats(displayFormats, sortBy, sortAsc);

  // Helper to get sort indicator
  const getSortIndicator = (key: SortKey) => {
    if (sortBy !== key) return <ArrowUpDown className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return (
      <span className="text-[10px] font-bold text-gray-900 dark:text-gray-100 ml-1 bg-gray-100 dark:bg-gray-800 px-1 rounded">
        {sortAsc ? "▲" : "▼"}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto px-4 mt-6 mb-16"
      id="format-table-container"
    >
      <div className="bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800/80 rounded-2xl p-5 shadow-sm transition-colors duration-200">
        
        {/* Header and Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5E7EB] dark:border-gray-800/40 pb-4 mb-4 select-none">
          <h3 className="font-sans font-semibold tracking-tight text-[#111827] dark:text-gray-100 text-sm sm:text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            Available Formats
          </h3>

          <div className="flex bg-[#F9FAFB] dark:bg-gray-800/50 p-0.5 rounded-xl border border-[#E5E7EB] dark:border-gray-800/30 overflow-x-auto self-start sm:self-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "all"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              All ({info.formats.length})
            </button>
            <button
              onClick={() => setActiveTab('videoWithAudio')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === "videoWithAudio"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <FileVideo className="w-3.5 h-3.5 text-indigo-500" />
              Video + Audio ({grouped.videoWithAudio.length})
            </button>
            <button
              onClick={() => setActiveTab('videoOnly')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === "videoOnly"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Film className="w-3.5 h-3.5 text-blue-500" />
              Video Only ({grouped.videoOnly.length})
            </button>
            <button
              onClick={() => setActiveTab('audioOnly')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === "audioOnly"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Music className="w-3.5 h-3.5 text-teal-500" />
              Audio Only ({grouped.audioOnly.length})
            </button>
          </div>
        </div>

        {/* Formats Table */}
        {sortedFormats.length === 0 ? (
          <div className="py-12 text-center select-none" id="formats-empty-state">
            <Film className="w-8 h-8 text-gray-300 dark:text-gray-700 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              No formats available in this category.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-left border-collapse min-w-[640px]" id="formats-list-table">
              <thead>
                <tr className="border-b border-[#E5E7EB] dark:border-gray-800/40 text-[11px] font-bold text-[#6B7280] dark:text-gray-500 tracking-wider uppercase select-none">
                  <th className="pb-3 pl-2 w-8"></th>
                  <th className="pb-3 pr-4 group cursor-pointer" onClick={() => handleSort("resolution")}>
                    <div className="flex items-center">
                      Quality {getSortIndicator("resolution")}
                    </div>
                  </th>
                  <th className="pb-3 pr-4 group cursor-pointer" onClick={() => handleSort("extension")}>
                    <div className="flex items-center">
                      Container {getSortIndicator("extension")}
                    </div>
                  </th>
                  <th className="pb-3 pr-4 group cursor-pointer" onClick={() => handleSort("codec")}>
                    <div className="flex items-center">
                      Codec {getSortIndicator("codec")}
                    </div>
                  </th>
                  <th className="pb-3 pr-4">Audio Status</th>
                  <th className="pb-3 pr-4 group cursor-pointer" onClick={() => handleSort("filesize")}>
                    <div className="flex items-center">
                      Size {getSortIndicator("filesize")}
                    </div>
                  </th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/50 dark:divide-gray-800/10">
                <AnimatePresence initial={false}>
                  {sortedFormats.map((f, index) => {
                    const res = parseResolution(f);
                    const sizeBytes = f.filesize || f.filesize_approx;
                    const isFav = isFavorite(f);
                    const isLast = isLastSelected(f);
                    const isDownloading = activeJobFormatId === f.format_id;
                    
                    const isAudioOnly = !f.vcodec || f.vcodec === "none" || f.vcodec === "none_yet";
                    const hasAudio = f.acodec && f.acodec !== "none" && f.acodec !== "none_yet";
                    const isVideoWithAudio = !isAudioOnly && hasAudio;
                    
                    // Codec string
                    let codecStr = "—";
                    if (f.vcodec && f.vcodec !== "none" && f.acodec && f.acodec !== "none") {
                      codecStr = `${f.vcodec.split(".")[0]} / ${f.acodec.split(".")[0]}`;
                    } else if (f.vcodec && f.vcodec !== "none") {
                      codecStr = f.vcodec.split(".")[0];
                    } else if (f.acodec && f.acodec !== "none") {
                      codecStr = f.acodec.split(".")[0];
                    }

                    return (
                      <motion.tr
                        key={f.format_id + "-" + index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`group/row transition-all text-xs sm:text-sm hover:bg-gray-50/50 dark:hover:bg-gray-800/20 ${
                          isFav ? "bg-amber-50/20 dark:bg-amber-950/5" : ""
                        } ${isLast ? "bg-gray-50/40 dark:bg-gray-800/10" : ""}`}
                        id={`format-row-${f.format_id}`}
                      >
                        {/* Favorite button */}
                        <td className="py-2.5 pl-1.5 pr-2">
                          <button
                            onClick={() => toggleFavorite(f)}
                            className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
                              isFav ? "text-amber-500" : "text-gray-300 dark:text-gray-700 hover:text-gray-400 dark:hover:text-gray-600"
                            }`}
                            title={isFav ? "Remove from favorites" : "Add to favorites"}
                          >
                            <Star className={`w-3.5 h-3.5 ${isFav ? "fill-amber-500" : ""}`} />
                          </button>
                        </td>

                        {/* Quality (e.g. 1080p, 320k) */}
                        <td className="py-2.5 pr-4 font-semibold text-gray-900 dark:text-gray-100">
                          <div className="flex items-center gap-1.5">
                            <span>{res}</span>
                            {isFav && (
                              <span className="inline-flex items-center text-[9px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300 px-1 py-0.5 rounded select-none uppercase">
                                Fav
                              </span>
                            )}
                            {isLast && (
                              <span className="inline-flex items-center text-[9px] font-bold text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-1 py-0.5 rounded select-none">
                                Last
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Container / Ext */}
                        <td className="py-2.5 pr-4 uppercase font-mono font-medium text-gray-500 dark:text-gray-400 text-xs">
                          {f.ext || "mp4"}
                        </td>

                        {/* Codec */}
                        <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400 font-mono text-[11px] truncate max-w-[120px]" title={codecStr}>
                          {codecStr}
                        </td>

                        {/* Audio status / Bitrate */}
                        <td className="py-2.5 pr-4 select-none">
                          {isAudioOnly ? (
                            <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 dark:bg-teal-950/30 dark:text-teal-400 px-2 py-0.5 rounded">
                              {f.note ? parseBitrate(f.note) : "Audio Only"}
                            </span>
                          ) : isVideoWithAudio ? (
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-2 py-0.5 rounded">
                              Included
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-gray-400 bg-gray-50 dark:bg-gray-800 dark:text-gray-500 px-2 py-0.5 rounded">
                              Muted
                            </span>
                          )}
                        </td>

                        {/* File Size */}
                        <td className="py-2.5 pr-4 font-mono text-xs text-gray-600 dark:text-gray-400">
                          {sizeBytes ? (
                            <span>{formatBytes(sizeBytes)}</span>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-600">Dynamic</span>
                          )}
                        </td>

                        {/* Media Category */}
                        <td className="py-2.5 pr-4 select-none">
                          {isAudioOnly ? (
                            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                              <Music className="w-3.5 h-3.5" />
                              Audio
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                              <Film className="w-3.5 h-3.5" />
                              Video
                            </span>
                          )}
                        </td>

                        {/* Action Button */}
                        <td className="py-2.5 text-right pr-1.5 select-none">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDownloadClick(f)}
                            disabled={isDownloading}
                            className={`inline-flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-sm border ${
                              isDownloading
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400"
                                : isFav || isLast
                                  ? "bg-[#111827] hover:bg-[#374151] border-transparent text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-[#111827]"
                                  : "bg-[#F3F4F6] border-[#E5E7EB] hover:bg-[#E5E7EB] text-[#374151] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                            }`}
                            id={`dl-btn-${f.format_id}`}
                          >
                            {isDownloading ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                Active
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                Download
                              </>
                            )}
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
