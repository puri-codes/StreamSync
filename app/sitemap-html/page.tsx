import Link from "next/link";
import { featureMetadata, seoPages } from "@/lib/seo";
import { comparisonPages, featurePages } from "@/lib/seo-pages";

export const metadata = featureMetadata(
  "Sitemap | Pullify",
  "Every page on Pullify in one place — platform guides, feature guides, comparisons, and site policies.",
  "sitemap-html"
);

const trustLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support & Help Center" },
  { href: "/responsible-use", label: "Responsible Use Policy" },
  { href: "/copyright-dmca", label: "Copyright & DMCA Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/security-policy", label: "Security Policy" },
];

function LinkGroup({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <section className="bg-white border border-[#d8ded2] rounded-2xl p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-[#0f172a] mb-4">{title}</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm text-[#4b5563] hover:text-[#0f766e] hover:underline underline-offset-2">
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  const corePages = Object.values(seoPages).map((p) => ({ href: p.canonical, label: p.h1 }));
  const feature = featurePages.map((p) => ({ href: `/${p.slug}`, label: p.h1 }));
  const comparisons = comparisonPages.map((p) => ({ href: `/compare/${p.slug}`, label: p.h1 }));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e] mb-3">Pullify</p>
      <h1 className="text-3xl sm:text-4xl font-semibold text-[#0f172a] tracking-tight mb-2">Sitemap</h1>
      <p className="text-sm text-[#5f6b7a] mb-8">Every page on Pullify, grouped by type — every link on this site is reachable from here in one click.</p>

      <div className="space-y-6">
        <LinkGroup title="Downloader & platform guides" links={corePages} />
        <LinkGroup title="Feature guides" links={feature} />
        <LinkGroup title="Comparisons" links={comparisons} />
        <LinkGroup title="About & policies" links={trustLinks} />
      </div>
    </div>
  );
}
