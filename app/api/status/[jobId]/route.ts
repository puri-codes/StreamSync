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
    
    const response = await fetch(`${backendUrl}/api/status/${jobId}`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true"
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return NextResponse.json(
        { error: `Backend returned error: ${response.status} ${response.statusText}. ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch download status" },
      { status: 500 }
    );
  }
}
