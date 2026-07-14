import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, format_id, mode } = await req.json();
    if (!url || !format_id) {
      return NextResponse.json({ error: "URL and format_id are required" }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_URL || "https://gyrostatic-galvanoplastically-marjorie.ngrok-free.dev";
    
    const response = await fetch(`${backendUrl}/api/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify({ url, format_id, mode: mode || "video" })
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
      { error: err.message || "Failed to initiate download on backend" },
      { status: 500 }
    );
  }
}
