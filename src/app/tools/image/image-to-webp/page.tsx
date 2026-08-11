import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ImageToWebPTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ImageToWebPPage() {
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
        <section className="mt-8" aria-label="Image to WebP Converter Tool">
          <ImageToWebPTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert Images to WebP Online</h2>
          <p className="text-muted-foreground">
            Converting your images to WebP format takes just a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your images</span> — Drag and drop any image file or click the browse button. We support PNG, JPG, GIF, BMP, SVG, and TIFF formats.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust the quality</span> — Use the quality slider to set your desired output quality. We recommend 80% for the best balance between file size and visual quality.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Convert</span> — Your images will be converted to WebP format instantly in your browser. You can see the file size savings in real time.
            </li>
            <li>
              <span className="text-foreground font-medium">Download the results</span> — Preview the WebP images side by side with the originals, then download individually or all at once.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Convert PNG, JPG, GIF, BMP, SVG, and TIFF images to WebP format",
              "Adjustable quality slider from 1% to 100% for full control over output",
              "Quick quality presets: High Quality (90%), Balanced (80%), Small File (60%)",
              "Batch convert — process multiple images at once",
              "Side-by-side before and after preview with file size comparison",
              "Shows exact savings percentage for each converted image",
              "Drag and drop or click to upload — no sign-up required",
              "All processing in your browser — your images never leave your device",
              "Automatic file naming: converts filename.png to filename.webp",
              "Re-convert with different quality settings without re-uploading",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Why WebP */}
        <section className="mt-16 space-y-4" aria-label="Why WebP">
          <h2 className="text-2xl font-bold tracking-tight">Why Convert to WebP?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Smaller File Sizes</h3>
              <p className="text-sm text-muted-foreground">
                WebP produces 25-80% smaller files compared to PNG and JPEG at the same visual quality.
                This means your website loads faster, uses less bandwidth, and provides a better experience for visitors on slow connections.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Better SEO & Performance</h3>
              <p className="text-sm text-muted-foreground">
                Google recommends WebP as part of Core Web Vitals optimization.
                Using WebP images can improve your PageSpeed Insights score, boost your SEO ranking,
                and help you meet the Largest Contentful Paint (LCP) threshold.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Universal Browser Support</h3>
              <p className="text-sm text-muted-foreground">
                WebP is supported by Chrome, Firefox, Edge, Safari 14+, Opera, and all major mobile browsers.
                Over 97% of web users worldwide can view WebP images without any compatibility issues.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <h3 className="font-semibold">Lossy & Lossless Options</h3>
              <p className="text-sm text-muted-foreground">
                WebP supports both lossy compression (like JPEG, with adjustable quality) and lossless compression
                (like PNG, with no quality loss). It also supports transparency (alpha channel) for images that need a transparent background.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Use Cases */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Website Optimization", desc: "Convert all website images to WebP to reduce page load time and improve Core Web Vitals scores." },
              { title: "WordPress & CMS", desc: "Optimize images before uploading to WordPress, Shopify, or any CMS for faster loading pages." },
              { title: "Email Marketing", desc: "Reduce email attachment sizes by converting images to WebP, ensuring emails load quickly." },
              { title: "Social Media Content", desc: "Prepare images in the most efficient format for social media platforms and messaging apps." },
              { title: "Web App Development", desc: "Serve WebP images in React, Next.js, Vue, or any web app for optimal performance." },
              { title: "E-commerce Product Photos", desc: "Convert product images to WebP for faster page loads, higher conversion rates, and better UX." },
              { title: "Blog & Content Sites", desc: "Speed up article loading times with smaller images while maintaining visual quality." },
              { title: "CDN & Image Hosting", desc: "Reduce bandwidth costs on CDNs and image hosting services by serving WebP instead of PNG/JPG." },
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
              "Use 80-85% quality for general web images — this provides excellent visual quality with significant file size reduction.",
              "For product photos and detailed images where quality matters, use 90-95% quality.",
              "For thumbnails and decorative images, 60-75% quality is usually sufficient and produces very small files.",
              "PNG images see the biggest savings when converted to WebP — often 50-80% smaller.",
              "JPG images see moderate savings — typically 25-35% smaller at equivalent visual quality.",
              "Test different quality levels and compare results side by side before downloading.",
              "You can re-convert with a different quality setting without re-uploading — just adjust the slider and click Convert again.",
              "WebP supports transparency, making it a great replacement for PNG images with transparent backgrounds.",
              "Need to compress without changing format? Try our Image Compressor tool instead.",
              "Need to resize and convert at the same time? Use our Image Resizer tool with WebP output format.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{
                  __html: tip
                    .replace(
                      /our (Image Compressor) tool instead/,
                      '<a href="/tools/image/image-compressor" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">$1</a>'
                    )
                    .replace(
                      /our (Image Resizer) tool with WebP output format/,
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
