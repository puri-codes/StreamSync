export interface Format {
  format_id: string;
  ext: string;
  resolution?: string;
  filesize?: number;
  filesize_approx?: number;
  vcodec?: string;
  acodec?: string;
  note?: string;
  fps?: number;
  tbr?: number;
  asr?: number;
  container?: string;
}

export interface MediaInfo {
  title: string;
  thumbnail: string;
  duration: number; // in seconds
  uploader: string;
  formats: Format[];
  webpage_url?: string;
}

export type JobStep = 'preparing' | 'downloading' | 'merging' | 'finishing' | 'completed' | 'failed';

export interface DownloadStatus {
  job_id: string;
  status: JobStep | string;
  progress: number; // 0 to 100
  speed?: string;
  eta?: string;
  error?: string;
  current_step?: string;
}

export interface RecentDownload {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  uploader: string;
  timestamp: number;
  format_id: string;
  ext: string;
  resolution?: string;
}

export interface QueueItem {
  id: string;
  job_id?: string;
  url: string;
  title: string;
  thumbnail: string;
  format_id: string;
  ext: string;
  resolution?: string;
  status: 'pending' | 'preparing' | 'downloading' | 'merging' | 'finishing' | 'completed' | 'failed';
  progress: number;
  speed?: string;
  eta?: string;
  error?: string;
  uploader?: string;
}

