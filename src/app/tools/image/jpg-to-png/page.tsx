import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { JpgToPngTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function JpgToPngPage() {
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
        <section className="mt-8" aria-label="JPG to PNG Converter Tool">
          <JpgToPngTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert JPG to PNG Online</h2>
          <p className="text-muted-foreground">
            Converting your JPG images to lossless PNG format takes just a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your JPG images</span> — Drag and drop JPG or JPEG files or click the browse button. The tool accepts JPG/JPEG files up to 50MB each.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Convert</span> — Your JPG images will be converted to lossless PNG format instantly in your browser. Every pixel is preserved exactly.
            </li>
            <li>
              <span className="text-foreground font-medium">Preview the results</span> — See the original JPG and converted PNG side by side with file sizes. The PNG is lossless — no quality is lost during conversion.
            </li>
            <li>
              <span className="text-foreground font-medium">Download the PNG files</span> — Download each converted image individually or download all at once. Files are automatically named with the .png extension.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Lossless conversion — every pixel preserved exactly, zero quality loss",
              "PNG supports transparency (alpha channel) for overlays and logos",
              "Batch convert — process multiple JPG/JPEG files to PNG at once",
              "Side-by-side preview showing original JPG and converted PNG",
              "File size comparison with size change indicator per image",
              "Automatic .png file naming for easy identification",
              "Drag and drop or click to upload — no sign-up required",
              "All processing in your browser — your images never leave your device",
              "Supports all JPG/JPEG variants including different color profiles",
              "Re-convert without re-uploading — click Convert again anytime",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. When to Convert */}
        <section className="mt-16 space-y-4" aria-label="When to convert">
          <h2 className="text-2xl font-bold tracking-tight">When to Convert JPG to PNG</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">For Logos &amp; Icons</h3>
              <p className="text-sm text-muted-foreground">
                PNG supports transparency, making it the standard format for logos and icons that need to overlay on different backgrounds.
                Convert your JPG logos to PNG so you can place them on any colored background without white boxes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">For Screenshots &amp; Text</h3>
              <p className="text-sm text-muted-foreground">
                Screenshots and images containing text look sharper in PNG format because there is no lossy compression that blurs edges.
                PNG preserves crisp text and fine details that JPG can soften.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">For Graphics &amp; Line Art</h3>
              <p className="text-sm text-muted-foreground">
                Line art, drawings, and graphics with solid colors and sharp edges benefit from PNG&apos;s lossless compression.
                JPG compression creates visible artifacts around sharp edges and solid color areas.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">For Archiving &amp; Editing</h3>
              <p className="text-sm text-muted-foreground">
                PNG files can be edited and re-saved without any quality degradation, unlike JPG which loses quality each time it is saved.
                Convert to PNG before editing to preserve the best possible starting quality.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Logo & Brand Assets", desc: "Convert JPG logos to PNG for transparent backgrounds, enabling use on any website or document." },
              { title: "Website Graphics", desc: "Use PNG for website icons, buttons, badges, and decorative elements that need crisp edges and transparency." },
              { title: "App Development", desc: "Convert app assets from JPG to PNG for iOS and Android, where PNG is the standard format for UI elements." },
              { title: "Presentation & Documents", desc: "PNG images look sharper in PowerPoint, Word, and PDF documents, especially for text-heavy graphics." },
              { title: "Social Media Graphics", desc: "Convert JPG graphics to PNG for crisper edges on social media profile pictures and cover photos." },
              { title: "Watermarking & Overlays", desc: "PNG transparency is essential for watermarks, overlays, and layered image effects." },
              { title: "Print Preparation", desc: "PNG files are preferred for printing text, logos, and line art due to their lossless quality." },
              { title: "Image Editing Workflows", desc: "Start with PNG before editing to ensure maximum quality throughout your editing process." },
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
              "PNG files are larger than JPG — this is normal because PNG stores every pixel without compression loss.",
              "Converting JPG to PNG cannot restore quality already lost from previous JPG compression.",
              "For best results, start with the highest quality JPG available before converting to PNG.",
              "Use PNG for images with text, logos, sharp edges, and areas of solid color where JPG artifacts are visible.",
              "Use JPG for photographs where file size matters more than pixel-perfect quality.",
              "After converting to PNG, you can edit and re-save the file without any additional quality loss.",
              "Need to convert back to JPG? Use our PNG to JPG Converter with adjustable quality settings.",
              "Need to convert to WebP for web optimization? Use our Image to WebP Converter for smaller file sizes.",
              "Need to compress images without changing format? Use our Image Compressor tool.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(
                      /our (PNG to JPG Converter)/,
                      '<a href="/tools/image/png-to-jpg" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Image to WebP Converter)/,
                      '<a href="/tools/image/image-to-webp" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Image Compressor) tool/,
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
