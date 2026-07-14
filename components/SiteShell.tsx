"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { featurePages } from "@/lib/seo-pages";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/youtube", label: "YouTube" },
  { href: "/instagram", label: "Instagram" },
  { href: "/facebook", label: "Facebook" },
  { href: "/tiktok", label: "TikTok" },
  { href: "/how-to", label: "How To" },
];

function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const segments = pathname.split("/").filter(Boolean);
  const pageLabel = segments.length === 0 ? "Home" : navItems.find((item) => item.href.replace("/", "") === segments[0])?.label ?? segments[0];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-[#d8ded2] bg-white/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 text-xs sm:text-sm text-[#5f6b7a] flex items-center gap-1.5 overflow-x-auto">
        <Link href="/" className="hover:text-[#0f172a] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-[#0f172a] font-medium">{pageLabel}</span>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-[#d8ded2] bg-white/90 mt-20" id="app-footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Pullify logo" width={32} height={32} className="w-8 h-8 rounded-lg object-cover shadow-sm" priority />
            <div>
              <p className="text-sm font-semibold tracking-tight text-[#0f172a]">Pullify</p>
              <p className="text-[11px] text-[#5f6b7a]">Fast media downloading for your favorite platforms.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-[#4b5563]">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[#0f172a] transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-[#5f6b7a]">
          {featurePages.slice(0, 5).map((page) => (
            <Link key={page.slug} href={`/${page.slug}`} className="hover:text-[#0f172a] transition-colors">
              {page.h1}
            </Link>
          ))}
          <Link href="/compare/y2mate-alternative" className="hover:text-[#0f172a] transition-colors">
            Y2Mate Alternative
          </Link>
        </div>

        <p className="text-xs text-[#5f6b7a]">
          For personal and educational use. All media is fetched directly from social platforms.
        </p>
      </div>
    </footer>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#0f172a]">
      <header className="sticky top-0 z-40 w-full border-b border-[#d8ded2] bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Pullify logo" width={32} height={32} className="w-8 h-8 rounded-lg object-cover shadow-sm" priority />
            <span className="text-sm sm:text-base font-semibold tracking-tight text-[#0f172a]">Pullify</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-1.5 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg transition-colors ${active ? "bg-[#d9f3ef] text-[#0f766e] font-medium" : "text-[#4b5563] hover:text-[#0f172a] hover:bg-[#f3f5ef]"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <Breadcrumbs />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
