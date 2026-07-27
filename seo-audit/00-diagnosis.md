# Phase 0 — Root Cause Diagnosis

Date: 2026-07-27
Scope: code-based diagnosis only. **Google Search Console Page Indexing export was not
available for this pass.** The GSC-dependent classification (Crawled/Discovered/Duplicate/
Excluded-by-noindex/Blocked/Soft-404/Manual-action counts per URL) is not yet done —
see "Open item" at the bottom. Everything below is what the code itself proves or strongly
implies, which is enough to start fixing root causes without waiting on GSC.

## 1. What GSC-blocking mechanisms were checked

- **Meta robots / `robots` field**: `lib/seo.ts` `buildMetadata()` and `featureMetadata()` /
  `comparisonMetadata()` hardcode `robots: { index: true, follow: true, ... }` on every page
  that uses them. No page opts out. Grepped the whole repo for `noindex`, `nofollow`,
  `X-Robots-Tag` — zero matches. **No accidental noindex anywhere.**
- **`middleware.ts`**: sets CSP/security headers only, matcher explicitly excludes
  `_next/static`, `_next/image`, `favicon.ico`, `manifest.webmanifest`, `robots.txt`,
  `sitemap*.xml`. It does not set `X-Robots-Tag` and does not block anything indexable.
- **`app/robots.ts`**: `allow: "/"`, `disallow: "/api/"` only. Correct — API routes should not
  be crawled, nothing indexable is blocked.
- **Canonicals**: every page that goes through `buildMetadata`/`featureMetadata`/
  `comparisonMetadata` gets `alternates.canonical` set to its own path (self-referencing).
  No page canonicalizes to the homepage or to another page. **No canonical misconfiguration
  found.**

Conclusion: the technical/directive layer (robots meta, robots.txt, canonical, middleware) is
clean. The blocker is not a "the page is invisible to Google" problem — it's a content-quality
and trust problem. That points at **Crawled – currently not indexed** and **Discovered –
currently not indexed** as the most likely GSC categories once the real export is checked,
not "Blocked by robots.txt" or "Excluded by noindex tag."

## 2. Confirmed content defects (root cause candidates, with evidence)

### 2a. Verbatim duplicate paragraphs across 12 of 18 pages — highest-impact finding

`components/LandingPage.tsx` (shared by all 9 feature pages + all 3 comparison pages) hardcodes
two paragraphs directly in the JSX, identical on every page that renders it:

> "This page answers the main search intent for the route and adds enough unique copy for
> Google to understand why the page exists."
> "It also points users toward related platform guides so they can move between topics
> without losing context."
> "Use the form above to fetch a public link, then review the available formats or media
> options that appear below."
> "The lower sections are intentionally more descriptive than the hero, because that is
> where the page's SEO value should live."

— and a full "Troubleshooting" section (3 sentences) that is *also* identical, verbatim, on
all 12 pages (`LandingPage.tsx` lines ~131-166).

This is textbook duplicate content at exact-string level across 12 URLs. It is very likely
the single largest contributor to "Crawled – currently not indexed" / "Duplicate without
user-selected canonical" signals, independent of anything else on the page.

Additionally, the same component renders the **same `relatedLinks` array twice** in two
different sections ("More guides" and "Related pages") — redundant, not duplicate-across-
pages, but dilutes the page and wastes internal-link real estate that should point
elsewhere.

### 2b. Content is written *about* its own SEO purpose, not for the reader

Across `lib/seo-pages.ts` (all 9 feature pages, all 3 comparison pages) and
`components/MediaHome.tsx` (`pageConfigs`, all 6 core pages), the unique body copy
consistently narrates the page's SEO strategy to the reader instead of answering their
question:

> "For SEO, this page adds a distinct platform-specific entry point..."
> "This page also plays an important SEO role by connecting the main homepage to the
> platform pages..."
> "This page is also designed for users who want a clean, repeatable workflow."
> "That makes the page useful for both casual visitors and users who care about quality
> and speed."

This pattern appears on effectively every page in the site. It reads as generated-for-search
copy (talking about the page rather than the topic), which is exactly what Google's helpful-
content systems are tuned to suppress, and it fails Phase 4a's content-quality bar (filler,
no verifiable specifics, marketing tone over factual density). This is the second major root
cause, and it's the reason a straight word-count top-up will not fix indexing on its own —
the content needs to be rewritten in substance, not padded.

### 2c. Thin content / short of any reasonable word-count bar

