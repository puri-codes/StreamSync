"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Download, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Play, 
  Loader2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  History,
  FileVideo,
  FileAudio,
  Trash2
} from "lucide-react";
import { QueueItem, RecentDownload, Format, MediaInfo } from "@/types";
import { getDownloadStatus, startDownload, downloadCompletedFile } from "@/services/downloader";
import { formatBytes, parseResolution } from "@/utils/helpers";
import { useToast } from "./Toast";
import { motion, AnimatePresence } from "motion/react";

interface DownloadManagerContextType {
  queue: QueueItem[];
  recents: RecentDownload[];
  addDownload: (info: MediaInfo, format: Format, url: string, mode: 'video' | 'audio') => Promise<void>;
  cancelDownload: (id: string) => void;
  retryDownload: (id: string) => void;
  clearHistory: () => void;
  removeHistoryItem: (id: string) => void;
}

const DownloadManagerContext = createContext<DownloadManagerContextType | undefined>(undefined);

export function useDownloadManager() {
  const context = useContext(DownloadManagerContext);
  if (!context) {
    throw new Error("useDownloadManager must be used within a DownloadManagerProvider");
  }
  return context;
}

export function DownloadManagerProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [recents, setRecents] = useState<RecentDownload[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("download_history");
      if (savedHistory) {
        setRecents(JSON.parse(savedHistory));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save history to localStorage
  const saveRecents = (updated: RecentDownload[]) => {
    setRecents(updated);
    try {
      localStorage.setItem("download_history", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Central Polling Loop for active queue items
  useEffect(() => {
    const activeItems = queue.filter(item => 
      item.status !== "completed" && 
      item.status !== "failed" && 
      item.job_id
    );

    if (activeItems.length === 0) return;

    // Expand the manager when downloads are active
    setIsOpen(true);

    const interval = setInterval(() => {
      activeItems.forEach(async (item) => {
        if (!item.job_id) return;
        
        try {
          const statusRes = await getDownloadStatus(item.job_id);
          
          // Ensure we don't proceed if it was cancelled mid-flight
          setQueue(currentQueue => {
            const existing = currentQueue.find(q => q.id === item.id);
            if (!existing || existing.status === "failed") return currentQueue; // skip if deleted/failed

            let nextStatus = statusRes.status || "downloading";
            let nextProgress = typeof statusRes.progress === 'number' ? statusRes.progress : existing.progress;
            
            // Map the API response status safely
            if (nextStatus === "completed" || nextProgress >= 100) {
              nextStatus = "completed";
              nextProgress = 100;
              
              // Trigger automatic file download and add to history
              triggerFileDownload(item.id, item.job_id!, item);
            }

            return currentQueue.map(q => 
              q.id === item.id 
                ? { 
                    ...q, 
                    status: nextStatus as any, 
                    progress: nextProgress,
                    speed: statusRes.speed || q.speed,
                    eta: statusRes.eta || q.eta,
                    error: statusRes.error || q.error
                  }
                : q
            );
          });

        } catch (err: any) {
          console.error("Polling error for job", item.job_id, err);
          
          // Network errors or backend timeouts: let's increment retry or mark failed after consecutive misses
          setQueue(currentQueue => 
            currentQueue.map(q => 
              q.id === item.id 
                ? { 
                    ...q, 
                    status: "failed", 
                    error: err.message || "Connection timed out" 
                  }
                : q
            )
          );
          showToast(`Job ${item.title.substring(0, 20)}... failed to connect`, "error");
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [queue]);

  const triggerFileDownload = async (itemId: string, jobId: string, item: QueueItem) => {
    try {
      showToast(`Saving ${item.title.substring(0, 30)}...`, "success");
      const filename = await downloadCompletedFile(jobId);
      
      showToast(`Download finished: ${filename}`, "success");

      // Add to recent history
      const resVal = item.resolution;
      const historyItem: RecentDownload = {
        id: Math.random().toString(36).substring(2, 9),
        url: item.url,
        title: item.title,
        thumbnail: item.thumbnail,
        uploader: item.uploader || "Unknown",
        timestamp: Date.now(),
        format_id: item.format_id,
        ext: item.ext,
        resolution: resVal
      };

      setRecents(currentHistory => {
        // Prevent duplicate titles in history
        const filtered = currentHistory.filter(h => h.title !== item.title);
        const updated = [historyItem, ...filtered].slice(0, 10); // Keep last 10
        localStorage.setItem("download_history", JSON.stringify(updated));
        return updated;
      });

    } catch (err: any) {
      console.error("Error triggering completed save", err);
      showToast(`File saving failed: ${err.message}`, "error");
      
      setQueue(currentQueue => 
        currentQueue.map(q => 
          q.id === itemId 
            ? { ...q, status: "failed", error: `Download complete but file save failed: ${err.message}` }
            : q
        )
      );
    }
  };

  const addDownload = async (info: MediaInfo, format: Format, url: string, mode: 'video' | 'audio') => {
    const id = Math.random().toString(36).substring(2, 9);
    const res = parseResolution(format);

    const newItem: QueueItem = {
      id,
      url,
      title: info.title,
      thumbnail: info.thumbnail,
      format_id: format.format_id,
      ext: format.ext,
      resolution: res,
      status: "pending",
      progress: 0,
      uploader: info.uploader
    };

    setQueue((prev) => [newItem, ...prev]);
    showToast("Starting cloud video encoding...", "info");

    try {
      const response = await startDownload(url, format.format_id, mode);
      
      setQueue((currentQueue) => 
        currentQueue.map(item => 
          item.id === id 
            ? { ...item, job_id: response.job_id, status: "preparing" }
            : item
        )
      );
    } catch (err: any) {
      showToast(`Failed to initiate job: ${err.message}`, "error");
      setQueue((currentQueue) => 
        currentQueue.map(item => 
          item.id === id 
            ? { ...item, status: "failed", error: err.message }
            : item
        )
      );
    }
  };

  const cancelDownload = (id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
    showToast("Download removed from queue", "info");
  };

  const retryDownload = async (id: string) => {
    const item = queue.find(q => q.id === id);
    if (!item) return;

    setQueue(currentQueue => 
      currentQueue.map(q => 
        q.id === id 
          ? { ...q, status: "pending", progress: 0, error: undefined, speed: undefined, eta: undefined }
          : q
      )
    );

    showToast("Retrying video download...", "info");

    try {
      const isAudioOnly = item.resolution === "Audio";
      const response = await startDownload(item.url, item.format_id, isAudioOnly ? 'audio' : 'video');
      
      setQueue(currentQueue => 
        currentQueue.map(q => 
          q.id === id 
            ? { ...q, job_id: response.job_id, status: "preparing" }
            : q
        )
      );
    } catch (err: any) {
      showToast(`Retry failed: ${err.message}`, "error");
      setQueue(currentQueue => 
        currentQueue.map(q => 
          q.id === id 
            ? { ...q, status: "failed", error: err.message }
            : q
        )
      );
    }
  };

  const clearHistory = () => {
    saveRecents([]);
    showToast("Download history cleared", "success");
  };

  const removeHistoryItem = (id: string) => {
    const updated = recents.filter(r => r.id !== id);
    saveRecents(updated);
  };

  return (
    <DownloadManagerContext.Provider value={{
      queue,
      recents,
      addDownload,
      cancelDownload,
      retryDownload,
      clearHistory,
      removeHistoryItem
    }}>
      {children}
      <DownloadQueueWidget isOpen={isOpen} setIsOpen={setIsOpen} />
    </DownloadManagerContext.Provider>
  );
}

function DownloadQueueWidget({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (o: boolean) => void }) {
  const { queue, recents, cancelDownload, retryDownload, clearHistory, removeHistoryItem } = useDownloadManager();
  
  const activeCount = queue.filter(item => item.status !== "completed" && item.status !== "failed").length;

  if (queue.length === 0 && recents.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm w-full select-none" id="download-manager-widget">
      <div className="bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800/80 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-200">
        
        {/* Widget Bar Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-[#111827] dark:bg-gray-100 text-white dark:text-gray-900 flex items-center justify-between font-sans font-semibold text-xs sm:text-sm tracking-tight cursor-pointer"
          id="download-widget-header"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 animate-bounce" />
            <span>Downloads Manager</span>
            {activeCount > 0 && (
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {activeCount} Active
              </span>
            )}
          </div>
          <div>
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>

        {/* Collapsible Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="max-h-[380px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/50 bg-white dark:bg-gray-900"
              id="download-widget-content"
            >
              {/* Active queue list */}
              {queue.length > 0 && (
                <div className="p-3 space-y-2.5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 pl-1">
                    Queue & Active Tasks
                  </h4>
                  {queue.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-2.5 rounded-xl border border-[#E5E7EB] dark:border-gray-800 bg-[#F9FAFB] dark:bg-gray-800/20 space-y-2 relative overflow-hidden"
                      id={`queue-item-${item.id}`}
                    >
                      {/* Top Row: Thumbnail + Info */}
                      <div className="flex gap-2.5 items-start">
                        {item.thumbnail && (
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="w-12 h-8 rounded object-cover bg-gray-100 dark:bg-gray-800 shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate pr-4 leading-tight">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                            <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-700 dark:text-gray-300">
                              {item.resolution}
                            </span>
                            <span>•</span>
                            <span>{item.status}</span>
                          </div>
                        </div>

                        {/* Cancel / Remove Button */}
                        <button
                          onClick={() => cancelDownload(item.id)}
                          className="absolute top-2.5 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded p-0.5 transition-colors cursor-pointer"
                          title="Remove task"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Middle: Progress and Stats */}
                      {item.status === "failed" ? (
                        <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 text-[10px] font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate flex-1">{item.error || "Failed to download"}</span>
                          <button
                            onClick={() => retryDownload(item.id)}
                            className="p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-950 text-red-900 dark:text-red-200 cursor-pointer"
                            title="Retry download"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {/* Progress bar */}
                          <div className="w-full h-1.5 bg-[#F3F4F6] dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-[#111827] dark:bg-gray-100 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>

                          {/* Detail footer stats */}
                          <div className="flex items-center justify-between text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 select-none">
                            <span>{item.progress}%</span>
                            <div className="flex items-center gap-2">
                              {item.speed && <span>{item.speed}</span>}
                              {item.eta && (
                                <span className="flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" />
                                  {item.eta}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* History / Completed List */}
              {recents.length > 0 && (
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between pb-1 select-none">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1">
                      <History className="w-3 h-3" />
                      Recent Downloads
                    </span>
                    <button
                      onClick={clearHistory}
                      className="text-[10px] font-bold text-gray-400 hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {recents.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex gap-2 items-center p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 group/history relative"
                        id={`recent-item-${item.id}`}
                      >
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="w-9 h-6 rounded object-cover bg-gray-100 dark:bg-gray-800 shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-6 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                            {item.resolution === "Audio" ? <FileAudio className="w-3 h-3" /> : <FileVideo className="w-3 h-3" />}
                          </div>
                        )}
                        <div className="flex-1 min-w-0 pr-6">
                          <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate leading-tight">
                            {item.title}
                          </p>
                          <p className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1 uppercase">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            <span>Saved ({item.resolution || item.ext})</span>
                          </p>
                        </div>

                        {/* Individual Delete Button */}
                        <button
                          onClick={() => removeHistoryItem(item.id)}
                          className="absolute right-1.5 opacity-0 group-hover/history:opacity-100 text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded transition-opacity cursor-pointer"
                          title="Delete from history"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
