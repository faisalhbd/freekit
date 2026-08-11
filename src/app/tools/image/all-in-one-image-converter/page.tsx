import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { AllInOneImageConverterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function AllInOneImageConverterPage() {
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
        <section className="mt-8" aria-label="All-in-One Image Converter Tool">
          <AllInOneImageConverterTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert Images Online</h2>
          <p className="text-muted-foreground">
            Converting images between formats is fast and simple with this all-in-one tool:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your images</span> — Drag and drop PNG, JPG, WebP, BMP, or GIF files, or click the browse button. You can add multiple files at once.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose output format</span> — Select your target format from the dropdown (PNG, JPG, WebP, BMP, or GIF). Adjust the quality slider for lossy formats.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Convert</span> — All images are converted in your browser instantly. See side-by-side previews with file size comparisons.
            </li>
            <li>
              <span className="text-foreground font-medium">Download results</span> — Download each converted image individually or use &quot;Download All&quot; to save everything at once.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "5 input and output formats: PNG, JPG, WebP, BMP, and GIF",
              "Batch conversion — process multiple images at once",
              "Quality slider for lossy formats (JPEG, WebP) with real-time percentage",
              "Side-by-side before/after preview for each image",
              "File size comparison with percentage change indicator",
              "Source format auto-detection from file extension and MIME type",
              "White background fill for transparent images converted to JPG/BMP",
              "Download individual files or all at once",
              "All processing in your browser — images never leave your device",
              "No sign-up, no watermarks, no file size limits per image (up to 50MB)",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Supported Formats */}
        <section className="mt-16 space-y-4" aria-label="Supported formats">
          <h2 className="text-2xl font-bold tracking-tight">Supported Formats</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "PNG", desc: "Lossless format with transparency support. Best for graphics, logos, screenshots, and images with text." },
              { name: "JPG/JPEG", desc: "Widely compatible lossy format. Best for photographs and web images where file size matters." },
              { name: "WebP", desc: "Modern format by Google. 25-35% smaller than JPG at similar quality. Supports both lossy and lossless." },
              { name: "BMP", desc: "Uncompressed bitmap format. Produces large files but preserves every pixel without any compression." },
              { name: "GIF", desc: "Supports animation and limited 256-color palette. Best for simple graphics and short animations." },
            ].map((fmt) => (
              <div key={fmt.name} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{fmt.name}</h3>
                <p className="text-sm text-muted-foreground">{fmt.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Web Optimization", desc: "Convert PNG/JPG to WebP for 25-35% smaller files with similar quality, improving page load speed." },
              { title: "Social Media Uploads", desc: "Convert images to the format required by specific platforms (JPG for Instagram, PNG for logos)." },
              { title: "Email Attachments", desc: "Convert large PNG files to JPG to reduce attachment size and meet email provider limits." },
              { title: "App Development", desc: "Convert design assets to the formats required by iOS (PNG), Android (WebP), or web apps." },
              { title: "Print Preparation", desc: "Convert web images to BMP or high-quality PNG for printing without compression artifacts." },
              { title: "Archive & Backup", desc: "Convert JPG photos to PNG for lossless archival, or PNG graphics to JPG for space-efficient storage." },
              { title: "Logo & Brand Assets", desc: "Convert logos to PNG for transparency support, or to WebP for modern web usage." },
              { title: "Presentation Slides", desc: "Convert images to PNG for sharp quality in PowerPoint, Keynote, and Google Slides." },
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
              "Use WebP for web images — it offers the best balance of quality and file size.",
              "For JPEG output, 80-90% quality is usually the sweet spot between file size and visual quality.",
              "Converting from a lossy format (JPG) to another lossy format (WebP) may compound quality loss.",
              "PNG is lossless — converting any format to PNG preserves the current quality without further degradation.",
              "Transparent PNGs converted to JPG will have a white background, which may not be desired.",
              "Use our Image Compressor to reduce file sizes without changing format.",
              "Use our Image Resizer to change dimensions before converting.",
              "For HEIC images from iPhone, use our HEIC to JPG Converter tool.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(
                      /our Image Compressor/,
                      '<a href="/tools/image/image-compressor" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Compressor</a>'
                    )
                    .replace(
                      /our Image Resizer/,
                      '<a href="/tools/image/image-resizer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Resizer</a>'
                    )
                    .replace(
                      /our HEIC to JPG Converter tool/,
                      '<a href="/tools/image/heic-to-jpg" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our HEIC to JPG Converter tool</a>'
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