Rough per-page unique-copy word counts as currently written:
- Core pages (`/`, `/youtube`, `/instagram`, `/facebook`, `/tiktok`, `/how-to`): ~400-600
  words combined across `SeoSections` + `MediaHome` `pageConfigs.overview`, and `/tiktok`
  and `/how-to` specifically are far thinner (~80 words of body copy) than `/instagram` and
  `/facebook` (~180-220 words) — inconsistent depth across sibling pages compounds the
  cannibalization risk between them (Phase 4).
- Feature/comparison pages (all 12 via `LandingPage.tsx` + `lib/seo-pages.ts`): ~400-450
  words including the duplicated boilerplate from 2a.

All 18 indexable pages are well under the 1,000-1,500 word Definition-of-Done bar (Phase 0.5).

### 2d. FAQ / structured data gaps

- `lib/seo-pages.ts` gives every feature and comparison page exactly **one** FAQ entry.
  `FAQPage` JSON-LD (`faqJsonLd`) is wired up in `LandingPage.tsx` but with only one Q&A it
  carries little AEO value (Phase 19 wants real, multi-question FAQs mined from actual
  search/support intent).
- No `SoftwareApplication` schema anywhere, despite this being a tool-type site (Phase 9
  gap).
- No `Organization` schema site-wide (only page-level `WebPage`/`BreadcrumbList`/`HowTo`,
  plus `WebSite`+`SearchAction` on the homepage only, via `SeoPageScripts.tsx`).
- `sitemap-blog.xml` (`app/sitemap-blog.xml/route.ts`) returns an empty `<urlset>` — there is
  no blog/tutorial content in the repo at all. Confirms a real topical gap (Phase 20) rather
  than a broken route.
- `app/sitemap.ts`, `sitemap-pages.xml`, `sitemap-features.xml`, and `sitemap-platforms.xml`
  overlap heavily (the main `sitemap.ts` already includes every URL the three split sitemaps
  also list). Not harmful to indexing by itself, but it's redundant surface area to keep in
  sync and worth consolidating once new URLs (legal pages, blog) exist — see Phase 15.

### 2e. Structural reality for this niche (per Phase 0 instructions)

Pullify is a media downloader for YouTube/Instagram/Facebook/TikTok — a category Google
applies elevated scrutiny to regardless of on-page quality, because of copyright/ToS risk.
Right now the site has **zero** trust/legal surface: no About, Contact, Privacy Policy, Terms,
DMCA/Copyright policy, Responsible Use policy, or Support page exist anywhere in `app/`.
The footer (`components/SiteShell.tsx`) only links to the nav items and feature pages —
nothing establishing who operates the site, how to report infringing content, or what the
tool is/isn't for. For this niche specifically, this absence is plausibly as large a factor in
weak indexing/trust as the thin-content issues above, per Phase 0's explicit guidance that
E-E-A-T and a visible Responsible Use/DMCA policy matter more here than for a typical
SaaS site. This is Phase 12's job and is treated as high-priority, not boilerplate.

## 3. Root cause summary (ranked)

1. **Duplicate verbatim boilerplate** in `LandingPage.tsx` across 12 pages — fix first, it's a
   single-file change with the highest leverage.
2. **Content written about SEO instead of for users** — systemic, requires full rewrite per
   page (Phase 5), can't be patched.
3. **Word count / depth far below bar**, inconsistent across sibling pages — same fix as #2.
4. **No trust/legal pages** — separate, additive work (Phase 12), high priority for this niche.
5. **Sparse FAQs + missing SoftwareApplication/Organization schema** — fixed alongside the
   Phase 5 rewrite and a schema pass (Phase 9).
6. **No blog/guide content** — real topical gap, addressed opportunistically in Phase 20 after
   the core/feature/comparison rewrites, not before.

None of these are robots/canonical/noindex problems — so no "quick technical fix" exists.
The work is genuinely the content rewrite + trust-page build described in Phases 5-12.

## Open item

GSC Page Indexing export has not been reviewed. Once available, re-classify excluded URLs
into the categories listed in Phase 0 and compare against this diagnosis — if a URL is
flagged **Blocked by robots.txt** or **Excluded by noindex tag**, that would contradict the
code audit above and needs re-investigation (e.g. a hosting-platform-level header not
visible in this repo). If URLs are flagged **Crawled – currently not indexed** or **Discovered
– currently not indexed**, that corroborates this diagnosis and no further root-cause work
is needed beyond executing Phases 5-12.
