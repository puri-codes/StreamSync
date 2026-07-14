"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, ChevronRight } from "lucide-react";

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
    <nav aria-label="Breadcrumb" className="border-b border-[#E5E7EB] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 overflow-x-auto">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-gray-900 font-medium">{pageLabel}</span>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-[#E5E7EB] bg-white mt-20" id="app-footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#111827] rounded-lg flex items-center justify-center text-white shadow-sm">
              <Download className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-[#111827]">StreamSync</p>
              <p className="text-[11px] text-[#6B7280]">Fast media downloading for your favorite platforms.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-gray-900 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-500">
          For personal and educational use. All media is fetched directly from social platforms.
        </p>
      </div>
    </footer>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-gray-900">
      <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#111827] rounded-lg flex items-center justify-center text-white shadow-sm">
              <Download className="w-4.5 h-4.5" />
            </div>
            <span className="text-sm sm:text-base font-semibold tracking-tight text-[#111827]">StreamSync</span>
          </div>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-1.5 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg transition-colors ${active ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
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
