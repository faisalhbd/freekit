import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { HeicToJpgTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function HeicToJpgPage() {
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
        <section className="mt-8" aria-label="HEIC to JPG Converter Tool">
          <HeicToJpgTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert HEIC to JPG Online</h2>
          <p className="text-muted-foreground">
            Converting your iPhone photos to universally compatible JPG format is quick and easy:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload HEIC files</span> — Drag and drop HEIC or HEIF files from your iPhone, iPad, or Mac. You can select multiple files at once.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust quality</span> — Use the quality slider to set the JPG output quality. 85-90% is recommended for a good balance of file size and quality.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Convert</span> — Your HEIC photos are converted to JPG in your browser using the heic2any library. No uploads to any server.
            </li>
            <li>
              <span className="text-foreground font-medium">Download JPGs</span> — Preview the converted images and download each one individually or use &quot;Download All&quot; to save everything.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Converts HEIC and HEIF files to universally compatible JPG format",
              "Quality slider with presets (50% to 100%) for file size control",
              "Batch conversion — process multiple iPhone photos at once",
              "Side-by-side preview showing HEIC size and converted JPG",
              "File size comparison with percentage change indicator",
              "EXIF metadata preservation (camera info, date, location)",
              "Works with iOS 11+ HEIC photos from iPhone, iPad, and Mac",
              "All processing in your browser — photos never leave your device",
              "Up to 50MB per file — supports high-resolution iPhone photos",
              "No sign-up, no watermarks, no file limits",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Why Convert HEIC */}
        <section className="mt-16 space-y-4" aria-label="Why convert HEIC">
          <h2 className="text-2xl font-bold tracking-tight">Why Convert HEIC to JPG</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Universal Compatibility</h3>
              <p className="text-sm text-muted-foreground">
                JPG is supported by virtually every device, browser, and application in the world. Converting HEIC to JPG ensures your photos can be opened, shared, and viewed by anyone, regardless of whether they use Apple devices.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Social Media & Sharing</h3>
              <p className="text-sm text-muted-foreground">
                Many social media platforms and messaging apps handle HEIC poorly or not at all. JPG ensures your photos upload correctly and display properly everywhere — Instagram, Facebook, WhatsApp, email, and more.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Web & Blog Use</h3>
              <p className="text-sm text-muted-foreground">
                Content management systems like WordPress, website builders, and most web platforms expect JPG or PNG images. Converting HEIC to JPG makes your iPhone photos ready for web use immediately.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Legacy Software Support</h3>
              <p className="text-sm text-muted-foreground">
                Older versions of Photoshop, Lightroom, and other image editors may not support HEIC. JPG is universally supported by all image editing software, old and new.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Common Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Social Media Uploads", desc: "Convert iPhone photos to JPG before uploading to Instagram, Facebook, Twitter, or LinkedIn for guaranteed compatibility." },
              { title: "Email Attachments", desc: "Most email clients display JPG previews. Convert HEIC to JPG so recipients can view photos without downloading." },
              { title: "Website & Blog Images", desc: "Upload converted JPGs to WordPress, Shopify, Squarespace, or any website builder without format issues." },
              { title: "Windows PC Users", desc: "Share iPhone photos with Windows users who may not have HEIC support installed on their computer." },
              { title: "Photo Printing", desc: "Most photo printing services accept JPG. Convert HEIC photos before sending them to print." },
              { title: "Document & Presentation", desc: "Insert converted JPGs into Word documents, PowerPoint slides, and PDF files seamlessly." },
              { title: "Backup & Archive", desc: "Convert HEIC photos to widely-supported JPG for long-term archival that will be readable for decades." },
              { title: "Android Sharing", desc: "Send iPhone photos to Android users in JPG format so they can view them without any special apps." },
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
              "85-90% quality is the sweet spot — smaller files with virtually no visible quality loss.",
              "Use 100% quality only if you plan to edit the JPG further, as re-saving JPGs compounds quality loss.",
              "JPG files will be larger than HEIC originals — this is normal due to different compression algorithms.",
              "Transfer HEIC files from iPhone via AirDrop, iCloud Drive, or Files app for fastest conversion.",
              "After converting, use our Image Compressor to reduce JPG file sizes further if needed.",
              "Need to resize photos for social media? Use our Image Resizer tool after conversion.",
              "Need WebP instead of JPG? Use our All-in-One Image Converter for more format options.",
              "HEIC supports transparency like PNG. If your HEIC has transparency, convert to PNG instead to preserve it.",
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
                      /our Image Resizer tool/,
                      '<a href="/tools/image/image-resizer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Resizer tool</a>'
                    )
                    .replace(
                      /our All-in-One Image Converter/,
                      '<a href="/tools/image/all-in-one-image-converter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our All-in-One Image Converter</a>'
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
