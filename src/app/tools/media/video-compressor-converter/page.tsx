import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { VideoCompressorConverter } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function VideoCompressorConverterPage() {
  const schemas = getSchemas()

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 1. Breadcrumb + Hero */}
        <ToolHeader tool={toolConfig} />

        {/* 2. Tool Interface */}
        <section className="mt-8" aria-label="Video Compressor & Converter Tool">
          <VideoCompressorConverter />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Compress or Convert a Video</h2>
          <p className="text-muted-foreground">
            Process your video in four simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your video</span> — Drag and drop or click to browse. Supports MP4, WebM, MOV, AVI, MKV, and more.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose output format</span> — Select MP4 for compatibility, WebM for smaller size, or GIF for animations.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust settings</span> — Set resolution, quality (CRF), and audio options. Lower resolution and higher CRF = smaller file.
            </li>
            <li>
              <span className="text-foreground font-medium">Click &quot;Compress &amp; Convert&quot;</span> — FFmpeg processes the video in your browser. Download when done.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "FFmpeg.wasm — full FFmpeg power in your browser",
              "Video compression with adjustable CRF quality (18–40)",
              "Format conversion: MP4, WebM, AVI, MOV, MKV, GIF",
              "Resolution scaling: 4K, 1080p, 720p, 480p, 360p",
              "Real-time progress bar with time tracking",
              "Video preview before and after processing",
              "Audio keep/remove toggle to save additional space",
              "Automatic file size savings calculation",
              "H.264, VP9, and MPEG-4 codec support",
              "100% client-side — video never leaves your device",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. CRF Quality Guide */}
        <section className="mt-16 space-y-4" aria-label="Quality guide">
          <h2 className="text-2xl font-bold tracking-tight">CRF Quality Guide</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { crf: "18–22", label: "High Quality", desc: "Virtually lossless. Ideal for archival and professional use. File sizes remain large.", color: "text-emerald-600 dark:text-emerald-400" },
              { crf: "23–28", label: "Balanced", desc: "Good quality with noticeable compression. Best for general sharing and web uploads.", color: "text-amber-600 dark:text-amber-400" },
              { crf: "29–35", label: "Low Quality", desc: "Significant compression with visible quality loss. Good for small previews and bandwidth-limited sharing.", color: "text-orange-600 dark:text-orange-400" },
              { crf: "36–40", label: "Very Low", desc: "Maximum compression. Noticeable artifacts. Use only when file size is the top priority.", color: "text-red-600 dark:text-red-400" },
            ].map((item) => (
              <div key={item.crf} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.label}</h3>
                  <span className={`text-xs font-mono font-bold ${item.color}`}>CRF {item.crf}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Format Comparison */}
        <section className="mt-16 space-y-4" aria-label="Format comparison">
          <h2 className="text-2xl font-bold tracking-tight">Output Format Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">Format</th>
                  <th className="px-4 py-3 text-center font-semibold">Codec</th>
                  <th className="px-4 py-3 text-center font-semibold">Size Efficiency</th>
                  <th className="px-4 py-3 text-center font-semibold">Compatibility</th>
                  <th className="px-4 py-3 text-center font-semibold">Audio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["MP4", "H.264 + AAC", "Good", "Excellent", "Yes"],
                  ["WebM", "VP9 + Opus", "Very Good", "Good", "Yes"],
                  ["MOV", "H.264 + AAC", "Good", "Apple devices", "Yes"],
                  ["MKV", "H.264 + AAC", "Good", "Fair", "Yes"],
                  ["AVI", "MPEG-4 + MP3", "Fair", "Legacy", "Yes"],
                  ["GIF", "GIF LZW", "Poor", "Universal", "No"],
                ].map(([format, codec, size, compat, audio]) => (
                  <tr key={format}>
                    <td className="px-4 py-2.5 font-medium">{format}</td>
                    <td className="px-4 py-2.5 text-center text-muted-foreground">{codec}</td>
                    <td className="px-4 py-2.5 text-center">{size}</td>
                    <td className="px-4 py-2.5 text-center">{compat}</td>
                    <td className="px-4 py-2.5 text-center">{audio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Performance Tips */}
        <section className="mt-16 space-y-4" aria-label="Performance tips">
          <h2 className="text-2xl font-bold tracking-tight">Performance Tips</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Use a Desktop Browser", desc: "Desktop Chrome or Firefox have more memory and CPU available. Mobile browsers have strict memory limits that may prevent processing large videos." },
              { title: "Close Other Tabs", desc: "FFmpeg.wasm needs significant memory. Close unnecessary tabs and applications to free up RAM for video processing." },
              { title: "Start with Smaller Files", desc: "If you have a very large video, try compressing a shorter clip first to test your settings before committing to a longer process." },
              { title: "Use Fast Preset", desc: "The tool uses the 'fast' encoding preset for a good balance between speed and compression. Processing a 1-min 1080p video typically takes 30s–2min." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Security & Privacy */}
        <section className="mt-16 space-y-4" aria-label="Security and privacy">
          <h2 className="text-2xl font-bold tracking-tight">Security &amp; Privacy</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "100% Browser-Based", desc: "FFmpeg.wasm runs as WebAssembly in your browser. The video file is never uploaded to any server. All encoding happens locally on your device." },
              { title: "No Data Retention", desc: "Once you close the tab or navigate away, all video data is cleared from memory. Nothing is stored, cached, or logged." },
              { title: "No Account Needed", desc: "No sign-up, no login, no email required. Just open the page, upload your video, and process it. Completely anonymous." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools + CTA */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        <ToolPageCTA />
      </div>
    </>
  )
}
