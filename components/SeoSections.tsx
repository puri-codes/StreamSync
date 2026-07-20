import Link from "next/link";
import type { ReactNode } from "react";

type SeoSectionsProps = {
  eyebrow: string;
  title: string;
  intro: string;
  paragraphs: string[];
  highlights: { title: string; text: string }[];
  links: { href: string; label: string }[];
  note?: ReactNode;
};

export default function SeoSections({ eyebrow, title, intro, paragraphs, highlights, links, note }: SeoSectionsProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 mt-10 space-y-6">
      <div className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e] mb-3">{eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] tracking-tight">{title}</h2>
        <p className="mt-4 text-sm sm:text-base text-[#4b5563] leading-7">{intro}</p>
        <div className="mt-4 space-y-4 text-sm sm:text-base text-[#4b5563] leading-7">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {note ? <div className="mt-5 text-sm text-[#6b7280] leading-6">{note}</div> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="bg-white border border-[#d8ded2] rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-[#0f172a] mb-2">{item.title}</h3>
            <p className="text-sm text-[#5f6b7a] leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-[#0f172a] mb-4">Related pages</h2>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="inline-flex items-center rounded-full border border-[#d8ded2] px-4 py-2 text-sm text-[#4b5563] hover:bg-[#f3f5ef]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
