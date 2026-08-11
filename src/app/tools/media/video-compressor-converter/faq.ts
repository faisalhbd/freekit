import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does the video compressor work?",
    answer:
      "This tool uses FFmpeg.wasm, a WebAssembly port of the powerful FFmpeg multimedia framework, running entirely in your browser. When you upload a video, FFmpeg processes it directly on your device — encoding, compressing, or converting it without ever sending the file to a server. The output is then offered as a download.",
  },
  {
    question: "What video formats are supported?",
    answer:
      "The tool supports a wide range of input formats including MP4, WebM, MOV, AVI, MKV, FLV, WMV, MPEG, 3GP, and more. For output, you can convert to MP4 (H.264), WebM (VP8/VP9), AVI, MOV, MKV, or even GIF. The exact formats available depend on the codecs bundled with FFmpeg.wasm.",
  },
  {
    question: "What is CRF and how does it affect quality?",
    answer:
      "CRF (Constant Rate Factor) is a quality setting for H.264 and H.265 encoding. Lower CRF values produce higher quality but larger files. The scale goes from 0 (lossless) to 51 (worst quality). Recommended ranges: CRF 18–22 for high quality, CRF 23–28 for good balance, CRF 29–35 for smaller files with noticeable quality loss. The default of 23 is a good starting point.",
  },
  {
    question: "How much can I compress my video?",
    answer:
      "Compression depends on the original video and settings. Typical results: reducing 1080p to 720p can save 40–60% of file size. Using CRF 28 instead of CRF 23 can save 30–50% with mild quality loss. Converting to WebM with VP9 can be 20–40% more efficient than H.264 at the same quality. Combining resolution reduction with higher CRF can achieve 50–80% size reduction.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "Since processing happens in your browser, the limit depends on your device's available memory (RAM). FFmpeg.wasm requires loading a ~32MB WebAssembly core, and it needs memory for both the input and output video. Generally, videos up to 500MB work well on most modern devices with 8GB+ RAM. Larger videos may cause browser tabs to crash due to memory limits.",
  },
  {
    question: "Why does processing take time?",
    answer:
      "Video encoding is computationally intensive. FFmpeg.wasm runs in your browser using WebAssembly, which is fast but not as fast as native code. A 1-minute 1080p video might take 30 seconds to 2 minutes to process depending on your device and settings. Processing is faster on desktop browsers with more CPU cores available.",
  },
  {
    question: "Can I convert video to GIF?",
    answer:
      "Yes. Select GIF as the output format. Note that GIF is a very old format with limited colors (256) and no audio, so the output will be much larger than a compressed MP4 and lower quality. For short clips (under 10 seconds), GIF works well. For longer videos, consider WebM or MP4 which are far more efficient.",
  },
  {
    question: "What's the difference between MP4 and WebM?",
    answer:
      "MP4 with H.264 is the most widely compatible format — it works on virtually every device and browser. WebM with VP9 typically produces smaller files at the same quality and is well-supported in modern browsers (Chrome, Firefox, Edge). For maximum compatibility, choose MP4. For web optimization, choose WebM. Both support audio.",
  },
  {
    question: "Is my video data safe?",
    answer:
      "Absolutely. Your video is processed entirely in your browser using WebAssembly. The file never leaves your device — it is not uploaded to any server. Once you close the tab, all data is cleared from memory. This is the most private way to process videos online.",
  },
  {
    question: "Why does FFmpeg need to load when I first use the tool?",
    answer:
      "FFmpeg.wasm is a ~32MB WebAssembly module that contains the full FFmpeg multimedia framework. On first use, this core is downloaded from a CDN and loaded into your browser's memory. Subsequent uses within the same session are instant since the core is already loaded. The download happens once per browser session.",
  },
  {
    question: "Can I change the resolution of my video?",
    answer:
      "Yes. The tool offers preset resolutions (4K, 1080p, 720p, 480p, 360p) and an 'Original' option to keep the current resolution. When you select a lower resolution, FFmpeg scales the video down, which significantly reduces file size while maintaining quality at the chosen resolution.",
  },
  {
    question: "Does it support audio compression?",
    answer:
      "Yes. By default, audio is re-encoded with AAC at 128kbps for MP4 output or Opus at 128kbps for WebM output. You can disable audio entirely to save additional space if you only need the video track.",
  },
]
