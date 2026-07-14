import { NextResponse } from "next/server";
import { siteUrl, seoPages } from "@/lib/seo";

export function GET() {
  const urls = Object.values(seoPages)
    .map((page) => `<url><loc>${siteUrl}${page.canonical}</loc><changefreq>weekly</changefreq><priority>${page.canonical === "/" ? "1.0" : "0.8"}</priority></url>`)
    .join("");

  return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml" },
  });
}
