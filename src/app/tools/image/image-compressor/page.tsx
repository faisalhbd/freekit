import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ImageCompressorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ImageCompressorPage() {
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

        {/* 2. Tool Interface — above the fold */}
        <section className="mt-8" aria-label="Image Compressor Tool">
          <ImageCompressorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Compress Images Online</h2>
          <p className="text-muted-foreground">
            Compressing your images takes just a few simple steps. Follow this guide to get started:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your image</span> — Drag and drop a PNG, JPG, or WebP file onto the upload area, or click the browse button to select files from your device.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust quality</span> — Use the quality slider to choose your desired compression level. Lower values produce smaller files with reduced quality; higher values retain more detail.
            </li>
            <li>
              <span className="text-foreground font-medium">Select output format</span> — Choose JPEG, PNG, or WebP as the output format. Need to convert formats? Try our{" "}
              <Link href="/tools/image/png-to-jpg" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PNG to JPG Converter
              </Link> or{" "}
              <Link href="/tools/image/jpg-to-png" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                JPG to PNG Converter
              </Link> for quick format swaps.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Compress</span> — Hit the compress button and your image will be processed instantly in your browser.
            </li>
            <li>
              <span className="text-foreground font-medium">Download the result</span> — Preview the compressed image side by side with the original, then click download to save it to your device.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Client-side processing — your images never leave your browser",
              "Adjustable quality slider from 1% to 100%",
              "Output format selection: JPEG, PNG, or WebP",
              "Side-by-side before and after preview",
              "Batch compression — process multiple images at once",
              "Real-time file size comparison with compression percentage",
              "Support for images up to 50MB",
              "No watermarks, no sign-up, no limits",
              "Drag and drop or click to upload",
              "One-click download for compressed files",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Benefits */}
        <section className="mt-16 space-y-4" aria-label="Benefits">
          <h2 className="text-2xl font-bold tracking-tight">Benefits</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Faster Websites",
                desc: "Compressed images load significantly faster, improving your Core Web Vitals score and boosting your search engine rankings. For a deeper SEO analysis, check out our free Meta Tag Generator to optimize your page metadata.",
                link: { href: "/tools/seo/meta-tag-generator", label: "Meta Tag Generator →" },
              },
              {
                title: "Save Storage Space",
                desc: "Reduce the disk space used by your photo library, backups, and project assets without losing visual quality.",
              },
              {
                title: "Complete Privacy",
                desc: "All compression happens in your browser. Your images are never uploaded to any server — zero data leaves your device.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                {"link" in item && item.link && (
                  <Link
                    href={item.link.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {item.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 6. Examples */}
        <section className="mt-16 space-y-4" aria-label="Examples">
          <h2 className="text-2xl font-bold tracking-tight">Compression Examples</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 text-left font-medium">Format</th>
                  <th className="py-2 pr-4 text-left font-medium">Original Size</th>
                  <th className="py-2 pr-4 text-left font-medium">Quality</th>
                  <th className="py-2 pr-4 text-left font-medium">Compressed Size</th>
                  <th className="py-2 text-left font-medium">Reduction</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { format: "JPEG Photo", original: "4.2 MB", quality: "80%", compressed: "680 KB", reduction: "84%" },
                  { format: "PNG Screenshot", original: "2.1 MB", quality: "75%", compressed: "320 KB", reduction: "85%" },
                  { format: "WebP Graphic", original: "1.8 MB", quality: "85%", compressed: "450 KB", reduction: "75%" },
                  { format: "JPEG Banner", original: "3.5 MB", quality: "70%", compressed: "490 KB", reduction: "86%" },
                ].map((row) => (
                  <tr key={row.format} className="border-b border-border last:border-0">
                    <td className="py-2 pr-4 font-medium text-foreground">{row.format}</td>
                    <td className="py-2 pr-4">{row.original}</td>
                    <td className="py-2 pr-4">{row.quality}</td>
                    <td className="py-2 pr-4 text-emerald-600 dark:text-emerald-400">{row.compressed}</td>
                    <td className="py-2 font-medium text-emerald-600 dark:text-emerald-400">-{row.reduction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Blog & Website Images", desc: "Reduce image sizes for faster page loads and better Core Web Vitals scores." },
              { title: "Email Attachments", desc: "Compress photos to fit within email attachment size limits." },
              { title: "Social Media Posts", desc: "Optimize images for platforms like Instagram, Facebook, and Twitter." },
              { title: "E-commerce Product Photos", desc: "Speed up product page loading for higher conversion rates." },
              { title: "Presentations & Documents", desc: "Reduce file sizes for PowerPoint, Google Slides, and PDF documents." },
              { title: "Game & App Assets", desc: "Compress texture and sprite assets for faster download and rendering." },
              { title: "Backup & Storage", desc: "Save disk space on your local backups and cloud storage." },
              { title: "SEO Optimization", desc: "Lighter images improve page speed, which is a direct Google ranking factor." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use WebP format for web images — it typically provides the best compression with minimal quality loss. Our Image to WebP Converter makes this easy.",
              "For JPEG photos, a quality setting of 75-85% offers an excellent balance between file size and visual quality.",
              "Always keep a copy of your original images before compressing, especially for important work.",
              "For transparent PNGs, choose PNG output to preserve transparency, or use WebP for better compression.",
              "Test compressed images on different devices and screen sizes to ensure quality is acceptable.",
              "Batch compress all your website images at once to save time during optimization workflows.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip.replace(/Our (Image to WebP Converter) makes this easy/, '<a href="/tools/image/image-to-webp" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>') }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 9. Common Mistakes */}
        <section className="mt-16 space-y-4" aria-label="Common mistakes">
          <h2 className="text-2xl font-bold tracking-tight">Common Mistakes to Avoid</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Setting quality too low — below 40% can produce noticeable artifacts and blurriness.",
              "Compressing already-compressed images — this compounds quality loss without significant size reduction.",
              "Ignoring output format — choosing the wrong format can result in larger files than the original.",
              "Not testing on mobile — compressed images may look different on high-DPI mobile screens.",
              "Using lossy compression for screenshots — PNG with lossless compression is usually better for text-heavy screenshots.",
            ].map((mistake) => (
              <li key={mistake} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                {mistake}
              </li>
            ))}
          </ul>
        </section>

        {/* 10. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* 11. Related Tools */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        {/* 12. CEO / Hire Me CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
