type IconKey = "music" | "image" | "list" | "gallery" | "film" | "waves" | "arrow" | "audio" | "eye";

export type FeatureKey =
  | "download-mp3"
  | "download-thumbnail"
  | "download-playlist"
  | "download-shorts"
  | "download-reels"
  | "download-1080p"
  | "download-4k"
  | "download-audio"
  | "download-video-no-watermark";

export type CompareKey =
  | "y2mate-alternative"
  | "savefrom-alternative"
  | "snaptik-alternative";

export type SectionId = "body" | "formatNotes" | "steps" | "tips" | "troubleshooting" | "benefits" | "faqs";

type FeaturePage = {
  slug: FeatureKey;
  title: string;
  description: string;
  h1: string;
  directAnswer: string;
  intro: string;
  body: string[];
  iconKey: IconKey;
  benefitsHeading: string;
  benefits: string[];
  steps: string[];
  formatNotesHeading: string;
  formatNotes: { title: string; text: string }[];
  tips: string[];
  troubleshooting: string[];
  faqs: { question: string; answer: string }[];
  sectionOrder: SectionId[];
};

type ComparisonPage = {
  slug: CompareKey;
  title: string;
  description: string;
  h1: string;
  directAnswer: string;
  intro: string;
  body: string[];
  iconKey: IconKey;
  comparisonHeading: string;
  comparisonPoints: string[];
  steps: string[];
  tips: string[];
  troubleshooting: string[];
  faqs: { question: string; answer: string }[];
  sectionOrder: SectionId[];
};

