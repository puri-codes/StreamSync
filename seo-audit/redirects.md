# Phase 4 — Cannibalization Audit & Redirects Ledger

No two rows in `inventory.json` may share a primary keyword. Cross-checking all 18
indexable pages found four overlapping clusters. In every case the resolution is
**re-scoping to a genuinely distinct sub-intent**, not merge+301, because each page already
serves real, separable search demand once the content is actually written to reflect that
separation (today they overlap only because the current copy is too generic to tell them
apart — see `00-diagnosis.md` §2b).

## Cluster 1: `/download-mp3` vs `/download-audio`

- **Conflict**: both are "get the audio" pages with near-identical current copy.
- **Resolution**: `/download-mp3` owns the specific, high-volume "convert to MP3" search
  term and talks about MP3 codec/bitrate/file-size tradeoffs. `/download-audio` owns the
  broader "I just want the audio track" workflow (podcasts, lectures, interviews, any
  supported audio format, not MP3-specific) and explicitly cross-links to `/download-mp3`
  for the MP3-specific case instead of re-explaining it.
- **Status**: re-scope, no redirect.

## Cluster 2: `/instagram` vs `/download-reels`

- **Conflict**: `/instagram`'s current copy already leans heavily on Reels as the primary
  Instagram use case, overlapping with the dedicated Reels page.
- **Resolution**: `/instagram` stays the general platform hub (Reels + Stories + posts +
  carousels + public/private distinction) and only *introduces* Reels before linking out.
  `/download-reels` owns the Reels-specific depth: aspect ratio/quality notes, saving reel
  audio only, and the no-watermark nuance specific to reels.
- **Status**: re-scope, no redirect.

## Cluster 3: `/youtube` vs `/download-shorts` / `/download-playlist`

- **Conflict**: same pattern as Cluster 2 — the platform hub currently duplicates ground the
  dedicated sub-pages should own.
- **Resolution**: `/youtube` stays the general platform hub and introduces Shorts/playlists
  briefly before linking to the dedicated pages. `/download-shorts` owns short-form-specific
  depth; `/download-playlist` owns the batch/sequential workflow explanation (and must be
  honest that the product processes one link at a time today — no fabricated "bulk
  download" claim, per Phase 4a).
- **Status**: re-scope, no redirect.

## Cluster 4: `/tiktok` vs `/download-video-no-watermark` vs `/compare/snaptik-alternative`

- **Conflict**: all three could plausibly rank for "tiktok no watermark downloader."
- **Resolution**:
  - `/tiktok` owns the plain "TikTok video downloader" intent.
  - `/download-video-no-watermark` owns the cross-platform explainer of watermark
    behavior (which platforms' public formats already omit a watermark at the source vs
    which don't) — explicitly **not** a watermark-removal claim, since the product doesn't
    do that.
  - `/compare/snaptik-alternative` owns the competitor-displacement angle ("searching for
    Snaptik? here's why to use Pullify instead"), not general how-to content.
- **Status**: re-scope, no redirect.

## No merges required

Every overlap resolves via re-scoping. No page is weak enough relative to its overlapping
sibling to justify merge+301 — all four clusters have genuine standalone search demand once
written distinctly. This ledger should be re-run (Phase 21) after each rewrite batch lands, in
case a rewritten page drifts back toward a sibling's intent.

## Status

All four clusters: **resolved in the manifest** (`inventory.json` primary_intent/notes fields
reflect the scoping above). Actual content rewrites still need to be written to match — this
ledger is the contract the Batch A/B/C rewrites must honor, not evidence they're done yet.
