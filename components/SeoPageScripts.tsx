import React from "react";
import { breadcrumbJsonLd, howToJsonLd, webpageJsonLd, SeoPageKey, siteUrl, siteName } from "@/lib/seo";

export default function SeoPageScripts({ page }: { page: SeoPageKey }) {
  const scripts = [webpageJsonLd(page), breadcrumbJsonLd(page)];

  if (page !== "home") {
    scripts.push(howToJsonLd(page));
  }

  if (page === "home") {
    scripts.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    } as any);
  }

  return (
    <>
      {scripts.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  );
}
