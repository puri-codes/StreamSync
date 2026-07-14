import { Format } from "@/types";

export function formatBytes(bytes?: number): string {
  if (bytes === undefined || bytes === null || isNaN(bytes) || bytes === 0) return "—";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function formatDuration(seconds?: number): string {
  if (seconds === undefined || seconds === null || isNaN(seconds)) return "—";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function parseResolution(f: Format): string {
  if (f.resolution) return f.resolution;
  if (f.note && f.note.toLowerCase().includes("p")) {
    const match = f.note.match(/(\d+p)/i);
    if (match) return match[1];
  }
  return "Audio";
}

export function parseBitrate(note?: string): string {
  if (!note) return "—";
  const match = note.match(/(\d+\s*k)/i);
  if (match) return `${match[1]}bps`;
  if (note.toLowerCase().includes("audio")) return "Audio";
  return note;
}

export interface GroupedFormats {
  videoWithAudio: Format[];
  videoOnly: Format[];
  audioOnly: Format[];
}

export function groupFormats(formats: Format[]): GroupedFormats {
  const result: GroupedFormats = {
    videoWithAudio: [],
    videoOnly: [],
    audioOnly: [],
  };

  if (!formats || !Array.isArray(formats)) return result;

  formats.forEach((f) => {
    const vcodec = f.vcodec?.toLowerCase() || "";
    const acodec = f.acodec?.toLowerCase() || "";

    const hasVideo = vcodec !== "" && vcodec !== "none" && vcodec !== "none_yet";
    const hasAudio = acodec !== "" && acodec !== "none" && acodec !== "none_yet";

    if (hasVideo && hasAudio) {
      result.videoWithAudio.push(f);
    } else if (hasVideo && !hasAudio) {
      result.videoOnly.push(f);
    } else if (!hasVideo && hasAudio) {
      result.audioOnly.push(f);
    } else {
      // Fallback categorization using ext or resolution
      if (f.resolution && f.resolution !== "audio" && !f.resolution.includes("audio")) {
        result.videoOnly.push(f);
      } else {
        result.audioOnly.push(f);
      }
    }
  });

  return result;
}

export function sortFormats(formats: Format[], key: string, ascending: boolean = true): Format[] {
  const sorted = [...formats];
  sorted.sort((a, b) => {
    let valA: any = "";
    let valB: any = "";

    if (key === "resolution") {
      const getResHeight = (fmt: Format) => {
        if (!fmt.resolution) return 0;
        const match = fmt.resolution.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      };
      valA = getResHeight(a);
      valB = getResHeight(b);
    } else if (key === "filesize") {
      valA = a.filesize || a.filesize_approx || 0;
      valB = b.filesize || b.filesize_approx || 0;
    } else if (key === "extension") {
      valA = a.ext || "";
      valB = b.ext || "";
    } else if (key === "codec") {
      valA = `${a.vcodec || ""}-${a.acodec || ""}`;
      valB = `${b.vcodec || ""}-${b.acodec || ""}`;
    }

    if (valA < valB) return ascending ? -1 : 1;
    if (valA > valB) return ascending ? 1 : -1;
    return 0;
  });
  return sorted;
}

export function detectPlatform(url: string): { name: string; icon: string } {
  if (!url) return { name: "Unknown", icon: "video" };
  const lower = url.toLowerCase();
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) {
    return { name: "YouTube", icon: "youtube" };
  }
  if (lower.includes("instagram.com")) {
    return { name: "Instagram", icon: "instagram" };
  }
  if (lower.includes("tiktok.com")) {
    return { name: "TikTok", icon: "music" };
  }
  if (lower.includes("facebook.com") || lower.includes("fb.watch")) {
    return { name: "Facebook", icon: "facebook" };
  }
  if (lower.includes("twitter.com") || lower.includes("x.com")) {
    return { name: "X", icon: "twitter" };
  }
  if (lower.includes("reddit.com")) {
    return { name: "Reddit", icon: "smile" };
  }
  if (lower.includes("vimeo.com")) {
    return { name: "Vimeo", icon: "video" };
  }
  if (lower.includes("soundcloud.com")) {
    return { name: "SoundCloud", icon: "music" };
  }
  if (lower.includes("twitch.tv")) {
    return { name: "Twitch", icon: "twitch" };
  }
  if (lower.includes("dailymotion.com") || lower.includes("dai.ly")) {
    return { name: "Dailymotion", icon: "tv" };
  }
  return { name: "Video", icon: "video" };
}
