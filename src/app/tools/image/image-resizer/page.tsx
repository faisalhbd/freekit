import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ImageResizerTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ImageResizerPage() {
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
        <section className="mt-8" aria-label="Image Resizer Tool">
          <ImageResizerTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Resize Images Online</h2>
          <p className="text-muted-foreground">
            Resizing your images takes just a few steps. Follow this guide to get started:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your image</span> — Drag and drop any image file or click the browse button. We support PNG, JPG, WebP, GIF, BMP, and SVG formats.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose your resize mode</span> — Select &quot;By Dimensions&quot; to set exact pixel width and height, or &quot;By File Size&quot; to specify a target file size like 50KB.
            </li>
            <li>
              <span className="text-foreground font-medium">Set the output size</span> — Enter your desired dimensions manually or pick a preset (e.g., Facebook Profile, YouTube Thumbnail, Passport Photo). For file size mode, set the maximum KB or MB target.
            </li>
            <li>
              <span className="text-foreground font-medium">Lock aspect ratio</span> — Keep the aspect ratio locked to prevent stretching. You can also unlink it to set custom width and height independently.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Resize All</span> — Your images will be resized instantly in your browser with maximum quality.
            </li>
            <li>
              <span className="text-foreground font-medium">Download the result</span> — Preview the resized images side by side with the originals, then download individually or all at once.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Resize by exact pixel dimensions or target file size",
              "Zero quality loss when resizing by dimensions — always outputs at 100% quality",
              "Supports PNG, JPG, WebP, GIF, BMP, and SVG formats",
              "Batch resize — process multiple images at once",
              "18 built-in dimension presets for social media and common sizes",
              "File size presets: 10KB, 25KB, 50KB, 100KB, 200KB, 500KB, 1MB, 2MB, 5MB",
              "Lock/unlock aspect ratio to prevent image stretching",
              "Side-by-side before and after preview with pixel dimensions",
              "Intelligent quality optimization for target file size mode",
              "Drag and drop or click to upload — no sign-up required",
              "All processing in your browser — your images never leave your device",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Resize Modes Explained */}
        <section className="mt-16 space-y-4" aria-label="Resize modes">
          <h2 className="text-2xl font-bold tracking-tight">Two Powerful Resize Modes</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">By Dimensions</h3>
              <p className="text-sm text-muted-foreground">
                Set exact pixel width and height. Output is rendered at 100% quality — no compression, no quality drop.
                Perfect when you need a specific image size for a website, app, or print requirement.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">By File Size</h3>
              <p className="text-sm text-muted-foreground">
                Specify a target file size (e.g., &quot;I need this image under 50KB&quot;). The tool resizes to your
                dimensions and then intelligently optimizes quality to meet your size target.
                Great for upload limits, email attachments, and form submissions.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Social Media Profile Pictures", desc: "Resize to exact platform requirements like Facebook (170×170), Instagram (1080×1080), or LinkedIn." },
              { title: "Website Thumbnails & Banners", desc: "Create perfectly sized thumbnails, hero banners, and product images for your website." },
              { title: "Passport & ID Photos", desc: "Resize photos to standard passport photo sizes (600×600) with precise dimensions." },
              { title: "Email Attachments", desc: "Reduce image file size to fit within email attachment limits (e.g., under 500KB)." },
              { title: "E-commerce Product Images", desc: "Standardize all product photos to the same dimensions for a clean, professional storefront." },
              { title: "App Icons & Screenshots", desc: "Resize images to exact app store requirements for iOS and Android." },
              { title: "Form Upload Requirements", desc: "Meet strict upload size limits (e.g., 50KB max) for government forms and job applications." },
              { title: "Print Preparation", desc: "Resize to specific DPI and pixel dimensions for printing photos, posters, and documents." },
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
              "Always lock the aspect ratio when resizing photos to prevent stretching or distortion.",
              "Use the dimension presets for quick resizing to common social media and web sizes.",
              "When using file size mode, set the dimensions first, then adjust the target KB/MB.",
              "For best quality in file size mode, set dimensions as small as possible — smaller images need less quality reduction to hit the target size.",
              "PNG format preserves transparency but produces larger files. Use JPEG or WebP for smaller file sizes.",
              "Need to reduce file size without changing dimensions? Try our Image Compressor tool instead.",
              "Need to convert formats while resizing? Use the output format selector to convert to JPEG, PNG, or WebP.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip.replace(
                    /our (Image Compressor) tool instead/,
                    '<a href="/tools/image/image-compressor" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
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
