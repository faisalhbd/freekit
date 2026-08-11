import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { SvgToPngTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function SvgToPngPage() {
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
        <section className="mt-8" aria-label="SVG to PNG Converter Tool">
          <SvgToPngTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">
            How to Convert SVG to PNG
          </h2>
          <p className="text-muted-foreground">
            Converting SVG files to PNG takes just a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">
                Upload or paste your SVG
              </span>{" "}
              — Switch between "Upload SVG File" to drag and drop .svg files, or
              "Paste SVG Code" to paste raw SVG markup directly. Need to generate
              a favicon from your converted image? Try our{" "}
              <Link
                href="/tools/ocr/favicon-generator"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Favicon Generator
              </Link>{" "}
              tool.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Choose your settings
              </span>{" "}
              — Select the output scale (1x, 2x, 3x, 4x, or custom dimensions),
              background color (transparent, white, or custom), and output format
              (PNG or JPG). For web use, 2x is recommended for retina displays.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Click Convert
              </span>{" "}
              — The tool renders each SVG onto a Canvas at the specified size and
              exports it as a raster image. You will see the before/after file size
              and a preview of the converted image.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Download the result
              </span>{" "}
              — Click "Download" on individual files or "Download All" to save every
              converted image. To further optimize the file size, use our{" "}
              <Link
                href="/tools/ocr/image-to-webp"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Image to WebP
              </Link>{" "}
              converter.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Client-side processing — your SVG files never leave your browser",
              "Two input modes: upload SVG files or paste SVG code directly",
              "Scale options: 1x, 2x, 3x, 4x, or fully custom pixel dimensions",
              "Background options: transparent, white, or custom color",
              "Output formats: PNG (with transparency) and JPG",
              "Batch conversion — process multiple SVG files at once",
              "SVG preview before and after conversion",
              "File size comparison between SVG and converted output",
              "Automatic SVG dimension parsing (width/height or viewBox)",
              "No sign-up, no watermarks, no usage limits",
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
                title: "Pixel-Perfect Output",
                desc: "Render SVG at any resolution for crisp, sharp output. Choose 2x for retina displays, 4x for print-quality results, or custom dimensions for any specific requirement.",
              },
              {
                title: "100% Private & Secure",
                desc: "All conversion happens in your browser. Your SVG files and pasted code are never uploaded to any server, ensuring complete privacy and data security.",
                link: {
                  href: "/tools/ocr/png-to-jpg",
                  label: "PNG to JPG Converter →",
                },
              },
              {
                title: "Flexible Output",
                desc: "Choose between PNG with transparency support or JPG for smaller file sizes. Set custom backgrounds, custom dimensions, and any scale factor you need.",
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
                title: "Favicon Generation",
                desc: "Convert SVG logos to PNG at multiple sizes (16x16, 32x32, 48x48) for use as website favicons. Pair with our Favicon Generator for a complete setup.",
              },
              {
                title: "Social Media Icons",
                desc: "Convert vector social media icons to PNG for use in email signatures, documents, and platforms that do not support SVG.",
              },
              {
                title: "App Icons & Screenshots",
                desc: "Export SVG-based app icons at 1x, 2x, and 3x scales for iOS and Android app store submissions.",
              },
              {
                title: "Email Templates",
                desc: "Email clients have inconsistent SVG support. Convert icons and graphics to PNG for reliable rendering across all email clients.",
              },
              {
                title: "Print Materials",
                desc: "Convert vector logos and graphics to high-resolution PNG at 300+ DPI for business cards, flyers, and brochures.",
              },
              {
                title: "Presentation Slides",
                desc: "Some presentation software handles SVG poorly. Convert to PNG at 2x or 4x for crisp display on projectors and screens.",
              },
              {
                title: "WordPress & CMS Uploads",
                desc: "Many content management systems do not allow SVG uploads for security reasons. Convert to PNG before uploading.",
              },
              {
                title: "Game Development",
                desc: "Convert vector sprites and UI elements to PNG sprite sheets at specific dimensions for use in game engines.",
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
              "Use 2x scale for web graphics to ensure crisp display on retina and high-DPI screens.",
              "Choose PNG format when you need transparency, and JPG when file size is more important than pixel-perfect edges.",
              "If your SVG does not specify dimensions, the tool will try to use the viewBox. Set custom dimensions if the result is too small.",
              "For print use, export at 4x or use custom dimensions with at least 300 DPI equivalent resolution.",
              "When converting logos, use a white or custom background if the final placement surface is not transparent.",
              "After converting to PNG, you can further optimize file size using our Image to WebP converter for modern web delivery.",
              "For favicons, convert at multiple sizes and use our Favicon Generator to create a complete favicon package.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip
                      .replace(
                        /our Image to WebP converter for modern/,
                        '<a href="/tools/ocr/image-to-webp" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image to WebP converter</a> for modern'
                      )
                      .replace(
                        /our Favicon Generator to create/,
                        '<a href="/tools/ocr/favicon-generator" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Favicon Generator</a> to create'
                      ),
                  }}
                />
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
              "Exporting at 1x for retina displays — this results in blurry images on modern screens. Always use at least 2x for web graphics.",
              "Forgetting that JPG does not support transparency — if your SVG has transparent areas, they will become white in JPG output.",
              "Not checking the viewBox — some SVGs rely on viewBox for dimensions and have no explicit width/height. The tool handles this, but verify the output size.",
              "Using excessively large custom dimensions — very large outputs can exceed browser memory limits and may fail to render.",
              "Pasting incomplete SVG code — make sure your SVG includes the opening and closing <svg> tags with proper xmlns attributes for reliable rendering.",
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
