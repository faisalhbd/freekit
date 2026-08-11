import type { Metadata } from "next"
import Link from "next/link"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { PdfRotatorTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

export default function PdfRotatorPage() {
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
        <section className="mt-8" aria-label="PDF Rotator Tool">
          <PdfRotatorTool />
        </section>

        {/* 3. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Rotate PDF Pages Online</h2>
          <p className="text-muted-foreground">
            Fixing the orientation of your PDF pages takes just a few simple steps. Follow this guide to rotate your document:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="text-foreground font-medium">Upload your PDF file</span> — Drag and drop a single PDF file onto the upload area, or click the browse button to select a file from your device. The tool will show the total page count and file size.
            </li>
            <li>
              <span className="text-foreground font-medium">Select pages to rotate</span> — Click on individual page cards in the grid to select specific pages, or choose "Rotate All Pages" to apply the rotation to every page in the document.
            </li>
            <li>
              <span className="text-foreground font-medium">Choose a rotation angle</span> — Pick from 90° Clockwise, 90° Counter-Clockwise, or 180° depending on how you need to reorient your pages.
            </li>
            <li>
              <span className="text-foreground font-medium">Click Rotate PDF</span> — Hit the rotate button and your file will be processed instantly in your browser. Once complete, download the rotated PDF. Need to split your document first? Use our{" "}
              <Link href="/tools/pdf/pdf-splitter" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Splitter
              </Link>{" "}
              to separate pages. Want to extract specific pages? Try our{" "}
              <Link href="/tools/pdf/pdf-page-extractor" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Page Extractor
              </Link>{" "}
              to pull them out. Need to combine rotated files? Use our{" "}
              <Link href="/tools/pdf/pdf-merger" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                PDF Merger
              </Link>.
            </li>
          </ol>
        </section>

        {/* 4. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Client-side processing — your PDF never leaves your browser",
              "Rotate all pages at once or select specific pages individually",
              "Three rotation angles: 90° CW, 90° CCW, and 180°",
              "Interactive page grid with click-to-select toggling",
              "Select All and Clear buttons for quick page selection",
              "Real-time selected page count and list display",
              "Visual file info showing page count and file size",
              "No watermarks, no sign-up, no usage limits",
              "Preserves original quality — only rotation metadata changes",
              "Drag & drop or click-to-browse file upload support",
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
                desc: "All rotation happens in your browser. Your document is never uploaded to any server, ensuring total confidentiality for sensitive files like contracts, medical records, and financial reports.",
              },
              {
                title: "Precise Page Control",
                desc: "Select exactly which pages to rotate with the interactive page grid. Fix a single sideways page without affecting the rest of the document, or rotate everything at once.",
              },
              {
                title: "Instant & Reversible",
                desc: "Rotate documents in seconds without installing software. To undo, simply re-upload and rotate in the opposite direction. Need to combine rotated files? Use our PDF Merger to join them back together.",
                link: { href: "/tools/pdf/pdf-merger", label: "PDF Merger →" },
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
              { title: "Fixing Scanned Documents", desc: "Correct the orientation of scanned pages that were captured sideways or upside down during the scanning process." },
              { title: "Preparing for Print", desc: "Rotate landscape pages to portrait orientation (or vice versa) to match your printer settings and paper layout." },
              { title: "Standardizing Mixed PDFs", desc: "When combining pages from different sources, some may be rotated differently. Use this tool to make all pages consistent." },
              { title: "Fixing Mobile Photos in PDFs", desc: "Photos taken on phones often have incorrect rotation metadata. Rotate those pages to the correct viewing angle." },
              { title: "Presentation Handouts", desc: "Rotate slides or charts to the ideal reading orientation before distributing handouts to meeting attendees." },
              { title: "Legal Document Prep", desc: "Ensure all pages of contracts, agreements, and exhibits are in the correct orientation before filing or sharing." },
              { title: "E-book Formatting", desc: "Fix pages in converted e-books or manuals that ended up in the wrong orientation during the conversion process." },
              { title: "Form Correction", desc: "Rotate application forms, tax documents, or registration forms that were scanned or saved at the wrong angle." },
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
              "Check the total page count displayed after uploading to ensure your PDF loaded correctly before rotating.",
              "When selecting specific pages, use the Select All button if you intend to rotate the entire document — it is faster than clicking each page individually.",
              "Keep your original PDF as a backup. If you need to try a different rotation angle, having the original makes it easy to start over.",
              "For documents with mixed orientations, rotate one group of pages first, download the result, then upload again to rotate a different group with a different angle.",
              "Remove password protection from PDFs before rotating, as encrypted files may not be processable in the browser. You can use a dedicated PDF unlock tool first.",
              "If you need to both split and rotate pages, split your document first using our PDF Splitter, then rotate the individual files. This gives you more control over the final result.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: tip
                      .replace(
                        /our PDF Splitter/g,
                        '<a href="/tools/pdf/pdf-splitter" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">our PDF Splitter</a>'
                      )
                      .replace(
                        /PDF Merger/g,
                        '<a href="/tools/pdf/pdf-merger" class="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">PDF Merger</a>'
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
