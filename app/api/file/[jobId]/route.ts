import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    if (!jobId) {
      return NextResponse.json({ error: "jobId is required" }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_URL || "https://gyrostatic-galvanoplastically-marjorie.ngrok-free.dev";
    
    const response = await fetch(`${backendUrl}/api/file/${jobId}`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return NextResponse.json(
        { error: `Backend returned error: ${response.status} ${response.statusText}. ${errorText}` },
        { status: response.status }
      );
    }

    // Prepare headers for proxying
    const headers = new Headers();
    const contentDisposition = response.headers.get("Content-Disposition");
    const contentType = response.headers.get("Content-Type");
    const contentLength = response.headers.get("Content-Length");

    if (contentDisposition) {
      headers.set("Content-Disposition", contentDisposition);
    } else {
      // Fallback disposition if backend didn't supply one
      headers.set("Content-Disposition", `attachment; filename="downloaded-media-${jobId}"`);
    }
    
    if (contentType) {
      headers.set("Content-Type", contentType);
    } else {
      headers.set("Content-Type", "application/octet-stream");
    }

    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    headers.set("Cache-Control", "no-store");

    // Return the response body stream directly
    return new NextResponse(response.body, {
      status: 200,
      headers
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to download file from backend" },
      { status: 500 }
    );
  }
}
