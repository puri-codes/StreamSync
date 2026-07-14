import React from "react";
import { breadcrumbJsonLd, howToJsonLd, webpageJsonLd, SeoPageKey } from "@/lib/seo";

export default function SeoPageScripts({ page }: { page: SeoPageKey }) {
  const scripts = [webpageJsonLd(page), breadcrumbJsonLd(page)];

  if (page !== "home") {
    scripts.push(howToJsonLd(page));
  }

  return (
    <>
      {scripts.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  );
}