export const featurePages: FeaturePage[] = [
  {
    slug: "download-mp3",
    title: "Download MP3 - Convert Media to Audio",
    description: "Save the audio-only format a supported video already provides, without downloading the full video file.",
    h1: "Download MP3",
    directAnswer:
      "Pullify saves the audio-only format a source video already exposes as a standalone audio file. The exact file type — commonly MP3 or M4A — depends on what the source platform and Pullify's backend provide for that specific link; the format list shows the extension before you download so there's no guesswork.",
    intro: "Save audio from a supported link without downloading the full video first.",
    body: [
      "Pullify doesn't re-record or convert video into audio after the fact — it reads the audio-only stream the source platform already published for that upload and lets you save that directly. This matters because it means audio quality reflects what the original creator or platform encoded, not a lossy re-compression on top of an already-compressed video.",
      "This is most useful for content where the picture doesn't matter: music videos where you only want the track, interviews, lectures, or spoken-word clips. Audio-only files are also significantly smaller than video, so they download faster and take up less space if you're archiving several.",
      "If your goal is a general audio-only workflow across many formats and use cases — not specifically an MP3 file — the Download Audio guide covers that broader case, including podcasts and interviews where the source might expose a different audio codec.",
    ],
    iconKey: "music",
    benefitsHeading: "Why use audio-only",
    benefits: ["Faster downloads than full video", "Smaller files for archiving", "Works for music, interviews, and lectures"],
    steps: [
      "Paste a supported video link into the search bar.",
      "Fetch the media details and open the format list.",
      "Look for an audio-only entry — check its extension (MP3, M4A, etc.) before downloading.",
      "Download the audio file directly.",
    ],
    formatNotesHeading: "What determines the audio format",
    formatNotes: [
      { title: "File type", text: "Shown per-format before you download — usually MP3 or M4A depending on the source and how the backend serves that specific stream." },
      { title: "Bitrate", text: "Set by the original upload, not adjustable after the fact; higher-bitrate sources produce better-sounding audio files." },
      { title: "Availability", text: "Not every link exposes a separate audio-only stream — check the format list after fetching rather than assuming one exists." },
    ],
    tips: [
      "If the format list doesn't show an audio-only option, the source didn't expose one for that upload — there's no way around this from the client side.",
      "For music specifically, official audio uploads or full-length official videos tend to have cleaner audio streams than fan reuploads or live performance clips.",
      "Compare file size across the available audio formats before downloading if bandwidth or storage is a concern.",
    ],
    troubleshooting: [
      "No audio-only format appears: the source video doesn't expose a separate audio stream for that upload.",
      "Downloaded file won't play: confirm your media player supports the specific extension shown (MP3 is nearly universal; M4A occasionally needs a compatible player).",
      "Audio sounds low quality: this reflects the original upload's bitrate, not something Pullify can improve.",
    ],
    faqs: [
      { question: "Does Pullify convert video to MP3?", answer: "No. Pullify saves the audio-only stream the source already provides rather than re-encoding a video file after the fact — the extension you get (often MP3 or M4A) depends on what that stream actually is." },
      { question: "Why is there no MP3 option for some videos?", answer: "The source platform didn't expose a separate audio-only stream for that specific upload. This varies video by video, not by platform." },
      { question: "Is the audio quality reduced compared to the video's sound?", answer: "No — you're getting the same audio stream that would play alongside the video, just saved on its own without the video data." },
      { question: "Can I download a whole album or multi-track upload as MP3?", answer: "Pullify processes one link at a time. For a playlist of separate videos, fetch and download each one individually — see the Download Playlist guide." },
      { question: "What's the difference between this page and Download Audio?", answer: "This page focuses on the MP3-specific case; Download Audio covers the broader audio-only workflow across any format the source provides, including non-MP3 codecs." },
    ],
    sectionOrder: ["body", "formatNotes", "steps", "tips", "troubleshooting", "faqs"],
  },
  {
    slug: "download-audio",
    title: "Download Audio - Save Sound Only",
    description: "Save just the audio track from a supported link — podcasts, interviews, lectures, or any audio-only use case.",
    h1: "Download Audio",
    directAnswer:
      "Pullify saves the audio-only stream a source platform exposes for a supported link, in whatever format that stream is — useful for podcasts, interviews, lectures, and any case where you don't need the picture. For the specific case of converting to MP3, see the dedicated Download MP3 guide.",
    intro: "Save the audio track from a supported link, without downloading the video.",
    body: [
      "Audio-only downloading fits situations where the video is incidental to what you actually want: a recorded lecture, an interview, a podcast episode uploaded as a video, or background music from a longer clip. Pullify treats this as a format choice, not a separate workflow — the same link you'd use to download a video also exposes an audio-only option when the source provides one.",
      "Because audio files are smaller, they're also faster to fetch and easier to store in bulk if you're building a personal archive of talks, interviews, or reference material. There's no video-quality tradeoff to think about, only the audio codec and bitrate the source actually encoded.",
      "This page is intentionally broader than the MP3-specific guide: it covers any audio-only format the source exposes, whether that turns out to be MP3, M4A, or another codec, rather than assuming MP3 is always what you'll get.",
    ],
    iconKey: "audio",
    benefitsHeading: "Good fits for audio-only",
    benefits: ["Podcasts and interviews", "Lectures and talks", "Any clip where sound matters more than picture"],
    steps: [
      "Paste the link to the video or post you want the audio from.",
      "Fetch the media details.",
      "Select the audio-only format from the list.",
      "Download the file — it saves directly without the video track.",
    ],
    formatNotesHeading: "Audio-only format notes",
    formatNotes: [
      { title: "Codec", text: "Determined by the source, not selectable — common results are MP3, M4A, or Opus depending on the platform and upload." },
      { title: "File size", text: "Typically a small fraction of the equivalent video file, since no video data is included." },
      { title: "Consistency across platforms", text: "YouTube exposes audio-only streams for most standard uploads; Instagram and Facebook are less consistent, so check the format list first." },
    ],
    tips: [
      "If you're saving multiple episodes or talks from the same source, check the format list each time rather than assuming the same audio format will always be available.",
      "For long-form audio (lectures, podcasts), audio-only downloads are considerably faster than downloading the full video and extracting sound yourself.",
      "If you need MP3 specifically for compatibility with an older device, check the Download MP3 guide for the codec-specific notes.",
    ],
    troubleshooting: [
      "No audio option shown: the source didn't expose a separate audio-only stream for that link.",
      "File plays but sounds off: this is the original recording's audio quality, not a Pullify processing issue.",
      "Link fetches but the audio option is missing formats you expected: try refetching, since format lists sometimes vary slightly by request.",
    ],
    faqs: [
      { question: "What audio formats does Pullify support?", answer: "Whatever the source exposes for that specific link — commonly MP3, M4A, or Opus. The format list shows the exact extension before you download." },
      { question: "Is this different from the MP3 page?", answer: "Yes — this page covers the general audio-only workflow across any format; the MP3 page focuses specifically on the MP3 case and codec/bitrate details." },
      { question: "Can I download a podcast episode this way?", answer: "Yes, if the episode is hosted as a video on a supported platform and exposes an audio-only stream." },
      { question: "Does audio-only downloading work on Instagram and Facebook?", answer: "Sometimes — audio-only streams are less consistently available on those platforms than on YouTube. Check the format list after fetching." },
      { question: "Will the audio be out of sync or cut short?", answer: "No — Pullify saves the complete audio stream the source provides for that upload, not a re-processed clip." },
    ],
    sectionOrder: ["body", "steps", "formatNotes", "tips", "troubleshooting", "faqs"],
  },
  {
    slug: "download-thumbnail",
    title: "Download Thumbnail - Save Video Cover Images",
    description: "Save the preview image tied to a supported video or post link, where the source exposes one.",
    h1: "Download Thumbnail",
    directAnswer:
      "Pullify can save the preview image (thumbnail) tied to a supported video or post link, when the source platform exposes one in its public data. Paste the link, fetch the media details, and the thumbnail appears alongside the video and audio formats — no separate tool needed.",
    intro: "Grab the cover image tied to a supported link.",
    body: [
      "A thumbnail is useful as a quick preview, a reference frame for editing, or a cover image for something you're archiving — without needing the full video file. Pullify surfaces the thumbnail as part of the same media-info fetch used for video and audio, so there's no separate workflow to learn.",
      "Not every link exposes a usable thumbnail. YouTube videos almost always have one; Instagram and TikTok expose a preview frame for most public videos, but availability can vary by post type. If a link doesn't return a thumbnail, that reflects what the source made public, not a Pullify limitation.",
      "This is a lightweight, single-purpose page: there's no editing, cropping, or resizing involved. What you get is the image file as the platform provides it.",
    ],
    iconKey: "image",
    benefitsHeading: "Good uses for thumbnails",
    benefits: ["Quick preview or reference image", "Content planning and mood boards", "Cover art without downloading the full video"],
    steps: [
      "Paste a supported video or post link.",
      "Fetch the media information.",
      "Look for the thumbnail alongside the video and audio formats.",
      "Download the image directly.",
    ],
    formatNotesHeading: "Thumbnail notes",
    formatNotes: [
      { title: "Availability", text: "Depends on the source; YouTube is the most consistent, Instagram and TikTok vary by post type." },
      { title: "Resolution", text: "Whatever size the platform generated for that upload — Pullify doesn't upscale or enhance the image." },
      { title: "Format", text: "Typically JPEG or WebP, matching whatever the source platform serves." },
    ],
    tips: [
      "If a thumbnail doesn't appear, try refetching the link — some platforms generate the preview image slightly after the post itself goes live.",
      "For carousels or multi-image Instagram posts, the thumbnail usually reflects the first frame or image in the set.",
      "Thumbnail quality is capped by what the platform generated — there's no way to get a higher-resolution version than the source provides.",
    ],
    troubleshooting: [
      "No thumbnail shows up: the source didn't expose one publicly for that link.",
      "Thumbnail looks low resolution: that's the size the platform generated, not something Pullify can improve.",
      "Thumbnail doesn't match the video content: this can happen on platforms that auto-select a preview frame rather than using a creator-uploaded cover image.",
    ],
    faqs: [
      { question: "Does every video have a thumbnail I can download?", answer: "Most YouTube videos do. Instagram and TikTok are less consistent — availability depends on the post type and what the platform exposes publicly." },
      { question: "Can I get a higher-resolution thumbnail than what's shown?", answer: "No — Pullify serves the same image file the platform generated; it doesn't upscale or generate a higher-resolution version." },
      { question: "Does this work for Instagram carousels?", answer: "Yes, when available — the thumbnail typically reflects the first image or frame in the carousel." },
      { question: "Can I download thumbnails in bulk?", answer: "Pullify fetches one link at a time, so bulk thumbnail collection means repeating the fetch step per link." },
      { question: "Is the thumbnail edited or cropped by Pullify?", answer: "No — it's saved exactly as the source platform provides it." },
    ],
    sectionOrder: ["body", "formatNotes", "steps", "tips", "troubleshooting", "faqs"],
  },
  {
    slug: "download-playlist",
    title: "Download Playlist - Save Multiple Items Efficiently",
    description: "A practical workflow for saving items from a playlist one at a time with Pullify.",
    h1: "Download Playlist",
    directAnswer:
      "Pullify fetches and downloads one link at a time — it does not process an entire playlist URL in a single step. To save a playlist, open each video individually, copy that specific video's link, and repeat the fetch-and-download steps for each item you want.",
    intro: "Save items from a playlist one link at a time.",
    body: [
      "Playlists group several videos under one URL, but Pullify's format-fetching only works on a single media link at a time — pasting a playlist URL by itself won't return a format list. Instead, open the individual video you want from the playlist, copy that video's own link (not the playlist link), and fetch it the normal way.",
      "This is a deliberate limitation worth being upfront about rather than glossing over: Pullify does not currently support bulk or batch downloading of an entire playlist in one action. For a handful of videos this is a minor extra step; for very long playlists it means repeating the process for each item.",
      "The download queue widget does help here in a smaller way — you can fetch and queue several videos in sequence without waiting for each one to finish downloading before starting the next, so the process is still reasonably efficient even without one-click bulk support.",
    ],
    iconKey: "list",
    benefitsHeading: "What actually helps with playlists",
    benefits: ["Queue several downloads without waiting between them", "Same format picker for every item", "Consistent quality choices across a session"],
    steps: [
      "Open the playlist and click into the first video you want.",
      "Copy that video's individual link, not the playlist URL.",
      "Paste it into Pullify, fetch, and choose a format to start the download.",
      "Repeat for each additional video — queued downloads run in the background.",
    ],
    formatNotesHeading: "What to expect",
    formatNotes: [
      { title: "Batch support", text: "Not available — each video needs its own link and its own fetch step." },
      { title: "Queue behavior", text: "Multiple downloads can run and be tracked at once, which reduces the wait between items even without automatic playlist detection." },
      { title: "Format consistency", text: "Each video's available formats are independent, so quality options may differ slightly between items in the same playlist." },
    ],
    tips: [
      "Open several videos from the playlist in separate tabs first, then work through fetching and queuing each one — it's faster than going back to the playlist page each time.",
      "If you only want the audio from a playlist of talks or music, audio-only downloads process faster per item, which adds up over a long list.",
      "Keep an eye on the queue widget's progress indicators rather than waiting on each item before starting the next fetch.",
    ],
    troubleshooting: [
      "Playlist URL returns no formats: this is expected — paste the individual video's link instead.",
      "One video in the playlist fails to fetch: check whether that specific video is private, deleted, or region-locked; the rest of the playlist is unaffected.",
      "Queue seems slow with several items running: each download's speed depends on the source and file size, not on how many other items are queued.",
    ],
    faqs: [
      { question: "Can Pullify download a whole YouTube playlist automatically?", answer: "No. Pullify processes one video link at a time; a playlist URL alone won't return a format list. Open each video and fetch its individual link." },
      { question: "Is there a limit to how many items I can queue at once?", answer: "There's no hard limit in the interface, but each item still needs to be fetched and added individually." },
      { question: "Why doesn't pasting the playlist link work?", answer: "Pullify's format lookup is designed around single media items, matching what the source platform exposes per-video rather than per-playlist." },
      { question: "Can I download just the audio from every video in a playlist?", answer: "Yes — repeat the fetch step per video and choose the audio-only format each time." },
      { question: "Will this feature change in the future?", answer: "This page describes current behavior; if playlist-level support is added, this guide will be updated to reflect it rather than left inaccurate." },
    ],
    sectionOrder: ["body", "steps", "formatNotes", "tips", "troubleshooting", "faqs"],
  },
  {
    slug: "download-shorts",
    title: "Download Shorts - Save Short-Form Video",
    description: "Save YouTube Shorts using the same downloader and format picker as regular videos.",
    h1: "Download Shorts",
    directAnswer:
      "YouTube Shorts use the same link structure as regular YouTube videos, so Pullify fetches and downloads them the same way — paste the Short's link, review the formats (usually vertical resolutions), and download. There's no separate Shorts-specific tool needed.",
    intro: "Save YouTube Shorts through the same downloader used for regular videos.",
    body: [
      "Shorts are still standard YouTube uploads under the hood — they just default to a vertical aspect ratio and shorter length. That means the same link-paste-and-fetch workflow applies, and the format list Pullify returns reflects whatever resolutions YouTube encoded for that specific Short, typically limited to the vertical frame it was recorded in.",
      "Because Shorts are short by design, file sizes are usually small regardless of resolution, so downloading even the highest available quality is fast compared to a long-form video. Audio-only extraction also works the same way, useful for saving a Short's sound separately.",
      "For general YouTube link-copying and troubleshooting notes that also apply to Shorts, see the main YouTube guide — this page focuses on what's specific to the short-form case rather than repeating that ground.",
    ],
    iconKey: "gallery",
    benefitsHeading: "Why Shorts are simple to download",
    benefits: ["Small file sizes at any available resolution", "Same link format as regular YouTube videos", "Fast fetch and download due to short length"],
    steps: [
      "Open the Short and copy its link from the share button.",
      "Paste it into the search bar and fetch the media details.",
      "Review the vertical format options available.",
      "Download the quality you want.",
    ],
    formatNotesHeading: "Format notes for Shorts",
    formatNotes: [
      { title: "Aspect ratio", text: "Vertical, matching how the Short was recorded — typically 1080x1920 or similar." },
      { title: "Resolution ceiling", text: "Limited to what the creator's device and YouTube's processing produced for that specific Short." },
      { title: "Audio-only", text: "Available when YouTube exposes a separate audio stream, same as with standard videos." },
    ],
    tips: [
      "Shorts links usually contain \"/shorts/\" in the URL — make sure you're copying that link rather than a redirected long-form URL.",
      "Because file sizes are small, there's rarely a meaningful tradeoff between the highest and lowest available quality — the largest option is usually still a quick download.",
      "If you're saving several Shorts from the same channel, the queue widget lets you fetch and download them back to back without waiting.",
    ],
    troubleshooting: [
      "Link doesn't return formats: confirm it's a public Short and not a private or deleted upload.",
      "Only one resolution appears: some Shorts are only encoded at a single resolution by YouTube, depending on the original upload quality.",
      "Video looks stretched after downloading: this reflects the original aspect ratio of the Short, not a Pullify processing issue.",
    ],
    faqs: [
      { question: "Do Shorts need a different link format than regular videos?", answer: "Shorts links typically include \"/shorts/\" in the URL, but Pullify handles them the same way as any other YouTube link once pasted in." },
      { question: "Can I download a Short in landscape orientation?", answer: "No — Pullify saves whatever orientation the source video was recorded and published in, which for Shorts is vertical." },
      { question: "Are Shorts downloads lower quality than regular videos?", answer: "Not inherently — quality depends on what the creator's device recorded, not on the Shorts format itself." },
      { question: "Can I extract just the audio from a Short?", answer: "Yes, when YouTube exposes an audio-only stream for that Short, the same as with standard videos." },
      { question: "Why did my Shorts link fail?", answer: "The most common causes are a private, deleted, or region-restricted upload — the same reasons a regular YouTube link would fail." },
    ],
    sectionOrder: ["body", "formatNotes", "steps", "tips", "troubleshooting", "faqs"],
  },
  {
    slug: "download-reels",
    title: "Download Reels - Save Reels in Available Formats",
    description: "Save Instagram Reels, including audio-only extraction, using the same downloader flow.",
    h1: "Download Reels",
    directAnswer:
      "Paste a public Instagram Reel link into Pullify to fetch the video and, where available, audio-only formats Instagram exposes for that Reel. Whether the saved file carries Instagram's own watermark depends on what Instagram's servers publish for that specific Reel, not on anything Pullify does.",
    intro: "Save Instagram Reels through the standard downloader, including reel-specific format notes.",
    body: [
      "Reels are Instagram's short-form video format, and the fetch process is identical to any other Instagram link: paste it, and Pullify asks Instagram what formats exist for that Reel. Public Reels can be fetched; Reels from private accounts cannot, since Instagram doesn't serve that data publicly.",
      "A common use case specific to Reels is saving just the audio — either because a trending sound is what you actually want, or because the video itself isn't the point. When Instagram exposes an audio-only stream for a Reel, it appears in the format list the same way a video format would.",
      "On watermarks: Instagram sometimes embeds a small logo on Reels depending on how the video was shared or re-shared. Pullify doesn't add, remove, or edit anything in the downloaded file — you get whatever version Instagram's servers serve for that link. See the Download Video Without Watermark guide for a broader breakdown of watermark behavior across platforms.",
    ],
    iconKey: "film",
    benefitsHeading: "Reel-specific benefits",
    benefits: ["Save Reel audio separately from the video", "Same reliable format list as regular Instagram posts", "No separate tool needed for public Reels"],
    steps: [
      "Copy the Reel's link from Instagram's share menu.",
      "Paste it into Pullify and fetch the media details.",
      "Choose a video or audio-only format from the list.",
      "Download the file to your device.",
    ],
    formatNotesHeading: "Format notes for Reels",
    formatNotes: [
      { title: "Video", text: "Vertical MP4 formats at whatever resolution Instagram published for that Reel." },
      { title: "Audio-only", text: "Available when Instagram exposes a separate audio stream — useful for saving a trending sound on its own." },
      { title: "Watermark", text: "Determined by Instagram's own servers, not by Pullify; see the no-watermark guide for platform-by-platform notes." },
    ],
    tips: [
      "Copy the link directly from the Reel's own share menu rather than from a repost in another app, which can point at a different, less reliable URL.",
      "If you specifically want a Reel's audio, check the format list for an audio-only entry before downloading the full video.",
      "For general Instagram troubleshooting — private accounts, expired content — see the main Instagram guide, which covers that ground in more depth.",
    ],
    troubleshooting: [
      "Reel returns no formats: the account is likely private, or the Reel has been removed.",
      "No audio-only option available: not every Reel exposes a separate audio stream — this varies by upload.",
      "Downloaded video has a visible watermark: this reflects what Instagram served for that specific Reel, not something Pullify added or can remove.",
    ],
    faqs: [
      { question: "Can I download Reels from a private Instagram account?", answer: "No. Instagram only serves Reel data publicly for public accounts; private-account content cannot be fetched." },
      { question: "Does Pullify remove the Instagram watermark from Reels?", answer: "No — Pullify saves whatever format Instagram's servers expose for that Reel, watermark included or not, without editing the file." },
      { question: "Can I save just the audio from a Reel?", answer: "Yes, when Instagram exposes an audio-only stream for that specific Reel, it appears in the format list alongside the video options." },
      { question: "What resolution are Reels downloads?", answer: "Whatever Instagram encoded the Reel at, typically vertical and up to 1080p depending on the original upload." },
      { question: "Why does a reposted Reel fail to load?", answer: "Reposts sometimes link to a wrapper post rather than the original Reel — try finding and copying the original creator's link instead." },
    ],
    sectionOrder: ["body", "formatNotes", "steps", "tips", "troubleshooting", "faqs"],
  },
  {
    slug: "download-1080p",
    title: "Download 1080p Videos - Save Full HD",
    description: "Choose the 1080p option when a supported source provides it.",
    h1: "Download 1080p",
    directAnswer:
      "Pullify shows a 1080p option in the format list whenever the source video was published at that resolution or higher. Not every upload includes 1080p — availability depends entirely on what the original creator and platform published, not on anything Pullify can add.",
    intro: "Pick 1080p when the source offers it — a balance of quality and file size for most everyday use.",
    body: [
      "1080p (Full HD) is a common middle ground: sharp enough for most screens, without the large file size of 4K. Whether it's available depends entirely on the source — a video only ever exposes 1080p if the original upload was encoded at that resolution or higher, and Pullify simply reads and lists what's there.",
      "For most standard YouTube uploads, 1080p is available. Instagram and TikTok videos vary more — many mobile-recorded videos on those platforms cap out below 1080p depending on the device and platform compression, while Facebook's availability depends heavily on how the page or profile uploaded the video.",
      "If you're specifically after the best possible quality rather than a size/quality balance, see the Download 4K guide — but note 4K is far less commonly available across all platforms than 1080p.",
    ],
    iconKey: "waves",
    benefitsHeading: "Why 1080p is a good default",
    benefits: ["Sharp on most screens without a huge file size", "Widely available across supported platforms", "Faster to download than 4K on the same connection"],
    steps: [
      "Paste the video link and fetch the media details.",
      "Open the format list and look for a 1080p entry.",
      "Confirm the file size fits your needs.",
      "Select it and start the download.",
    ],
    formatNotesHeading: "1080p availability by platform",
    formatNotes: [
      { title: "YouTube", text: "Commonly available for standard uploads; older or low-effort uploads may cap out lower." },
      { title: "Instagram & TikTok", text: "Varies by upload — many mobile-recorded videos publish below 1080p depending on the device and platform compression." },
      { title: "Facebook", text: "Depends heavily on how the page or profile originally uploaded the video; some pages consistently publish in HD, others don't." },
    ],
    tips: [
      "If 1080p isn't listed, check whether a lower resolution with a similar file-size-to-quality ratio is close enough for your use case before assuming the download failed.",
      "For screen-only viewing (not printing or large displays), 1080p is usually indistinguishable from 4K on most monitors and phones.",
      "Compare the approximate file size Pullify shows for 1080p against your available storage or bandwidth before starting a large download.",
    ],
    troubleshooting: [
      "No 1080p option appears: the source wasn't published at that resolution — Pullify can't add quality that doesn't exist in the original.",
      "1080p downloads but looks soft: this can happen with heavily compressed source uploads, particularly reposts or screen recordings.",
      "File size for 1080p seems unusually large: bitrate varies by source, not just resolution — some 1080p uploads are encoded more efficiently than others.",
    ],
    faqs: [
      { question: "Is 1080p always available?", answer: "No — availability depends entirely on what resolution the original video was published at. Pullify only lists what the source actually provides." },
      { question: "What's the difference between 1080p and 4K here?", answer: "1080p is more consistently available across platforms and produces smaller files; 4K offers higher detail but is far less commonly published, especially on Instagram, Facebook, and TikTok." },
      { question: "Does Pullify upscale lower-resolution videos to 1080p?", answer: "No. Pullify never upscales — it only offers resolutions the source platform actually encoded and exposed." },
      { question: "Why does the same channel sometimes have 1080p and sometimes not?", answer: "Resolution depends on each individual upload's settings and source file, which can vary even across videos from the same creator." },
      { question: "Is 1080p good enough for most uses?", answer: "For typical viewing on phones, laptops, and most TVs, yes — 4K mainly matters for large screens or further editing work." },
    ],
    sectionOrder: ["body", "formatNotes", "steps", "tips", "troubleshooting", "faqs"],
  },
  {
    slug: "download-4k",
    title: "Download 4K Videos - Save Ultra HD",
    description: "Download 4K where a supported source actually provides it.",
    h1: "Download 4K",
    directAnswer:
      "Pullify shows a 4K option only when the source platform actually published the video at that resolution — it does not upscale lower-resolution sources to simulate 4K. 4K availability is far less common on Instagram, Facebook, and TikTok than on YouTube, where higher-effort uploads are more likely to include it.",
    intro: "Get the highest available resolution when the source actually provides it.",
    body: [
      "4K (Ultra HD) is the highest resolution Pullify can offer, and it's only ever shown when the original upload was actually encoded at that resolution. This is worth being explicit about: no downloader can generate 4K detail from a lower-resolution source — what you get is exactly what the platform published, nothing enhanced or interpolated.",
      "YouTube is the most likely place to find genuine 4K, particularly from creators using dedicated cameras or higher-end phones, and for content specifically produced for large-screen or archival purposes. Instagram, TikTok, and Facebook rarely expose 4K, since most content on those platforms is optimized for mobile viewing and compressed accordingly by the platform itself.",
      "If 4K isn't available for a link you care about, 1080p is usually the next best and far more commonly available option — see the Download 1080p guide for platform-by-platform availability notes.",
    ],
    iconKey: "arrow",
    benefitsHeading: "When 4K is worth it",
    benefits: ["Archival copies of high-value footage", "Editing work that benefits from extra detail", "Large-screen viewing where resolution is visible"],
    steps: [
      "Paste the link and fetch the media details.",
      "Check the format list for a 4K (2160p) entry.",
      "Confirm the file size — 4K files are significantly larger than 1080p.",
      "Download the 4K format if available.",
    ],
    formatNotesHeading: "4K availability by platform",
    formatNotes: [
      { title: "YouTube", text: "Most likely to have genuine 4K, typically from higher-production uploads or dedicated camera sources." },
      { title: "Instagram & TikTok", text: "Rarely available — most content on these platforms is compressed for mobile viewing well below 4K." },
      { title: "Facebook", text: "Uncommon, and dependent on how the original page or profile uploaded the video." },
    ],
    tips: [
      "Before committing to a 4K download on a slow connection, check the file size shown in the format list — 4K files are commonly several times larger than 1080p.",
      "If you're archiving for later editing, 4K is worth the extra size; for casual viewing, 1080p is usually visually indistinguishable on most screens.",
      "Don't assume a channel's other videos are also in 4K just because one is — check each link's format list individually.",
    ],
    troubleshooting: [
      "No 4K option appears: the source video simply wasn't published at that resolution.",
      "4K download is very slow: this is expected given file size — consider 1080p if bandwidth is limited.",
      "Video labeled '4K' by the uploader doesn't show a 4K format: platform re-encoding sometimes reduces the resolution actually exposed for download, even if the original recording was higher.",
    ],
    faqs: [
      { question: "Can Pullify upscale a video to 4K?", answer: "No. Pullify only offers resolutions the source platform actually published — it never upscales or artificially enhances a lower-resolution source." },
      { question: "Which platforms are most likely to have 4K?", answer: "YouTube most consistently exposes 4K for higher-production uploads. Instagram, TikTok, and Facebook rarely do, since those platforms typically compress for mobile viewing." },
      { question: "Why is the 4K file so much larger than 1080p?", answer: "Resolution scales file size significantly — a 4K frame has roughly four times the pixel data of 1080p at a similar bitrate." },
      { question: "Is 4K worth downloading for casual viewing?", answer: "Usually not necessary — most phones and monitors don't show a visible difference from 1080p at typical viewing distances." },
      { question: "Why does a video marked 4K on the platform not show 4K in the format list?", answer: "Some platforms re-encode uploads for delivery, which can reduce the resolution actually available even if the original recording was higher." },
    ],
    sectionOrder: ["body", "formatNotes", "steps", "tips", "troubleshooting", "faqs"],
  },
  {
    slug: "download-video-no-watermark",
    title: "Download Video No Watermark - What's Actually Possible",
    description: "An honest breakdown of which platforms' public video formats are watermark-free at the source, and which aren't — Pullify doesn't edit files to remove watermarks.",
    h1: "Download Video Without Watermark",
    directAnswer:
      "Pullify does not remove watermarks from downloaded videos — it saves exactly the format the source platform publishes. Whether a file is watermark-free depends entirely on the source: YouTube and Facebook videos typically have no on-video watermark; TikTok and reshared Instagram Reels often do, because those platforms burn it into the video itself.",
    intro: "What watermark-free downloading actually means, platform by platform.",
    body: [
      "It's worth being direct about this: Pullify is a format downloader, not a video editor. It doesn't crop, process, or alter the files it saves — whatever the source platform serves for a link is what you get. If a video has a watermark burned into the frame by the platform (as TikTok commonly does), that watermark is part of the video file itself and downloading it through Pullify won't remove it.",
      "Where the phrase 'no watermark' is accurate is when a platform simply doesn't add one in the first place. YouTube videos generally have no overlay watermark. Facebook public videos are usually clean too, aside from the page's own branding if the creator added it themselves. Instagram Reels are sometimes watermark-free and sometimes carry a small logo depending on how the content was originally shared or reposted.",
      "TikTok is the platform people most associate with this search, and it's the one where the honest answer is least favorable: TikTok's own watermark is typically burned into the video during its processing, and no downloader — Pullify included — can cleanly strip it back out. If a specific TikTok video shows up without a watermark, that reflects how TikTok itself served that file, not something Pullify did.",
    ],
    iconKey: "eye",
    benefitsHeading: "What Pullify does provide",
    benefits: ["The exact source format, unmodified", "Clear format details so you know what you're getting", "No misleading claims about watermark removal"],
    steps: [
      "Paste the video link and fetch the media details.",
      "Check the available formats — Pullify doesn't label watermark presence, since it varies by upload.",
      "Preview the video after downloading to confirm whether the source included a watermark.",
      "For TikTok specifically, expect a watermark on most standard downloads.",
    ],
    formatNotesHeading: "Watermark behavior by platform",
    formatNotes: [
      { title: "YouTube", text: "No platform-added watermark on standard video downloads." },
      { title: "Facebook", text: "Typically clean aside from any branding the original page added themselves." },
      { title: "Instagram Reels", text: "Varies — sometimes clean, sometimes carries a small logo depending on how the content was shared." },
      { title: "TikTok", text: "Usually watermarked, since TikTok burns its logo into the video during processing; this cannot be removed by any downloader." },
    ],
    tips: [
      "If avoiding a watermark matters for your use case, YouTube and Facebook public uploads are the most reliable sources for clean files.",
      "For TikTok content specifically, expect a watermark on most downloads — there's no reliable, legitimate way around this.",
      "Always check the actual downloaded file rather than assuming based on the platform, since behavior can vary post to post.",
    ],
    troubleshooting: [
      "Downloaded video has a watermark you didn't expect: this reflects the source file, not a Pullify processing step — there's nothing to fix on our end.",
      "A tool elsewhere claims to remove watermarks and Pullify doesn't: be cautious of that claim — genuinely removing a burned-in watermark requires video editing, not just downloading a different format.",
      "Video quality looks reduced around the watermark area: that's part of how the platform encoded the overlay into the frame.",
    ],
    faqs: [
      { question: "Does Pullify remove watermarks from downloaded videos?", answer: "No. Pullify saves the exact format the source platform provides — it does not edit, crop, or process files to remove any watermark." },
      { question: "Which platform is most likely to give a watermark-free download?", answer: "YouTube and Facebook public videos are typically watermark-free at the source. TikTok is the least likely, since its watermark is usually burned into the video itself." },
      { question: "Is there a legitimate way to get a TikTok video without the watermark?", answer: "Not through downloading alone — TikTok embeds its watermark into the video during processing. Removing it afterward requires video editing, which is outside what Pullify does." },
      { question: "Why do some Instagram Reels have a watermark and others don't?", answer: "This depends on how the content was originally shared or reposted, which is controlled by Instagram and the original poster, not by Pullify." },
      { question: "Is claiming 'no watermark' misleading if I use this page?", answer: "This page is written to be accurate about what's actually possible — it explains when a clean file is realistic and when it isn't, rather than promising universal watermark removal." },
    ],
    sectionOrder: ["body", "formatNotes", "tips", "steps", "troubleshooting", "faqs"],
  },
];

