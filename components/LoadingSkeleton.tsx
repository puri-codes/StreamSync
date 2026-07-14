"use client";

import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-8 space-y-8 animate-pulse" id="loading-skeletons">
      {/* Thumbnail + Video Details Skeleton */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-5 flex flex-col md:flex-row gap-6 shadow-sm">
        <div className="w-full md:w-56 h-36 md:h-32 rounded-xl bg-gray-200 dark:bg-gray-800 shrink-0" />
        
        <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
          <div className="space-y-2.5">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md w-1/4" />
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-full" />
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4" />
          </div>
          <div className="flex gap-2 pt-2 border-t border-gray-50 dark:border-gray-800/40">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-24" />
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-24" />
          </div>
        </div>
      </div>

      {/* Formats Table Skeleton */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/40 pb-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-32" />
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-40" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="grid grid-cols-4 sm:grid-cols-6 gap-4 items-center py-3 border-b border-gray-50/50 dark:border-gray-800/20 last:border-0">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md col-span-1" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md col-span-1" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md col-span-1 hidden sm:block" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md col-span-1 hidden sm:block" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-md col-span-1" />
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg col-span-1 justify-self-end w-16 sm:w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
