import Link from "next/link";

type LegalSection = {
  heading: string;
  body: string[];
};

type LegalPageProps = {
  h1: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
  relatedLinks: { href: string; label: string }[];
};

export default function LegalPage({ h1, lastUpdated, intro, sections, relatedLinks }: LegalPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e] mb-3">Pullify · Algora Labs</p>
      <h1 className="text-3xl sm:text-4xl font-semibold text-[#0f172a] tracking-tight mb-2">{h1}</h1>
      <p className="text-xs text-[#5f6b7a] mb-8">Last updated: {lastUpdated}</p>

      <div className="space-y-4 text-sm sm:text-base text-[#4b5563] leading-7 mb-8">
        {intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-[#0f172a] mb-3">{section.heading}</h2>
            <div className="space-y-3 text-sm sm:text-base text-[#4b5563] leading-7">
              {section.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
        <h2 className="text-sm font-semibold text-[#0f172a] mb-4">Related pages</h2>
        <div className="flex flex-wrap gap-3">
          {relatedLinks.map((link) => (
            <Link key={link.href} href={link.href} className="inline-flex items-center rounded-full border border-[#d8ded2] px-4 py-2 text-sm text-[#4b5563] hover:bg-[#f3f5ef]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
