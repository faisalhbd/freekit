import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PdfToJpgTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PdfToJpgPage() {
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

        {/* 2. Tool Interface — above the fold */}
        <section className="mt-8" aria-label="PDF to JPG Converter Tool">
          <PdfToJpgTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Convert PDF to JPG Online</h2>
          <p className="text-muted-foreground">
            Converting your PDF pages to images takes just a few simple steps. Follow this guide to get started:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your PDF</span> — Drag and drop a PDF file onto the upload area, or click the browse button to select a file from your device. The tool will instantly show the page count.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose your settings</span> — Select the scale/DPI for output resolution (1x to 3x), pick your image format (JPG or PNG), and adjust the JPG quality slider. For quick format swaps in the other direction, try our{" "}
              <Link href="/tools/pdf/jpg-to-pdf" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                JPG to PDF Converter
              </Link>.
            </li>
            <li>
              <span className="text-foreground font-medium">Select pages</span> — Choose to convert all pages or specify custom page numbers (e.g. 1, 3, 5-8) to extract only the pages you need. To split a PDF into separate files instead, check out our{" "}
              <Link href="/tools/pdf/pdf-splitter" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Splitter
              </Link>.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Convert</span> — Hit the convert button and each selected page will be rendered to a high-quality image right in your browser.
            </li>
            <li>
              <span className="text-foreground font-medium">Download the results</span> — Preview all converted page thumbnails, download individual images, or use "Download All" to save every image at once. Need to compress the output images? Use our{" "}
              <Link href="/tools/image/image-compressor" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                Image Compressor
              </Link> to reduce file sizes.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Client-side processing — your PDF never leaves your browser",
              "Adjustable scale/DPI from 1x (72 DPI) to 3x (216 DPI)",
              "Output format selection: JPG (lossy) or PNG (lossless)",
              "Fine-tuned JPG quality slider from 10% to 100%",
              "Custom page selection — convert only the pages you need",
              "Batch conversion — process all pages in a single click",
              "Thumbnail preview grid for all converted pages",
              "Individual download or batch \"Download All\" option",
              "No watermarks, no sign-up, no usage limits",
              "Works on desktop and mobile devices",
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
                title: "Share Anywhere",
                desc: "Images are universally viewable on any device and platform. Convert PDF pages to JPG to easily share content on social media, messaging apps, or websites without requiring a PDF reader. Need to embed images in documents? Try our free JPG to PDF Converter to reverse the process.",
                link: { href: "/tools/pdf/jpg-to-pdf", label: "JPG to PDF Converter →" },
              },
              {
                title: "Extract Specific Content",
                desc: "Select only the pages you need instead of dealing with entire documents. This is perfect for creating presentations from specific slides, extracting invoice pages, or sharing individual report sections.",
              },
              {
                title: "Complete Privacy",
                desc: "All conversion happens in your browser using the PDF.js library. Your files are never uploaded to any server — zero data leaves your device. Convert confidential documents with total confidence.",
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
              { title: "Social Media Sharing", desc: "Convert PDF pages to images for easy sharing on Instagram, Facebook, Twitter, and other visual platforms that don't support PDF uploads." },
              { title: "Presentation Slides", desc: "Extract individual slides from a PDF presentation to use in PowerPoint, Google Slides, or as standalone visuals." },
              { title: "Invoice & Receipt Archiving", desc: "Convert invoice pages to JPG for easy organization in folders, cloud storage, or accounting software." },
              { title: "Web Content Integration", desc: "Turn PDF documents into web-ready images for embedding in blog posts, articles, and landing pages." },
              { title: "Thumbnail Generation", desc: "Create preview thumbnails from PDF pages for document management systems, portfolios, or file catalogs." },
              { title: "Print Preparation", desc: "Extract pages at high DPI (3x / 216 DPI) for print-ready images from PDF documents." },
              { title: "Document Editing", desc: "Convert pages to images so you can annotate, crop, or edit them in any image editor before reassembling." },
              { title: "Email Attachments", desc: "Replace bulky PDF attachments with lighter JPG images that are faster to send and easier for recipients to view." },
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
              "Use 2x scale (144 DPI) for most web and digital uses — it provides sharp images without excessive file sizes. For print, use 3x scale (216 DPI).",
              "Choose JPG format for photographs and complex images to keep file sizes small. Use PNG for documents with text, line art, or when you need pixel-perfect quality.",
              "Set JPG quality to 80-90% for a near-perfect balance between file size and visual clarity. Only go lower if file size is critical and slight quality loss is acceptable.",
              "Use the custom page selection feature to convert only the pages you need — this saves processing time and storage space for large documents.",
              "Keep a copy of your original PDF before conversion, especially for important documents. The conversion process is lossy when using JPG format.",
              "After conversion, use our <a href=\"/tools/image/image-compressor\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Image Compressor</a> to further reduce file sizes if needed for web or email use.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
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