export const comparisonPages: ComparisonPage[] = [
  {
    slug: "y2mate-alternative",
    title: "Y2Mate Alternative - Pullify",
    description: "A comparison for people looking for a Y2Mate alternative: what Pullify does differently and how to switch.",
    h1: "Y2Mate Alternative",
    directAnswer:
      "Pullify is a browser-based alternative to Y2Mate for downloading public YouTube, Instagram, Facebook, and TikTok media. The core difference is interface and platform scope: Pullify covers four platforms from one search bar with a visible download queue and history, rather than being a YouTube-focused converter.",
    intro: "Looking for a Y2Mate alternative? Here's what's actually different about Pullify.",
    body: [
      "Y2Mate is widely known as a YouTube-to-MP3/MP4 conversion site. Pullify covers similar ground for YouTube but extends the same workflow to Instagram, Facebook, and TikTok, so you're not switching tools depending on the platform. The format-selection step works the same way across all four: paste a link, see the real format list the source exposes, and choose.",
      "One practical difference is the download queue. Instead of a single download-and-done interaction, Pullify tracks each download's progress, speed, and completion status in a persistent widget, and keeps a local history so you can find a file you saved earlier without re-pasting the link.",
      "If you're switching from Y2Mate specifically for YouTube downloads, the workflow will feel familiar — paste, fetch, choose a format, download — with the main adjustment being Pullify's format list reflects exactly what YouTube exposes for that video rather than a fixed set of conversion presets.",
    ],
    iconKey: "arrow",
    comparisonHeading: "What's different from Y2Mate",
    comparisonPoints: [
      "Covers YouTube, Instagram, Facebook, and TikTok from one interface, not just YouTube",
      "Shows the source platform's real format list rather than fixed conversion presets",
      "Persistent download queue with progress tracking and local history",
    ],
    steps: [
      "Copy a public link from YouTube, Instagram, Facebook, or TikTok.",
      "Paste it into Pullify's search bar and fetch the media details.",
      "Compare the available formats — resolution, file size, and codec are all shown.",
      "Choose one and download; track progress in the queue widget.",
    ],
    tips: [
      "If you mainly used Y2Mate for YouTube-to-MP3, check the dedicated Download MP3 guide for format-specific notes.",
      "The queue widget is worth getting used to if you're downloading several items in one session — it removes the need to wait on each file individually.",
      "Bookmark the platform-specific guides (YouTube, Instagram, Facebook, TikTok) if you regularly switch between sources.",
    ],
    troubleshooting: [
      "A link that worked on Y2Mate returns no formats here: confirm the content is still public — both tools depend on the source platform exposing the media publicly.",
      "Fewer format options than expected: Pullify shows exactly what the source provides, which may differ from a fixed preset list you're used to elsewhere.",
      "Download seems slower than expected: transfer speed depends on the source platform and your connection, not on which downloader you use.",
    ],
    faqs: [
      { question: "Is Pullify a direct replacement for Y2Mate?", answer: "For the core YouTube download workflow, yes. Pullify also extends the same approach to Instagram, Facebook, and TikTok, which Y2Mate doesn't cover." },
      { question: "Does Pullify offer the same MP3 conversion presets as Y2Mate?", answer: "Pullify shows the actual audio-only format the source exposes rather than offering fixed conversion presets — see the Download MP3 guide for details." },
      { question: "Do I need to create an account to switch to Pullify?", answer: "No — Pullify doesn't require an account for either tool's core workflow." },
      { question: "Can I use Pullify for platforms Y2Mate doesn't support?", answer: "Yes — Instagram, Facebook, and TikTok are all supported through the same interface." },
      { question: "Is there a learning curve switching from Y2Mate?", answer: "The core steps are the same — paste a link, review formats, download — so most users adjust immediately." },
    ],
    sectionOrder: ["body", "steps", "tips", "troubleshooting", "faqs"],
  },
  {
    slug: "savefrom-alternative",
    title: "SaveFrom Alternative - Pullify",
    description: "A comparison for people looking for a SaveFrom.net alternative and what Pullify does differently.",
    h1: "SaveFrom Alternative",
    directAnswer:
      "Pullify is an alternative to SaveFrom for downloading public media from YouTube, Instagram, Facebook, and TikTok, built around a single search bar, a real-time format list per link, and a persistent download queue rather than a browser-extension-driven workflow.",
    intro: "Looking for a SaveFrom alternative? Here's the practical difference.",
    body: [
      "SaveFrom is best known for its browser-extension approach to detecting downloadable media on a page. Pullify works differently: it's a standalone site where you paste a link directly rather than relying on a browser extension to detect content automatically. For some users that's a plus (no extension permissions needed); for others used to the extension flow, it's a small adjustment.",
      "Functionally, both tools aim at the same outcome — get a file from a public link without extra software. Pullify's format list is fetched live from the source per link, so what you see reflects that specific upload rather than a generic set of options, and every download is tracked through a visible queue with progress and a local history of recent saves.",
      "If you're switching because of extension permission concerns, browser compatibility issues, or wanting one consistent interface across YouTube, Instagram, Facebook, and TikTok, Pullify's link-in-browser-out workflow covers that without installing anything.",
    ],
    iconKey: "list",
    comparisonHeading: "What's different from SaveFrom",
    comparisonPoints: [
      "No browser extension required — works directly in any modern browser",
      "One consistent interface across four platforms instead of a browser-detection flow",
      "Visible download queue with progress tracking and local history",
    ],
    steps: [
      "Copy the public link you want to download from YouTube, Instagram, Facebook, or TikTok.",
      "Paste it directly into Pullify's search bar — no extension needed.",
      "Review the format list Pullify fetches for that specific link.",
      "Choose a format and download; the queue widget tracks progress.",
    ],
    tips: [
      "If you're used to an extension flagging downloadable content automatically, the adjustment to a paste-and-fetch workflow is usually quick after the first try.",
      "Because there's no extension, there's nothing to keep updated or worry about breaking after a browser update.",
      "Use the platform-specific guides (YouTube, Instagram, Facebook, TikTok) for source-specific quirks once you're comfortable with the basic flow.",
    ],
    troubleshooting: [
      "A link that worked through a browser extension elsewhere returns no formats here: confirm the content is still public — this affects any downloader, not just one tool.",
      "Format list looks different from what you expected: Pullify shows what the source actually exposes for that link, not a fixed preset list.",
      "Unsure where to paste the link: use the search bar at the top of any Pullify page — the workflow is the same everywhere on the site.",
    ],
    faqs: [
      { question: "Do I need to install anything to use Pullify instead of SaveFrom?", answer: "No — Pullify works directly in your browser without an extension." },
      { question: "Does Pullify support the same platforms as SaveFrom?", answer: "Pullify supports YouTube, Instagram, Facebook, and TikTok through one consistent interface." },
      { question: "Is switching from an extension-based tool difficult?", answer: "The core steps — paste a link, review formats, download — are simple enough that most users adjust immediately." },
      { question: "Why would I prefer no extension?", answer: "Some users prefer not to grant browser extensions page-reading permissions; a standalone site avoids that entirely." },
      { question: "Can I still track multiple downloads at once?", answer: "Yes — the queue widget tracks progress for every download you start, regardless of how many are running." },
    ],
    sectionOrder: ["body", "steps", "tips", "troubleshooting", "faqs"],
  },
  {
    slug: "snaptik-alternative",
    title: "Snaptik Alternative - TikTok Video Downloader",
    description: "A comparison for people looking for a Snaptik alternative for downloading TikTok videos.",
    h1: "Snaptik Alternative",
    directAnswer:
      "Pullify is an alternative to Snaptik for downloading public TikTok videos, with the same link-paste workflow but extended to also cover YouTube, Instagram, and Facebook from the same interface. Like Snaptik, Pullify does not remove TikTok's watermark — see the Download Video Without Watermark guide for what's actually possible there.",
    intro: "Looking for a Snaptik alternative? Here's what's the same and what's different.",
    body: [
      "Snaptik is focused specifically on TikTok. Pullify covers TikTok the same way — paste a public video link, review the formats TikTok exposes, and download — but doesn't stop there, since the same interface also works for YouTube, Instagram, and Facebook links.",
      "On the watermark question specifically, since it's the main reason people search for a TikTok downloader alternative: neither Snaptik nor Pullify can reliably strip a watermark that TikTok has burned into the video during its own processing. What varies is which formats TikTok exposes per video, not whether a downloader can edit that out after the fact — see the dedicated no-watermark guide for the honest version of that explanation.",
      "If you're specifically comparing tools for TikTok audio extraction, saving a trending sound separately from the video is supported the same way as with video downloads — check the format list after fetching for an audio-only option.",
    ],
    iconKey: "music",
    comparisonHeading: "What's different from Snaptik",
    comparisonPoints: [
      "Also covers YouTube, Instagram, and Facebook, not just TikTok",
      "Persistent download queue and local history across all platforms",
      "Same honest limitation on watermark removal — no downloader can reliably strip TikTok's burned-in watermark",
    ],
    steps: [
      "Copy the TikTok video link from the Share menu.",
      "Paste it into Pullify's search bar and fetch the media details.",
      "Choose a video or audio-only format from the list.",
      "Download the file to your device.",
    ],
    tips: [
      "If watermark presence is your main concern, read the Download Video Without Watermark guide before assuming any tool — including this one — can remove it.",
      "For saving a trending sound specifically, check the format list for an audio-only entry rather than downloading the full video.",
      "If you regularly download from more than just TikTok, the same interface works for YouTube, Instagram, and Facebook links too.",
    ],
    troubleshooting: [
      "A TikTok link that worked elsewhere returns no formats here: confirm the account is public and the video hasn't been removed.",
      "Downloaded video still has the TikTok watermark: this is expected — see the no-watermark guide for why no downloader can reliably remove it.",
      "Link copied from a browser tab fails to resolve: use TikTok's in-app Share button for the most reliable link.",
    ],
    faqs: [
      { question: "Does Pullify remove the TikTok watermark like some tools claim?", answer: "No — TikTok burns its watermark into the video during processing, and no downloader, Pullify included, can reliably strip it back out afterward." },
      { question: "What does Pullify offer beyond TikTok that Snaptik doesn't?", answer: "YouTube, Instagram, and Facebook support through the same interface, plus a persistent download queue and local history." },
      { question: "Can I download TikTok audio only?", answer: "Yes, when TikTok exposes an audio-only stream for that video, it appears in the format list alongside the video options." },
      { question: "Is the TikTok download process different from Snaptik's?", answer: "The core steps are similar — paste a link, review formats, download — with Pullify additionally tracking the download in a persistent queue." },
      { question: "Do private TikTok accounts work with either tool?", answer: "No — private-account content isn't served publicly by TikTok, so no downloader can access it without logging in, which neither Snaptik nor Pullify does." },
    ],
    sectionOrder: ["body", "steps", "tips", "troubleshooting", "faqs"],
  },
];

