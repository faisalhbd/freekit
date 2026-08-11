import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { ExifMetadataRemoverTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function ExifMetadataRemoverPage() {
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
        <section className="mt-8" aria-label="EXIF Metadata Remover Tool">
          <ExifMetadataRemoverTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">
            How to Remove EXIF Metadata from Photos
          </h2>
          <p className="text-muted-foreground">
            Stripping metadata from your photos takes just a few simple steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">
                Upload your photos
              </span>{" "}
              — Drag and drop JPG, PNG, or WebP files onto the upload area, or
              click to browse. You can select multiple images at once. Need to
              resize before sharing? Try our{" "}
              <Link
                href="/tools/ocr/image-resizer"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Image Resizer
              </Link>{" "}
              tool.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Review detected metadata
              </span>{" "}
              — The tool scans each image and shows you which metadata fields were
              found, such as camera make, GPS location, software, and timestamps.
              Images with no metadata are marked as clean.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Click Remove Metadata
              </span>{" "}
              — The tool processes all images by re-encoding them through the
              Canvas API. This strips all EXIF, GPS, IPTC, XMP, and other
              embedded data while preserving the visual content of the photo.
            </li>
            <li>
              <span className="text-foreground font-medium">
                Download cleaned images
              </span>{" "}
              — Click "Download" on individual files or "Download All" to save
              every cleaned image. You can then safely share them online. To
              further reduce file size, use our{" "}
              <Link
                href="/tools/ocr/image-compressor"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Image Compressor
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
              "Client-side processing — your photos never leave your browser",
              "EXIF, GPS, IPTC, and XMP metadata detection",
              "Shows detected metadata fields for each image",
              "Batch processing — upload and clean multiple images at once",
              "Before/after file size comparison",
              "Supports JPG, PNG, and WebP formats",
              "Canvas API re-encoding ensures complete metadata removal",
              "Individual file download or download all at once",
              "Drag and drop or click to upload",
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
                title: "100% Private & Secure",
                desc: "All metadata removal processing runs locally in your browser using the Canvas API. Your photos are never uploaded to any server — your data stays on your device at all times.",
              },
              {
                title: "Protect Your Location",
                desc: "GPS coordinates embedded in photos can reveal your home, workplace, or travel destinations. This tool ensures no one can extract location data from your shared images.",
                link: {
                  href: "/tools/ocr/background-remover",
                  label: "Background Remover →",
                },
              },
              {
                title: "No Sign-Up Required",
                desc: "Start removing metadata immediately. No account creation, no email verification, no watermarks, and no usage limits — just open and use.",
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
                title: "Social Media Sharing",
                desc: "Strip GPS and camera data before posting photos to social media platforms, protecting your location and personal information from strangers.",
              },
              {
                title: "Real Estate Listings",
                desc: "Remove metadata from property photos before listing them online, preventing the exact location from being extracted by anyone who downloads the images.",
              },
              {
                title: "Online Marketplaces",
                desc: "Clean product photos of camera details and timestamps before uploading to eBay, Craigslist, or other marketplace platforms.",
              },
              {
                title: "Professional Photography",
                desc: "Remove camera settings, lens information, and proprietary software data before delivering photos to clients or uploading to portfolios.",
              },
              {
                title: "Journalism & Whistleblowing",
                desc: "Protect the identity and location of sources by stripping all metadata from documentary or investigative photos before publication.",
              },
              {
                title: "Dating & Social Profiles",
                desc: "Prevent strangers from finding your home address or daily routine through GPS data embedded in profile pictures.",
              },
              {
                title: "Website & Blog Images",
                desc: "Reduce file size and remove unnecessary metadata from images used on websites and blogs for better performance and privacy.",
              },
              {
                title: "Legal & Medical Documents",
                desc: "Remove embedded metadata from scanned documents or photos containing sensitive legal or medical information before sharing.",
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
              "Always strip metadata before sharing photos online, even on platforms that claim to remove it automatically.",
              "Check the before/after file size — a significantly smaller cleaned file usually means metadata was successfully removed.",
              "Process photos in batches to save time when you have multiple images to share from the same event or location.",
              "Keep a copy of your original files with metadata intact if you need the EXIF data for personal archiving purposes.",
              "Disable GPS geotagging in your phone's camera settings if you don't need location data in your photos.",
              "Use this tool alongside our Image Compressor to both clean metadata and reduce file size for faster online sharing.",
              "After removing metadata, use our Image Resizer to adjust dimensions for specific platform requirements.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip
                      .replace(
                        /our Image Compressor to both/,
                        '<a href="/tools/ocr/image-compressor" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Compressor</a> to both'
                      )
                      .replace(
                        /our Image Resizer to adjust/,
                        '<a href="/tools/ocr/image-resizer" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Resizer</a> to adjust'
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
              "Assuming social media always strips metadata — not all platforms do, and some may preserve it in downloadable versions.",
              "Forgetting that screenshots can contain metadata too — always check before sharing any image file.",
              "Only checking one image from a batch — if your camera or phone embeds metadata, it likely does so for all photos from that session.",
              "Using lossy re-compression (JPEG) for images that need pixel-perfect quality — be aware that canvas re-encoding applies a new compression cycle.",
              "Not keeping a backup of originals — once metadata is stripped, you cannot recover it unless you kept the original file.",
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
