import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ImageFormatConverterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ImageFormatConverterPage() {
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
        <section className="mt-8" aria-label="Image Format Converter Tool">
          <ImageFormatConverterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert Image Formats</h2>
          <p className="text-muted-foreground">
            Converting between web image formats is simple with this focused tool:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your image</span> — Drag and drop a JPG, PNG, WebP, or AVIF file. The source format is automatically detected.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose target format</span> — Select from JPG, PNG, WebP, or AVIF. Adjust the quality slider for lossy formats.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Convert</span> — See the original and converted images side by side with file size comparison.
            </li>
            <li>
              <span className="text-foreground font-medium">Download the result</span> — Save the converted image to your device in the new format.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "4 web-essential formats: JPG, PNG, WebP, and AVIF",
              "Source format auto-detected from file and MIME type",
              "Side-by-side visual comparison of original and converted",
              "File size comparison with percentage change indicator",
              "Quality slider for lossy formats (JPG, WebP, AVIF)",
              "AVIF browser support detection with helpful fallback message",
              "White background fill for transparent PNGs converted to JPG",
              "All processing in your browser — images never leave your device",
              "Re-convert with different settings without re-uploading",
              "No sign-up, no watermarks, no file limits (up to 50MB)",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Format Comparison */}
        <section className="mt-16 space-y-4" aria-label="Format comparison">
          <h2 className="text-2xl font-bold tracking-tight">Web Format Comparison</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "JPG/JPEG", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400", points: ["Most widely supported", "Good compression for photos", "No transparency", "Universally compatible"] },
              { name: "PNG", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", points: ["Lossless quality", "Full transparency (alpha)", "Larger file sizes", "Best for graphics & logos"] },
              { name: "WebP", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400", points: ["25-35% smaller than JPG", "Lossy and lossless modes", "Transparency support", "All modern browsers"] },
              { name: "AVIF", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400", points: ["~50% smaller than JPG", "HDR & wide color", "Transparency support", "Chrome, Firefox, Edge, Safari 16.4+"] },
            ].map((fmt) => (
              <div key={fmt.name} className="rounded-xl border border-border bg-card p-4 space-y-3">
                <h3 className={`rounded-full px-3 py-1 text-xs font-semibold w-fit ${fmt.color}`}>
                  {fmt.name}
                </h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {fmt.points.map((p) => (
                    <li key={p} className="flex items-start gap-1.5">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground/30" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Web Performance", desc: "Convert JPG/PNG to WebP or AVIF for 25-50% smaller files, improving Core Web Vitals scores and SEO rankings." },
              { title: "Social Media", desc: "Convert images to the format that works best for each platform — JPG for Instagram, PNG for graphics." },
              { title: "Email-Friendly Images", desc: "Convert large PNG files to optimized WebP or compressed JPG for faster email loading." },
              { title: "CMS Uploads", desc: "Convert images to WebP before uploading to WordPress, Shopify, or other CMS platforms for optimal delivery." },
              { title: "Progressive Enhancement", desc: "Provide WebP/AVIF versions with JPG/PNG fallbacks for older browsers." },
              { title: "Design Handoff", desc: "Convert design assets from PNG to WebP for developer handoff with optimized file sizes." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Tips */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">Tips for Best Results</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "WebP is the safest modern choice — excellent compression with universal browser support.",
              "AVIF offers the best compression but may not work in all browsers. Use the side-by-side comparison to verify.",
              "For photographs, lossy WebP at 80% quality is typically the best file size-to-quality ratio.",
              "For graphics and logos, PNG preserves sharp edges and transparency perfectly.",
              "Converting between two lossy formats (JPG to WebP) may compound quality loss.",
              "Use the quality slider to find the minimum quality setting where the image still looks acceptable.",
              "For more format options including BMP and GIF, use our All-in-One Image Converter.",
              "Need to compress without changing format? Use our Image Compressor tool.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(
                      /our All-in-One Image Converter/,
                      '<a href="/tools/image/all-in-one-image-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our All-in-One Image Converter</a>'
                    )
                    .replace(
                      /our Image Compressor tool/,
                      '<a href="/tools/image/image-compressor" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Compressor tool</a>'
                    )
                }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 8. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* 9. Related Tools */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        {/* 10. CEO / Hire Me CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
