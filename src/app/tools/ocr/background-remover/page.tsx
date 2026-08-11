import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { BackgroundRemoverTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function BackgroundRemoverPage() {
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
        <section className="mt-8" aria-label="Background Remover Tool">
          <BackgroundRemoverTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">
            How to Remove Image Backgrounds
          </h2>
          <p className="text-muted-foreground">
            Removing a background takes just a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">
                Upload your image
              </span>{" "}
              — Drag and drop a JPG, PNG, WebP, BMP, or GIF file onto the upload
              area, or click to browse. For best results, use images with solid
              or uniform backgrounds. Need to crop first? Try our{" "}
              <Link
                href="/tools/image/image-cropper"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Image Cropper
              </Link>{" "}
              tool.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Set the background color
              </span>{" "}
              — The tool auto-detects the background color from the image corners.
              You can also click "Pick Color" and click on the image to manually
              sample the exact background color.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Adjust the tolerance
              </span>{" "}
              — Use the tolerance slider to control how aggressively the tool
              removes colors similar to the background. Start with a moderate
              value around 30-50 and adjust as needed.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Click Remove Background
              </span>{" "}
              — The tool processes your image in seconds and shows the result
              side-by-side with the original. The checkerboard pattern indicates
              transparent areas.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Download as PNG
              </span>{" "}
              — Click "Download PNG" to save the result with full transparency.
              You can then place the subject on any new background. To optimize the
              file size, try our{" "}
              <Link
                href="/tools/image/image-compressor"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Image Compressor
              </Link>{" "}
              or{" "}
              <Link
                href="/tools/image/image-resizer"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Image Resizer
              </Link>{" "}
              tools.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Client-side processing — your images never leave your browser",
              "Auto-detect background color from image corners",
              "Manual color picker — click any spot to sample the background color",
              "Adjustable tolerance slider for precise control over removal",
              "Edge feathering for smooth, natural-looking boundaries",
              "Side-by-side original and processed preview",
              "Checkerboard pattern shows transparent areas",
              "Download as PNG with full alpha channel transparency",
              "Supports JPG, PNG, WebP, BMP, and GIF input formats",
              "Works best with solid white, black, or single-color backgrounds",
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
                desc: "All background removal processing runs locally in your browser using the Canvas API. Your images are never uploaded to any server — your data stays on your device at all times.",
              },
              {
                title: "Instant Results",
                desc: "No waiting for cloud processing. The color-based removal algorithm works in seconds directly in your browser, giving you immediate results you can download right away.",
                link: {
                  href: "/tools/image/image-compressor",
                  label: "Image Compressor →",
                },
              },
              {
                title: "No Sign-Up Required",
                desc: "Start removing backgrounds immediately. No account creation, no email verification, no watermarks, and no usage limits — just open and use.",
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
                title: "E-Commerce Product Photos",
                desc: "Remove studio or plain backgrounds from product images for clean, professional-looking listings on Amazon, Shopify, or other marketplaces.",
              },
              {
                title: "Profile Pictures",
                desc: "Create clean profile photos for LinkedIn, resumes, or social media by removing distracting backgrounds.",
              },
              {
                title: "Marketing Materials",
                desc: "Isolate logos, icons, or product images for use in flyers, banners, social media posts, and advertisements.",
              },
              {
                title: "Document Scanning",
                desc: "Remove colored backgrounds from scanned documents, ID cards, or receipts for cleaner digital records.",
              },
              {
                title: "Graphic Design",
                desc: "Extract subjects from photos to composite onto new backgrounds, create collages, or design custom graphics.",
              },
              {
                title: "Presentation Slides",
                desc: "Remove backgrounds from images used in presentations for a cleaner, more professional look.",
              },
              {
                title: "Passport & ID Photos",
                desc: "Prepare passport photos or ID images by ensuring a clean, compliant background color.",
              },
              {
                title: "Social Media Content",
                desc: "Create eye-catching social media posts by placing subjects on custom backgrounds or removing unwanted elements.",
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
              "Use images with solid, uniform backgrounds for the best results. White or light gray backgrounds work exceptionally well.",
              "Ensure good, even lighting when taking photos. Shadows on the background can create color variations that make removal less clean.",
              "Start with a low tolerance (20-30) and gradually increase it. This gives you more control and helps avoid accidentally removing parts of the subject.",
              "Use the manual color picker if auto-detection picks the wrong color. Click on the actual background area for the most accurate sampling.",
              "Crop the image to focus on the subject before uploading. Less background area means faster processing and fewer edge artifacts.",
              "For product photos, use a lightbox or plain backdrop when shooting. This makes the background color consistent and easy to remove.",
              "After removing the background, use our Image Compressor to optimize the PNG file size while maintaining transparency quality.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip.replace(
                      /our Image Compressor to optimize/,
                      '<a href="/tools/image/image-compressor" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Compressor</a> to optimize'
                    ).replace(
                      /our Image Resizer tools/,
                      '<a href="/tools/image/image-resizer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Resizer</a> tools'
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
              "Using images with complex, busy, or gradient backgrounds — this tool is designed for solid/uniform backgrounds.",
              "Setting the tolerance too high — this can accidentally remove parts of your subject that are similar in color to the background.",
              "Not using the manual color picker — auto-detection from corners may fail if the subject extends to the edges of the image.",
              "Expecting perfect results on all images — color-based removal has limitations. For complex backgrounds, use a dedicated AI-powered background remover.",
              "Forgetting that the output is PNG — PNG files with transparency can be larger than the original. Use our Image Compressor to reduce file size after removal.",
            ].map((mistake) => (
              <li key={mistake} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: mistake.replace(
                      /our Image Compressor to reduce/,
                      '<a href="/tools/image/image-compressor" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Compressor</a> to reduce'
                    ),
                  }}
                />
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
