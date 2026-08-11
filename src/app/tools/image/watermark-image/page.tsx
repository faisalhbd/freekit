import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { WatermarkImageTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function WatermarkImagePage() {
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
        <section className="mt-8" aria-label="Image Watermark Tool">
          <WatermarkImageTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Add a Watermark to Your Image</h2>
          <p className="text-muted-foreground">
            Protecting your images with a text watermark is straightforward:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your image</span> — Drag and drop a PNG, JPG, or WebP file. The image is loaded into a canvas for editing.
            </li>
            <li>
              <span className="text-foreground font-medium">Enter watermark text</span> — Type your copyright notice, brand name, or any text you want to overlay.
            </li>
            <li>
              <span className="text-foreground font-medium">Customize appearance</span> — Adjust font size, color, opacity, rotation, and position. The preview updates in real time.
            </li>
            <li>
              <span className="text-foreground font-medium">Download</span> — Click download to save the watermarked image in the same format as the original.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Text watermark with custom text — copyright, brand, or any message",
              "4 positioning modes: center, tiled (repeated), and four corners",
              "Font size control from 12px to 200px",
              "Color picker with quick-select presets (white, black, red, blue)",
              "Opacity slider from 5% to 100% for subtle to bold watermarks",
              "Rotation angle from -180° to 180° for diagonal or angled placement",
              "Live canvas preview that updates instantly as you adjust settings",
              "Downloads in the same format as the original (PNG stays PNG, JPG stays JPG)",
              "All processing in your browser — images never leave your device",
              "No sign-up, no watermarks added by the tool itself",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Position Modes Explained */}
        <section className="mt-16 space-y-4" aria-label="Position modes">
          <h2 className="text-2xl font-bold tracking-tight">Position Modes Explained</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Center</h3>
              <p className="text-sm text-muted-foreground">
                Places a single watermark in the exact center of the image. Best for prominent copyright notices on artwork, photography portfolios, or product images where you want the watermark clearly visible.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Tiled</h3>
              <p className="text-sm text-muted-foreground">
                Repeats the watermark text across the entire image in a grid pattern. Provides the highest level of protection as it covers the entire image. Combine with low opacity and rotation for a professional look.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Four Corners</h3>
              <p className="text-sm text-muted-foreground">
                Places the watermark in all four corners of the image. This is a common approach for stock photography and document protection, marking ownership without obscuring the main content.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Photography Portfolio", desc: "Protect your portfolio images from unauthorized use with a subtle tiled watermark that lets viewers appreciate your work." },
              { title: "Stock Photos", desc: "Add copyright notices to stock photos before distributing to agencies or clients." },
              { title: "E-commerce Products", desc: "Watermark product images to prevent competitors from using them on their own stores." },
              { title: "Social Media", desc: "Add your username or brand name to images before sharing on Instagram, Pinterest, or other visual platforms." },
              { title: "Document Protection", desc: "Mark confidential documents, contracts, or invoices with &quot;CONFIDENTIAL&quot; or &quot;DRAFT&quot; watermarks." },
              { title: "Blog & Article Images", desc: "Add your blog name or URL to images so they are credited when shared on social media." },
              { title: "Design Mockups", desc: "Watermark design previews before sharing with clients to protect your creative work." },
              { title: "Event Photos", desc: "Add event branding or photographer credit to event photography before delivery." },
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
              "Use 20-40% opacity for a subtle, professional watermark that doesn't distract from the image.",
              "Tiled mode with -30° rotation and low opacity provides maximum protection with minimal visual impact.",
              "White watermarks work well on dark images; use black or dark colors on light images.",
              "Adjust font size relative to your image dimensions — large images need larger watermark text.",
              "Always keep your original, unwatermarked images as backups in case you need them later.",
              "For web use, compress watermarked images with our Image Compressor before uploading.",
              "For social media, use corner watermarks with 30-50% opacity so they are readable but not obtrusive.",
              "Combine watermarks with image resizing using our Image Resizer for optimized delivery.",
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
