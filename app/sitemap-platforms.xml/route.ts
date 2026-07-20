import { NextResponse } from "next/server";
import { joinSiteUrl, seoPages } from "@/lib/seo";

export function GET() {
  const urls = Object.values(seoPages)
    .filter((page) => page.canonical === "/" || ["youtube", "instagram", "facebook", "tiktok", "how-to"].some((slug) => page.canonical.includes(slug)))
    .map((page) => `<url><loc>${joinSiteUrl(page.canonical)}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`)
    .join("");

  return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml" },
  });
}