export const comparePageSlugs = comparisonPages.map((page) => page.slug);

export function getFeatureRelatedLinks(currentSlug: FeatureKey) {
  return [
    { href: "/youtube", label: "YouTube Downloader" },
    { href: "/instagram", label: "Instagram Downloader" },
    { href: "/facebook", label: "Facebook Downloader" },
    { href: "/tiktok", label: "TikTok Downloader" },
    { href: "/how-to", label: "How To Guide" },
    ...featurePages
      .filter((page) => page.slug !== currentSlug)
      .slice(0, 4)
      .map((page) => ({ href: `/${page.slug}`, label: page.h1 })),
    ...comparisonPages.slice(0, 2).map((page) => ({ href: `/compare/${page.slug}`, label: page.h1 })),
  ];
}

export function getComparisonRelatedLinks(currentSlug: CompareKey) {
  return [
    { href: "/", label: "Home" },
    { href: "/youtube", label: "YouTube Downloader" },
    { href: "/instagram", label: "Instagram Downloader" },
    { href: "/facebook", label: "Facebook Downloader" },
    { href: "/tiktok", label: "TikTok Downloader" },
    { href: "/how-to", label: "How To Guide" },
    { href: "/download-mp3", label: "Download MP3" },
    ...comparisonPages
      .filter((page) => page.slug !== currentSlug)
      .map((page) => ({ href: `/compare/${page.slug}`, label: page.h1 })),
    ...featurePages.slice(0, 2).map((page) => ({ href: `/${page.slug}`, label: page.h1 })),
  ];
}

export function getFeaturePage(slug: FeatureKey) {
  return featurePages.find((page) => page.slug === slug)!;
}

export function getComparisonPage(slug: CompareKey) {
  return comparisonPages.find((page) => page.slug === slug)!;
}
