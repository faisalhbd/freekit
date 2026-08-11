import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { JpgToPdfTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function JpgToPdfPage() {
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
        <section className="mt-8" aria-label="JPG to PDF Converter Tool">
          <JpgToPdfTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert JPG to PDF Online</h2>
          <p className="text-muted-foreground">
            Converting your images to PDF takes just a few simple steps. Follow this guide to create your document:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your images</span> — Drag and drop JPG, PNG, or WebP files onto the upload area, or click the browse button to select files from your device. You can add as many images as you need.
            </li>
            <li>
              <span className="text-foreground font-medium">Adjust settings</span> — Click the Settings button to configure page size (A4, Letter, Legal, or Fit to Image), orientation, margins, and how images should fit on each page.
            </li>
            <li>
              <span className="text-foreground font-medium">Reorder if needed</span> — Use the up and down arrow buttons to arrange your images in the desired order. The first image becomes page one in the PDF.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Convert to PDF</span> — Hit the convert button and your images will be processed instantly in your browser. A progress bar shows the conversion status.
            </li>
            <li>
              <span className="text-foreground font-medium">Download the result</span> — Once conversion is complete, click the download button to save your PDF. Need to combine it with other PDFs? Use our{" "}
              <Link href="/tools/pdf/pdf-merger" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Merger
              </Link>{" "}
              to combine multiple documents. Want to extract images from a PDF? Try our{" "}
              <Link href="/tools/pdf/pdf-to-jpg" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF to JPG
              </Link>{" "}
              tool. You can also optimize your images first with our{" "}
              <Link href="/tools/image/image-compressor" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                Image Compressor
              </Link>.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Client-side processing — your images never leave your browser",
              "Drag and drop upload for quick image adding",
              "Supports JPG, JPEG, PNG, and WebP image formats",
              "Image thumbnails with filename, dimensions, and file size display",
              "Move up/down buttons for easy image reordering",
              "Page size options: A4, Letter, Legal, or Fit to Image",
              "Portrait and Landscape orientation settings",
              "Configurable margins: None, Small, Medium, or Large",
              "Image fit modes: Fit to Page, Stretch to Fill, or Center at original size",
              "One-click download with no watermarks, no sign-up, no usage limits",
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
                title: "Complete Privacy",
                desc: "All conversion happens in your browser. Your images are never uploaded to any server, ensuring total confidentiality for sensitive photos and scanned documents.",
              },
              {
                title: "Professional Output",
                desc: "Create polished PDF documents from your images with precise control over page size, orientation, and layout. Perfect for sharing, printing, and archiving.",
              },
              {
                title: "Versatile Compatibility",
                desc: "Works with JPG, PNG, and WebP formats. Combine the output with our PDF Merger or compress images beforehand with our Image Compressor for the best results.",
                link: { href: "/tools/image/image-compressor", label: "Image Compressor →" },
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 space-y-2"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Scanned Document Archives", desc: "Convert scanned document pages from JPG to PDF for organized digital filing, easy searching, and long-term storage." },
              { title: "Photo Albums", desc: "Turn multiple photos into a single PDF album that is easy to share via email, messaging apps, or cloud storage." },
              { title: "Presentation Handouts", desc: "Convert slide screenshots or charts into a PDF handout that colleagues and clients can view on any device." },
              { title: "Receipt & Invoice Scanning", desc: "Digitize paper receipts and invoices by photographing them and converting to PDF for accounting records." },
              { title: "Design Portfolio", desc: "Compile your design work, mockups, and screenshots into a single polished PDF portfolio to share with potential clients." },
              { title: "E-book Creation", desc: "Convert illustrated pages, cover art, and diagrams into PDF format for self-publishing or sharing educational content." },
              { title: "Legal Document Preparation", desc: "Convert signed document photos, ID scans, and evidence images into a single PDF for legal filings and submissions." },
              { title: "Social Media Content", desc: "Save social media posts, stories, and graphics as a PDF record for marketing reports and content planning." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Best Practices */}
        <section className="mt-16 space-y-4" aria-label="Best practices">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Use high-resolution images (300 DPI or higher) for best print quality. Low-resolution screenshots may appear blurry when printed from the resulting PDF.",
              "Choose 'Fit to Image' page size when you want each page to match the exact dimensions of your uploaded image, eliminating unwanted white borders.",
              "Compress large images before converting if file size is a concern. Our Image Compressor can reduce image sizes while maintaining visual quality.",
              "Verify the image order before converting — use the arrow buttons to arrange images in the exact sequence you want them to appear in the PDF.",
              "Use 'Center with Original Size' fit mode when you need to preserve image resolution at all costs, such as for printing high-quality photos.",
              "After creating your PDF, you can merge it with other documents using our PDF Merger tool, or extract specific pages later with our PDF Splitter.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip
                      .replace(
                        /our Image Compressor/g,
                        '<a href="/tools/image/image-compressor" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our Image Compressor</a>'
                      )
                      .replace(
                        /our PDF Merger tool/g,
                        '<a href="/tools/pdf/pdf-merger" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our PDF Merger tool</a>'
                      )
                      .replace(
                        /our PDF Splitter/g,
                        '<a href="/tools/pdf/pdf-splitter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our PDF Splitter</a>'
                      ),
                  }}
                />
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

        {/* 10. CTA */}
        <ToolPageCTA />
      </div>
    </>
  )
}
