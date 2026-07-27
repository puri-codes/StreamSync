"use client";

import React, { useRef, useState } from "react";
import { ToastProvider, useToast } from "@/components/Toast";
import { DownloadManagerProvider, useDownloadManager } from "@/components/DownloadManager";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import VideoCard from "@/components/VideoCard";
import FormatTable from "@/components/FormatTable";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorCard from "@/components/ErrorCard";
import { getVideoInfo } from "@/services/downloader";
import { MediaInfo, Format } from "@/types";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { AudioLines, ArrowDownToLine, ExternalLink, Film, GalleryVertical, Image as ImageIcon, ListVideo, Music2, ShieldCheck, Waves, EyeOff } from "lucide-react";
import { faqJsonLd } from "@/lib/seo";
import type { SectionId } from "@/lib/seo-pages";

type LandingPageProps = {
  title: string;
  description: string;
  h1: string;
  directAnswer: string;
  intro: string;
  body: string[];
  iconKey: "music" | "image" | "list" | "gallery" | "film" | "waves" | "arrow" | "audio" | "eye";
  benefitsHeading?: string;
  benefits?: string[];
  comparisonHeading?: string;
  comparisonPoints?: string[];
  steps?: string[];
  formatNotesHeading?: string;
  formatNotes?: { title: string; text: string }[];
  tips: string[];
  troubleshooting: string[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { href: string; label: string }[];
  sectionOrder: SectionId[];
};

const iconMap = {
  music: Music2,
  image: ImageIcon,
  list: ListVideo,
  gallery: GalleryVertical,
  film: Film,
  waves: Waves,
  arrow: ArrowDownToLine,
  audio: AudioLines,
  eye: EyeOff,
} as const;

function LandingPageContent(props: LandingPageProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<MediaInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formatsRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const { addDownload, queue } = useDownloadManager();
  const activeJobFormatId = queue.find((item) => item.status !== "completed" && item.status !== "failed")?.format_id;
  const Icon = iconMap[props.iconKey];

  const handleFetch = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      const data = await getVideoInfo(targetUrl);
      setInfo(data);
      showToast("Media information fetched successfully!", "success");
      setTimeout(() => formatsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
    } catch (err: any) {
      setError(err.message || "Unable to extract media from this URL.");
      showToast("Failed to fetch media details", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInitiate = async (format: Format, mode: "video" | "audio") => {
    if (!info) return;
    await addDownload(info, format, url, mode);
  };

  const renderers: Partial<Record<SectionId, React.ReactNode>> = {
    body: (
      <section key="body" aria-labelledby="guide-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e] mb-3">Guide</p>
        <h2 id="guide-title" className="text-2xl sm:text-3xl font-semibold text-[#0f172a] tracking-tight mb-3">{props.h1}</h2>
        <p className="text-sm sm:text-base text-[#0f172a] font-medium leading-7 mb-4">{props.directAnswer}</p>
        <div className="space-y-4 text-sm sm:text-base text-[#4b5563] leading-7">
          {props.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    ),
    benefits: (
      <section key="benefits" aria-labelledby="benefits-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="benefits-title" className="text-lg font-semibold text-[#0f172a] mb-4">
          {props.comparisonHeading ?? props.benefitsHeading ?? "Benefits"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {(props.comparisonPoints ?? props.benefits ?? []).map((benefit) => (
            <div key={benefit} className="text-sm text-[#5f6b7a]">{benefit}</div>
          ))}
        </div>
      </section>
    ),
    formatNotes: props.formatNotes ? (
      <section key="formatNotes" aria-labelledby="format-notes-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="format-notes-title" className="text-lg font-semibold text-[#0f172a] mb-4">{props.formatNotesHeading}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {props.formatNotes.map((item) => (
            <div key={item.title}>
              <h3 className="text-sm font-semibold text-[#0f172a] mb-1.5">{item.title}</h3>
              <p className="text-sm text-[#5f6b7a] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,
    steps: props.steps ? (
      <section key="steps" aria-labelledby="steps-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="steps-title" className="text-lg font-semibold text-[#0f172a] mb-4">How it works</h2>
        <div className="space-y-3">
          {props.steps.map((step, index) => (
            <div key={step} className="flex gap-3 text-sm text-[#5f6b7a] leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-xs font-semibold shrink-0">{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>
    ) : null,
    tips: (
      <section key="tips" aria-labelledby="tips-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="tips-title" className="text-lg font-semibold text-[#0f172a] mb-4">Tips</h2>
        <ul className="space-y-2.5 text-sm text-[#4b5563] leading-relaxed list-disc pl-5">
          {props.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>
    ),
    troubleshooting: (
      <section key="troubleshooting" aria-labelledby="troubleshooting-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="troubleshooting-title" className="text-lg font-semibold text-[#0f172a] mb-4">Troubleshooting</h2>
        <div className="space-y-3 text-sm text-[#4b5563] leading-7">
          {props.troubleshooting.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </section>
    ),
    faqs: (
      <section key="faqs" aria-labelledby="faq-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 id="faq-title" className="text-lg font-semibold text-[#0f172a] mb-4">FAQs</h2>
        <div className="space-y-4">
          {props.faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="cursor-pointer list-none text-sm font-medium text-[#0f172a]">{faq.question}</summary>
              <p className="mt-2 text-sm text-[#5f6b7a] leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    ),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(props.faqs)) }}
      />
      <Hero title={props.h1} description={props.description} />

      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="flex justify-center">
          <Icon className="w-10 h-10 text-[#0f766e]" aria-hidden="true" />
        </div>

        <SearchBar url={url} setUrl={setUrl} onSubmit={handleFetch} loading={loading} />

        <div className="min-h-[100px] transition-all">
          <AnimatePresence mode="wait">
            {loading && <motion.div key="loading"><LoadingSkeleton /></motion.div>}
            {error && <motion.div key="error"><ErrorCard message={error} onRetry={() => handleFetch(url)} /></motion.div>}
            {info && !loading && !error && (
              <motion.div key="info" className="space-y-6">
                <VideoCard info={info} url={url} />
                <div ref={formatsRef} className="scroll-mt-6">
                  <FormatTable info={info} onDownload={handleDownloadInitiate} activeJobFormatId={activeJobFormatId} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {props.sectionOrder.map((id) => renderers[id])}

        <section className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#0f172a] mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0f766e]" /> Legal &amp; safe use
          </h2>
          <p className="text-sm text-[#4b5563] leading-relaxed">
            Only download media you own or have permission to use — whether that&apos;s allowed depends on your jurisdiction and the rights holder&apos;s terms, not on Pullify. Read our{" "}
            <Link href="/responsible-use" className="text-[#0f766e] underline underline-offset-2">Responsible Use Policy</Link>{" "}
            and{" "}
            <Link href="/copyright-dmca" className="text-[#0f766e] underline underline-offset-2">Copyright &amp; DMCA Policy</Link>{" "}
            before downloading content you don&apos;t own.
          </p>
        </section>

        <section aria-labelledby="links-title" className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
          <h2 id="links-title" className="text-lg font-semibold text-[#0f172a] mb-4">Related pages</h2>
          <div className="flex flex-wrap gap-3">
            {props.relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 rounded-full border border-[#d8ded2] px-4 py-2 text-sm text-[#4b5563] hover:bg-[#f3f5ef]">
                {link.label}
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function LandingPage(props: LandingPageProps) {
  return (
    <ToastProvider>
      <DownloadManagerProvider>
        <LandingPageContent {...props} />
      </DownloadManagerProvider>
    </ToastProvider>
  );
}
