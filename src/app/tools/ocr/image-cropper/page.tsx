import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ImageCropperTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ImageCropperPage() {
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
        <section className="mt-8" aria-label="Image Cropper Tool">
          <ImageCropperTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">
            How to Crop Images Online
          </h2>
          <p className="text-muted-foreground">
            Cropping an image takes just a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">
                Upload your image
              </span>{" "}
              — Drag and drop a JPG, PNG, WebP, BMP, or GIF file onto the upload
              area, or click to browse. Need to remove the background first? Try our{" "}
              <Link
                href="/tools/ocr/background-remover"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Background Remover
              </Link>{" "}
              tool.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Choose an aspect ratio
              </span>{" "}
              — Select a preset ratio like 1:1, 16:9, or 4:3 from the dropdown, or leave
              it on Free for custom dimensions. The lock icon shows when a ratio is active.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Adjust the crop area
              </span>{" "}
              — Drag the crop rectangle to reposition it. Drag the corner or edge handles
              to resize. When a ratio is locked, the proportions are maintained automatically.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Select output format
              </span>{" "}
              — Choose PNG for lossless quality or JPG for smaller files. When using JPG,
              adjust the quality slider to balance size and quality.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Crop & Download
              </span>{" "}
              — Click "Crop & Download" to extract the selected region and save it to your
              device. To resize the output further, try our{" "}
              <Link
                href="/tools/ocr/image-resizer"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Image Resizer
              </Link>{" "}
              or{" "}
              <Link
                href="/tools/ocr/favicon-generator"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Favicon Generator
              </Link>{" "}
              tool.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Client-side processing — your images never leave your browser",
              "Drag & drop or click-to-upload for easy image loading",
              "Preset aspect ratios: Free, 1:1, 4:3, 16:9, 3:2, 2:3, 9:16",
              "Draggable crop rectangle with corner and edge resize handles",
              "Rule-of-thirds grid overlay for better composition",
              "Real-time crop dimensions displayed in pixels",
              "Estimated output file size shown before download",
              "PNG and JPG output with adjustable quality slider",
              "Touch support for mobile and tablet devices",
              "Supports JPG, PNG, WebP, BMP, and GIF input formats",
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
                title: "100% Private & Secure",
                desc: "All cropping runs locally in your browser using the Canvas API. Your images are never uploaded to any server — your data stays on your device at all times.",
              },
              {
                title: "Precise Control",
                desc: "Visual drag handles and aspect ratio locking give you pixel-perfect control. The real-time dimension readout ensures you get exactly the size you need.",
                link: {
                  href: "/tools/ocr/image-resizer",
                  label: "Image Resizer →",
                },
              },
              {
                title: "No Sign-Up Required",
                desc: "Start cropping immediately. No account creation, no email verification, no watermarks, and no usage limits — just open and use.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
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

        {/* 6. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">
            Common Use Cases
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Social Media Posts",
                desc: "Crop photos to the exact dimensions required by Instagram (1:1), Facebook (various), or X/Twitter for perfect display on every platform.",
              },
              {
                title: "YouTube Thumbnails",
                desc: "Crop and frame your video thumbnails to the recommended 16:9 aspect ratio for a professional, click-worthy appearance.",
              },
              {
                title: "Profile Pictures",
                desc: "Create perfectly square or circular profile photos for LinkedIn, GitHub, or any platform that requires a specific crop.",
              },
              {
                title: "Website Hero Images",
                desc: "Crop banner and hero images to precise pixel dimensions that match your website layout without distortion.",
              },
              {
                title: "Document Scanning",
                desc: "Crop scanned documents or receipts to remove excess white space and focus on the content area.",
              },
              {
                title: "Print Preparation",
                desc: "Crop photos to standard print sizes like 4×6, 5×7, or 8×10 inches at the correct aspect ratio.",
              },
              {
                title: "E-Commerce Product Photos",
                desc: "Standardize product image crops across your catalog for a clean, uniform appearance on your store.",
              },
              {
                title: "Presentation Slides",
                desc: "Crop images to fit presentation slide dimensions without stretching or leaving awkward margins.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-4"
              >
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use preset aspect ratios when cropping for specific platforms — this ensures your image displays correctly without unexpected borders or cropping by the platform.",
              "Follow the rule of thirds: place key subjects along the grid lines or at their intersections for a more balanced, visually appealing composition.",
              "Leave a small margin around your subject when cropping. Tight crops can look cramped, especially on smaller screens.",
              "For profile pictures, center the subject's face and leave some headroom above for the best result across different display sizes.",
              "Use PNG format when you need transparency or when the image contains text, sharp edges, or fine details.",
              "Use JPG format for photographs with smooth gradients — it produces much smaller file sizes than PNG.",
              "If you need to crop to exact pixel dimensions, start with the closest aspect ratio preset and then fine-tune using the corner handles.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Common Mistakes */}
        <section className="mt-16 space-y-4" aria-label="Common mistakes">
          <h2 className="text-2xl font-bold tracking-tight">
            Common Mistakes to Avoid
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Cropping too tightly — leave breathing room around your subject so the image doesn't feel cramped on different screen sizes.",
              "Ignoring aspect ratio requirements — different platforms expect different ratios. Uploading a 4:3 image where 16:9 is expected leads to awkward letterboxing.",
              "Cropping at low resolution — if the crop area is too small, the output will be pixelated when displayed at full size. Start with the highest resolution source possible.",
              "Using JPG quality below 80% — this introduces visible compression artifacts. Keep quality at 85% or higher for professional results.",
              "Forgetting to check the output dimensions — always verify the pixel dimensions shown in the crop tool match your requirements before downloading.",
            ].map((mistake) => (
              <li key={mistake} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ */}
        <section className="mt-16" aria-label="Frequently asked questions">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        {/* CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
