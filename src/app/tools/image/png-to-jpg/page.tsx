import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PngToJpgTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PngToJpgPage() {
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
        <section className="mt-8" aria-label="PNG to JPG Converter Tool">
          <PngToJpgTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert PNG to JPG Online</h2>
          <p className="text-muted-foreground">
            Converting your PNG images to JPG format takes just a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your PNG images</span> — Drag and drop PNG files or click the browse button. The tool accepts PNG files up to 50MB each.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust the quality</span> — Use the quality slider to set your desired JPG quality. We recommend 85% for the best balance between file size and visual quality.
            </li>
            <li>
              <span className="text-foreground font-medium">Set background color (if needed)</span> — If your PNG has transparent areas, choose a background color (white, black, or custom) to replace the transparency in the JPG output.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Convert</span> — Your PNG images will be converted to JPG format instantly. See the file size savings and preview results side by side.
            </li>
            <li>
              <span className="text-foreground font-medium">Download the results</span> — Download each JPG individually or download all converted images at once.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Convert PNG images to JPG format with adjustable quality (1-100%)",
              "Custom background color for transparent PNG areas — white, black, or any custom color",
              "Quick quality presets: Maximum (95%), High (85%), Medium (70%), Small File (50%)",
              "Automatic transparency detection — warns you when PNG has transparent areas",
              "Batch convert — process multiple PNG files to JPG at once",
              "Side-by-side before and after preview with file size comparison",
              "Shows exact savings percentage for each converted image",
              "Drag and drop or click to upload — no sign-up required",
              "All processing in your browser — your images never leave your device",
              "Re-convert with different quality or background color without re-uploading",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. PNG vs JPG */}
        <section className="mt-16 space-y-4" aria-label="PNG vs JPG">
          <h2 className="text-2xl font-bold tracking-tight">PNG vs JPG — When to Convert?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">When to Use JPG</h3>
              <p className="text-sm text-muted-foreground">
                Use JPG for photographs, product images, email attachments, social media posts, and any
                web image where file size matters. JPG produces much smaller files (typically 60-90% smaller
                than PNG) and is universally supported across all platforms and browsers.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">When to Keep PNG</h3>
              <p className="text-sm text-muted-foreground">
                Keep PNG for logos, icons, graphics with text, screenshots with transparency, and images
                that need pixel-perfect quality. PNG supports transparency and uses lossless compression,
                making it ideal for graphics but producing larger file sizes for photographs.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Website Optimization", desc: "Convert PNG screenshots and images to JPG for faster page loading and smaller bandwidth usage." },
              { title: "Email Attachments", desc: "Reduce attachment sizes by converting large PNG files to compact JPG before sending emails." },
              { title: "Social Media Uploads", desc: "Most social platforms prefer JPG. Convert your PNG images for faster uploads and posting." },
              { title: "E-commerce Product Photos", desc: "Convert product images from PNG to JPG for faster storefront loading without quality loss." },
              { title: "WordPress & CMS Uploads", desc: "Save server space and improve page speed by uploading JPG instead of large PNG files." },
              { title: "Document & Form Submissions", desc: "Many government and job application forms require JPG format and have strict file size limits." },
              { title: "Blog & Article Images", desc: "Speed up your blog by converting PNG screenshots and illustrations to JPG format." },
              { title: "Print & Presentation Preparation", desc: "Convert PNG images to JPG for use in PowerPoint, Word documents, and printed materials." },
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
              "Use 85% quality for most web images — it provides excellent visual quality with significant file size reduction.",
              "For photographs where detail matters, use 90-95% quality — the files will still be much smaller than PNG.",
              "For thumbnails and decorative images, 60-75% quality produces very small files with acceptable quality.",
              "If your PNG has transparency, set a background color that matches where the image will be used (e.g., website background).",
              "JPG does not support transparency — always check the transparency warning before converting logos or icons.",
              "You can re-convert with different settings without re-uploading — just adjust quality or color and click Convert again.",
              "Need to convert the other way? Use our JPG to PNG Converter for converting JPG back to PNG with transparency support.",
              "Need to compress without changing format? Try our Image Compressor tool for PNG or JPG compression.",
              "Need to resize while converting? Use our Image Resizer tool to set custom dimensions and output format.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(
                      /our (JPG to PNG Converter)/,
                      '<a href="/tools/image/jpg-to-png" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Image Compressor) tool/,
                      '<a href="/tools/image/image-compressor" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Image Resizer) tool/,
                      '<a href="/tools/image/image-resizer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
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
