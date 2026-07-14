import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/seo";
import { featurePages } from "@/lib/seo-pages";

export function GET() {
  const urls = featurePages
    .map((page) => `<url><loc>${siteUrl}/${page.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`)
    .join("");
  return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml" },
  });
}
