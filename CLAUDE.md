# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is **Pullify**, a Next.js 15 (App Router) frontend for a social media downloader (YouTube, Instagram, Facebook, TikTok, etc). Product/brand name is "Pullify" — do not confuse with the repo directory name "StreamSync" or the package.json name "ai-studio-applet" (this app was scaffolded via Google AI Studio).

## Commands

- `npm run dev` — start the dev server (Next.js)
- `npm run build` — production build (`output: 'standalone'` in `next.config.ts`)
- `npm run start` — run the production build
- `npm run lint` — ESLint via flat config (`eslint.config.mjs`, extends `eslint-config-next`)
- `npm run clean` — `next clean`

There is no test suite/framework configured in this repo.

Both `package-lock.json` (committed) and `bun.lock` (untracked, present locally) exist — treat npm/`package-lock.json` as canonical unless told otherwise.

## Architecture

### The app is a thin proxy/UI over an external backend

All actual media extraction/downloading happens on a separate backend service reached via `BACKEND_URL` (env var, currently defaults to an ngrok tunnel URL hardcoded as a fallback in each route). This Next.js app does **not** run yt-dlp or any downloader itself — it only proxies requests and streams responses. The four API routes in `app/api/` are all thin proxies:

- `POST /api/info` → `${BACKEND_URL}/api/info` — resolve a URL into `MediaInfo` (title, thumbnail, duration, list of `Format`s)
- `POST /api/download` → `${BACKEND_URL}/api/download` — start a download job for a chosen `format_id`, returns `{ job_id }`
- `GET /api/status/[jobId]` → `${BACKEND_URL}/api/status/:jobId` — poll job progress (`cache: "no-store"`)
- `GET /api/file/[jobId]` → `${BACKEND_URL}/api/file/:jobId` — streams the completed file through, preserving `Content-Disposition`/`Content-Type`/`Content-Length`

All backend requests include the `ngrok-skip-browser-warning` header. When editing these routes, keep the proxy behavior (error passthrough with backend status code + text, no extra transformation) consistent across all four.

Client-side, `services/downloader.ts` wraps these four routes with `fetch` calls (`getVideoInfo`, `startDownload`, `getDownloadStatus`, `downloadCompletedFile`). `downloadCompletedFile` parses `Content-Disposition` to recover the filename and triggers a browser save via a blob URL.

### Download queue / job polling

`components/DownloadManager.tsx` defines `DownloadManagerProvider` (React context) which owns the client-side download queue (`QueueItem[]`) and download history (`RecentDownload[]`, persisted to `localStorage` under `download_history`). Key behavior:

- `addDownload` creates a queue item, calls `startDownload`, and starts polling.
- A single `setInterval` (1000ms) inside a `useEffect` polls `getDownloadStatus` for every non-terminal queue item with a `job_id`.
- When a job reaches `completed` (or progress hits 100), `triggerFileDownload` calls `downloadCompletedFile` to save the file and moves the item into `recents`.
- The queue widget (`DownloadQueueWidget`) is a fixed bottom-left floating panel rendered by the provider itself, so mounting `DownloadManagerProvider` anywhere renders the widget globally for that subtree.

`DownloadManagerProvider`/`ToastProvider` are **not** mounted once at the root — each top-level page composition (`MediaHome`, `LandingPage`) wraps itself in its own providers. Keep this pattern when adding new pages that need the downloader UI.

### Two page archetypes share one downloader UI

1. **Core downloader pages** (`/`, `/youtube`, `/instagram`, `/facebook`, `/tiktok`, `/how-to`) render `components/MediaHome.tsx`, which contains the actual search bar → fetch info → format table → download flow. Per-route copy (title, steps, overview paragraphs) lives in the `pageConfigs` map keyed by `pathname` at the top of `MediaHome.tsx` — add new entries there rather than branching UI logic per route.
2. **SEO landing pages** (`app/download-*/page.tsx`, `app/compare/[slug]/page.tsx`) render `components/LandingPage.tsx`, a self-contained duplicate of the same fetch/download flow with different marketing copy/FAQs sourced from `lib/seo-pages.ts` (`featurePages`, `comparisonPages`). `compare/[slug]` uses `generateStaticParams` over `comparePageSlugs`.

`MediaHome` and `LandingPage` intentionally duplicate the fetch/queue-wiring logic rather than sharing a hook — if you fix a bug in one flow (e.g. error handling, scroll-into-view timing), check whether the same fix is needed in the other.

### SEO content system

- `lib/seo.ts` — site-wide constants (`siteUrl` resolved from `NEXT_PUBLIC_SITE_URL` → `APP_URL` → `VERCEL_URL` → hardcoded fallback), `seoPages` registry for the core pages, and builders for `Metadata`, breadcrumb/WebPage/HowTo/FAQ JSON-LD.
- `lib/seo-pages.ts` — registries for feature pages (`featurePages`, e.g. `download-mp3`, `download-4k`) and comparison pages (`comparisonPages`, e.g. `y2mate-alternative`), plus `getFeatureRelatedLinks`/`getComparisonRelatedLinks` for cross-linking and `getFeaturePage`/`getComparisonPage` lookups.
- `app/sitemap.ts` plus `app/sitemap-*.xml/route.ts` and `app/robots.ts` generate the sitemap/robots surface from these registries — new feature/comparison pages added to `lib/seo-pages.ts` are automatically picked up.
- `components/SeoPageScripts.tsx` injects JSON-LD; `components/SeoSections.tsx` renders the extra marketing/FAQ sections used on some core pages (see `app/youtube/page.tsx` for the pattern).
- When adding a new feature/comparison page: add an entry to the appropriate array in `lib/seo-pages.ts`, then add a matching `app/<slug>/page.tsx` that renders `LandingPage` with `featureMetadata`/`comparisonMetadata` from `lib/seo.ts`.

### Layout shell

`components/SiteShell.tsx` (mounted once in `app/layout.tsx`) renders the header nav, breadcrumbs, and footer around every page — it reads `lib/seo-pages.ts` `featurePages` for footer links and a static `navItems` list for primary nav. It does not include the downloader providers (see above).

### Security headers

`middleware.ts` sets CSP and other security headers on all routes except static assets/sitemap/robots. `next.config.ts` sets `eslint.ignoreDuringBuilds: true` (lint failures do not fail the build) but `typescript.ignoreBuildErrors: false` (type errors do fail the build).

### Path aliases

`@/*` maps to the repo root (see `tsconfig.json`), e.g. `@/components/...`, `@/lib/...`, `@/types`.
