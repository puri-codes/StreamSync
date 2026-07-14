import { MediaInfo, DownloadStatus } from "@/types";

export async function getVideoInfo(url: string): Promise<MediaInfo> {
  const response = await fetch("/api/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch video info: ${response.statusText}`);
  }

  return response.json();
}

export async function startDownload(
  url: string,
  formatId: string,
  mode: 'video' | 'audio' = 'video'
): Promise<{ job_id: string }> {
  const response = await fetch("/api/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, format_id: formatId, mode }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to start download: ${response.statusText}`);
  }

  return response.json();
}

export async function getDownloadStatus(jobId: string): Promise<DownloadStatus> {
  const response = await fetch(`/api/status/${jobId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to check download status: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Downloads the completed file from the proxy and automatically saves it
 * using the filename provided in Content-Disposition.
 */
export async function downloadCompletedFile(jobId: string): Promise<string> {
  const response = await fetch(`/api/file/${jobId}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to download file: ${response.statusText}`);
  }

  // Parse Content-Disposition to extract the filename
  const contentDisposition = response.headers.get("Content-Disposition");
  let filename = `download-${jobId}`;

  if (contentDisposition) {
    // Check UTF-8 filename format (filename*=UTF-8''...)
    const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;\n]*)/i);
    if (utf8Match && utf8Match[1]) {
      filename = decodeURIComponent(utf8Match[1]);
    } else {
      // Check standard filename format
      const stdMatch = contentDisposition.match(/filename="?([^";\n]*)"?/i);
      if (stdMatch && stdMatch[1]) {
        filename = stdMatch[1];
      }
    }
  }

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = blobUrl;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  setTimeout(() => {
    window.URL.revokeObjectURL(blobUrl);
    link.remove();
  }, 100);

  return filename;
}
